// A Script by JJMack used by Framing Actions

// This script set a selection to be used for 
// the left side of a 1" mitered frame 

// This script is supplied as is. It is provided as freeware. 
// The author accepts no liability for any problems arising from its use.


/*
<javascriptresource>
<about>$$$/JavaScripts/OneInchMiteredLeftEdgeSelection/About=JJMack's One Inch Mitered Left Edge Selection.^r^rCopyright 2009 Mouseprints.^r^rScript utility for action.^rNOTE:One Inch Mitered Left Edge Selection!</about>
<category>JJMack's Action Utility</category>
</javascriptresource>
*/

leftsideframeselect(); 

function leftsideframeselect () { 

// validate that a document is open 
if (documents.length < 1) { 
	alert("No Open Document!"); 
	return; 
	} 

// Set the ruler units to PIXELS
var orig_ruler_units = app.preferences.rulerUnits;
app.preferences.rulerUnits = Units.PIXELS;

var doc = activeDocument;
var height = doc.height.value;
var dpi = doc.resolution;

var frameRef = [
[0,0],
[0,height],
[dpi,(height-dpi)],
[dpi,dpi],
]

doc.selection.select(frameRef);

// Reset units to original settings
app.preferences.rulerUnits = orig_ruler_units;
}