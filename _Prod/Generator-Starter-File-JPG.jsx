main();

function main() {
  if (!documents.length)
    return;
  // activeDocument.artLayers.add()
  activeDocument.activeLayer.name = "100% Starter-File/" + decodeURI(activeDocument.name).toString().replace(/\..+$/, '') + "-CR.jpg"
}