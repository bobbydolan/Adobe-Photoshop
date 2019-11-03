//A Javascript script fot setting the black point of an image.
//This displays the lower 25 values of the histogram for each of the RGB channels.
//The user then selects the lowest value in each channel that contains data.
//These values are then used in a Levels adjustment, in an Adjustment layer, to set the black point.


var redVal=0;
var greenVal =0;
var blueVal=0;


//First, Check that we have a document to work with

if ( documents.length > 0 )
{
	var docRef = activeDocument;
	var redHist = docRef.channels["Red"].histogram;
	var greenHist = docRef.channels["Green"].histogram;
	var blueHist = docRef.channels["Blue"].histogram;

//Now, we need a window to allow user interaction.
//We'll use a modal dialog, as this is all that Photoshop allows.

//Create dialog

var dlg = new Window('dialog', "Set Black Point",{x:100, y:100, width:800, height:400});

//Add a panel for the histogram data


dlg.histPnl = dlg.add( 'panel', {x:25, y:25, width:750, height:225}, 'Histogram');
dlg.histPnl.add('panel',{x:60, y:45, width:650, height:0},"");

//and some labels

for ( i=0;i<26;i++) {
	dlg.histPnl.add('statictext',{x:60+(i*25), y:25, width:20, height:15}, i);
	};

dlg.histPnl.add('statictext',{x:15, y:25, width:35, height:15},'Level:');
dlg.histPnl.add('statictext',{x:15, y:50, width:25, height:15},'  Red:');
dlg.histPnl.add('statictext',{x:15, y:100, width:35, height:15},'Green:');
dlg.histPnl.add('statictext',{x:15, y:150, width:25, height:15},' Blue:');

//and some value



for ( i=0;i<26;i++) {
	if (Math.floor(i/2)==i/2){	
	
	dlg.histPnl.r = dlg.histPnl.add('statictext',{x:60+(i*25), y:50, width:40, height:11}, redHist[i]);
	dlg.histPnl.r.graphics.font = ScriptUI.newFont("Arial Narrow","REGULAR",10); 
	dlg.histPnl.g = dlg.histPnl.add('statictext',{x:60+(i*25), y:100, width:40, height:11}, greenHist[i]);
	dlg.histPnl.g.graphics.font = ScriptUI.newFont("Arial Narrow","REGULAR",10); 
	dlg.histPnl.b = dlg.histPnl.add('statictext',{x:60+(i*25), y:150, width:40, height:11}, blueHist[i]);
	dlg.histPnl.b.graphics.font = ScriptUI.newFont("Arial Narrow","REGULAR",10); 
	};
else {
	dlg.histPnl.r = dlg.histPnl.add('statictext',{x:60+(i*25), y:62, width:40, height:11}, redHist[i]);
	dlg.histPnl.r.graphics.font = ScriptUI.newFont("Arial Narrow","REGULAR",10); 
	dlg.histPnl.g = dlg.histPnl.add('statictext',{x:60+(i*25), y:112, width:40, height:11}, greenHist[i]);
	dlg.histPnl.g.graphics.font = ScriptUI.newFont("Arial Narrow","REGULAR",10); 
	dlg.histPnl.b = dlg.histPnl.add('statictext',{x:60+(i*25), y:162, width:40, height:11}, blueHist[i]);
	dlg.histPnl.b.graphics.font = ScriptUI.newFont("Arial Narrow","REGULAR",10); 
	};
};
//Add some lables for the sliders
//redSldMinLbl = dlg.histPnl.add('statictext',[60,65,70,80],"0");

//and the sliders
redSld = dlg.histPnl.add('slider',{x:50, y:75, width:660, height:15},0,0,25);
greenSld = dlg.histPnl.add('slider',{x:50, y:125, width:660, height:15},0,0,25);
blueSld = dlg.histPnl.add('slider',{x:50, y:175, width:660, height:15},0,0,25);


//Another panel
dlg.blkptPnl = dlg.add( 'panel', {x:25, y:275, width:400, height:100}, 'Black point');

//and more labels
dlg.blkptPnl.add('statictext',{x:15, y:25, width:25, height:15},'  Red:');
dlg.blkptPnl.add('statictext',{x:15, y:45, width:35, height:15},'Green:');
dlg.blkptPnl.add('statictext',{x:15, y:65, width:25, height:15},' Blue:');

dlg.blkptPnl.add('statictext',{x:100, y:5, width:35, height:15}, 'Level');
dlg.blkptPnl.redLevel = dlg.blkptPnl.add('statictext',{x:115, y:25, width:35, height:15}, redVal);
dlg.blkptPnl.greenLevel = dlg.blkptPnl.add('statictext',{x:115, y:45, width:35, height:15}, greenVal);
dlg.blkptPnl.blueLevel = dlg.blkptPnl.add('statictext',{x:115, y:65, width:35, height:15}, blueVal);

dlg.blkptPnl.add('statictext',{x:200, y:5, width:35, height:15}, 'Count');
dlg.blkptPnl.redCount = dlg.blkptPnl.add('statictext',{x:215, y:25, width:35, height:15}, redHist[redVal]);
dlg.blkptPnl.greenCount = dlg.blkptPnl.add('statictext',{x:215, y:45, width:35, height:15}, greenHist[greenVal]);
dlg.blkptPnl.blueCount = dlg.blkptPnl.add('statictext',{x:215, y:65, width:35, height:15}, blueHist[blueVal]);

dlg.blkptPnl.add('statictext',{x:275, y:5, width:100, height:15}, 'Cumulative Count');
dlg.blkptPnl.redCumCount = dlg.blkptPnl.add('statictext',{x:315, y:25, width:70, height:15}, accumulate(redHist, redVal));
dlg.blkptPnl.greenCumCount = dlg.blkptPnl.add('statictext',{x:315, y:45, width:70, height:15}, accumulate(greenHist, greenVal));
dlg.blkptPnl.blueCumCount = dlg.blkptPnl.add('statictext',{x:315, y:65, width:70, height:15}, accumulate(blueHist, blueVal));

//add buttons

dlg.SetBlkPtBtn = dlg.add("button",{x:500,y:350,width:100,height:25},"Set black point");
dlg.CancelBtn = dlg.add("button",{x:650,y:350,width:100,height:25},"Cancel");

// Define behavior for when the slider value changes
redSld.onChanging = function() 
{
	redVal = Math.round(redSld.value);
// Update the label text with the current slider value.
	dlg.blkptPnl.redLevel.text = redVal;
	dlg.blkptPnl.redCount.text = redHist[redVal];
	dlg.blkptPnl.redCumCount.text = accumulate(redHist, redVal);
};
greenSld.onChanging = function() 
{
	greenVal = Math.round(greenSld.value);
// Update the label text with the current slider value.
	dlg.blkptPnl.greenLevel.text = greenVal;
	dlg.blkptPnl.greenCount.text = greenHist[greenVal];
	dlg.blkptPnl.greenCumCount.text = accumulate(greenHist, greenVal);
};
blueSld.onChanging = function() 
{
	blueVal = Math.round(blueSld.value);
// Update the label text with the current slider value.
	dlg.blkptPnl.blueLevel.text = blueVal;
	dlg.blkptPnl.blueCount.text = blueHist[blueVal];
	dlg.blkptPnl.blueCumCount.text = accumulate(blueHist, blueVal);
};

// Register event listeners that define the button behavior
	dlg.SetBlkPtBtn.onClick = function() {
		var id53 = charIDToTypeID( "Mk  " );
    var desc13 = new ActionDescriptor();
    var id54 = charIDToTypeID( "null" );
        var ref9 = new ActionReference();
        var id55 = charIDToTypeID( "AdjL" );
        ref9.putClass( id55 );
    desc13.putReference( id54, ref9 );
    var id56 = charIDToTypeID( "Usng" );
        var desc14 = new ActionDescriptor();
        var id57 = charIDToTypeID( "Type" );
            var desc15 = new ActionDescriptor();
            var id58 = charIDToTypeID( "Adjs" );
                var list8 = new ActionList();
                    var desc16 = new ActionDescriptor();
                    var id59 = charIDToTypeID( "Chnl" );
                        var ref10 = new ActionReference();
                        var id60 = charIDToTypeID( "Chnl" );
                        var id61 = charIDToTypeID( "Chnl" );
                        var id62 = charIDToTypeID( "Rd  " );
                        ref10.putEnumerated( id60, id61, id62 );
                    desc16.putReference( id59, ref10 );
                    var id63 = charIDToTypeID( "Inpt" );
                        var list9 = new ActionList();
                        list9.putInteger( redVal );
                        list9.putInteger( 255 );
                    desc16.putList( id63, list9 );
                var id64 = charIDToTypeID( "LvlA" );
                list8.putObject( id64, desc16 );
                    var desc17 = new ActionDescriptor();
                    var id65 = charIDToTypeID( "Chnl" );
                        var ref11 = new ActionReference();
                        var id66 = charIDToTypeID( "Chnl" );
                        var id67 = charIDToTypeID( "Chnl" );
                        var id68 = charIDToTypeID( "Grn " );
                        ref11.putEnumerated( id66, id67, id68 );
                    desc17.putReference( id65, ref11 );
                    var id69 = charIDToTypeID( "Inpt" );
                        var list10 = new ActionList();
                        list10.putInteger( greenVal );
                        list10.putInteger( 255 );
                    desc17.putList( id69, list10 );
                var id70 = charIDToTypeID( "LvlA" );
                list8.putObject( id70, desc17 );
                    var desc18 = new ActionDescriptor();
                    var id71 = charIDToTypeID( "Chnl" );
                        var ref12 = new ActionReference();
                        var id72 = charIDToTypeID( "Chnl" );
                        var id73 = charIDToTypeID( "Chnl" );
                        var id74 = charIDToTypeID( "Bl  " );
                        ref12.putEnumerated( id72, id73, id74 );
                    desc18.putReference( id71, ref12 );
                    var id75 = charIDToTypeID( "Inpt" );
                        var list11 = new ActionList();
                        list11.putInteger( blueVal );
                        list11.putInteger( 255 );
                    desc18.putList( id75, list11 );
                var id76 = charIDToTypeID( "LvlA" );
                list8.putObject( id76, desc18 );
            desc15.putList( id58, list8 );
        var id77 = charIDToTypeID( "Lvls" );
        desc14.putObject( id57, id77, desc15 );
    var id78 = charIDToTypeID( "AdjL" );
    desc13.putObject( id56, id78, desc14 );
executeAction( id53, desc13, DialogModes.NO );

// =======================================================
var id79 = charIDToTypeID( "setd" );
    var desc19 = new ActionDescriptor();
    var id80 = charIDToTypeID( "null" );
        var ref13 = new ActionReference();
        var id81 = charIDToTypeID( "Lyr " );
        var id82 = charIDToTypeID( "Ordn" );
        var id83 = charIDToTypeID( "Trgt" );
        ref13.putEnumerated( id81, id82, id83 );
    desc19.putReference( id80, ref13 );
    var id84 = charIDToTypeID( "T   " );
        var desc20 = new ActionDescriptor();
        var id85 = charIDToTypeID( "Nm  " );
        desc20.putString( id85, "Black point" );
    var id86 = charIDToTypeID( "Lyr " );
    desc19.putObject( id84, id86, desc20 );
executeAction( id79, desc19, DialogModes.NO );
dlg.close();

	};
	dlg.CancelBtn.onClick = function() {
		dlg.close();
	};

function overRange(x) {
	if (x>99999){
		return("****");
		};
	else {
		return (x)
		};
	};

function accumulate(myArray,myIndex){
	var sum = 0;
	for (i=0; i < myIndex+1 ; i++) {
		sum = sum + myArray[i];
		};
	return(sum);
	};


dlg.show();
//and show it

};
else
{
	alert ("There is no document open");
};