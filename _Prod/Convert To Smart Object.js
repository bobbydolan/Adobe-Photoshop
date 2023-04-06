// createSmartObject(app.activeDocument.activeLayer);

// function createSmartObject(layer) {
//   const idnewPlacedLayer = stringIDToTypeID('newPlacedLayer');
//   executeAction(idnewPlacedLayer, undefined, DialogModes.NO);
// }




createSmartObject(app.activeDocument.activeLayer);
function createSmartObject(layer)
{
    var idnewPlacedLayer = stringIDToTypeID( 'newPlacedLayer' );
    executeAction(idnewPlacedLayer, undefined, DialogModes.NO);
}