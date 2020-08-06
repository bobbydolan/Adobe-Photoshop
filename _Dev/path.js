#target photoshop
app.bringToFront();

function createPathLayer(title, subPathArray)
{
    var docRef = app.activeDocument;


    var originalUnit = app.preferences.rulerUnits;


    app.preferences.rulerUnits = Units.PIXELS;


    var myPathItem = docRef.pathItems.add(title, subPathArray);


    app.preferences.rulerUnits = originalUnit;
}


// // Turns work path into Path #
//     try {
//         activeDocument.pathItems.getByName("Work Path").name="Path " + activeDocument.pathItems.length;
//         }
//     catch (Exception) {}