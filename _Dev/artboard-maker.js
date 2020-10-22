var newName = "my name";
var ids = getLayersIDs(); // getting ids of selected layers

//for each id in the list
for (var i = 0; i < ids.length; i++)
{
  // select the layer first (well, artboard in this case)
  selectById(ids[i]);

  //rename it to "my name 1", "my name 2", etc
  activeDocument.activeLayer.name = newName + " " + (i + 1);
}

// this will get IDs of selected layers/groups/artboards
function getLayersIDs()
{
  var lyrs = [];
  var lyr;
  var ref = new ActionReference();
  var desc;
  var tempIndex;
  var ref2;

  ref.putProperty(stringIDToTypeID("property"), stringIDToTypeID("targetLayers"));
  ref.putEnumerated(charIDToTypeID('Dcmn'), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));

  var targetLayers = executeActionGet(ref).getList(stringIDToTypeID("targetLayers"));
  for (var i = 0; i < targetLayers.count; i++)
  {
    tempIndex = 0;
    ref2 = new ActionReference();
    try
    {
      activeDocument.backgroundLayer;
      ref2.putIndex(charIDToTypeID('Lyr '), targetLayers.getReference(i).getIndex());
      try
      {
        desc = executeActionGet(ref2);
        tempIndex = desc.getInteger(stringIDToTypeID("itemIndex")) - 1;
      }
      catch (e)
      {
        tempIndex = 0;
      }
    }
    catch (o)
    {
      ref2.putIndex(charIDToTypeID('Lyr '), targetLayers.getReference(i).getIndex() + 1);
      desc = executeActionGet(ref2);
      tempIndex = desc.getInteger(stringIDToTypeID("itemIndex"));
    }

    lyrs.push(desc.getInteger(stringIDToTypeID("layerID")));
  }

  return lyrs;
};

// this will select a layer by ID
function selectById(id)
{
  var desc1 = new ActionDescriptor();
  var ref1 = new ActionReference();
  ref1.putIdentifier(charIDToTypeID('Lyr '), id);
  desc1.putReference(charIDToTypeID('null'), ref1);
  executeAction(charIDToTypeID('slct'), desc1, DialogModes.NO);
};