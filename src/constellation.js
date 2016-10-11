/* Constellation.js | v1.0.5 - stable
 * 
 * Original design by Victor Ivanov
 * (MIT) Michael Hemingway @ Arthem. Mtl
 */

var Constellation = (function () {
	'use strict';

	var settings = {
			canvas: document.getElementById('canvas'),
			lineDistance: 100,
			dotnum: 160,
			interactive: true
		},
		ctx = settings.canvas.getContext('2d'),
		points = [settings.dotnum],
		cursorX,
		cursorY;

	// update settings based on init {}
	function setup(options) {
		var option;
		options = options || {};
		for (option in settings) {
			if (settings.hasOwnProperty(option) && !options.hasOwnProperty(option)) {
				options[option] = settings[option];
			}
		}

		// updates global scope
		settings = options;
	}





	// _HELPERS ---------------------

	// Fit the canvas to its container
	function fitToContainer() {
		settings.canvas.style.width = '100%';
		settings.canvas.style.height = '100%';
		settings.canvas.width = settings.canvas.offsetWidth;
		settings.canvas.height = settings.canvas.offsetHeight;
	}

	// Random float generator
	function getRandomFloat(min, max) {
		return Math.random() * (max - min) + min;
	}

	function distanceVerifier(dot1X, dot1Y, dot2X, dot2Y) { // Dot distance calculator
		if ((Math.max(dot1X, dot2X) - Math.min(dot1X, dot2X) < settings.lineDistance) && (Math.max(dot1Y, dot2Y) - Math.min(dot1Y, dot2Y) < settings.lineDistance)) {
			return true;
		} else {
			return false;
		}
	}

	// _CLASSES -----------------
	function Dot() {

		this.dotY = getRandomFloat(10, settings.canvas.height);
		this.dotX = getRandomFloat(10, settings.canvas.width);
		this.dotVY = getRandomFloat(-0.2, 0.2);
		this.dotVX = getRandomFloat(-0.2, 0.2);
		this.dotR = getRandomFloat(1, 2.6);

		this.drawDot = function () {
			this.dotX += this.dotVX;
			this.dotY += this.dotVY;

			if (this.dotX + this.dotVX > settings.canvas.width || this.dotX + this.dotVX < 0) {
				this.dotVX = -this.dotVX;
			}

			if (this.dotY + this.dotVY > settings.canvas.height || this.dotY + this.dotVY < 0) {
				this.dotVY = -this.dotVY;
			}

			ctx.beginPath();
			ctx.arc(this.dotX, this.dotY, this.dotR, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.fillStyle = "rgba(220,220,220,1)";
			ctx.fill();
		};
	}

	// Line class
	function Line(lineX, lineY, lineX2, lineY2) {
		this.lineX = lineX;
		this.lineY = lineY;
		this.lineX2 = lineX2;
		this.lineY2 = lineY2;

		var opacity = 0.7;

		this.drawLine = function () {
			ctx.beginPath();
			ctx.moveTo(lineX, lineY);
			ctx.lineTo(lineX2, lineY2);
			ctx.lineWidth = 0.7;

			// TODO: filter opacity with mouse
			if (settings.interactive) {
				var midX = (Math.max(lineX, lineX2) - Math.min(lineX, lineX2)),
					midY = (Math.max(lineY, lineY2) - Math.min(lineY, lineY2)),
					dist = settings.lineDistance + 30;

				if ((Math.max(lineX, cursorX) - Math.min(lineX, cursorX) < dist) && (Math.max(lineY, cursorY) - Math.min(lineY, cursorY) < dist)) {
					opacity = 1; // ideally map distance to 0.0 -> 1.0;
				} else {
					opacity = 0;
				}

				ctx.strokeStyle = "rgba(120, 120, 120," + opacity + ")";

			} else {
				ctx.strokeStyle = "rgba(120, 120, 120, 1)";
			}
			ctx.stroke();
		};
	}


	// Main public method
	function run() {

		// Get mouse position, used to add the free-roaming mouse position effect.
		document.onmousemove = function (e) {
			cursorX = e.pageX;
			cursorY = e.pageY;
		};


		function setup() {
			var i;
			fitToContainer();

			for (i = 0; i < settings.dotnum; i++) {
				points[i] = new Dot();
			}
		}

		setup(); // cute processing3 names

		// Start the animation
		function draw(event) {
			var i, j, straight;

			fitToContainer();

			//Clear canvas for next frame
			ctx.clearRect(0, 0, settings.canvas.width, settings.canvas.height);

			//Check distances between all points and draw lines
			for (i = 0; i < settings.dotnum; i++) {
				for (j = i + 1; j < (settings.dotnum); j++) {
					if (distanceVerifier(points[i].dotX, points[i].dotY, points[j].dotX, points[j].dotY)) {
						straight = new Line(points[i].dotX, points[i].dotY, points[j].dotX, points[j].dotY);
						straight.drawLine();
					}
				}
			}

			// Draw dots
			for (i = 0; i < settings.dotnum; i++) {
				points[i].drawDot();
			}

			window.requestAnimationFrame(draw);

			// dectect no mouse move => ghost mouse!
			setTimeout(function () {
				var tempX = cursorX,
					tempY = cursorY;
				if (cursorX === tempX && cursorY === tempY) {
					cursorX += Math.floor(getRandomFloat(-0.2, 0.4));
					cursorY += Math.floor(getRandomFloat(-0.2, 0.4));
				}
			}, 100);
		}
		window.requestAnimationFrame(draw);

	} // end run()

	return {
		setup: setup,
		start: run
	};
}());