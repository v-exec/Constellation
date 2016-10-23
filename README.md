# Constellation-JS
#### Version 1.1

_Constellation-JS_ is a dynamic, interactive visual 'mesh' graphic done purely in JavaScript.

![gif] (http://i.imgur.com/q5znRfO.gif)

Nearly all elements of the graphic are parameterized, and easily modifiable.

## Installation

Find `constellationpack.js` in `/module`, and link it in your html.
To edit its parameters, add the following `<script>` tag in your html to overwrite their default values.
Below are all of the default parameter values. Feel free to exclude any parameters whose value you do not wish to modify.

```javascript
<script>
	//-------------GENERAL-------------//

	//number of dots
	dotCount = 300;

	//minimum distance between dots necessary to draw a line connecting them
	lineDistance = 120;

	//-------------INTERACTION-------------//

	//the following code will only work if interactive = true

	//whether or not the animation will interact with mouse position
	interactive = true;

	//distance from the mouse at which lines will stop being visible 
	mouseFalloff = 140;

	//whether or not there is a smooth opacity falloff as drawn lines get further from mouse 
	opacityFalloff = true;

	//amount of opacity falloff (the higher the number, the less opaque things will be when further from the mouse)
	//should be bigger or equal to 2x mouseFalloff, otherwise it yelds opacity value out of 0-1 range
	falloffAmount = mouseFalloff * 2;

	//-------------COLORS-------------//

	//RGBA for dots (takes values between 0 and 255 for RGB, and between 0 and 1 for alpha)
	dotRed = 100;
	dotGreen = 100;
	dotBlue = 100;
	dotOpacity = 0.9;

	//RGBA for lines (takes values between 0 and 255 for RGB, and between 0 and 1 for alpha)
	lineRed = 100;
	lineGreen = 100;
	lineBlue = 200;

	//line opacity is automatically overwritten if interactive = true
	lineOpacity = 0.7;

	//HEX for canvas background color
	backgroundColor = "#fff";

	//-------------SIZES-------------//

	//minimum possible size of a dot
	dotSizeMin = 1;

	//maximum possible size of a dot
	dotSizeMax = 2.6;

	//thickness of lines
	lineSize = 0.7;

	//-------------SPEEDS-------------//

	//speed range of dots
	dotSpeed = 0.2;
</script>
```
The canvas will be automatically sized to its parent's size.

## Changelog

### Version 1.1

* Reworked file organization
* Simplified setup
* Optimized animation loop and setup
* Renamed functions, variables, and files, for clarity
* Added and modified commentary for clarity
* Removed unnecessary/test code
* Remade minified Constellation-JS module
* Made dot and line classes more modular
* Added smooth falloff range for line opacity in interactive mode
* Fixed incorrect coordinate calculations for line opacity falloff
* Optimized line opacity falloff calculation logic
* Added parameters for the following:
	* dot and line colors
	* dot and line sizes
	* line opacity falloff range and opacity
	* dot movement speed
	* canvas background color

## To Do

* Make live demo page
* Make ConstellationJS into a class, so that multiple instances can be deployed on multiple canvases (maaaaaybe)
