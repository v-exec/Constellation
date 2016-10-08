//Getting canvas elements
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

//Fit canvas to container before generating objects that depend on canvas sizing
fitToContainer(myCanvas);

//Line drawing thersholds
var linedistance = canvas.width / 20;

//Array of dot objects
var dotnum = 300;
var points = new Array(dotnum);

for (i = 0; i < dotnum; i++) {
    points[i] = new dot();
}

//Primary draw function
function draw() {
    //Fit canvas to container
    fitToContainer(myCanvas);

    //Clear canvas for next frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Check distances between all points and draw lines
    for (i = 0; i < dotnum; i++) {
        for (j = i + 1; j < (dotnum); j++) {
            if (distanceVerifier(points[i].dotX, points[i].dotY, points[j].dotX, points[j].dotY)) {
                var straight = new line(points[i].dotX, points[i].dotY, points[j].dotX, points[j].dotY);
                straight.drawLine();
            }
        }
    }

    //Draw dots
    for (i = 0; i < dotnum; i++) {
        points[i].drawDot();
    }

    //Call frame
    window.requestAnimationFrame(draw);
}

//Call frame when loaded
window.addEventListener("load", draw());