/*
Assuming the data is in a mongodb database similar to:

User collection
{
	participant_id: 42,
	first_name: "John",
	last_name: "Doe",
	date_partipated: 451231
}

Data collection
{
	participant_id: 42,
	fail_time: 3,
	speed: [],
	gas: [],
	steering: [],
	posX: [],
	posZ: [],
	intersection: [],
	nodeX: [],
	nodeZ: [],
	nodeAngle: []
},
{
	participant_id: 42,
	fail_time: 5,
	speed: [],
	gas: [],
	steering: [],
	posX: [],
	posZ: [],
	intersection: [],
	nodeX: [],
	nodeZ: [],
	nodeAngle: []
}
*/

function mean(dataArray) {
	let sum = 0;
	for (let i = 0; i < dataArray.length; i++) {
		sum += dataArray[i];
	}
	return sum / dataArray.length;
}

function standardDev(dataArray) {
	let dataMean = mean(dataArray);
	let sum = 0;
	for (let i = 0; i < dataArray.length; i++) {
		let diff = dataArray[i] - dataMean;
		sum += Math.pow(diff, 2);
	}
	
	averageSum = sum / dataArray.length;
	
	return Math.sqrt(averageSum);
}

function rootMeanSquare(input, curve) {
	/*
		Assuming input is y data and curve is yhat and that the length of both is the same.
		(Which I can guarantee as it will be the cut out length of data in which the turn curve is created for)
	*/
	let sum = 0;
	for (let i = 0; i < input.length; i++) {
		sum += Math.pow((curve[i] - input[i]), 2);
	}
	sum = sum / input.length;
	return Math.sqrt(sum);

}

