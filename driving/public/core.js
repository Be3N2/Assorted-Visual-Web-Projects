const w = 500;
const h = 100;

const rectWidth = 50;
const rectHeight = 50;

const svg = d3.select("body")
              .append("svg")
              .attr("width", w)
              .attr("height", h);

const dataArr = [];
d3.csv("./assets/ModifiedData.csv", function(data) {
	dataArr = data.map(function(d) {
		return [+d["Fail Time"], +d.Speed, +d.Brake, +d.Gas, +d.Steering, +d.X-Position, +d.Z-Position];
	});
});

//scale - get out of json format

svg.select('rect')
  	.data(dataArr)
	.enter() 
	.append('rect')
	.attr('x', (d,i) => i)
	.attr('y', (d,i) => d[2])
	.attr('width', rectWidth)
	.attr('height', rectHeight)
	.attr('fill', 'blue')
	.attr('stroke', '#fff');
