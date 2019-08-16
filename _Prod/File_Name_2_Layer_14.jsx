main();
function main() {
  if (!documents.length)
    return;
  // activeDocument.artLayers.add()
  activeDocument.activeLayer.name = decodeURI(activeDocument.name).toString().replace(/\..+$/, '') + "_14"
}
