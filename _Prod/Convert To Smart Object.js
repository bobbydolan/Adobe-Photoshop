createSmartObject(app.activeDocument.activeLayer);

function createSmartObject(layer) {
  const idnewPlacedLayer = stringIDToTypeID('newPlacedLayer');
  executeAction(idnewPlacedLayer, undefined, DialogModes.NO);
}
