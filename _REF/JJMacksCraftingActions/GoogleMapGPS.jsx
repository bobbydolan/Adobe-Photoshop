// Open Map from GPS Location.jsx
// Version 1.0
// Shaun Ivory (shaun@ivory.org)
//
// Feel free to modify this script.  If you do anything interesting with it,
// please let me know.

// JJMack I just used my sledge hammer on Shaun's Photoshop script 
// I sucked in his include file and removed his include statement
// then I commented out his dialog and just Goolge Map the GPS location

*
<javascriptresource>
<about>$$$/JavaScripts/GoogleMapGPS/About=JJMack's Google Map GPS.^r^rCopyright 2014 Mouseprints.^r^rScript utility for action.^rNOTE:Modified Shaun's Ivory just Google Map GPS location</about>
<category>JJMack's Action Utility</category>
</javascriptresource>
*/

//
// Constants which identify the different mapping sites
//
c_MapWebsites =
[
    "google",
    "mappoint",
    "virtualearth"
];

var c_nDefaultMapWebsiteIndex = 2;
var c_strTemporaryUrlFile = "~/TemporaryPhotoshopMapUrl.url";

var c_strPhotoCaption = "Photo%20Location";
// EXIF constants
c_ExifGpsLatitudeRef   = "GPS Latitude Ref"
c_ExifGpsLatitude      = "GPS Latitude"
c_ExifGpsLongitudeRef  = "GPS Longitude Ref"
c_ExifGpsLongitude     = "GPS Longitude"
c_ExifGpsAltitudeRef   = "GPS Altitude Ref"ript
c_ExifGpsAltitude      = "GPS Altitude"
c_ExifGpsTimeStamp     = "GPS Time Stamp"
c_ExifMake             = "Make"
c_ExifModel            = "Model"
c_ExifExposureTime     = "Exposure Time"
c_ExifAperture         = "F-Stop"
c_ExifExposureProgram  = "Exposure Program"
c_ExifIsoSpeedRating   = "ISO Speed Ratings"
c_ExifDateTimeOriginal = "Date Time Original"
c_ExifMaxApertureValue = "Max Aperture Value"
c_ExifMeteringMode     = "Metering Mode"
c_ExifLightSource      = "Light Source"
c_ExifFlash            = "Flash"
c_ExifFocalLength      = "Focal Length"
c_ExifColorSpace       = "Color Space"
c_ExifWidth            = "Pixel X Dimension"
c_ExifHeight           = "Pixel Y Dimension"

function GetRawExifValueIfPresent(strExifValueName)
{
    // Empty string means it wasn't found
    var strResult = new String("");

    // Make sure there is a current document
    if (app.documents.length)
    {
        // Loop through each element in the EXIF properties array
        for (nCurrentElement = 0, nCount = 0; nCurrentElement < activeDocument.info.exif.length; ++nCurrentElement)
        {
            // Get the current element as a string
            var strCurrentRecord = new String(activeDocument.info.exif[nCurrentElement]);

            // Find the first comma
            var nComma = strCurrentRecord.indexOf(",");
            if (nComma >= 0)
            {
                // Everything before the comma is the field name
                var strCurrentExifName = strCurrentRecord.substr(0, nComma);

                // Is it a valid string?
                if (strCurrentExifName.length)
                {
                    // Is this our element?
                    if (strCurrentExifName == strExifValueName)
                    {
                        // Everything after the comma is the value, so
                        // save it and exit the loop
                        strResult = strCurrentRecord.substr(nComma + 1);
                        break;
                    }
                }
            }
        }
    }
    return strResult;
}

//
// Convert a Photoshop latitude or longitude, formatted like 
// this:
//
//      Example: 47.00 38.00' 33.60"
//
// to the decimal form:
//
//      Example: 47.642667
//
// It returns an empty string if the string is in an unexpected
// form.
//
function ConvertLatitudeOrLongitudeToDecimal(strLatLong)
{
    var nResult = 0.0;

    // Copy the input string
    var strSource = new String(strLatLong);

    // Find the first space
    nIndex = strSource.indexOf(" ");
    if (nIndex >= 0)
    {
        // Copy up to the first space
        strDegrees = strSource.substr(0, nIndex);

        // Skip this part, plus the space
        strSource = strSource.substr(nIndex + 1);

        // Find the tick mark
        nIndex = strSource.indexOf("'");
        if (nIndex >= 0)
        {
            // Copy up to the tick mark
            strMinutes = strSource.substr(0, nIndex);

            // Skip this chunk, plus the tick and space
            strSource = strSource.substr(nIndex + 2);

            // Find the seconds mark: "
            nIndex = strSource.indexOf("\"");
            if (nIndex >= 0)
            {
                // Copy up to the seconds
                strSeconds = strSource.substr(0, nIndex);

                // Convert to numbers
                var nDegrees = parseFloat(strDegrees);
                var nMinutes = parseFloat(strMinutes);
                var nSeconds = parseFloat(strSeconds);

                // Use the correct symbols
                nResult = nDegrees + (nMinutes / 60.0) + (nSeconds / 3600.0);
            }
        }
    }

    return nResult;
}

function GetDecimalLatitudeOrLongitude(strExifLatOrLong, strExifLatOrLongRef, strResult)
{
    var strResult = "";

    // Get the exif values
    strLatOrLong = GetRawExifValueIfPresent(strExifLatOrLong);
    strLatOrLongRef = GetRawExifValueIfPresent(strExifLatOrLongRef);

    // If we were able to read them
    if (strLatOrLong.length && strLatOrLongRef.length)
    {
        // Parse and convert to a decimal
        var nResult = ConvertLatitudeOrLongitudeToDecimal(strLatOrLong);

        // If we are in the southern or western hemisphere, negate the result
        if (strLatOrLongRef[0] == 'S' || strLatOrLongRef[0] == 'W')
        {
            nResult *= -1;
        }

        strResult = nResult.toString();
    }
    return strResult;
}

function CreateGoogleMapsUrl(strLatitude, strLongitude)
{
    return "http://maps.google.com/maps?ll=" + strLatitude + "," + strLongitude + "&spn=0.01,0.01";
}

function CreateMappointUrl(strLatitude, strLongitude)
{
    return "http://mappoint.msn.com/map.aspx?L=USA&C=" + strLatitude + "%2c" + strLongitude + "&A=50&P=|" + strLatitude + "%2c" + strLongitude + "|39|" + c_strPhotoCaption +"|L1|"
}

function CreateVirtualEarthUrl(strLatitude, strLongitude)
{
    return "http://virtualearth.msn.com/default.aspx?v=2&style=h&lvl=17&cp=" + strLatitude + "~" + strLongitude + "&sp=an." + strLatitude + "_" + strLongitude + "_" + c_strPhotoCaption + "_";
}

function CMapSiteSelection()
{
    // Initialize default map provider
    this.Site = c_MapWebsites[c_nDefaultMapWebsiteIndex];
    return this;
}

function ShowMyDialog(strLatitude, strLongitude)
{
    // Use the default website
    var strCurrentSite = c_MapWebsites[c_nDefaultMapWebsiteIndex];

    dlgMain = new Window("dialog", "Choose a Map Website");

    // Add the top group
    dlgMain.TopGroup = dlgMain.add("group");
	dlgMain.TopGroup.orientation = "row";
	dlgMain.TopGroup.alignChildren = "top";
	dlgMain.TopGroup.alignment = "fill";

    // Add the left group
    dlgMain.TopGroup.LeftGroup = dlgMain.TopGroup.add("group");
    dlgMain.TopGroup.LeftGroup.orientation = "column";
    dlgMain.TopGroup.LeftGroup.alignChildren = "left";
    dlgMain.TopGroup.LeftGroup.alignment = "fill";

    dlgMain.AspectRatioGroup = dlgMain.TopGroup.LeftGroup.add("panel", undefined, "Map Website");
    dlgMain.AspectRatioGroup.alignment = "fill";
    dlgMain.AspectRatioGroup.orientation = "column";
    dlgMain.AspectRatioGroup.alignChildren = "left";

    // Add radio buttons
    dlgMain.virtualEarth = dlgMain.AspectRatioGroup.add("radiobutton", undefined, "Windows Live Local (aka Virtual Earth)");
    dlgMain.virtualEarth.onClick = function virtualEarthOnClick()
    {
        strCurrentSite = "virtualearth";
    }

    dlgMain.mappoint = dlgMain.AspectRatioGroup.add("radiobutton", undefined, "MSN Maps && Directions (aka MapPoint)");
    dlgMain.mappoint.onClick = function mappointOnClick()
    {
        strCurrentSite = "mappoint";
    }

    dlgMain.google = dlgMain.AspectRatioGroup.add("radiobutton", undefined, "Google Local (aka Google Maps)");
    dlgMain.google.onClick = function googleOnClick()
    {
        strCurrentSite = "google";
    }

    // Set the checked radio button
    if (strCurrentSite == "google")
    {
        dlgMain.google.value = true;
    }
    else if (strCurrentSite == "mappoint")
    {
        dlgMain.mappoint.value = true;
    }
    else
    {
        dlgMain.virtualEarth.value = true;
    }

    // Add the button group
    dlgMain.TopGroup.RightGroup = dlgMain.TopGroup.add("group");
    dlgMain.TopGroup.RightGroup.orientation = "column";
    dlgMain.TopGroup.RightGroup.alignChildren = "left";
    dlgMain.TopGroup.RightGroup.alignment = "fill";

    // Add the buttons
    dlgMain.btnOpenSite = dlgMain.TopGroup.RightGroup.add("button", undefined, "Open");
    dlgMain.btnClose = dlgMain.TopGroup.RightGroup.add("button", undefined, "Exit");

    dlgMain.btnClose.onClick = function()
    { 
        dlgMain.close(true);
    }

    dlgMain.btnOpenSite.onClick = function()
    {
        // Which website?
        var strUrl = "";
        switch (strCurrentSite)
        {
        case "mappoint":
            strUrl = CreateMappointUrl(strLatitude, strLongitude);
            break;

        case "google":
            strUrl = CreateGoogleMapsUrl(strLatitude, strLongitude);
            break;

        case "virtualearth":
        default:
            strUrl = CreateVirtualEarthUrl(strLatitude, strLongitude);
            break;

        }

        // Create the URL file and launch it
        var fileUrlShortcut = new File(c_strTemporaryUrlFile);
        fileUrlShortcut.open('w');
        fileUrlShortcut.writeln("[InternetShortcut]")
        fileUrlShortcut.writeln("URL=" + strUrl);
        fileUrlShortcut.execute();
    }

    // Set the button characteristics
    dlgMain.cancelElement = dlgMain.btnClose;
    dlgMain.defaultElement = dlgMain.btnOpenSite;

    dlgMain.center();
    return dlgMain.show();
}
function GoogleMap(strLatitude, strLongitude)
{ 
	strUrl = CreateGoogleMapsUrl(strLatitude, strLongitude)
	try{
		var URL = new File(Folder.temp + "/GoogleMapIt.html");
		URL.open("w");
		URL.writeln('<html><HEAD><meta HTTP-EQUIV="REFRESH" content="0; ' + strUrl + ' "></HEAD></HTML>');
		URL.close();
		URL.execute();   // The temp file is created but this fails to open the users default browser using Photoshop CC prior Photoshop versions work
	}catch(e){
		alert("Error, Can Not Open.");
	};

}

function OpenMapUrl()
{
    // Get the latitude
    var strDecimalLatitude = GetDecimalLatitudeOrLongitude(c_ExifGpsLatitude, c_ExifGpsLatitudeRef);
    if (strDecimalLatitude.length)
    {
        // Get the longitude
        var strDecimalLongitude = GetDecimalLatitudeOrLongitude(c_ExifGpsLongitude, c_ExifGpsLongitudeRef);
        if (strDecimalLongitude.length)
        {
            //ShowMyDialog(strDecimalLatitude, strDecimalLongitude);
			GoogleMap(strDecimalLatitude, strDecimalLongitude);
        }
    }
}

function Main()
{
    if (app.documents.length > 0)
    {
        OpenMapUrl();
    }
    else
    {
        alert("You don't have an image opened.  Please open an image before running this script.");
    }
}

Main();

