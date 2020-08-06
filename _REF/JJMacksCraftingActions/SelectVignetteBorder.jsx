/* ==========================================================
// 2008  John J. McAssey (JJMack) 
// ======================================================= */

// This script is supplied as is. It is provided as freeware. 
// The author accepts no liability for any problems arising from its use.

/*
<javascriptresource>
<about>$$$/JavaScripts/SelectVignetteBorder/About=JJMack's Select Vignette Border.^r^rCopyright 2009 Mouseprints.^r^rScript utility for action.^rNOTE:Select Vignette Border with images's aspect ratio!</about>
<category>JJMack's Action Utility</category>
</javascriptresource>
*/

// enable double-clicking from Mac Finder or Windows Explorer
#target photoshop // this command only works in Photoshop CS2 and higher

// bring application forward for double-click events
app.bringToFront();

// ensure at least one document open
if (!documents.length) {
	alert('There are no documents open.', 'No Document');
}

// if at least one document exists, then proceed
else {
	main();
}

///////////////////////////////////////////////////////////////////////////////
// main - main function
///////////////////////////////////////////////////////////////////////////////
function main() {
	try {
		// Set the ruler units to PIXELS
		var orig_ruler_units = app.preferences.rulerUnits;
		app.preferences.rulerUnits = Units.PIXELS;


		// ============================================================================================================
		// Reset Vars Used and create some alias to make things easier for this hacker
		// ============================================================================================================ */
		// vars	for shape
		var rectangle	="Rctn";
		var ellipse	="Elps";
		// vars	for type
		var diminish	="diminish";
		var subtract	="diminish";
		var extend	="extend";
		var add		="add";
		var intersect	="intersect";
		var replace	="replace";
		/* ============================================================================================================
		// end vars and Aliases
		// ============================================================================================================ */

		SelectAll();
		var width	= app.activeDocument.width;
		var height	= app.activeDocument.height;
		var center	= true;
		var border	= true;	
		var shape	= ellipse;		
		var type	= subtract;
		var feather	= 500;
		var antiAlias	= false;
		ARselect(width, height, center, border, shape,	type, feather, antiAlias )

	
		// Reset units to original settings
		app.preferences.rulerUnits = orig_ruler_units;
	}
	// display error message if something goes wrong
	catch(e) { alert(e + ': on line ' + e.line, 'Script Error', true); }
}


function SelectAll() {

	var doc = activeDocument;

	var frameRef = [
	[0,0],
	[0,app.activeDocument.height],
	[app.activeDocument.width,app.activeDocument.height],
	[app.activeDocument.width,0],
	]

	doc.selection.select(frameRef);


}



/* ==================================================================================================================================================
================================================================================================================================================== */
function ARselect(width, height, center, border, shape,	type, feather, antiAlias ) {

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
	setMarqueeSelection(x1,	y1, x2,	y2, type, shape, feather, antiAlias);

	// restore the ruler to	whatever unit it was in
	app.preferences.rulerUnits = defaultRulerUnits;

	isCancelled = false; //	if get here, definitely	executed
	return false; // no error
}

/* SetMarqueeSelection function from Scriptlistner plugin
// ========================================================================== */
function setMarqueeSelection(x1, y1, x2, y2, type, shape, feather, antiAlias) {

	var SelectionType =null;
	if (type ==null)      {	var SelectionType = "setd" }
 	if (type =="diminish")  {	var SelectionType = "SbtF" }
	if (type =="extend")    {	var SelectionType = "AddT" }
	if (type =="intersect") {	var SelectionType = "IntW" }
	if (type =="replace")   {	var SelectionType = "setd" }

	var id3	= charIDToTypeID( SelectionType	);
	    var	desc2 =	new ActionDescriptor();
	    var	id4 = charIDToTypeID( "null" );
		var ref1 = new ActionReference();
		var id5	= charIDToTypeID( "Chnl" );
		var id6	= charIDToTypeID( "fsel" );
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



