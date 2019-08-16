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
  theDoc.activeLayer.duplicate(theDoc.activeLayer, ElementPlacement.PLACEAFTER);
  theDoc.activeLayer.name = " 5";


// This grabs the Duplicates buy name and renames
  var layerOne = activeDocument.artLayers.getByName(" 1 copy");
  layerOne.name = "100% " + decodeURI(theDoc.name).toString().replace(/\..+$/, '') + "@1x.png";
  var layerOne = activeDocument.artLayers.getByName(" 5");
  layerOne.name = "150% " + decodeURI(theDoc.name).toString().replace(/\..+$/, '') + "@1.5x.png";
  var layerTwo = activeDocument.artLayers.getByName(" 2 copy");
  layerTwo.name = "200% " + decodeURI(theDoc.name).toString().replace(/\..+$/, '') + "@2x.png";
  var layerThree = activeDocument.artLayers.getByName(" 3 copy");
  layerThree.name = "300% " + decodeURI(theDoc.name).toString().replace(/\..+$/, '') + "@3x.png";
  var layerFour = activeDocument.artLayers.getByName(" 4 copy");
  layerFour.name = "400% " + decodeURI(theDoc.name).toString().replace(/\..+$/, '') + "@4x.png";



  var d = new ActionDescriptor();
  d.putString( charIDToTypeID( "jsNm" ), localize("$$$/JavaScripts/Generator/ImageAssets/Menu") );
  d.putString( charIDToTypeID( "jsMs" ), "undefined" );
  executeAction( stringIDToTypeID( "AdobeScriptAutomation Scripts" ), d, DialogModes.NO );


  // theDoc.activeLayer.duplicate(theDoc.activeLayer, ElementPlacement.PLACEAFTER);
  // theDoc.activeLayer.name= decodeURI(theDoc.name).toString().replace(/\..+$/,'') + " _@4x.jpg" ;


}
