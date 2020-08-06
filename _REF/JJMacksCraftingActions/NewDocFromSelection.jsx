/* ==========================================================
// 2009  John J. McAssey (JJMack) 
// ======================================================= */

// This script is supplied as is. It is provided as freeware. 
// The author accepts no liability for any problems arising from its use.

// Download from the web and fixed to work better

/*
<javascriptresource>
<about>$$$/JavaScripts/NewDocumentFromSelection/About=JJMack's New Document From Selection.^r^rCopyright 2009 Mouseprints.^r^rJJMack's Script.^rNOTE:New Document From Selection!</about>
<category>JJMack's Script</category>
</javascriptresource>
*/

// enable double-clicking from Mac Finder or Windows Explorer
#target photoshop // this command only works in Photoshop CS2 and higher

// bring application forward for double-click events
app.bringToFront();

// ensure at least one document open
if (!documents.length) alert('There are no documents open.', 'No Document');
else main(); // at least one document exists proceed

///////////////////////////////////////////////////////////////////////////////
//                            main function                                  //
///////////////////////////////////////////////////////////////////////////////
function main() {
	try {
		// Set the ruler units to PIXELS
		var orig_ruler_units = app.preferences.rulerUnits;
		app.preferences.rulerUnits = Units.PIXELS;

                if(hasSelection()) newDocFromSelection(); 
	
		// Reset units to original settings
		app.preferences.rulerUnits = orig_ruler_units;
	}
	// display error message if something goes wrong
	catch(e) { alert(e + ': on line ' + e.line, 'Script Error', true); }
}

///////////////////////////////////////////////////////////////////////////////
//                           main function end                               //
///////////////////////////////////////////////////////////////////////////////


function hasSelection(doc) { 
	if (doc == undefined) doc = activeDocument; 
	var res = false; 
	var activeLayer = activeDocument.activeLayer;	// remember active layer
	var as = doc.activeHistoryState;		// get current history state # 
	doc.selection.deselect(); 
	if (as != doc.activeHistoryState) {		// did the deselect get recorded
		res = true; 
		doc.activeHistoryState = as;		// backup and reselect
  	} 
	activeDocument.activeLayer = activeLayer;	// insure active layer didn't change 
	return res; 					// return true or false
} 

function newDocFromSelection() { 
	var AD = app.activeDocument.name;      // remember current document name

        /* the following code seems to be from the script listener  what it 
	  does is to add a layer via copy selection ( Ctrl+J) which will fail
	  if the select area of the active layer is empty then code then creates
          a new documents with a normal layer cotaining the contents of that layer */
	executeAction( charIDToTypeID('CpTL'), undefined, DialogModes.NO );// 
		var desc5 = new ActionDescriptor(); 
			var ref2 = new ActionReference(); 
			ref2.putClass( charIDToTypeID('Dcmn') ); 
		desc5.putReference( charIDToTypeID('null'), ref2 ); 
		desc5.putString( charIDToTypeID('Nm  '), "NewDoc"+documents.length.toString()); 
			var ref3 = new ActionReference(); 
			ref3.putEnumerated( charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') ); 
		desc5.putReference( charIDToTypeID('Usng'), ref3 ); 
		desc5.putString( charIDToTypeID('LyrN'), "From Selection" ); 
		executeAction( charIDToTypeID('Mk  '), desc5, DialogModes.NO ); 

 		app.activeDocument.trim(TrimType.TRANSPARENT);	// trim new document transparency 
		activeDocument = documents.getByName(AD);	// retun to the old document 
		activeDocument.activeLayer.remove();		// delete layer added via Ctrl+J  
}; 


