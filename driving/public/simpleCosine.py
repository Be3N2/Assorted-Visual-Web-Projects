import math

def scaleValues(minV, maxV, value):
	valueRange = maxV - minV
	return value / valueRange

def cosineInterpolation(y1, y2, mu):
	mu2 = (1 - math.cos(mu * math.pi)) / 2
	return y1 * (1 - mu2) + y2 * mu2

def buildCosArr(y1, y2, length):
	returnArr = []
	for i in range(length):
		if length != 1:
			mu = scaleValues(0, length - 1, i)
		else:
			mu = i
		returnArr.append(cosineInterpolation(y1,y2,mu))
	return returnArr

def maxDist(minimum, maximum, curve):
	#given a curve determines the max distance sum from the curve
	median = minimum + ((maximum - minimum) / 2)
	maxDistSum = 0
	for value in curve:
		if value < median:
			maxDistSum += maximum - value
		else:
			maxDistSum += value - minimum
	return maxDistSum

def CosSmoothness(dataObj):
	#split it into two parts, going up then going down
	half = int(dataObj["length"] / 2)
	maximum = max(dataObj["brake"])

	leftSide = buildCosArr(0, maximum, half + 1)
	rightSide = buildCosArr(maximum, 0, dataObj["length"] - half + 1)
	
	curve = leftSide + rightSide

	#delete the leading and final 0
	del curve[0]
	del curve[-1]
	#curve now has the same length as the brake data

	#now compare the braking pattern of obj vs curve
	sumChange = 0
	for i in range(dataObj["length"]):
		sumChange += abs(curve[i] - dataObj["brake"][i])
	#sumChange now holds the total distance from the perfect curve
	
	#worstChange is opposite of bell curve
	worstChange = maxDist(0, maximum, curve)

	percent = 1 - (sumChange / worstChange)
	#print(percent) 
	dataObj["CosBrakeSmoothness"] = percent
	dataObj["CosCurve"] = curve
	return dataObj

#exObject = {'brake': [30.98039, 100.0, 100.0, 100.0, 100.0, 100.0, 100.0, 100.0, 100.0, 100.0, 100.0, 100.0, 100.0, 100.0, 100.0, 100.0, 100.0, 100.0, 100.0, 100.0, 100.0, 100.0, 27.05882], 'speed': [34.04353, 33.61234, 31.80285, 30.09718, 28.07928, 26.40442, 24.45681, 22.50629, 20.91343, 18.70289, 16.52438, 14.98576, 13.46367, 11.66184, 10.19289, 8.704392, 6.964608, 5.534497, 3.834012, 2.433289, 1.047972, 0.001016026, 0.000262499], 'length': 23, 'start': 1090, 'stop': 1112}
#print(CosSmoothness(exObject))