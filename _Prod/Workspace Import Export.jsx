// copyright 2010 Adobe Systems, Inc. All rights reserved.
// Written by Tai Luxon

/*
@@@BUILDINFO@@@ Workspace Import Export.jsx 1.0.5
*/
/*

<javascriptresource>
<name>Import/Export Workspaces...</name>
<category>workspaces</category>
</javascriptresource>


A few notes about this script:

Exporting:
- Allows exporting custom workspaces, but not presets
- Can choose to export either the original state that the workspace was created in or the
  current/last saved state (will save the current workspace before export if you're exporting it)

Importing:
- Prevents importing workspaces with the same names as preset workspaces (filename or display name)
- Allows you to overwrite custom workspaces after asking you
- Handled importing over the current workspace
- Reloads the workspace list after importing
- Does not verify that files are valid or compatible workspace files when importing

Localization
- Should work in localized builds, but UI of the script is not localized itself
- In localized builds, we can't prevent importing a workspace that conflicts with the localized
  name of a "deleted" preset workspace

Version Compatibility
- Written for CS5. Should mostly work in CS4 (maybe earlier), but has some shortcomings (e.g. won't
  reload workspace list after import - tells you to relaunch instead)

*/

// enable double clicking from the Macintosh Finder or the Windows Explorer
#target photoshop

var gAppMajorVersion = 0;

function main()
	{
	// Make sure we are in Photoshop
	if (app.name != "Adobe Photoshop")
		{
		alert ("This sript was written for Adobe Photoshop CS5 or newer.");
		return;
		}
	
	
	// Get the app version so we can run in older versions
	gAppMajorVersion = app.version.split(".", 1)[0];
	
	
	// Create and show the dialog
    var dlg = CreateDialog();
    
    dlg.show();
	}


// Creates the import/export dialog
function CreateDialog ()
    {
	// create the main dialog window
	var d = new Window( 'dialog', "Import/Export Workspaces" );
	
	SetDialogFGBGColors (d);
	
	
	// Create a tabbed panel for the Export and Import tabs to reside in
	d.tabbedPanel = d.add("tabbedpanel");
	d.tabbedPanel.onChange = function () { TCWrap(HandleTabChanged, d, true); }
	
	
	// Add the tabs w/ their content
	AddExportTab(d);
	AddImportTab(d);
	
	
	// Add group for Done/Import/Export buttons below the tabbed panel
	var okg = d.okCancelButtonGroup = d.add ('group');
	okg.orientation = 'row';
	okg.alignment = ['right', 'bottom'];
	
	
	// Add the Done Button
	d.btnDone = okg.add ('button', undefined, "Done");
	d.btnDone.onClick = function() { d.close(false); }
	d.cancelElement = d.btnDone;
	

	// Get the export button installed
	HandleTabChanged(d);
	
	
	return d;
    }

// Add the Export tab to the dialog
function AddExportTab(dialog)
	{
	// create a shortcut for easier typing
	var d = dialog;
	
	// Add the tab itself
	var et = d.exportTab = d.tabbedPanel.add('tab');
	et.text = 'Export';
	et.alignment = 'fill';
	
	
	// Add a panel for selecting which workspaces will be exported
	d.selectWSPanel = et.add ('panel');
	d.selectWSPanel.text = 'Workspaces';
	d.selectWSPanel.alignment = 'fill'
	
	// REVISIT: increase it's top margin cause it looks funky otherwise.
	var margins = d.selectWSPanel.margins;
	margins[1] = margins[1] + 10;
	d.selectWSPanel.margins = margins;

	
	// Add a checkbox for each user workspace.
	d.wsList = GetWorkspaceList(true, false);
	AddWorkspaceCheckboxes(d);
	
	
	
	// Select Workspace Options Group
	var swog = d.selectWSPanel.add ('group');
	swog.orientation = 'row';
	swog.alignment = 'fill';
	
	// Check All Button
	d.btnCheckAll = swog.add ('button', undefined, "Check All");
	d.btnCheckAll.onClick = function() { TCWrap(ExportDialogCheckAll, d, true); }
	
	// Check None Button
	d.btnCheckNone = swog.add ('button', undefined, "Uncheck All");
	d.btnCheckNone.onClick = function() { TCWrap(ExportDialogCheckAll, d, false); }
	
	// Presets? Help
	d.textWherePresets = AddHyperlinkTextButton(swog, "Looking for preset workspaces?");
	d.textWherePresets.alignment = ['right', 'right'];
	d.textWherePresets.onClick = function()
		{
		alert (	"Only custom workspaces are available for export. If you want to export a modified " +
				"preset workspace, please save it as a custom workspace first.");
		}

	
	// This only makes sense for live (auto-saving) workspaces which were introduced in CS5
	if (gAppMajorVersion >= 12)
		{
		// Add a panel to specify export options
		d.optionsPanel = et.add ('panel');
		d.optionsPanel.text = 'Options';
		d.optionsPanel.alignment = 'fill';
		d.optionsPanel.alignChildren = 'left';
	
		d.originalRadio = d.optionsPanel.add ('radiobutton', undefined,
				"Export the workspaces as they were originally saved");
		d.modifiedRadio = d.optionsPanel.add ('radiobutton', undefined,
				"Export the current state of the workspaces");
	
		d.originalRadio.value = true;
		}
	else
		{
		// always do original in older versions
		d.modifiedRadio = new Object();
		d.modifiedRadio.value = false; 
		}
	}

// Add the Import tab to the dialog
function AddImportTab(dialog)
	{
	// create a shortcut for easier typing
	var d = dialog;
	
	
	// Add the tab itself
	var it = d.importTab = d.tabbedPanel.add('tab');
	it.text = 'Import';
	it.alignment = 'fill';
	
	
	// Add warning as two separate static texts inside a centered group.
	// Attempts to use centered multiline static text failed miserably.
	d.importWarningGrp = it.add('group');
	d.importWarningGrp.orientation = 'column';
	d.importWarningGrp.alignment = ['center', 'top'];
	d.importWarningGrp.spacing = 3;
	d.importWarningGrp.alignChildren = 'left';
	
	
	// REVSIT (TBL): Hack to generate space between warnings
	var dummySpacer = d.importWarningGrp.add ('statictext', undefined, '');
	dummySpacer.graphics.font = ScriptUI.newFont(dummySpacer.graphics.font.name,
												ScriptUI.FontStyle.REGULAR,
												5);
	
	var warning = d.importWarningGrp.add ('statictext', undefined,
			"NOTE: We cannot validate workspace files on import. Please ");
	warning.graphics.font = ScriptUI.newFont(warning.graphics.font.name,
												ScriptUI.FontStyle.REGULAR,
												warning.graphics.font.size - 2);
												
	var warning2 = d.importWarningGrp.add ('statictext', undefined,
			"be sure to only select workspace files for import.");
	warning2.graphics.font = warning.graphics.font;
	
	// REVSIT (TBL): Hack to generate space between warnings
	var dummySpacer2 = d.importWarningGrp.add ('statictext', undefined, '');
	dummySpacer2.graphics.font = dummySpacer.graphics.font;
	
	var warning3 = d.importWarningGrp.add ('statictext', undefined,
			"NOTE: Workspaces from a different version of Photoshop ");
	warning3.graphics.font = warning.graphics.font;
	
	var warning4 = d.importWarningGrp.add ('statictext', undefined,
			"may not work in this version.");
	warning4.graphics.font = warning.graphics.font;
	
	// Add instructions as two separate static texts inside a centered group.
	// Attempts to use centered multiline static text failed miserably.
	d.importInstructionsGrp = it.add('group');
	d.importInstructionsGrp.orientation = 'column';
	d.importInstructionsGrp.alignment = ['center', 'center'];
	d.importInstructionsGrp.spacing = 3;
	
	var importInstructions = d.importInstructionsGrp.add ('statictext', undefined,
			"Click the Import button to select workspaces\nto import into Photoshop.");

	d.importInstructionsGrp.add ('statictext', undefined,
			"to import into Photoshop.");
	}
  
// Adds a checkbox for each exportable workspace to the export tab of the dialog.
function AddWorkspaceCheckboxes(dialog)
	{
	// create a shortcut for easier typing
	var d = dialog;
	
	if (d.wsCheckboxesGroup)
		{
		// Remove all children so we can repopulate.
		while (d.wsCheckboxesGroup.children.length > 0)
			d.wsCheckboxesGroup.remove(d.wsCheckboxesGroup.children[0]);
		}
	else
		{
		d.wsCheckboxesGroup = d.selectWSPanel.add ('group');
		d.wsCheckboxesGroup.orientation = 'row';
		d.wsCheckboxesGroup.alignment = 'fill';
		}
	
	// We will save each checkbox in this array so we can access them later
	d.wsCheckboxes = new Array();
	
	// Calculate columns and workspaces per column.
	// Number of columns will vary with number of workspaces
	var numWorkspaces = d.wsList.length;
	var numColumns = 1;
	
	if (numWorkspaces >= 15)
		numColumns = 3;
	else if (numWorkspaces >= 2)
		numColumns = 2;

	var maxWorkspacesPerColumn = Math.ceil(numWorkspaces / numColumns);
	
	// do each column one at a time
	for (var col = 0; col < numColumns; ++col)
		{
		// Create a new column
		var column = d.wsCheckboxesGroup.add ('group');
		column.orientation = 'column';
		column.alignment = 'top';
		
		// calculate start and end indexes for this column.
		var startIndex = col * maxWorkspacesPerColumn;
		var sentinalIndex = Math.min(startIndex + maxWorkspacesPerColumn, numWorkspaces);
		
		// add each checkbox that belongs in this column
		for (var i = startIndex; i < sentinalIndex; ++i)
			{
			// only allow exporting user workspaces. This is a built-in assumption elsewhere so
			// don't just turn this off without further evaluation.
			if (d.wsList[i].user)
				{
				// Get name and trimmed name, if needed
				var maxDisplayLength = 30;
				var wsName = decodeURI(d.wsList[i].displayName);
				var wsLimitedName = wsName;
				
				if (wsName.length > maxDisplayLength)
					wsLimitedName = wsName.substr(0, maxDisplayLength - 3) + "...";
				
				var checkbox = column.add('checkbox', undefined, wsLimitedName);
				
				checkbox.helpTip = wsName;
				
				// off by default
				checkbox.value = false;//true;
				
				checkbox.alignment = "left";
				
				
				checkbox.onClick = function() { TCWrap(ExportDialogEnableDisableExportButton, d); }
				
				
				// save the workspace so the caller has convenient access to it
				checkbox.workspace = d.wsList[i];
				
				// add it to the workspace checkbox array so they can be iterated
				d.wsCheckboxes.push(checkbox);
				}
			}
		}
	}

// Adds a hyperlink looking text button w/ no border to the provided container
function AddHyperlinkTextButton (container, text)
	{
	var button = container.add ('customButton');
	button.text = text;
	
	button.onDraw = function(drawState)
		{
		try
			{
			// this constant is not working for me, use the integer equivalent
			var solidColorPenType = 0; // ScriptUIGraphics.PenType.SOLID_COLOR
			
			var textPenColor = [0, 0, .5, 1];
			
			if (drawState.leftButtonPressed)
				textPenColor = [.8, 0, .0, 1];
			else if (drawState.mouseOver)
				textPenColor = [0, 0, .8, 1];
				
			var textPen = this.graphics.newPen(solidColorPenType, textPenColor, 2);
			
			var textDimensions = this.graphics.measureString(this.text);
			
			var textLocation = [(this.size[0] - textDimensions[0]) / 2, (this.size[1] - textDimensions[1]) / 2];
			
			this.graphics.drawString(this.text, textPen, textLocation[0], textLocation[1]);
			}
		catch(e)
			{
			alert (e + ": " + e.line);
			}
		}
	
	// Redraw on mouseover and mouseout for rollover effect
	button.addEventListener ('mouseover', btnMouseEventHandler, false);
	button.addEventListener ('mouseout', btnMouseEventHandler, false);
	
	return button;
	}

//  Used to redraw the button on mouseover and mouseout
function btnMouseEventHandler (event)
	{
	try
		{
		event.target.notify("onDraw");
		}
	catch (e)
		{
	
		}
	}

// Installs either the import or export button depending on which tab is selected.
function SetImportExportButton(dialog)
	{
	// I couldn't get the button to resize when changing it's text and a stack container insists
	// on using the space needed for the largest item, so I add/remove buttons instead.
	// If the defaultElement is not set to the new control before deleting the old one it can
	// crash.
	
	if ((dialog.tabbedPanel.selection == dialog.exportTab) && (dialog.btnExport == undefined))
		{
		// Add Export button
		dialog.btnExport = dialog.okCancelButtonGroup.add ('button', undefined, "Export...");
		dialog.btnExport.onClick = function() { TCWrap(ExportWorkspaces, dialog); }
		dialog.defaultElement = dialog.btnExport;
		
		ExportDialogEnableDisableExportButton(dialog);
		
		// Remove Import if it's there
		if (dialog.btnImport != undefined)
			{
			dialog.okCancelButtonGroup.remove(dialog.btnImport);
			dialog.btnImport = undefined;
			}
		}
	else if ((dialog.tabbedPanel.selection == dialog.importTab) && (dialog.btnImport == undefined))
		{
		// Add Import button
		dialog.btnImport = dialog.okCancelButtonGroup.add ('button', undefined, "Import...");
		dialog.btnImport.onClick = function() { TCWrap(ImportWorkspaces, dialog); }
		dialog.defaultElement = dialog.btnImport;
		
		// Remove Export if it's there
		if (dialog.btnExport != undefined)
			{
			dialog.okCancelButtonGroup.remove(dialog.btnExport);
			dialog.btnExport = undefined;
			}
		}
	else
		alert("Don't know which button to add!");
	}


// Swaps the Import/Export button when the selected tab changes
function HandleTabChanged(dialog)
	{
	// Re-add checkboxes incase some were imported
	// This makes you lose your selected workspace, and why would you
	// want to export workspaces you just imported? Don't do this.
//	dialog.wsList = GetWorkspaceList(true, false);
//	AddWorkspaceCheckboxes(dialog);
	
	SetImportExportButton(dialog);
	dialog.layout.layout(true);
	}

// Enables the Export button if any workspace checkboxes are checked, otherwise disables it.
function ExportDialogEnableDisableExportButton(dialog)
	{
	dialog.btnExport.enabled = false;
	
	for (var i = 0; i < dialog.wsCheckboxes.length; ++i)
		{
		if (dialog.wsCheckboxes[i].value)
			{
			dialog.btnExport.enabled = true;
			break;
			}
		}
	}

// Checks all the workspace checkboxes in the export panel.
function ExportDialogCheckAll(dialog, check)
	{
	for (var i = 0; i < dialog.wsCheckboxes.length; ++i)
		{
		dialog.wsCheckboxes[i].value = check;
		}
	
	dialog.btnExport.enabled = check && (dialog.wsCheckboxes.length > 0);
	}

// Sets the foreground and background colors of the dialog to match the host app
function SetDialogFGBGColors(dialog)
	{
	// create a shortcut for easier typing
	var d = dialog;
	
	// match our dialog background(s) and foreground(s) with color of the host application
	var brush = d.graphics.newBrush(d.graphics.BrushType.THEME_COLOR, "appDialogBackground");
	d.graphics.backgroundColor = brush;
	d.graphics.disabledBackgroundColor = brush;
	d.graphics.foregroundColor = d.graphics.newPen(d.graphics.PenType.SOLID_COLOR, [1-brush.color[0], 1-brush.color[1], 1-brush.color[2]], brush.color[3]);
	d.graphics.disabledForegroundColor = d.graphics.newPen(d.graphics.PenType.SOLID_COLOR, [brush.color[0]/1.5, brush.color[1]/1.5, brush.color[2]/1.5], brush.color[3]);
	}

// Prompts the user for files to import as workspaces, then imports them
function ImportWorkspaces()
	{
	var filter = $.os.charAt(0) == 'M' ? null : "All files:*.*";
	
	var files = File.openDialog("Select Workspaces to Import", filter, true);
	
	// user may have canceled the open dialog
	if (files == null)
		return;
	
	var userConflicts = new Array();
	var presetConflicts = new Array();
	
	
	for (var i = files.length - 1; i >= 0 ; --i)
		{
	 /*     var file = files[i];
            var msg = "absoluteURI: " + file.absoluteURI +
                            "\ndisplayName: " + file.displayName +
                            "\nfsName: " + file.fsName +
                            "\nfullName: " + file.fullName +
                            "\nlocalizedName: " + file.localizedName +
                            "\nname: " + file.name +
                            "\npath: " + file.path +
                            "\nrelativeURI: " +  file.relativeURI;
            alert (msg);*/
            
		// If the workspace conflicts with a preset or user workspace, push it onto the beginning
		// of the relevant array, and remove it from 'files'.
		// Pass non-URI formatted names
		if (PresetWorkspaceWithNameExists (decodeURI(files[i].name)))
			{
			presetConflicts.unshift(files[i]);
			files.splice(i, 1);
			}
		else if (UserWorkspaceWithNameExists(decodeURI(files[i].name)))
			{
			userConflicts.unshift(files[i]);
			files.splice(i, 1);
			}
		}
		

	// If any of the files conflict with preset workspaces, we notify the user that they can't be
	// imported. If any of the files conflict with user workspaces, we also notify the user but give
	// them the option to cancel the import. Detailed in the truth table below.
	
// Files   User C   Preset C     Behavior
//  T       T         T          Prompt to replace, Conditional Import, notify can't be imported
//  T       T         F          Prompt to replace, Conditional Import,
//  T       F         T    							Import, 			notify can't be imported
//  T		F		  F								Import
//  F		T		  T			 Prompt to replace, Conditional Import, notify can't be imported
//  F		T		  F			 Prompt to replace, Conditional Import
//  F		F		  T													notify can't be imported
//  F		F		  F			 Shouldn't happen
	

	if (presetConflicts.length > 0)
		{
		var haveOthers = (files.length > 0) || (userConflicts.length > 0);
		
		if (haveOthers)
			alert ("File Conflict\n" + 
					"The following file(s) cannot be imported because they conflict with " +
					"existing preset workspace name(s):\n\n" +
					ConcatFileNamesFromFileArray(presetConflicts));
		else
			alert ("None of the selected file(s) can be imported because they all conflict with " +
					"existing preset workspace name(s).");
		
		}
	
	var importingUserConflicts = false;
	
	if (userConflicts.length > 0)
		{
		var confirmMsg = "File Conflict\n" +
						"The following file(s) that you have selected to import conflict with " +
						"existing custom workspace name(s):\n\n" +
						ConcatFileNamesFromFileArray(userConflicts) + "\n\n" +
						"If you continue the import, the existing workspace(s) will be replaced " +
						"with the file(s) you are importing.\n\n" +
						"Continue with the import?";
		
		// If the user wants to import the user conflicts, add them back to the 'files' array
		if (confirm(confirmMsg))
			files = files.concat(userConflicts);
		}
	
	
	
	// All files canceled or conflicting
	if (files.length == 0)
		return;
		

	// Ok, let's import!
	ImportScreenedWorkspaceFiles(files);
	}

// Import the provided files as workspaces. All files in 'files' should already have been
// verified as not conflicting with preset workspaces and either not conflicting with user
// workspaces or ok'd to overwrite user workspaces.
function ImportScreenedWorkspaceFiles(files)
	{
	var userFolder = GetUserWorkspacesFolder();
	var modifiedFolder = (gAppMajorVersion >= 12) ? GetModifiedWorkspacesFolder() : null;
	
	var failures = new Array();
	
	for (var i = files.length - 1; i >= 0 ; --i)
		{
		var decodedFilename = decodeURI(files[i].name);
		var targetFile = new File(userFolder.fsName + "/" + decodedFilename);
		
		var copySucceeded = files[i].copy(targetFile);
		
		if (copySucceeded)
			{
			// The copy succeeded. If we are copying over an existing workspace, reset it.
			// This does two things:
			// 1. Make sure we delete any "modified" file that may be around so we load the newly
			//	  imported version of a workspace next time it is selected.
			// 2. If we imported over the current workspace, reload it now.
			// If it is not an existing workspace, just make sure we delete any modified version
			// that may be lying around.
			
			// Older versions don't have "modified" workspace files and we can't get the workspace
			// list, so we just tell the user they need to relaunch Photoshop.
			if (gAppMajorVersion >= 12)
				{
				// The filename is the displayname for user workspaces, which is what we are creating,
				// so it works for resetting the workspace.
				if (IsLoadedWorkspace(decodedFilename))
					ResetWorkspace (decodedFilename);
				else
					{
					var modifiedFile = new File (modifiedFolder.fsName + "/" + decodedFilename);
					
					if (modifiedFile.exists)
						modifiedFile.remove();
					}
				}
			}
		else
			{
			// The copy failed, push it onto the beginning of the failures array
			// and remove it from 'files'
			failures.unshift(files[i]);
			files.splice(i, 1);
			}
		}
	
	// Report the results
	var msg = files.length + " file(s) imported successfully.";
	
	if (failures.length > 0)
		msg += " " + failures.length + " file(s) could not be imported.";
	
	msg += "\n"; // 1st paragraph is bold on Mac
		
	// Make PS reload the workspaces so they show up, or warn if we can't
	if (files.length > 0)
		{
		if (gAppMajorVersion >= 12)
			ReloadWorkspaces();
		else
			msg += "You must relaunch Photoshop to see the new workspaces which you've imported.\n\n";
		}
	
	
	// Summarize what was imported and what failed to import
	msg += "The following file(s) were imported:\n\n";
	
	if (files.length > 0)
		msg += ConcatFileNamesFromFileArray(files);
	else
		msg += "\t<none>";
	
	if (failures.length > 0)
		msg += "\n\n" +
				"The following file(s) failed to import:\n\n" +
				ConcatFileNamesFromFileArray(failures);
	
	alert (msg);
	}

// Exports workspaces based on the settings in 'dialog'
function ExportWorkspaces(dialog)
	{
	// Get the folder to export to
	var exportFolder = GetExportFolder();
	
	// user may have canceled open dialog or there may have been an error
	if (exportFolder == null)
		return null;
	
	if (dialog.modifiedRadio.value == true)
		{
		// Make PS update the modified state of the current workspaces incase it is being exported
		// (not relevant if exporting original state of workspaces).
		var idDlt = stringIDToTypeID( "save" );
			var desc3 = new ActionDescriptor();
			var idnull = charIDToTypeID( "null" );
				var ref2 = new ActionReference();
				var idworkspace = stringIDToTypeID( "workspace" );
				ref2.putClass( idworkspace );
			desc3.putReference( idnull, ref2 );
		executeAction( idDlt, desc3, DialogModes.NO );
		}
	
	
	// Get all the workspaces which are to be exported
	var wsToExport = new Array();
	
	for (var i = 0; i < dialog.wsCheckboxes.length; ++i)
		{
		if (dialog.wsCheckboxes[i].value)
			{
			var workspace = dialog.wsCheckboxes[i].workspace;
			
			wsToExport.push(workspace);
			}
		}
	
	
	// Get the source folder
	var sourceFolder = dialog.modifiedRadio.value ? GetModifiedWorkspacesFolder() :
													GetUserWorkspacesFolder();
	
	
	// Copy each file from the source folder to the target folder
	var exportedFiles = new Array();
	var failures = new Array();
	
	for (var i = 0; i < wsToExport.length; ++i)
		{
		var targetFile = new File (exportFolder.fsName + "/" + wsToExport[i].filename);
		var sourceFile = new File (sourceFolder.fsName + "/" + wsToExport[i].filename);
				
		var copySucceeded = sourceFile.copy(targetFile);
		
		if (copySucceeded)
			exportedFiles.push(sourceFile);
		else
			failures.push(sourceFile);
		}
	

	// Report the results
	var msg = exportedFiles.length + " workspaces exported successfully.";
	
	if (failures.length > 0)
		msg += " " + failures.length + " workspaces could not be exported.";
	
	msg += "\n"; // 1st paragraph is bold on Mac
	
	// Summarize what was exported and what failed to export
	msg += "The following workspace(s) were exported:\n\n";
	
	if (exportedFiles.length > 0)
		msg += ConcatFileNamesFromFileArray(exportedFiles);
	else
		msg += "\t<none>";
	
	if (failures.length > 0)
		msg += "\n\n" +
				"The following workspace(s) failed to export:\n\n" +
				ConcatFileNamesFromFileArray(failures);
	
	
	alert (msg);
	}

// Gets/creates the user-specified export folder. Prompts for overwriting if needed. If this
// returns a non-null value, it is ok to export workspaces to this folder.
function GetExportFolder ()
	{
	var exportContainerFolderName = 'Exported Workspaces';
	
	
	var exportLocation = Folder.selectDialog("Choose a folder to export to (an '" +
									exportContainerFolderName + "' folder will be created here)");
	
	// user may have canceled open dialog
	if (exportLocation == null)
		return null;
		
	var exportFolder = new Folder (exportLocation.fsName + "/" + exportContainerFolderName);
	
	if (exportFolder.exists)
		{
		var overwriteMsg = "A folder named '" + exportContainerFolderName + "' already exists in this " +
							"location. Any files in this folder that have the same name as a workspace " +
							"being exported will be overwritten. Continue?";
		
		if(!confirm(overwriteMsg))
			return null;
		}
	
	exportFolder.create();
	
	if (!exportFolder.exists)
		{
		alert ("The workpace(s) could not be exported because the '" + exportContainerFolderName +
				"' folder could not be created in the chosen location.");
		
		return null;
		}
	
	return exportFolder;
	}

// Concatenates all the filenames in an array so that they can be output for the user.
function ConcatFileNamesFromFileArray(files)
	{
	var rv = '';
	
	for (var i = 0; i < files.length; ++i)
		{
		if (i > 0)
			rv += "\n";
		
		// decode URI to make spaces, etc user friendly
		rv += "\t" + decodeURI(files[i].name);
		}
	
	return rv;
	}

// Determines if there is a preset workspace with the given filename
function PresetWorkspaceWithNameExists(filename)
	{
	// special-case Essentials
	if (filename == "Essentials")
		return true;
	
	// Test against preset workspace files
	var presetFolder = GetPresetWorkspacesFolder();

	if (FolderContainsFile(presetFolder, filename))
		return true;
		
	// If we are in a localized build, check against the display names of loaded presets
	// which will be different than the filenames, but which we'd also like to avoid
	// conflicts with. We can't check for conflicts with display names of "deleted" presets.
	if ((app.locale != 'en_US') && (gAppMajorVersion >= 12))
		{
		// Get loaded preset workspaces
		var wsList = GetWorkspaceList(false, true);
		
		for (var i = 0; i < wsList.length; ++i)
			{
			if (wsList[i].displayName.toLowerCase() == filename.toLowerCase())
				return true;
			}
		}
	
	// We couldn't find one!
	return false;
	}

// Determines if there is a user workspace with the given filename
function UserWorkspaceWithNameExists(filename)
	{
	var userFolder = GetUserWorkspacesFolder();

	return FolderContainsFile(userFolder, filename);
	
	}

// Returns true if Photoshop has a workspace in its list of loaded workspaces with the given filename
function IsLoadedWorkspace(filename)
	{
	if (gAppMajorVersion < 12)
		{
		// Warn that I need to do something differently in old version.
		alert ("Only supported in CS5 and newer.");
		return;
		}
		
	var wsList = GetWorkspaceList(true, true);
	
	for (var i = 0; i < wsList.length; ++i)
		{
		if (decodeURI(wsList[i].filename).toLowerCase() == filename.toLowerCase())
			return true;
		}
	
	return false;
	}

// filename should NOT be in URI format
function FolderContainsFile(folder, filename)
	{
	var matchingFiles = folder.getFiles(filename);
	
	// Base Case.
	// We got back a match in this folder, confirm we have a matching File, not just a Folder or
	// a file that contains the filename but isn't the same
	if (matchingFiles.length > 0)
		{
		for (var i = 0; i < matchingFiles.length; ++i)
			{
			if ((matchingFiles[i] instanceof File) &&
				(decodeURI(matchingFiles[i].name).toLowerCase() == filename.toLowerCase()))
				return true;
			}
		}
	
	// Recursive Case
	// Search subfolders.
	var subfolders = folder.getFiles(IsFolder);
	
	
	for (var i = 0; i < subfolders.length; ++i)
		{
		if (FolderContainsFile(subfolders[i], filename))
			return true;
		}
	
	return false;
	}

// Gets all the files in a folder and it's subfolders.
function GetFilesInFolderRecursive(folder)
	{
	// Base Case.
	// Get the files from this folder
	var files = folder.getFiles(IsFile);
	
	// Recursive Case
	// Search subfolders.
	var subfolders = folder.getFiles(IsFolder);
	
	for (var i = 0; i < subfolders.length; ++i)
		{
		// add in all the files from the subfolder.
		files = files.concat (GetFilesInFolderRecursive(subfolders[i]));
		}
	
	return files;
	}
	

// Returns true if the provided object is a Folder object
function IsFolder(object)
	{
	return object instanceof Folder;
	}

// Returns true if the provided object is a File object
function IsFile(object)
	{
	return object instanceof File;
	}

// Gets the folder where preset workspaces live
function GetPresetWorkspacesFolder()
	{
	var platform = $.os.charAt(0) == 'M' ? 'Mac' : 'Win';
	var folder = new Folder (app.path + "/Locales/" + app.locale + "/Additional Presets/" +
								platform + "/Workspaces");
	
	
	return folder;
	}

// Gets the folder where the 'original' versions of user workspace files live.
function GetUserWorkspacesFolder()
	{
	var settingsFolder = new Folder (app.preferencesFolder);
	
	if (!settingsFolder.exists)
		settingsFolder.create ();
	
	var folder = new Folder (settingsFolder.fsName + "/WorkSpaces");
	
	if (!folder.exists)
		folder.create();
	
	return folder;
	}

// Gets the folder where the 'modified' versions of workspace files live.
function GetModifiedWorkspacesFolder()
	{
	if (gAppMajorVersion < 12)
		{
		// Warn that I need to do something differently in old version.
		alert ("Only supported in CS5 and newer.");
		return;
		}
		
	var settingsFolder = new Folder (app.preferencesFolder);
	
	if (!settingsFolder.exists)
		settingsFolder.create ();
	
	var folder = new Folder (settingsFolder.fsName + "/WorkSpaces (Modified)");
	
	if (!folder.exists)
		folder.create();
	
	return folder;
	}

// Gets the list of Photoshop workspaces
function GetWorkspaceList(includeUser, includePreset)
	{
    var wsList = new Array();
    
	if (gAppMajorVersion >= 12)
		{
		// Request the workspace list from Photoshop
		var workspaceList = stringIDToTypeID( "workspaceList" );
		var typeOrdinal = charIDToTypeID( "Ordn" );
		var enumTarget = charIDToTypeID( "Trgt" );
		var classProperty = charIDToTypeID( "Prpr" );
		var classApplication = charIDToTypeID( "capp" );
		var ref = new ActionReference();
		ref.putProperty( classProperty, workspaceList );
		ref.putEnumerated( classApplication, typeOrdinal, enumTarget );
		var desc = executeActionGet( ref );
		var descList = desc.getList( workspaceList );
		
		// Convert to a friendly list
		var displayName = stringIDToTypeID( "displayName" );
		var filename = stringIDToTypeID( "name" );
		var userWorkspace = stringIDToTypeID( "user" );
		
		for (var i = 0; i < descList.count; ++i)
			{
			var wsDesc = descList.getObjectValue( i );
			var workspace = new Object;
			
			workspace.displayName = wsDesc.getString( displayName );
			workspace.filename = wsDesc.getString( filename );
			workspace.user = wsDesc.getBoolean( userWorkspace );
			
			if ((includeUser && workspace.user) || (includePreset && !workspace.user))
				wsList.push (workspace);
			}
		}
	else
		{
		// We have to fall back to seeing what files are in the workspace
		// folders, which is less reliable but allows us to reasonably support
		// older versions.
		if (includeUser)
			{
			var wsFiles = GetFilesInFolderRecursive(GetUserWorkspacesFolder());
			
			for (var i = 0; i < wsFiles.length; ++i)
				{
				var workspace = new Object;
				
				workspace.displayName = decodeURI(wsFiles[i].name);
				workspace.filename = decodeURI(wsFiles[i].name);
				workspace.user = true;
				
				wsList.push (workspace);
				}
			}
		
		if (includePreset)
			{
			var wsFiles = GetFilesInFolderRecursive(GetPresetWorkspacesFolder());
			
			for (var i = 0; i < wsFiles.length; ++i)
				{
				var workspace = new Object;
				
				workspace.displayName = decodeURI(wsFiles[i].name);
				workspace.filename = decodeURI(wsFiles[i].name);
				workspace.user = false;
				
				wsList.push (workspace);
				}
			}
		}
		
	return wsList;
	}

// Resets the named workspace.
function ResetWorkspace(displayName)
	{
	if (gAppMajorVersion < 12)
		{
		// Warn that I need to do something differently in old version.
		alert ("Only supported in CS5 and newer.");
		return;
		}
		
	var idRset = charIDToTypeID( "Rset" );
	var desc4 = new ActionDescriptor();
	var idnull = charIDToTypeID( "null" );	
		var ref3 = new ActionReference();
		var idworkspace = stringIDToTypeID( "workspace" );
		ref3.putName( idworkspace, displayName );
	desc4.putReference( idnull, ref3 );
	executeAction( idRset, desc4, DialogModes.NO );
	}


// Makes PS reload the workspaces so they show up in the switcher and menus.
function ReloadWorkspaces()
	{
	if (gAppMajorVersion < 12)
		{
		// Warn that I need to do something differently in old version.
		alert ("Only supported in CS5 and newer.");
		return;
		}
		
	var idDlt = stringIDToTypeID( "load" );
		var desc3 = new ActionDescriptor();
		var idnull = charIDToTypeID( "null" );
			var ref2 = new ActionReference();
			var idworkspace = stringIDToTypeID( "workspace" );
			ref2.putClass( idworkspace );
		desc3.putReference( idnull, ref2 );
	executeAction( idDlt, desc3, DialogModes.NO );
	}

// Calls 'callee' from within a try-catch block and reports any exceptions.
function TCWrap(callee, arg1, arg2, arg3)
	{
	try
		{
		callee(arg1, arg2, arg3);
		}
	catch(e)
		{
		alert (e + ":" + e.line);
		}
	}


try
    {
    main();
    }
catch(e)
    {
    alert (e + ": " + e.line);
    }