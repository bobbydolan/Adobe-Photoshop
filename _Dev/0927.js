
  1
  2
  3
  4
  5
  6
  7
  8
  9
 10
 11
 12
 13
 14
 15
 16
 17
 18
 19
 20
 21
 22
 23
 24
 25
 26
 27
 28
 29
 30
 31
 32
 33
 34
 35
 36
 37
 38
 39
 40
 41
 42
 43
 44
 45
 46
 47
 48
 49
 50
 51
 52
 53
 54
 55
 56
 57
 58
 59
 60
 61
 62
 63
 64
 65
 66
 67
 68
 69
 70
 71
 72
 73
 74
 75
 76
 77
 78
 79
 80
 81
 82
 83
 84
 85
 86
 87
 88
 89
 90
 91
 92
 93
 94
 95
 96
 97
 98
 99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
135
136
137
138
139
140
141
142
143
144
145
146
147
148
149
150
151
152
153
154
155
156
157
158
159
160
161
162
163
164
165
166
167
168
169
 /* Got questions improvements? please do ask or share 
    regards Kristian Andersen krilleandersen@gmail.com
*/
    
  var oldHH=0;
 
var createNewArtboard = function(w,h,t,n) {

    var ww=w+'.'+000000;
    var hh=h+'.'+000000;
    var tt =+ oldHH+'.'+000000;
    var nme=w+'x'+h;

alert(tt)
//Make the Artboard    
// =======================================================
var idMk = charIDToTypeID( "Mk  " );
    var desc510 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
    var ref39 = new ActionReference();
    var idartboardSection = stringIDToTypeID( "artboardSection" );
        ref39.putClass( idartboardSection );
    desc510.putReference( idnull, ref39 );
    var idlayerSectionStart = stringIDToTypeID( "layerSectionStart" );
    desc510.putInteger( idlayerSectionStart, 5 );
    var idlayerSectionEnd = stringIDToTypeID( "layerSectionEnd" );
    desc510.putInteger( idlayerSectionEnd, 6 );
    var idNm = charIDToTypeID( "Nm  " );
    desc510.putString( idNm, ""+nme+"" );
    
    var idartboardRect = stringIDToTypeID( "artboardRect" );
    var desc511 = new ActionDescriptor();
        
          var idTop = charIDToTypeID( "Top " );
                    desc511.putDouble( idTop, 0.000000 );
                    
                    var idLeft = charIDToTypeID( "Left" );
                    desc511.putDouble( idLeft, 0.000000);
                    
    
                    var idBtom = charIDToTypeID( "Btom" );
                    desc511.putDouble( idBtom, parseInt(hh)); //<--- Height
                    
                    var idRght = charIDToTypeID( "Rght" );
                    desc511.putDouble( idRght, parseInt(ww));//<--- Width
    
    var idclassFloatRect = stringIDToTypeID( "classFloatRect" );
    desc510.putObject( idartboardRect, idclassFloatRect, desc511 );
executeAction( idMk, desc510, DialogModes.NO );
    
   

//Change artboard default name    
 // =======================================================
var idsetd = charIDToTypeID( "setd" );
    var desc907 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref132 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref132.putEnumerated( idLyr, idOrdn, idTrgt );
    desc907.putReference( idnull, ref132 );
    var idT = charIDToTypeID( "T   " );
        var desc908 = new ActionDescriptor();
        var idNm = charIDToTypeID( "Nm  " );
    
        desc908.putString( idNm, ""+'xxx_'+'oooo'+'_'+nme+ "" ); //<-- artboard name
    
    
    var idLyr = charIDToTypeID( "Lyr " );
    desc907.putObject( idT, idLyr, desc908 );
executeAction( idsetd, desc907, DialogModes.NO );
    

//Space out artboard    
// =======================================================
var ideditArtboardEvent = stringIDToTypeID( "editArtboardEvent" );
    var desc95 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref12 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref12.putEnumerated( idLyr, idOrdn, idTrgt );
    desc95.putReference( idnull, ref12 );
    var idartboard = stringIDToTypeID( "artboard" );
        var desc96 = new ActionDescriptor();
        var idartboardRect = stringIDToTypeID( "artboardRect" );
            var desc97 = new ActionDescriptor();
    
            var idTop = charIDToTypeID( "Top " );
            desc97.putDouble( idTop, tt ); //<-- artboard y
    
            var idLeft = charIDToTypeID( "Left" );        
            desc97.putDouble( idLeft, 0.000000 );//<-- artboard x
           
          var idBtom = charIDToTypeID( "Btom" );
            desc97.putDouble( idBtom, hh );
    
            var idRght = charIDToTypeID( "Rght" );
            desc97.putDouble( idRght, ww );
       
    var idclassFloatRect = stringIDToTypeID( "classFloatRect" );
        desc96.putObject( idartboardRect, idclassFloatRect, desc97 );
        var idguideIDs = stringIDToTypeID( "guideIDs" );
            var list10 = new ActionList();
        desc96.putList( idguideIDs, list10 );
        var idartboardPresetName = stringIDToTypeID( "artboardPresetName" );
        desc96.putString( idartboardPresetName, ""+nme+"" );
        
    var idClr = charIDToTypeID( "Clr " );
            var desc98 = new ActionDescriptor();
            var idRd = charIDToTypeID( "Rd  " );
            desc98.putDouble( idRd, 255.000000 );
            var idGrn = charIDToTypeID( "Grn " );
            desc98.putDouble( idGrn, 255.000000 );
            var idBl = charIDToTypeID( "Bl  " );
            desc98.putDouble( idBl, 255.000000 );
        var idRGBC = charIDToTypeID( "RGBC" );
        desc96.putObject( idClr, idRGBC, desc98 );
        var idartboardBackgroundType = stringIDToTypeID( "artboardBackgroundType" );
    
        desc96.putInteger( idartboardBackgroundType, 3 ); //<-- artboardBackgroundType 1 = white, 2 = black, 3 = transparent 
    
    var idartboard = stringIDToTypeID( "artboard" );
    desc95.putObject( idartboard, idartboard, desc96 );
    var idchangeSizes = stringIDToTypeID( "changeSizes" );
    desc95.putInteger( idchangeSizes, 5 );
executeAction( ideditArtboardEvent, desc95, DialogModes.NO );

  
    oldHH =+ oldHH+parseInt(h+tt+20); //<-- calculate artboart y position (artboard height + pervious artboard height+20)
   
   
};


function makeshithappen(){
//banner sizes /,
var sizes = [[60,600],[225,265],[450,100],[478,235],[620,540],[620,540],[640,340],[640,340],[851,315],[900,200],[1200,628],[1200,717],[1242,250],[1260,420],[1350,300],[1434,220],[1474,180],[1500,500],[1800,400],[2500,350]];


var count=1;
var sizeW;
var sizeH;
for(var i = 0; i < sizes.length; i++) {
    
    var size = sizes[i];
    
    for(var j = 0; j < size.length; j++) {
    if(count==1){
    sizeW = size[j]; 
    }
    if(count==2){
    sizeH = size[j] ;
        createNewArtboard(sizeW,sizeH,(sizeH+sizeH),size);
    count=0;
    }
    count++
    }
}

}


  
    makeshithappen()  
    
