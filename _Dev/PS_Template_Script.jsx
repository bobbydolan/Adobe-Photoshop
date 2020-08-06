// enable double-clicking from Mac Finder or Windows Explorer
#target photoshop

// bring application forward for double-click events
app.bringToFront();

if (documents.length == 0) {
  alert("There are no documents open.");
}
// Starter Variables
var docRef = app.activeDocument;
var layerRef = docRef.activeLayer;


// Selections
    // inverse selection
    docRef.selection.invert();

    //select all
    docRef.selection.selectAll();

    //deselect all
    docRef.selection.deselect();

    //(topleft, bottomleft, bottomright, topright)
    var shapeRef = [ [10,10], [10,90], [90,90], [90,10] ];
    docRef.selection.select(shapeRef);


    

// Transforms
activeDocument.activeLayer.resize(-100,undefined); //will flip layer horizontally
activeDocument.activeLayer.resize(undefined,-100); //will flip layer vertically