app.displayDialogs = DialogModes.NO;
app.preferences.rulerUnits = Units.PIXELS;

var theDoc = activeDocument;
var customWidth = "Enter 1x Value";
var fileName = decodeURI(theDoc.name);


var dlg = new Window('dialog', "Resize Image");

dlg.panel = dlg.add('panel', undefined, "Input Desired Width");


dlg.panel.alignChildren = "fill";

dlg.panel_imageName = dlg.panel.add('statictext', undefined, fileName);

dlg.panel_text1 = dlg.panel.add('edittext', undefined, "Input Desired Width");
//
dlg.buttonRef = dlg.panel.add('button', undefined, "Ok");

//
dlg.panel_text1.active = true;
//
dlg.buttonRef.onClick = function() {
dlg.close(0);
var RefDimension = Number(dlg.panel_text1.text);

app.activeDocument.resizeImage(RefDimension, undefined, undefined, ResampleMethod.BICUBIC);

}

dlg.show();
dlg.center();



// ResampleMethod.BICUBIC	Uses a weighted average to determine pixel color, which usually yields better results than the simple averageing method of downsampling.
// The slowest but most precise method, resulting in the smoothest gradations.	int 4
//
//
// ResampleMethod.BICUBICSHARPER	A good method for reducing the size of an image based on Bicubic interpolation with enhanced sharpening. Maintains the detail in a resampled image.	int 5
//
//
// ResampleMethod.BICUBICSMOOTHER	A good method for enlarging images based on Bicubic interpolation but designed to produce smoother results.	int 6
//
//
// ResampleMethod.BILINEAR	Averages the pixels in a sample area and replaces the entire area with the average pixel color at the specified resolution. Same as average downsampling.	int 3
//
//
// ResampleMethod.NEARESTNEIGHBOR	Chooses a pixel in the center of the sample area and replaces the entire area with that pixel color. Same as subsampling.
// Significantly reduces the conversion time compared with downsampling but results in images that are less smooth and continuous.	int 2
//
// ResampleMethod.NONE	Does not resample.
