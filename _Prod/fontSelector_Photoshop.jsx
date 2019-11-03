/* 
	FontSelector.jsxinc
	
	Simple font selector, see http://nubinubi.nu.funpic.de/ for further information and example usage
	
	2007-12-22
*/

// constructor
function FontSelector(fontCollection, scriptUiFontsOnly)  // 2nd parameter is optional
{
	this.previewFontSize = 48 // ... but preview panel height is hard-coded!
	this.fontCollection = fontCollection // this would be app.fonts
	this.groupedFontList = null // array of arrays
	this.selected = null // font object
	this.scriptUiFontsOnly = (scriptUiFontsOnly) ? scriptUiFontsOnly : false
	this.buildGroupedFontList()	
}

// build gui
FontSelector.prototype.prepareDialog = function()
{
	
	var myResource = "dialog{ \
		orientation: 'column',\
		alignChildren: 'fill',\
		panelFontFamily: Panel  {\
			orientation: 'row',\
			s1: StaticText {text: 'Font family:', characters: 12 },\
			d1: DropDownList { alignment: ['fill', 'fill'] }\
		},\
		panelFontStyle: Panel  {\
			orientation: 'row',\
			alignChildren: 'fill',\
			s1: StaticText {text: 'Font style:' , characters: 12 },\
			d1: DropDownList { alignment: ['fill', 'fill'] , enabled: false}\
		},\
		panelPreview: Panel  {\
			orientation: 'row',\
			text: 'Preview',\
			s1: StaticText {text: ' ' , alignment: ['fill', 'fill'], preferredSize: [, 60] }\
		},\
		groupButtons: Group  {\
			orientation: 'row',\
			buttonOk: Button { text: 'OK', enabled: 'false'},\
			buttonCancel: Button { text: 'Cancel'},\
		}\
	};"
	var myDialog = new Window(myResource)
	myDialog.fontSelectorInstance = this // dialog needs a reference to FontSelector instance
	
	// determines return value and keyboard shortcuts
	myDialog.defaultElement = myDialog.groupButtons.buttonOk // == return value 1
	myDialog.cancelElement = myDialog.groupButtons.buttonCancel

	// populate font family dropdown list
	this.GuiAddFontFamilyItems(myDialog.panelFontFamily.d1, this.groupedFontList)

	myDialog.panelFontFamily.d1.onChange = function()
	{
		// populate style dropdown list
		var fontFamilyGroup = this.parent.parent.fontSelectorInstance.getFamilyGroup(this.selection.text)
		if (fontFamilyGroup)
		{
			this.parent.parent.fontSelectorInstance.GuiAddFontStyleItems(myDialog.panelFontStyle.d1, fontFamilyGroup)
			myDialog.panelFontStyle.d1.notify() // that is, automatic selection at this point
			myDialog.panelFontStyle.d1.enabled = true
		}
	}
	
	// update preview on selection
	myDialog.panelFontStyle.d1.onChange = function()
	{
		if (this.selection == null) return
		
		var fontname = this.parent.parent.panelFontFamily.d1.selection.text
		var fontstyle = this.selection.text

		// only update font preview panel at this point
		
		try {
			var previewPanel = this.parent.parent.panelPreview			
			previewPanel.s1.text = 'abcABC123'
			previewPanel.s1.graphics.font = ScriptUI.newFont(fontname, fontstyle, this.parent.parent.fontSelectorInstance.previewFontSize)
		}
		catch (e)
		{
			previewPanel.s1.graphics.font = ScriptUI.newFont("Arial", "Regular", 14) // FIXME
			previewPanel.s1.text = 'No preview available for this font.'
		}

		this.parent.parent.groupButtons.buttonOk.enabled = true	
	}

	// set up dialog to reflect font pre-selection
	if (this.selected != null)
	{
		var dropDownItem = myDialog.panelFontFamily.d1.find(this.selected.family)
		if (dropDownItem != null)
		{
			myDialog.panelFontFamily.d1.selection = dropDownItem
			
			var dropdownItemStyle = myDialog.panelFontStyle.d1.find(this.selected.style)
			if (dropdownItemStyle != null) myDialog.panelFontStyle.d1.selection = dropdownItemStyle
			myDialog.panelFontStyle.d1.notify()
		}
	}

	return myDialog
}

// select interactively; this is a public method
FontSelector.prototype.askUser = function()	
{
	var myDialog = this.prepareDialog()
	var result = myDialog.show()
	var notCanceled = (result == 1) ? true : false
	
	var newSelection = null
	if (notCanceled)
	{
		var fontfamily = myDialog.panelFontFamily.d1.selection.text
		var fontstyle = myDialog.panelFontStyle.d1.selection.text
		newSelection = this.getFont(fontfamily, fontstyle)
		this.selected = newSelection
	}

	return (newSelection != null)
}


// build the custom fonts data structure the class is based on
FontSelector.prototype.buildGroupedFontList = function()
{
	var fonts = this.fontCollection
	var fontlist = new Array()

	if (fonts == null) return fontlist
	
	var familyFonts = null
	var lastFamily = null
	
	for (i=0; i<fonts.length; i++)
	{
		var font = fonts[i]
		if (font.family != lastFamily)
		{
			if ((familyFonts != null) && (familyFonts.length > 0))  fontlist.push(familyFonts)
			familyFonts = new Array()
			lastFamily = font.family
		}
		// font gets added to collection here
		if ((font.postScriptName != null) && (font.postScriptName  != "")  )
		{
			try
			{
				if (this.scriptUiFontsOnly)
				{
					// dirty hack: if exception is thrown font does not qualify to be included
					ScriptUI.newFont(font.family, font.style, 12)
				}
				familyFonts.push(font)
			}
			catch (e) { }
		}
	} // /for

	if ((familyFonts != null) && (familyFonts.length > 0))
	{
		fontlist.push(familyFonts)
	}
	
	this.groupedFontList = fontlist
}

// some ways to find fonts

FontSelector.prototype. getFamilyGroup = function(familyName)
{
	for (i = 0; i<this.groupedFontList.length; i++)
	{
		var fontFamilyGroup = this.groupedFontList[i]
		if (fontFamilyGroup[0].family == familyName) return fontFamilyGroup
	}

	return null
}


FontSelector.prototype.getFontByName = function(name)
{
	if (this.fontCollection == null ) return null	
	for (i=0; i<this.fontCollection.length; i++)
	{
		var font = this.fontCollection[i]
		if (font.name == name)
			return font
	}
	return null
}
FontSelector.prototype.getFontByPsName = function(name)
{
	if (this.fontCollection == null ) return null
	for (i=0; i<this.fontCollection.length; i++)
	{
		var font = this.fontCollection[i]
		if (font.postScriptName == name)
			return font
	}
	return null
}

FontSelector.prototype.getFont = function(family, style)
{
	if (this.fontCollection == null ) return null	
	for (i=0; i<this.fontCollection.length; i++)
	{
		var font = this.fontCollection[i]
		if ((font.family == family) && (font.style == style))
			return font
	}
	return null
}

// some ways to select a font, these are public methods

FontSelector.prototype.selectByName = function(name)
{
	this.selected = this.getFontByName(name)
}
FontSelector.prototype.selectByPsName = function(name)
{
	this.selected = this.getFontByPsName(name)
}

FontSelector.prototype.select = function(family, style)
{
	this.selected = this.getFont(family, style)
}

FontSelector.prototype.isSelected = function()
{
	return (this.selected != null)
}

// Gui helper

FontSelector.prototype.GuiAddFontFamilyItems = function(dropdownlist, groupedFontList)
{
	if ((dropdownlist == null) || (groupedFontList == null )) return
	for (i = 0; i<groupedFontList.length; i++)
	{
		var fontFamilyGroup = groupedFontList[i]
		dropdownlist.add('item', fontFamilyGroup[0].family) // safe; there's always at least one entry if group exists
	}
}

FontSelector.prototype.GuiAddFontStyleItems = function(dropdownlist, fontFamilyGroup)
{
	if ((dropdownlist == null) || (fontFamilyGroup == null )) return	
	dropdownlist.removeAll()
	for (i = 0; i<fontFamilyGroup.length; i++)
	{
		var font = fontFamilyGroup[i]
		dropdownlist.add('item', font.style)
	}
	dropdownlist.selection = dropdownlist.items[0]
}



var storedFontPsName = 'Arial-Black' 

var fontSelector = new FontSelector(app.fonts)
fontSelector.selectByPsName(storedFontPsName)

var success = fontSelector.askUser()

if (success)
{
   var textFont = fontSelector.selected
   alert("Selected font: \"" + textFont.name + "\" (PS: \"" + textFont.postScriptName + "\"), which is of family \""
      + textFont.family + "\" and style \"" + textFont.style + "\".")
} 