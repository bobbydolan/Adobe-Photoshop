﻿// Copyright 2015.  Adobe Systems, Incorporated.  All rights reserved.
// This script will create a file from each artboard and then export to a PDF Presentation
// Written by Sandra Voelker
 
/*
@@@BUILDINFO@@@ Artboards To PDF.jsx 2.0.0.1
*/
 
/*
 
// BEGIN__HARVEST_EXCEPTION_ZSTRING
 
<javascriptresource>
    <name>$$$/JavaScripts/ArtboardsToPDF/Menu=Artboards to PDF...</name>
    <category>scriptexport</category>
    <menu>export</menu>
    <eventid>12fb03a7-e9af-426a-8377-3d423d7303e6</eventid>
    <enableinfo>PSHOP_DocHasArtboards</enableinfo>
<terminology><![CDATA[<< /Version 1 
                         /Events << 
                          /12fb03a7-e9af-426a-8377-3d423d7303e6 [($$$/JavaScripts/ArtboardsToPDF/Action=Artboard to PDF) /noDirectParam <<
                          >>] 
                         >> 
                      >> ]]></terminology>
</javascriptresource>

// END__HARVEST_EXCEPTION_ZSTRING
 
*/
  
 // enable double clicking from the Macintosh Finder or the Windows Explorer
#target photoshop
 
// debug level: 0-2 (0:disable, 1:break on error, 2:break at beginning)
// $.level =   0;
// debugger; // launch debugger on next line

//12fb03a7-e9af-426a-8377-3d423d7303e6
// on localized builds we pull the $$$/Strings from a .dat file, see documentation for more details
$.localize = true;
app.playbackDisplayDialogs = DialogModes.ALL;

//=================================================================
// Globals
//=================================================================
 var ScriptFilePath = Folder($.fileName).parent.fsName ; 
 
// UI strings to be localized 
var strTitle = localize("$$$/JavaScripts/ArtboardsToPDF/Title=Artboards To PDF");
var strMessage = localize("$$$/JavaScripts/ArtboardsToPDF/Message=Artboard To PDF action settings");

var running = "abToPDF"; 
 
$.evalFile(new File(ScriptFilePath + '/ArtboardExport.inc'));
main(initExportInfo, "PDF"); 
 
 
 
///////////////////////////////////////////////////////////////////////////////
// Function: initExportInfo
// Usage: create our default parameters
// Input: a new Object
// Return: a new object with params set to default
///////////////////////////////////////////////////////////////////////////////
function initExportInfo(exportInfo, isSelection, isOverrideSticky) {
    if (isOverrideSticky)
    {
        exportInfo.destination = new String("");
        exportInfo.fileNamePrefix = new String("untitled_");
        if (isSelection) exportInfo.selectionOnly = true;
        if (!isSelection) exportInfo.selectionOnly = false;
    }
    else 
    {
        exportInfo.destination = new String("");
        exportInfo.fileNamePrefix = new String("untitled_");
        if (isSelection) exportInfo.selectionOnly = true;
        if (!isSelection) exportInfo.selectionOnly = false;
        exportInfo.includeOverlapping = true;
        exportInfo.expOptions = true;
        exportInfo.contentOnly = false;
        exportInfo.fileType = pdfIndex;
        exportInfo.preserveArtboard = true;
        exportInfo.reversePageOrder = false; //add option for reverse page order for PDF
        
		exportInfo.iccPDF = true;
		exportInfo.iccPSD = true;
		exportInfo.iccPNG8 = true;
		exportInfo.iccPNG24 = true;
		exportInfo.iccTIF = true;
		exportInfo.iccBMP = true;
		exportInfo.iccTGA = true;
		exportInfo.iccJPG = true;
    
        exportInfo.jpegQuality = 8;
        exportInfo.psdMaxComp = true;
        exportInfo.tiffCompression = TIFFEncoding.NONE;
        exportInfo.tiffJpegQuality = 8;
        exportInfo.pdfEncoding = PDFEncoding.JPEG;
        exportInfo.pdfJpegQuality = 8;
        exportInfo.targaDepth = TargaBitsPerPixels.TWENTYFOUR;
        exportInfo.bmpDepth = BMPDepthType.TWENTYFOUR;
        exportInfo.png24Transparency = true;
        exportInfo.png24Interlaced = false;
        exportInfo.png24Trim = true;
        exportInfo.png8Transparency = true;
        exportInfo.png8Interlaced = false;
        exportInfo.png8Trim = true;
        exportInfo.showExpTypes = false;			// don't show other file types
        //init pdf settings 
        exportInfo.multipage = true;
        exportInfo.singlepage = false;
        exportInfo.pdfJpegQuality = 8;
		
        exportInfo.inclArtboardNamePDF = false;
        exportInfo.inclArtboardNamePSD = false;
        exportInfo.inclArtboardNamePNG8 = false;
        exportInfo.inclArtboardNamePNG24 = false;
        exportInfo.inclArtboardNameTIF = false;
        exportInfo.inclArtboardNameBMP = false;
        exportInfo.inclArtboardNameTGA = false;
        exportInfo.inclArtboardNameJPG = false;
        exportInfo.inclArtboardName = false; 
        exportInfo.artboardNameFontName = undefined; 
        exportInfo.artboardNameSize = 12; 
        exportInfo.artboardNameColor = [0,0,0];
        exportInfo.artboardNameBackgroundColor = [255,255,255];
        exportInfo.artboardNameBackgroundColorIndex = 0;
        exportInfo.exportArtboardBackground = true;

        try {
            var cloudWorkarea = CloudDocumentWorkareaPath(app.activeDocument);
            var tmp;
            
            if (cloudWorkarea != null) {
                exportInfo.destination = cloudWorkarea;
                tmp = app.activeDocument.name;
            } else {
                exportInfo.destination = app.activeDocument.fullName.parent.fsName; // destination folder
                tmp = app.activeDocument.fullName.name;
            }
            
            var pieces = tmp.split('.');
            exportInfo.fileNamePrefix = decodeURI(pieces.length == 1 ? tmp : pieces.slice(0, pieces.length-1).join('.')); // filename body part
        } catch(someError) {
            exportInfo.destination = new String("");
            exportInfo.fileNamePrefix = app.activeDocument.name; // filename body part
        }
    }
}
 

