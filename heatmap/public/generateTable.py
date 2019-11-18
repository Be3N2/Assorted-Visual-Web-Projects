
import random

items = 100
maxX = 1000
maxY = 600

randX = [random.randint(0, maxX) for iter in range(items)]
randY = [random.randint(0, maxY) for iter in range(items)]
randTime = [random.randint(0,maxX) for iter in range(items)]

randTime.sort()

print(randTime)

outF = open("data.csv", "w")
for i in range(items):
	outF.write(str(randX[i]))
	outF.write(",")
	outF.write(str(randY[i]))
	outF.write(",")
	outF.write(str(randTime[i]))
	outF.write("\n")

