/* Constellation.js | v1.0.6 - stable
 * 
 * Original design by Victor Ivanov
 * (MIT) Michael Hemingway @ Arthem. Mtl
 */

var Constellation = (function () {
	'use strict';

	// these are the constellation defaults.
	var settings = {
			canvas: document.getElementById('canvas'),
			lineDistance: 100,
			dotnum: 160,
			interactive: true,
			strokeColor: 'rgb(120,120,120)',
			dotColor: 'rgb(220,220,220)'
		},
		ctx, // canvas context
		dpr, // device pixel ratio
		bsr, // backing store ratio 
		points,
		pixelRatio,
		cursorX,
		cursorY;

	// update settings with object passed by end user.
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
		// fix dependent variables
		ctx = settings.canvas.getContext('2d');
		points = [settings.dotnum];
		dpr = window.devicePixelRatio || 1;
		bsr = ctx.webkitBackingStorePixelRatio ||
			ctx.mozBackingStorePixelRatio ||
			ctx.msBackingStorePixelRatio ||
			ctx.oBackingStorePixelRatio ||
			ctx.backingStorePixelRatio || 1;
		pixelRatio = dpr / bsr;
		settings.canvas.width = settings.canvas.parentElement.clientWidth;
		settings.canvas.height = settings.canvas.parentElement.clientHeight;
	}





	// _HELPERS ---------------------

	// returns "rgba(x,y,z," to be integrated with variable opacity
	function rgbaConverter(color) {
		color = color.replace(/[^\d,]/g, '').split(',');
		// so to be completed with 
		return 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',';
	}

	// Fit the canvas to its container
	function fitToContainer() {
		var ratio = pixelRatio;
		settings.canvas.style.width = settings.canvas.parentElement.clientWidth * ratio;
		settings.canvas.style.height = settings.canvas.parentElement.clientHeight * ratio;
		settings.canvas.width = settings.canvas.parentElement.clientWidth * ratio;
		settings.canvas.height = settings.canvas.parentElement.clientHeight * ratio;
		//ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
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
			ctx.fillStyle = rgbaConverter(settings.dotColor) + '1)';
			ctx.fill();
		};
	}

	// Line class
	function Line(lineX, lineY, lineX2, lineY2) {
		this.lineX = lineX;
		this.lineY = lineY;
		this.lineX2 = lineX2;
		this.lineY2 = lineY2;

		var opacity = 0.7,
			sc = rgbaConverter(settings.strokeColor);

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

				ctx.strokeStyle = sc + opacity + ")";

			} else {
				ctx.strokeStyle = sc + '1)';
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
					cursorX += Math.floor(getRandomFloat(-0.20, 0.20));
					cursorY += Math.floor(getRandomFloat(-0.20, 0.20));
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