//////////////////////////////////////////// PARAMETERS

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

//////////////////////////////////////////// GLOBALS / SETUP

//references to html elements
var ctx = canvas.getContext('2d');

//global variables for cursor location
var cursorX;
var cursorY;

//array preparation for dot objects
var points = new Array(dotCount);

//color preparation for objects
var lineRGB = "rgba(" + lineRed + ", " + lineGreen + ", " + lineBlue + ", " + lineOpacity + ")";
var dotRGB = "rgba(" + dotRed + ", " + dotGreen + ", " + dotBlue + ", " + dotOpacity + ")";

//set canvas background color
canvas.style.background = "rgba(" + bgRed + ", " + bgGreen + ", " + bgBlue + ", " + bgOpacity + ")";

//////////////////////////////////////////// FUNCTIONS

//fit canvas to its container
function fitToContainer() {
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}

//random float generator
function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

//calculates distance between two coordinates
function calculateDistance(point1X, point1Y, point2X, point2Y) {
    return Math.sqrt((point1X - point2X)*(point1X - point2X) + (point1Y - point2Y)*(point1Y - point2Y));
}

//////////////////////////////////////////// CLASSES

//dot class
function Dot() {

    this.dotX = getRandomFloat(1, canvas.width);
    this.dotY = getRandomFloat(1, canvas.height);
    this.dotVX = getRandomFloat(-dotSpeed, dotSpeed);
    this.dotVY = getRandomFloat(-dotSpeed, dotSpeed);
    this.dotR = getRandomFloat(dotSizeMin, dotSizeMax);

    //method to update dot position
    this.moveDot = function() {
        this.dotX += this.dotVX;
        this.dotY += this.dotVY;

        //check collisions
        if (this.dotX + this.dotVX > canvas.width || this.dotX + this.dotVX < 0) {
            this.dotVX = -this.dotVX;
        }

        if (this.dotY + this.dotVY > canvas.height || this.dotY + this.dotVY < 0) {
            this.dotVY = -this.dotVY;
        }
    }

    //method to draw dot
    this.drawDot = function() {
        ctx.beginPath();
        ctx.arc(this.dotX, this.dotY, this.dotR, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = dotRGB;
        ctx.fill();
    }
}

//line class
function Line(lineX1, lineY1, lineX2, lineY2) {

    this.lineX1 = lineX1;
    this.lineY1 = lineY1;
    this.lineX2 = lineX2;
    this.lineY2 = lineY2;

    //method to calculate line position and draw line
    this.drawLine = function() {
        ctx.beginPath();
        ctx.moveTo(this.lineX1, this.lineY1);
        ctx.lineTo(this.lineX2, this.lineY2);
        ctx.lineWidth = lineSize;

        //if interactive is on, make line opacity visible only if lines are in range of mouse
        if (interactive) {

            //calculate midpoint of line
            var midX = (this.lineX1 + this.lineX2) / 2;
            var midY = (this.lineY1 + this.lineY2) / 2;

            lineOpacity = 0;

            //check whether distance between mouse and line is within range
            if (calculateDistance(midX, midY, cursorX, cursorY) < mouseFalloff) {
                lineOpacity = 1;
                if (opacityFalloff) {
                    lineOpacity = (mouseFalloff - calculateDistance(midX, midY, cursorX, cursorY)) / falloffAmount;
                }
            }
            //set stroke color
            lineRGB = "rgba(" + lineRed + ", " + lineGreen + ", " + lineBlue + ", " + lineOpacity + ")";
        }

        //draw line
        ctx.strokeStyle = lineRGB;
        ctx.stroke();
    }
}

//////////////////////////////////////////// ANIMATION

//animation setup
function setup() {

    //fit canvas to container, ready to draw
    fitToContainer();

    //fill points array with dot objects
    for (var i = 0; i < dotCount; i++) {
        points[i] = new Dot();
    }

    //call draw function to start animation loop
    window.requestAnimationFrame(draw);
}

//animation loop
function draw() {

    //fit canvas to container
    fitToContainer();

    //get mouse position on mouse move
    document.onmousemove = function (event) {
        cursorX = event.pageX;
        cursorY = event.pageY;
    }

    //clear canvas for next frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //check distances between all points and draw lines if dots are closer than lineDistance
    for (i = 0; i < dotCount; i++) {
        for (j = i + 1; j < dotCount; j++) {
            if (calculateDistance(points[i].dotX, points[i].dotY, points[j].dotX, points[j].dotY) < lineDistance) {
                var straight = new Line(points[i].dotX, points[i].dotY, points[j].dotX, points[j].dotY);
                straight.drawLine();
            }
        }
    }

    //draw dots
    for (i = 0; i < dotCount; i++) {
        points[i].moveDot();
        points[i].drawDot();
    }

    //loop animation
    window.requestAnimationFrame(draw);
}

//on page load, call setup to start animation
window.addEventListener("DOMContentLoaded", function () {
    setup();
});