// Distribute Layer Spacing Vertical - Adobe Photoshop Script
// Description: evenly distributes the selected layers vertically
// Requirements: Adobe Photoshop CS3, or higher
// Version: 0.2.0, 17/Apr/2011
// Author: Trevor Morris (trevor@morris-photographics.com)
// Website: http://morris-photographics.com/
// ============================================================================
// Installation:
// 1. Place script in:
//    PC(32):  C:\Program Files (x86)\Adobe\Adobe Photoshop CS#\Presets\Scripts\
//    PC(64):  C:\Program Files\Adobe\Adobe Photoshop CS# (64 Bit)\Presets\Scripts\
//    Mac:     <hard drive>/Applications/Adobe Photoshop CS#/Presets/Scripts/
// 2. Restart Photoshop
// 3. Choose File > Scripts > Distribute Layer Spacing Vertical
// ============================================================================

// enable double-clicking from Mac Finder or Windows Explorer
#target photoshop

// bring application forward for double-click events
app.bringToFront();

///////////////////////////////////////////////////////////////////////////////
// main - evenly distributes the selected layers vertically
///////////////////////////////////////////////////////////////////////////////
function main() {
	// get selected layers
	var doc = activeDocument;
	var selectedLayers = getSelectedLayersIndex(doc);

	// check for Background layer
	if (selectedLayers[0] == 0) {
		alert('The Background layer cannot be repositioned, so it will be deselected.', 'Background layer deselected', false);
		selectedLayers.shift();
	}

	// remove layer groups from selection
	var len = selectedLayers.length;
	var layerGroup = sTID('layerSectionStart');
	for (var i = 0; i < len; i++) {
		if (getLayerTypeByIndex(selectedLayers[i]) == layerGroup) {
			selectedLayers.splice(i, 1);
			len--;
			i--;
		}
	}

	// display alert for less than three selected layers
	if (len < 3) {
		alert('This command requires three or more selected layers.', 'Too few layers', false);
		return;
	}

	// initialize local variables
	var min = Number(doc.height);
	var max = 0, height = 0, top = 0, bottom = 0, index = 0;
	var bounds = [];

	// get layer bounds and total height
	for (var i = 0; i < len; i++) {
		index = selectedLayers[i];
		bounds = getLayerBoundsByIndex(index);
		top = Number(bounds[0]);
		bottom = Number(bounds[2]);
		min = Math.min(min, top);
		max = Math.max(max, bottom);
		selectedLayers[i] = [index, top];
		height += bottom - top;
	}

	// sort layers based on vertical position
	selectedLayers.sort(numberorder);
	function numberorder(a, b) {return a[1] - b[1];}

	// determine spacing between layers
	var gap = (max - min - height) / (len - 1);
	selectLayerByIndex(selectedLayers[0][0]);

	// evenly distributes layers vertically
	var layer, pLock, aLock;
	for (var i = 1; i < (len - 1); i++) {
		// get bottom bounds of layer to top
		bottom = Number(doc.activeLayer.bounds[3]) + gap;

		// select layer; get top bounds
		selectLayerByIndex(selectedLayers[i][0]);
		top = selectedLayers[i][1];

		// unlock layer
		layer = doc.activeLayer;
		if (layer.allLocked || layer.positionLocked) {
			aLock = layer.allLocked;
			layer.allLocked = false;
			pLock = layer.positionLocked;
			layer.positionLocked = false;

			// reposition layer
			layer.translate(0, Math.round(bottom - top));

			// relock layer
			layer.positionLocked = pLock;
			layer.allLocked = aLock;
		}
		else {
			// reposition layer
			layer.translate(0, Math.round(bottom - top));
		}
	}

	// reselect layers
	for (var i = 0; i < len; i++) {
		selectLayerByIndex(selectedLayers[i][0], true);
	}
}

///////////////////////////////////////////////////////////////////////////////
// xtools functions
// Copyright: (c)2011, xbytor
// License: http://creativecommons.org/licenses/LGPL/2.1
// Contact: xbytor@gmail.com
///////////////////////////////////////////////////////////////////////////////
// modified by Trevor Morris
function selectLayerByIndex(index, append) {
	var desc = new ActionDescriptor();
	var ref = new ActionReference();
	ref.putIndex(cTID('Lyr '), index);
	desc.putReference(cTID('null'), ref);
	if (append) {
		desc.putEnumerated(sTID('selectionModifier'), sTID('selectionModifierType'), sTID('addToSelection'));
//		desc.putBoolean( cTID('MkVs'), false );
	}
	executeAction(cTID('slct'), desc, DialogModes.NO);
}

function getLayerTypeByIndex(idx) {
	var desc = getLayerDescriptorByIndex(idx);
	return desc.getEnumerationValue(sTID('layerSection'));
}

function getLayerDescriptorByIndex(idx) {
	var ref = new ActionReference();
	ref.putIndex(cTID('Lyr '), idx);
	return executeActionGet(ref);
}

///////////////////////////////////////////////////////////////////////////////
// getSelectedLayersIndex - get the index of all selected layers
// credit: Mike Hale
///////////////////////////////////////////////////////////////////////////////
function getSelectedLayersIndex(doc) {
	var selectedLayers = [];
	var ref = new ActionReference();
	ref.putEnumerated(cTID('Dcmn'), cTID('Ordn'), cTID('Trgt'));
	var desc = executeActionGet(ref);
	if (desc.hasKey(sTID('targetLayers'))) {
		desc = desc.getList(sTID('targetLayers'));
		var c = desc.count; 
		for (var i = 0; i < c; i++) {
			try {
				doc.backgroundLayer;
				selectedLayers.push(desc.getReference(i).getIndex());
			}
			catch(e) {
				selectedLayers.push(desc.getReference(i).getIndex() + 1);
			}
		}
	}
	else {
		var ref = new ActionReference();
		ref.putProperty(cTID('Prpr'), cTID('ItmI'));
		ref.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
		try {
			doc.backgroundLayer;
			selectedLayers.push(executeActionGet(ref).getInteger(cTID('ItmI')) - 1);
		}
		catch(e) {
			selectedLayers.push(executeActionGet(ref).getInteger(cTID('ItmI')));
		}
	}
	return selectedLayers;
}

///////////////////////////////////////////////////////////////////////////////
// getLayerBoundsByIndex - get layer bounds by index
// credit: Mike Hale
// source: http://ps-scripts.com/bb/viewtopic.php?f=9&t=3029
///////////////////////////////////////////////////////////////////////////////
function getLayerBoundsByIndex(index) {
	var ref = new ActionReference();
	ref.putIndex(cTID('Lyr '), index);
	var desc = executeActionGet(ref).getObjectValue(sTID('bounds'));
	var bounds = [];
	for (var b = 0; b < 4; b++) {
		bounds.push(desc.getUnitDoubleValue(desc.getKey(b)));
	}
	return bounds;
}

function cTID(s) {return app.charIDToTypeID(s);}
function sTID(s) {return app.stringIDToTypeID(s);}


///////////////////////////////////////////////////////////////////////////////
// isCorrectVersion - check for Adobe Photoshop CS3 (v10) or higher
///////////////////////////////////////////////////////////////////////////////
function isCorrectVersion() {
	if (parseInt(version, 10) >= 10) {
		return true;
	}
	else {
		alert('This script requires Adobe Photoshop CS3 or higher.', 'Wrong version', false);
		return false;
	}
}

///////////////////////////////////////////////////////////////////////////////
// isOpenDocs - ensure at least one document is open
///////////////////////////////////////////////////////////////////////////////
function isOpenDocs() {
	if (documents.length) {
		return true;
	}
	else {
		alert('There are no documents open.', 'No documents open', false);
		return false;
	}
}

///////////////////////////////////////////////////////////////////////////////
// showError - display error message if something goes wrong
///////////////////////////////////////////////////////////////////////////////
function showError(err) {
	if (confirm('An unknown error has occurred.\n' +
		'Would you like to see more information?', true, 'Unknown error')) {
			alert(err + ': on line ' + err.line, 'Script Error', true);
	}
}


///////////////////////////////////////////////////////////////////////////////
// test initial conditions prior to running main function
///////////////////////////////////////////////////////////////////////////////
if (isCorrectVersion() && isOpenDocs()) {
	// remember unit settings; switch to pixels
	displayDialogs = DialogModes.NO;
	var originalRulerUnits = preferences.rulerUnits;
	preferences.rulerUnits = Units.PIXELS;

	try {
		activeDocument.suspendHistory('Distribute Spacing Vertical', 'main()');
	}
	catch(e) {
		// don't report error on user cancel
		if (e.number != 8007) {
			showError(e);
		}
	}

	// restore original ruler units
	displayDialogs = DialogModes.NO;
	preferences.rulerUnits = originalRulerUnits;
}
