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
// The first time this script is used by an action the documents current resolution
// and ruler units are saved into the document's meta-data Info Instructions field.
//
// The second time this script used by the action the script retreives what was
// saved in the meta-data during the first usage, resolution and ruler units.
// The document is resized to the saved resolution,
// Photoshop's ruler units are set to saved units
// and the saved data is removed from the document's meta-data Info Instructions field.
//
// ===================================================================================== */

/*
<javascriptresource>
<about>$$$/JavaScripts/SaveAndRestoreResolution/About=JJMack's SaveAndRestoreResolution.^r^rCopyright 2009 Mouseprints.^r^rRun twice script utility for action.^rNOTE:Don't play other actions between runs!^r^rFirst Run records Photoshop's preferences Units and documents DPI resolution.^rSecond Run restores the recorded setting and removes the recording.</about>
<category>JJMack's Action Run Twice Utility</category>
</javascriptresource>
*/

if (app.documents.length > 0) { 
	if (app.activeDocument.info.instructions.indexOf("<Resolution>") == -1 ){ // no footprint fisrt useage 
		//alert("first");
		// Retreive Document information for Foot Print 
                var units = app.preferences.rulerUnits;
		app.preferences.rulerUnits = Units.PIXELS;	// set ruler units to PIXELS
                var typeunits = app.preferences.typeUnits;
		var res = app.activeDocument.resolution; 

		// put footprint in metadata info instructions
		app.activeDocument.info.instructions = app.activeDocument.info.instructions + "<Units>" + units + "</Units>"  + "<Tunits>" + typeunits + "</Tunits>" + "<Resolution>" + res + "</Resolution>"; 
		//alert( "Saved ="  + "<Units>" + units + "</Units>" + "<Tunits>" + typeunits + "</Tunits>" + "<Resolution>" + res + "</Resolution>" ); 

		app.preferences.rulerUnits = units;		// restore ruler units
	} 
	else { 
		//alert("second");

		// Retreive saved information
		unitsOffset = app.activeDocument.info.instructions.indexOf("<Units>") + "<Units>".length;
		unitsLength = app.activeDocument.info.instructions.indexOf("</Units>") -unitsOffset;	
		savedUnits = app.activeDocument.info.instructions.substr(unitsOffset, unitsLength);

		tunitsOffset = app.activeDocument.info.instructions.indexOf("<Tunits>") + "<Tunits>".length;
		tunitsLength = app.activeDocument.info.instructions.indexOf("</Tunits>") -tunitsOffset;	
		savedTunits = app.activeDocument.info.instructions.substr(tunitsOffset, tunitsLength);

		resOffset = app.activeDocument.info.instructions.indexOf("<Resolution>") + "<Resolution>".length;
		resLength = app.activeDocument.info.instructions.indexOf("</Resolution>") + -resOffset;	
		savedResolution = app.activeDocument.info.instructions.substr(resOffset, resLength);
		//alert("Resolution = " + savedResolution + " Units = " + savedUnits );

		// Restore resolution
		app.preferences.rulerUnits = Units.PIXELS;
		activeDocument.resizeImage(null, null, savedResolution, ResampleMethod.NONE);

		// Restore ruler units 
		// I get a message Enumerated value expected if I try to use var savedUnits app.preferences.rulerUnits = savedUnits;
		// perhaps if I knew Javascript I would not need to use the following if else if ..... 
		if ( savedUnits == "Units.INCHES" ){ app.preferences.rulerUnits = Units.INCHES;}
		else if ( savedUnits == "Units.CM" ){ app.preferences.rulerUnits = Units.CM;}
		else if ( savedUnits == "Units.PERCENT" ){ app.preferences.rulerUnits = Units.PERCENT;}
		else if ( savedUnits == "Units.MM" ){ app.preferences.rulerUnits = Units.MM;}
		else if ( savedUnits == "Units.PIXELS" ){ app.preferences.rulerUnits = Units.PIXELS;}
		else if ( savedUnits == "Units.POINTS" ){ app.preferences.rulerUnits = Units.POINTS;}
		else if ( savedUnits == "Units.PICAS" ){ app.preferences.rulerUnits = Units.PICAS;}

		// Restore Type units 
		if ( savedTunits == "TypeUnits.PIXELS" ){ app.preferences.typeUnits = TypeUnits.PIXELS;}
		else if ( savedTunits == "TypeUnits.POINTS" ){ app.preferences.typeUnits = TypeUnits.POINTS;}
		else if ( savedTunits == "TypeUnits.MM" ){ app.preferences.typeUnits = TypeUnits.MM;}
		

		// Remove footprint from metadata info instructions
		before = app.activeDocument.info.instructions.substr(0,app.activeDocument.info.instructions.indexOf("<Units>"));
		afterOffset = app.activeDocument.info.instructions.indexOf("</Resolution>") + "</Resolution>".length;
		after = app.activeDocument.info.instructions.substr(afterOffset, app.activeDocument.info.instructions.length - afterOffset);
		//alert ("before = " + before + " after = " + after);
		app.activeDocument.info.instructions = before + after;
	} 
} 
else { alert("You must have at least one open document to run this script!"); } 
