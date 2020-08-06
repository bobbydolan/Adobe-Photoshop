//https://forums.adobe.com/thread/2558835
var theDoc = app.activeDocument;
var activeLayer = theDoc.activeLayer;
var layerName = activeLayer.name
// Full file name
var filenameLong = theDoc.activeLayer.name = decodeURI(theDoc.name);
// File name without extension
var filenameShort = theDoc.activeLayer.name = decodeURI(theDoc.name).toString().replace(/\..+$/, '')

var savePath = "~/Desktop"; // path to save the file, the default save to the desktop, change as needed

var saveFile = File(savePath + "/" + layerName + ".psd");

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