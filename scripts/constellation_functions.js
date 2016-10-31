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