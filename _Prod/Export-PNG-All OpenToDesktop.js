// Save Documents as PNG with confirmation dialog
var documents = app.documents;
var destinationFolder;

// Ask user if they want to specify a folder
var specifyFolder = confirm("Do you want to specify a folder for saving the PNG files?\nClick 'OK' to specify a folder or 'Cancel' to save directly on the desktop.");

if (specifyFolder) {
  // User wants to specify a folder
  var destinationFolderPath = Folder.selectDialog("Select destination folder for saving PNG files.");

  if (destinationFolderPath === null) {
    // No folder selected, save on desktop
    destinationFolder = null;
  } else {
    destinationFolder = destinationFolderPath.fsName;
  }
} else {
  // Save directly on desktop
  destinationFolder = null;
}

// Function to save a single document
function saveDocumentAsPNG(document, destinationFolder) {
  // Get the file name without extension
  var fileName = document.name.replace(/\.[^\.]+$/, '');

  // Create a copy of the document
  var docCopy = document.duplicate();

  // Flatten the copy to ensure all layers are merged
  docCopy.flatten();

  // PNG Save Options
  var options = new ExportOptionsSaveForWeb();
  options.format = SaveDocumentType.PNG;
  options.PNG8 = false; // Set to true for PNG-8 format
  options.interlaced = false; // Set to true for interlaced PNG

  // Create the destination file path
  var destinationPath;
  if (destinationFolder) {
    destinationPath = new File(destinationFolder + "/" + fileName + ".png");
  } else {
    destinationPath = new File(Folder.desktop + "/" + fileName + ".png");
  }

  // Save the document copy as PNG without dialog
  docCopy.exportDocument(destinationPath, ExportType.SAVEFORWEB, options);

  // Close the document copy without saving changes
  docCopy.close(SaveOptions.DONOTSAVECHANGES);
}

// Check if multiple documents are open
if (documents.length > 1) {
  // Ask user whether to save all documents or just the active one
  var saveAll = confirm("Save all open documents as PNG?\nClick 'OK' to save all or 'Cancel' to save only the active document.");

  // Loop through all documents and save as PNG
  for (var i = 0; i < documents.length; i++) {
    if (saveAll) {
      saveDocumentAsPNG(documents[i], destinationFolder);
    } else if (documents[i] === app.activeDocument) {
      saveDocumentAsPNG(documents[i], destinationFolder);
      break;
    }
  }
} else if (documents.length === 1) {
  // Save the single open document as PNG
  saveDocumentAsPNG(documents[0], destinationFolder);
}

// Display confirmation dialog
alert("Files saved as PNG!");
