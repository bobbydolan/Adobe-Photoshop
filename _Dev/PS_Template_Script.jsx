// enable double-clicking from Mac Finder or Windows Explorer
#target photoshop

// bring application forward for double-click events
app.bringToFront();

if (documents.length == 0) {
  alert("There are no documents open.");
}
// Starter Variables
var docRef = activeDocument;
var layerRef = docRef.activeLayer;
