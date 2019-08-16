#target photoshop  
// Setup  
doc = app.activeDocument;   
  
function saveForWeb(width, height, fileSuffix) {  
var originalRulerUnits = app.preferences.rulerUnits;  
app.preferences.rulerUnits = Units.PIXELS;  
var basename = doc.name.match(/(.*)\.[^\.]+$/)[1];  
var thePercentage = width / doc.width * 100;  
var theFile = basename + fileSuffix + ".png";  
// =======================================================  
var idExpr = charIDToTypeID( "Expr" );  
    var desc2 = new ActionDescriptor();  
    var idUsng = charIDToTypeID( "Usng" );  
        var desc3 = new ActionDescriptor();  
        var idOp = charIDToTypeID( "Op  " );  
        var idSWOp = charIDToTypeID( "SWOp" );  
        var idOpSa = charIDToTypeID( "OpSa" );  
        desc3.putEnumerated( idOp, idSWOp, idOpSa );  
        var idDIDr = charIDToTypeID( "DIDr" );  
        desc3.putBoolean( idDIDr, true );  
        var idIn = charIDToTypeID( "In  " );  
        desc3.putPath( idIn, new File( doc.path ) );  
        var idovFN = charIDToTypeID( "ovFN" );  
        desc3.putString( idovFN, theFile );  
        var idFmt = charIDToTypeID( "Fmt " );  
        var idIRFm = charIDToTypeID( "IRFm" );  
        var idPNtwofour = charIDToTypeID( "PN24" );  
        desc3.putEnumerated( idFmt, idIRFm, idPNtwofour );  
        var idIntr = charIDToTypeID( "Intr" );  
        desc3.putBoolean( idIntr, false );  
        var idTrns = charIDToTypeID( "Trns" );  
        desc3.putBoolean( idTrns, true );  
        var idMtt = charIDToTypeID( "Mtt " );  
        desc3.putBoolean( idMtt, false );  
        var idMttR = charIDToTypeID( "MttR" );  
        desc3.putInteger( idMttR, 255 );  
        var idMttG = charIDToTypeID( "MttG" );  
        desc3.putInteger( idMttG, 255 );  
        var idMttB = charIDToTypeID( "MttB" );  
        desc3.putInteger( idMttB, 255 );  
        var idHScl = charIDToTypeID( "HScl" );  
        var idPrc = charIDToTypeID( "#Prc" );  
        desc3.putUnitDouble( idHScl, idPrc, thePercentage );  
        var idVScl = charIDToTypeID( "VScl" );  
        var idPrc = charIDToTypeID( "#Prc" );  
        desc3.putUnitDouble( idVScl, idPrc, thePercentage );  
        var idSHTM = charIDToTypeID( "SHTM" );  
        desc3.putBoolean( idSHTM, false );  
        var idSImg = charIDToTypeID( "SImg" );  
        desc3.putBoolean( idSImg, true );  
        var idSWsl = charIDToTypeID( "SWsl" );  
        var idSTsl = charIDToTypeID( "STsl" );  
        var idSLAl = charIDToTypeID( "SLAl" );  
        desc3.putEnumerated( idSWsl, idSTsl, idSLAl );  
        var idSWch = charIDToTypeID( "SWch" );  
        var idSTch = charIDToTypeID( "STch" );  
        var idCHsR = charIDToTypeID( "CHsR" );  
        desc3.putEnumerated( idSWch, idSTch, idCHsR );  
        var idSWmd = charIDToTypeID( "SWmd" );  
        var idSTmd = charIDToTypeID( "STmd" );  
        var idMDCC = charIDToTypeID( "MDCC" );  
        desc3.putEnumerated( idSWmd, idSTmd, idMDCC );  
        var idohXH = charIDToTypeID( "ohXH" );  
        desc3.putBoolean( idohXH, false );  
        var idohIC = charIDToTypeID( "ohIC" );  
        desc3.putBoolean( idohIC, true );  
        var idohAA = charIDToTypeID( "ohAA" );  
        desc3.putBoolean( idohAA, true );  
        var idohQA = charIDToTypeID( "ohQA" );  
        desc3.putBoolean( idohQA, true );  
        var idohCA = charIDToTypeID( "ohCA" );  
        desc3.putBoolean( idohCA, false );  
        var idohIZ = charIDToTypeID( "ohIZ" );  
        desc3.putBoolean( idohIZ, true );  
        var idohTC = charIDToTypeID( "ohTC" );  
        var idSToc = charIDToTypeID( "SToc" );  
        var idOCzerothree = charIDToTypeID( "OC03" );  
        desc3.putEnumerated( idohTC, idSToc, idOCzerothree );  
        var idohAC = charIDToTypeID( "ohAC" );  
        var idSToc = charIDToTypeID( "SToc" );  
        var idOCzerothree = charIDToTypeID( "OC03" );  
        desc3.putEnumerated( idohAC, idSToc, idOCzerothree );  
        var idohIn = charIDToTypeID( "ohIn" );  
        desc3.putInteger( idohIn, -1 );  
        var idohLE = charIDToTypeID( "ohLE" );  
        var idSTle = charIDToTypeID( "STle" );  
        var idLEzerothree = charIDToTypeID( "LE03" );  
        desc3.putEnumerated( idohLE, idSTle, idLEzerothree );  
        var idohEn = charIDToTypeID( "ohEn" );  
        var idSTen = charIDToTypeID( "STen" );  
        var idENzerozero = charIDToTypeID( "EN00" );  
        desc3.putEnumerated( idohEn, idSTen, idENzerozero );  
        var idolCS = charIDToTypeID( "olCS" );  
        desc3.putBoolean( idolCS, false );  
        var idolEC = charIDToTypeID( "olEC" );  
        var idSTst = charIDToTypeID( "STst" );  
        var idSTzerozero = charIDToTypeID( "ST00" );  
        desc3.putEnumerated( idolEC, idSTst, idSTzerozero );  
        var idolWH = charIDToTypeID( "olWH" );  
        var idSTwh = charIDToTypeID( "STwh" );  
        var idWHzeroone = charIDToTypeID( "WH01" );  
        desc3.putEnumerated( idolWH, idSTwh, idWHzeroone );  
        var idolSV = charIDToTypeID( "olSV" );  
        var idSTsp = charIDToTypeID( "STsp" );  
        var idSPzerofour = charIDToTypeID( "SP04" );  
        desc3.putEnumerated( idolSV, idSTsp, idSPzerofour );  
        var idolSH = charIDToTypeID( "olSH" );  
        var idSTsp = charIDToTypeID( "STsp" );  
        var idSPzerofour = charIDToTypeID( "SP04" );  
        desc3.putEnumerated( idolSH, idSTsp, idSPzerofour );  
        var idolNC = charIDToTypeID( "olNC" );  
            var list1 = new ActionList();  
                var desc4 = new ActionDescriptor();  
                var idncTp = charIDToTypeID( "ncTp" );  
                var idSTnc = charIDToTypeID( "STnc" );  
                var idNCzerozero = charIDToTypeID( "NC00" );  
                desc4.putEnumerated( idncTp, idSTnc, idNCzerozero );  
            var idSCnc = charIDToTypeID( "SCnc" );  
            list1.putObject( idSCnc, desc4 );  
                var desc5 = new ActionDescriptor();  
                var idncTp = charIDToTypeID( "ncTp" );  
                var idSTnc = charIDToTypeID( "STnc" );  
                var idNConenine = charIDToTypeID( "NC19" );  
                desc5.putEnumerated( idncTp, idSTnc, idNConenine );  
            var idSCnc = charIDToTypeID( "SCnc" );  
            list1.putObject( idSCnc, desc5 );  
                var desc6 = new ActionDescriptor();  
                var idncTp = charIDToTypeID( "ncTp" );  
                var idSTnc = charIDToTypeID( "STnc" );  
                var idNCtwoeight = charIDToTypeID( "NC28" );  
                desc6.putEnumerated( idncTp, idSTnc, idNCtwoeight );  
            var idSCnc = charIDToTypeID( "SCnc" );  
            list1.putObject( idSCnc, desc6 );  
                var desc7 = new ActionDescriptor();  
                var idncTp = charIDToTypeID( "ncTp" );  
                var idSTnc = charIDToTypeID( "STnc" );  
                var idNCtwofour = charIDToTypeID( "NC24" );  
                desc7.putEnumerated( idncTp, idSTnc, idNCtwofour );  
            var idSCnc = charIDToTypeID( "SCnc" );  
            list1.putObject( idSCnc, desc7 );  
                var desc8 = new ActionDescriptor();  
                var idncTp = charIDToTypeID( "ncTp" );  
                var idSTnc = charIDToTypeID( "STnc" );  
                var idNCtwofour = charIDToTypeID( "NC24" );  
                desc8.putEnumerated( idncTp, idSTnc, idNCtwofour );  
            var idSCnc = charIDToTypeID( "SCnc" );  
            list1.putObject( idSCnc, desc8 );  
                var desc9 = new ActionDescriptor();  
                var idncTp = charIDToTypeID( "ncTp" );  
                var idSTnc = charIDToTypeID( "STnc" );  
                var idNCtwofour = charIDToTypeID( "NC24" );  
                desc9.putEnumerated( idncTp, idSTnc, idNCtwofour );  
            var idSCnc = charIDToTypeID( "SCnc" );  
            list1.putObject( idSCnc, desc9 );  
        desc3.putList( idolNC, list1 );  
        var idobIA = charIDToTypeID( "obIA" );  
        desc3.putBoolean( idobIA, false );  
        var idobIP = charIDToTypeID( "obIP" );  
        desc3.putString( idobIP, "\"\"\"\"" );  
        var idobCS = charIDToTypeID( "obCS" );  
        var idSTcs = charIDToTypeID( "STcs" );  
        var idCSzeroone = charIDToTypeID( "CS01" );  
        desc3.putEnumerated( idobCS, idSTcs, idCSzeroone );  
        var idovNC = charIDToTypeID( "ovNC" );  
            var list2 = new ActionList();  
                var desc10 = new ActionDescriptor();  
                var idncTp = charIDToTypeID( "ncTp" );  
                var idSTnc = charIDToTypeID( "STnc" );  
                var idNCzeroone = charIDToTypeID( "NC01" );  
                desc10.putEnumerated( idncTp, idSTnc, idNCzeroone );  
            var idSCnc = charIDToTypeID( "SCnc" );  
            list2.putObject( idSCnc, desc10 );  
                var desc11 = new ActionDescriptor();  
                var idncTp = charIDToTypeID( "ncTp" );  
                var idSTnc = charIDToTypeID( "STnc" );  
                var idNCtwozero = charIDToTypeID( "NC20" );  
                desc11.putEnumerated( idncTp, idSTnc, idNCtwozero );  
            var idSCnc = charIDToTypeID( "SCnc" );  
            list2.putObject( idSCnc, desc11 );  
                var desc12 = new ActionDescriptor();  
                var idncTp = charIDToTypeID( "ncTp" );  
                var idSTnc = charIDToTypeID( "STnc" );  
                var idNCzerotwo = charIDToTypeID( "NC02" );  
                desc12.putEnumerated( idncTp, idSTnc, idNCzerotwo );  
            var idSCnc = charIDToTypeID( "SCnc" );  
            list2.putObject( idSCnc, desc12 );  
                var desc13 = new ActionDescriptor();  
                var idncTp = charIDToTypeID( "ncTp" );  
                var idSTnc = charIDToTypeID( "STnc" );  
                var idNConenine = charIDToTypeID( "NC19" );  
                desc13.putEnumerated( idncTp, idSTnc, idNConenine );  
            var idSCnc = charIDToTypeID( "SCnc" );  
            list2.putObject( idSCnc, desc13 );  
                var desc14 = new ActionDescriptor();  
                var idncTp = charIDToTypeID( "ncTp" );  
                var idSTnc = charIDToTypeID( "STnc" );  
                var idNCzerosix = charIDToTypeID( "NC06" );  
                desc14.putEnumerated( idncTp, idSTnc, idNCzerosix );  
            var idSCnc = charIDToTypeID( "SCnc" );  
            list2.putObject( idSCnc, desc14 );  
                var desc15 = new ActionDescriptor();  
                var idncTp = charIDToTypeID( "ncTp" );  
                var idSTnc = charIDToTypeID( "STnc" );  
                var idNCtwofour = charIDToTypeID( "NC24" );  
                desc15.putEnumerated( idncTp, idSTnc, idNCtwofour );  
            var idSCnc = charIDToTypeID( "SCnc" );  
            list2.putObject( idSCnc, desc15 );  
                var desc16 = new ActionDescriptor();  
                var idncTp = charIDToTypeID( "ncTp" );  
                var idSTnc = charIDToTypeID( "STnc" );  
                var idNCtwofour = charIDToTypeID( "NC24" );  
                desc16.putEnumerated( idncTp, idSTnc, idNCtwofour );  
            var idSCnc = charIDToTypeID( "SCnc" );  
            list2.putObject( idSCnc, desc16 );  
                var desc17 = new ActionDescriptor();  
                var idncTp = charIDToTypeID( "ncTp" );  
                var idSTnc = charIDToTypeID( "STnc" );  
                var idNCtwofour = charIDToTypeID( "NC24" );  
                desc17.putEnumerated( idncTp, idSTnc, idNCtwofour );  
            var idSCnc = charIDToTypeID( "SCnc" );  
            list2.putObject( idSCnc, desc17 );  
                var desc18 = new ActionDescriptor();  
                var idncTp = charIDToTypeID( "ncTp" );  
                var idSTnc = charIDToTypeID( "STnc" );  
                var idNCtwotwo = charIDToTypeID( "NC22" );  
                desc18.putEnumerated( idncTp, idSTnc, idNCtwotwo );  
            var idSCnc = charIDToTypeID( "SCnc" );  
            list2.putObject( idSCnc, desc18 );  
        desc3.putList( idovNC, list2 );  
        var idovCM = charIDToTypeID( "ovCM" );  
        desc3.putBoolean( idovCM, false );  
        var idovCW = charIDToTypeID( "ovCW" );  
        desc3.putBoolean( idovCW, false );  
        var idovCU = charIDToTypeID( "ovCU" );  
        desc3.putBoolean( idovCU, true );  
        var idovSF = charIDToTypeID( "ovSF" );  
        desc3.putBoolean( idovSF, true );  
        var idovCB = charIDToTypeID( "ovCB" );  
        desc3.putBoolean( idovCB, true );  
        var idovSN = charIDToTypeID( "ovSN" );  
        desc3.putString( idovSN, """images""" );  
    var idSaveForWeb = stringIDToTypeID( "SaveForWeb" );  
    desc2.putObject( idUsng, idSaveForWeb, desc3 );  
executeAction( idExpr, desc2, DialogModes.NO );  
// =======================================================  
app.preferences.rulerUnits = originalRulerUnits;  
};  
  
  
saveForWeb(512,  352,  ""  )  
saveForWeb(1024, 704,  "_2")  
saveForWeb(2048, 1408, "_3")  