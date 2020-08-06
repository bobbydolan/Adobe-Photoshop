//////////////////////////////////////////////////////////////////////////////////
// 
// Copyright 2002-2003. Adobe Systems, Incorporated. All rights reserved. 
// This scripts demonstrates how to rotate a layer 90 degrees clockwise. 
// Original file came from PSCS scripting\samples\javascript\RotateLayer.js 
// 
// Variation Copyright(c)Douglas Cody, 2004, All Rights Reserved.
// http://www.clikphoto.com 
// 
// Updataed John J McAssey 2008 - 2009 http://mouseprints.net 
//
// This script is designed to be used by a Photoshop Action twice
// A good pratice to use when creating an actions that use this scipt is for the action 
// not to do a save or play some other action between its two useages of this Script.
// 
// This script will look at the document orientation (portrait vs landscape) 
// On the first execution, if the document is a portrait, it will be rotated 
// to a horizontal. 
// On the second execution, a rotated document will be 
// restored to a vertical. This effectively toggles the orientation ONLY if 
// the original document started out as a portrait. 
//
// NOTE: Meta-data Info Instructions field is modified to hold an interim state.
//
// Bug Fixes by JJMack, 2008, with the original code Square images were always 
// rotated -90 and marked "rotate back" with two executions you wound up with
// an upside down image... The original code would also fail to rotate an image
// back if the action added canvas and change the rotated images aspect ratio 
// to other then landscape. Again you wind up with a marked upside down image.
// In addition units the compare could fail because the script did not set the 
// units to use for rulers.   
// 
// Updated in 2009 JJMack to remove some restrictions try make it near bullet proof  
// presserve any data that might have been in Files metada Info Instructions field
// this also allows more one run twice scripts to be used on a document.
//
//////////////////////////////////////////////////////////////////////////////////

/*
<javascriptresource>
<about>$$$/JavaScripts/orient/About=JJMack's Orient^r^rCopyright 2009 Mouseprints.^r^rRun twice script utility for action.^rNOTE:Don't play other actions between runs!^rFirst Run records orintation and rotate Protrait to Landscape^rSecond Run removes orintation recorded and rotates Portrats back.</about>
<category>JJMack's Action Run Twice Utility</category>
</javascriptresource>
*/

if (app.documents.length > 0) { 
        var orintation = '';
	if (app.activeDocument.info.instructions.indexOf("<orient>") == -1 ) { // No Footprint 
		//alert("first")

		var orig_ruler_units = app.preferences.rulerUnits;	// Save ruler units
		app.preferences.rulerUnits = Units.PIXELS;		// Set ruler units to PIXELS

		// Add Foot Print to  metadata info instructions and rorate protrait documents 
		// alert( " Width = " + app.activeDocument.width + " Height = " + app.activeDocument.height );
		if (app.activeDocument.width < app.activeDocument.height) { // portrait  
			app.activeDocument.rotateCanvas(-90.0); 
			app.activeDocument.info.instructions = app.activeDocument.info.instructions += "<orient>portrait</orient>"; 
		} 
		else { app.activeDocument.info.instructions += "<orient>landscape or square</orient>"; } // not portrait
		// Reset units to original settings

		app.preferences.rulerUnits = orig_ruler_units;		// Restore ruler units 
	} 
	else { 
		//alert("second")
		// Retreive saved orintation and rotate portrait back up
		orientOffset = app.activeDocument.info.instructions.indexOf("<orient>") + "<orient>".length;
		orientLength = app.activeDocument.info.instructions.indexOf("</orient>") -orientOffset;
		orintation = app.activeDocument.info.instructions.substr(orientOffset, orientLength);
		if ( orintation == "portrait" ) { app.activeDocument.rotateCanvas(90.0); }

		// Remove footprint from metadata info instructions
		before = app.activeDocument.info.instructions.substr(0,app.activeDocument.info.instructions.indexOf("<orient>"));
		afterOffset = app.activeDocument.info.instructions.indexOf("</orient>") + "</orient>".length;
		after = app.activeDocument.info.instructions.substr(afterOffset, app.activeDocument.info.instructions.length - afterOffset);
		app.activeDocument.info.instructions = before + after;
	} 
} 
else { alert("You must have at least one open document to run this script!"); } 
