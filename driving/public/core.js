const w = 500;
const h = 200;

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
				.range([h-20, 0]);
			
			var yAxis = d3.axisLeft()
					.scale(yScale);
			
			var xAxis = d3.scaleLinear()
			      .domain([0, data.length])
			      .range([20, w]);

			svg.append("g")
			      .attr("transform", "translate(0," + h + ")")
			      .call(d3.axisBottom(xAxis));

			d3.select('svg')
				.append('g')
				.attr('transform', 'translate(20,10)')
				.call(yAxis);

			svg.append("path")
		      .datum(data)
		      .attr("fill", "none")
		      .attr("stroke", "steelblue")
		      .attr("stroke-width", 1.5)
		      .attr("d", d3.line()
		        .x(function(d,i) {return xAxis(i) })
		        .y(function(d) { return yScale(d[1]) })
		    );
			/*
			svg.append("path")
		      .datum(data)
		      .attr("fill", "none")
		      .attr("stroke", "red")
		      .attr("stroke-width", 1.5)
		      .attr("d", d3.line()
		        .x(function(d,i) {return xAxis(i) })
		        .y(function(d) { return yScale(d[1]) })
		    );

		    svg.append("path")
		      .datum(data)
		      .attr("fill", "none")
		      .attr("stroke", "black")
		      .attr("stroke-width", 1.5)
		      .attr("d", d3.line()
		        .x(function(d,i) {return xAxis(i) })
		        .y(function(d) { return yScale(d[1]) })
		    );
		    */
		});