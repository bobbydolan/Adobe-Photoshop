// Save the current preferences
var startRulerUnits = app.preferences.rulerUnits
var startTypeUnits = app.preferences.typeUnits
var startDisplayDialogs = app.displayDialogs
// Set Adobe Photoshop CS3 to use pixels and display no dialogs
app.preferences.rulerUnits = Units.PIXELS
app.preferences.typeUnits = TypeUnits.PIXELS
app.displayDialogs = DialogModes.NO
var im=app.activeDocument
var startbits=im.bitsPerChannel
var startmode=im.mode


if (startbits != BitsPerChannelType.SIXTEEN) {
	im.bitsPerChannel = BitsPerChannelType.SIXTEEN
}
if (startmode != DocumentMode.RGB) {
	im.mode = DocumentMode.RGB
}

doAction('Layers', 'Frequency')
if (im.mode != startmode) { im.mode=startmode }
if (im.bitsPerChannel != startbits) { im.bitsPerChannel = startbits }


// Reset the application preferences
preferences.rulerUnits = startRulerUnits
preferences.typeUnits = startTypeUnits
displayDialogs = startDisplayDialogs