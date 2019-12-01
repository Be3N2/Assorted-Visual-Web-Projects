def linearBrakeSmoothness(dataObj):
	#receives an object holding all the information
	#returns that object with a linearSmoothness field
	sumChange = 0
	for i in range(dataObj["length"]):
		if i == 0:
			sumChange = dataObj["brake"][i] - 0
		else:
			previous = dataObj["brake"][i - 1]
			sumChange += abs(dataObj["brake"][i] - previous)
	#print(sumChange)

	aveChange = sumChange / dataObj["length"]
	#print(aveChange)
	worstAveChange = 100
	percent = 1 - (aveChange / worstAveChange)

	dataObj["linearSmoothness"] = percent

	return dataObj