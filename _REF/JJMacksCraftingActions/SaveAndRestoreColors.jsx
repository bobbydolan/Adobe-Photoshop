/* ======================================================================================
// 2009  John J. McAssey (JJMack)  http://www.mouseprints.net/
//  
// This script is supplied as is. It is provided as freeware. 
// The author accepts no liability for any problems arising from its use.
//
// This script is designed to be used by a Photoshop Action twice
// A good pratice to use when creating an actions that use this scipt is for the action 
// not to do a save or play some other action between its two useages of this Script.
// 
// The first time this script is used by an action Photoshops Current Forground 
// and Background Colors are saved into the document's meta-data Info Instructions field.
//
// The second time this script used by the action the script retreives what was
// saved in the meta-data during the first usage and these colors are set.
// and the saved data is removed from the document's meta-data Info Instructions field.
//
// ===================================================================================== */

/*
<javascriptresource>
<about>$$$/JavaScripts/SaveAndRestoreColors/About=JJMack's SaveAndRestoreColors.^r^rCopyright 2009 Mouseprints.^r^rRun twice script utility for action.^rNOTE:Don't play other actions between runs!^r^rFirst Run records Photoshops foreground and background swatch colors.^rSecond Run restores the recorded colors and removes the recording.</about>
<category>JJMack's Action Run Twice Utility</category>
</javascriptresource>
*/

if (app.documents.length > 0) { 
	if (app.activeDocument.info.instructions.indexOf("<Colorf>") == -1 ){ // no footprint fisrt useage 
		//alert("first");
		// Retreive Document information for Foot Print 
		saveforeColor = new SolidColor;
		saveforeColor.rgb.red = app.foregroundColor.rgb.red;
		saveforeColor.rgb.green = app.foregroundColor.rgb.green;
		saveforeColor.rgb.blue = app.foregroundColor.rgb.blue;

		savebackColor = new SolidColor;
		savebackColor.rgb.red = app.backgroundColor.rgb.red;
		savebackColor.rgb.green = app.backgroundColor.rgb.green;
		savebackColor.rgb.blue = app.backgroundColor.rgb.blue;
               

		// put footprint in metadata info instructions

		app.activeDocument.info.instructions = app.activeDocument.info.instructions + "<Colorf>" + saveforeColor.rgb.red + "," + saveforeColor.rgb.green + "," + saveforeColor.rgb.blue + "</Colorf>" + "<Colorb>" + savebackColor.rgb.red + "," + savebackColor.rgb.green + "," + savebackColor.rgb.blue + "</Colorb>"; 
		//alert( "Saved ="  + "<Colorf>" + saveforeColor.rgb.red + "," + saveforeColor.rgb.green + "," + saveforeColor.rgb.blue + "</Colorf>" + "<Colorb>" + savebackColor.rgb.red + "," + savebackColor.rgb.green + "," + savebackColor.rgb.blue + "</Colorb>"); 


	} 
	else { 
		//alert("second");

		// Retreive saved information
		colorfOffset = app.activeDocument.info.instructions.indexOf("<Colorf>") + "<Colorf>".length;
		colorfLength = app.activeDocument.info.instructions.indexOf("</Colorf") -colorfOffset;	
		saveforeColor = app.activeDocument.info.instructions.substr(colorfOffset, colorfLength);

		colorbOffset = app.activeDocument.info.instructions.indexOf("<Colorb>") + "<Colorb>".length;
		colorbLength = app.activeDocument.info.instructions.indexOf("</Colorb") -colorbOffset;
		savebackColor = app.activeDocument.info.instructions.substr(colorbOffset, colorbLength);

		//alert("Colorf = " + saveforeColor + " Colorb = " + savebackColor );

		// Restore Colors

		app.foregroundColor.rgb.red = saveforeColor.substr(0,saveforeColor.indexOf(",")); 
		saveforeColor = saveforeColor.substr(saveforeColor.indexOf(",") + 1,saveforeColor.length); 
		app.foregroundColor.rgb.green = saveforeColor.substr(0,saveforeColor.indexOf(","));
		saveforeColor = saveforeColor.substr(saveforeColor.indexOf(",") + 1,saveforeColor.length);
		app.foregroundColor.rgb.blue = saveforeColor ;

		app.backgroundColor.rgb.red = savebackColor.substr(0,savebackColor.indexOf(","));
		savebackColor = savebackColor.substr((savebackColor.indexOf(",") + 1),savebackColor.length); 
		app.backgroundColor.rgb.green = savebackColor.substr(0,savebackColor.indexOf(","));
		savebackColor = savebackColor.substr(savebackColor.indexOf(",") + 1,savebackColor.length);
		app.backgroundColor.rgb.blue = savebackColor ;


		// Remove footprint from metadata info instructions
		before = app.activeDocument.info.instructions.substr(0,app.activeDocument.info.instructions.indexOf("<Colorf>"));
		afterOffset = app.activeDocument.info.instructions.indexOf("</Colorb>") + "</Colorb>".length;
		after = app.activeDocument.info.instructions.substr(afterOffset, app.activeDocument.info.instructions.length - afterOffset);
		//alert ("before = " + before + " after = " + after);
		app.activeDocument.info.instructions = before + after;
	} 
} 
else { alert("You must have at least one open document to run this script!"); } 
