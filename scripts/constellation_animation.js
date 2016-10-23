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
canvas.style.background = "rgba(" + bgRed + ", " + bgGreen + ", " + bgBlue + ", " + bgOpacity + ")";;

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
			if (distanceVerifier(points[i].dotX, points[i].dotY, points[j].dotX, points[j].dotY, lineDistance)) {
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