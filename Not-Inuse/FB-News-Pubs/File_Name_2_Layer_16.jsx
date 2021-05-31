main();
function main() {
  if (!documents.length)
    return;
  // activeDocument.artLayers.add()
  activeDocument.activeLayer.name = "100% " + decodeURI(activeDocument.name).toString().replace(/\..+$/, '') + "_16.png"

  var d = new ActionDescriptor();
  d.putString( charIDToTypeID( "jsNm" ), localize("$$$/JavaScripts/Generator/ImageAssets/Menu") );
  d.putString( charIDToTypeID( "jsMs" ), "undefined" );
  executeAction( stringIDToTypeID( "AdobeScriptAutomation Scripts" ), d, DialogModes.NO );

}
