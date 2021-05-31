/*
<javascriptresource>
<name>[Delete] All Empty Maks</name>
<enableinfo>true</enableinfo>
<category>Delete</category>
</javascriptresource>
*/

// Variables
var app,
     documents,
     ActionDescriptor,
     ActionReference,
     executeAction,
     executeActionGet,
     DialogModes,
     stringIDToTypeID,
     documentStats = {};

// Delete Empty Masks
function deleteEmptyMasks(layer) {

     // Variables
     var layerReference,
          layerProperties,
          hasUserMask,
          userMaskReference,
          userMaskEmpty,
          hasVectorMask,
          vectorMaskReference,
          vectorMaskEmpty,
          hasFilterMask,
          filterMaskReference,
          filterMaskEmpty,
          selectionReference,
          selectionDescriptor,
          deleteDescriptor;

     // Get Layer Properties
     layerReference = new ActionReference();
     layerReference.putIdentifier(stringIDToTypeID("layer"), layer.id);
     layerProperties = executeActionGet(layerReference);
     hasUserMask = layerProperties.getBoolean(stringIDToTypeID("hasUserMask"));
     hasVectorMask = layerProperties.getBoolean(stringIDToTypeID("hasVectorMask"));
     vectorMaskEmpty = layerProperties.getBoolean(stringIDToTypeID("vectorMaskEmpty"));
     hasFilterMask = layerProperties.getBoolean(stringIDToTypeID("hasFilterMask"));

     // If No Masks Exist Return
     if (!hasUserMask && !hasVectorMask && !hasFilterMask) {
          return;
     }

     // Setup Selection For User Mask And Filter Mask Check
     if (hasUserMask || hasFilterMask) {
          selectionReference = new ActionReference();
          selectionDescriptor = new ActionDescriptor();
          selectionReference.putProperty(stringIDToTypeID("channel"), stringIDToTypeID("selection"));
          selectionDescriptor.putReference(stringIDToTypeID("null"), selectionReference);
     }

     // If A User Mask Exist Test To See If Empty
     if (hasUserMask) {
          userMaskReference = new ActionReference();
          userMaskReference.putEnumerated(stringIDToTypeID("channel"), stringIDToTypeID("channel"), stringIDToTypeID("mask"));
          userMaskReference.putIdentifier(stringIDToTypeID("layer"), layer.id);
          selectionDescriptor.putReference(stringIDToTypeID("to"), userMaskReference);
          executeAction(stringIDToTypeID("set"), selectionDescriptor, DialogModes.NO);
          userMaskEmpty = true;
          try {
               app.activeDocument.selection.bounds;
          } catch (error) {
               userMaskEmpty = false;
          }
          if (userMaskEmpty) {
               app.activeDocument.selection.invert();
               try {
                    app.activeDocument.selection.bounds;
                    userMaskEmpty = false;
               } catch (ignore) {}
               app.activeDocument.selection.deselect();
          }
     }

     // If Filter Mask Exist Test To See If Empty
     if (hasFilterMask) {
          filterMaskReference = new ActionReference();
          filterMaskReference.putEnumerated(stringIDToTypeID("channel"), stringIDToTypeID("channel"), stringIDToTypeID("filterMask"));
          filterMaskReference.putIdentifier(stringIDToTypeID("layer"), layer.id);
          selectionDescriptor.putReference(stringIDToTypeID("to"), filterMaskReference);
          executeAction(stringIDToTypeID("set"), selectionDescriptor, DialogModes.NO);
          filterMaskEmpty = true;
          try {
               app.activeDocument.selection.bounds;
          } catch (error) {
               filterMaskEmpty = false;
          }
          if (filterMaskEmpty) {
               app.activeDocument.selection.invert();
               try {
                    app.activeDocument.selection.bounds;
                    filterMaskEmpty = false;
               } catch (ignore) {}
               app.activeDocument.selection.deselect();
          }
     }

     // If Empty Masks Exist Setup Delete Action Descriptor Else Return
     if (userMaskEmpty || vectorMaskEmpty || filterMaskEmpty) {
          deleteDescriptor = new ActionDescriptor();
     } else {
          return;
     }

     // If User Mask Is Empty Delete It
     if (userMaskEmpty) {
          try {
               deleteDescriptor.putReference(stringIDToTypeID("null"), userMaskReference);
               executeAction(stringIDToTypeID("delete"), deleteDescriptor, DialogModes.NO);
               documentStats.emptyUserMasksCount += 1;
          } catch (ignore) {}
     }

     // If Vector Mask Is Empty Delete It
     if (vectorMaskEmpty) {
          try {
               vectorMaskReference = new ActionReference();
               vectorMaskReference.putEnumerated(stringIDToTypeID("path"), stringIDToTypeID("path"), stringIDToTypeID("vectorMask"));
               vectorMaskReference.putIdentifier(stringIDToTypeID("layer"), layer.id);
               deleteDescriptor.putReference(stringIDToTypeID("null"), vectorMaskReference);
               executeAction(stringIDToTypeID("delete"), deleteDescriptor, DialogModes.NO);
               documentStats.emptyVectorMasksCount += 1;
          } catch (ignore) {}
     }

     // If Filter Mask Is Empty Delete It
     if (filterMaskEmpty) {
          try {
               deleteDescriptor.putReference(stringIDToTypeID("null"), filterMaskReference);
               executeAction(stringIDToTypeID("delete"), deleteDescriptor, DialogModes.NO);
               documentStats.emptyFilterMasksCount += 1;
          } catch (ignore) {}
     }
}

// Recursive Function Handles All Layers
function layerHandler(layerSet) {
     var layerVisible,
          layer,
          i;

     for (i = 0; i < layerSet.layers.length; i += 1) {
          layer = layerSet.layers[i];
          layerVisible = layer.visible;
          deleteEmptyMasks(layer);
          layer.visible = layerVisible;
          if (layer.typename === "LayerSet") {
               layerHandler(layer);
          }
     }
}

// Main
function main() {
     if (documents.length === 0) {
          alert("There are no documents open.");
     } else {
          app.bringToFront();
          try {
               documentStats.emptyUserMasksCount = 0;
               documentStats.emptyVectorMasksCount = 0;
               documentStats.emptyFilterMasksCount = 0;
               app.activeDocument.suspendHistory("Delete Empty Masks", "layerHandler(app.activeDocument)");
               alert("Delete Empty Masks\n\nCOMPLETE\n\nDocument Statistics \nTotal empty layer masks deleted: " + documentStats.emptyUserMasksCount + "\nTotal empty vector masks deleted: " + documentStats.emptyVectorMasksCount + "\nTotal empty filter masks deleted: " + documentStats.emptyFilterMasksCount);
          } catch (error) {
               alert("Select a layer and try again");
          }
     }
}

main();