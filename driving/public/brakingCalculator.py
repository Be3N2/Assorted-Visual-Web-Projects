import csv

from linearBrake import linearBrakeSmoothness 
from simpleCosine import * 

stored = []
#holds objects formatted as follows:
#{data: [], start: #, stop: #, smoothness}

with open('./assets/Data1.csv') as csv_file:
	csv_reader = csv.reader(csv_file, delimiter=',')
	line_count = 0
	started = False
	emptyObj = {"brake": [], "speed": [], "length": 0, "start": 0, "stop": 0}

	#read and calculate
	for row in csv_reader:
		#if line_count == 0 then row[2] holds the header
		if line_count > 0:
			if float(row[2]) > 1:
				if started == False:
					emptyObj["start"] = line_count
					started = True
				emptyObj["brake"].append(float(row[2]))
				emptyObj["speed"].append(float(row[1]))
			elif started == True:
				#end the data collection
				emptyObj["stop"] = line_count - 1
				emptyObj["length"] = line_count - emptyObj["start"]
				stored.append(emptyObj)
				#reset the data objects
				emptyObj = {"brake": [], "speed": [], "length": 0, "start": 0, "stop": 0}
				started = False

		line_count += 1

	#The data is split into each section the brake was used
	#for each section there exists an object in stored

	#for each entry now add linearSmoothness, CosSmoothness
	#also appended is the Cos curve compared too
	totalLinearPercentage = 0
	totalCosPercentage = 0
	for entry in stored:
		entry = linearBrakeSmoothness(entry)
		entry = CosSmoothness(entry)
		totalLinearPercentage += entry["linearSmoothness"]
		totalCosPercentage += entry["CosBrakeSmoothness"]
		#print(entry)	
	
	aveLinearSmoothness = totalLinearPercentage / len(stored)
	aveCosSmoothness = totalCosPercentage / len(stored)
	print("Average Linear Smoothness ", aveLinearSmoothness)
	print("Average Cosine Smoothness ", aveCosSmoothness)


with open('./assets/Data1.csv') as csv_file:
	with open('./assets/Data1Test.csv', 'w') as csv_out:
		#write outputted cosine curves
		csv_writer = csv.writer(csv_out, lineterminator='\n')
		csv_reader = csv.reader(csv_file, delimiter=',')
		line_count = 0
		output = []
		for row in csv_reader:
			if line_count == 0:
				row.append("Cosine Curves")
				output.append(row)
			else: 
				row.append(0)
				output.append(row)
			line_count += 1
		for entry in stored:
			#entry["stop"] is inclusive so must add 1
			for i in range(len(entry["CosCurve"])):
				currentIndex = entry["start"] + i
				output[currentIndex][-1] = entry["CosCurve"][i]
		csv_writer.writerows(output)