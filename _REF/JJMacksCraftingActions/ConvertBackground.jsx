// A Photoshop Script by JJMack's used by Photo Corners Action

// This script targets the bottom layer and makes sure it a normal layer.

// This script is supplied as is. It is provided as freeware. 
// The author accepts no liability for any problems arising from its use.

/*
<javascriptresource>
<about>$$$/JavaScripts/ConvertBackground/About=JJMack's ConvertBackground.^r^rCopyright 2009 Mouseprints.^r^rScript utility for action.^rNOTE:Convert Background to normal layer if there is one!</about>
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
		activeDocument.activeLayer = layers[layers.length-1]; // Target Bottom Layer
		activeDocument.activeLayer.isBackgroundLayer=0; // Make it a normal Layer
	}
	// display error message if something goes wrong
	catch(e) { alert(e + ': on line ' + e.line, 'Script Error', true); }
}
