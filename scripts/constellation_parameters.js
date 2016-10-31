//-------------GENERAL-------------//

//creates reference to html canvas
//put your canvas' ID where 'userCanvas' is
var canvas = document.getElementById('userCanvas');

//number of dots
var dotCount = 300;

//minimum distance between dots necessary to draw a line connecting them
var lineDistance = 120;

//-------------INTERACTION-------------//

//the following code will only work if interactive = true

//whether or not the animation will interact with mouse position
var interactive = true;

//distance from the mouse at which lines will stop being visible 
var mouseFalloff = 150;

//whether or not there is a smooth opacity falloff as drawn lines get further from mouse 
var opacityFalloff = true;

//amount of opacity falloff (the higher the number, the less opaque things will be when further from the mouse)
//at mouseFalloff * 1, the lines nearest to the mouse will reach an opacity value of exactly 1
//anything bigger never allows lines nearest to the mouse reach full opacity
//anything smaller creates a larger circle of full opacity lines near the mouse
var falloffAmount = mouseFalloff * 1;

//-------------COLORS-------------//

//RGBA for dots (takes values between 0 and 255 for RGB, and between 0 and 1 for alpha)
var dotRed = 100;
var dotGreen = 100;
var dotBlue = 100;
var dotOpacity = 0.9;

//RGBA for lines (takes values between 0 and 255 for RGB, and between 0 and 1 for alpha)
var lineRed = 100;
var lineGreen = 100;
var lineBlue = 200;

//line opacity is automatically overwritten if interactive = true
var lineOpacity = 0.7;

//RGBA canvas background (takes values between 0 and 255 for RGB, and between 0 and 1 for alpha)
var bgRed = 255;
var bgGreen = 255;
var bgBlue = 255;
var bgOpacity = 1;

//-------------SIZES-------------//

//minimum possible size of a dot
var dotSizeMin = 1;

//maximum possible size of a dot
var dotSizeMax = 2.6;

//thickness of lines
var lineSize = 0.7;

//-------------SPEEDS-------------//

//speed range of dots
var dotSpeed = 0.2;