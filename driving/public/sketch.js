const WIDTH = 1000;
const HEIGHT = 600;
var tableVar;
const dataStart = 4;

function preload() {
	tableVar = loadTable('./assets/Data2.csv', 'csv');
}

function setup() {
	createCanvas(WIDTH, HEIGHT);
	background(200);	
	console.log(tableVar.getRow(dataStart).arr);
}

function draw() {

}