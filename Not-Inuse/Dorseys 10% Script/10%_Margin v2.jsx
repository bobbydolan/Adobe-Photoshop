if (documents.length < 1) alert("No Open Document!");
else app.activeDocument.suspendHistory('Add Border', 'main()');

function main() {
  var startRulerUnits = app.preferences.rulerUnits;
  app.preferences.rulerUnits = Units.PIXELS;
  var borderSize = (Math.max(app.activeDocument.height, app.activeDocument.width) / 100) * 10;
  app.activeDocument.resizeCanvas((app.activeDocument.width + (borderSize * 2)), (app.activeDocument.height + (borderSize * 2)), AnchorPosition.MIDDLECENTER);
  app.preferences.rulerUnits = startRulerUnits;
}
