var totalProgress = 0// I assume this is defined eleswhere but is needed for the scriptler
function layerCounter(inObj)  // recursive function to count layers
{
    totalProgress+= inObj.artLayers.length;       
    for( var i = 0; i < inObj.layerSets.length; i++) {
        totalProgress++;
      layerCounter(inObj.layerSets[i]);  // recursive call to layerCounter
    }
   return totalProgress;
}

function getLayerCount(){
   function getNumberLayers(){
   var ref = new ActionReference();
   ref.putProperty( charIDToTypeID("Prpr") , charIDToTypeID("NmbL") )
   ref.putEnumerated( charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") );
   return executeActionGet(ref).getInteger(charIDToTypeID("NmbL"));
   }

   function getLayerType(idx) {
       var ref = new ActionReference();
       ref.putProperty( charIDToTypeID("Prpr") , stringIDToTypeID("layerSection"));
       ref.putIndex(charIDToTypeID( "Lyr " ), idx);
       return typeIDToStringID(executeActionGet(ref).getEnumerationValue(stringIDToTypeID('layerSection')));
   };
   var cnt = getNumberLayers();
   var res = cnt;
   if(activeDocument.layers[activeDocument.layers.length-1].isBackgroundLayer){
         var i = 0;
         //comment out line below to exclude background from count
         res++;
      }else{
         var i = 1;
      }; 
   for(i;i<cnt;i++){
      var temp = getLayerType(i);
      if(temp == "layerSectionEnd") res--;
      //if(temp == '"layerSectionStart") res--;//uncomment to count just artLayers
   };
   return res;
};

function main()
{
   var answer = confirm("Go through your file and count all the layers??");
   if(answer) {
      var reporter1 = layerCounter(app.activeDocument);
      alert("Kyletunney.com - All done! Layer count = " + reporter1);
   } else {
      reporter2 = getLayerCount();
      alert("Kyletunney.com - All done! Layer count = " + reporter2);

   }   
}

main();