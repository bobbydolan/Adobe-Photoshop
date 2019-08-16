 function main(){  
if(!documents.length) return;  
var Name = app.activeDocument.name.replace(/\.[^\.]+$/, '');   
var saveFile = File(Folder.desktop + "/" + Name + "_70.jpg");  
if(saveFile.exists){  
   if(!confirm("Overwrite existing document?")) return;  
    saveFile.remove();  
    }  
SaveForWeb(saveFile,70); //change to 70 for 70%  
}  
main();  
function SaveForWeb(saveFile,jpegQuality) {  
var sfwOptions = new ExportOptionsSaveForWeb();   
   sfwOptions.format = SaveDocumentType.JPEG;   
   sfwOptions.includeProfile = false;   
   sfwOptions.interlaced = 0;   
   sfwOptions.optimized = true;   
   sfwOptions.quality = jpegQuality; //0-100   
activeDocument.exportDocument(saveFile, ExportType.SAVEFORWEB, sfwOptions);  
}  