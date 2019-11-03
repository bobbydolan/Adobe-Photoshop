//notes
//check if index exists
//add logging
//add layer validation
//log fails



#include "common_ps_commands.jsxinc"

#
target photoshop
var folderToProcess = Folder("~/Dropbox\ \(Facebook\)/avatars_art/production/design/hair")

main();

function main() {
  fileLooper(folderToProcess)
}

//run in folder
function fileLooper(dir) {
  var error_report = [];

  var fileList = dir.getFiles()
  for (var i = 0; i < fileList.length; i++) {
    var file = fileList[i]
    var test = fileList[i].toString().split(".")[fileList[i].toString().split(".").length - 1]
    if (test == "psd") {
      app.open(fileList[i]);
      var test = fileList[i].modified
      error_report = error_report.concat(hairProcessor(fileList[i]));
      activeDocument.close(SaveOptions.DONOTSAVECHANGES);
    }
  }
  textLogger(folderToProcess, error_report, "error")
  textLogger(folderToProcess, error_report, "good")
}

function hairProcessor(openFile) {

  var hair_test = fileValidator(["hair_0", "hair_1", "hair_2"], app.activeDocument)
  if (hair_test) {
    var currentFile = {}
    currentFile["obj"] = app.activeDocument;
    currentFile["name"] = currentFile.obj.name;
    if (currentFile.name.split("_").length > 3) {
      currentFile["outputPath"] = Folder(currentFile.obj.path.toString().split("design")[0] + "rig/sourceImages/Marionette/face/hair/" + currentFile.name.split("_")[1] + "_" + currentFile.name.split("_")[2] + "_" + currentFile.name.split("_")[3].split(".")[0]);
    } else {
      currentFile["outputPath"] = Folder(currentFile.obj.path.toString().split("design")[0] + "rig/sourceImages/Marionette/face/hair/" + currentFile.name.split("_")[1] + "_" + currentFile.name.split("_")[2].split(".")[0]);
    }
    if (!currentFile.outputPath.exists) {
      currentFile.outputPath.create();
    }
    for (var hair_index = 0; hair_index < 3; hair_index++) {
      openSmartObject("hair_" + hair_index);
      /*var templateTest = fileValidator(["build_in_here","reference_no_export"], app.activeDocument);
      var testlyr = app.activeDocument.artLayers[0]
      if(templateTest){
          var test2 = app.activeDocument.artLayers.getByName ("build_in_here");
          var stopper = 0;

      }*/
      saveForWebExtra("hair_" + hair_index + ".png", currentFile.outputPath, 100);
      activeDocument.close(SaveOptions.DONOTSAVECHANGES);
    }
  } else {
    return "error," + activeDocument.name + "," + openFile.modified
  }
  return "good," + activeDocument.name + "," + openFile.modified
}


function fileValidator(layerNameArray, doc) {
  var result = [];
  for (var i = 0; i < layerNameArray.length; i++) {
    result[i] = false;
    for (var lyr_i = 0; lyr_i < doc.artLayers.length; lyr_i++) {
      var test_lyr = doc.artLayers[lyr_i];
      if (doc.artLayers[lyr_i].name == layerNameArray[i]) {
        result[i] = true;
        break;
      }
    }
    if (!result[i]) {
      return false;
    }
  }
  return true;
}

function textLogger(path, stringArray, keyword) {
  if (stringArray.length > 0) {
    var text_file = new File(path.toString() + "/" + keyword + ".txt")
    text_file.open('w')
    for (var i = 0; i < stringArray.length; i++) {
      var test = stringArray[i]
      if (stringArray[i].split(",")[0] == keyword) {
        text_file.writeln(stringArray[i].split(",")[1] + "," + stringArray[i].split(",")[2])
      }
    }
    text_file.close()
  }
}
