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

//check if two dots' X and Y coordinates are closer than lineDistance
function distanceVerifier(dot1X, dot1Y, dot2X, dot2Y, distanceComparator) {
	return ((Math.abs(dot1X - dot2X) < distanceComparator) && (Math.abs(dot1Y - dot2Y) < distanceComparator));
}