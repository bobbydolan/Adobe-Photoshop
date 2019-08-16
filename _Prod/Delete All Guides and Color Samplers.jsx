clearGuides = function() {
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putEnumerated(cTID("Gd  "), cTID("Ordn"), cTID("Al  "));
    desc.putReference(cTID("null"), ref );
    executeAction(cTID("Dlt "), desc, DialogModes.NO );
};
cTID = function(s) { return app.charIDToTypeID(s); };
clearGuides();

function deleteColorSamplers() {
   function deleteSampler(idx){
    var desc = new ActionDescriptor();
        var ref = new ActionReference();
        ref.putIndex( cTID('ClSm'), idx );
    desc.putReference( cTID('null'), ref );
    executeAction( cTID('Dlt '), desc, DialogModes.NO );
    };
  var rc = false;
  var res = true;
  var cnt = 4;
  while(res){
     try {
        rc = false;
       deleteSampler(cnt);
       cnt--;
       rc = true;
     } catch (e) {
       if (!e.toString().match(/Color sampler.+is not currently available/)) {
         if(rc==false && cnt == 0) {
            res = false;
            }else{
            cnt--;
            }            
       }
     }
    
  };
};
deleteColorSamplers();