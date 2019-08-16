#target photoshop

main ();

function cloneRectangle(rect) {
    return { x:rect.x, y:rect.y, width:rect.width, height:rect.height };
}

function rectangle(x, y, width, height) {
    return { x:x, y:y, width:width, height:height };
}

function widthToHeight(size){
    return size.width / size.height;
}

function heightToWidth(size) {
    return size.height / size.width;
}

function scaleWidth(size, height) {
    var scaled = cloneRectangle(size);
    var ratio = widthToHeight( size );
    scaled.width = height * ratio;
    scaled.height = height;
    return scaled;
}

function scaleHeight(size, width) {
    var scaled = cloneRectangle(size);
    var ratio = heightToWidth(size);
    scaled.width = width;
    scaled.height = width * ratio;
    return scaled;
}

function scaleToFill(size, bounds) {
    var scaled = scaleHeight(size, bounds.width);
    
    if (scaled.height < bounds.height)
        scaled = scaleWidth(size, bounds.height);
    
    return scaled;
}

function main () {
    if (app.documents.length < 1) {
        alert ("No document open to resize.");
        return;
    }

    var arHeight = 4;
    var arWidth = 5;

    var doc = app.activeDocument;

    var docWidth = new UnitValue (doc.width, "px");
    var docHeight = new UnitValue (doc.height, "px");

    var dlg = new Window("dialog", "Form");
    dlg.orientation = "row";
    
    var labelGroup = dlg.add("group");
    labelGroup.orientation = "column";
    labelGroup.add("statictext", undefined, "Width:");
    labelGroup.add("statictext", undefined, "Height:");

    var inputGroup = dlg.add("group");
    inputGroup.orientation = "column";

    var widthInput = inputGroup.add("edittext", undefined, "");
    widthInput.characters = 10;
    widthInput.active = true;

    var heightInput = inputGroup.add("edittext", undefined, "");
    heightInput.characters = 10;
    
    var buttonGroup = dlg.add("group");
    buttonGroup.orientation = "column";
    var okButton = buttonGroup.add("button", undefined, "OK");
    var cancelButton = buttonGroup.add("button", undefined, "Cancel");

    okButton.onClick = function() {
        var canvasWidth = new UnitValue(widthInput.text, "px");
        var canvasHeight = new UnitValue(heightInput.text, "px");

        var scaled = scaleToFill(rectangle(0, 0, docWidth, docHeight),
                                 rectangle(0, 0, canvasWidth, canvasHeight));

        doc.resizeImage(scaled.width, scaled.height); 
        dlg.hide();
    };
    
    dlg.show();
}