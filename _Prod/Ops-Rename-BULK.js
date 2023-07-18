/*
<javascriptresource>
<name>[Operations] Rename-BULK</name>
<enableinfo>true</enableinfo>
<category>OPs</category>
</javascriptresource>
*/

// findReplaceLayers.jsx
// carlos canto
// https://forums.adobe.com/thread/2391868

function main () {
    var idoc, search_string, replace_string, layers, i, tframe, new_string, counter=0;
    var idoc = app.activeDocument;
    
    var search_string = Window.prompt ('Enter Search string', 'text 1', 'Find/Replace Layer Names');
    
    if (search_string == null) {
        alert ('Cancelled by user');
        return;
    }

    var replace_string = Window.prompt ('Enter Replace string', 'text 2', 'Find/Replace Layer Names');
    
    if (replace_string == null) {
        alert ('Cancelled by user');
        return;
    }
     
    layers = idoc.layers;
     
    for (i = 0 ; i < layers.length; i++) {
        ilayer = layers[i];
        new_string = ilayer.name.replace(search_string, replace_string);

        if (new_string != ilayer.name) {
            ilayer.name = new_string;
            counter++;
        }
    }
    alert(counter + ' changes were made');
}

main();
