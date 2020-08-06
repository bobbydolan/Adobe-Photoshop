// enable double-clicking from Mac Finder or Windows Explorer
#target photoshop

// bring application forward for double-click events
app.bringToFront();

if (documents.length == 0) {
    alert("There are no documents open.");
}
// Starter Variables
var docRef = app.activeDocument;
var layerRef = docRef.activeLayer;

// Convert to RGB 
var idCnvM = charIDToTypeID( "CnvM" );
    var desc16 = new ActionDescriptor();
    var idT = charIDToTypeID( "T   " );
    var idRGBM = charIDToTypeID( "RGBM" );
    desc16.putClass( idT, idRGBM );
executeAction( idCnvM, desc16, DialogModes.NO );

// Add new Layer 
docRef.artLayers.add();

// Merge Visible Layers
docRef.mergeVisibleLayers();

// File_Name_2_Layer.jsx
main();
function main() {
  if (!documents.length)
    return;
  // activeDocument.artLayers.add()
  activeDocument.activeLayer.name = decodeURI(activeDocument.name).toString().replace(/\..+$/, '')
}

    // Convert To Smart Object 
createSmartObject(app.activeDocument.activeLayer);
function createSmartObject(layer)
{
    var idnewPlacedLayer = stringIDToTypeID( 'newPlacedLayer' );
    executeAction(idnewPlacedLayer, undefined, DialogModes.NO);
}



// // ImageResize_Window.jsx 
//                 app.displayDialogs = DialogModes.NO;
//                 app.preferences.rulerUnits = Units.PIXELS;

//                 var theDoc = activeDocument;
//                 var customWidth = "Enter 1x Value";
//                 var fileName = decodeURI(theDoc.name);


//                 var dlg = new Window('dialog', "Resize Image");

//                 dlg.panel = dlg.add('panel', undefined, "Input Desired Width");


//                 dlg.panel.alignChildren = "fill";

//                 dlg.panel_imageName = dlg.panel.add('statictext', undefined, fileName);

//                 dlg.panel_text1 = dlg.panel.add('edittext', undefined, "Input Desired Width");
//                 //
//                 dlg.buttonRef = dlg.panel.add('button', undefined, "Ok");

//                 //
//                 dlg.panel_text1.active = true;
//                 //
//                 dlg.buttonRef.onClick = function() {
//                 dlg.close(0);
//                 var RefDimension = Number(dlg.panel_text1.text);

//                 app.activeDocument.resizeImage(RefDimension, undefined, undefined, ResampleMethod.BICUBIC);

//                 }

//                 dlg.show();
//                 dlg.center();


//select all
docRef.selection.selectAll();

docRef.pathItems.add();

// var layerSets = docRef.layerSets.add();

// layerRef.move(set, ElementPlacement.INSIDE)

// docRef.LayerSet.add();
// layerRef.move (docRef.layerSets.add()), ElementPlacement.INSIDE);

// newCamLayer.move(docRef.layerSets[0], ElementPlacement.INSIDE)


// var doc = app.documents.add()          // create a Doc
// var lay = doc.activeLayer.duplicate()  // duplicate the background layer
// var set = doc.layerSets.add();         // add a LayerSet
// layerRef.move(set, ElementPlacement.INSIDE) // move the duplicate layer inside the LayerSet