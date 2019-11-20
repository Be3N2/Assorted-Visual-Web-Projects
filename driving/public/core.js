const w = 800;
const h = 300;

const rectWidth = 10;
const rectHeight = 10;

const svg = d3.select("body")
              .append("svg")
              .attr("width", w)
              .attr("height", h)
              .attr("class","chart");

d3.request("./assets/ModifiedData.csv")
		.mimeType("text/csv")
		.response(function (xhr) {
			//console.log (d3.csvParse(xhr.responseText)); 
			var data = d3.csvParse(xhr.responseText);
			var formattedArr = [];
			data.forEach((d) => {
				var formatted = [+d["Fail Time"], +d.Speed, +d.Brake, +d.Gas, +d.Steering, +d["X-Position"], +d["Z-Position"]];
				formattedArr.push(formatted);
			});
			return formattedArr;
		})
		.get(function(data) {
			console.log(data);

			var maxSpeed = d3.max(data, datum => datum[1]);
			console.log(maxSpeed);
			var yScale = d3.scaleLinear()
				.domain([0, maxSpeed])
				.range([h, 0]);
			
			var yAxis = d3.axisLeft()
					.scale(yScale);
			
			var xScale = d3.scaleLinear()
			      .domain([0, data.length])
			      .range([21, w]);

			svg.append("g")
			      .attr("transform", "translate(0," + h + ")")
			      .call(d3.axisBottom(xScale));

			d3.select('svg')
				.append('g')
				.attr('transform', 'translate(20,10)')
				.call(yAxis);

			svg.append("path")
		      .datum(data)
		      .attr("fill", "none")
		      .attr("stroke", "steelblue")
		      .attr("stroke-width", 1.5)
		      .attr("id", "speed")
		      .attr("d", d3.line()
		        .x(function(d,i) {return xScale(i) })
		        .y(function(d) { return yScale(d[1]) })
		    );

			var maxBrake = d3.max(data, datum => datum[2]);

			var brakeYScale = d3.scaleLinear()
				.domain([0, maxBrake])
				.range([h, 0]);

			svg.append("path")
		      .datum(data)
		      .attr("fill", "none")
		      .attr("stroke", "red")
		      .attr("stroke-width", 1.5)
		      .attr("id", "brake")
		      .attr("d", d3.line()
		        .x(function(d,i) {return xScale(i) })
		        .y(function(d) { return brakeYScale(d[2]) })
		    );

		    var maxGas = d3.max(data, datum => datum[3]);

			var gasYScale = d3.scaleLinear()
				.domain([0, maxGas])
				.range([h, 0]);
		      
		    svg.append("path")
		      .datum(data)
		      .attr("fill", "none")
		      .attr("stroke", "black")
		      .attr("stroke-width", 1.5)
		      .attr("id", "gas")
		      .attr("d", d3.line()
		        .x(function(d,i) {return xScale(i) })
		        .y(function(d) { return gasYScale(d[3]) })
		    ); 
		});

function toggleSpeed() {
	var opacity = d3.select("#speed").style("opacity");
	d3.selectAll("#speed").transition().style("opacity", opacity == 1 ? 0:1)
}

function toggleBrake() {
	var opacity = d3.select("#brake").style("opacity");
	d3.selectAll("#brake").transition().style("opacity", opacity == 1 ? 0:1)
}

function toggleGas() {
	var opacity = d3.select("#gas").style("opacity");
	d3.selectAll("#gas").transition().style("opacity", opacity == 1 ? 0:1)
}