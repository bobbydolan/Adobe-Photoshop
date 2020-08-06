/*
@@@BUILDINFO@@@ Export For Aero.jsx 1.0.0.0
*/



// BEGIN__HARVEST_EXCEPTION_ZSTRING

<javascriptresource>
<name>$$$/JavaScripts/Aero/Menu=Export For Aero...</name>
<eventid>205679C30-9DB1-4DAD-B685-513A8C051234</eventid>
<category>scriptexport</category>
<enableinfo>true</enableinfo>
<menu>export</menu>
</javascriptresource>

// END__HARVEST_EXCEPTION_ZSTRING


///////////////////////////////////////////////////////////////////////////////
// Globals
///////////////////////////////////////////////////////////////////////////////

var gPresetsPath = decodeURI(app.path) + "/Presets/";
var gConvertToPostcardWithScript = false;
var gExportFlattened = false;
var gDocWidth = 100;
var gDocHeight = 100;
var gLayerParent = activeDocument;


///////////////////////////////////////////////////////////////////////////////
// Layer Operations
///////////////////////////////////////////////////////////////////////////////

function SelectAllLayers() {

	var topLevelLayerIndexes = CollectTopLevelLayers(activeDocument);
	SelectLayer(topLevelLayerIndexes[0].name, false);

	for (var m = 1; m < topLevelLayerIndexes.length; m++)
		SelectLayer(topLevelLayerIndexes[m].name, true);
	
};

function CreateNewDocFromLayer(docName)
{
// =======================================================
	var idmake = stringIDToTypeID( "make" );
    var desc28 = new ActionDescriptor();
    var idnull = stringIDToTypeID( "null" );
        var ref7 = new ActionReference();
        var iddocument = stringIDToTypeID( "document" );
        ref7.putClass( iddocument );
    desc28.putReference( idnull, ref7 );
    var idname = stringIDToTypeID( "name" );
    desc28.putString( idname, docName );
    var idusing = stringIDToTypeID( "using" );
        var ref8 = new ActionReference();
        var idlayer = stringIDToTypeID( "layer" );
        var idordinal = stringIDToTypeID( "ordinal" );
        var idtargetEnum = stringIDToTypeID( "targetEnum" );
        ref8.putEnumerated( idlayer, idordinal, idtargetEnum );
    desc28.putReference( idusing, ref8 );
    var idversion = stringIDToTypeID( "version" );
    desc28.putInteger( idversion, 5 );
	executeAction( idmake, desc28, DialogModes.NO );
}



function CollectTopLevelLayers (theParent) 
	{
		var allLayers = new Array;
       
         var theUniqueLayers = FixDuplicates (theParent.layers)
		var hasLayerGroup = false;

		for (var m =theUniqueLayers.length - 1; m >= 0;m--) 
		{
			var theLayer = theUniqueLayers[m];

			if(theLayer.kind == LayerKind.SMARTOBJECT)
				theLayer.rasterize(RasterizeType.ENTIRELAYER);

			if(theLayer.visible)
			{
				allLayers.push(theLayer);
				SelectLayer(theLayer.name, false);
			}
		}
		
		if(activeDocument.layerSets.length == 1 && allLayers.length == 1)
		{
			gLayerParent = activeDocument.layerSets[0];
			return CollectTopLevelLayers (gLayerParent);
		}
		return allLayers;
	}

function FixDuplicates (theLayers) {
    for (var x = 0; x < theLayers.length; x++) {
		//alert(theLayers[x].name );
		
		if(!theLayers[x].isBackgroundLayer)
		{
			if(theLayers[x].allLocked) theLayers[x].allLocked = false;  
			if(theLayers[x].kind == LayerKind.NORMAL && theLayers[x].pixelsLocked) theLayers[x].pixelsLocked = false;  
			if(theLayers[x].positionLocked) theLayers[x].positionLocked = false;  
			if(theLayers[x].kind == LayerKind.NORMAL && theLayers[x].transparentPixelsLocked) theLayers[x].transparentPixelsLocked = false; 
		} 
	
		if (theLayers[x].name.indexOf('\/' ) != -1) 
			theLayers[x].name = theLayers[x].name.replace(/\//g, "-");
		
		if (theLayers[x].name.indexOf('\\' ) != -1) 
			theLayers[x].name = theLayers[x].name.replace(/\\/g, "-");
		
        for (var y = x+1; y < theLayers.length; y++) {
			if (theLayers[x].name.match('^' + theLayers[y].name +'$' ) ) 
			{
				theLayers[y].name = theLayers[x].name + "_" + x;
			}
		}
		
    }
    return theLayers;    
    }

function SelectLayer(layerName, add)
	{
		var idselect = stringIDToTypeID( "select" );
		var desc31 = new ActionDescriptor();
		var idnull = stringIDToTypeID( "null" );
			var ref11 = new ActionReference();
			var idlayer = stringIDToTypeID( "layer" );
			ref11.putName( idlayer, layerName);
		desc31.putReference( idnull, ref11 );
		var idmakeVisible = stringIDToTypeID( "makeVisible" );
		desc31.putBoolean( idmakeVisible, false );
		if(add)
		{
			var idselectionModifier = stringIDToTypeID( "selectionModifier" );
			var idselectionModifierType = stringIDToTypeID( "selectionModifierType" );
			var idaddToSelection = stringIDToTypeID( "addToSelection" );
			desc31.putEnumerated( idselectionModifier, idselectionModifierType, idaddToSelection );
		}
	
		executeAction( idselect, desc31, DialogModes.NO );
	}
	
///////////////////////////////////////////////////////////////////////////////
// Function: PhotoshopExportDialog
// Usage: pop the ui and get user settings
///////////////////////////////////////////////////////////////////////////////

function StrToIntWithDefault(s, n) {
	var onlyNumbers = /[^0-9]/g;
	var t = s.replace(onlyNumbers, "");
	t = parseInt(t);
	if (!isNaN(t)) {
		n = t;
	}
	return n;
}
	
var strTitle = localize("$$$/JavaScripts/Aero=Export For Aero");
var strPresentationText = localize("$$$/JavaScripts/strAeroPresentationTextShort=Export your Photoshop document for use in Project Aero.");
var strLabelKey = localize("$$$/JavaScripts/Aero/LayerLabel=Layers:");
var strSeparate = localize("$$$/JavaScripts/Aero/PreserveLayers=Preserve Layers");
var strMerge = localize("$$$/JavaScripts/Aero/FlattenLayers=Flattened (one image)");
var textFieldWidth=270;
var textLabelWidth=100;
var strEmpty2 = localize("$$$/JavaScripts/JavaScripts/Empty3=  ");
var stretDestination = localize("$$$/locale_specific/JavaScripts/SketchFab/ETDestinationLength270=270");
var strButtonOK = localize("$$$/JavaScripts/Aero/Export=Export");
var strButtonCancel = localize("$$$/JavaScripts/Aero/CancelButton=Cancel");
var strButtonSeparate = localize("$$$/JavaScripts/Aero/Separate=Separate");
var stretDestination = localize("$$$/locale_specific/JavaScripts/SketchFab/ETDestinationLength64=64");
var textFieldWidth=64;
// ok and cancel button
var cancelButtonID = 1;
var okButtonID = 2;

function PhotoshopExportDialog(topLevelLayers) {
	dlgMain = new Window("dialog", strTitle);

	dlgMain.orientation = 'column';
	dlgMain.alignChildren = 'left';

	// -- top of the dialog, first line

	// -- two groups, one for left and one for right ok, cancel
	dlgMain.grpTop = dlgMain.add("group");
	dlgMain.grpTop.orientation = 'column';
	dlgMain.grpTop.alignChildren = 'top';
	dlgMain.grpTop.alignment = 'center';
	
	var message1 = localize("$$$/JavaScripts/Aero/layerPreamble=This Photoshop file contains ") + topLevelLayers.length + localize("$$$/JavaScripts/Aero/layerPostamble= top level layers.");

	dlgMain.grpTop.add("statictext", undefined, message1, {
		multiline : true
	}).alignment = 'fill';

	
	var message2 = localize("$$$/JavaScripts/Aero/ExportAs=Export layers as:");

	dlgMain.grpTop.add("statictext", undefined, message2, {
		multiline : true
	}).alignment = 'fill';

	dlgMain.grpTopLine = dlgMain.grpTop.add("group");
	dlgMain.grpTopLine.orientation = 'row';
	dlgMain.grpTopLine.alignChildren = 'center';
	dlgMain.grpTopLine.alignment = 'fill';
	
	dlgMain.grpTopLine.grpMergeReplace = dlgMain.grpTopLine.add("group");
	dlgMain.grpTopLine.grpMergeReplace.orientation = 'column';
	dlgMain.grpTopLine.grpMergeReplace.alignment = 'left';

	//Merged Radio
	dlgMain.grpTopLine.grpMergeReplace.rbMerged = dlgMain.grpTopLine.grpMergeReplace.add("radiobutton", undefined, strMerge);
	
	dlgMain.grpTopLine.grpMergeReplace.rbMerged.alignment = 'left';
	dlgMain.grpTopLine.grpMergeReplace.rbMerged.value = true;
	dlgMain.grpTopLine.grpMergeReplace.rbMerged.onClick = function() { 
		
	}

	//Separated Radio
	dlgMain.grpTopLine.grpMergeReplace.alignment = 'left';
	dlgMain.grpTopLine.grpMergeReplace.rbSeparated = dlgMain.grpTopLine.grpMergeReplace.add("radiobutton", undefined, strSeparate);

	dlgMain.grpTopLine.grpMergeReplace.rbSeparated.alignment = 'left';
	dlgMain.grpTopLine.grpMergeReplace.rbSeparated.onClick = function() {
	}

	
	// Buttons
	dlgMain.grpELine = dlgMain.add("group");
	dlgMain.grpELine.orientation = 'row';
	dlgMain.grpELine.alignChildren = 'right';
	dlgMain.grpELine.alignment = 'right';

	
	dlgMain.btnCancel = dlgMain.grpELine.add("button", undefined, strButtonCancel);
	dlgMain.btnCancel.onClick = function () {
		dlgMain.close(cancelButtonID);
	}

	dlgMain.btnMerge = dlgMain.grpELine.add("button", undefined, strButtonOK);
	dlgMain.btnMerge.onClick = function () {
		dlgMain.close(okButtonID);
		
	}
	

	dlgMain.defaultElement = dlgMain.btnMerge;
	dlgMain.cancelElement = dlgMain.btnCancel;

	dlgMain.onShow = function () {
		// yourself
	}

	app.bringToFront();

	dlgMain.center();

	var result = dlgMain.show();
	
	gExportFlattened = dlgMain.grpTopLine.grpMergeReplace.rbMerged.value;
	
	return result;
}


function AeroSuccessDialog() {
	dlgMain = new Window("dialog", localize("$$$/JavaScripts/Aero/SuccessTitle=Export For Aero"));

	dlgMain.orientation = 'column';
	dlgMain.alignChildren = 'left';

	// -- top of the dialog, first line

	// -- two groups, one for left and one for right ok, cancel
	dlgMain.grpTop = dlgMain.add("group");
	dlgMain.grpTop.orientation = 'column';
	dlgMain.grpTop.alignChildren = 'top';
	dlgMain.grpTop.alignment = 'center';
	
	var message1 = localize("$$$/JavaScripts/Aero/Success=Your file is converting. To see your file in Augmented Reality, use the Aero mobile app and import this file into your scene.");


	dlgMain.grpTop.add("statictext", undefined, message1, {
		multiline : true
	}).alignment = 'fill';


	dlgMain.grpTopLine = dlgMain.grpTop.add("group");
	dlgMain.grpTopLine.orientation = 'row';
	dlgMain.grpTopLine.alignChildren = 'center';
	dlgMain.grpTopLine.alignment = 'fill';
	
	dlgMain.grpTopLine.grpMergeReplace = dlgMain.grpTopLine.add("group");
	dlgMain.grpTopLine.grpMergeReplace.orientation = 'column';
	dlgMain.grpTopLine.grpMergeReplace.alignment = 'left';

	
	// Buttons
	dlgMain.grpELine = dlgMain.add("group");
	dlgMain.grpELine.orientation = 'row';
	dlgMain.grpELine.alignChildren = 'right';
	dlgMain.grpELine.alignment = 'right';

	dlgMain.btnMerge = dlgMain.grpELine.add("button", undefined, localize("$$$/JavaScripts/Aero/Done=OK"));
	dlgMain.btnMerge.onClick = function () {
		dlgMain.close(okButtonID);
		
	}
	

	dlgMain.defaultElement = dlgMain.btnMerge;
	
	dlgMain.onShow = function () {
		// yourself
	}

	app.bringToFront();

	dlgMain.center();

	var result = dlgMain.show();
	
	return result;
}

///////////////////////////////////////////////////////////////////////////////
// File I/O
///////////////////////////////////////////////////////////////////////////////

function SavePSD(currentFolder, saveFile){

	var myFile = new File(saveFile);

	var selectedFilePath = myFile.saveDlg (localize("$$$/JavaScripts/Aero/Location=Aero Export Location:"), localize("$$$/JavaScripts/Aero/Filter=Photoshop Files: *.psd"));

	if(selectedFilePath != null)
	{
		var maxImageSize = 2048;

		//Scale image if needed
		if(gDocHeight > maxImageSize || gDocWidth > maxImageSize)
		{
			var newSize = 2048;
			if (gDocHeight > gDocWidth) 
			{
				activeDocument.resizeImage(null,UnitValue(newSize,"px"),null,ResampleMethod.BICUBIC);
			}
			else 
			{
				activeDocument.resizeImage(UnitValue(newSize,"px"),null,null,ResampleMethod.BICUBIC);
			}
		}

		psdSaveOptions = new PhotoshopSaveOptions();

		psdSaveOptions.embedColorProfile = true;

		psdSaveOptions.alphaChannels = true;

		activeDocument.saveAs(selectedFilePath, psdSaveOptions, true, Extension.LOWERCASE);

		return true;
	}
	return false;
}

function GetExportFile(docName, ext, destFolder) {
	var newName = "";

	// if name has no dot (and hence no extension),
	// just append the extension
	if (docName.indexOf('.') < 0) {
		newName = docName + ext;// + randNum + ext;
	} else {
		var dot = docName.lastIndexOf('.');
		newName += docName.substring(0, dot);
		newName += ext;
	}
	
	// Create the file object to save to
	var myFile = new File( destFolder + '/' + newName );

	return myFile;
}


function GetCCFilesFolderPath(fileName)
{
        return localize("$$$/private/AeroExport/CCFilesFolder=~/Creative Cloud Files/");
}

function SaveACopy(file)
{
	// =======================================================
	var idsave = stringIDToTypeID( "save" );
	var desc152 = new ActionDescriptor();
	var idas = stringIDToTypeID( "as" );
		var desc153 = new ActionDescriptor();
		var idmaximizeCompatibility = stringIDToTypeID( "maximizeCompatibility" );
		desc153.putBoolean( idmaximizeCompatibility, true );
	var idphotoshopthreefiveFormat = stringIDToTypeID( "photoshop35Format" );
	desc152.putObject( idas, idphotoshopthreefiveFormat, desc153 );
	var idin = stringIDToTypeID( "in" );
	desc152.putPath( idin, file );
	var iddocumentID = stringIDToTypeID( "documentID" );
	desc152.putInteger( iddocumentID, 487 );
	var idcopy = stringIDToTypeID( "copy" );
	desc152.putBoolean( idcopy, true );
	var idlowerCase = stringIDToTypeID( "lowerCase" );
	desc152.putBoolean( idlowerCase, true );
	var idsaveStage = stringIDToTypeID( "saveStage" );
	var idsaveStageType = stringIDToTypeID( "saveStageType" );
	var idsaveSucceeded = stringIDToTypeID( "saveSucceeded" );
	desc152.putEnumerated( idsaveStage, idsaveStageType, idsaveSucceeded );
	executeAction( idsave, desc152, DialogModes.NO );

}

function RevertDoc()
{
	// =======================================================
	var idrevert = stringIDToTypeID( "revert" );
	executeAction( idrevert, undefined, DialogModes.NO );
}

function LaunchWebPage(myWebPage)
{

	var s = "<HTML><HEAD><META HTTP-EQUIV=REFRESH CONTENT=";
	s += '"0; URL=';
	s += myWebPage;
	s += ' ">';
	s += "</HEAD><BODY>";
	s += "<!---CENTER><BR><BR><b><i><span style='font-family:Arial'>";
	s += localize("$$$/watermark/str/redirect=redirecting to documentation...");
	s += "</span></i></b></center--->";
	s += "</BODY></HTML>";
			
	var helpFile = new File( Folder.temp.toString() + '/Temp.html' );
	if (helpFile.open('w')) {
		helpFile.write( s );
		helpFile.close();
		helpFile.execute();
	}


}

function ResizeImage(newSize)
{
	app.preferences.rulerUnits = Units.PIXELS;

	// these are our values for the end result width and height (in pixels) of our image
	var fWidth = 2048;
	var fHeight = 2048;

	// resize. if height > width (portrait-mode) AND height is larger than 2400px -- resize based on height. otherwise, resize based on width only if width is greater than 2400px
	if(doc.height > 2048 || doc.width > 2048) {
	if (doc.height > doc.width) {
		doc.resizeImage(null,UnitValue(fHeight,"px"),null,ResampleMethod.BICUBIC);
		}
	else {
		doc.resizeImage(UnitValue(fWidth,"px"),null,null,ResampleMethod.BICUBIC);
		}
	}
	// setting the ruler unit back to inches
	app.preferences.rulerUnits = Units.INCHES;
}

function FlattenGroups(parent)
{
	for( var i=parent.layerSets.length-1; i>=0 ; i--)
		if(parent.layerSets[i].visible)
				parent.layerSets[i].merge();		
}


///////////////////////////////////////////////////////////////////////////////
// main
///////////////////////////////////////////////////////////////////////////////

function main()
{  
	try 
	{
		if(!activeDocument)
			return 'cancel';
	} catch(e) {
		alert(localize("$$$/JavaScripts/Aero/DocError=You must have a document open before Exporting for Aero"));
		
		return 'cancel';
	}

	if(!activeDocument.saved)
	{
		alert(localize("$$$/JavaScripts/Aero/SaveError=Please save your document before Exporting for Aero"));
		return 'cancel';
	}
	var ccFilesPath = GetCCFilesFolderPath();
	
	var ccFolder = new Folder(ccFilesPath);
	if(!ccFolder.exists)
	{
		alert(localize("$$$/JavaScripts/Aero/NoCC=Creative Cloud Files is not installed"));
		return 'cancel';
	}
	
	var fileName = activeDocument.name;	
	if(fileName == "")
	{
		alert(localize("$$$/JavaScripts/Aero/NotSaved=You must save your document before exporting"));
		return 'cancel';
	}
	
	// Save the current preferences  
	var startRulerUnits = app.preferences.rulerUnits;  
	// Set Photoshop to use pixels   
	app.preferences.rulerUnits = Units.PIXELS;  
	gDocWidth = Number(activeDocument.width);
	gDocHeight = Number(activeDocument.height);
	app.preferences.rulerUnits = startRulerUnits;  
	
	var doTheSave = true;
	if(app.name == "Adobe Photoshop")
	{
		var topLayersBefore = CollectTopLevelLayers(activeDocument);

		FlattenGroups(gLayerParent);

		if(topLayersBefore.length > 1)
		{

			var diaogResult = PhotoshopExportDialog(topLayersBefore);

			if(diaogResult == cancelButtonID)
				return 'cancel';
		}
		
		var topLayers = CollectTopLevelLayers(activeDocument);
		if(topLayers.length == 0)
		{
			alert(localize("$$$/JavaScripts/Aero/NoLayers=There are no visible layers in this document"));
			return 'cancel';
		}

		var targetFile = GetExportFile(activeDocument.name, '.psd', ccFilesPath);

		//Flatten if we need to
		if(gExportFlattened)
		{
			try{  
				activeDocument.mergeVisibleLayers();  
			}catch(e){}  
		}

		doTheSave = SavePSD(ccFilesPath, targetFile);

		RevertDoc();
	}
	
	if(doTheSave)
	{
		if(AeroSuccessDialog() == 1)
		{
			LaunchWebPage("https://www.adobe.com/go/pstoar");
		}
	}
	
}

activeDocument.suspendHistory(localize("$$$/JavaScripts/Aero/Menu=Export For Aero..."), "main()");
