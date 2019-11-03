#target photoshopapp.bringToFront();$.level = 0;// GlobalsSettings = {	storedPaths: {},	storedSelections: {},	scriptName: "Save PR JPG HERO",	units: "pixels"	};// Main entry pointmain();function main() {	var formatOptions;		// Create JPEG save options	formatOptions = formatJPEG(FormatOptions.OPTIMIZEDBASELINE, "10", "3", MatteType.NONE, true);		// Save copy of document as	docSaveAs(formatOptions, "Add After", "-HERO", "No Change", "Path", "~/Desktop/PR/Info Page Hero (RGB | 363px W x 290px H | 72ppi)/", "");		}// Functionsfunction docSaveAs(formatOptions, nameChange, nameText, newCase, destType, destRef, storeName) {	var hasPath, f, name, nameArray, n, ext;		if (!documents.length) { logErr(arguments, "noOpenDocs"); return; }	if (!formatOptions) { logErr(arguments, "noFormatOptions"); return; }	if (nameChange=="Replace" && !nameText) { logErr(arguments, "badNameValue"); return; }	f = fileGetFolder(destType, destRef);	if (!f) { logErr(arguments, "noDestFolder"); return; }	try { activeDocument.path; hasPath=true; } catch(e){ hasPath=false; }		name = activeDocument.name;	if (hasPath) {		nameArray = name.split(".");		n = nameArray.length-1;		ext = nameArray[n];		switch (nameChange) {			case "Add Before": nameArray[0] = nameText + nameArray[0]; break;			case "Add After": nameArray[n-1] = nameArray[n-1] + nameText; break;			case "Replace": nameArray = [nameText, ext]; break;			}		name = nameArray.join(".");		}	else {		ext = {"[BMPSaveOptions]":".bmp", "[DCS1_SaveOptions]":".eps", "[DCS2_SaveOptions":".eps", 		"[EPSSaveOptions]":".eps", "[GIFSaveOptions]":".gif", "[JPEGSaveOptions]":".jpg", 		"[PhotoshopSaveOptions]":".psd", "[PICTFileSaveOptions]":".pct", "[PICTResourceSaveOptions":".pct",		"[PixarSaveOptions]":".pxr", "[PNGSaveOptions]":".png", "[RawSaveOptions]":".raw",		"[TargaSaveOptions]":".tga", "[TiffSaveOptions]":".tif"}[formatOptions.constructor.toString()]||"";		switch (nameChange) {			case "Add Before": name = nameText + name; break;			case "Add After": name = name + nameText; break;			case "Replace": name = nameText; break;			}		if (!name) { name = "Untitled"; }		name += ext;		}		switch (newCase) {		case "Lowercase": name = name.toLowerCase(); break;		case "Uppercase": name = name.toUpperCase(); break;		}		try {		f = new File(f.fullName+"/"+name);		activeDocument.saveAs(f, formatOptions, true);		Settings.storedPaths.lastCreated = f.fullName;		if (storeName) { Settings.storedPaths[storeName] = f.fullName; }		}	catch(e) { log(arguments.callee, e); }	}function fileAppend(path, data, encoding) {	var file;	file = new File(path);	file.open("a");	if (typeof(encoding) == "string") {file.encoding = encoding;}	file.write(data);	file.close();	}function fileGetFolder(srcType, srcRef) {	var path, f, msg;	switch (srcType) {		case "Last Created": path = Settings.storedPaths.lastCreated; break;		case "Path": path = srcRef; break;		case "Named Path": path = Settings.storedPaths[srcRef.toLowerCase()]; break;		}		if (!path) {		msg = "Select a folder:";		if (Settings.lastFolderPath) { f = new Folder(Settings.lastFolderPath).selectDlg(msg); }		else { f = Folder.selectDialog(msg); }		if (f&&f.exists) { Settings.lastFolderPath = f.fsName.split("\\").join("/")+"/"; }		}	else { f = new Folder(path); }		if (!f||!f.exists) { logErr(arguments, "noFileSystemPath"); return; }	return f;	}function fileWrite(path, data, encoding) {	var file;	file = new File(path);	if (file.exists) {file.remove();}	file.open("e");	if (typeof(encoding) == "string") {file.encoding = encoding;}	file.write(data);	file.close();	}function formatJPEG(format, quality, scans, matte, embed) {	var result = new JPEGSaveOptions();		try {		result.formatOptions = format;		result.quality = parseInt(quality);		result.scans = parseInt(scans);		result.matte = matte;		result.embedColorProfile = embed;		}	catch(e) { log(arguments.callee, e); }		return result;	}function log(v, err, msg) {	// Initialization	if (!Settings.debug) {		var pathArray, date, str;		Settings.debug = {			delim:String.fromCharCode(13, 10),			path: Folder.userData+ "/Script Builder Files/" +Settings.scriptName+ " - Log.txt",			text:""			};		date = new Date();		str = "Begin debug log: " + date.toLocaleString() +Settings.debug.delim;		str += "------------------------------------------------------------" +Settings.debug.delim;		fileWrite(Settings.debug.path, str);		}		// Error logging	if (typeof v == "function") {		v = "Error in " +v.name+ "(): ";		if (err && msg) { v += msg + " " + err.message; }		else if (err) { v += err.message; }		else if (msg) { v += msg; }		else { v = v.substring(0, v.length-2) + "."; }		}		// Normal message logging	else {		if (typeof v != "string") {			if (v == undefined) {v = "undefined";}			else {v = v.toString();}			}		}		if (Settings.debug.path) { fileAppend(Settings.debug.path, v + Settings.debug.delim); }	}function logErr(src, id) {	var err = {		badChannelValue:	"Invalid channel number entered.",		badColorValue:		"Invalid color value entered.",		badDocDimsValue:	"Invalid document dimensions entered.",		badExportValues:	"Invalid file path or file name value supplied for export.",		badNameValue:			"Invalid name value supplied.",		badNumberValue:		"Invalid number value supplied.",		badPathName:			"Path name supplied is not unique.",		badRefEdgeOuput:	"Output method cannot be used when decontaminating colors.",		badSubdivValue:		"Subdivisions value must be an integer between 1 and 100.",		badTestValue:			"Invalid comparison value supplied.",		fileError:				"Could not read file.",		fileExists:				"A file of the same name already exists in the chosen location.",		flatImagesOnly:		"This function only works on flattened images.",		layerDataError:		"An error occurred while reading the layer settings.",		logNotEnabled:		"Log must be enabled in order to assign file path.",		multiLayerOnly:		"More than one layer must be selected.",		noClipImageData:	"No image data on clipboard.",		noDocFile:				"Document has never been saved.",		noActionName:			"No action name specified.",		noActionSetName:	"No action set name specified.",		noBkgdLayer:			"There is no background layer.",		noDestFolder:			"Destination folder not defined.",		noFile:						"File does not exist at the specified location.",		noFileSystemPath:	"No file or folder path was chosen.",		noFilterImg:			"Image file does not exist, or none was selected.",		noFilterMask:			"Layer has no filter mask.",		noFolder:					"Folder does not exist at the specified location.",		noFormatOptions:	"The \"formatOptions\" parameter is not defined.",		noHTMLExporter:		"The \"htmlExporter\" object does not exist or is not valid.",		noLayerArtwork:		"Layer has no image data.",		noLayerComps:			"Document has no layer comps.",		noLayerFX:				"Layer has no effects.",		noLayerMask:			"Layer has no layer mask.",		noLogTextFile:		"Log file path should point to a text file.",		noLogFile:				"Log file path does not point to a file.",		noNameValue:			"No new name entered.",		noOpenDocs:				"There are no documents open.",		noQuicktime:			"File format requires QuickTime.",		noSelectedPath:		"There is no path selected.",		noSelection:			"There is no selection.",		noSelectionMod:		"There is no selection to modify.",		noTextExporter:		"The \"textExporter\" object does not exist or is not valid.",		noVectorMask:			"Layer has no vector mask.",		noWorkPath:				"Document has no work path.",		singleLayerOnly:	"Only one layer should be selected.",		wrongLayerKind:		"Selected layer is the wrong kind for the requested action."		}[id];	if (err) { log(src.callee, null, err); }	}