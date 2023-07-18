// Save Current File as PNG on Desktop without dialog
var desktopPath = Folder.desktop;
var doc = app.activeDocument;

// Get the file name without extension
var fileName = doc.name.replace(/\.[^\.]+$/, '');

// Create a copy of the document
var docCopy = doc.duplicate();

// Flatten the copy to ensure all layers are merged
docCopy.flatten();

// PNG Save Options
var options = new ExportOptionsSaveForWeb();
options.format = SaveDocumentType.PNG;
options.PNG8 = false; // Set to true for PNG-8 format
options.interlaced = false; // Set to true for interlaced PNG

// Create the destination file path
var destinationPath = new File(desktopPath + "/" + fileName + ".png");

// Save the document copy as PNG without dialog
docCopy.exportDocument(destinationPath, ExportType.SAVEFORWEB, options);

// // Close the document copy without saving changes
// docCopy.close(SaveOptions.DONOTSAVECHANGES);
