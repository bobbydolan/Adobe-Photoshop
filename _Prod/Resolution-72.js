var doc = activeDocument

if(doc.resolution<72){

    doc.resizeImage (undefined, undefined, 72, ResampleMethod.NONE)}


if(doc.resolution>72){

    doc.resizeImage (undefined, undefined, 72, ResampleMethod.NONE)}