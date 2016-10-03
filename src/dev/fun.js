//Helper functions

//Fit the canvas to its container
function fitToContainer(canvas) {
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}

//Random float generator
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

//Dot distance calculator
function distanceVerifier(dot1X, dot1Y, dot2X, dot2Y) {
    if ((Math.max(dot1X, dot2X) - Math.min(dot1X, dot2X) < linedistance) && (Math.max(dot1Y, dot2Y) - Math.min(dot1Y, dot2Y) < linedistance)) {
        return true;
    } else {
        return false;
    }
}