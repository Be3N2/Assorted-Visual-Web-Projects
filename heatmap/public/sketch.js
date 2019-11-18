var tableVar;
var runCounter = 0;
var head = 0;
var circleWidth = 20;

var heatmap = [];
var WIDTH = 1000;
var HEIGHT = 600;
var mappedHeatmap = [];

function preload() {
	tableVar = loadTable('./assets/data.csv', 'csv');
}
function setup() {
	createCanvas(WIDTH, HEIGHT);
	background(200);	

	clearHeatmap();
}

function draw() {
	background(200,200,200,10);
	runCounter++;
	var reduced = Math.floor(runCounter / 2);
	if (head < tableVar.getRowCount()) {
		var tableArr = tableVar.getRow(head).arr;
		if (reduced == tableArr[2]) {
			fill(0);
			ellipse(tableArr[0], tableArr[1], circleWidth, circleWidth);
			addPoint(tableArr[0], tableArr[1]);
			head++;
		}
	} else {
		console.log("finished");
		MapToColor();
		let img = createImage(WIDTH, HEIGHT);
		img.loadPixels();
		for (let y = 0; y < HEIGHT; y++) {
			for (let x = 0; x < WIDTH; x++) {
				img.set(x, y, color(mappedHeatmap[x + y * WIDTH], mappedHeatmap[x + y * WIDTH], mappedHeatmap[x + y * WIDTH]));
			}
		}
		img.updatePixels();
		image(img, 0, 0);
	}
}

//Heatmap code
function clearHeatmap() {
	//set heatmap to 0's
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			heatmap[x + y * width] = 0;
		}
	}

}

function addPoint(x, y) {

	effectRange = 50;
	maxRadius = Math.sqrt(effectRange * effectRange + effectRange * effectRange);
	radius = (maxRadius / 4) * 3;
	for (let i = -1 * effectRange; i <= effectRange; i++) {
		for (let j = -1 * effectRange; j <= effectRange; j++) {
			let newX = int(x) + j;
			let newY = int(y) + i;
			if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
				let distance = dist(x,y,newX,newY);
				//max distance is 50x and 50y thus a^2 + b^2 = c^2
				//solve for c rounded down is 70 max distance
				//subtracting from 70 makes it highest at the center
				if (distance <= radius) {
					let value = (radius - distance);
					//let value = 1000 * radius;
					//if (distance >= 1) value = 1000 * (radius / distance);
					heatmap[newX + newY * width] = heatmap[newX + newY * width] + value;
				}
			}

		}
	}
}

function findMax() {
	let highest = 0;
	for (let y = 0; y < HEIGHT; y++) {
		for (let x = 0; x < WIDTH; x++) {
			if (heatmap[x + y * WIDTH] > highest) highest = heatmap[x + y * WIDTH];
		}
	}
	console.log(highest);
	return highest;
}

function MapToColor() {
	let max = findMax();
	for (let y = 0; y < HEIGHT; y++) {
		for (let x = 0; x < WIDTH; x++) {
			mappedHeatmap[x + y * WIDTH] = map(heatmap[x + y * WIDTH], 0,max,0,255);
		}
	}
}