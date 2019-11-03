#target photoshop
#strict on
/**
* @@@BUILDINFO@@@ Golden Crop.jsx 0.93 Tue Aug 24 2010 20:15:04 GMT+0200
*/

/*****************************************
 * Golden crop script, v0.92a beta
 *
 * Copyright 2009-2010, Damian Sepczuk aka SzopeN <damian.sepczuk@o2.pl>
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */


/************************
 *     USER CONFIG      *
 ************************/


var debug = true;

// set to "en"   for English 
//        "pl"   for Polish (Polski)
//        "de"   for German (Deutsch)
//        "es"   for Spanish (Español)
//        "ru"   for Russian (Русский)
//        "it"   for Italian (Italiano)
//        "auto" to use Photoshop language
var lang = "auto";
/************************
 *  END OF USER CONFIG  *
 ************************/

















// ---------------------------------------------------------------------
/*
// BEGIN__HARVEST_EXCEPTION_ZSTRING
<javascriptresource>
    <name>$$$/SzopeNSoft/GoldenCrop/AppName=Golden Crop</name>
    <about>Golden Crop script v0.92a beta by Damian Sepczuk aka SzopeN

Copyright 2009, GNU GPL License

http://goldencrop.sourceforge.net
Thanks to:
 - Krystian for testing and giving ideas
 - Arkadius Bazior for German translation
 - Cristiano007 for Spanish translation
 - Vlad Kovnerov for Russian translation
 - Mantra Giovanni for Italian translation
</about>
    <menu>automate</menu>
    <enableinfo>true</enableinfo>
    <eventid>c4f6f3f7-1b93-47af-bab5-287c581c5fa8</eventid>
    <category>szopensoft</category>
    <terminology><![CDATA[<<
             /Version 1 
             /Events << 
               /c4f6f3f7-1b93-47af-bab5-287c581c5fa8 [($$$/SzopeNSoft/GoldenCrop/AppName=Golden Crop) /noDirectParam <<
                 /golden [($$$/SzopeNSoft/GoldenCrop/golden=Golden Rule) /boolean]
                 /roth [($$$/SzopeNSoft/GoldenCrop/roth=Rule of Thirds) /boolean]
                 /diagmethod [($$$/SzopeNSoft/GoldenCrop/diagmethod=Diagonal Method) /boolean]
                 /gtrianup [($$$/SzopeNSoft/GoldenCrop/gtrianup=Golden triangle upwards) /boolean]
                 /gtriandown [($$$/SzopeNSoft/GoldenCrop/gtriandown=Golden triangle downwards) /boolean]
                 /gspiralBL [($$$/SzopeNSoft/GoldenCrop/gspiralBL=Golden Spiral bottom-left) /boolean]
                 /gspiralTL [($$$/SzopeNSoft/GoldenCrop/gspiralTL=Golden Spiral top-left) /boolean]
                 /gspiralTR [($$$/SzopeNSoft/GoldenCrop/gspiralTR=Golden Spiral top-right) /boolean]
                 /gspiralBR [($$$/SzopeNSoft/GoldenCrop/gspiralBR=Golden Spiral bottom-right) /boolean]
                 /lthick    [($$$/SzopeNSoft/GoldenCrop/lthick=Line thickness) /double]
                 >>] 
              >> 
            >>]]></terminology>
</javascriptresource>
// END__HARVEST_EXCEPTION_ZSTRING
*/
// Some global configuration

$.localize = true;
if ( lang != "auto" )
    $.locale = lang;
$.level = debug?1:0;

const szAppName = "Golden Crop",
      szVersion = "0.92a beta";
const UUID = '2c910bcd-8e34-4779-a885-bb214df640a3';
// ---------------------------------------------------------------------
function localizator(secretNumber) {
    if ( secretNumber != 314159 ) {
        throw new Error('Do not construct localizator using new keyword. To get localizator objcet use localizator.getInstance() instead.');
    }
    this.use_locale = 'auto';
    $.localize = true;
    $.localization = true; // ?
    this.initStrings();
};

localizator.instance = null;

localizator.getInstance = function() {
    return localizator.instance || localizator.instance = new localizator(314159);
}

localizator.prototype.setLocale = function( locale ) {
    $.locale = locale;
}

localizator.prototype.initStrings = function() {
    var str = this.str = new Array();

    // Entries below were generated using localizator.loadCVSsaveAsJSCodeFile function
    str['chCropMethod'] = {en:'Choose crop style', pl:'Wybierz styl przycinania', de:'Wähle Schnittstil', es:'Escoja tipo de recorte', ru:'Вид кадрирования', it:'Scegli stile taglieria'};
    str['chCropMethodQ'] = {en:'Choose crop style', pl:'Wybierz styl przycinania', de:'Wähle Schnittstil', es:'Escoja tipo de recorte', ru:'Выберите вид кадрирования', it:'Scegli stile taglieria'};
    str['cropCanvas'] = {en:'Crop canvas (simple crop)', pl:'Przytnij płótno', de:'Arbeitsfläche aufteilen', es:'Recortar el lienzo', ru:'Обрезать холст', it:'Taglieria (Semplice taglieria)'};
    str['mkCropMask'] = {en:'Make crop mask', pl:'Stwórz maskę kadrującą', de:'Erstelle Schnittmaske', es:'Hacer máscara de recorte', ru:'Создать маску', it:'Crea maschera taglieria'};
    str['bgOnLayer'] = {en:'Background on layer', pl:'Tło na warstwie', de:'Hintergrund auf Ebene', es:'Fondo sobre capa', ru:'Фоновый слой', it:'Sfondo del livello'};
    str['bgFill'] = {en:'Background fill', pl:'Wypełnienie tła', de:'Hintergrund füllen', es:'Relleno de fondo', ru:'Фоновая заливка', it:'Riempimento sfondo'};
    str['-grid'] = {en:' - grid', pl:' - siatka', de:' - Rastern', es:'- grilla', ru:' - сетка', it:' - griglia'};
    str['-resize'] = {en:' - resize', pl:' - przeskalowanie', de:' - Skalieren', es:' - re-escalar', ru:' - размер', it:' - cambia dimensioni'};
    str['-reveal'] = {en:' - reveal', pl:' - rozszerzanie', de:' - Einblenden', es:' - revelar', ru:' - показ', it:' - rivela'};
    str['-crop'] = {en:' - crop', pl:' - przycinanie', de:' - Beschneiden', es:' - recortar', ru:' - обрезка', it:' - taglia'};
    str['GCbySzN'] = {en:'Golden Crop by SzopeN', pl:'Golden Crop by SzopeN', de:'Golden Crop by SzopeN', es:'Recorte Dorado por SzopeN', ru:'Golden Crop от SzopeN', it:'Taglieria d\'oro di SzopeN'};
    str['cropMask'] = {en:'Crop mask', pl:'Maska kadrująca', de:'Schnittmaske', es:'Máscara de recorte', ru:'Маска кадрирвания', it:'Mascheria taglieria'};
    str['divRules'] = {en:'Dividing rules', pl:'Reguły podziału', de:'Trennungsregeln', es:'Reglas de división', ru:'Правила разделения', it:'Regole della divisione'};
    str['stripAtPrc'] = {en:'Strip at %1%%', pl:'Paski na %1%%', de:'Linien auf %1%%', es:'Cinta al %1%%', ru:'Линии на %1%%', it:'Guida a %1%%'};
    str['goldenTriangleUp'] = {en:'Golden triangle upwards', pl:'Złoty trójkąt w górę', de:'Goldener Dreieck oben', es:'Triángulo dorado hacia arriba', ru:'Золотой треугольник вверх', it:'Triangolo d\'oro all\'insù'};
    str['goldenTriangleDown'] = {en:'Golden triangle downwards', pl:'Złoty trójkąt w dół', de:'Goldener Dreieck unten', es:'Triángulo dorado hacia abajo', ru:'Золотой треугольник вниз', it:'Triangolo d\'oro all\'ingiù'};
    str['diagonalMethod'] = {en:'Diagonal method', pl:'Metoda przekątnych', de:'Diagonale Methode', es:'Método Diagonal', ru:'Метод диагоналей', it:'Metodo Diagonale'};
    str['openB4Run'] = {en:'Open the document in which you want the script to run.', pl:'Otwórz dokument, w którym chcesz uruchomić ten skrypt.', de:'Öffne das Dokument, in dem das Script ablaufen soll.', es:'Abrir el documento en el cual quiere correr el script', ru:'Откройте файл, в котором вы хотели бы запустить скрипт.', it:'Apri il documento nel quale vuoi applicare lo script.'};
    str['canvExtDet'] = {en:'Canvas extension detected.', pl:'Wykryto rozszerzenie płótna.', de:'Erweiterung der Arbeitsfläche zeigen', es:'Extensión del lienzo detectada', ru:'Обнаружено увеличение холста', it:'Estensione quadro  trovato.'};
    str['canvExtDetQ'] = {en:'What to do with canvas?', pl:'Co mam zrobić z płótnem?', de:'Was mache ich mit der Arbeitsfläche?', es:'?Qué hacer con el lienzo?', ru:'Что следует предпринять?', it:'Cosa fare con il quatro?'};
    str['extendCanvas'] = {en:'Extend canvas', pl:'Rozszerz płótno', de:'Erweiterte Arbeitsfläche', es:'Extender el lienzo', ru:'Увеличить размеры', it:'Esteso quadro'};
    str['dontExtCanv'] = {en:'Crop without extension', pl:'Przytnij bez rozszerzania', de:'Schnitt ohne Erweiterung', es:'Recortar sin extensón', ru:'Обрезать без увеличения', it:'Taglia senza estensione'};
    str['retToCropping'] = {en:'Return to cropping', pl:'Wróć do kadrowania', de:'Zurück zum Schneiden', es:'Volver a recorte', ru:'Вернуться к кадрированию', it:'Torna alla taglieria'};
    str['chCompMethod'] = {en:'Composition method', pl:'Metoda kompozycji', de:'Kompositionsmethode', es:'Método de composición', ru:'Метод построения композиции', it:'Metodo di composizione'};
    str['chCompMethodQ'] = {en:'Choose composition guidelines', pl:'Wybierz metodę kompozycji', de:'Auswahl der Kompositionslinien', es:'Escoja guías de composición', ru:'Выберите тип направляющих линий', it:'Sciegli guide di composizione'};
    str['goldenRule'] = {en:'Golden Rule', pl:'Złoty podział', de:'Goldene Regel', es:'Regla Dorada', ru:'Золотое сечение', it:'Regola d\'oro'};
    str['ruleOfThirds'] = {en:'Rule of Thirds', pl:'Reguła trzech', de:'Drittel-Regel', es:'Regla de los Tercios', ru:'Правило третей', it:'Regola dei terzi'};
    str['goldenSpiralBL'] = {en:'Golden Spiral bottom-left', pl:'Złota spirala lewo-dół', de:'Goldene Spirale unten links', es:'Espiral Dorada abajo-izquierda', ru:'Золотая спираль внизу-слева', it:'Spirale d\'oro in basso a sinistra'};
    str['goldenSpiralTL'] = {en:'Golden Spiral top-left', pl:'Złota spirala lewo-góra', de:'Goldene Spirale oben links', es:'Espiral Dorada arriba-izquierda', ru:'Золотая спираль вверху-слева', it:'Spirale d\'oro in alto a sinistra'};
    str['goldenSpiralTR'] = {en:'Golden Spiral top-right', pl:'Złota spirala prawo-góra', de:'Goldene Spirale oben rechts', es:'Espiral Dorada arriba-derecha', ru:'Золотая спираль вверху-справа', it:'Spirale d\'oro in alto a destra'};
    str['goldenSpiralBR'] = {en:'Golden Spiral bottom-right', pl:'Złota spirala prawo-dół', de:'Goldene Spirale unten rechts', es:'Espiral Dorada abajo-derecha', ru:'Золотая спираль внизу-справа', it:'Spirale d\'oro in basso a destra'};
    str['goldenSpiral'] = {en:'Golden Spiral', pl:'Złota spirala', de:'Goldene Spirale', es:'Espiral Dorada', ru:'Золотая спираль', it:'Spirale d\'oro'};
    str['selectAll'] = {en:'Select All', pl:'Zaznacz wszystkie', de:'Alles Auswählen', es:'Seleccione Todo', ru:'Выбрать все', it:'Seleziona Tutto'};
    str['deselectAll'] = {en:'Deselect All', pl:'Odznacz wszystkie', de:'Nichts Auswählen', es:'Deseleccione Todo', ru:'Убрать все', it:'Deselezionare Tutto'};
    str['ok'] = {en:'OK', pl:'OK', de:'OK', es:'OK', ru:'OK', it:'OK'};
    str['cancel'] = {en:'Cancel', pl:'Anuluj', de:'Abbrechen', es:'Cancelar', ru:'Отмена', it:'cancellare'};
    str['allGoldenSpirals'] = {en:'All Golden Spirals', pl:'Wszystkie Złote Spirale', de:'Alle Goldenen Spiralen', es:'Todas las Espirales Doradas', ru:'Все золотые спирали', it:'Tutte le spirali d\'oro'};
    str['basicRules'] = {en:'Basic rules', pl:'Podstawowe podziały', de:'Grundregeln', es:'Reglas Básicas', ru:'Основные правила', it:'Regole fondamentali'};
    str['lineThickness'] = {en:'Line thickness', pl:'Grubość linii', de:'Liniendicke', es:'Grosor de línea', ru:'Толщина линий', it:'Grossezza guida'};
    str['lineThicknessProm'] = {en:'Line thickness (‰ of shorter edge): ', pl:'Grubość linii (‰ krótszego boku)', de:'Liniendicke (‰ kurze Seite)', es:'Grosor de línea (‰ del borde más corto)', ru:'Толщина линий (‰ меньшей стороны): ', it:'Grossezza guida (‰ di taglio più corto): '};
}

// Returns translations in CVS format
localizator.prototype.getCSVStrings = function() {
    var out = '';
    var availLangs = new Array();

    // get available languages
    out += 'AvailLangs'
    for ( var i in this.str ) {
        for ( var j in this.str[i] ) {
            if ( this.str[i][j] != '' && !availLangs[j] ) {
                availLangs[j] = j;
                out+=';'+j
            }
        }
    }
    out += "\n";
    
    // get all translations in the same order
    for ( var i in this.str ) {
        out += '"'+i+'"';
        for ( var j in availLangs ) {
            out += ';"'+(this.str[i][j]||'')+'"';
        }
        out += "\n"
    }
    
    return out;
}

localizator.prototype.saveAsCSVFile = function() {
    var of = File.saveDialog('Save as CSV file','CSV:*.csv');
    if (!of) return;
    try {
        of.open("w");
        if (!of) throw new Error("Can't open file for writing: " + of );
        of.write(this.getCSVStrings());
    } finally {
        of.close();
    }
}

localizator.getInitSequenceFromCSVSFile = function () {
    var input = File.openDialog("Select CSV file with translations", "CSV Comma Separated Values:*.csv,All files:*.*", false);
    if ( !input ) {
        return false;
    }
    if ( !input.open('r') ) {
        throw new Error("Can't open file for reading!");
    }

    var availLangs = input.readln().replace(/"/g,'').split(';');
    availLangs.shift();
    var out = "\n    // Entries below were generated using localizator.loadCVSsaveAsJSCodeFile function\n";
    var line = null;
    while ( line = input.readln() ) {
        var translations = new Array();
        var inText = false;
        var prevEndIdx = 0;
        var currentLangIndex = 0;
        for ( var i = 0; i<line.length; ++i )
        {
            var actChr = line[i];
            if ( inText ) {
                if ( actChr == '"' ) {
                    var nextChr = line[i+1];
                    if ( nextChr != '"' ) {
                        if ( nextChr != ';' && nextChr ) {
                            throw new Error("Malformed data!, line: " + line + " position: " + i);
                        } else {
                            // end of cell detected
                            translations.push(line.substring(prevEndIdx, i).replace(/""/g,'"'));
                            ++i; // skip ';' char
                            prevEndIdx = i+1;
                            inText = false;
                        }
                    } else {
                        // " char in quoted string
                        ++i;
                    }
                }
            } else {
                if ( actChr == '"' ) {
                    if ( i == prevEndIdx ) {
                        // start of quoted string
                        prevEndIdx = i+1;
                        inText = true;
                    } else {
                        // '"' char in the middle of non quoted text. It is an error, but do not throw
                    }
                } else  if ( actChr == ';' ) {
                    translations.push(line.substring(prevEndIdx, Math.max(i-1,prevEndIdx)));
                    // end of cell detected
                    prevEndIdx = i+1;
                }
            }
        }
        var engTranslFound = false;
        var trId = translations.shift();
        var numOfLangWritten = 0;
        out += "    str['" + trId + "'] = {";
        for ( var i = 0; i < availLangs.length && translations.length; ++i )
        {
            var t = translations.shift();
            if ( t.length != 0 ) {
                if (availLangs[i].search(/^en/) == 0 ) engTranslFound = true;
                out += (numOfLangWritten++?', ':'') + availLangs[i] + ":'" + t.replace(/\\/g,'\\\\').replace(/'/g,'\\\'') + "'";
            }
        }
        if (!engTranslFound) {
            throw new Error("No english translation found for: " + trId + ".\nEach string MUST have an english translation");
        }
        out += "};\n";
    }

    return out;
}

localizator.loadCVSsaveAsJSCodeFile = function() {
    var tmp = localizator.getInitSequenceFromCSVSFile();
    if ( tmp ) {
        var of = File.saveDialog('Save as JSX file','JSX:*.jsx');
        if (!of) return false;
        try {
            of.open("w");
            if (!of) throw new Error("Can't open file for writing: " + of );
            of.write(tmp);
        } finally {
            of.close();
        }
    }
}


localizator.prototype.get = function( id, otherParameters ) {
    arguments[0]=this.str[ id ];
    return localize.apply({},arguments);
}
// ---------------------------------------------------------------------
function dialogMenu( menuDesc ) {
    this.desc = menuDesc;
}

dialogMenu.prototype.show = function () {
    // helper function
    function _repeatString( str, n ) {
        var out = '';
        while ( n-- > 0) {
            out += str;
        }
        return out;
    }

    var menuDesc = this.desc;
    var elements = menuDesc.elements;
    var dlg = new Window('dialog', menuDesc.caption);
    dlg.preferredSize.width = 155;
    
    with (dlg)
    {
       orientation = 'column';
       alignChildren = 'fill';
       
       add('statictext', undefined, menuDesc.question);
       var maxCaptionLen = -Infinity;
       for ( var i = 0; i<elements.length; ++i ) {
           var capLen = elements[i].text.length + elements[i].key.length + 3;
           if ( capLen > maxCaptionLen ) maxCaptionLen = capLen;
        }

       for ( var i = 0; i<elements.length; ++i ) {
            var key = elements[i].key.toLowerCase();
            var btnName = (key == 'esc')?'cancel':((!!elements[i].def)?'ok':('op'+i));
            var caption = '['+(key=='esc'?'':'&')+elements[i].key+'] ' + elements[i].text;
            var capLen = caption.length + (key=='esc'?-1:0);
            var e = add('button', undefined, caption + _repeatString(' ', (maxCaptionLen-capLen)*1.4), {name: btnName, justify: 'left'});
            if ( key!='esc' && isCS5() ) e.shortcutKey = '~'; // CS5: use some dummy key to preserve underlined shotrcut letters AND prevent firing default shortcut action
            if ( btnName=='ok' || !!elements[i].def ) {
                defaultElement = e;
            }
            if (btnName=='cancel') {
                cancelElement = e;
            } else {
               e.onClick = new Function('this.parent.close('+(10+i+1)+')');
            }
            elements[i].obj = e;
       }
       if ( isCS5() ) {
           defaultElement.active = true; // def element isn't ficused in CS5
           var f = function (e) {
               for ( var i = 0; i<elements.length; ++i )
               {
                   if ( e.keyName == elements[i].key.toUpperCase() ) {
                       elements[i].obj.notify();
                       break;
                   }
               }
           }
           dlg.addEventListener('keydown', f, false); // Documentation doesn't mention that Window object implement keydown event. But it works, more or less... :)
       } else if ( isCS4() ) {
           addEventListener('keydown', function (e) {
               // Next funny thing about PS CS4
               // When user press 'Alt' to activate accelerators, no notify events are send despite calling notify() function
               // Most curious doing nothing (NOP) helps
               if (e.keyName!='Escape' && e.keyName!='Enter' && e.keyName!='Return') {
                   Stdlib.NOP();
               }
               for ( var i = 0; i<elements.length; ++i )
               {
                   if ( e.keyName == elements[i].key.toUpperCase() ) {
                       elements[i].obj.notify();
                       break;
                   }
               }
           }, false);
        } else {
           var edShcut = add('edittext', undefined, '...', {name: 'edShcut'});
           edShcut.active = true;
           edShcut.onChanging = function ()  {
               if ( edShcut.text == ' ' ) {
                   defaultElement.notify();
                   return;
               }
               var found = false;
                for ( var i = 0; i<elements.length; ++i )
                {
                    // $.writeln(edShcut.text.toUpperCase() + ' = ' + elements[i].key.toUpperCase());
                    if ( edShcut.text.toUpperCase() == elements[i].key.toUpperCase() ) {
                        elements[i].obj.notify();
                        found = true;
                        break;
                    }
                }
                edShcut.text = 'Press a key';
                edShcut.active = false; // on CS3 makes the event to occur one again, with

                if (isCS2() || !found) {
                    edShcut.active = true;  // edShcut.text == the single char last enetered (!)
                }
           }
        }
    }
    dlg.center();
    var result = dlg.show();
    if ( result < 10 ) {
        return false;
    } else {
        return result-11;
    }
}
// ---------------------------------------------------------------------

function dialogMenuMChoice( menuDesc ) {
    this.desc = menuDesc;
}

dialogMenuMChoice.prototype.construct = function (hasCustomControl) {
    // helper function
    function _repeatString( str, n ) {
        var out = '';
        while ( n-- > 0) {
            out += str;
        }
        return out;
    }

    var menuDesc = this.desc;
    
    var cbElements = this.cbElements = menuDesc.cbElements;
    var msElements = this.msElements = menuDesc.msElements;
    
    var dlg = this.dlg = new Window('dialog', menuDesc.caption);
    dlg.preferredSize.width = 155;
    var shortcutChar = '&';
    with (dlg)
    {
       orientation = 'column';
       alignChildren = 'fill';
       add('statictext', undefined, menuDesc.question);
       var g1 = add('group', undefined, {name: 'g1'});

       with (g1) {
           var g1_cb = add('group', undefined, undefined);
           with (g1_cb) {
               orientation = 'column';
               alignChildren = 'fill';

               for ( var i = 0; i<cbElements.length; ++i ) {
                    var key = cbElements[i].key.toLowerCase();
                    var cbName = 'op'+i;
                    var caption = '['+shortcutChar+cbElements[i].key+'] ' + cbElements[i].text;
                    var capLen = caption.length;
                    var e = add('checkbox', undefined, caption, {name: cbName});
                    if ( isCS5() ) e.shortcutKey = '~'; // CS5: use some dummy key to preserve underlined shotrcut letters AND prevent firing default shortcut action
                    e.value = !!cbElements[i].sel;
                    cbElements[i].obj = e;
               }
           }
          var g1_ms = add('group', undefined, undefined);
          with (g1_ms) {
               orientation = 'column';
               alignChildren = 'fill';

               // Compute max caption length
               var maxCaptionLen = -Infinity;
               // msElements.push //[?] this was some strange leftover
               for ( var i = 0; i<msElements.length; ++i ) {
                   var capLen = msElements[i].text.length + msElements[i].key.length + 3;
                   if ( capLen > maxCaptionLen ) maxCaptionLen = capLen;
                }

               for ( var i = 0; i<msElements.length; ++i ) {
                    var key = msElements[i].key.toLowerCase();
                    var btnName = 'op'+i;
                    //var caption = '[&'+msElements[i].key+'] ' + msElements[i].text;
                    var caption = msElements[i].text + ' ['+shortcutChar+msElements[i].key+']';
                    var capLen = caption.length;
                    //                                        \/ Try to align button's text to left (doesn't work with space, try some space-like chars)
                    var e = add('button', undefined, caption /*+ _repeatString(' ', (maxCaptionLen-capLen)*1.4)*/, {name: btnName});
                    if ( isCS5() ) e.shortcutKey = '~'; // CS5: use some dummy key to preserve underlined shotrcut letters AND prevent firing default shortcut action
                    e.elements = msElements[i].elements;
                    e.action = msElements[i].action;
                    e.onClick = function() {
                        switch ( this.action ) {
                            case 'slctAll':
                               for ( var i = 0; i<cbElements.length; ++i ) {
                                  if(!cbElements[i].obj.value) cbElements[i].obj.notify();
                               }
                               break;
                            case 'dslctAll':
                               for ( var i = 0; i<cbElements.length; ++i ) {
                                  if(cbElements[i].obj.value) cbElements[i].obj.notify();
                               }
                               break;
                            default:
                               if (this.elements) {
                                   for ( var i = 0; i<this.elements.length; ++i ) {
                                      cbElements[this.elements[i]].obj.notify();
                                   }
                               }
                               break;
                        }
                    }
                    msElements[i].obj = e;
               }
          }
       }
       if (hasCustomControl) {
           this.customControls = add('group', undefined, undefined, {name: 'customControls'});
       }
       var okBtn = add('button', undefined, this.desc.okTxt, {name: 'ok'});
       var cancelBtn = add('button', undefined, this.desc.cancelTxt, {name: 'cancel'});
       dlg.defaultElement = okBtn;
       dlg.cancelElement = cancelBtn;
       var allElements = cbElements.concat(msElements);
       
       if ( isCS5() ) {
           okBtn.active = true; // def element isn't ficused in CS5
           var f = function (e) {
               for ( var i = 0; i<allElements.length; ++i )
               {
                   if ( e.keyName == allElements[i].key.toUpperCase() ) {
                       allElements[i].obj.notify();
                       // allElements[i].obj.active = true; // [?] check default behaviour in other PS versions
                       break;
                   }
               }
           }
           dlg.addEventListener('keydown', f, false); // Documentation doesn't mention that Window object implement keydown event. But it works, more or less... :)
       } else if ( isCS4() ) {
           addEventListener('keydown', function (e) {
               // Next funny thing about PS CS4
               // When user press 'Alt' to activate accelerators, no notify events are send despite calling notify() function
               // Most curious doing nothing (NOP) helps
               if (e.keyName!='Escape' && e.keyName!='Enter' && e.keyName!='Return') {
                   Stdlib.NOP();
               }
               for ( var i = 0; i<allElements.length; ++i )
               {
                   if ( e.keyName == allElements[i].key.toUpperCase() ) {
                       allElements[i].obj.notify();
                       break;
                   }
               }
           }, false);
        } else {
           var edShcut = add('edittext', undefined, '...', {name: 'edShcut'});
           edShcut.active = true;
           edShcut.onChanging = function ()  {
               if ( edShcut.text == ' ' ) {
                   defaultElement.notify();
                   return;
               }
               var found = false;
                for ( var i = 0; i<allElements.length; ++i )
                {
                    //$.writeln(edShcut.text.toUpperCase() + ' = ' + allElements[i].key.toUpperCase());
                    if ( edShcut.text.toUpperCase() == allElements[i].key.toUpperCase() ) {
                        allElements[i].obj.notify();
                        found = true;
                        break;
                    }
                }
                edShcut.text = 'Press a key';
                edShcut.active = false; // on CS3 makes the event to occur one again, with

                if (isCS2() || !found) {
                    edShcut.active = true;  // edShcut.text == the single char last enetered (!)
                }
           }
        }
    }
}

dialogMenuMChoice.prototype.show = function () {
    var dlg = this.dlg;
    var cbElements = this.cbElements;
    dlg.center();
    var result = dlg.show();
    if ( result != 1 ) {
        return false;
    } else {
        result = [];
        for ( var i = 0; i<cbElements.length; ++i ) {
            result[i] = cbElements[i].obj.value;
        }
        return result;
    }
}
// ---------------------------------------------------------------------
function SimpleADUnserializer( ad )
{
    var obj = new Object();
    
    for ( var i=0; i<ad.count; ++i)
    {
        var key = ad.getKey(i);
         var fieldName = app.typeIDToStringID(key);
        switch ( ad.getType(key) )
        {
            case DescValueType.BOOLEANTYPE:
                obj[ fieldName ] = ad.getBoolean( key );
                break;
            case DescValueType.STRINGTYPE:
                obj[ fieldName ] = ad.getString( key );
                break;
            case DescValueType.DOUBLETYPE:
                obj[ fieldName ] = ad.getString( key );
                break;
            case DescValueType.RAWTYPE: // array
                obj[ fieldName ] = eval(ad.getData( key ));
                break;
            case DescValueType.OBJECTTYPE:
                obj[ fieldName ] = SimpleADUnserializer(ad.getObject( key ));
                break;
            case DescValueType.UNITDOUBLE:
            case DescValueType.INTEGERTYPE: // supported via double
            case DescValueType.ALIASTYPE:
            case DescValueType.CLASSTYPE:
            case DescValueType.ENUMERATEDTYPE:
            case DescValueType.LISTTYPE:
            case DescValueType.REFERENCETYPE:
                // unsupported types
                break;
        }
    }

    return obj;
}


function SimpleADSerializer( obj )
{
    isArray = function ( obj )
    {
        return obj.constructor.toString().indexOf('Array') != -1;
    }
    var ad = new ActionDescriptor();

    for ( var field in obj )
    {
        var ID = app.stringIDToTypeID(field);
        var val = obj[field];
        //var typeID = STTID(field.toString()); // represents field name
        switch (typeof val)
        {
            case "function":
                // we store only data
                break;
            case "undefined":
                ad.putData( ID, 'undefined');
                break;
            case "boolean":
                ad.putBoolean( ID,  val);
                break;
            case "number":
                ad.putDouble( ID,  val);
                break;
            case "string":
                ad.putString( ID,  val);
                break;
            case "object":
                if ( val == null )
                {
                    ad.putData( ID, 'null');
                }
                else if ( isArray( val ) )
                {
                    ad.putData( ID, SimpleJSONSerializer(val));
                }
                else
                {
                    ad.putObject( ID,  SimpleADSerializer(val));
                }
                break;
        }
    }
    return ad;
}

function SimpleJSONSerializer( obj )
{
    isArray = function ( obj )
    {
        return obj.constructor.toString().indexOf('Array') != -1;
    }

    var ret="";
    switch (typeof obj)
    {
        case "function":
            break;
        case "boolean":
        case "number":
            ret += obj;
            break;
        case "string":
            ret += '"'+obj.replace ('"', '\\"')+'"';
            break;
        case "undefined":
            ret += 'undefined'
            break;
        case "object":
            if ( obj == null )
            {
                ret += 'null'
            }
            else if (isArray(obj))
            {
                ret += '[';
                ret += SimpleJSONSerializer(obj[0]);
                for ( var i=1; i<obj.length; ++i )
                {
                    ret += ', ' + SimpleJSONSerializer(obj[i]);
                }
                ret += ']';
            }
            else
            {
                ret += '{';
                var isFirst = true;
                for ( var b in obj )
                {
                    if ( isFirst == true ) isFirst = false else ret += ', ';
                    ret += '"'+b+'": ' + SimpleJSONSerializer(obj[b]);
                }
                ret += '}';
            }
            break;
        default:
            break;
    }
    return ret;
}

// Configurator
configurator = function(paramsDesc, uuid) {
    this._init(paramsDesc);
    this.uuid = uuid;
    this.readFromPlayback = false;
    this.defaultsUsed     = true;
    this.isDisplayDialog  = DialogModes.ALL;
}

configurator.prototype.isRunFromAction = function() {
    return this.readFromPlayback;
}

configurator.prototype.get = function(id) {
    if (typeof this.params[id] == 'undefined') return/*throw new Error('No such property: ' + id)*/;
    return this.params[id].value;
}

configurator.prototype.set = function(id, val) {
    if (typeof this.params[id] == 'undefined') return/*throw new Error('No such property: ' + id)*/;
    var tmp = this.params[id].value;
    this.params[id].value = val;
    return tmp;
}

configurator.prototype.isDisplayNormalDialog = function() {
    return this.isDisplayDialog==DialogModes.ALL;
}

configurator.prototype.isDisplayErrorDialog = function() {
    return this.isDisplayDialog!=DialogModes.NO;
}

configurator.prototype.loadSettings = function() {
    var lvl = $.level;
    $.level = 0;
    try {
        // try to get global options
        var ad = app.getCustomOptions(this.uuid);        
        this._fromActionDescriptor(ad);
        this.defaultsUsed = false;
    }
    catch(e) {
        // no config, display dialog to get some
        this.defaultsUsed    = true;
    } finally {
        $.level = lvl;
    }

    // try to get options from action state
    if ( app.playbackParameters.count > 0 ){
        this._fromActionDescriptor(app.playbackParameters);
        this.readFromPlayback = true;
        this.defaultsUsed     = false;
        this.isDisplayDialog  = app.playbackDisplayDialogs;
    }

}
configurator.prototype.setMessage = function(msg) {
    this.msg = msg;
}
configurator.prototype.saveSettings = function() {
    var ad = this._toActionDescriptor();
    ad.putString( app.charIDToTypeID( 'Msge' ),  this.msg);
    app.playbackParameters = ad;
    if ( !this.readFromPlayback && isSC3plus() ) {
        app.putCustomOptions (this.uuid, ad, true);
    }
}

configurator.prototype._init = function(paramsDesc) {
    this.params = paramsDesc;
}

configurator.prototype._toActionDescriptor = function() {
    var nv = {};
    for ( var o in this.params) {
        nv[o]=this.get(o);
    }
    return SimpleADSerializer(nv);
}

configurator.prototype._fromActionDescriptor = function( ad ) {
    var nv = SimpleADUnserializer(ad);
    for ( var o in nv) {
        if (o != 'Msge' && o != 'message') { // CS3 and CS2 fix
            this.set(o, nv[o]);
        }
    }
}

configurator.prototype._debug_undefine_all_values = function() {
    for ( var o in this.params) {
        this.set(o, undefined);
    }
}

configurator.prototype.purgeSavedGlobals = function() {
    app.eraseCustomOptions(this.uuid);
}

configurator.prototype.debugPrint = function() {
    for ( var o in this.params) {
        $.writeln( o +' = "' + this.params[o].value + '" (' + typeof this.params[o].value + ')');
    }

    $.writeln('readFromPlayback: ' + this.readFromPlayback);
    $.writeln('defaultsUsed: ' + this.defaultsUsed);
}
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------

function GoldenCrop( _doc ) {
    this.doc = _doc;
    Stdlib.saveLayer = false;
    Stdlib.saveDoc = false;
};

/*
 * Basic configuration. In further versions it ill be user-interactive and action-recordable.
 */
GoldenCrop.prototype.loadConfig = function() {
    var paramsID = {golden:{value:true, desc:'goldenRule'},
                    roth:{value:true, desc:'ruleOfThirds'},
                    diagmethod:{value:true, desc:'diagonalMethod'},
                    gtrianup:{value:true, desc:'goldenTriangleUp'},
                    gtriandown:{value:false, desc:'goldenTriangleDown'},
                    gspiralBL:{value:false, desc:'goldenSpiralBL'},
                    gspiralTL:{value:false, desc:'goldenSpiralTL'},
                    gspiralTR:{value:false, desc:'goldenSpiralTR'},
                    gspiralBR:{value:false, desc:'goldenSpiralBR'},
                    lthick:{value:5, desc:'lineThickness'}
                    /*{value:'', desc:''},*/
                    };
    this.conf = new configurator(paramsID, UUID);
    this.conf.loadSettings();

    this.guidelines = {golden: {create: this.conf.get('golden')}, // history relict, to be integrated with config and dialog
                         roth: {create: this.conf.get('roth')},
                   diagmethod: {create: this.conf.get('diagmethod')},
                     gtrianup: {create: this.conf.get('gtrianup')},
                   gtriandown: {create: this.conf.get('gtriandown')},
                    gspiralBL: {create: this.conf.get('gspiralBL')},
                    gspiralTL: {create: this.conf.get('gspiralTL')},
                    gspiralTR: {create: this.conf.get('gspiralTR')},
                    gspiralBR: {create: this.conf.get('gspiralBR')}};
                    
    this.ifApplyFX = true;
    this.ifSuspendHistory = true && isSC3plus();
    this.loc = localizator.getInstance();
    this.conf.setMessage(this.loc.get('GCbySzN'));
}

/*
 * Create horizontal and vertical strips ("checkerboard" with 9 fields)
 *   [in] position  | from range (0.0, 1.0)  - how distanced strips from image edges shoud be
 *   [in] stripSize | from range (0.0, 1.0)  - how thick single strip should be
 *   [in] color     | instance of SolidColor - fill color of the strip
 *
 * Returns: instance of ArtLayer (color fill) -- object representing fill layer with vector mask
 *                                               with strips
 * 
 * Adds a pair of vertical and horizontal strips (lines) using Solid Color fill layer and vector mask.
 *
 * Each of four lines is situated at position*100% from image borders. For example, suppose that image
 * dimentions are (width, height)=(800,600) and position=1/3 (which is ca. 33.33%). Horizontal lines will
 * be added is such position that their center would be on 600*(1/3)=200 and 600*(1-(1/3))=600*(2/3)=400
 * pixel accordingly. Vertical lines: 800*1/3=266.66 and 800*2/3=533.33 pixel (fractial pixel value is 
 * possible when using vectors).
 *
 * Line thickness is calculated as stripSize*100% of shorter image edge. For example, suppose that image
 * dimentions are (width, height)=(800,600) and stripSize=0.012 (which is 1.2%) Then both horisontal
 * and vertical lines thickness is min(800,600)*0.012=600*0.012=7.2px. Nothe that strip WILL be at least 1px
 * thick, even if computed thickness is lower than 1px.
 */
GoldenCrop.prototype.makeStrips = function( position, stripSizePrc, color ) {
    const oneMinusPosition = 1 - position;
    const docWidth  = this.docW,
          docHeight = this.docH;
    const stripSize = Math.max(1,Math.min(docWidth, docHeight) * stripSizePrc);
    var paths = [];
    // add horizontal strips
    var tmp = docHeight*position;
    paths.push(Stdlib.createSubPath(Stdlib.linePathAPI(0,tmp,docWidth,tmp,stripSize)));
    tmp = docHeight*oneMinusPosition;
    paths.push(Stdlib.createSubPath(Stdlib.linePathAPI(0,tmp,docWidth,tmp,stripSize)));

    // add vertical strips
    tmp = docWidth*position;
    paths.push(Stdlib.createSubPath(Stdlib.linePathAPI(tmp,0,tmp,docHeight,stripSize)));
    tmp = docWidth*oneMinusPosition;
    paths.push(Stdlib.createSubPath(Stdlib.linePathAPI(tmp,0,tmp,docHeight,stripSize)));
    var GSPath = this.doc.pathItems.add('', paths);    
    var StripLayer = Stdlib.createSolidFillLayer(undefined, color, this.loc.get('stripAtPrc', Math.round(position*100)) );    
    GSPath.remove();
    
    return StripLayer;
}



/*
 * Create diagonal strip with perpendicular strips connecting it to other two corners (Golden Triangle)
 *   [in] direction | true  - line going form bottom left to top right (upwards)
 *                    false - line going form top left to bottom right (downwards)
 *   [in] stripSize | from range (0.0, 1.0)  - how thick single strip should be
 *   [in] color     | instance of SolidColor - fill color of the strip
 *
 * Returns: instance of ArtLayer (color fill) -- object representing fill layer with vector mask
 *                                               with diagonal strips
 * 
 * Adds three strips (lines) using Solid Color fill layer and vector mask. First one is connecting 
 * oposite corners. Other two are connecting first strip to the other two corners. Lines 1,2 and 1,3
 * are perpendicular.
 *
 * Line thickness is calculated as stripSize*100% of shorter image edge. For example, suppose that image
 * dimentions are (width, height)=(800,600) and stripSize=0.012 (which is 1.2%) Then both horisontal
 * and vertical lines thickness is min(800,600)*0.012=600*0.012=7.2px. Nothe that strip WILL be at least 1px
 * thick, even if computed thickness is lower than 1px.
 */
GoldenCrop.prototype.makeGoldenTriangle = function( direction, stripSize, color ) {
    const docWidth  = this.docW,
          docHeight = this.docH;
    const stripSizePx = Math.max(1,Math.min(docWidth, docHeight) * stripSize);

    var w = docWidth,
        h = docHeight;
    var paths = [];
    if (direction) {
        // left-2-right
        paths.push(Stdlib.createSubPath(Stdlib.linePathAPI(0, h, w, 0, stripSizePx)));
        var x = h/((w/h)+(h/w)),
            y = (w/h)*x;
        paths.push(Stdlib.createSubPath(Stdlib.linePathAPI(0, 0, x, y, stripSizePx)));
            x = (w*(w/h))/((w/h)+(h/w)),
            y = (-h/w)*x + h;
        paths.push(Stdlib.createSubPath(Stdlib.linePathAPI(x, y, w, h, stripSizePx)));
    } else {
        // right-2-left
        paths.push(Stdlib.createSubPath(Stdlib.linePathAPI(0, 0, w, h, stripSizePx)));
        var x = (h/((w/h)+(h/w))),
            y = (w/h)*x;
            x=w-x;
        paths.push(Stdlib.createSubPath(Stdlib.linePathAPI(w, 0, x, y, stripSizePx)));
            x = (w*(w/h))/((w/h)+(h/w)),
            y = (-h/w)*x + h;
            x=w-x;
        paths.push(Stdlib.createSubPath(Stdlib.linePathAPI(x, y, 0, h, stripSizePx)));
    }
    /* 
        Normalize -- make sure that whole path is contained by image frame (esp. corner problem)    
        
               / \
              /---\---- - part of diagonal line is outside of image frame
              \|   \
               \    \
               |\
    */
    paths.push(Stdlib.createSubPath(Stdlib.linePathAPI(0,docHeight/2,docWidth,docHeight/2,docHeight), true, ShapeOperation.SHAPEINTERSECT));    
    var GSPath = this.doc.pathItems.add('', paths);
    var layer = Stdlib.createSolidFillLayer(undefined, color, this.loc.get( direction?'goldenTriangleUp':'goldenTriangleDown') );
    GSPath.remove();

    return layer;
}

GoldenCrop.prototype.makeDiagonalMethod = function( stripSizePrc, color ) {
    var paths = [];
    const docWidth  = this.docW,
          docHeight = this.docH;
    const stripSizePx = Math.max(1,Math.min(docWidth, docHeight) * stripSizePrc);;
    var minWH = Math.min(docWidth,docHeight);

    paths.push(Stdlib.createSubPath(Stdlib.linePathAPI(0,0,minWH,minWH,stripSizePx)));
    paths.push(Stdlib.createSubPath(Stdlib.linePathAPI(docWidth-minWH,docHeight-minWH,docWidth,docHeight,stripSizePx)));
    paths.push(Stdlib.createSubPath(Stdlib.linePathAPI(0,minWH,minWH,0,stripSizePx)));
    paths.push(Stdlib.createSubPath(Stdlib.linePathAPI(docWidth-minWH,docHeight,docWidth,docHeight-minWH,stripSizePx)));
    
    // normalize, see: makeGoldenTriangle
    paths.push(Stdlib.createSubPath(Stdlib.linePathAPI(0,docHeight/2,docWidth,docHeight/2,docHeight), true, ShapeOperation.SHAPEINTERSECT));
    
    var GSPath = this.doc.pathItems.add('', paths);
    var layer = Stdlib.createSolidFillLayer(undefined, color, this.loc.get('diagonalMethod') );
    GSPath.remove();

    return layer;
}

GoldenCrop.prototype.createGoldenSpiralPath = function(numOfTurns, offset, w, h, startX, startY) {
    // Default values
    if (!w) w = this.docW;
    if (!h) h = this.docH;
    if (!startX) startX = 0;
    if (!startY) startY = h;
    if (!offset) offset = 0;
    if (!numOfTurns) numOfTurns = (offset>0)?Infinity:5;
    
    // Frequently used constants
    const           k = (4*(Math.sqrt(2)-1))/3; // kappa, used to draw bezier ellipse section
    const         phi = 2/(1+Math.sqrt(5));     // phi, inverse of golden ratio
    const        phi2 = phi*phi;                // phi square
    const oneMinusPhi = 1-phi;                  // 1-phi
    
    // <=CS4; patth points coordinates must be given in current DIP (!), for example
    //        72dpi: 1 path 'pixel' => 1 image pixel
    //       300pdi: 1 path 'pixel' => 300/72 image pixels
    var DPIFix = 72/this.doc.resolution; 
    offset *= DPIFix; w *= DPIFix; h *= DPIFix; startX *= DPIFix; startY *= DPIFix;
    
    // Create initial point
    var points = [Stdlib.createPathPoint([startX+offset,startY])];
    var i=0;
    for (; i<numOfTurns; ++i)
    {
        var startPoint = points[points.length-1];
        // coordinates of starting point w/o offset
        var x = startPoint.anchor[0]-offset,
            y = startPoint.anchor[1];
        // coordinates of current segment points
        var pA = [x+offset,y];
        var pB = [x+phi*w, y-h+offset];
        var pC = [x+w-offset, y-oneMinusPhi*h];
        var pD = [x+(oneMinusPhi+phi2)*w, y-offset];
        var pE = [x+phi*w+offset, y-oneMinusPhi*phi*h];
        // compute distances
        var dAB = [pB[0]-pA[0],pA[1]-pB[1]];
        var dBC = [pC[0]-pB[0],pC[1]-pB[1]];
        var dCD = [pC[0]-pD[0],pD[1]-pC[1]];
        var dDE = [pD[0]-pE[0],pD[1]-pE[1]];
        
        // minimal offsets in both directions whith which the curve could be drawn
        if ( Math.min(dDE[0], dDE[1]) < 0 ) {
            
            if ( dAB[0] < 0 ) pA[0] = startPoint.anchor[0] -= offset - (offset+dAB[0])*0.7;
            if ( dBC[1] < 0 ) pB[1] -=offset - (offset+dBC[1])*0.7;
            if ( dCD[0] < 0 ) pC[0] +=offset - (offset+dCD[0])*0.7;
            if ( dDE[1] < 0 ) pD[1] +=offset - (offset+dDE[1])*0.7;
            if ( dDE[0] < 0 ) pE[0] -=offset - (offset+dDE[0])*0.7;

            // recompute distances
            dAB = [pB[0]-pA[0],pA[1]-pB[1]];
            dBC = [pC[0]-pB[0],pC[1]-pB[1]];
            dCD = [pC[0]-pD[0],pD[1]-pC[1]];
            dDE = [pD[0]-pE[0],pD[1]-pE[1]];
            numOfTurns=0;
        }
    
        // correct first point's handle
        startPoint.leftDirection = [pA[0], y-k*dAB[1]];
        startPoint.rightDirection[0] = pA[0];
        
        // add points with handles
        points.push(Stdlib.createPathPoint(pB,[pB[0]+k*dBC[0],pB[1]],[pB[0]-k*dAB[0],pB[1]]));
        points.push(Stdlib.createPathPoint(pC,[pC[0],pC[1]+k*dCD[1]],[pC[0],pC[1]-k*dBC[1]]));
        points.push(Stdlib.createPathPoint(pD,[pD[0]-k*dDE[0],pD[1]],[pD[0]+k*dCD[0],pD[1]]));
        points.push(Stdlib.createPathPoint(pE,undefined,[pE[0],pE[1]+k*dDE[1]]));
        
        w = dDE[0]+offset;   // width of NEXT segment
        h = pE[1]-pC[1];  // height of NEXT segment
    }
    return {points:points, cTurns:i};
}

GoldenCrop.prototype.makeGoldenSpiral = function( orientation, stripSizePrc, color ) {
    const docWidth  = this.docW,
          docHeight = this.docH;
    const stripSize = Math.max(1,Math.min(docWidth, docHeight) * stripSizePrc);
    
    var offsetPath = this.createGoldenSpiralPath(false, stripSize);
    var normalPath = this.createGoldenSpiralPath(offsetPath.cTurns);
    
    var fillPath = offsetPath.points;
    for (var i=0; i<normalPath.points.length; ++i) {
        var tmp = normalPath.points[i].leftDirection
        normalPath.points[i].leftDirection = normalPath.points[i].rightDirection;
        normalPath.points[i].rightDirection = tmp;
    }
    fillPath = fillPath.concat(normalPath.points.reverse());
    var spi = new SubPathInfo();
    spi.closed = true;
    spi.operation = ShapeOperation.SHAPEADD;
    spi.entireSubPath = fillPath;

    var GSPath = this.doc.pathItems.add('', [spi]);
    switch (orientation) {
        case 1:
            Stdlib.flipPath(0,1);
            break;
        case 2:
            Stdlib.flipPath(1,1);
            break;
        case 3:
            Stdlib.flipPath(1,0);
            break;
    }
    var SpiralLayer = Stdlib.createSolidFillLayer(undefined, color, this.loc.get('goldenSpiral') );
    GSPath.remove();
}

/*
 * Applies "strip" layer styles (drop shadow) on active layer
 * Returns: void
 * Spetialized function for srtip effect.. Stripped out default values.
 */
GoldenCrop.prototype.applyStripFX = function() {
var id11 = cTID( "setd" );
    var desc5 = new ActionDescriptor();
    var id12 = cTID( "null" );
        var ref3 = new ActionReference();
        ref3.putProperty( cTID( "Prpr" ),  cTID( "Lefx" ));
        ref3.putEnumerated( cTID( "Lyr " ), cTID( "Ordn" ), cTID( "Trgt" ) );
    desc5.putReference( id12, ref3 );
    var id18 = cTID( "T   " );
        var desc6 = new ActionDescriptor();
        var idFrFX = cTID( "FrFX" );
            var desc33 = new ActionDescriptor();
            desc33.putEnumerated( cTID( "Styl" ), cTID( "FStl" ), cTID( "OutF" ) );
            desc33.putUnitDouble( cTID( "Sz  " ), cTID( "#Pxl" ), this.strokeWidth );
                var desc34 = new ActionDescriptor();
                desc34.putDouble( cTID( "Rd  " ), 255.000000 );
                desc34.putDouble( cTID( "Grn " ), 255.000000 );
                desc34.putDouble( cTID( "Bl  " ), 255.000000 );
            desc33.putObject( cTID( "Clr " ), cTID( "RGBC" ), desc34 );
        desc6.putObject( idFrFX, cTID( "FrFX" ), desc33 );
    /*
        var id21 = cTID( "DrSh" );
            var desc7 = new ActionDescriptor();
            desc7.putBoolean( cTID( "enab" ), true );
            desc7.putEnumerated( cTID( "Md  " ), cTID( "BlnM" ), cTID( "Scrn" ) );
            var id26 = cTID( "Clr " );
                var desc8 = new ActionDescriptor();
                desc8.putDouble( cTID( "Rd  " ), 255 );
                desc8.putDouble( cTID( "Grn " ), 255 );
                desc8.putDouble( cTID( "Bl  " ), 255 );
            desc7.putObject( id26, cTID( "RGBC" ), desc8 );
            desc7.putBoolean( cTID( "uglg" ), false );
            desc7.putUnitDouble( cTID( "Dstn" ), cTID( "#Pxl" ), 0 );
            desc7.putUnitDouble( cTID( "Ckmt" ), cTID( "#Pxl" ), 0 );
            desc7.putUnitDouble( cTID( "blur" ), cTID( "#Pxl" ), 3 );
        desc6.putObject( id21, cTID( "DrSh" ), desc7 );*/
    desc5.putObject( id18, cTID( "Lefx" ), desc6 );
executeAction( id11, desc5, DialogModes.NO );
}


/*
 * Creates grid of dividing lines: one-third rule, golden rule, golden triangles (both diagonals), golden diagonal rule
 * [*] denotes optional parameter
 *   [in][*] basicStripSize | from range (0.0, 1.0) -- basic thickness of a strip (as part of shorter edge)
 *   [in][*] maskOpacity    | integer from range [0,100] -- opacity of mask (hiding outside of selected display frame)
 *   [in][*] colors         | Array of instances of SolidColor -- colors of mask and strips (for each dividing rule)
 *   [in][*] stripsThickScale | Array of doubles -- the multiple of basic thickness (for each dividing rule)
 * 
 * basicStripSize -- default value: 0.01 (1%)
 * maskOpacity -- default value: 70
 * colors -- default value: mask color: #000
 *                          golden rule: #000
 *                          one-third rule: #333
 *                          golden triangle rule (up): #F00
 *                          golden triangle rule (down): #00F
 * stripsThickScale -- default value: 
 *                          golden rule: 1
 *                          one-third rule: 1/2
 *                          golden triangle rule (all): 1/3
 *                          golden spiral (all): 1/3
 * Returns: void
 * TODO: move parameters to user config
 */
GoldenCrop.prototype.makeGrid = function(basicStripSize, maskOpacity, colors, stripsThickScale) {
    if (!basicStripSize) {
        basicStripSize = Math.round(this.conf.get('lthick'))/1000;
    }
    if (!maskOpacity) {
        maskOpacity = 70;
    }
    if (!colors) {
        colors = [Stdlib.createRGBColor(0,0,0),
                 Stdlib.createRGBColor(0,0,0),
                 Stdlib.createRGBColor(0x33,0x33,0x33),
                 Stdlib.createRGBColor(0x11,0x11,0x11),
                 Stdlib.createRGBColor(255,0,0), Stdlib.createRGBColor(0,0,255),
                  Stdlib.createRGBColor(0,255,255), Stdlib.createRGBColor(255,0,255),Stdlib.createRGBColor(255,255,0), Stdlib.createRGBColor(128,128,255)];
    }
    if (!stripsThickScale) {
        stripsThickScale = [1, 1, 1, 1/2, 1/2];
    }
    const docWidth  = this.docW,
          docHeight = this.docH;
    const stripSizePx = Math.max(1,Math.min(docWidth, docHeight) * basicStripSize);
    this.strokeWidth = Math.max(1,(stripSizePx)/16);
    
    this.gCrop = Stdlib.createLayerGroup(this.loc.get('GCbySzN'));
    Stdlib.moveToFront();
    
    // Add crop-mask
    this.cropMask = Stdlib.createSolidFillLayer(undefined, colors[0], this.loc.get('cropMask'), maskOpacity);
    Stdlib.removeLayerMask();
    Stdlib.addVectorMask(true);
    Stdlib.rectPath( ShapeOperation.SHAPESUBTRACT, Units.PERCENT, 0,0,100,100);
    
    // Add dividing rules
    var anyGuidelines = false;
    for ( gline in this.guidelines ) {
        anyGuidelines |= this.guidelines[gline].create;
    }
    if (anyGuidelines) {
        this.gCropDivRules = Stdlib.createLayerGroup(this.loc.get('divRules'), 75);
        
        // ----- Golden rule
        if (this.guidelines.golden.create) {
            const phi = (Math.sqrt(5)-1)/2; // Inv Golden number, ca. 0.6180339887498948482045868343656
            this.guidelines.golden.layer = this.makeStrips(phi, basicStripSize*stripsThickScale[0], colors[1]);
            if (this.ifApplyFX) this.applyStripFX();
        }
        
        // ----- One-third rule
        if (this.guidelines.roth.create) {
            const third = 1.0/3;
            this.guidelines.roth.layer = this.makeStrips(third, basicStripSize*stripsThickScale[1], colors[2]);
            if (this.ifApplyFX) this.applyStripFX();
        }
    
        // ----- Diagonal method
        if (this.guidelines.diagmethod.create) {
            this.guidelines.diagmethod.layer = this.makeDiagonalMethod(basicStripSize*stripsThickScale[2], colors[3]);
            if (this.ifApplyFX) this.applyStripFX();
        }
        
        // ----- Golden triangle rule (up)
        if (this.guidelines.gtrianup.create) {
            this.guidelines.gtrianup.layer = this.makeGoldenTriangle(true, basicStripSize*stripsThickScale[3], colors[4]);
            if (this.ifApplyFX) this.applyStripFX();
        }
    
        // ----- Golden triangle rule (down)
        if (this.guidelines.gtriandown.create) {
            this.guidelines.gtriandown.layer = this.makeGoldenTriangle(false, basicStripSize*stripsThickScale[3], colors[5]);
            if (this.ifApplyFX) this.applyStripFX();
        }

        // ----- Golden spiral (starts at bottom-left)
        if (this.guidelines.gspiralBL.create) {
            this.guidelines.gspiralBL.layer = this.makeGoldenSpiral(0, basicStripSize*stripsThickScale[4], colors[6]);
            if (this.ifApplyFX) this.applyStripFX();
        }
    
        // ----- Golden spiral (starts at bottom-left)
        if (this.guidelines.gspiralTL.create) {
            this.guidelines.gspiralTL.layer = this.makeGoldenSpiral(1, basicStripSize*stripsThickScale[4], colors[7]);
            if (this.ifApplyFX) this.applyStripFX();
        }
            
        // ----- Golden spiral (starts at bottom-left)
        if (this.guidelines.gspiralTR.create) {
            this.guidelines.gspiralTR.layer = this.makeGoldenSpiral(2, basicStripSize*stripsThickScale[4], colors[8]);
            if (this.ifApplyFX) this.applyStripFX();
        }
            
        // ----- Golden spiral (starts at bottom-left)
        if (this.guidelines.gspiralBR.create) {
            this.guidelines.gspiralBR.layer = this.makeGoldenSpiral(3, basicStripSize*stripsThickScale[4], colors[9]);
            if (this.ifApplyFX) this.applyStripFX();
        }
    } else {
        this.addBogusLayer();
    }
}

GoldenCrop.prototype.addBogusLayer = function() {
    this.bogusLayer = this.makeStrips(.5, 1, Stdlib.createRGBColor(0, 0, 0));
    this.doc.activeLayer.opacity=0;
}
/*
 * Activate user-interactive free transform mode and check results.
 * *** BLOCKING FUNCTION ***
 * Returns: void
 * If the user accepted the transformation -- ask user to choose crop method
 * If the user cancelled the transformation -- do not crop but keep all created layers
 */
GoldenCrop.prototype.freeTransform = function() {
    throw new Error('deprecated');
}

/*
 * Crops canvas and deletes all Golden Crop layers
 */
GoldenCrop.prototype.simpleCrop = function() {
    // TODO get selection bounds from this.croppingBounds
    var b = this.cropBounds;
    Stdlib.selectRect(b[1],b[0],b[3],b[2]);
    executeAction( cTID( "Crop" ), new ActionDescriptor(), DialogModes.NO );
    this.doc.selection.deselect();
    this.gCrop.remove();
}

/*
 * Make cropping mask non-transparent and make active and hide Dividing Rules group
 */
GoldenCrop.prototype.maskOutCrop = function() {
    this.cropMask.opacity = 100;
    if (this.gCropDivRules) {
        this.doc.activeLayer = this.gCropDivRules;
        this.doc.activeLayer.visible = false
    }
}

/*
 * Display user-interactive menu allowing to choose cropping method.
 * Cropping methods are member functions of GoldenCrop object instance
 */
GoldenCrop.prototype.chooseCropMethod = function() {
    var menuDesc = {caption:this.loc.get('chCropMethod'),
                question:this.loc.get('chCropMethodQ'),
                elements:[{key:'1', text:this.loc.get('cropCanvas'), def:true},
                          {key:'2', text:this.loc.get('mkCropMask')},
                          {key:'Esc', text:this.loc.get('cancel')}
                         ]
               };
    
    var dlg = new dialogMenu(menuDesc);
    var result = dlg.show();
    switch ( result ) {
        case 0:
            return 'SIMPLE';
        case 1:
            return 'MASK';
        case false:
        default:
            return 0;
    }
}

/*
 * Convert background to normal layer and place solid fill layer below it.
 * Color of the solid fill layer is determined by current foreground color
 */
GoldenCrop.prototype.doPopBackground = function() {
    if ( this.backgroundPopped || !Stdlib.hasBackground( this.doc ) ) return;
    this.backgroundPopped = true;
     
    if ( Stdlib.hasBackground(this.doc) ) {
        this.bgLayer = this.doc.backgroundLayer;
        this.bgLayer.isBackgroundLayer = false;
        this.bgLayer.name = this.loc.get('bgOnLayer');
    }
    this.backgroundFill = Stdlib.createSolidFillLayer(undefined, app.foregroundColor, this.loc.get('bgFill'));
    Stdlib.removeLayerMask();
    this.backgroundFill.move(this.bgLayer||this.doc.layers[this.doc.layers.length-1], ElementPlacement.PLACEAFTER);
}

/*
 * Change canvas size to match crop mask boundaries
 * Convert background to normal layer and place solid fill layer below it.
 * Color of the solid fill layer is determined by current foreground color
 */
GoldenCrop.prototype.doRevealPopBackround = function() {
    var docW = this.docW,
        docH = this.docH;
    var cb = this.cropBounds;
    
    var addTop    = Math.max(-cb[1],0),
        addLeft   = Math.max(-cb[0],0),
        addBottom = Math.max(cb[3]-docH,0),
        addRight  = Math.max(cb[2]-docW,0);
        
    if (this.popBackground) {
        this.doPopBackground();
    }
    
    this.doc.resizeCanvas(new UnitValue(docW+addLeft,"px"),new UnitValue(docH+addTop,"px"),AnchorPosition.BOTTOMRIGHT);
    this.doc.resizeCanvas(new UnitValue(docW+addLeft+addRight,"px"),new UnitValue(docH+addTop+addBottom,"px"),AnchorPosition.TOPLEFT);

    // if there is no cropping hide whole Golden Crop group
    if ( !this.cropMethod ) {
        this.doc.activeLayer = this.gCrop;
        this.doc.activeLayer.visible = false;
        // this.cropMask.remove();
    }
}

GoldenCrop.prototype.doRotateCanvas = function() {
    if ( this.popBackground ) {
        this.doPopBackground();
    }
    var angle = this.rotateCanvasA;
    if ( angle > 45 ) {
        angle-=90;
    } else if (angle < -45 ) {
        angle+=90;
    }
    Stdlib.rotateCannvas(angle);
    // update cropping bounds and document dimentions
    this.cropBounds = Stdlib.getVectorMaskBounds_cornerPointsOnly(true, this.doc, this.cropMask);         
    this.docW = parseInt(this.doc.width.as("px")),
    this.docH = parseInt(this.doc.height.as("px"));
    // $.writeln('################# after rotate');
    // $.writeln('docW:' +this.docW);
    // $.writeln('docH:' +this.docH);
}



/*
 * Determine if revealing occures and display user-interactive menu allowing to choose whether to extend canvas.
 * Check if there is also cropping and set this.onlyReveal accordingly.
 * Revealing methods are member functions of GoldenCrop object instance.
 */
GoldenCrop.prototype.chooseRevealAction = function() {
    var cb = this.cropBounds;
    var docW = this.docW,
        docH = this.docW;
          

        // choose whether extend canvas before cropping
        var menuDesc = {caption:this.loc.get('canvExtDet'), //Canvas extension detected.
            question:this.loc.get('canvExtDetQ'), //What to do with canvas?
            elements:[{key:'A', text:this.loc.get('extendCanvas'), def:true}, // Extend canvas
                      {key:'Z', text:this.loc.get('dontExtCanv')}, // Crop without extension
                      {key:'Esc', text:this.loc.get('retToCropping')} // Return to cropping
                     ]
           };

        var dlg = new dialogMenu(menuDesc);
        var result = dlg.show();
        switch ( result ) {
            case 0:
                return('EXTCANVAS')
                break;
            case 1:
                return false; // Don't ctop
                break;
            case false:
            default:
                return 0; // Return to cropping
                break;
        }
}

GoldenCrop.prototype.findMainGCGroup = function () {
    var mainGCGroupName = this.loc.get('GCbySzN');
    var layer = this.doc.activeLayer

    var isGCMG = function( layer ) {
            return layer.typename == 'LayerSet' && layer.name == mainGCGroupName;
        }
    // We have the layer active or we are somwhere inside the main group
    do {
        if ( isGCMG( layer ) )
            return layer;
        layer = layer.parent;
    } while ( layer.typename != 'Document' )
    
    // GC Main Group is at the top of the layer stack
    layer = this.doc.layers[0];
    if ( isGCMG(layer) ) {
        return layer;
    }
    
    // there's no Golden Crop
    return false;
}

GoldenCrop.prototype.findCropMaskAndDivRules = function ( mainGCGroup ) {
    var toFind=2;
    var layers = {cropMask: undefined, divRules: undefined};
    var szCropMask = this.loc.get('cropMask'),
        szDivRules = this.loc.get('divRules');
    for ( var i = mainGCGroup.layers.length-1; i>=0 && toFind; --i ) {
        var layer = mainGCGroup.layers[i];
        if ( layer.kind == LayerKind.SOLIDFILL && layer.name == szCropMask) {
            layers.cropMask = layer;
            --toFind;
        } else if ( layer.typename == 'LayerSet' && layer.name == szDivRules) {
            layers.divRules = layer;
            --toFind;
        }
    }
    return layers.cropMask?layers:false;
}

GoldenCrop.prototype.restoreUserGCGroupSettings = function () {
    if (this.skipGridCreation) {
       this.cropMask.opacity = this.userSettings.cropMask[1];
       this.cropMask.visible = this.userSettings.cropMask[0];
       if ( this.gCropDivRules ) {
           this.gCropDivRules.opacity = this.userSettings.divRUles[1];
           this.gCropDivRules.visible = this.userSettings.divRUles[0];
       }
       this.gCrop.opacity = this.userSettings.gCrop[1];
       this.gCrop.visible = this.userSettings.gCrop[0];
    }
}

GoldenCrop.prototype.interactiveCrop = function () {
    var docW = this.docW;
    var docH = this.docH;

    do {
        if ( this.goIntoInteractiveMode ) {
            this.cropAccepted = Stdlib.userGoToFreeTransform(this.doc, this.gCrop);
        } else {
            this.cropAccepted = true;
            this.doc.activeLayer = this.cropMask;
        }
    
        if ( !this.cropAccepted ) break;
        
        this.cropBounds = Stdlib.getVectorMaskBounds_cornerPointsOnly(true, this.doc, this.cropMask);
        var cb = this.cropBounds;

        // Detect angle
        var threshold = 0.0001;
        var angle = Stdlib.getVectorMaskAngle_cornerPointsOnly(false, this.doc, this.cropMask);
        this.rotateCanvasA = ( Math.abs(angle)%90 > threshold )?-angle:false;
        if ( this.rotateCanvasA ) {
            this.popBackground = true; // default, could be changed in the following code
            var anRad = ((this.rotateCanvasA)*Math.PI)/180;
            var sinAb = Math.sin(Math.abs(anRad)), cosAb = Math.cos(Math.abs(anRad)),
                sinAn =Math.sin(anRad), cosAn = Math.cos(anRad);
            var mid = {x:(cb[0]+cb[2])/2,y:(cb[1]+cb[3])/2};
            //var dist = Math.sqrt(mid.x*mid.x+mid.y*mid.y);
            var cbRot = cb.clone();
            var newDocW = Math.ceil(docW * cosAb + docH * sinAb),
                newDocH = Math.ceil(docW * sinAb + docH * cosAb);
            var minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity; 
            var minXp, maxXp, minYp, maxYp; 
            // translate to 0,0, rotate, and translate back
            for (var i=6; i<10; ++i) {
                var x = cbRot[i].x - mid.x,
                    y = cbRot[i].y - mid.y;
                var xrot = x * cosAn - y * sinAn,
                    yrot = x * sinAn + y * cosAn;
                x = cbRot[i].x = xrot+mid.x+(newDocW-docW)/2;
                y = cbRot[i].y = yrot+mid.y+(newDocH-docH)/2;
                if ( x < minX ) { minX = x; minXp = {x:x,y:y} }
                if ( x > maxX ) { maxX = x; maxXp = {x:x,y:y} }
                if ( y < minY ) { minY = y; minYp = {x:x,y:y} }
                if ( y > maxY ) { maxY = y; maxYp = {x:x,y:y} }
            }
            this.afterRotate = {cb: [minX, minY, maxX, maxY, maxX-minX, maxY-minY, minXp, maxXp, minYp, maxYp, cbRot],
                               docW: newDocW,
                               docH: newDocH};
            // $.writeln('~~~~~~~~~~~~~');
            // $.writeln('afterRotate:' +this.afterRotate);
            //debugger;
        }
        
        // Detect cropping mode
        if ( cb[0] >= 0 && cb[1] >= 0 && cb[2] <= docW && cb[3] <= docH ) {
            // cropping only inside picture frame
            if ( this.cropMethod === false )
                this.cropMethod = this.chooseCropMethod();
            if ( this.rotateCanvasA && this.cropMethod == 'SIMPLE' ) {
                // cancel background pop even when there is a rotation
                this.popBackground = false;
            }
        } else {
            if ( this.rotateCanvasA ) {
                cb = this.afterRotate.cb; // simulate rotation for further computing
                docW = this.afterRotate.docW; docH = this.afterRotate.docH;
            }
            if ( cb[0] < 0 && cb[1] < 0 && cb[2] > docW && cb[3] > docH ) { // no image crop
                this.cropMethod = false;
                this.revealMethod = 'EXTCANVAS';
                this.popBackground = true;
            } else {
               if ( this.rotateCanvasA && cb[0] >= 0 && cb[1] >= 0 && cb[2] <= docW && cb[3] <= docH ) {
                   // rotation uncovers needed canvas, i.e. no further extension after roattion is needed
                   this.revealMethod = 'false';
               } else {
                  if ( this.cropMethod === false )
                    this.revealMethod = this.chooseRevealAction();
               }
                if ( !(this.revealMethod === 0) ) {
                    if ( this.revealMethod == 'EXTCANVAS' ) {
                        this.popBackground = true;
                    }
                    this.cropMethod = this.chooseCropMethod();
                }
            }

        }
    } while ( this.revealMethod === 0 || this.cropMethod === 0)
};

GoldenCrop.prototype.findCropToResume = function() {
   // old version !this.conf.isRunFromAction()
   // select last (bottom) layer to force adding new GC group (i.e. don't search for existing ones)
   if (this.doc.activeLayer != this.doc.layers[this.doc.layers.length-1]) {
       // search for GC group
       var gcg = this.findMainGCGroup();
       if ( gcg ) {
           var gcSub = this.findCropMaskAndDivRules( gcg );
           if (gcSub) {
               // Found :) Do not create new -- use existing
               this.skipGridCreation = true;
               this.gCrop            = gcg;
               this.cropMask         = gcSub.cropMask;
               this.gCropDivRules    = gcSub.divRules;
               
               this.userSettings = {gCrop: [this.gCrop.visible, Math.min(this.gCrop.opacity,100)],
                                    cropMask: [this.cropMask.visible, Math.min(this.cropMask.opacity,100)]}
               if (this.gCropDivRules) this.userSettings.divRUles = [this.gCropDivRules.visible, Math.min(this.gCropDivRules.opacity,100)];
               this.gCrop.opacity   = 100;
               this.gCrop.visible = true;

               this.cropMask.opacity = 70;
               this.cropMask.visible = true;

               if ( this.gCropDivRules && this.gCropDivRules.layers.length) {
                   this.gCropDivRules.visible = true;
                   this.gCropDivRules.opacity = 75;
               } else {
                   // TODO: add bogus layer AND transform it to match active crop mask as needed
                   // this.addBogusLayer();
               }
               
               this.doc.activeLayer = this.gCrop;
           }
       }
   }
}

GoldenCrop.prototype.showGuidelinesDialog = function () {
    var menuDesc = {caption:this.loc.get('chCompMethod'),
                   question:this.loc.get('chCompMethodQ'),
                   okTxt:this.loc.get('ok'),
                   cancelTxt:this.loc.get('cancel'),
                   cbElements:[{key:'1', text:this.loc.get('goldenRule'), sel: this.conf.get('golden')},
                               {key:'2', text:this.loc.get('ruleOfThirds'), sel: this.conf.get('roth')},
                               {key:'3', text:this.loc.get('diagonalMethod'), sel: this.conf.get('diagmethod')},
                               {key:'4', text:this.loc.get('goldenTriangleUp'), sel: this.conf.get('gtrianup')},
                               {key:'5', text:this.loc.get('goldenTriangleDown'), sel: this.conf.get('gtriandown')},
                               {key:'6', text:this.loc.get('goldenSpiralBL'), sel: this.conf.get('gspiralBL')},
                               {key:'7', text:this.loc.get('goldenSpiralTL'), sel: this.conf.get('gspiralTL')},
                               {key:'8', text:this.loc.get('goldenSpiralTR'), sel: this.conf.get('gspiralTR')},
                               {key:'9', text:this.loc.get('goldenSpiralBR'), sel: this.conf.get('gspiralBR')}
                              ],
                   msElements:[{key:'q', text:this.loc.get('basicRules'), elements:[0,1,2]},
                               {key:'w', text:this.loc.get('allGoldenSpirals'), elements:[5,6,7,8]},
                               {key:'a', text:this.loc.get('selectAll'), action: 'slctAll'},
                               {key:'d', text:this.loc.get('deselectAll'), action: 'dslctAll'}
                              ]
                  };
    var dlg = new dialogMenuMChoice(menuDesc);
    dlg.construct(true);
    // Add thickness slider
    dlg.customControls.orientation = 'row';
    dlg.customControls.alignChildren = 'fill';
    dlg.customControls.add('statictext', undefined, this.loc.get('lineThicknessProm'));
    dlg.customControls.tSlider = dlg.customControls.add('slider', undefined, this.conf.get('lthick'), 1, 30, {name: 'thickness'});
    dlg.customControls.tSlider.jumpdelta = 10;
    dlg.customControls.tSlider.jump = 1;
    dlg.customControls.tSlider.onChanging = function() {dlg.customControls.tValTxt.text = Math.round(dlg.customControls.tSlider.value);}
    dlg.customControls.tSlider.onChange = function() {dlg.customControls.tSlider.value = Math.round(dlg.customControls.tSlider.value);}
    dlg.customControls.tValTxt = dlg.customControls.add('statictext', undefined);
    dlg.customControls.tValTxt.preferredSize = [20, -1];
    dlg.customControls.tSlider.onChanging();
    var res = dlg.show();
    if (!res) return false;
    this.conf.set('golden', res[0]);
    this.conf.set('roth', res[1]);
    this.conf.set('diagmethod', res[2]);
    this.conf.set('gtrianup', res[3]);
    this.conf.set('gtriandown', res[4]);
    this.conf.set('gspiralBL', res[5]);
    this.conf.set('gspiralTL', res[6]);
    this.conf.set('gspiralTR', res[7]);
    this.conf.set('gspiralBR', res[8]);
    this.conf.set('lthick', Math.round(dlg.customControls.tSlider.value));

    // Save parameters; crop could be canceled, but the line remains, so save lines settings now
    this.conf.saveSettings();
    return true;
}

/*    
 * Logical heart of the script. Invoke each phase of script w/ or w/o suspending history.
 */
GoldenCrop.prototype.go = function() {
   var docW = this.docW = parseInt(this.doc.width.as("px"));
   var docH = this.docH = parseInt(this.doc.height.as("px"));

    // New action mechanizm
    // !== false   - indicates some method
    // x !== y <=> !(x === y) -- only the second form gives right value in CS2 and (CS3, CS4)
    // false       - indicates no action
    this.cropAccepted  = false;
    this.cropMethod    = false;
    this.revealMethod  = false;
    this.popBackground = false;
    this.rotateCanvasA = false;
    this.goIntoInteractiveMode = true;
    // ---!!!

   this.findCropToResume();
   if (!this.skipGridCreation) {
       if (this.conf.isDisplayNormalDialog()) {
           if(!this.showGuidelinesDialog()) {
               return false;
           }
        }

        // TODO: When continuing this could be not consistent with actual state!
        // ^[\t ]+([^:]+)(...........) / this.guidelines.\1.create =
        this.guidelines.golden.create = this.conf.get('golden'); // history relict, to be integrated with config and dialog
        this.guidelines.roth.create = this.conf.get('roth');
        this.guidelines.diagmethod.create = this.conf.get('diagmethod');
        this.guidelines.gtrianup.create = this.conf.get('gtrianup');
        this.guidelines.gtriandown.create = this.conf.get('gtriandown');
        this.guidelines.gspiralBL.create = this.conf.get('gspiralBL');
        this.guidelines.gspiralTL.create = this.conf.get('gspiralTL');
        this.guidelines.gspiralTR.create = this.conf.get('gspiralTR');
        this.guidelines.gspiralBR.create = this.conf.get('gspiralBR');


        if ( this.ifSuspendHistory ) {
            this.doc.suspendHistory(szAppName + this.loc.get('-grid'), 'this.makeGrid()');
            Stdlib.NOP();
        } else {
            this.makeGrid();
        }
    } else {
        // Test for having 'Ctrl'+'Shift' keys pressed - it YES, do simple crop
        if (ScriptUI.environment.keyboardState.shiftKey &&
            ScriptUI.environment.keyboardState.ctrlKey) {
            this.cropMethod = 'SIMPLE';
            this.revealMethod = 'EXTCANVAS';
            this.goIntoInteractiveMode = false;
        }
    }

    var cropFunctions  = {SIMPLE:'simpleCrop()', MASK:'maskOutCrop()'};
    var revealVuncions = {EXTCANVAS:'doRevealPopBackround()'};

    if ( this.ifSuspendHistory ) {
        this.doc.suspendHistory(szAppName + this.loc.get('-resize'), 'this.interactiveCrop()');
        Stdlib.NOP();
    } else {
        this.interactiveCrop();
    }

    // TODO: Remove bogusLayer if it could be created AND transformed if needed ('resume crop' function)
    // if (this.bogusLayer) this.bogusLayer.remove();
    
    // $.writeln( '==========' );
    // $.writeln( 'cropAccepted: ' + this.cropAccepted );
    // $.writeln( 'cropMethod: ' + this.cropMethod );
    // $.writeln( 'revealMethod: ' + this.revealMethod );
    // $.writeln( 'popBackground: ' + this.popBackground );
    // $.writeln( 'rotateCanvasA: ' + this.rotateCanvasA );
    
    if ( this.cropAccepted ) {
        
        if ( !(this.rotateCanvasA === false) ) {
            if ( this.ifSuspendHistory ) {
                this.doc.suspendHistory(szAppName + this.loc.get('-rotate'), 'this.doRotateCanvas()');
                Stdlib.NOP();
            } else {
                this.doRotateCanvas();
            }
        }

        if ( this.revealMethod ) {
            var revealingFunction = revealVuncions[this.revealMethod];
            if ( this.ifSuspendHistory ) {
                this.doc.suspendHistory(szAppName + this.loc.get('-reveal'), 'this.'+revealingFunction);
                Stdlib.NOP();
            } else {
                eval('this.'+revealingFunction);
            }
        }
 
        if ( this.cropMethod ) {
            var cropFunction = cropFunctions[this.cropMethod];
            if ( this.ifSuspendHistory ) {
                this.doc.suspendHistory(szAppName + this.loc.get('-crop'), 'this.'+cropFunction);
                Stdlib.NOP();
            } else {
                eval('this.'+cropFunction);
            }
        }
        // save parameters one again (for shure)
        this.conf.saveSettings();
    } else {
        // remove resize entry from history -- it does nothing
        executeAction( cTID( "undo" ), undefined, DialogModes.NO );
        // restore user-tuned parameters
        if (this.skipGridCreation) {
            this.restoreUserGCGroupSettings();
        }
        this.doc.activeLayer = this.gCrop;
    }

    // TODO: is there a need to restore user parameters everytime? I think No (or only when [2] Crop mask was selected)
    //       it is neccesary only if teh user canceled 'free transform' mode
    // this.restoreUserGCGroupSettings();
}

function main() {
    var gc = new GoldenCrop( app.activeDocument );
    // TODO: below
    gc.loadConfig('here comes some fancy config');
    gc.go();
}

// ---------------------------------------------------------------------
// Between ===START: stdlib.js=== and ===END: stdlib.js===, there is my
// modified (stripped and extended) version o xbytor's stdlib from xtools.
// ===START: stdlib.js===
// 
// stdlib.js
//   This file contains a collection of utility routines that I've
//   written, borrowed, rewritten, and occasionally tested and
//   documented.
//
//   Most of this stuff is photoshop specific. I'll break out the parts
//   that aren't sometime in the future.
//
// $Id: stdlib.js,v 1.252 2008/11/14 17:08:00 anonymous Exp $
// Copyright: (c)2008, xbytor
// License: http://creativecommons.org/licenses/LGPL/2.1
// Contact: xbytor@gmail.com
// Mod: Damian Sepczuk <damian.sepczuk@o2.pl>

var psVersion; 
try { 
  var lvl = $.level; 
  $.level = 0; 
  psVersion = app.version; 

 } catch (e) { 
  psVersion = version; 

 } finally { 
   $.level = lvl; 
   delete lvl; 
} 

isCS4plus = function()  { return isSC3plus() || isCS5() };
isSC3plus = function()  { return isCS3() || isCS4() }; 
isCS5 = function()  { return psVersion.match(/^12\./) != null; };
isCS4 = function()  { return psVersion.match(/^11\./) != null; }; 
isCS3 = function()  { return psVersion.match(/^10\./) != null; }; 
isCS2 = function()  { return psVersion.match(/^9\./) != null; }; 
isCS  = function()  { return psVersion.match(/^8\./) != null; }; 
isPS7 = function()  { return psVersion.match(/^7\./) != null; }; 

if (isPS7()) {  // this does not work for eval-includes 
  app = this; 
}

function cTID(s) { 
  return cTID[s] || cTID[s] = app.charIDToTypeID(s); 
}; 

function sTID(s) { 
  return sTID[s] || sTID[s] = app.stringIDToTypeID(s); 
};

Stdlib = function Stdlib() {};

Stdlib.saveLayer = true;
Stdlib.saveDoc = true;

Stdlib.createRGBColor = function(r, g, b) {
  var c = new RGBColor();
  if (r instanceof Array) {
    b = r[2]; g = r[1]; r = r[0];
  }
  c.red = parseInt(r); c.green = parseInt(g); c.blue = parseInt(b);
  var sc = new SolidColor();
  sc.rgb = c;
  return sc;
};

Stdlib.createSolidFillLayer = function(doc, color, name, opacity, layerColor, blendMode, clipToPrevious) {
  if(doc instanceof SolidColor) { 
      color=doc; doc=app.activeDocument};
  if(!doc)doc=activeDocument;
  if (!color) {
    color = Stdlib.createRGBColor(0, 0, 0);
  }
  function _ftn() {
    var desc = new ActionDescriptor();
    var clref = new ActionReference();
    clref.putClass(sTID('contentLayer'));
    desc.putReference(cTID('null'), clref);
    var tdesc = new ActionDescriptor();
    if (name) {
        tdesc.putString( cTID( "Nm  " ), name );
    }
    if (opacity) {
        tdesc.putUnitDouble( cTID( "Opct" ), cTID( "#Prc" ), opacity );
    }
    if (layerColor) {
        tdesc.putEnumerated( cTID( "Clr " ), cTID( "Clr " ), cTID( layerColor ) );
    }
    if (blendMode) {
        tdesc.putEnumerated( cTID( "Md  " ), cTID( "BlnM" ), cTID( "Nrml" ) );
    }
    if (clipToPrevious) {
        tdesc.putBoolean( cTID( "Grup" ), !!clipToPrevious );
    }

    var scldesc = new ActionDescriptor();
    var rgbdesc = new ActionDescriptor();
    rgbdesc.putDouble(cTID('Rd  '), color.rgb.red);
    rgbdesc.putDouble(cTID('Grn '), color.rgb.green);
    rgbdesc.putDouble(cTID('Bl  '), color.rgb.blue);
    scldesc.putObject(cTID('Clr '), cTID('RGBC'), rgbdesc);
    tdesc.putObject(cTID('Type'), sTID('solidColorLayer'), scldesc);
    desc.putObject(cTID('Usng'), sTID('contentLayer'), tdesc);
    executeAction(cTID('Mk  '), desc, DialogModes.NO);
  }
  Stdlib.wrapLC(doc, _ftn);
  return doc.activeLayer;
};
// from discussions with Mike Hale
Stdlib.hasLayerMask = function() {
    var ref = new ActionReference();
    ref.putEnumerated(cTID("Lyr "), cTID("Ordn"), cTID("Trgt"));
    var desc = executeActionGet(ref);
    return desc.hasKey(cTID("UsrM"));
};

//
// Remove the mask from the layer. Apply the mask if 'apply' is true
//
Stdlib.removeLayerMask = function(apply) {
    if ( Stdlib.hasLayerMask() ) {
        var desc = new ActionDescriptor();     // Delete
        var ref = new ActionReference();       // Mask Channel
        ref.putEnumerated(cTID("Chnl"), cTID("Chnl"), cTID("Msk "));
        desc.putReference(cTID("null"), ref);
        desc.putBoolean(cTID("Aply"), (apply == true));  // Apply Mask
        executeAction(cTID("Dlt "), desc, DialogModes.NO);
        return true;
    } else {
        return false;
    }
};

Stdlib.addVectorMask = function( hide ) {
    var desc = new ActionDescriptor();

    var arMode = new ActionReference();
    arMode.putClass( cTID( "Path" ) );
    
    var arKind = new ActionReference();
    arKind.putEnumerated( cTID( "Path" ), cTID( "Path" ), sTID( "vectorMask" ) );
    
    var mode = cTID(hide?"HdAl":"RvlA");
    desc.putReference( cTID( "null" ), arMode );    
    desc.putReference( cTID( "At  " ), arKind );    
    desc.putEnumerated( cTID( "Usng" ), sTID( "vectorMaskEnabled" ), mode);

    executeAction( cTID( "Mk  " ), desc, DialogModes.NO );
}

Stdlib.decodePathMode = function( mode ) {
    var pathMode = null;
    switch ( mode ) {
        case ShapeOperation.SHAPEADD:
            pathMode = cTID("AddT");
            break;
        case ShapeOperation.SHAPEINTERSECT:
            pathMode = cTID();
            break;
        case ShapeOperation.SHAPESUBTRACT:
            pathMode = cTID("SbtF");
            break;
        case ShapeOperation.SHAPEXOR:
            pathMode = cTID();
            break;
        default:
            Error.runtimeError(1, "Shape mode not supported");
    }
    return pathMode;
}

Stdlib.decodeUnit = function( unit ) {
    var pathUnit = null;
    switch ( unit ) {
        case Units.PERCENT:
            pathUnit = cTID("#Prc");
            break;
        case Units.PIXELS:
            pathUnit = cTID("#Pxl");
            break;
        case Units.CM:
        case Units.INCHES:
        case Units.MM:
        case Units.PICAS:
        case Units.POINTS:
        default:
            Error.runtimeError(1, "Unit not supported");
    }
    return pathUnit;
}

// by SzopeN
Stdlib.rectPath = function( mode, unit, top, left, bottom, right )
{
    var pathMode = Stdlib.decodePathMode(mode);
    var pathUnit = Stdlib.decodeUnit(unit);

    var desc = new ActionDescriptor();
    
    var arStyle = new ActionReference();
        arStyle.putEnumerated( cTID( "Path" ), cTID( "Ordn" ), cTID( "Trgt" ) );

    var adBounds = new ActionDescriptor();
        adBounds.putUnitDouble( cTID( "Top " ), pathUnit, top );
        adBounds.putUnitDouble( cTID( "Left" ), pathUnit, left );
        adBounds.putUnitDouble( cTID( "Btom" ), pathUnit, bottom );
        adBounds.putUnitDouble( cTID( "Rght" ), pathUnit, right );
    
    desc.putReference( cTID( "null" ), arStyle );
    desc.putObject( cTID( "T   " ), cTID( "Rctn" ), adBounds );

    executeAction( pathMode, desc, DialogModes.NO );
}

Stdlib.linePath = function( mode, unit, width, x1, y1, x2, y2 ) {
    var pathMode = Stdlib.decodePathMode(mode);
    var pathUnit = Stdlib.decodeUnit(unit);

    var idAddT = pathMode;
        var desc90 = new ActionDescriptor();
        var idnull = cTID( "null" );
            var ref47 = new ActionReference();
            var idPath = cTID( "Path" );
            var idOrdn = cTID( "Ordn" );
            var idTrgt = cTID( "Trgt" );
            ref47.putEnumerated( idPath, idOrdn, idTrgt );
        desc90.putReference( idnull, ref47 );
        var idT = cTID( "T   " );
            var desc91 = new ActionDescriptor();
            var idStrt = cTID( "Strt" );
                var desc92 = new ActionDescriptor();
                var idHrzn = cTID( "Hrzn" );
                var idPxl = pathUnit;
                desc92.putUnitDouble( idHrzn, idPxl, x1 );
                var idVrtc = cTID( "Vrtc" );
                var idPxl = pathUnit;
                desc92.putUnitDouble( idVrtc, idPxl, y1 );
            var idPnt = cTID( "Pnt " );
            desc91.putObject( idStrt, idPnt, desc92 );
            var idEnd = cTID( "End " );
                var desc93 = new ActionDescriptor();
                var idHrzn = cTID( "Hrzn" );
                var idPxl = pathUnit;
                desc93.putUnitDouble( idHrzn, idPxl, x2 );
                var idVrtc = cTID( "Vrtc" );
                var idPxl = pathUnit;
                desc93.putUnitDouble( idVrtc, idPxl, y2 );
            var idPnt = cTID( "Pnt " );
            desc91.putObject( idEnd, idPnt, desc93 );
            var idWdth = cTID( "Wdth" );
            var idPxl = pathUnit;
            desc91.putUnitDouble( idWdth, idPxl, width );
        var idLn = cTID( "Ln  " );
        desc90.putObject( idT, idLn, desc91 );
    executeAction( idAddT, desc90, DialogModes.NO );
}
// by SzopeN
Stdlib.userGoToFreeTransform = function(doc, layer) {
    function _ftn() {
        function preMove() {
            var desc = new ActionDescriptor();
            var lref = new ActionReference();
            lref.putEnumerated(cTID("Lyr "), cTID("Ordn"), cTID("Trgt"));
            desc.putReference(cTID("null"), lref);
            desc.putEnumerated(cTID("FTcs"), cTID("QCSt"), cTID("Qcsa"));
                 var desc75 = new ActionDescriptor();
                 desc75.putUnitDouble( cTID('Hrzn'), cTID('#Pxl'), 1.000000 );
                 desc75.putUnitDouble( cTID('Vrtc'), cTID('#Pxl'), 1.000000 );
            desc.putObject( cTID('Ofst'), cTID('Ofst'), desc75 );
            executeAction(cTID("Trnf"), desc, DialogModes.NO);
        }
        function retPostMoveDesc() {
            var desc = new ActionDescriptor();
            var lref = new ActionReference();
            lref.putEnumerated(cTID("Lyr "), cTID("Ordn"), cTID("Trgt"));
            desc.putReference(cTID("null"), lref);
            desc.putEnumerated(cTID("FTcs"), cTID("QCSt"), cTID("Qcsa"));
                 var desc75 = new ActionDescriptor();
                 desc75.putUnitDouble( cTID('Hrzn'), cTID('#Pxl'), -1.000000 );
                 desc75.putUnitDouble( cTID('Vrtc'), cTID('#Pxl'), -1.000000 );
            desc.putObject( cTID('Ofst'), cTID('Ofst'), desc75 );
            return desc;
        }
        var state = true;
        preMove();

        var lvl = $.level;
        $.level = 0;
        try {
          executeAction(cTID("Trnf"), retPostMoveDesc(), DialogModes.ALL);///ALL
        } catch (e) {
          state = false;
          if (e.number != 8007) { // if not "User cancelled"
            throw e;
          }
          executeAction(cTID("Trnf"), retPostMoveDesc(), DialogModes.NO);
        } finally {
          $.level = lvl;
        }
    
    return state;
    }
    return Stdlib.wrapLCLayer(doc, layer, _ftn)
}

// by SzopeN
// heplful with multiple suspendHistory
// is there a better candidate?
Stdlib.NOP = function() {
    activeDocument = activeDocument;
    /*
    executeAction( cTID( "undo" ), undefined, DialogModes.NO );
    executeAction( cTID( "undo" ), undefined, DialogModes.NO );
    */
}

Stdlib.loadVectorMaskSelection = function() {
    var desc8 = new ActionDescriptor();
    var ref4 = new ActionReference();
    ref4.putProperty( cTID('Chnl'), cTID('fsel') );
    desc8.putReference( cTID('null'), ref4 );
    var ref5 = new ActionReference();
    ref5.putEnumerated( cTID('Path'), cTID('Path'), sTID('vectorMask') );
    ref5.putEnumerated( cTID('Lyr '), cTID('Ordn'), cTID('Trgt') );
    desc8.putReference( cTID('T   '), ref5 );
    desc8.putBoolean( cTID('AntA'), true );
    desc8.putUnitDouble( cTID('Fthr'), cTID('#Pxl'), 0.000000 );
    executeAction( cTID('setd'), desc8, DialogModes.NO );
};

Stdlib.wrapLC = function(doc, ftn) {

  var ad = app.activeDocument;
  if (doc) {
    if (ad != doc) {
      app.activeDocument = doc;
    }
  } else {
    doc = ad;
  }

  var res = undefined;
  try {
    res = ftn(doc);
  } finally {
    if (  Stdlib.saveDoc && ad && app.activeDocument != ad) {
      app.activeDocument = ad;
    }
  }
  return res;
};

Stdlib.wrapLCLayer = function(doc, layer, ftn) {
  var ad = app.activeDocument;
  if (doc) {
    if (ad != doc) {
      app.activeDocument = doc;
    }
  } else {
    doc = ad;
  }

  var al = doc.activeLayer;
  var alvis = al.visible;

  if (layer && doc.activeLayer != layer) {
    doc.activeLayer = layer;
  } else {
    layer = doc.activeLayer;
  }
  var res = undefined;

  try {
    res = ftn(doc, layer);

  } finally {
    if ( Stdlib.saveLayer )  {
        if (doc.activeLayer != al) {
          doc.activeLayer = al;
        }
        if (!doc.activeLayer.isBackgroundLayer) {
          doc.activeLayer.visible = alvis;
        }
    }
    if (Stdlib.saveDoc && app.activeDocument != ad) {
      app.activeDocument = ad;
    }
  }

  return res;
};

// by Damian SzopeN Sepczuk <damian[d0t]sepczuk[a7]o2{do7}pl> 
// [in] round (bool) -- whether returned values should be rounded to the nearest pixel, def: false 
// [in] doc -- document containing layer with vector mask 
// [in] layer -- layer with vector mask 
// returns array [left, top, right, bottom, width, height] 
Stdlib.getVectorMaskBounds_cornerPointsOnly = function(round, doc, layer, pointList) { 
  round = !!round; 
  function _ftn() { 
    var ref = new ActionReference(); 
    ref.putEnumerated( cTID('Path'), cTID('Path'), sTID('vectorMask') ); 
    ref.putEnumerated(cTID("Lyr "), cTID("Ordn"), cTID("Trgt")); 
    var vMaskDescr = executeActionGet(ref); 
    var pathContents = vMaskDescr.getObjectValue(sTID('pathContents')); 
    var pathList = pathContents.getList(sTID('pathComponents')); 

    // for each path in current layer 
    var minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity; 
    var minXp, maxXp, minYp, maxYp; 
    // using separate variables gives speed gain 
    var _id1 = sTID("subpathListKey"), 
        _id2 = sTID("points"), 
        _id3 = sTID("anchor"), 
        _id4 = sTID('horizontal'), 
        _id5 = sTID('vertical');
     var pList = new Array();
    if (pointList) {
         for ( var cPath=0; cPath<pathList.count; ++cPath ) 
         { 
            var curPath = pathList.getObjectValue(cPath).getList(_id1); 
            var points = curPath.getObjectValue(0).getList(_id2); 
            // for each point 
            for ( var cPoint=0; cPoint < points.count; ++cPoint ) 
            {    
              var point = points.getObjectValue(cPoint).getObjectValue(_id3); 
              var x = point.getUnitDoubleValue(_id4); 
              var y = point.getUnitDoubleValue(_id5);
              pList.push({x:x,y:y});
              // it is faster than if/else block (benchmarked on PSCS4) 
              if ( x < minX ) { minX = x; minXp = {x:x,y:y} }
              if ( x > maxX ) { maxX = x; maxXp = {x:x,y:y} }
              if ( y < minY ) { minY = y; minYp = {x:x,y:y} }
              if ( y > maxY ) { maxY = y; maxYp = {x:x,y:y} }
            } 
         }
     } else {
         for ( var cPath=0; cPath<pathList.count; ++cPath ) 
         { 
            var curPath = pathList.getObjectValue(cPath).getList(_id1); 
            var points = curPath.getObjectValue(0).getList(_id2); 
            // for each point 
            for ( var cPoint=0; cPoint < points.count; ++cPoint ) 
            {    
              var point = points.getObjectValue(cPoint).getObjectValue(_id3); 
              var x = point.getUnitDoubleValue(_id4); 
              var y = point.getUnitDoubleValue(_id5); 
              // it is faster than if/else block (benchmarked on PSCS4) 
              if ( x < minX ) { minX = x; minXp = {x:x,y:y} }
              if ( x > maxX ) { maxX = x; maxXp = {x:x,y:y} }
              if ( y < minY ) { minY = y; minYp = {x:x,y:y} }
              if ( y > maxY ) { maxY = y; maxYp = {x:x,y:y} }
            } 
         }
    }
 
    //          0      1     2      3     4            5           6      7       8       9       10
    var res = [minX, minY, maxX, maxY, maxX-minX, maxY-minY, minXp, maxXp, minYp, maxYp, pList]; 
    if (round) 
    { 
      for ( i=0; i<6; ++i ) 
      { 
        res[i] = Math.round(res[i]); 
      } 
    } 
    return res; 
  } 
  var bnds = Stdlib.wrapLCLayer(doc, layer, _ftn); 
  return bnds; 
}

if ( isCS4() || isCS3() ) { 
    // SzopeN's version -- do NOT make use of history (because it can be suspended!)
    Stdlib.hasSelection = function(doc) {
      var debugLevel = $.level; // save debug level
      $.level = 0; // turn off debugging
      var res = true;
      try {
          activeDocument.selection.bounds // throws if there's no selection
      } catch(e) {
          res = false; // error thrown => no selection
      }
      $.level = debugLevel; // restore debug level
      return res;
    };
} else { 
  Stdlib.hasSelection = function(doc) {
    if ( !doc ) doc = app.activeDocument;
    var res = false; 
    var as = doc.activeHistoryState; 
    doc.selection.deselect(); 
    if (as != doc.activeHistoryState) { 
      res = true; 
      doc.activeHistoryState = as; 
    } 
    return res; 
  }; 
};

Stdlib.hasBackground = function(doc) {
   return doc.layers[doc.layers.length-1].isBackgroundLayer;
}

Stdlib.makeSelectionFromPath = function(doc, pathName) {
  function _ftn() {
    var desc89 = new ActionDescriptor();
    var ref79 = new ActionReference();
    ref79.putProperty( cTID('Chnl'), cTID('fsel') );
    desc89.putReference( cTID('null'), ref79 );
    var ref80 = new ActionReference();
    ref80.putEnumerated( cTID('Path'), cTID('Ordn'), cTID('Trgt') );
    desc89.putReference( cTID('T   '), ref80 );
    desc89.putBoolean( cTID('AntA'), true );
    desc89.putUnitDouble( cTID('Fthr'), cTID('#Pxl'), 0.000000 );
    executeAction( cTID('setd'), desc89, DialogModes.NO );
  };
  if (pathName) Stdlib.makePathActive(doc, pathName); // work on current path
  Stdlib.wrapLC(doc, _ftn);
};

Stdlib.restrictChannelsEnum = { none:0, red:1, green:2, blue:4, cyan:8, magenta:16, yellow:32, black:64, L:128, A:256, B:512 };
Stdlib.colorsEnum = {none: 'None', red: 'Rd  ', orange: 'Orng', yellow: 'Ylw ', green: 'Grn ', blue: 'Bl  ', violet: 'Vlt ', gray: 'Gry '};
Stdlib.blendModesEnum = {passThrough: 'passThrough', normal: 'normal', dissolve: 'dissolve', darken: 'darken', multipl: 'multipl', colorBurn: 'colorBurn', linearBurn: 'linearBurn', darkerColor: 'darkerColor', lighten: 'lighten', screen: 'screen', colorDodge: 'colorDodge', linearDodge: 'linearDodge', lighterColor: 'lighterColor', overlay: 'overlay', softLight: 'softLight', hardLight: 'hardLight', vividLight: 'vividLight', linearLight: 'linearLight', pinLight: 'pinLight', hardMix: 'hardMix', difference: 'difference', exclusion: 'exclusion', hue: 'hue', saturation: 'saturation', color: 'color', luminosity: 'luminosity'};
Stdlib.maskModesEnum = {noMask:false, revealAll:1, hideAll:2, revealSelection:3, hideSelection:4, revealPath:5, hidePath:6}

/*
 * Creates a group using low-lwvel functions
 * [in*] name: String -- group name, def: auto PS name
 * [in*] opacity: Integer from range [0,100] -- group opacity, def: 100
 * [in*] color: enum Stdlib.colorsEnum -- color of group (on layers panel), def: Stdlib.colorsEnum.none
 * [in*] blandMode: enum Stdlib.blendModesEnum -- bledning mode of the group, def: Stdlib.blendModesEnum.passThrough
 * Returns void 
 * Remark: It is faster than standard API at least in CS4.
 * Remark: Do not pass an argument or pass undefined to get default value
 * Example: Stdlib.createLayerGroup('my group', 75, Stdlib.colorsEnum.red, Stdlib.blendModesEnum.passThrough);
 */
Stdlib.createLayerGroup = function(name, opacity, color, blendMode, userMask, vectorMask, restrictChannels) {
    var doc = app.activeDocument;
    // Make layer
    var idMk = cTID( "Mk  " );
        var desc54 = new ActionDescriptor();
        
        var idnull = cTID( "null" );
            var ref49 = new ActionReference();
            var idlayerSection = sTID( "layerSection" );
            ref49.putClass( idlayerSection );
        desc54.putReference( idnull, ref49 );
        
        var idUsng = cTID( "Usng" );
            var desc55 = new ActionDescriptor();
            if (name) {
                desc55.putString( cTID( "Nm  " ), name );
            }
            if (opacity) {
                desc55.putUnitDouble( cTID( "Opct" ), cTID( "#Prc" ), opacity );
            }
            if (color) {
                desc55.putEnumerated( cTID( "Clr " ), cTID( "Clr " ), cTID( color ) );
            }
            if (blendMode) {
                desc55.putEnumerated( cTID( "Md  " ), cTID( "BlnM" ), cTID( "Nrml" ) );
            }
        desc54.putObject( idUsng, sTID( "layerSection" ), desc55 );
    executeAction( idMk, desc54, DialogModes.NO );
    if ( userMask ) {
        var desc = new ActionDescriptor();
        desc.putClass(cTID("Nw  "), cTID("Chnl"));
        var ref = new ActionReference();
        ref.putEnumerated(cTID("Chnl"), cTID("Chnl"), cTID("Msk "));
        desc.putReference(cTID("At  "), ref);
        switch ( userMask ) {
            case Stdlib.maskModesEnum.revealAll:
                desc.putEnumerated(cTID("Usng"), cTID("UsrM"), cTID("RvlA"));
                break;
            case Stdlib.maskModesEnum.hideAll:
                desc.putEnumerated(cTID("Usng"), cTID("UsrM"), cTID("HdAl"));
                break;
            case Stdlib.maskModesEnum.revealPath:
                Stdlib.makeSelectionFromPath();
                // NO BREAK
            case Stdlib.maskModesEnum.revealSelection:
                desc.putEnumerated(cTID("Usng"), cTID("UsrM"), cTID("RvlS"));
                break;
            case Stdlib.maskModesEnum.hidePath:
                Stdlib.makeSelectionFromPath();
                doc.selection.invert();
                // NO BREAK
            case Stdlib.maskModesEnum.hideSelection:
                desc.putEnumerated(cTID("Usng"), cTID("UsrM"), cTID("HdSl"));
                break;

        }
        executeAction(cTID("Mk  "), desc, DialogModes.NO);
    }

    // Add masks...
    if ( vectorMask ) {
        var idMk = cTID( "Mk  " );
            var desc287 = new ActionDescriptor();
            var idnull = cTID( "null" );
                var ref145 = new ActionReference();
                ref145.putClass( cTID( "Path" ) );
            desc287.putReference( idnull, ref145 );
            var idAt = cTID( "At  " );
                var ref146 = new ActionReference();
                var idPath = cTID( "Path" );
                ref146.putEnumerated( idPath, idPath, sTID( "vectorMask" ) );
            desc287.putReference( idAt, ref146 );
            
        switch ( vectorMask ) {
            case Stdlib.maskModesEnum.revealAll:
                desc287.putEnumerated( cTID( "Usng" ), sTID( "vectorMaskEnabled" ), cTID( "RvlA" ) );
                break;
            case Stdlib.maskModesEnum.hideAll:
                desc287.putEnumerated( cTID( "Usng" ), sTID( "vectorMaskEnabled" ), cTID( "HdAl" ) );
                break;
            case Stdlib.maskModesEnum.revealSelection:
                Stdlib.makeWorkPath();
                desc287.putEnumerated( cTID( "Usng" ), sTID( "vectorMaskEnabled" ), cTID( "RvlA" ) );
                break;
            case Stdlib.maskModesEnum.hideSelection:
                Stdlib.makeWorkPath();
                desc287.putEnumerated( cTID( "Usng" ), sTID( "vectorMaskEnabled" ), cTID( "HdAl" ) );
                break;
            case Stdlib.maskModesEnum.revealPath:
                    var ref171 = new ActionReference();
                    ref171.putEnumerated( cTID( "Path" ), cTID( "Ordn" ), cTID( "Trgt" ) );
                desc591.putReference( cTID( "Usng" ), ref171 );
                break;
            case Stdlib.maskModesEnum.hidePath:
                // TO DO
                throw new Error("Operation Stdlib.maskModesEnum.hidePath not implemented in vector mask yet!");
                break;
        }
        executeAction( idMk, desc287, DialogModes.NO );
    }

    // Restrict channels
    if ( restrictChannels ) {
        var idsetd = cTID( "setd" );
            var desc162 = new ActionDescriptor();
            var idnull = cTID( "null" );
                var ref126 = new ActionReference();
                ref126.putEnumerated( cTID( "Lyr " ), cTID( "Ordn" ), cTID( "Trgt" ) );
            desc162.putReference( idnull, ref126 );
            var idT = cTID( "T   " );
                var desc163 = new ActionDescriptor();
                var idchannelRestrictions = sTID( "channelRestrictions" );
                    var idChnl = cTID( "Chnl" );
                    var list3 = new ActionList();

                    if ( restrictChannels & Stdlib.restrictChannelsEnum.red ) {
                        list3.putEnumerated( idChnl, cTID( 'Rd  ' ) );
                    }
                    if ( restrictChannels & Stdlib.restrictChannelsEnum.green ) {
                        list3.putEnumerated( idChnl, cTID( 'Grn ' ) );
                    }
                    if ( restrictChannels & Stdlib.restrictChannelsEnum.blue ) {
                        list3.putEnumerated( idChnl, cTID( 'Bl  ' ) );
                    }
                    if ( restrictChannels & Stdlib.restrictChannelsEnum.cyan ) {
                        list3.putEnumerated( idChnl, cTID( 'Cyn ' ) );
                    }
                    if ( restrictChannels & Stdlib.restrictChannelsEnum.magenta ) {
                        list3.putEnumerated( idChnl, cTID( 'Mgnt' ) );
                    }
                    if ( restrictChannels & Stdlib.restrictChannelsEnum.yellow ) {
                        list3.putEnumerated( idChnl, cTID( 'Yllw' ) );
                    }
                    if ( restrictChannels & Stdlib.restrictChannelsEnum.black ) {
                        list3.putEnumerated( idChnl, cTID( 'Blck' ) );
                    }
                    if ( restrictChannels & Stdlib.restrictChannelsEnum.L ) {
                        list3.putEnumerated( idChnl, cTID( 'Lght' ) );
                    }
                    if ( restrictChannels & Stdlib.restrictChannelsEnum.A ) {
                        list3.putEnumerated( idChnl, cTID( 'A   ' ) );
                    }
                    if ( restrictChannels & Stdlib.restrictChannelsEnum.B ) {
                        list3.putEnumerated( idChnl, cTID( 'B   ' ) );
                    }
                desc163.putList( idchannelRestrictions, list3 );
            var idLyr = cTID( "Lyr " );
            desc162.putObject( idT, idLyr, desc163 );
        executeAction( idsetd, desc162, DialogModes.NO );
    }
    return doc.activeLayer;
}

Stdlib.getVectorMaskAngle_cornerPointsOnly = function(round, doc, layer) { 
  round = !!round; 
  function _ftn() { 
    var ref = new ActionReference(); 
    ref.putEnumerated( cTID('Path'), cTID('Path'), sTID('vectorMask') ); 
    ref.putEnumerated(cTID("Lyr "), cTID("Ordn"), cTID("Trgt")); 
    var vMaskDescr = executeActionGet(ref); 
    var pathContents = vMaskDescr.getObjectValue(sTID('pathContents')); 
    var pathList = pathContents.getList(sTID('pathComponents')); 

    // using separate variables gives speed gain 
    var _id3 = sTID("anchor"), 
        _id4 = sTID('horizontal'), 
        _id5 = sTID('vertical'); 
       
    var cPath=0;
    var curPath = pathList.getObjectValue(cPath).getList(sTID("subpathListKey")); 
    var points = curPath.getObjectValue(0).getList(sTID("points")); 

    var p1  = points.getObjectValue(0).getObjectValue(_id3),
         p1x = p1.getUnitDoubleValue(_id4),
         p1y = p1.getUnitDoubleValue(_id5),
         p2  = points.getObjectValue(1).getObjectValue(_id3),
         p2x = p2.getUnitDoubleValue(_id4),
         p2y = p2.getUnitDoubleValue(_id5);
         
     var v = [p2x-p1x, p2y-p1y];
     var v_len = Math.sqrt(v[0]*v[0]+v[1]*v[1]);
     var an = Math.acos(v[1]/v_len);
    var res = 90.0-an*180.0/Math.PI;
    if (p1x>p2x) res=-res;
    if (!round) 
    { 
        res = Math.round(res*100)/100; 
    } 
    return res; 
  } 
  return Stdlib.wrapLCLayer(doc, layer, _ftn); 
}

Stdlib.rotateCannvas = function( angle, doc ) {
  function _ftn() {
    var desc = new ActionDescriptor();
        var ref = new ActionReference();
        ref.putEnumerated( charIDToTypeID( "Dcmn" ), charIDToTypeID( "Ordn" ), charIDToTypeID( "Frst" ) );
    desc.putReference( charIDToTypeID( "null" ), ref );
    desc.putUnitDouble( charIDToTypeID( "Angl" ), charIDToTypeID( "#Ang" ), angle );
    executeAction( charIDToTypeID( "Rtte" ), desc, DialogModes.NO );
  }
  Stdlib.wrapLC(doc, _ftn);
}

Stdlib.flipPath = function(h, v) {
    var idTrnf = cTID( "Trnf" );
        var desc108 = new ActionDescriptor();
            var ref101 = new ActionReference();
            ref101.putEnumerated( cTID( "Path" ), cTID( "Ordn" ), cTID( "Trgt" ));
        desc108.putReference(  cTID( "null" ), ref101 );
        desc108.putEnumerated( cTID( "FTcs" ), cTID( "QCSt" ), cTID( "Qcsa" ) );
        if (h) desc108.putUnitDouble( cTID( "Wdth" ), cTID( "#Prc" ), -100.000000 );
        if (v) desc108.putUnitDouble( cTID( "Hght" ), cTID( "#Prc" ), -100.000000 );
    executeAction( idTrnf, desc108, DialogModes.NO );
}

Stdlib.createSubPath = function( pointList, closed, mode ) {
    if (!closed) closed = true;
    if (!mode) mode = ShapeOperation.SHAPEADD;
    var spi = new SubPathInfo();
    spi.closed = closed;
    spi.operation = mode;
    spi.entireSubPath = pointList;
    return spi;
}

Stdlib.linePathAPI = function(x1, y1, x2, y2, thickness) {
    // <=CS4; patth points coordinates must be given in current DIP (!), for example
    //        72dpi: 1 path 'pixel' => 1 image pixel
    //       300pdi: 1 path 'pixel' => 300/72 image pixels
    var doc = app.activeDocument;
    var DPIFix = 72/doc.resolution; 
    x1 *= DPIFix; y1 *= DPIFix; x2 *= DPIFix; y2 *= DPIFix; thickness *= DPIFix;
    
    var halfSize = thickness/2;
    var v = [x2-x1, y2-y1];
    var v_len = Math.sqrt(v[0]*v[0]+v[1]*v[1]);
    var an = Math.acos(v[1]/v_len);
    if (x1>x2) an=-an;
    
    v=[halfSize*Math.cos(an),halfSize*Math.sin(an)];
    // Create initial point
    var points = [Stdlib.createPathPoint([x1+v[0],y1-v[1]]),
                  Stdlib.createPathPoint([x1-v[0],y1+v[1]]),
                  Stdlib.createPathPoint([x2-v[0],y2+v[1]]),
                  Stdlib.createPathPoint([x2+v[0],y2-v[1]])];
    return points;
}

Stdlib.createPathPoint = function(point, lHandle, rHandle) {
    var kind = (lHandle || rHandle)?PointKind.SMOOTHPOINT:PointKind.CORNERPOINT;
    if (!lHandle) lHandle = point;
    if (!rHandle) rHandle = point;
    
    var o = new PathPointInfo();
    /*o.anchor = [new UnitValue(point[0],'px'),new UnitValue(point[1],'px')];
    o.leftDirection = [new UnitValue(lHandle[0],'px'),new UnitValue(lHandle[1],'px')];
    o.rightDirection = [new UnitValue(rHandle[0],'px'),new UnitValue(rHandle[1],'px')];*/
    o.anchor = point;
    o.leftDirection = lHandle;
    o.rightDirection = rHandle;
    o.kind = kind;
    return o;
}

Stdlib.moveToFront = function() {
    var idmove = charIDToTypeID( "move" );
        var desc67 = new ActionDescriptor();
            var ref58 = new ActionReference();
            ref58.putEnumerated( charIDToTypeID( "Lyr " ), charIDToTypeID( "Ordn" ), charIDToTypeID( "Trgt" ) );
        desc67.putReference( charIDToTypeID( "null" ), ref58 );
            var ref59 = new ActionReference();
            ref59.putEnumerated( charIDToTypeID( "Lyr " ), charIDToTypeID( "Ordn" ), charIDToTypeID( "Frnt" ) );
        desc67.putReference( charIDToTypeID( "T   " ), ref59 );
    executeAction( idmove, desc67, DialogModes.NO );
}

Stdlib.selectRect = function(t,l,b,r) {
    var desc4233 = new ActionDescriptor();
        var ref1054 = new ActionReference();
        ref1054.putProperty( cTID('Chnl'), cTID('fsel') );
    desc4233.putReference( cTID('null'), ref1054 );
        var desc4234 = new ActionDescriptor();
        desc4234.putUnitDouble( cTID('Top '), cTID('#Pxl'), t );
        desc4234.putUnitDouble( cTID('Left'), cTID('#Pxl'), l );
        desc4234.putUnitDouble( cTID('Btom'), cTID('#Pxl'), b );
        desc4234.putUnitDouble( cTID('Rght'), cTID('#Pxl'), r );
    desc4233.putObject( cTID('T   '), cTID('Rctn'), desc4234 );
    executeAction( cTID('setd'), desc4233, DialogModes.NO );
}
// ===END: stdlib.js====================================================================================================================

Object.prototype.clone = function() {
  var newObj = (this instanceof Array) ? [] : {};
  for (var i in this) {
    //if(!this.hasOwnProperty(i)) continue;
    if (this[i] && typeof this[i] == "object") {
      newObj[i] = this[i].clone();
    } else newObj[i] = this[i]
  } return newObj;
};
// ====================================================================================================================================

app.bringToFront();
try {
   if ( app.documents.length == 0 )
   {
      var loc = localizator.getInstance();
      throw new Error( loc.get('openB4Run') );
   }
   var oldRulerUnit = app.preferences.rulerUnits; // Save ruler unit
   app.preferences.rulerUnits = Units.PIXELS;     // Set it to PIXEL
   main();
} catch ( e ) {
   alert( e.message );
} finally {
   app.preferences.rulerUnits = oldRulerUnit; // Restore ruler unit
}

'Golden Crop by SzopeN';