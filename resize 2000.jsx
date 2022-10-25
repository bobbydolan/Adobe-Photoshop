var startRulerUnits = app.preferences.rulerUnits;
app.preferences.rulerUnits = Units.PIXELS;
var doc = activeDocument;
var res= doc.resolution;
var LB = activeDocument.activeLayer.bounds;
var Width= LB[2].value - LB[0].value;
var onePix = 100/Width;
var newSize = onePix * 2000;
doc.activeLayer.resize( newSize , newSize, AnchorPosition.TOPCENTER);
app.preferences.rulerUnits = startRulerUnits;
