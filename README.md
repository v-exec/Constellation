# Constellation-JS
#### Version 1.2

_Constellation-JS_ is a dynamic, interactive visual 'mesh' graphic done purely in JavaScript.

![gif] (http://i.imgur.com/q5znRfO.gif)

[Live demo and additional information found here.] (http://v-os.ca/constellation)

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
	Const.canvas = document.getElementById('userCanvas');

	//number of dots
	Const.dotCount = 300;

	//minimum distance between dots necessary to draw a line connecting them
	Const.lineDistance = 120;

	//-------------INTERACTION-------------//

	//the following code will only work if interactive = true

	//whether or not the animation will interact with mouse position
	Const.interactive = true;

	//distance from the mouse at which lines will stop being visible 
	Const.mouseFalloff = 150;

	//whether or not there is a smooth opacity falloff as drawn lines get further from mouse 
	Const.opacityFalloff = true;

	//amount of opacity falloff (the higher the number, the less opaque things will be when further from the mouse)
	//at mouseFalloff * 1, the lines nearest to the mouse will reach an opacity value of exactly 1
	//anything bigger never allows lines nearest to the mouse reach full opacity
	//anything smaller creates a larger circle of full opacity lines near the mouse
	Const.falloffAmount = Const.mouseFalloff * 1;

	//-------------COLORS-------------//

	//RGBA for dots (takes values between 0 and 255 for RGB, and between 0 and 1 for alpha)
	Const.dotRed = 100;
	Const.dotGreen = 100;
	Const.dotBlue = 100;
	Const.dotOpacity = 0.9;

	//RGBA for lines (takes values between 0 and 255 for RGB, and between 0 and 1 for alpha)
	Const.lineRed = 100;
	Const.lineGreen = 100;
	Const.lineBlue = 200;

	//line opacity is automatically overwritten if interactive = true
	Const.lineOpacity = 0.7;

	//RGBA canvas background (takes values between 0 and 255 for RGB, and between 0 and 1 for alpha)
	Const.bgRed = 255;
	Const.bgGreen = 255;
	Const.bgBlue = 255;
	Const.bgOpacity = 1;

	//-------------SIZES-------------//

	//minimum possible size of a dot
	Const.dotSizeMin = 1;

	//maximum possible size of a dot
	Const.dotSizeMax = 2.6;

	//thickness of lines
	Const.lineSize = 0.7;

	//-------------SPEEDS-------------//

	//speed range of dots
	Const.dotSpeed = 0.2;
</script>
```

The canvas will be automatically sized to its parent's size.
It's all wrapped in an object, so you can freely use identical variable names outside of Constellation's code.
