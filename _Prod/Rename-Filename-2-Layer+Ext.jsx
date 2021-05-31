/*
<javascriptresource>
<name>[ReName] Filename-2-Layer W/ Ext</name>
<enableinfo>true</enableinfo>
<category>ReName</category>
</javascriptresource>
*/

main();
function main() {
  if (!documents.length)
    return;
  // activeDocument.artLayers.add()
  activeDocument.activeLayer.name = decodeURI(activeDocument.name).toString().replace(/\..+$/, '')
}
