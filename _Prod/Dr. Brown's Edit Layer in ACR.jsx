// c2011 Adobe Systems, Inc. All rights reserved.
// Produced and Directed by Dr. Brown ( a.k.a Russell Preston Brown )
// Written by Tom Ruark because I wrote listener! I get credit for all listener code.

/*
@@@BUILDINFO@@@ Dr Browns Edit Layer in ACR.jsx 1.1.4
*/

// enable double clicking from the Macintosh Finder or the Windows Explorer
#target photoshop

// save some state so we can restore
// we pop the ACR dialog so users can cancel out and we are in a bad state
var historyDocument = app.activeDocument;
var historyState = app.activeDocument.activeHistoryState;
var isCancelled = true;

app.activeDocument.suspendHistory( 'Dr Browns Edit Layer in ACR', 'EditLayerInACR();');
if( isCancelled ){
	if (historyDocument != app.activeDocument) {
		app.activeDocument.close( SaveOptions.DONOTSAVECHANGES );
	}
	app.activeDocument = historyDocument;
	app.activeDocument.activeHistoryState = historyState;
}
isCancelled ? 'cancel' : undefined;// do not localize cancel

function EditLayerInACR(){
// Show this message just once. 
// If I have preferences then I must of done this already.
var message = "Special Instructions\r";
message += "Make sure that you have set your Camera Raw Preferences to the following setting:\r";
message += "(Automatically open all supported TIFFs)\r";
message += "To access this preference setting, go to your Main Menu and select: Photoshop/Preferences/Camera Raw\r";
message += " \rAlso, your default resolution for TIFF images in ACR must be set to 240ppi. If you see your layers change in size, then you know that your resolution is not set correctly.\r";
message += "";

var optionsID = "5714ecb5-8b21-4327-bf64-135d24ea7131";
var showMessage = true;
try {
    var desc = app.getCustomOptions(optionsID);
    showMessage = false;
}
catch(e) {
    showMessage = true;
}

if (showMessage) {
    alert(message);
    var desc = new ActionDescriptor();
    desc.putInteger(charIDToTypeID('ver '), 1);
    app.putCustomOptions(optionsID, desc);
}

var tempName = "Raw Smart Temp";
var tempFile = new File( Folder.temp.toString() + "/" + tempName + ".tif" );
if( tempFile.exists ) tempFile.remove();

try {

// make sure active layer is a normal art layer
if( app.activeDocument.activeLayer.typename != 'ArtLayer' || app.activeDocument.activeLayer.kind != LayerKind.NORMAL ) return 'cancel';

// change image res to match defalut ACR 240
if( app.activeDocument.resolution != 240 ) {
	var docRes = app.activeDocument.resolution;
	app.activeDocument.resizeImage(undefined, undefined, 240, ResampleMethod.NONE);
}

var channelMask = hasChannelMask();
var vectorMask = hasVectorMask();
var layerTransparency = HasLayerTransparency();

// save then remove channel mask if exists
if( channelMask ) {
	var channelMaskSettings = getChannelMaskSettings();
    var tempAlpha = channelMaskToAlphaChannel();
	deleteChannelMask();
}
// save then remove vector mask if exists
if( vectorMask ) {
	var vectorMaskSettings = getVectorMaskSettings();
    app.activeDocument.pathItems[app.activeDocument.pathItems.length-1].duplicate( 'tempPath' );
	app.activeDocument.pathItems[app.activeDocument.pathItems.length-1].remove();
}
if( layerTransparency ) {
	var layerName = app.activeDocument.activeLayer.name;
	recoverLayerAndSave();
}

convertLayerToACRSmartObject();

if( layerTransparency && !channelMask ) {
	// create a  channel mask from original layer transparency
	var transMask = app.activeDocument.channels.getByName( "7d358230-8855-11de-8a39-0800200c9a66_Alpha" );
	alphaToChannelMask( transMask );
	transMask.remove();
}
// restore channel mask if needed
if( channelMask ) {
	//restore the saved channel mask
	alphaToChannelMask( tempAlpha );
	setChannelMaskDensity( channelMaskSettings.density );
	setChannelMaskFeather( channelMaskSettings.feather );
	tempAlpha.remove();
	if( layerTransparency ) {
		// combine masks
		var transMask = app.activeDocument.channels.getByName( "7d358230-8855-11de-8a39-0800200c9a66_Alpha" );
		combineChannelMaskWithAplha( transMask );
		transMask.remove();
	}
}
// restore vector mask if needed
if( vectorMask ) {
	app.activeDocument.pathItems['tempPath'].select();
	createVectorMask();
	setVectorMaskDensity( vectorMaskSettings.density );
	setVectorMaskFeather( vectorMaskSettings.feather );
	app.activeDocument.pathItems['tempPath'].remove();
}

// well at least this is the same!
// replace contents of selected smart object
var desc = new ActionDescriptor();
desc.putPath( charIDToTypeID( "null" ), tempFile );
executeAction( stringIDToTypeID( "placedLayerReplaceContents" ), desc, DialogModes.NO );
if( layerTransparency ) app.activeDocument.activeLayer.name = layerName;
	
tempFile.remove();

// convert back to orginal resolution
if( docRes != undefined ) app.activeDocument.resizeImage(undefined, undefined, docRes, ResampleMethod.NONE);

isCancelled = false;// no errors so save to record
} /* try block ender */
catch(e) {
	if( tempFile.exists ) tempFile.remove();
}

//////////////////////////////////////////////////////////////////////////////
/////////////////////// functions below /////////////////////////
//////////////////////////////////////////////////////////////////////////////

// see if i can tell that this layer has transparent pixels
function HasLayerTransparency() {
    var hasTransparency = false;
	if( app.activeDocument.activeLayer.isBackgroundLayer ) return false;
    try {
        SelectLayerTransparency();
        var s = activeDocument.selection;
        if ( null != s && ! s.solid ) {
            activeDocument.selection.deselect();
            return true;
        }
        if ( (s[2].value - s[0].value) == activeDocument.width.value && 
             (s[3].value - s[1].value) == activeDocument.height.value) {
            activeDocument.selection.deselect();
            return false;
        }
        activeDocument.selection.deselect();
    }
    catch(e) {
        activeDocument.selection.deselect();
        hasTransparency = false;
    }
    return hasTransparency;
};
function SelectLayerTransparency() {
	if(app.activeDocument.activeLayer.isBackgroundLayer){
		return -1;
	}
	var desc = new ActionDescriptor();
	var ref = new ActionReference();
	ref.putProperty( charIDToTypeID( "Chnl" ), charIDToTypeID( "fsel" ) );
	desc.putReference( charIDToTypeID( "null" ), ref );
	var ref1 = new ActionReference();
	ref1.putEnumerated( charIDToTypeID( "Chnl" ), charIDToTypeID( "Chnl" ), charIDToTypeID( "Trsp" ) );
	desc.putReference( charIDToTypeID( "T   " ), ref1 );
	executeAction( charIDToTypeID( "setd" ), desc, DialogModes.NO );
	try{
		activeDocument.selection.bounds;
	}catch(e){
		return -1;
	}
};
function SaveAsTIFF( inFileName ) {
	var tiffSaveOptions = new TiffSaveOptions();
	tiffSaveOptions.embedColorProfile = true;
	tiffSaveOptions.imageCompression = TIFFEncoding.TIFFLZW;
	tiffSaveOptions.alphaChannels =  false;
	tiffSaveOptions.layers = false;
	app.activeDocument.saveAs( new File( inFileName ), tiffSaveOptions, true, Extension.LOWERCASE );
};
// a color mode independent way to make the component channel active. 
function selectComponentChannel() {
    try{
        var map = {};
        map[DocumentMode.GRAYSCALE] = charIDToTypeID('Blck');// grayscale
        map[DocumentMode.RGB] = charIDToTypeID('RGB ');
        map[DocumentMode.CMYK] = charIDToTypeID('CMYK');
        map[DocumentMode.LAB] = charIDToTypeID('Lab ');
        var desc = new ActionDescriptor();
            var ref = new ActionReference();
            ref.putEnumerated( charIDToTypeID('Chnl'), charIDToTypeID('Chnl'), map[app.activeDocument.mode] );
        desc.putReference( charIDToTypeID('null'), ref );
        executeAction( charIDToTypeID('slct'), desc, DialogModes.NO );
    }catch(e){}
};
// function to see if there is a raster layer mask, returns true or false
function hasChannelMask(){
	if( app.activeDocument.activeLayer.isBackgroundLayer ) return false;
	var ref = new ActionReference();
	ref.putEnumerated( charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") ); 
	return executeActionGet( ref ).getBoolean( stringIDToTypeID( 'hasUserMask' ) );
};
// function to see if there is a vector layer mask, returns true or false
function hasVectorMask(){
	if( app.activeDocument.activeLayer.isBackgroundLayer ) return false;
	var ref = new ActionReference();
	ref.putEnumerated( charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") ); 
	return executeActionGet( ref ).getBoolean( stringIDToTypeID( 'hasVectorMask' ) );
};
// create an new alpha from layer channel mask, returns channel object.
function channelMaskToAlphaChannel() {
    var desc = new ActionDescriptor();
        var ref = new ActionReference();
        ref.putEnumerated( charIDToTypeID('Chnl'), charIDToTypeID('Chnl'), charIDToTypeID('Msk ') );
    desc.putReference( charIDToTypeID('null'), ref );
    executeAction( charIDToTypeID('Dplc'), desc, DialogModes.NO );
    var dupedMask = app.activeDocument.activeChannels[0];
    selectComponentChannel();
    return dupedMask;
};
function deleteChannelMask() {
    var desc = new ActionDescriptor();
        var ref = new ActionReference();
        ref.putEnumerated( charIDToTypeID('Chnl'), charIDToTypeID('Chnl'), charIDToTypeID('Msk ') );
    desc.putReference( charIDToTypeID('null'), ref );
    executeAction( charIDToTypeID('Dlt '), desc, DialogModes.NO );
};
// creates a layer channel mask from a channel object
function alphaToChannelMask( alpha ) {
	var desc = new ActionDescriptor();
    desc.putClass( charIDToTypeID( "Nw  " ), charIDToTypeID( "Chnl" ) );
	var ref = new ActionReference();
        ref.putEnumerated( charIDToTypeID( "Chnl" ), charIDToTypeID( "Chnl" ), charIDToTypeID( "Msk " ) );
    desc.putReference( charIDToTypeID( "At  " ), ref );
    desc.putEnumerated( charIDToTypeID( "Usng" ), charIDToTypeID( "UsrM" ), charIDToTypeID( "RvlA" ) );
	executeAction( charIDToTypeID( "Mk  " ), desc, DialogModes.NO );
    var desc = new ActionDescriptor();
        var ref = new ActionReference();
        ref.putEnumerated( charIDToTypeID('Chnl'), charIDToTypeID('Chnl'), charIDToTypeID('Msk ') );
    desc.putReference( charIDToTypeID('null'), ref );
    desc.putBoolean( charIDToTypeID('MkVs'), false );
    executeAction( charIDToTypeID('slct'), desc, DialogModes.NO );
    var desc = new ActionDescriptor();
        var desc1 = new ActionDescriptor();
            var ref = new ActionReference();
            ref.putName( charIDToTypeID('Chnl'), alpha.name );
        desc1.putReference( charIDToTypeID('T   '), ref );
        desc1.putBoolean( charIDToTypeID('PrsT'), true );
    desc.putObject( charIDToTypeID('With'), charIDToTypeID('Clcl'), desc1 );
    executeAction( charIDToTypeID('AppI'), desc, DialogModes.NO );
    selectComponentChannel();
};
function combineChannelMaskWithAplha( alpha ) {// channel object
	var restore = false;
	try{
		app.activeDocument.activeChannels;
		var restore = true;
	}catch(e){}
	var desc = new ActionDescriptor();
			var ref = new ActionReference();
			ref.putEnumerated( charIDToTypeID('Chnl'), charIDToTypeID('Chnl'), charIDToTypeID('Msk ') );
		desc.putReference( charIDToTypeID('null'), ref );
		desc.putBoolean( charIDToTypeID('MkVs'), false );
		executeAction( charIDToTypeID('slct'), desc, DialogModes.NO );
	var desc = new ActionDescriptor();
        var desc1 = new ActionDescriptor();
            var ref = new ActionReference();
            ref.putName( charIDToTypeID('Chnl'), alpha.name );
        desc1.putReference( charIDToTypeID('T   '), ref );
        desc1.putEnumerated( charIDToTypeID('Clcl'), charIDToTypeID('Clcn'), stringIDToTypeID( "linearBurn" ) );
        desc1.putDouble( charIDToTypeID('Scl '), 1.000000 );
        desc1.putInteger( charIDToTypeID('Ofst'), 0 );
        desc1.putBoolean( charIDToTypeID('PrsT'), true );
    desc.putObject( charIDToTypeID('With'), charIDToTypeID('Clcl'), desc1 );
    executeAction( charIDToTypeID('AppI'), desc, DialogModes.NO );
	if( restore ) selectComponentChannel();
};
// creates a new alpha channel from active layer's transparency, returns channel object
function layerTransparencyToAlpha() {
	var tempAlpha = app.activeDocument.channels.add();
	var desc = new ActionDescriptor();
        var desc1 = new ActionDescriptor();
            var ref = new ActionReference();
            ref.putEnumerated( charIDToTypeID('Chnl'), charIDToTypeID('Chnl'), charIDToTypeID('Trsp') );
        desc1.putReference( charIDToTypeID('T   '), ref );
        desc1.putBoolean( charIDToTypeID('PrsT'), true );
    desc.putObject( charIDToTypeID('With'), charIDToTypeID('Clcl'), desc1 );
    executeAction( charIDToTypeID('AppI'), desc, DialogModes.NO );
	selectComponentChannel();
	return tempAlpha;
};
// gets channel mask settings, returns custom object
function getChannelMaskSettings(){
	var ref = new ActionReference();
	ref.putEnumerated( charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") ); 
	var desc = executeActionGet(ref);
	var channelMask = {};
	// density should be percent. it is 0-255 instead. so convert because percent is need to set
	channelMask.density = Math.round((desc.getInteger( stringIDToTypeID( 'userMaskDensity' ) ) / 255)*100);
	channelMask.feather = desc.getUnitDoubleValue( stringIDToTypeID( 'userMaskFeather' ) );
	return channelMask;
};
function setChannelMaskDensity( density ) {// integer
	var desc = new ActionDescriptor();
        var ref = new ActionReference();
        ref.putEnumerated( charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );
    desc.putReference( charIDToTypeID('null'), ref );
        var desc1 = new ActionDescriptor();
        desc1.putUnitDouble( stringIDToTypeID('userMaskDensity'), charIDToTypeID('#Prc'), density );
    desc.putObject( charIDToTypeID('T   '), charIDToTypeID('Lyr '), desc1 );
    executeAction( charIDToTypeID('setd'), desc, DialogModes.NO );
};
function setChannelMaskFeather( feather ) {// double
	var desc = new ActionDescriptor();
        var ref = new ActionReference();
        ref.putEnumerated( charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );
    desc.putReference( charIDToTypeID('null'), ref );
        var desc1 = new ActionDescriptor();
        desc1.putUnitDouble( stringIDToTypeID('userMaskFeather'), charIDToTypeID('#Pxl'), feather );
    desc.putObject( charIDToTypeID('T   '), charIDToTypeID('Lyr '), desc1 );
    executeAction( charIDToTypeID('setd'), desc, DialogModes.NO );
};
// gets vector mask settings, returns custom object
function getVectorMaskSettings(){
	var ref = new ActionReference();
	ref.putEnumerated( charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") ); 
	var desc = executeActionGet(ref);
	var vectorMask = {};
	vectorMask.density = Math.round((desc.getInteger( stringIDToTypeID( 'vectorMaskDensity' ) ) / 255)*100);
	vectorMask.feather = desc.getUnitDoubleValue( stringIDToTypeID( 'vectorMaskFeather' ) );
	return vectorMask;
};
function setVectorMaskDensity( density ) {// integer
	var desc = new ActionDescriptor();
        var ref = new ActionReference();
        ref.putEnumerated( charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );
    desc.putReference( charIDToTypeID('null'), ref );
        var desc1 = new ActionDescriptor();
        desc1.putUnitDouble( stringIDToTypeID('vectorMaskDensity'), charIDToTypeID('#Prc'), density );
    desc.putObject( charIDToTypeID('T   '), charIDToTypeID('Lyr '), desc1 );
    executeAction( charIDToTypeID('setd'), desc, DialogModes.NO );
};
function setVectorMaskFeather( feather ) {// double
	var desc = new ActionDescriptor();
        var ref = new ActionReference();
        ref.putEnumerated( charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );
    desc.putReference( charIDToTypeID('null'), ref );
        var desc1 = new ActionDescriptor();
        desc1.putUnitDouble( stringIDToTypeID('vectorMaskFeather'), charIDToTypeID('#Pxl'), feather );
    desc.putObject( charIDToTypeID('T   '), charIDToTypeID('Lyr '), desc1 );
    executeAction( charIDToTypeID('setd'), desc, DialogModes.NO );
};
// create a layer vector mask from active path
function createVectorMask() {
  try{
    var desc = new ActionDescriptor();
        var ref = new ActionReference();
        ref.putClass( charIDToTypeID('Path') );
    desc.putReference( charIDToTypeID('null'), ref );
        var mask = new ActionReference();
        mask.putEnumerated( charIDToTypeID('Path'), charIDToTypeID('Path'), stringIDToTypeID('vectorMask') );
    desc.putReference( charIDToTypeID('At  '), mask );
        var path = new ActionReference();
        path.putEnumerated( charIDToTypeID('Path'), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );
    desc.putReference( charIDToTypeID('Usng'), path );
    executeAction( charIDToTypeID('Mk  '), desc, DialogModes.NO );
  }catch(e){ return -1; }
};
// converts the active layer into a tiff embedded smart object so it can be edited in ACR .
// editing in ACR requires ACR preferences to be set to edit all supported tiffs
function convertLayerToACRSmartObject(){
	var layerName = app.activeDocument.activeLayer.name;
	app.activeDocument.activeLayer.name = "Raw Smart Object";
	// convert selected layer to smart object
	executeAction( stringIDToTypeID( "newPlacedLayer" ), undefined, DialogModes.NO );
	//  edit selected smart object
	executeAction( stringIDToTypeID( "placedLayerEditContents" ), new ActionDescriptor(), DialogModes.NO );
	if(app.activeDocument.bitsPerChannel != BitsPerChannelType.SIXTEEN) app.activeDocument.bitsPerChannel  = BitsPerChannelType.SIXTEEN;
	if(app.activeDocument.mode != DocumentMode.RGB) app.activeDocument.changeMode(ChangeMode.RGB);
	if( !tempFile.exists ) SaveAsTIFF( tempFile );
	app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
	app.activeDocument.activeLayer.name = layerName;
};
function calculations( ChannelEnum ){
	var desc = new ActionDescriptor();
	desc.putClass( charIDToTypeID( "Nw  " ), charIDToTypeID( "Chnl" ) );
	var s1Desc = new ActionDescriptor();
	var idT = charIDToTypeID( "T   " );
	var s1Ref = new ActionReference();
	s1Ref.putEnumerated( charIDToTypeID( "Chnl" ), charIDToTypeID( "Chnl" ), charIDToTypeID( ChannelEnum) );
	s1Desc.putReference( idT, s1Ref );
	var s2Ref = new ActionReference();
	s2Ref.putEnumerated( charIDToTypeID( "Chnl" ), charIDToTypeID( "Chnl" ), charIDToTypeID( ChannelEnum ) );
	s1Desc.putReference( charIDToTypeID( "Src2" ), s2Ref );
	var idClcl = charIDToTypeID( "Clcl" );
	desc.putObject( charIDToTypeID( "Usng" ), charIDToTypeID( "Clcl" ), s1Desc );
	executeAction( charIDToTypeID( "Mk  " ), desc, DialogModes.NO );
	var c = app.activeDocument.activeChannels[0];
	selectComponentChannel();
	return c;
};
function applyChannel( channel ){
	var desc= new ActionDescriptor();
        var desc1 = new ActionDescriptor();
            var ref = new ActionReference();
            ref.putName( charIDToTypeID('Chnl'), channel.name );
        desc1.putReference( charIDToTypeID('T   '), ref );
        desc1.putBoolean( charIDToTypeID('PrsT'), false );
    desc.putObject( charIDToTypeID('With'), charIDToTypeID('Clcl'), desc1 );
    executeAction( charIDToTypeID('AppI'), desc, DialogModes.NO );
};
function recoverLayerAndSave(){
try{
	// copy layer to new doc
	var doc = app.activeDocument;
	var lyr = doc.activeLayer;
	SelectLayerTransparency()
	var mask = activeDocument.channels.add();
	app.activeDocument.selection.store(  mask );
	app.activeDocument.selection.deselect();
	selectComponentChannel();
	mask.name = '7d358230-8855-11de-8a39-0800200c9a66_Alpha';
	var desc = new ActionDescriptor();
	var reference = new ActionReference();
	reference.putClass( charIDToTypeID( "Dcmn" ) );
	desc.putReference( charIDToTypeID( "null" ), reference );
	desc.putString( charIDToTypeID( "Nm  " ), app.activeDocument.activeLayer.name+" restored" );
	var ref = new ActionReference();
	 ref.putEnumerated( charIDToTypeID( "Lyr " ), charIDToTypeID( "Ordn" ), charIDToTypeID( "Trgt" ) );
	desc.putReference( charIDToTypeID( "Usng" ), ref );
	desc.putString( charIDToTypeID( "LyrN" ), app.activeDocument.activeLayer.name+" restored" );
	executeAction( charIDToTypeID( "Mk  " ), desc, DialogModes.NO );
	if(app.activeDocument.mode != DocumentMode.RGB) app.activeDocument.changeMode(ChangeMode.RGB);
	// save the current 100% transparent as mask
	var recoveredRedChannel = calculations( "Rd  " );
	var recoveredGreenChannel = calculations( "Grn " );
	var recoveredBlueChannel = calculations( "Bl  " );
	app.activeDocument.flatten();
	app.activeDocument.activeChannels = [app.activeDocument.channels[0]];
	applyChannel( recoveredRedChannel );
	app.activeDocument.activeChannels = [app.activeDocument.channels[1]];
	applyChannel( recoveredGreenChannel );
	app.activeDocument.activeChannels = [app.activeDocument.channels[2]];
	applyChannel( recoveredBlueChannel );
	selectComponentChannel();
	trimBackground();
	SaveAsTIFF( tempFile );
	app.activeDocument.close( SaveOptions.DONOTSAVECHANGES );
}catch(e){};
};
function trimBackground() {
	var desc = new ActionDescriptor();
    desc.putEnumerated( stringIDToTypeID('trimBasedOn'), stringIDToTypeID('trimBasedOn'), stringIDToTypeID('topLeftPixelColor') );
    desc.putBoolean( charIDToTypeID('Top '), true );
    desc.putBoolean( charIDToTypeID('Btom'), true );
    desc.putBoolean( charIDToTypeID('Left'), true );
    desc.putBoolean( charIDToTypeID('Rght'), true );
    executeAction( stringIDToTypeID('trim'), desc, DialogModes.NO );
};
};// end EditLayersInACR()