// A Script by JJMack's Designed for use with Custom Mat Actions

// This script targets the background if there is one or
// adds a new tageted background layer if there wasn't one.

// This script is supplied as is. It is provided as freeware. 
// The author accepts no liability for any problems arising from its use.
/*
<javascriptresource>
<about>$$$/JavaScripts/SelectBackground/About=JJMack's Select Background.^r^rCopyright 2009 Mouseprints.^r^rScript utility for action.^rNOTE:Select Background adding one if need be!</about>
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
		// declare local variables
		var layers = activeDocument.layers;
		activeDocument.activeLayer = layers[layers.length-1] // Target Bottom Layer
		if ( activeDocument.activeLayer.isBackgroundLayer ) { return; } // quit
		app.activeDocument.artLayers.add()
		// declare local variables
		var newlayers = app.activeDocument.layers;
		// arrange layers so new layer added is at bottom
                newlayers[0].move(newlayers[newlayers.length-1], ElementPlacement.PLACEAFTER);
		// Make it a Background Layer
		activeDocument.activeLayer.isBackgroundLayer=1
	}

	// display error message if something goes wrong
	catch(e) { alert(e + ': on line ' + e.line, 'Script Error', true); }
}
