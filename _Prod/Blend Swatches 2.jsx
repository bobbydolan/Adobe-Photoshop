/**********************************************************
 
BlendSwatches.jsx

DESCRIPTION

Blend colors between two or more global swatches.

If any sequential pair of selected swatches are next to each other,
three new swatches will be added at the end of the swatch list.

If any sequential pair of selected swatches have swatches between them,
the intervening swatches will be OVERWRITTEN with an appropriate number of
colors. This behavior is inspired by the old Amiga program Deluxe Paint.


Only works on CMYK non-spot colors, as that's what I work exclusively in.

Doesn't know about swatch groups yet.
 
**********************************************************/

// define some error codes
TWOCMYK = 1;

var docRef = app.activeDocument;

swatchesToBlend = docRef.swatches.getSelected();

try {
	if (2 > swatchesToBlend.length) {
		throw (TWOCMYK);
	}
	numSwatches = swatchesToBlend.length;

	swatchType = swatchesToBlend[0].color.typename;
	switch (swatchType) {	// we only handle CMYK global colors.
		case "SpotColor":
			switch (swatchesToBlend[0].color.spot.spotKind) {
				case SpotColorKind.SPOTCMYK:
					break;
				default:
					throw(TWOCMYK);	// throw an error if the spot color is non-cmyk
			}
			break;
		default:
			throw (TWOCMYK);	// throw an error for non spot colors
	}
	for (i=1; i<numSwatches; i++) {
		// make sure everything else is the same type of color
		// assumption made: all other spot colors are in the same color model as the first
		if (swatchesToBlend[i].color.typename != swatchType) {
			throw (TWOCMYK);
		}
	}

	theSwatches = docRef.swatches;
	lastSwatchIndex = 0;

	for (i=1; i<numSwatches; i++) {
		firstSwatch = swatchesToBlend[i-1];
		secondSwatch = swatchesToBlend[i];
		
		// let's get crackin'!
		
		firstSwatchIndex = null;
		secondSwatchIndex = null;
		
		// find the first swatch's location in the swatch array		
		for (j=lastSwatchIndex; j<theSwatches.length; j++) {
			if (theSwatches[j].name == firstSwatch.name) {
				firstSwatchIndex = j;
			}
			if (theSwatches[j].name == secondSwatch.name) {
				secondSwatchIndex = j;
			}
		}
		
		createInPlace = true;
		numNewSwatches = secondSwatchIndex - firstSwatchIndex - 1;
		if (0 == numNewSwatches) {
			numNewSwatches = 3;
			createInPlace = false;
		}
		
		newColors = new Array();
		newSwatches = new Array();
		
		firstColor = firstSwatch.color.spot.color;
		secondColor = secondSwatch.color.spot.color;
		
		// actually create the new colors
		for (j=0; j < numNewSwatches; j++) {
			newColors[j] = new CMYKColor();

			newColors[j].cyan    = firstColor.cyan +    ( (secondColor.cyan    - firstColor.cyan)    * ((j+1)/(numNewSwatches+1)) );
			newColors[j].magenta = firstColor.magenta + ( (secondColor.magenta - firstColor.magenta) * ((j+1)/(numNewSwatches+1)) );
			newColors[j].yellow  = firstColor.yellow +  ( (secondColor.yellow  - firstColor.yellow)  * ((j+1)/(numNewSwatches+1)) );
			newColors[j].black   = firstColor.black +   ( (secondColor.black   - firstColor.black)   * ((j+1)/(numNewSwatches+1)) );
		
			if (createInPlace) {
				newSwatches[j] = theSwatches[firstSwatchIndex+j+1];
				newSwatches[j].color.spot.color = newColors[j];	
			} else {
				newSwatches[j] = docRef.spots.add();
				newSwatches[j].color = newColors[j];
			}

			newSwatches[j].colorType = ColorModel.PROCESS;
			newSwatches[j].name = firstSwatch.name+"-"+secondSwatch.name+" "+(j+1);
		}
		if (createInPlace) {
			// alert ("warning: swatches not actually created because I haven't written code to create them in place yet");
		} else {
			// attempt to move the new swatches between their parents
			
		}
	}
}
catch(err) {
	//something went wrong, complain
	switch (err) {
	case TWOCMYK:
			alert ("Please select two or more CMYK global swatches to blend between.");
			break;
		default:
			alert ("Unknown error? " + err);
			break;
	}
}


// // Create the new color for the swatch
// var cmykColor = new CMYKColor();
// cmykColor.cyan = 75;
// cmykColor.magenta = 50;
// cmykColor.yellow = 20;
// cmykColor.black = 5;
// 
// // Create the new swatch using the above color
// var swatch = docRef.swatches.add();
// swatch.color = cmykColor;
// swatch.name = "CreateSwatch";
// 
// // Apply the swatch to a new path item
// var pathRef = docRef.pathItems.star (300, 300, 100, 30, 4, false);
// pathRef.filled = true;
// pathRef.fillColor = swatch.color;
// pathRef.stroked = true;
// pathRef.strokeColor = swatch.color;
