// Create Export Folder //
var myFolder1 = new Folder("~/Desktop/__EXPORTS/_1P App Icon");
if (!myFolder1.exists) myFolder1.create();

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////


//https://forums.adobe.com/thread/2558835
var theDoc = app.activeDocument;
var activeLayer = theDoc.activeLayer;
var layerName = activeLayer.name
// Full file name
var filenameLong = theDoc.activeLayer.name = decodeURI(theDoc.name);
// File name without extension
var filenameShort = theDoc.activeLayer.name = decodeURI(theDoc.name).toString().replace(/\..+$/, '')


// Create Export Folder //
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
var myFolder2 = new Folder(myFolder1 + "/" + filenameShort);
if (!myFolder2.exists) myFolder2.create();
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

var saveDest = myFolder1 + "/" + filenameShort;
var savePath = saveDest; // path to save the file, the default save to the desktop, change as needed

// Save File ORG //
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
var saveFile = File(savePath + "/" + filenameShort + "-ORG" + ".psd");
SavePSD(saveFile);
function SavePSD(saveFile) {

  psdSaveOptions = new PhotoshopSaveOptions();

  psdSaveOptions.embedColorProfile = true;

  psdSaveOptions.alphaChannels = true;

  psdSaveOptions.layers = true;

  psdSaveOptions.annotations = true;

  psdSaveOptions.spotColors = true;

  theDoc.saveAs(saveFile, psdSaveOptions, false, Extension.LOWERCASE); // Set as True for New Doc / False as same Doc

  var filenameShort = theDoc.activeLayer.name = decodeURI(theDoc.name).toString().replace(/\..+$/, '')

}


// // Convert To Smart Object //
// ////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////
// createSmartObject(app.activeDocument.activeLayer);
// function createSmartObject(layer)
// {
//     var idnewPlacedLayer = stringIDToTypeID( 'newPlacedLayer' );
//     executeAction(idnewPlacedLayer, undefined, DialogModes.NO);
// }
// ////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////


// Scale //
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
var RefDimension = 100;
  // Document.resizeImage ([width: UnitValue][, height: UnitValue][, resolution: number][, resampleMethod: ResampleMethod=ResampleMethod.BICUBIC])
  app.activeDocument.resizeImage(RefDimension, undefined, undefined, ResampleMethod.BICUBIC); //RESIZE IMAGE TO FINAL DIMENSIONS

// Save File //
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
var saveFile = File(savePath + "/" + filenameShort + "-100" + ".psd");
SavePSD(saveFile);
function SavePSD(saveFile) {

  psdSaveOptions = new PhotoshopSaveOptions();

  psdSaveOptions.embedColorProfile = true;

  psdSaveOptions.alphaChannels = true;

  psdSaveOptions.layers = true;

  psdSaveOptions.annotations = true;

  psdSaveOptions.spotColors = true;

  theDoc.saveAs(saveFile, psdSaveOptions, false, Extension.LOWERCASE); // Set as True for New Doc / False as same Doc

  var filenameShort = theDoc.activeLayer.name = decodeURI(theDoc.name).toString().replace(/\..+$/, '')

}

// Scale //
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
var RefDimension = 50;
  // Document.resizeImage ([width: UnitValue][, height: UnitValue][, resolution: number][, resampleMethod: ResampleMethod=ResampleMethod.BICUBIC])
  app.activeDocument.resizeImage(RefDimension, undefined, undefined, ResampleMethod.BICUBIC); //RESIZE IMAGE TO FINAL DIMENSIONS

// Save File //
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
var saveFile = File(savePath + "/" + filenameShort + "-50" + ".psd");
SavePSD(saveFile);
function SavePSD(saveFile) {

  psdSaveOptions = new PhotoshopSaveOptions();

  psdSaveOptions.embedColorProfile = true;

  psdSaveOptions.alphaChannels = true;

  psdSaveOptions.layers = true;

  psdSaveOptions.annotations = true;

  psdSaveOptions.spotColors = true;

  theDoc.saveAs(saveFile, psdSaveOptions, false, Extension.LOWERCASE); // Set as True for New Doc / False as same Doc

  var filenameShort = theDoc.activeLayer.name = decodeURI(theDoc.name).toString().replace(/\..+$/, '')

}