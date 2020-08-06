/* ==========================================================
// Christmass 2007 John J. McAssey (JJMack) and the
// Day I descovered Photoshop had what I wanted
// a way to pass Prams to Scripts throught menu File>Automate
// ======================================================= */

/* Special properties for a JavaScript to enable it to behave like an automation plug-in, the variable name must be exactly
   as the following example and	the variables must be defined in the top 1000 characters of the	file

// BEGIN__HARVEST_EXCEPTION_ZSTRING

<javascriptresource>
<name>$$$/JavaScripts/AspectRatioSelection/Name=Aspect Ratio Selection...</name>
<about>$$$/JavaScripts/AspectRatioSelection/About=Aspect Ratio Selection Plug-in Version 0.0 By JJmack a Hacker use at your own risk Quality forget about it.</about>
<menu>automate</menu>
<category>JJMack's</category>
<enableinfo>true</enableinfo>
<eventid>3caa3434-cb67-11d1-bc43-0060b0a13dc5</eventid>
<terminology><![CDATA[<< /Version 1
                         /Events <<
                          /3caa3434-cb67-11d1-bc43-0060b0a13dc5 [($$$/AdobePlugin/AspectRatioSelection/Name=Aspect Ratio Selection) /imageReference <<
                               /width [($$$/AdobePlugin/AspectRatioSelection/Width=width) /pixelsUnit]
                               /height [($$$/AdobePlugin/AspectRatioSelection/Height=height) /pixelsUnit]
                               /flagCENTER [($$$/AdobePlugin/AspectRatioSelection/Center=center) /boolean]
                               /flagBORDER  [($$$/AdobePlugin/AspectRatioSelection/Border=border) /boolean]
                               /flagRECTANGLE [($$$/AdobePlugin/AspectRatioSelection/Rectangle=rectangle) /boolean]
                               /flagELLIPSE  [($$$/AdobePlugin/AspectRatioSelection/Ellipse=ellipse) /boolean]
                               /flagREPLACE [($$$/AdobePlugin/AspectRatioSelection/Replace=replace) /boolean]
                               /flagADD [($$$/AdobePlugin/AspectRatioSelection/add=add) /boolean]
                               /flagSUBTRACT [($$$/AdobePlugin/AspectRatioSelection/Subtract=subtract) /boolean]
                               /flagINTERSECT [($$$/AdobePlugin/AspectRatioSelection/Intersect=intersect) /boolean]
                               /flagSLT [($$$/AdobePlugin/AspectRatioSelection/Selection=selection) /boolean]
                               /flagPTH [($$$/AdobePlugin/AspectRatioSelection/Path=path) /boolean]
                               /feather [($$$/AdobePlugin/AspectRatioSelection/Feather=feather) /pixelsUnit]
                               /flagANTIALIAS [($$$/AdobePlugin/AspectRatioSelection/anti-alias=anti-alias) /boolean]
                          >>]
                         >>
                      >> ]]></terminology>
</javascriptresource>

// END__HARVEST_EXCEPTION_ZSTRING

  If I knew java and Adobe Zstrings I would clean up the Actions Paletts Step options reducing most of the flag line into three lines:
  reducing 8 Aspect Ratio Selection option lines to  3 lines (Selection  Optons, Selection Shape and Selection Type)
  Like Adobe Conditional Mode Change.jsx However I don't want to spend the time needed to hack this and figure out how
  Adobe Conditional Mode Change.jsx /Enums and its Function: ChangeInfoToDescriptor work when this works....

*/

/* ===========================================================================================================
// I'm useng the same <eventid>3caa3434-cb67-11d1-bc43-0060b0a13dc4</eventid> as Fit Image right now ?????
// Using the same ID broke the resize function of the Image Processor so I changed the last 4 to 5
// Fit Image.jsx and Conditional Mode Change.jsx have the same /Events and /Enum so I copied these also ????
// Also the save pram use sizeInfo and a strange string to "8090f848-cc6b-44a2-ae17-fbe01d5b9630"
// I change name of my info to arInfo and the strange string to "8090f848-cc6b-44a2-ae17-fbe01d5b963a"
// Did not find these strings is the windows registry
// In CS4|CS5 Adobe cleaned up their Fit Image.jsx Zstring it no longer has Conditional Mode Change.jsx Events
// ============================================================================================================ */
/*

/* Adapt Fit Image code for my own Automate Script */
/* enable double clicking from the Macintosh Finder or the Windows Explorer */
#target	photoshop

// debug level:	0-2 (0:disable,	1:break	on error, 2:break at beginning)
// $.level = 1;
// debugger; //	launch debugger	on next	line

var showparms = false;

// on localized	builds we pull the $$$/Strings from a .dat file, see documentation for more details
$.localize = true;

var isCancelled	= true;	// assume cancelled until actual resize	occurs



/* The main routine ============================================================================================
// AspectRatioSelection object does most of the work
// ============================================================================================================= */
try {

	GlobalVariables();

	// ============================================================================================================
	// Reset Vars Used and create some alias to make things easier for this hacker
	// ============================================================================================================ */
	var type	= "None Set";
	var shape	= "None Set";
	// vars	for shape
	var rectangle	="Rctn";
	var ellipse	="Elps";
	// vars	for Path
	var doPath 	= false;
	// vars	for type
	var diminish	=SelectionType.DIMINISH
	var subtract	=SelectionType.DIMINISH
	var extend	=SelectionType.EXTEND
	var add		=SelectionType.EXTEND
	var intersect	=SelectionType.INTERSECT
	var replace	=SelectionType.REPLACE
	/* ============================================================================================================
	// end vars and Aliases
	// ============================================================================================================ */

	CheckVersion();

	// create our default params
	var arInfo = new ARInfo();

	if (showparms) {
		alert( "Inital State" + " " +
		"Center " + FLAG_CENTER + " " + arInfo.flagCENTER +
		" Border " + FLAG_BORDER + " " + arInfo.flagBORDER +
		" Anti_Alias " + FLAG_ANTIALIAS + " " + arInfo.flagANTIALIAS +
		" Rectantangle " + FLAG_RECTANGLE + " " + arInfo.flagRECTANGLE +
		" Ellipse " + FLAG_ELLIPSE + " " + arInfo.flagELLIPSE +
		" Replace " + FLAG_REPLACE + " " + arInfo.flagREPLACE +
		" Add " +	FLAG_ADD + " " + arInfo.flagADD +
		" Subtract " + FLAG_SUBTRACT + " " + arInfo.flagSUBTRACT +
		" Intersect " + FLAG_INTERSECT + " " + arInfo.flagINTERSECT); }
	if (showparms) {alert("start " + arInfo.width.value + ":" + arInfo.height.value + " Center " + FLAG_CENTER + " Border " +   FLAG_BORDER +" Shape " + shape + " Selection Type " + type + " Feather " + arInfo.feather.value + " Anti-Alias " + FLAG_ANTIALIAS); }

	var gIP	= new AspectRatioSelection();

	if ( DialogModes.ALL ==	app.playbackDisplayDialogs ) {
		gIP.CreateDialog();
		gIP.RunDialog();
	}
	else {
		// This	is what	does the script	with values saved in actions
		gIP.InitVariables();

		if (showparms) {
			alert( "Action State" + " " +
			"Center " + FLAG_CENTER + " " + arInfo.flagCENTER +
			" Border " + FLAG_BORDER + " " + arInfo.flagBORDER +
			" Anti_Alias " + FLAG_ANTIALIAS + " " + arInfo.flagANTIALIAS +
			" Rectantangle " + FLAG_RECTANGLE + " " + arInfo.flagRECTANGLE +
			" Ellipse " + FLAG_ELLIPSE + " " + arInfo.flagELLIPSE +
			" Replace " + FLAG_REPLACE + " " + arInfo.flagREPLACE +
			" Add " +	FLAG_ADD + " " + arInfo.flagADD +
			" Subtract " + FLAG_SUBTRACT + " " + arInfo.flagSUBTRACT +
			" Intersect " + FLAG_INTERSECT + " " + arInfo.flagINTERSECT); }
		if (showparms) {alert("From Action " + arInfo.width.value + ":" + arInfo.height.value + " Center " + FLAG_CENTER + " Border " + FLAG_BORDER +" Shape " + shape + " Selection Type " + type + " Feather " + arInfo.feather.value + " Anti-Alias " + FLAG_ANTIALIAS ); }

		ARselect(arInfo.width.value, arInfo.height.value, FLAG_CENTER, FLAG_BORDER, shape, type, arInfo.feather.value,  FLAG_ANTIALIAS, doPath);
	}

	if (!isCancelled) {
		SaveOffParameters(arInfo);
	}

}

// Lot's of things can go wrong
// Give	a generic alert	and see	if they	want the details
catch( e ) {
	if ( DialogModes.NO != app.playbackDisplayDialogs ) {
		alert( e + " : " + e.line );
	}
}

// restore the dialog modes
app.displayDialogs = gSaveDialogMode;

isCancelled ? 'cancel' : undefined;

/* ==================================================================================================================================================
================================================================================================================================================== */
function ARselect(width, height, center, border, shape,	type, feather, antiAlias, doPath ) {

	// prepare the ruler
	var defaultRulerUnits =	app.preferences.rulerUnits;
	app.preferences.rulerUnits = Units.PIXELS;

	var originalheight = app.activeDocument.height.value;
	var originalwidth =  app.activeDocument.width.value;

	// ====================================================================================================== //
	// Calculate Top Left Corner x1 y1 Bottom Left Corner x2 y2 for aspectratio + origin for avtive document  //
	// ====================================================================================================== //

	if ( height>width ) { aspectRatio = height/width;
	} else {aspectRatio = width/height;}

	if (originalheight>originalwidth) {
		// Portraits
		originalAspectRatio = originalheight/originalwidth;

		if (originalAspectRatio	< aspectRatio) {
			// Current aspect ratio	less trim width
			x1 = 0;
			y1 = 0;
			x2 = Math.round(originalheight/aspectRatio);
			y2 = originalheight;
			if ( center ) {
				x1 = Math.round(originalwidth-x2)/2;
				x2 += Math.round(originalwidth-x2)/2;
			}
		} else {
			// Current aspect not less trim	height
			x1 = 0;
			y1 = 0;
			x2 = originalwidth;
			y2= Math.round(originalwidth*aspectRatio);
			if ( center ) {
				y1 = Math.round(originalheight-y2)/2;
				y2 += Math.round(originalheight-y2)/2;
			}
		}
	} else {
		// Landscapes including	square
		originalAspectRatio = originalwidth/originalheight	
	
		if (originalAspectRatio	< aspectRatio) {
			// Current aspect ratio	less trim height
			x1 = 0;
			y1 = 0;
			x2 = originalwidth;
			y2 = Math.round(originalwidth /	aspectRatio);
			if ( center ) {
				y1 = Math.round(originalheight-y2)/2;
				y2 += Math.round(originalheight-y2)/2;
			}
		} else {
			// Current aspect not less trim	width
			x1 = 0;
			y1 = 0;
			x2= Math.round(originalheight*aspectRatio);
			y2 = originalheight;
			if ( center )	{
				x1 = Math.round(originalwidth-x2)/2;
				x2 += Math.round(originalwidth-x2)/2;
			}
		}
	}
	if (border) {
		xBorder	= Math.round(x2-x1)*.25/2;
		yBorder	= Math.round(y2-y1)*.25/2;
		x1 = x1+xBorder;
		x2 = x2-xBorder;
		y1 = y1+yBorder;
		y2 = y2-yBorder;
	}

	// Set Marquee Selection Top Left and Bottom Right corners (x1,	y1, x2,	y2);
	setMarqueeSelection(x1,	y1, x2,	y2, type, shape, feather, antiAlias, doPath);

	// restore the ruler to	whatever unit it was in
	app.preferences.rulerUnits = defaultRulerUnits;

	isCancelled = false; //	if get here, definitely	executed
	return false; // no error
}

/* SetMarqueeSelection function from Scriptlistner plugin
// ========================================================================== */
function setMarqueeSelection(x1, y1, x2, y2, type, shape, feather, antiAlias, doPath) {
	if (doPath ==null) { doPath = false; }
	var SelectionType =null;
	if (type ==null)      {	var SelectionType = "setd" }
	if (type ==diminish)  {	var SelectionType = "SbtF" }
	if (type ==extend)    {	var SelectionType = "AddT" }
	if (type ==intersect) {	var SelectionType = "IntW" }
	if (type ==replace)   {	var SelectionType = "setd" }

	var id3	= charIDToTypeID( SelectionType	);
	    var	desc2 =	new ActionDescriptor();
	    var	id4 = charIDToTypeID( "null" );
		var ref1 = new ActionReference();
		if (doPath) {
			var id5	= charIDToTypeID( "Path" );
			var id6	= charIDToTypeID( "WrPt" );
			}
		else {
			var id5	= charIDToTypeID( "Chnl" );
			var id6	= charIDToTypeID( "fsel" );
			}
		ref1.putProperty( id5, id6 );
	    desc2.putReference(	id4, ref1 );
	    var	id7 = charIDToTypeID( "T   " );
		var desc3 = new	ActionDescriptor();
		var id8	= charIDToTypeID( "Top " );
		var id9	= charIDToTypeID( "#Pxl" );
		desc3.putUnitDouble( id8, id9, y1 );
		var id10 = charIDToTypeID( "Left" );
		var id11 = charIDToTypeID( "#Pxl" );
		desc3.putUnitDouble( id10, id11, x1 );
		var id12 = charIDToTypeID( "Btom" );
		var id13 = charIDToTypeID( "#Pxl" );
		desc3.putUnitDouble( id12, id13, y2 );
		var id14 = charIDToTypeID( "Rght" );
		var id15 = charIDToTypeID( "#Pxl" );
		desc3.putUnitDouble( id14, id15, x2 );
	    var	id16 = charIDToTypeID( shape );
	    desc2.putObject( id7, id16,	desc3 );
	    var	id17 = charIDToTypeID( "Fthr" );
	    var	id18 = charIDToTypeID( "#Pxl" );
	    desc2.putUnitDouble( id17, id18, feather );
	    var	id19 = charIDToTypeID( "AntA" );
	    desc2.putBoolean( id19, antiAlias );
	executeAction( id3, desc2, DialogModes.NO );
}
/* ==================================================================================================================================================
================================================================================================================================================== */
// created in
function SaveOffParameters(arInfo) {


	// save	off our	last run parameters
	//var d = objectToDescriptor(arInfo);
	//d.putString( app.charIDToTypeID( 'Msge'), strMessage );
	var d =	objectToDescriptor(arInfo, strMessage);
	app.putCustomOptions("8090f848-cc6b-44a2-ae17-fbe01d5b963a", d);

	app.playbackDisplayDialogs = DialogModes.ALL;

	// save	off another copy so Photoshop can track	them corectly
	//var dd = objectToDescriptor(arInfo);
	//dd.putString( app.charIDToTypeID( 'Msge' ), strMessage );
	var dd = objectToDescriptor(arInfo, strMessage);
	app.playbackParameters = dd;

}

/* ==================================================================================================================================================
================================================================================================================================================== */

function GlobalVariables() {

	// a version for possible expansion issues
	gVersion = 1;

	// remember the	dialog modes
	gSaveDialogMode	= app.displayDialogs;
	app.displayDialogs = DialogModes.NO;

	// all the strings that	need to	be localized
	strTitle = localize( "$$$/JavaScript/AspectRatioSelection/Title=Aspect Ratio Selection"	);
	strAspectRatio = localize( "$$$/JavaScript/AspectRatioSelection/AspectRatio=Aspect Ratio" );
	strTextWidth = localize("$$$/JavaScripts/AspectRatioSelection/Width=&Width:");
	strTextHeight =	localize("$$$/JavaScripts/AspectRatioSelection/Height=&Height:");
	strTextNumber =	localize("$$$/JavaScripts/AspectRatioSelection/Number=Number");
	strTextColen =	localize("$$$/JavaScripts/AspectRatioSelection/Colen=:");
	strTextSelectionOptions	= localize("$$$/JavaScripts/AspectRatioSelection/SelectionOptions=Selection Options");
	strChkCenter =	localize("$$$/JavaScripts/AspectRatioSelection/ChkCenter=&Center");
	strChkBorder =	localize("$$$/JavaScripts/AspectRatioSelection/ChkBorder=&Border");
	strTextShapeType = localize("$$$/JavaScripts/AspectRatioSelection/ShapeType=Selection Shape");
	strTextRectangle = localize("$$$/JavaScripts/AspectRatioSelection/Rectangle=Rectangle");
	strTextEllipse = localize("$$$/JavaScripts/AspectRatioSelection/Ellipse=Ellipse");
	strTextSelectionType = localize("$$$/JavaScripts/AspectRatioSelection/SelectionType=Selection Type");
	strTextReplace = localize("$$$/JavaScripts/AspectRatioSelection/Replace=Replace");
	strTextAdd = localize("$$$/JavaScripts/AspectRatioSelection/Add=Add");
	strTextSubtract	= localize("$$$/JavaScripts/AspectRatioSelection/Subtract=Subtract");
	strTextIntersect = localize("$$$/JavaScripts/AspectRatioSelection/Intersect=Intersect");

        strTextSelectiorPath = localize("$$$/JavaScripts/AspectRatioSelection/SelectiorPath=Selection or Path"); 	
	strTextSelection = localize("$$$/JavaScripts/AspectRatioSelection/Selection=Selection"); 
	strTextPath = localize("$$$/JavaScripts/AspectRatioSelection/Path=Path"); 

	strTextFeatherAmount = localize("$$$/JavaScripts/AspectRatioSelection/FeatherAmount=Feather Amount");
	strTextPixels =	localize("$$$/JavaScripts/AspectRatioSelection/Pixels=Pixels");
	strTextAnitAlias = localize("$$$/JavaScripts/AspectRatioSelection/AntiAlias=Anti-Alias");
	strChkAnitAlias = localize("$$$/JavaScripts/AspectRatioSelection/ChkAntiAlias=&Anti-Alias");
	strButtonOK = localize("$$$/JavaScripts/AspectRatioSelection/OK=OK");
	strButtonCancel	= localize("$$$/JavaScripts/AspectRatioSelection/Cancel=Cancel");
	strTextSorry = localize("$$$/JavaScripts/AspectRatioSelection/Sorry=Sorry, Dialog failed");
	strTextInvalidType = localize("$$$/JavaScripts/AspectRatioSelection/InvalidType=Invalid	numeric	value");
	strTextInvalidNum = localize("$$$/JavaScripts/AspectRatioSelection/InvalidNum=A	number between 1 and 30000 is required.	Closest	value inserted.");
	strTextNeedFile	= localize("$$$/JavaScripts/AspectRatioSelection/NeedFile=You must have	a file selected	before using Aspect Ratio Selection");
	strMessage = localize("$$$/JavaScripts/AspectRatioSelection/Message=Aspect Ratio Selection action settings");
	strMustUse = localize( "$$$/JavaScripts/AspectRatioSelection/MustUse=You must use Photoshop CS 3 or later to run this script!" );

	strHelpAR = localize( "$$$/JavaScripts/AspectRatioSelection/AR=Aspect Ratio width and height" );
	strHelpCTR = localize( "$$$/JavaScripts/AspectRatioSelection/CTR=Origin Center or Top Left" );
	strHelpBRD = localize( "$$$/JavaScripts/AspectRatioSelection/BRD=25% border or not" );
	strHelpRCT = localize( "$$$/JavaScripts/AspectRatioSelection/RCT=Select a rectangle" );
	strHelpEPS = localize( "$$$/JavaScripts/AspectRatioSelection/EPS=Select an ellipse" );
	strHelpRPL = localize( "$$$/JavaScripts/AspectRatioSelection/RPL=Replace current selection or make new one" );
	strHelpADD = localize( "$$$/JavaScripts/AspectRatioSelection/ADD=Add to current selection" );
	strHelpSUB = localize( "$$$/JavaScripts/AspectRatioSelection/SUB=Subtract from crrent selection" );
	strHelpINT = localize( "$$$/JavaScripts/AspectRatioSelection/INT=Intersect with current selection" );
	strHelpFTR = localize( "$$$/JavaScripts/AspectRatioSelection/FTR=Number of pixels to feather by" );
	strHelpANT = localize( "$$$/JavaScripts/AspectRatioSelection/ANT=Anti-Alias or not" );

	strHelpsop = localize("$$$/JavaScripts/AspectRatioSelection/sop=Selection or Path");

	// bit flags for checkboxes
	FLAG_CENTER = false;
	FLAG_BORDER = false;
	FLAG_ANTIALIAS = false;	
	// bit flags for radiobuttons
	FLAG_RECTANGLE = false;
	FLAG_ELLIPSE = false;
	FLAG_REPLACE = false;	
	FLAG_ADD = false;
	FLAG_SUBTRACT = false;
	FLAG_INTERSECT = false;	
	FLAG_SLT = false;
	FLAG_PTH = false;	

}

/*  ================================================== The main class ==================================================================================== */
function AspectRatioSelection()	{

	this.CreateDialog = function() {

		// I will keep most of the important dialog items at the same level
		// and use auto	layout
		// use overriding group	so OK/Cancel buttons placed to right of	panel
		var res	=
			"dialog	{ \
				pAndB: Group { orientation: 'column', \
					arinfo: Panel { orientation: 'row', borderStyle: 'sunken', \
						text: '" + strAspectRatio +"', \
						helpTip: '" + strHelpAR + "',\
						w: Group { orientation:	'row', alignment: 'right',\
							helpTip: '" + strHelpAR + "',\
							s: StaticText {	text:'"+"' }, \
							e: EditText { preferredSize: [45, 20] }, \
							p: StaticText {	 text:'" + strTextNumber +"'} \
						}, \
						h: Group { orientation:	'row', alignment: 'right', \
							helpTip: '" + strHelpAR   + "',\
							s: StaticText {	text:'"	+ strTextColen + "' },	\
							e: EditText { preferredSize: [45, 20] }, \
							p: StaticText {	text:'"	+ strTextNumber	+ "'} \
						} \
					}, \
					opinfo: Panel { orientation: 'row', borderStyle: 'sunken', \
						text: '" + strTextSelectionOptions +"',	\
						helpTip: '" + strHelpCTR + ", " + strHelpBRD + "',\
						ctr: Checkbox { text:'" + strChkCenter +"', alignment:'left'}, \
						bdr: Checkbox { text:'" + strChkBorder + "', alignment:'left'} \
					}, \
					shinfo: Panel { orientation: 'row', borderStyle: 'sunken', \
						text: '" + strTextShapeType +"', \
						helpTip: '" + strHelpRCT + ", " + strHelpEPS + "',\
						rct: RadioButton { text:'" + strTextRectangle +"', alignment:'left'}, \
						eps: RadioButton { text:'" + strTextEllipse + "', alignment:'left'} \
					}, \
					tyinfo: Panel { orientation: 'row', borderStyle: 'sunken', \
						text: '" + strTextSelectionType	+"', \
						helpTip: '" + strHelpRPL + ", " + strHelpADD +  ", " + strHelpSUB + ", " + strHelpINT + "',\
						rpl: RadioButton { text:'" + strTextReplace +"', alignment:'left'}, \
						adr: RadioButton { text:'" + strTextAdd +"', alignment:'left'}, \
						sub: RadioButton { text:'" + strTextSubtract +"', alignment:'left'}, \
						itc: RadioButton { text:'" + strTextIntersect + "', alignment:'left'} \
					}, \
					ptinfo: Panel { orientation: 'row', borderStyle: 'sunken', \
						text: '" + strTextSelectiorPath	+"', \
						helpTip: '" + strHelpsop + "',\
						slt: RadioButton { text:'" + strTextSelection +"', alignment:'left'}, \
						pth: RadioButton { text:'" + strTextPath +"', alignment:'left'}, \
					}, \
					ftinfo: Panel { orientation: 'row', borderStyle: 'sunken', \
						text: '" + strTextFeatherAmount	+"', \
						helpTip: '" + strHelpFTR + "',\
						f: Group { orientation:	'row', alignment: 'right',\
							helpTip: '" + strHelpFTR + "',\
							s: StaticText {	text:'"+"' }, \
							e: EditText { preferredSize: [45, 20] }, \
							p: StaticText {	 text:'" + strTextPixels +"'} \
						} \
					}, \
					aainfo: Panel { orientation: 'row', borderStyle: 'sunken', \
						text: '" + strTextAnitAlias +"', \
						helpTip: '" + strHelpANT + "',\
						ant: Checkbox { text:'" + strChkAnitAlias + "', alignment:'left'} \
					}, \
					buttons: Group { orientation: 'row', alignment:	'top',	\
						okBtn: Button {	text:'"	+ strButtonOK +"', properties:{name:'ok'} }, \
						cancelBtn: Button { text:'" + strButtonCancel +	"', properties:{name:'cancel'} } \
					} \
				} \
			}";

		// the following, when placed after e: in w and	h doesn't show up
		// this	seems to be OK since px	is put inside the dialog box
		//p: StaticText	{ text:'" + strTextPixels + "'}

		// create the main dialog window, this holds all our data
		this.dlgMain = new Window(res,strTitle);

		// create a shortcut for easier	typing
		var d =	this.dlgMain;

		d.defaultElement = d.pAndB.buttons.okBtn;
		d.cancelElement	= d.pAndB.buttons.cancelBtn;
	} // end of CreateDialog
/* ==================================================================================================================================================
================================================================================================================================================== */

	// initialize variables	of dialog
	this.InitVariables = function() {

		var oldPref = app.preferences.rulerUnits;

		app.preferences.rulerUnits = Units.PIXELS;

		// look	for last used params via Photoshop registry, getCustomOptions will throw if none exist
		try {
			var desc = app.getCustomOptions("8090f848-cc6b-44a2-ae17-fbe01d5b963a");
			descriptorToObject(arInfo, desc, strMessage);
		}
		catch(e) {
			// it's	ok if we don't have any	options, continue with defaults
		}

		// see if I am getting descriptor parameters
		descriptorToObject(arInfo, app.playbackParameters, strMessage);

		// make internal state reflect saved parameters
		FLAG_CENTER = arInfo.flagCENTER;
		FLAG_BORDER = arInfo.flagBORDER;
		FLAG_ANTIALIAS = arInfo.flagANTIALIAS;
		FLAG_RECTANGLE = arInfo.flagRECTANGLE;
		FLAG_ELLIPSE = arInfo.flagELLIPSE;
		FLAG_REPLACE = arInfo.flagREPLACE;
		FLAG_ADD = arInfo.flagADD;
		FLAG_SUBTRACT = arInfo.flagSUBTRACT;
		FLAG_INTERSECT = arInfo.flagINTERSECT;
		FLAG_SLT = arInfo.flagSLT;
		FLAG_PTH = arInfo.flagPTH;



		// Use Radio button settings
		if ( FLAG_RECTANGLE ) { shape = rectangle; }
		if ( FLAG_ELLIPSE ) { shape = ellipse; }
		if ( FLAG_REPLACE ) { type = replace; }
		if ( FLAG_ADD ) { type = add; }
		if ( FLAG_SUBTRACT ) { type = subtract; }
		if ( FLAG_INTERSECT ) { type = intersect; }
		if ( FLAG_SLT ) { doPath = false; }
		if ( FLAG_PTH ) { doPath = true; }

		// make	sure got parameters before this
		if (app.documents.length <= 0) // count	of documents viewed
		{
			if ( DialogModes.NO != app.playbackDisplayDialogs ) {
				alert(strTextNeedFile);	// only	put up dialog if permitted
			}
			app.preferences.rulerUnits = oldPref;
			return false; // if no docs, always return
		}


		if ( app.activeDocument.height > app.activeDocument.width) { // Portrait
			var h =	app.activeDocument.width;
			var w =	app.activeDocument.height;
		}
		else {
			var w =	app.activeDocument.width;
			var h =	app.activeDocument.height;
		}


		if (arInfo.width.value == 0) {
			arInfo.width = w;
		}
		else {
			w = arInfo.width;
		}


		if (arInfo.height.value == 0)	{
			arInfo.height	= h;
		}
		else {
			h = arInfo.height;
		}

		app.preferences.rulerUnits = oldPref;

		f = arInfo.feather;

		if ( DialogModes.ALL ==	app.playbackDisplayDialogs ) {
			var d =	this.dlgMain;
			d.ip = this;

			d.pAndB.arinfo.w.e.text =	Number(w);
			d.pAndB.arinfo.h.e.text =	Number(h);
			d.pAndB.ftinfo.f.e.text =	Number(f);
			d.pAndB.opinfo.ctr.value = arInfo.flagCENTER;
			d.pAndB.opinfo.bdr.value = arInfo.flagBORDER;
			d.pAndB.aainfo.ant.value = arInfo.flagANTIALIAS;

			d.pAndB.shinfo.rct.value = arInfo.flagRECTANGLE;
			d.pAndB.shinfo.eps.value = arInfo.flagELLIPSE;
			d.pAndB.tyinfo.rpl.value = arInfo.flagREPLACE;
			d.pAndB.tyinfo.adr.value = arInfo.flagADD;
			d.pAndB.tyinfo.sub.value = arInfo.flagSUBTRACT;
			d.pAndB.tyinfo.itc.value = arInfo.flagINTERSECT;

			d.pAndB.ptinfo.slt.value = arInfo.flagSLT;
			d.pAndB.ptinfo.pth.value = arInfo.flagPTH;



		}
		return true;
	}
/* ==================================================================================================================================================
================================================================================================================================================== */

	// routine for running the dialog and it's interactions
	this.RunDialog = function () {
		var d =	this.dlgMain;

		// in case hit cancel button, don't close
		d.pAndB.buttons.cancelBtn.onClick = function() {
			var dToCancel =	FindDialog( this );
			dToCancel.close( false );
		}

		// nothing for now
		d.onShow = function() {
		}

		// do not allow anything except for numbers 0-9
		d.pAndB.arinfo.w.e.addEventListener ('keydown', NumericEditKeyboardHandler);

		// do not allow anything except for numbers 0-9
		d.pAndB.arinfo.h.e.addEventListener ('keydown', NumericEditKeyboardHandler);

		// do not allow anything except for numbers 0-9
		d.pAndB.ftinfo.f.e.addEventListener ('keydown', NumericEditKeyboardHandler);

		// hit OK, do resize
		d.pAndB.buttons.okBtn.onClick =	function () {

			var wText = d.pAndB.arinfo.w.e.text;
			var hText = d.pAndB.arinfo.h.e.text;
			var fText = d.pAndB.ftinfo.f.e.text;
			var w =	Number(wText);
			var h =	Number(hText);
			var f =	Number(fText);
			var FLAG_CENTER = d.pAndB.opinfo.ctr.value;
			var FLAG_BORDER = d.pAndB.opinfo.bdr.value;
			var FLAG_ANTIALIAS = d.pAndB.aainfo.ant.value;

			var FLAG_RECTANGLE = d.pAndB.shinfo.rct.value;
			var FLAG_ELLIPSE = d.pAndB.shinfo.eps.value;
			var FLAG_REPLACE = d.pAndB.tyinfo.rpl.value;
			var FLAG_ADD = d.pAndB.tyinfo.adr.value;
			var FLAG_SUBTRACT = d.pAndB.tyinfo.sub.value;
			var FLAG_INTERSECT= d.pAndB.tyinfo.itc.value;
			var FLAG_SLT = d.pAndB.ptinfo.slt.value;
			var FLAG_PTH= d.pAndB.ptinfo.pth.value;

			arInfo.flagCENTER = FLAG_CENTER;
			arInfo.flagBORDER = FLAG_BORDER;
			arInfo.flagANTIALIAS = FLAG_ANTIALIAS;
			arInfo.flagRECTANGLE = FLAG_RECTANGLE;
			arInfo.flagELLIPSE = FLAG_ELLIPSE;
			arInfo.flagREPLACE = FLAG_REPLACE;
			arInfo.flagADD = FLAG_ADD;
			arInfo.flagSUBTRACT  = FLAG_SUBTRACT;
			arInfo.flagINTERSECT = FLAG_INTERSECT;
			arInfo.flagSLT = FLAG_SLT;
			arInfo.flagPTH = FLAG_PTH;

			var inputErr = false;

			// Use Radio Buttons settings
			if ( FLAG_RECTANGLE ) { shape = rectangle; }
			if ( FLAG_ELLIPSE ) { shape = ellipse; }
			if ( FLAG_REPLACE ) { type = replace; }
			if ( FLAG_ADD ) { type = add; }
			if ( FLAG_SUBTRACT ) { type = subtract; }
			if ( FLAG_INTERSECT ) { type = intersect; }
			if ( FLAG_SLT ) { doPath = false; }
			if ( FLAG_PTH ) { doPath = true; }

			if ( isNaN( w )	|| isNaN( h ) )	{
				if ( DialogModes.NO != app.playbackDisplayDialogs ) {
					alert( strTextInvalidType );
				}
				if (isNaN( w ))	{
					arInfo.width = new UnitValue(	1, "px"	);
					d.pAndB.arinfo.w.e.text =	1;
				} else {
					arInfo.height	= new UnitValue( 1, "px" );
					d.pAndB.arinfo.h.e.text =	1;
				}
				return false;
			}
			else if	( w <= 0) {
				inputErr = true;
				arInfo.width = new UnitValue(	1, "px"	);
				d.pAndB.arinfo.w.e.text =	1;
			}
			else if	( w > 30000) {
				inputErr = true;
				arInfo.width = new UnitValue(	30000, "px" );
				d.pAndB.arinfo.w.e.text =	30000;
			}
			else if	( h <= 0) {
				inputErr = true;
				arInfo.height	= new UnitValue( 1, "px" );
				d.pAndB.arinfo.h.e.text =	1;
			}
			else if	( h > 30000) {
				inputErr = true;
				arInfo.height	= new UnitValue( 30000,	"px" );
				d.pAndB.arinfo.h.e.text =	30000;
			}
			if (inputErr) {
				if ( DialogModes.NO != app.playbackDisplayDialogs ) {
					alert( strTextInvalidNum );
				}
				return false;
			}


			if ( isNaN( f )	)	{
				if ( DialogModes.NO != app.playbackDisplayDialogs ) {
					alert( strTextInvalidType );
				}
				if (isNaN( f ))	{
					arInfo.width = new UnitValue(	0, "px"	);
					d.pAndB.ftinfo.f.e.text =       0;	
				}
				return false;
			}
			else if	( f < 0) {
				inputErr = true;
				arInfo.width = new UnitValue(	0, "px"	);
				d.pAndB.ftinfo.f.e.text =	0;
			}
			else if	( f > 30000) {
				inputErr = true;
				arInfo.width = new UnitValue(	30000, "px" );
				d.pAndB.ftinfo.w.e.text =	30000;
			}
			
			arInfo.width = new UnitValue( w, "px"	);
			arInfo.height = new UnitValue( h, "px" );
			arInfo.feather = new UnitValue( f, "px" );

			if (inputErr) {
				if ( DialogModes.NO != app.playbackDisplayDialogs ) {
					alert( strTextInvalidNum );
				}
				return false;
			}

			if (showparms) {
				alert( "Dialog State" + " " +
				"Center " + FLAG_CENTER + " " + arInfo.flagCENTER +
				" Border " + FLAG_BORDER + " " + arInfo.flagBORDER +
				" Anti_Alias " + FLAG_ANTIALIAS + " " + arInfo.flagANTIALIAS +
				" Rectantangle " + FLAG_RECTANGLE + " " + arInfo.flagRECTANGLE +
				" Ellipse " + FLAG_ELLIPSE + " " + arInfo.flagELLIPSE +
				" Replace " + FLAG_REPLACE + " " + arInfo.flagREPLACE +
				" Add " +	FLAG_ADD + " " + arInfo.flagADD +
				" Subtract " + FLAG_SUBTRACT + " " + arInfo.flagSUBTRACT +
				" Intersect " + FLAG_INTERSECT + " " + arInfo.flagINTERSECT); }
			if (showparms) {alert("From Dialog " + arInfo.width.value + ":" + arInfo.height.value + " Center " + FLAG_CENTER + " Border " + FLAG_BORDER +" Shape " + shape + " Selection Type " + type + " Feather " + arInfo.feather.value + " Anti-Alias " + FLAG_ANTIALIAS ); }
			if (ARselect(arInfo.width.value , arInfo.height.value, FLAG_CENTER, FLAG_BORDER, shape, type, arInfo.feather.value, FLAG_ANTIALIAS, doPath )) { // the whole point
				// error, input	
			}
			d.close(true);
			return;
		}

		if (!this.InitVariables())
		{
			return true; //	handled	it
		}

		// give	the hosting app	the focus before showing the dialog
		app.bringToFront();
		this.dlgMain.center();
		return d.show();
	}
}

/* ==================================================================================================================================================
================================================================================================================================================== */
function CheckVersion()	{
	var numberArray	= version.split(".");
	if ( numberArray[0] < 10 ) {
		if ( DialogModes.NO != app.playbackDisplayDialogs ) {
			alert( strMustUse );
		}
		throw( strMustUse );
	}
}

function FindDialog( inItem ) {
	var w =	inItem;
	while (	'dialog' != w.type ) {
		if ( undefined == w.parent ) {
			w = null;
			break;
		}
		w = w.parent;
	}
	return w;
}


///////////////////////////////////////////////////////////////////////////////
// Function: objectToDescriptor
// Usage: create an ActionDescriptor from a JavaScript Object
// Input: JavaScript Object (o)
//        object unique string (s)
//        Pre process converter (f)
// Return: ActionDescriptor
// NOTE: Only boolean, string, number and UnitValue are supported, use a pre processor
//       to convert (f) other types to one of these forms.
// REUSE: This routine is used in other scripts. Please update those if you
//        modify. I am not using include or eval statements as I want these
//        scripts self contained.
///////////////////////////////////////////////////////////////////////////////
function objectToDescriptor (o, s, f) {
	if (undefined != f) {
		o = f(o);
	}

	var d = new ActionDescriptor;
	var l = o.reflect.properties.length;
	d.putString( app.charIDToTypeID( 'Msge' ), s );
	for (var i = 0; i < l; i++ ) {
		var k = o.reflect.properties[i].toString();
		if (k == "__proto__" || k == "__count__" || k == "__class__" || k == "reflect")
			continue;
		var v = o[ k ];
		k = app.stringIDToTypeID(k);
		switch ( typeof(v) ) {
			case "boolean":
				d.putBoolean(k, v);
				break;
			case "string":
				d.putString(k, v);
				break;
			case "number":
				d.putDouble(k, v);
				break;
			default:
			{
				if ( v instanceof UnitValue ) {
					var uc = new Object;
					uc["px"] = charIDToTypeID("#Pxl"); // pixelsUnit
					uc["%"] = charIDToTypeID("#Prc"); // unitPercent
					d.putUnitDouble(k, uc[v.type], v.value);
				} else {
					throw( new Error("Unsupported type in objectToDescriptor " + typeof(v) ) );
				}
			}
		}
	}
    return d;
}



///////////////////////////////////////////////////////////////////////////////
// Function: descriptorToObject
// Usage: update a JavaScript Object from an ActionDescriptor
// Input: JavaScript Object (o), current object to update (output)
//        Photoshop ActionDescriptor (d), descriptor to pull new params for object from
//        object unique string (s)
//        JavaScript Function (f), post process converter utility to convert
// Return: Nothing, update is applied to passed in JavaScript Object (o)
// NOTE: Only boolean, string, number and UnitValue are supported, use a post processor
//       to convert (f) other types to one of these forms.
// REUSE: This routine is used in other scripts. Please update those if you
//        modify. I am not using include or eval statements as I want these
//        scripts self contained.
///////////////////////////////////////////////////////////////////////////////

function descriptorToObject (o, d, s, f) {
	var l = d.count;
	if (l) {
	    var keyMessage = app.charIDToTypeID( 'Msge' );
        if ( d.hasKey(keyMessage) && ( s != d.getString(keyMessage) )) return;
	}
	for (var i = 0; i < l; i++ ) {
		var k = d.getKey(i); // i + 1 ?
		var t = d.getType(k);
		strk = app.typeIDToStringID(k);
		switch (t) {
			case DescValueType.BOOLEANTYPE:
				o[strk] = d.getBoolean(k);
				break;
			case DescValueType.STRINGTYPE:
				o[strk] = d.getString(k);
				break;
			case DescValueType.DOUBLETYPE:
				o[strk] = d.getDouble(k);
				break;
			case DescValueType.UNITDOUBLE:
				{
				var uc = new Object;
				uc[charIDToTypeID("#Rlt")] = "px"; // unitDistance
				uc[charIDToTypeID("#Prc")] = "%"; // unitPercent
				uc[charIDToTypeID("#Pxl")] = "px"; // unitPixels
				var ut = d.getUnitDoubleType(k);
				var uv = d.getUnitDoubleValue(k);
				o[strk] = new UnitValue( uv, uc[ut] );
				}
				break;
			case DescValueType.INTEGERTYPE:
			case DescValueType.ALIASTYPE:
			case DescValueType.CLASSTYPE:
			case DescValueType.ENUMERATEDTYPE:
			case DescValueType.LISTTYPE:
			case DescValueType.OBJECTTYPE:
			case DescValueType.RAWTYPE:
			case DescValueType.REFERENCETYPE:
			default:
				throw( new Error("Unsupported type in descriptorToObject " + t ) );
		}
	}
	if (undefined != f) {
		o = f(o);
	}
}


/* Function: ARInfo
// Usage: object for holding the dialog	parameters
// Input: <none>
// Return: object holding the size info
/////////////////////////////////////////////////////////////////////////////// */
function ARInfo() {

	this.height = new UnitValue(0, "px");
	this.width = new UnitValue(0, "px");
	this.flagCENTER = FLAG_CENTER;
	this.flagBORDER = FLAG_BORDER;
	this.flagRECTANGLE = FLAG_RECTANGLE;
	this.flagELLIPSE = FLAG_ELLIPSE;
	this.flagREPLACE = FLAG_REPLACE;
	this.flagADD = FLAG_ADD;
	this.flagSUBTRACT = FLAG_SUBTRACT;
	this.flagINTERSECT = FLAG_INTERSECT;
	this.flagSLT = FLAG_SLT;
	this.flagPTH = FLAG_PTH;
	this.feather = new UnitValue(0, "px");
	this.flagANTIALIAS = FLAG_ANTIALIAS;
}


///////////////////////////////////////////////////////////////////////////////
// Function: NumericEditKeyboardHandler
// Usage: Do not allow anything except for numbers 0-9
// Input: ScriptUI keydown event
// Return: <nothing> key is rejected and beep is sounded if invalid
///////////////////////////////////////////////////////////////////////////////
function NumericEditKeyboardHandler (event) {

    try {

        var keyIsOK = KeyIsNumeric (event) ||
					  KeyIsDelete (event) ||
					  KeyIsLRArrow (event) ||
					  KeyIsTabEnterEscape (event);



        if (! keyIsOK) {
            //    Bad input: tell ScriptUI not to accept the keydown event
            event.preventDefault();

            /*    Notify user of invalid input: make sure NOT
			       to put up an alert dialog or do anything which
		                 requires user interaction, because that
		                 interferes with preventing the 'default'
		                 action for the keydown event */
            app.beep();
        }
    }
    catch (e) {
        ; // alert ("Ack! bug in NumericEditKeyboardHandler: " + e);
    }
}

//    key identifier functions
function KeyHasModifier (event) {
    return event.shiftKey || event.ctrlKey || event.altKey || event.metaKey;
}

function KeyIsNumeric (event) {
    return  (event.keyName >= '0') && (event.keyName <= '9') && ! KeyHasModifier (event);
}

function KeyIsDelete (event) {
    //    Shift-delete is ok
    return ((event.keyName == 'Backspace') || (event.keyName == 'Delete')) && ! (event.ctrlKey);
}

function KeyIsLRArrow (event) {
    return ((event.keyName == 'Left') || (event.keyName == 'Right')) && ! (event.altKey || event.metaKey);
}

function KeyIsTabEnterEscape (event) {
    return event.keyName == 'Tab' || event.keyName == 'Enter' || event.keyName == 'Escape';
}


/*  End Aspect Ratio Selection.jsx  */

