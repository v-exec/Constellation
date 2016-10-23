//-------------GENERAL-------------//

//number of dots
var dotCount = 300;

//minimum distance between dots necessary to draw a line connecting them
var lineDistance = 120;

//-------------INTERACTION-------------//

//the following code will only work if interactive = true

//whether or not the animation will interact with mouse position
var interactive = true;

//distance from the mouse at which lines will stop being visible 
var mouseFalloff = 140;

//whether or not there is a smooth opacity falloff as drawn lines get further from mouse 
var opacityFalloff = true;

//amount of opacity falloff (the higher the number, the less opaque things will be when further from the mouse)
//should be bigger or equal to 2x mouseFalloff, otherwise it yelds opacity value out of 0-1 range
var falloffAmount = mouseFalloff * 2;

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

//HEX for canvas background color
var backgroundColor = "#fff";

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