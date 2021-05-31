/*
<javascriptresource>
<name>[Operations] Close-All-NO-SAVE</name>
<enableinfo>true</enableinfo>
<category>OPs</category>
</javascriptresource>
*/
#target photoshop

while(app.documents.length > 0)
     {
     app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
     }
