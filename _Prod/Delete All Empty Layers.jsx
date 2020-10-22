// Copyright: 2018 Adobe Systems, Inc. All rights reserved.
// Completely rewritten by Jaroslav Bereza <http://bereza.cz> previous script written by Naoki Hada
// Visit http://bereza.cz/ps for more scripts
/*
@@@BUILDINFO@@@ Delete All Empty Layers.jsx 2.0.0.0
*/
/*
// BEGIN__HARVEST_EXCEPTION_ZSTRING
<javascriptresource>
<name>$$$/JavaScripts/DeleteAllEmptyLayers/Menu=Delete All Empty Layers</name>
<category>Delete</category>
<enableinfo>true</enableinfo>
<eventid>a0754df2-9c60-4b64-a940-6a2bb1102652</eventid>
<terminology><![CDATA[<< /Version 1 
                         /Events << 
                          /a0754df2-9c60-4b64-a940-6a2bb1102652 [($$$/JavaScripts/DeleteAllEmptyLayers/Menu=Delete All Empty Layers) /noDirectParam <<
                          >>] 
                         >> 
                      >> ]]></terminology>
</javascriptresource>
// END__HARVEST_EXCEPTION_ZSTRING
*/
// enable double clicking from the 
// Macintosh Finder or the Windows Explorer
#target Photoshop
// Make Photoshop the frontmost application
app.bringToFront();
// debug level: 0-2 (0:disable, 1:break on error, 2:break at beginning)
// $.level = 2;
// debugger; // launch debugger on next line
/*
    KNOWN ISSUES:
    - if you make set visibility of clipped masks to hidden and you run "undo" command then these layers stay hidden
*/
/////////////////////////
// SETUP
/////////////////////////
// all the strings that need localized
var strDeleteAllEmptyLayersHistoryStepName = localize("$$$/JavaScripts/DeleteAllEmptyLayers/Menu=Delete All Empty Layers");
/////////////////////////
// MAIN
/////////////////////////
var doc;  // remember the document. But we do it later because we first need make sure that there are documents
var numberOfLayers;
var backgroundCounter;
var isCancelled = false;
// caching precalculated typeID numbers for saving a bit miliseconds and nicer code
var TID = {
    property: charIDToTypeID("Prpr"),
    bounds: stringIDToTypeID("bounds"),
    layer: charIDToTypeID("Lyr "),
    top: stringIDToTypeID('top'),
    bottom: stringIDToTypeID('bottom'),
    left: stringIDToTypeID('left'),
    right: stringIDToTypeID('right'),
    layerLocking: stringIDToTypeID("layerLocking"),
    protectAll: stringIDToTypeID('protectAll'),
    layerID: stringIDToTypeID("layerID"),
    group: stringIDToTypeID("group"),
    layerSection: stringIDToTypeID("layerSection"),
    textKey: stringIDToTypeID("textKey"),
    idNull: charIDToTypeID("null"),
    idDelete: charIDToTypeID("Dlt "),
    document: charIDToTypeID("Dcmn"),
    ordinal: charIDToTypeID("Ordn"),
    target: charIDToTypeID("Trgt"),
    hide: charIDToTypeID("Hd  "),
    application: charIDToTypeID("capp"),
    set: charIDToTypeID("setd"),
    to: charIDToTypeID("T   "),
    playbackOptions: stringIDToTypeID("playbackOptions"),
    hasBackgroundLayer: stringIDToTypeID("hasBackgroundLayer"),
    performance: stringIDToTypeID("performance"),
    layerSectionEnd: stringIDToTypeID("layerSectionEnd"),
    layerSectionStart: stringIDToTypeID("layerSectionStart"),
    layerSectionContent: stringIDToTypeID("layerSectionContent"),
    numberOfLayers: stringIDToTypeID("numberOfLayers"),
    accelerated: stringIDToTypeID("accelerated")
};
main();
// Record the script in the Actions palette when recording an action
try {
    var playbackDescription = new ActionDescriptor();
    var playbackReference = new ActionReference();
    playbackReference.putEnumerated(TID.document, TID.ordinal, TID.target);
    playbackDescription.putReference(TID.idNull, playbackReference);
    app.playbackDisplayDialogs = DialogModes.NO;
    app.playbackParameters = playbackDescription;
} catch (e) { /* do nothing */ }
isCancelled ? 'cancel' : undefined; // quit, returning 'cancel' (don't localize) makes the actions palette not record our script
/////////////////////////
// FUNCTIONS
/////////////////////////
///////////////////////////////////////////////////////////////////////////////
// Function: main
// Usage: container function to hold all the working code that generates history states
// Input: <none> Must have an open document
// Return: <none>
///////////////////////////////////////////////////////////////////////////////
function main() {
    // there must be document
    // Document must have at least one layer so we don't need rum script if there is only one layer
    if (app.documents.length > 0) {
        numberOfLayers = getNumberOfLayers();
        backgroundCounter = getBackgroundLayerCounter();
        if(numberOfLayers + backgroundCounter > 1){
            try {
                doc = app.activeDocument;
                doc.suspendHistory(strDeleteAllEmptyLayersHistoryStepName, "runTask()");
            } catch (e) {
                isCancelled = true;
            }
        }
    }
}
function runTask() {
    acceleratePlayback();
    var deleteLayersList = [];
    var hideLayersList = [];
    var layers = new Array(numberOfLayers); // we know array lenght so we can reserve fixed space in memory
    var maxNestedLevels = 0;
    // We want to avoid DOM code here because it can be slow if document has a lot layers and nested layerSets. So we will use Action Manager code.
    for (var layerIndex = numberOfLayers, stepsInside = 0; layerIndex > 0; layerIndex--) { // stepsInside = how deep I am in folder structure
        var locked = getIsLocked(layerIndex);
        var layerType = getLayerType(layerIndex);
        var shouldRemove = false;
        var nestedLevels;
        // NOT layerSet
        if (layerType === 'layer') {
            nestedLevels = stepsInside + 1;
            shouldRemove = ((hasZeroDimensions(layerIndex) || getIsEmptyTextLayer(layerIndex)) && !locked);
        }
        // layerSet end - closing (invisible) layer
        else if (layerType === 'endOfLayerSet') {
            nestedLevels = stepsInside;
            stepsInside--;
        }
        // layerSet start - opening layer
        else if (layerType === 'startOfLayerSet') {
            stepsInside++;
            nestedLevels = stepsInside;
            shouldRemove = true; // we will check it later properly
        }
        if (nestedLevels > maxNestedLevels) {
            maxNestedLevels = nestedLevels;
        }
        var layerInfo = {
            nestedLevels: nestedLevels,
            layerType: layerType,
            itemIndex: layerIndex,
            itemID: getLayerId(layerIndex),
            remove: shouldRemove,
            locked: locked,
            isClipped: getIsClipped(layerIndex)
        };
        layers[numberOfLayers - layerIndex] = layerInfo;
    }
    resolveLayerSetsWithContent();
    resolveChildsOfLockedLayerSets();
    resolveClippingMasks();
    addLayersToDeleteLayersList();
    if (deleteLayersList && deleteLayersList.length) { // if there is something to delete
        // if layer which we want delete has clipping mask, then we hide clipping mask layers
        if (hideLayersList && hideLayersList.length) {runHideLayers(hideLayersList);}
        runDeleteLayers(deleteLayersList);
    }
    
    // we traverse layers from most nested levels to more shallow levels
    // so we can tell parent layerSets that we don't want remove them because they will have content
    // we traverse all layers in document for each level. Maximum nested levels is 10 and maximum layers is 8000. This means 80 000 cycles in extreme case.
    function resolveLayerSetsWithContent(){
        for (var j = 1; j < maxNestedLevels; maxNestedLevels--) {
            for (var i = 0; i < numberOfLayers; i++) {
                var layer = layers[i];
                
                if (layer.nestedLevels === maxNestedLevels) {
                    if(
                        // don't remove parent layerSet if we want keep its content
                        (layer.layerType === 'layer' && !layer.remove) ||
                        // or don't remove locked parent group or don't remove parent folder if children folder shouldn't be deleted
                        ((layer.locked || !layer.remove) && layer.layerType === 'startOfLayerSet')
                    ){ 
                        var parrentLayerSet = layers[getParentLayerSet(i)];
                        parrentLayerSet.remove = false;
                    }
                }
            }
        }
    }
    
    // excludes all childs from delete list if parent layerSet is locked
    function resolveChildsOfLockedLayerSets() {
        for (var j = 0; j < numberOfLayers; j++) { 
            //var layer = layers[j];
            if (layers[j].locked && layers[j].layerType === 'startOfLayerSet') {
                var initialNestedLevel = layers[j].nestedLevels;
                j++;
                while (initialNestedLevel < layers[j].nestedLevels) {
                    layers[j].remove = false;
                    j++;
                }
            }
        }
    }
    // don't mess up clipping mask layers - if we remove layer, then clipped layers might become visible so we hide them
    function resolveClippingMasks(){
        for (var j = 0; j < numberOfLayers; j++) { 
            var layer = layers[j];
            if (layer.isClipped) {
                var tempList = []; // here we store all clipped layers indexes
                while (layer.isClipped) { // this goes from top layer to bottom layer in layers panel and layers clipped to nothing are impossible
                    tempList.push(layer.itemIndex);
                    layer = layers[++j];
                }
                if (layer.remove && !layer.locked) {
                    hideLayersList = hideLayersList.concat(tempList);
                }
            }
        }       
    }
    // just move layer from one list to another list
    function addLayersToDeleteLayersList() {
        for (var j = 0; j < numberOfLayers; j++) {
            var layer = layers[j];
            if (layer.remove && !layer.locked) {
                deleteLayersList.push(layer.itemID);
            }
        }
    }
    // this will find parental layerSet for current layer or layerSet
    function getParentLayerSet(p) { 
        for (var i = p - 1; i > 0; i--) {
            if (layers[i].nestedLevels === layers[p].nestedLevels - 1) {
                return i;
            }
        }
        return 0;
    }
}
//////////////////////////////
// READ DOCUMENT PROPERTIES
//////////////////////////////
///////////////////////////////////////////////////////////////////////////////
// Function: hasZeroDimensions
// Usage: we read layer dimensions and if are zero then layer has zero visible pixels (they might be hidden with vector or bitmap mask)
// Input: index of desired layer
// Return: Boolean
///////////////////////////////////////////////////////////////////////////////
function hasZeroDimensions(index) {
    var desc = getLayerPropertyDescriptor(index, TID.bounds);
    var bounds = desc.getObjectValue(TID.bounds);
    var left = bounds.getDouble(TID.left);
    var right = bounds.getDouble(TID.right);
    var top = bounds.getDouble(TID.top);
    var bottom = bounds.getDouble(TID.bottom);
    var result = (left === right) && (top === bottom);
    return result;
}
///////////////////////////////////////////////////////////////////////////////
// Function: getIsClipped
// Usage: we don't want remove locked layers. There are multiple kinds of locks. We need only "protectAll"
// Input: index of desired layer
// Return: Boolean
///////////////////////////////////////////////////////////////////////////////
function getIsLocked(index) {
    var desc = getLayerPropertyDescriptor(index, TID.layerLocking);
    var descLocking = desc.getObjectValue(TID.layerLocking);
    var locked = descLocking.getBoolean(TID.protectAll);
    return locked;
}
///////////////////////////////////////////////////////////////////////////////
// Function: getIsClipped
// Usage: returns ID of layer so we can target layer no matter of layer position in layers panel
// Input: index of desired layer
// Return: Integer
///////////////////////////////////////////////////////////////////////////////
function getLayerId(index) {
    var desc = getLayerPropertyDescriptor(index, TID.layerID);
    var id = desc.getInteger(TID.layerID);
    return id;
}
///////////////////////////////////////////////////////////////////////////////
// Function: getIsClipped
// Usage: returns true if layer is clipping mask
// Input: index of desired layer
// Return: Boolean
///////////////////////////////////////////////////////////////////////////////
function getIsClipped(index) {
    var desc = getLayerPropertyDescriptor(index, TID.group);
    var group = desc.getBoolean(TID.group);
    return group;
}
///////////////////////////////////////////////////////////////////////////////
// Function: getLayerType
// Usage: returns type of layer
// Input: index of desired layer
// Return: String
///////////////////////////////////////////////////////////////////////////////
function getLayerType(index) {
    var desc = getLayerPropertyDescriptor(index, TID.layerSection);
    var type = desc.getEnumerationValue(TID.layerSection);
    switch (type) {
        case TID.layerSectionEnd:
            return 'endOfLayerSet';
        case TID.layerSectionStart:
            return 'startOfLayerSet';
        case TID.layerSectionContent:
            return 'layer';
        default:
            return undefined;
    }
}
///////////////////////////////////////////////////////////////////////////////
// Function: getNumberOfLayers
// Usage: returns number of all layers in document
// Input: <none> Must have an open document
// Return: Integer
///////////////////////////////////////////////////////////////////////////////
function getNumberOfLayers() {
    var desc = getDocumentPropertyDescriptor(TID.numberOfLayers);
    var numberOfLayers = desc.getInteger(TID.numberOfLayers);
    return numberOfLayers;
}
///////////////////////////////////////////////////////////////////////////////
// Function: getIsEmptyTextLayer
// Usage: returns number of all layers in document
// Input: index of desired layer
// Return: Boolean
///////////////////////////////////////////////////////////////////////////////
function getIsEmptyTextLayer(index) {
    var textKey = getLayerPropertyDescriptor(index, TID.textKey);
    
    var isTextLayer = textKey.hasKey(TID.textKey);
    if (!isTextLayer) {
        return false;
    }
    var contentString = textKey.getObjectValue(TID.textKey).getString(TID.textKey);
    var result = (contentString === "");
    return result;
}
///////////////////////////////////////////////////////////////////////////////
// Function: getBackgroundLayerCounter
// Usage: returns if document has background layer
// Input: <none> Must have an open document
// Return: 1 or 0
///////////////////////////////////////////////////////////////////////////////
function getBackgroundLayerCounter() {
    var desc = getDocumentPropertyDescriptor(TID.hasBackgroundLayer);
    var result = Number(desc.getBoolean(TID.hasBackgroundLayer));
    return result;
}
/////////////
// UTILITY
/////////////
///////////////////////////////////////////////////////////////////////////////
// Function: getLayerPropertyDescriptor
// Usage: shortcut helper function which return info about layer property
// Input: Index of desired layer, typeID of desired property
// Return: ActionDescriptor
///////////////////////////////////////////////////////////////////////////////
function getLayerPropertyDescriptor(index, property) {
    var ref = new ActionReference();
    ref.putProperty(TID.property, property);
    ref.putIndex(TID.layer, index);
    var desc = executeActionGet(ref);
    return desc;
}
///////////////////////////////////////////////////////////////////////////////
// Function: getDocumentPropertyDescriptor
// Usage: shortcut helper function which return info about current document property
// Input: TypeID of desired property
// Return: ActionDescriptor
///////////////////////////////////////////////////////////////////////////////
function getDocumentPropertyDescriptor(property) {
    var ref = new ActionReference();
    ref.putProperty(TID.property, property);
    ref.putEnumerated(TID.document, TID.ordinal, TID.target);
    var desc = executeActionGet(ref);
    return desc;
}
///////////////
// ACTIONS
///////////////
///////////////////////////////////////////////////////////////////////////////
// Function: runHideLayers
// Usage: sets visibility of multiple layers to hidden
// Input: Array of layerIndexes
// Return: undefined
///////////////////////////////////////////////////////////////////////////////
function runHideLayers(hideLayersList) {
    var desc = new ActionDescriptor();
    var list = new ActionList();
    for (var i = 0, len = hideLayersList.length; i < len; i++) {
        var ref = new ActionReference();
        ref.putIndex(TID.layer, hideLayersList[i]);
        list.putReference(ref);
    }
    desc.putList(TID.idNull, list);
    executeAction(TID.hide, desc, DialogModes.NO);
}
///////////////////////////////////////////////////////////////////////////////
// Function: runDeleteLayers
// Usage: deletes multiple layers one by one accoring layerID
// Input: Array of layerIDs
// Return: undefined
///////////////////////////////////////////////////////////////////////////////
function runDeleteLayers (list) {
    var desc = new ActionDescriptor();
    var layerRef = new ActionReference();
    for (var i = list.length - 1, len = i; i >= 0; i--) {
        layerRef.putIdentifier(TID.layer, list[i]);
    }
    desc.putReference(TID.idNull, layerRef);
    // "Try" because document must have at least one layer ...what if all layers would be empty?
    // And single layerSet always has 2 layers so it's a bit complicated
    try{
        executeAction(TID.idDelete, desc, DialogModes.NO);
    }catch(e){
        runDeleteLayersFallBack(list);
    }
}
function runDeleteLayersFallBack(list) {
    for (var i = list.length - 1, len = i; i >= 0; i--) {
        var desc = new ActionDescriptor();
        var layerRef = new ActionReference();
        layerRef.putIdentifier(TID.layer, list[i]);
        desc.putReference(TID.idNull, layerRef);
        // Try because document must have at least one layer ...what if all layers would be empty?
        // And single layerSet always has 2 layers so it's a bit complicated
        try{
            executeAction(TID.idDelete, desc, DialogModes.NO);
        }catch(e){
            /* do nothing */
        }
    }
}
///////////////////////////////////////////////////////////////////////////////
// Function: acceleratePlayback
// Usage: in action preferences can be set delay between each action so we make sure that there is no delay
// Input: <none>
// Return: undefined
///////////////////////////////////////////////////////////////////////////////
function acceleratePlayback() {
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    var desc2 = new ActionDescriptor();
    ref.putProperty(TID.property, TID.playbackOptions);
    ref.putEnumerated(TID.application, TID.ordinal, TID.target);
    desc.putReference(TID.idNull, ref);
    desc2.putEnumerated(TID.performance, TID.performance, TID.accelerated);
    desc.putObject(TID.to, TID.playbackOptions, desc2);
    executeAction(TID.set, desc, DialogModes.NO);
}
// End Delete All Empty Layers.jsx
