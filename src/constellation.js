/* Victor Ivanov's Constellation Canvas js Rebased and organized into something sensible and extensible */

/*jslint plusplus: true */

(function () {
	'use strict';

	// Only start when canvas is ready
	document.addEventListener('DOMContentLoaded', function (event) {

		// Parameters 
		var canvas = document.getElementById('canvas'),
			ctx = canvas.getContext('2d'),
			lineDistance = 50,
			dotnum = 400,
			interactive = true,
			points = [dotnum];



		// HELPERS ---------------------

		// Fit the canvas to its container
		function fitToContainer() {
			canvas.style.width = window.innerWidth + 'px';
			canvas.style.height = window.innerHeight + 'px';
			canvas.width = canvas.offsetWidth;
			canvas.height = canvas.offsetHeight;
		}

		// Random float generator
		function getRandomFloat(min, max) {
			return Math.random() * (max - min) + min;
		}

		function distanceVerifier(dot1X, dot1Y, dot2X, dot2Y) { // Dot distance calculator
			if ((Math.max(dot1X, dot2X) - Math.min(dot1X, dot2X) < lineDistance) && (Math.max(dot1Y, dot2Y) - Math.min(dot1Y, dot2Y) < lineDistance)) {
				return true;
			} else {
				return false;
			}
		}

		// Dot class 
		function Dot() {
			this.dotY = getRandomFloat(10, canvas.height);
			this.dotX = getRandomFloat(10, canvas.width);
			this.dotVY = getRandomFloat(-0.1, 0.1);
			this.dotVX = getRandomFloat(-0.1, 0.1);
			this.dotR = getRandomFloat(1, 2.4);

			this.drawDot = function () {
				this.dotX += this.dotVX;
				this.dotY += this.dotVY;

				if (this.dotX + this.dotVX > canvas.width || this.dotX + this.dotVX < 0) {
					this.dotVX = -this.dotVX;
				}

				if (this.dotY + this.dotVY > canvas.height || this.dotY + this.dotVY < 0) {
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

			this.drawLine = function () {
				ctx.beginPath();
				ctx.moveTo(lineX, lineY);
				ctx.lineTo(lineX2, lineY2);
				ctx.lineWidth = 0.7;
				if (interactive) {
					// TODO: filter opacity with mouse
					ctx.strokeStyle = "rgba(120, 120, 120, 1)";
				} else {
					ctx.strokeStyle = "rgba(120, 120, 120, 1)";
				}
				ctx.stroke();
			};
		}

		// Fit canvas to container before generating objects that depend on canvas sizing
		function init() {
			var i;
			fitToContainer();

			for (i = 0; i < dotnum; i++) {
				points[i] = new Dot();
			}
		}
		init();

		function draw() {
			var i, j, straight;

			fitToContainer();

			//Clear canvas for next frame
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			//Check distances between all points and draw lines
			for (i = 0; i < dotnum; i++) {
				for (j = i + 1; j < (dotnum); j++) {
					if (distanceVerifier(points[i].dotX, points[i].dotY, points[j].dotX, points[j].dotY)) {
						straight = new Line(points[i].dotX, points[i].dotY, points[j].dotX, points[j].dotY);
						straight.drawLine();
					}
				}
			}

			// Draw dots
			for (i = 0; i < dotnum; i++) {
				points[i].drawDot();
			}

			window.requestAnimationFrame(draw);
		}
		draw();

	}); // END DOCLoaded

}());