app.displayDialogs = DialogModes.NO;
app.preferences.rulerUnits = Units.PIXELS;


var dialog = new Window('dialog', 'Resize Image', [100, 100, 480, 245]);
dialog.msgPnl = dialog.add('panel', [25, 15, 355, 130], 'Action');
dialog.msgPnl.titleSt = dialog.msgPnl.add('statictext', [15, 15, 105, 35], 'Input Width:');
dialog.msgPnl.titleEt = dialog.msgPnl.add('edittext', [115, 15, 315, 35], '500');
dialog.buttonRef = dialog.msgPnl.add('button', [15, 70, 140, 95], 'OK', {
  name: 'ok'
});

dialog.buttonRef.onClick = function() {
  dialog.close(0);
  var RefDimension = Number(dialog.msgPnl.titleEt.text);

  // Document.resizeImage ([width: UnitValue][, height: UnitValue][, resolution: number][, resampleMethod: ResampleMethod=ResampleMethod.BICUBIC])
  app.activeDocument.resizeImage(RefDimension, undefined, undefined, ResampleMethod.BICUBIC); //RESIZE IMAGE TO FINAL DIMENSIONS

  // alert(RefDimension); // this is only for checkup to see if the photshop is parsing the correct number, which is fine.
}

dialog.center();
dialog.show();




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
