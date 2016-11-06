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