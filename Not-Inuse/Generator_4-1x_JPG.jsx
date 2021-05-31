var theDoc = activeDocument;
// var dupLayer = theDoc.activeLayer.duplicate(theDoc.activeLayer, ElementPlacement.PLACEBEFORE);
//   theLayer.name = "test";
// theDoc.activeLayer = theLayer

// This pulls the DOC file name
  // theDoc.activeLayer.name= decodeURI(theDoc.name);

// This will duplicate active layer, move it, and rename it to file name
main();

function main() {
  if (!documents.length) return;
// This creates 4 Duplicates of active layer
  theDoc.activeLayer.duplicate(theDoc.activeLayer, ElementPlacement.PLACEAFTER);
  theDoc.activeLayer.name = " 1";
  theDoc.activeLayer.duplicate(theDoc.activeLayer, ElementPlacement.PLACEAFTER);
  theDoc.activeLayer.name = " 2";
  theDoc.activeLayer.duplicate(theDoc.activeLayer, ElementPlacement.PLACEAFTER);
  theDoc.activeLayer.name = " 3";
  theDoc.activeLayer.duplicate(theDoc.activeLayer, ElementPlacement.PLACEAFTER);
  theDoc.activeLayer.name = " 4";
// This grabs the Duplicates buy name and renames
  var layerOne = activeDocument.artLayers.getByName(" 1 copy");
  layerOne.name = "25% " + decodeURI(theDoc.name).toString().replace(/\..+$/, '') + "_@1x.jpg";
  var layerTwo = activeDocument.artLayers.getByName(" 2 copy");
  layerTwo.name = "50% " + decodeURI(theDoc.name).toString().replace(/\..+$/, '') + "_@2x.jpg";
  var layerThree = activeDocument.artLayers.getByName(" 3 copy");
  layerThree.name = "75% " + decodeURI(theDoc.name).toString().replace(/\..+$/, '') + "_@3x.jpg";
  var layerFour = activeDocument.artLayers.getByName(" 4");
  layerFour.name = decodeURI(theDoc.name).toString().replace(/\..+$/, '') + " _@4x.jpg";


  // theDoc.activeLayer.duplicate(theDoc.activeLayer, ElementPlacement.PLACEAFTER);
  // theDoc.activeLayer.name= decodeURI(theDoc.name).toString().replace(/\..+$/,'') + " _@4x.jpg" ;


}
