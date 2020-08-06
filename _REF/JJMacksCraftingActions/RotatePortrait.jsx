/*
<javascriptresource>
<about>$$$/JavaScripts/RotatePortrait/About=JJMack's Rotate Portrait.^r^rCopyright 2009 Mouseprints.^r^rScript utility for action.^rNOTE:Rotate Portrait to Landscape!</about>
<category>JJMack's Action Utility</category>
</javascriptresource>
*/
Rotate(); 

function Rotate() { 

// validate that a document is open 
if (documents.length < 1) { 
	alert("No Open Document!"); 
	return; 
	} 
var orig_ruler_units = app.preferences.rulerUnits;
app.preferences.rulerUnits = Units.PIXELS;
// Rotate portrait to landscape orientation 
if (activeDocument.height > activeDocument.width) activeDocument.rotateCanvas(90); 
 
// Reset units to original settings
app.preferences.rulerUnits = orig_ruler_units;
}
