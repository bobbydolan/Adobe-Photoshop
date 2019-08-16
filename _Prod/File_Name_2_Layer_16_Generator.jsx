main();
function main() {
  if (!documents.length)
    return;
  // activeDocument.artLayers.add()
  activeDocument.activeLayer.name = "100% " + decodeURI(activeDocument.name).toString().replace(/\..+$/, '') + "_16.png"

  // add this to have subfolder file name
  // activeDocument.activeLayer.name = "[" + decodeURI(activeDocument.name).toString().replace(/\..+$/, '') + "]/ " + "100% " + decodeURI(activeDocument.name).toString().replace(/\..+$/, '') + "_16.png"


// Add this for additional exports
// + ", 100% " + decodeURI(activeDocument.name).toString().replace(/\..+$/, '') + "_16.jpg"


  var d = new ActionDescriptor();
  d.putString( charIDToTypeID( "jsNm" ), localize("$$$/JavaScripts/Generator/ImageAssets/Menu") );
  d.putString( charIDToTypeID( "jsMs" ), "undefined" );
  executeAction( stringIDToTypeID( "AdobeScriptAutomation Scripts" ), d, DialogModes.NO );

}
