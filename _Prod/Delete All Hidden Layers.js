var cnt = 0;

try {
    if (app.documents.length) {
        app.activeDocument.suspendHistory("Del hidden", "process_doc(app.activeDocument)");
    }
} catch (e) {
    alert(e);
}

app.refresh();

// alert(cnt + " layers have been removed", "");

function process_doc(doc, close)

{

    try {

        app.activeDocument = doc;

        var doc_len = app.documents.length;

        var i0 = get_layer_count();

        try {

            var d = new ActionDescriptor();

            var r = new ActionReference();

            r.putEnumerated(stringIDToTypeID("layer"), stringIDToTypeID("ordinal"), stringIDToTypeID("hidden"));

            d.putReference(stringIDToTypeID("null"), r);

            executeAction(stringIDToTypeID("delete"), d, DialogModes.NO);

        } catch (e) {}

        var i = get_layer_count();

        cnt += i0 - i;

        var ok = true;

        while (ok && i >= 1 && process_layer(i)) {
            --i;
        }

        if (ok && close) doc.close(SaveOptions.SAVECHANGES);

        return ok;

        function get_layer_count()

        {

            try

            {

                var r = new ActionReference();

                r.putEnumerated(stringIDToTypeID("layer"), stringIDToTypeID("ordinal"), stringIDToTypeID("targetEnum"));

                var n = executeActionGet(r).getInteger(stringIDToTypeID("count"));

                try {
                    app.activeDocument.backgroundLayer;
                } catch (e) {
                    return n;
                }

                return n - 1;

            } catch (e) {
                alert(e);
                ok = false;
                return 0;
            }

        }

        function process_layer(n)

        {

            try {

                var r = new ActionReference();

                r.putIndex(stringIDToTypeID("layer"), n);

                var d = executeActionGet(r);

                if (!d.hasKey(stringIDToTypeID("smartObject"))) return true;

                var id = d.getInteger(stringIDToTypeID("layerID"));

                var r = new ActionReference();

                r.putIdentifier(stringIDToTypeID("layer"), id);

                var d = new ActionDescriptor();

                d.putReference(stringIDToTypeID("null"), r);

                executeAction(stringIDToTypeID("select"), d, DialogModes.NO);

                executeAction(stringIDToTypeID("placedLayerEditContents"), undefined, DialogModes.ERROR);

                if (doc_len == app.documents.length) {
                    alert("SmartObject edit error!");
                    ok = false;
                    return false;
                }

                ok = process_doc(app.activeDocument, true);

                app.activeDocument = doc;



                return ok;

            } catch (e) {
                alert(e);
                ok = false;
                return false;
            }

        }

    } catch (e) {
        alert(e);
        return false;
    }

}