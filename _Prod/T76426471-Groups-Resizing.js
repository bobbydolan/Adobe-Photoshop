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


    // This grabs the Duplicates buy name and renames

    var layerOne = activeDocument.artLayers.getByName("Small");
    layerOne.name = "100% " + decodeURI(theDoc.name).toString().replace(/\..+$/, '') + "-150W.jpg";

    var layerTwo = activeDocument.artLayers.getByName("Medium");
    layerTwo.name = "100% " + decodeURI(theDoc.name).toString().replace(/\..+$/, '') + "-300W.jpg";

    var layerThree = activeDocument.artLayers.getByName("Large");
    layerThree.name = "100% " + decodeURI(theDoc.name).toString().replace(/\..+$/, '') + "-600W.jpg";

    var layerFour = activeDocument.artLayers.getByName("MAX");
    layerFour.name = "100% " + decodeURI(theDoc.name).toString().replace(/\..+$/, '') + "-MAX.jpg";

    // var d = new ActionDescriptor();
    // d.putString(charIDToTypeID("jsNm"), localize("$$$/JavaScripts/Generator/ImageAssets/Menu"));
    // d.putString(charIDToTypeID("jsMs"), "undefined");
    // executeAction(stringIDToTypeID("AdobeScriptAutomation Scripts"), d, DialogModes.NO);


    // theDoc.activeLayer.duplicate(theDoc.activeLayer, ElementPlacement.PLACEAFTER);
    // theDoc.activeLayer.name= decodeURI(theDoc.name).toString().replace(/\..+$/,'') + " _@4x.jpg" ;


}