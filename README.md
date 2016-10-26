# Constellation-JS
#### Version 1.1.1

_Constellation-JS_ is a dynamic, interactive visual 'mesh' graphic done purely in JavaScript.

![gif] (http://i.imgur.com/q5znRfO.gif)

[LIVE DEMO] (https://vi-victor.github.io/Constellation-JS/)

Nearly all elements of the graphic are parameterized, and easily modifiable.

## Installation

1. Find `constellationpack.js` in `/module`, and link it in your html.
2. To edit its parameters, add the `<script>` tag found below in your html to overwrite their default values.

Feel free to exclude any parameters whose value you do not wish to modify.

```javascript
<script>
	//-------------GENERAL-------------//

	//creates reference to html canvas
	//put your canvas' ID where 'userCanvas' is
	canvas = document.getElementById('userCanvas');
	
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
	//should be bigger or equal to 2x mouseFalloff, otherwise it yields an opacity value out of 0-1 range
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

	//RGBA canvas background (takes values between 0 and 255 for RGB, and between 0 and 1 for alpha)
	bgRed = 255;
	bgGreen = 255;
	bgBlue = 255;
	bgOpacity = 1;

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

If you wish to modify the scripts themselves, take a look at the `/scripts` folder.

## Changelog

### Version 1.1.1

* Changed canvas background color parameters to accept RGB
* Added parameter for setting on which canvas constellation displays on
* Added documentation
* Added a non-minified version of the module in `/module` folder

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
	* dot and line colors and opacity
	* dot and line sizes
	* line opacity falloff range and intensity
	* dot movement speed
	* canvas background color

## To Do

* Make ConstellationJS into a class, so that multiple instances can be deployed on multiple canvases (maaaaaybe)
