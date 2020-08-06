// 12/2007
// Hacked from Fit Image by John McAssey
// Written by Ed Rose
// based on the ADM Fit Image by Charles A. McBrian from 1997


/* Special properties for a JavaScript to enable it to behave like an automation plug-in, the variable name must be exactly
   as the following example and the variables must be defined in the top 1000 characters of the file

// BEGIN__HARVEST_EXCEPTION_ZSTRING

<javascriptresource>
<name>$$$/JavaScripts/LongSidePrintLength/Name=Long Side Print Length...</name>
<about>$$$/JavaScripts/LongSidePrintLength/About=Long Side Print Length Plug-in Version 0.0 Hack by John Mcassey Quality forget about it.</about>
<menu>automate</menu>
<category>JJMack's</category>
<enableinfo>true</enableinfo>
<eventid>3caa3434-cb67-11d1-bc43-0060b0a13dc6</eventid>
<terminology><![CDATA[<< /Version 1
                         /Events <<
                          /3caa3434-cb67-11d1-bc43-0060b0a13dc6 [($$$/AdobePlugin/LongSidePrintLength/Name=Long Side Print Length) /imageReference <<
                               /length [($$$/AdobePlugin/LongSidePrintLength/Length=length) /pixelsUnit]
                          >>]
                         >>
                      >> ]]></terminology>
</javascriptresource>
// Using the same eventid broke the resize function of the Image Processor so I changed the last 4 to 5
// END__HARVEST_EXCEPTION_ZSTRING

*/

// enable double clicking from the Macintosh Finder or the Windows Explorer
#target photoshop

// debug level: 0-2 (0:disable, 1:break on error, 2:break at beginning)
// $.level = 1;
// debugger; // launch debugger on next line

// on localized builds we pull the $$$/Strings from a .dat file, see documentation for more details
$.localize = true;

var isCancelled = true; // assume cancelled until actual resize occurs

// the main routine
// the LongSidePrintLength object does most of the work
try {
	
	GlobalVariables();
	CheckVersion();
	
	// create our default params
	var lengthInfo = new LengthInfo();

	var gIP = new LongSidePrintLength();

	if ( DialogModes.ALL == app.playbackDisplayDialogs ) {
		gIP.CreateDialog();
		gIP.RunDialog();
	}
	else {
		gIP.InitVariables();
		ResizeTheImage(lengthInfo.length.value);
	}
	
	if (!isCancelled) {
		SaveOffParameters(lengthInfo);
	}

}

// Lot's of things can go wrong
// Give a generic alert and see if they want the details
catch( e ) {
	if ( DialogModes.NO != app.playbackDisplayDialogs ) {
		alert( e + " : " + e.line );
	}
}

// restore the dialog modes
app.displayDialogs = gSaveDialogMode;

isCancelled ? 'cancel' : undefined;

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

function ResizeTheImage(length) {
	// This is a DPI change only no resampling is done
	// prepare the ruler

	var oldUnit = app.preferences.rulerUnits;
	app.preferences.rulerUnits = Units.PIXELS;

	if (activeDocument.width > activeDocument.height) {
		activeDocument.resizeImage(null, null, activeDocument.width/length, ResampleMethod.NONE); }
	else {
		activeDocument.resizeImage(null, null, activeDocument.height/length, ResampleMethod.NONE); }

	// restore the ruler to whatever unit it was in
	app.preferences.rulerUnits = oldUnit;

	isCancelled = false; // if get here, definitely executed
	return false; // no error
}

// created in
function SaveOffParameters(lengthInfo) {

	// save off our last run parameters
	//var d = objectToDescriptor(lengthInfo);
	//d.putString( app.charIDToTypeID( 'Msge' ), strMessage );
	var d =	objectToDescriptor(lengthInfo, strMessage);
	app.putCustomOptions("8090f848-cc6b-44a2-ae17-fbe01d5b963b", d);

	app.playbackDisplayDialogs = DialogModes.ALL;

	// save off another copy so Photoshop can track them corectly
	//var dd = objectToDescriptor(lengthInfo);
	//dd.putString( app.charIDToTypeID( 'Msge' ), strMessage );
	var dd = objectToDescriptor(lengthInfo, strMessage);
	app.playbackParameters = dd;
}

function GlobalVariables() {

	// a version for possible expansion issues
	gVersion = 1;
	
	// remember the dialog modes
	gSaveDialogMode = app.displayDialogs;
	app.displayDialogs = DialogModes.NO;

	// all the strings that need to be localized
	strTitle = localize( "$$$/JavaScript/LongSidePrintLength/Title=Long Side Print Length" );
	strConstrainWithin = localize( "$$$/JavaScript/LongSidePrintLength/ConstrainWithin=Constrain Within" );
	strTextLength = localize("$$$/JavaScripts/LongSidePrintLength/Length=&length:");
	strTextPixels = localize("$$$/JavaScripts/LongSidePrintLength/Pixels=pixels");
	strButtonOK = localize("$$$/JavaScripts/LongSidePrintLength/OK=OK");
	strButtonCancel = localize("$$$/JavaScripts/LongSidePrintLength/Cancel=Cancel");
	strTextSorry = localize("$$$/JavaScripts/LongSidePrintLength/Sorry=Sorry, Dialog failed");
	strTextInvalidType = localize("$$$/JavaScripts/LongSidePrintLength/InvalidType=Invalid numeric value");
	strTextInvalidNum = localize("$$$/JavaScripts/LongSidePrintLength/InvalidNum=A number between 1 and 300 is required. Closest value inserted.");
	strTextNeedFile = localize("$$$/JavaScripts/LongSidePrintLength/NeedFile=You must have a file selected before using Long Side Print Length");
	strMessage = localize("$$$/JavaScripts/LongSidePrintLength/Message=Long Side Print Length action settings");
 	strMustUse = localize( "$$$/JavaScripts/ImageProcessor/MustUse=You must use Photoshop CS 3 or later to run this script!" );
	strHelpLNTH = localize( "$$$/JavaScripts/AspectRatioSelection/LNTH=Image long side print length" );
}


// the main class
function LongSidePrintLength() {

	this.CreateDialog = function() {
	
		// I will keep most of the important dialog items at the same level
		// and use auto layout
		// use overriding group so OK/Cancel buttons placed to right of panel
		var res =
			"dialog { \
				pAndB: Group { orientation: 'row', \
					info: Panel { orientation: 'column', borderStyle: 'sunken', \
						text: '" + strConstrainWithin +"', \
						helpTip: '" + strHelpLNTH + "',\
						l: Group { orientation: 'row', alignment: 'right',\
							s: StaticText { text:'" + strTextLength +"' }, \
							e: EditText { preferredSize: [70, 20] }, \
							p: StaticText { text:'" + "'} \
						} \
					}, \
					buttons: Group { orientation: 'column', alignment: 'top',  \
						okBtn: Button { text:'" + strButtonOK +"', properties:{name:'ok'} }, \
						cancelBtn: Button { text:'" + strButtonCancel + "', properties:{name:'cancel'} } \
					} \
				} \
			}";
		
		// the following, when placed after e: in l doesn't show up
		// this seems to be OK since px is put inside the dialog box
		//p: StaticText { text:'" + strTextPixels + "'}

		// create the main dialog window, this holds all our data
		this.dlgMain = new Window(res,strTitle);

		// create a shortcut for easier typing
		var d = this.dlgMain;

		d.defaultElement = d.pAndB.buttons.okBtn;
		d.cancelElement = d.pAndB.buttons.cancelBtn;
	} // end of CreateDialog
	
	// initialize variables of dialog
	this.InitVariables = function() {

		var oldPref = app.preferences.rulerUnits;

		app.preferences.rulerUnits = Units.PIXELS;

		// look for last used params via Photoshop registry, getCustomOptions will throw if none exist
		try {
			var desc = app.getCustomOptions("8090f848-cc6b-44a2-ae17-fbe01d5b963b");
			descriptorToObject(lengthInfo, desc, strMessage);
		}
		catch(e) {
			// it's ok if we don't have any options, continue with defaults
		}

		// see if I am getting descriptor parameters
		descriptorToObject(lengthInfo, app.playbackParameters, strMessage);

		// make sure got parameters before this
		if (app.documents.length <= 0) // count of documents viewed
		{
			if ( DialogModes.NO != app.playbackDisplayDialogs ) {
				alert(strTextNeedFile); // only put up dialog if permitted
			}
			app.preferences.rulerUnits = oldPref;
			return false; // if no docs, always return
		}

		l = lengthInfo.length;

		app.preferences.rulerUnits = oldPref;

		if ( DialogModes.ALL == app.playbackDisplayDialogs ) {
			var d = this.dlgMain;
			d.ip = this;

			d.pAndB.info.l.e.text = Number(l);
		}
		return true;
	}

	// routine for running the dialog and it's interactions
	this.RunDialog = function () {
		var d = this.dlgMain;

		// in case hit cancel button, don't close
		d.pAndB.buttons.cancelBtn.onClick = function() {
			var dToCancel = FindDialog( this );
			dToCancel.close( false );
		}

		// nothing for now
		d.onShow = function() {
		}

		// do not allow anything except for numbers 0-9
		d.pAndB.info.l.e.addEventListener ('keydown', NumericEditKeyboardHandler);



		// hit OK, do resize
		d.pAndB.buttons.okBtn.onClick = function () {	

			var lText = d.pAndB.info.l.e.text;
			var l = Number(lText);
			var inputErr = false;

			if ( isNaN( l ) ) {
				if ( DialogModes.NO != app.playbackDisplayDialogs ) {
					alert( strTextInvalidType );
				}
				if (isNaN( l )) {
					lengthInfo.length = new UnitValue( 1, "px" );
					d.pAndB.info.l.e.text = 1;
				}
				return false;
			}
			else if ( l < 1) {
				inputErr = true;
				lengthInfo.length = new UnitValue( 1, "px" );
				d.pAndB.info.l.e.text = 1;
			}
			else if ( l > 300) {
				inputErr = true;
				lengthInfo.length = new UnitValue( 300, "px" );
				d.pAndB.info.l.e.text = 300;
			}

			if (inputErr) {
				if ( DialogModes.NO != app.playbackDisplayDialogs ) {
					alert( strTextInvalidNum );
				}
				return false;
			}
			lengthInfo.length = new UnitValue( l, "px" );

			if (ResizeTheImage(l)) { // the whole point
				// error, input or output size too small
			}
			d.close(true);
			return;
		}

		if (!this.InitVariables())
		{
			return true; // handled it
		}

		// give the hosting app the focus before showing the dialog
		app.bringToFront();

		this.dlgMain.center();
		
		return d.show();
	}
}


function CheckVersion() {
	var numberArray = version.split(".");
	if ( numberArray[0] < 10 ) {
		if ( DialogModes.NO != app.playbackDisplayDialogs ) {
			alert( strMustUse );
		}
		throw( strMustUse );
	}
}

function FindDialog( inItem ) {
	var l = inItem;
	while ( 'dialog' != l.type ) {
		if ( undefined == l.parent ) {
			l = null;
			break;
		}
		l = l.parent;
	}
	return l;
}



///////////////////////////////////////////////////////////////////////////////
// Function: objectToDescriptor
// Usage: create an ActionDescriptor from a JavaScript Object
// Input: JavaScript Object (o)
//        object unique string (s)
//        Pre process converter (f)
// Return: ActionDescriptor
// NOTE: Only boolean, string, number and UnitValue are supported, use a pre processor
//       to convert (f) other types to one of these forms.
// REUSE: This routine is used in other scripts. Please update those if you
//        modify. I am not using include or eval statements as I want these
//        scripts self contained.
///////////////////////////////////////////////////////////////////////////////
function objectToDescriptor (o, s, f) {
	if (undefined != f) {
		o = f(o);
	}

	var d = new ActionDescriptor;
	var l = o.reflect.properties.length;
	d.putString( app.charIDToTypeID( 'Msge' ), s );
	for (var i = 0; i < l; i++ ) {
		var k = o.reflect.properties[i].toString();
		if (k == "__proto__" || k == "__count__" || k == "__class__" || k == "reflect")
			continue;
		var v = o[ k ];
		k = app.stringIDToTypeID(k);
		switch ( typeof(v) ) {
			case "boolean":
				d.putBoolean(k, v);
				break;
			case "string":
				d.putString(k, v);
				break;
			case "number":
				d.putDouble(k, v);
				break;
			default:
			{
				if ( v instanceof UnitValue ) {
					var uc = new Object;
					uc["px"] = charIDToTypeID("#Pxl"); // pixelsUnit
					uc["%"] = charIDToTypeID("#Prc"); // unitPercent
					d.putUnitDouble(k, uc[v.type], v.value);
				} else {
					throw( new Error("Unsupported type in objectToDescriptor " + typeof(v) ) );
				}
			}
		}
	}
    return d;
}

///////////////////////////////////////////////////////////////////////////////
// Function: descriptorToObject
// Usage: update a JavaScript Object from an ActionDescriptor
// Input: JavaScript Object (o), current object to update (output)
//        Photoshop ActionDescriptor (d), descriptor to pull new params for object from
//        object unique string (s)
//        JavaScript Function (f), post process converter utility to convert
// Return: Nothing, update is applied to passed in JavaScript Object (o)
// NOTE: Only boolean, string, number and UnitValue are supported, use a post processor
//       to convert (f) other types to one of these forms.
// REUSE: This routine is used in other scripts. Please update those if you
//        modify. I am not using include or eval statements as I want these
//        scripts self contained.
///////////////////////////////////////////////////////////////////////////////

function descriptorToObject (o, d, s, f) {
	var l = d.count;
	if (l) {
	    var keyMessage = app.charIDToTypeID( 'Msge' );
        if ( d.hasKey(keyMessage) && ( s != d.getString(keyMessage) )) return;
	}
	for (var i = 0; i < l; i++ ) {
		var k = d.getKey(i); // i + 1 ?
		var t = d.getType(k);
		strk = app.typeIDToStringID(k);
		switch (t) {
			case DescValueType.BOOLEANTYPE:
				o[strk] = d.getBoolean(k);
				break;
			case DescValueType.STRINGTYPE:
				o[strk] = d.getString(k);
				break;
			case DescValueType.DOUBLETYPE:
				o[strk] = d.getDouble(k);
				break;
			case DescValueType.UNITDOUBLE:
				{
				var uc = new Object;
				uc[charIDToTypeID("#Rlt")] = "px"; // unitDistance
				uc[charIDToTypeID("#Prc")] = "%"; // unitPercent
				uc[charIDToTypeID("#Pxl")] = "px"; // unitPixels
				var ut = d.getUnitDoubleType(k);
				var uv = d.getUnitDoubleValue(k);
				o[strk] = new UnitValue( uv, uc[ut] );
				}
				break;
			case DescValueType.INTEGERTYPE:
			case DescValueType.ALIASTYPE:
			case DescValueType.CLASSTYPE:
			case DescValueType.ENUMERATEDTYPE:
			case DescValueType.LISTTYPE:
			case DescValueType.OBJECTTYPE:
			case DescValueType.RAWTYPE:
			case DescValueType.REFERENCETYPE:
			default:
				throw( new Error("Unsupported type in descriptorToObject " + t ) );
		}
	}
	if (undefined != f) {
		o = f(o);
	}
}


///////////////////////////////////////////////////////////////////////////////
// Function: LengthInfo
// Usage: object for holding the dialog parameters
// Input: <none>
// Return: object holding the size info
///////////////////////////////////////////////////////////////////////////////
function LengthInfo() {
	this.length = new UnitValue(0, "px");
}

///////////////////////////////////////////////////////////////////////////////
// Function: NumericEditKeyboardHandler
// Usage: Do not allow anything except for numbers 0-9
// Input: ScriptUI keydown event
// Return: <nothing> key is rejected and beep is sounded if invalid
///////////////////////////////////////////////////////////////////////////////
function NumericEditKeyboardHandler (event) {

    try {

        var keyIsOK = KeyIsNumeric (event) ||
					  KeyIsDelete (event) ||
					  KeyIsLRArrow (event) ||
					  KeyIsTabEnterEscape (event);



        if (! keyIsOK) {
            //    Bad input: tell ScriptUI not to accept the keydown event
            event.preventDefault();

            /*    Notify user of invalid input: make sure NOT
			       to put up an alert dialog or do anything which
		                 requires user interaction, because that
		                 interferes with preventing the 'default'
		                 action for the keydown event */
            app.beep();
        }
    }
    catch (e) {
        ; // alert ("Ack! bug in NumericEditKeyboardHandler: " + e);
    }
}

//    key identifier functions
function KeyHasModifier (event) {
    return event.shiftKey || event.ctrlKey || event.altKey || event.metaKey;
}

function KeyIsNumeric (event) {
    return  (event.keyName >= '0') && (event.keyName <= '9') && ! KeyHasModifier (event);
}

function KeyIsDelete (event) {
    //    Shift-delete is ok
    return ((event.keyName == 'Backspace') || (event.keyName == 'Delete')) && ! (event.ctrlKey);
}

function KeyIsLRArrow (event) {
    return ((event.keyName == 'Left') || (event.keyName == 'Right')) && ! (event.altKey || event.metaKey);
}

function KeyIsTabEnterEscape (event) {
	return event.keyName == 'Tab' || event.keyName == 'Enter' || event.keyName == 'Escape';
}

// End LongSidePrintLength.jsx
