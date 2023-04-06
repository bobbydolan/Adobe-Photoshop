var theDoc = activeDocument;
// var hFlip = activeDocument.activeLayer.resize(-100,undefined);
// var dupLayer = theDoc.activeLayer.duplicate(theDoc.activeLayer, ElementPlacement.PLACEBEFORE);
//   theLayer.name = "test";
// theDoc.activeLayer = theLayer

// This pulls the DOC file name
  // theDoc.activeLayer.name= decodeURI(theDoc.name);

// This will duplicate active layer, move it, and rename it to file name
main();

function main() {
  if (!documents.length) return;
// This creates Duplicates of active layer
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

// SVG Portion
  theDoc.activeLayer.duplicate(theDoc.activeLayer, ElementPlacement.PLACEAFTER);
  theDoc.activeLayer.name = " 6";



// This grabs the Duplicates buy name and renames
  var layerOne = activeDocument.artLayers.getByName(" 1 copy");
  layerOne.name = "100% Standard/" + decodeURI(theDoc.name).toString().replace(/\..+$/, '') + "@1x.png";
  var layerOnee = activeDocument.artLayers.getByName(" 2 copy");
  layerOnee.name = "150% Standard/" + decodeURI(theDoc.name).toString().replace(/\..+$/, '') + "@1.5x.png";
  var layerTwo = activeDocument.artLayers.getByName(" 3 copy");
  layerTwo.name = "200% Standard/" + decodeURI(theDoc.name).toString().replace(/\..+$/, '') + "@2x.png";
  var layerThree = activeDocument.artLayers.getByName(" 4 copy");
  layerThree.name = "300% Standard/" + decodeURI(theDoc.name).toString().replace(/\..+$/, '') + "@3x.png";
  var layerFour = activeDocument.artLayers.getByName(" 5 copy");
  layerFour.name = "400% Standard/" + decodeURI(theDoc.name).toString().replace(/\..+$/, '') + "@4x.png";
  // //
  var layerFive = activeDocument.artLayers.getByName(" 6");
  layerFive.name = "100% SVG/" + decodeURI(theDoc.name).toString().replace(/\..+$/, '') + "SVG@1x.png";


  var d = new ActionDescriptor();
  d.putString( charIDToTypeID( "jsNm" ), localize("$$$/JavaScripts/Generator/ImageAssets/Menu") );
  d.putString( charIDToTypeID( "jsMs" ), "undefined" );
  executeAction( stringIDToTypeID( "AdobeScriptAutomation Scripts" ), d, DialogModes.NO );


}
