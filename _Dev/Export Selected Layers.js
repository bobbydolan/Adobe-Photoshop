#target photoshop

var doc = app.activeDocument;

function cTID(s) { return app.charIDToTypeID(s); };
function sTID(s) { return app.stringIDToTypeID(s); };

app.bringToFront();

main();

function main() {
  var layers = getSelectedLayers(app.activeDocument);
  var layerVisibilities = [];

  for (var i = 0; i < layers.length; i++) {
    var layer = layers[i];
    layerVisibilities.push(layer.visible);
    layer.visible = false;
  }

  for (var i = 0; i < layers.length; i++) {
    var layer = layers[i];
    layer.visible = true;
    exportPng24(doc.path + '/' + layer.name + '.png');
    layer.visible = false;
  }

  for (var i = 0; i < layers.length; i++) {
    layers[i].visible = layerVisibilities[i];
  }
}

function newGroupFromLayers(doc) {
  var desc = new ActionDescriptor();
  var ref = new ActionReference();
  ref.putClass(sTID('layerSection'));
  desc.putReference(cTID('null'), ref);
  var lref = new ActionReference();
  lref.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
  desc.putReference(cTID('From'), lref);

  executeAction(cTID('Mk  '), desc, DialogModes.NO);
};

function undo() {
  executeAction(cTID("undo", undefined, DialogModes.NO));
};

// From https://gist.github.com/hilukasz/03b17ee78414aadff995
function getSelectedLayers(doc) {
  var selLayers = [];
  newGroupFromLayers();

  var group = doc.activeLayer;
  var layers = group.layers;

  for (var i = 0; i < layers.length; i++) {
    selLayers.push(layers[i]);
  }

  undo();

  return selLayers;
};

// From https://github.com/hsw107/Photoshop-Export-Layers-to-Files-Fast/blob/master/Export%20Layers%20To%20Files%20(Fast).jsx#L2353
function exportPng24(fileName, options) {
  if (!options) {
    var WHITE = new RGBColor();
    WHITE.red = 255;
    WHITE.green = 255;
    WHITE.blue = 255;

    options = new ExportOptionsSaveForWeb();
    options.format = SaveDocumentType.PNG;
    options.PNG8 = false;
    options.interlaced = false;
    options.transparency = true;
    options.matteColor = WHITE;
  }

  var desc = new ActionDescriptor(), desc2 = new ActionDescriptor();
  desc2.putEnumerated(cTID("Op  "), cTID("SWOp"), cTID("OpSa"));
  desc2.putEnumerated(cTID("Fmt "), cTID("IRFm"), cTID("PN24"));
  desc2.putBoolean(cTID("Intr"), options.interlaced);
  desc2.putBoolean(cTID("Trns"), options.transparency);
  desc2.putBoolean(cTID("Mtt "), true);
  desc2.putInteger(cTID("MttR"), options.matteColor.red);
  desc2.putInteger(cTID("MttG"), options.matteColor.green);
  desc2.putInteger(cTID("MttB"), options.matteColor.blue);
  desc2.putBoolean(cTID("SHTM"), false);
  desc2.putBoolean(cTID("SImg"), true);
  desc2.putBoolean(cTID("SSSO"), false);
  desc2.putList(cTID("SSLt"), new ActionList());
  desc2.putBoolean(cTID("DIDr"), false);
  desc2.putPath(cTID("In  "), new File(fileName));
  desc.putObject(cTID("Usng"), sTID("SaveForWeb"), desc2);
  app.executeAction(cTID("Expr"), desc, DialogModes.NO);
}