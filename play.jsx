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
dlg.buttonRef.onClick = function () {
    dlg.close(0);
    var RefDimension = Number(dlg.panel_text1.text);

    app.activeDocument.resizeImage(RefDimension, undefined, undefined, ResampleMethod.BICUBIC);

}

dlg.show();
dlg.center();