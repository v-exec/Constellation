//dot class
function Dot() {

	this.dotX = getRandomFloat(1, canvas.width);
	this.dotY = getRandomFloat(1, canvas.height);
	this.dotVX = getRandomFloat(-dotSpeed, dotSpeed);
	this.dotVY = getRandomFloat(-dotSpeed, dotSpeed);
	this.dotR = getRandomFloat(dotSizeMin, dotSizeMax);

	//method to update dot position
	this.moveDot = function () {
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
	this.drawDot = function () {
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
	this.drawLine = function () {
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
			if (distanceVerifier(midX, midY, cursorX, cursorY, mouseFalloff)) {
				lineOpacity = 1;
				if (opacityFalloff) {
					lineOpacity = (mouseFalloff - Math.abs(midX - cursorX) + mouseFalloff - (Math.abs(midY - cursorY))) / falloffAmount;
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