var Const = {};

//-------------GENERAL-------------//

//creates reference to html canvas
//put your canvas' ID where 'userCanvas' is
Const.canvas = document.getElementById('userCanvas');

//number of dots
Const.dotCount = 300;

//minimum distance between dots necessary to draw a line connecting them
Const.lineDistance = 140;

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
Const.dotRed = 255;
Const.dotGreen = 255;
Const.dotBlue = 255;
Const.dotOpacity = 1;

//RGBA for lines (takes values between 0 and 255 for RGB, and between 0 and 1 for alpha)
Const.lineRed = 255;
Const.lineGreen = 255;
Const.lineBlue = 255;

//line opacity is automatically overwritten if interactive = true
Const.lineOpacity = 0.7;

//RGBA canvas background (takes values between 0 and 255 for RGB, and between 0 and 1 for alpha)
Const.bgRed = 0;
Const.bgGreen = 0;
Const.bgBlue = 0;
Const.bgOpacity = 1;

//-------------SIZES-------------//

//minimum possible size of a dot
Const.dotSizeMin = 0.4;

//maximum possible size of a dot
Const.dotSizeMax = 1.4;

//thickness of lines
Const.lineSize = 0.7;

//-------------SPEEDS-------------//

//speed range of dots
Const.dotSpeed = 0.2;

//-------------LINKS AND GLOBALS-------------//

//canvas context setup
Const.ctx = Const.canvas.getContext('2d');

//global variables for cursor location
Const.cursorX;
Const.cursorY;

//array holding dot objects
Const.points = new Array(Const.dotCount);

//color preparation for objects
Const.lineRGB = "rgba(" + Const.lineRed + ", " + Const.lineGreen + ", " + Const.lineBlue + ", " + Const.lineOpacity + ")";
Const.dotRGB = "rgba(" + Const.dotRed + ", " + Const.dotGreen + ", " + Const.dotBlue + ", " + Const.dotOpacity + ")";

//set canvas background color
Const.canvas.style.background = "rgba(" + Const.bgRed + ", " + Const.bgGreen + ", " + Const.bgBlue + ", " + Const.bgOpacity + ")";

//FUNCTIONS & CLASSES

//fit canvas to its container
function fitToContainer() {
    Const.canvas.style.width = '100%';
    Const.canvas.style.height = '100%';
    Const.canvas.width = Const.canvas.offsetWidth;
    Const.canvas.height = Const.canvas.offsetHeight;
}

//random float generator
function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

//calculates distance between two coordinates
function calculateDistance(point1X, point1Y, point2X, point2Y) {
    return Math.sqrt((point1X - point2X)*(point1X - point2X) + (point1Y - point2Y)*(point1Y - point2Y));
}

//draws line between two coordinates
drawLine = function(lineX1, lineY1, lineX2, lineY2) {
    Const.ctx.beginPath();
    Const.ctx.moveTo(lineX1, lineY1);
    Const.ctx.lineTo(lineX2, lineY2);
    Const.ctx.lineWidth = Const.lineSize;

    //if interactive is on, make line opacity visible only if lines are in range of mouse
    if (Const.interactive) {

        //calculate midpoint of line
        var midX = (lineX1 + lineX2) / 2;
        var midY = (lineY1 + lineY2) / 2;

        Const.lineOpacity = 0;

        //check whether distance between mouse and line is within range
        if (calculateDistance(midX, midY, Const.cursorX, Const.cursorY) < Const.mouseFalloff) {
            Const.lineOpacity = 1;
            if (Const.opacityFalloff) {
                Const.lineOpacity = (Const.mouseFalloff - calculateDistance(midX, midY, Const.cursorX, Const.cursorY)) / Const.falloffAmount;
            }
        }
        //set stroke color
        Const.lineRGB = "rgba(" + Const.lineRed + ", " + Const.lineGreen + ", " + Const.lineBlue + ", " + Const.lineOpacity + ")";
    }

    //draw line
    Const.ctx.strokeStyle = Const.lineRGB;
    Const.ctx.stroke();
}

//dot class
function Dot() {

    this.dotX = getRandomFloat(1, Const.canvas.width);
    this.dotY = getRandomFloat(1, Const.canvas.height);
    this.dotVX = getRandomFloat(-Const.dotSpeed, Const.dotSpeed);
    this.dotVY = getRandomFloat(-Const.dotSpeed, Const.dotSpeed);
    this.dotR = getRandomFloat(Const.dotSizeMin, Const.dotSizeMax);

    //method to update dot position
    this.moveDot = function() {
        this.dotX += this.dotVX;
        this.dotY += this.dotVY;

        //check collisions
        if (this.dotX + this.dotVX > Const.canvas.width || this.dotX + this.dotVX < 0) {
            this.dotVX = -this.dotVX;
        }

        if (this.dotY + this.dotVY > Const.canvas.height || this.dotY + this.dotVY < 0) {
            this.dotVY = -this.dotVY;
        }
    }

    //method to draw dot
    this.drawDot = function() {
        Const.ctx.beginPath();
        Const.ctx.arc(this.dotX, this.dotY, this.dotR, 0, Math.PI * 2, true);
        Const.ctx.closePath();
        Const.ctx.fillStyle = Const.dotRGB;
        Const.ctx.fill();
    }
}

//ANIMATION SETUP AND LOOP

//animation setup
function setup() {

    //fit canvas to container, ready to draw
    fitToContainer();

    //fill points array with dot objects
    for (var i = 0; i < Const.dotCount; i++) {
        Const.points[i] = new Dot();
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
        Const.cursorX = event.pageX;
        Const.cursorY = event.pageY;
    }

    //clear canvas for next frame
    Const.ctx.clearRect(0, 0, Const.canvas.width, Const.canvas.height);

    //move dots before drawing lines, to make sure lines are aligned when rendering dots
    for (i = 0; i < Const.dotCount; i++) {
        Const.points[i].moveDot();
    }

    //check distances between all points and draw lines if dots are closer than lineDistance
    for (i = 0; i < Const.dotCount; i++) {
        for (j = i + 1; j < Const.dotCount; j++) {
            if (calculateDistance(Const.points[i].dotX, Const.points[i].dotY,Const.points[j].dotX, Const.points[j].dotY) < Const.lineDistance) {
                drawLine(Const.points[i].dotX, Const.points[i].dotY, Const.points[j].dotX, Const.points[j].dotY);
            }
        }
    }

    //draw dots after lines so that lines aren't rendered above dots
    for (i = 0; i < Const.dotCount; i++) {
        Const.points[i].drawDot();
    }

    //loop animation
    window.requestAnimationFrame(draw);
}

//on page load, call setup to start animation
window.addEventListener("DOMContentLoaded", function () {
    setup();
});