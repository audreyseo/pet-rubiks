import math
import random as r
import re
from collections.abc import Iterable
from os import listdir
from os.path import isfile, join

typeA = re.compile('function (\w{2,})')
typeB = re.compile('([\$\w]{2,})\.(\w{2,}) = function')
typeC = re.compile('\$scope')
typeD = re.compile('describe\((.*)\)')
typeE = re.compile('(isEqual|toBe|expect[\(]{0,}|it[\(]{0,})')
typeG = re.compile('http')
typeF = re.compile(' ')

#Thxs to stackoverflow answer here: http://stackoverflow.com/a/17485785/6586966
def flattenList(lis):
	for item in lis:
		if isinstance(item, Iterable) and not isinstance(item, str):
			for x in flattenList(item):
				yield x
		elif isinstance(item, str):	
			yield item
def flatten(lis):
	return list(flattenList(lis))

def border(myStr, beginning):
	borderMax = 1
	myStr = myStr.upper()
	print( "")
	if (beginning):
		print("")
		print("")
		for i in range(0, borderMax + 1):
			print(".~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.~.")
	
	printStr = "==============================================================================="
	for i in range(0, borderMax):
		print(printStr)
	
	length = len(printStr)
	offset = length - len(myStr)
	disp = int(math.ceil(offset / 4.0))
	dispStr = ""
	for i in range(0, disp):
		dispStr += "= "
	message = dispStr + myStr + dispStr[::-1]
	if len(message) > len(printStr):
		off = len(message) - len(printStr)
		message = message[:-off]
	print(message)
	for i in range(0, borderMax):
		print(printStr)
	print("")

def compareLen(a):
	return len(a)

def sortArrayByStringLength(arry):
	return flatten(sorted(arry[:], key=len, reverse=True))

def calculateMaximumNumberOfRows(arry, printString):
	floatMax = (len(arry) / 5.0)
	maxNumRows = math.floor(len(arry) / 5)
	if maxNumRows < 1:
		maxNumRows = 1
	elif (floatMax % 1.0) >= .05:
		maxNumRows += 2
	
	if (maxNumRows == 1):
		total = "".join(arry)
# 		print(len(total) + 4 > len(printString))
		if (len(total) + 4 > len(printString)):
			maxNumRows = 2
	return maxNumRows

def addRow(arry, row):
	arry.append(row)

def withinMargin(strings, count, endString, space, myString, printString):
	return len(strings[count]) + len(endString) + len(space) + len(myString) < len(printString)

def addEndings(strings, separator, printString):
	for i in range(0, len(strings)):
		myString = strings[i]
		lenStr = len(myString)
		lenStr += 2
		remainder = len(printString) - lenStr
		space = separator * remainder
		#print(len(space))
		strings[i] = myString + space + " -"

def boxContents(arry, separator, beginString, endString, printString):
	'''This prints out the contents of the box, aka the columns, rows, as
	well as containing the logic for carrping out the actual organization'''
	# Sort the array by the length of each string
	newArry = sortArrayByStringLength(arry)

	# Get the max number of rows
	maxNumRows = calculateMaximumNumberOfRows(newArry, printString)

	strings = []
	
	fullCount = 0
	count = 0
	skips = []

	# Order the strings in columns
	# from longest string -> shortest string
	for i in range(0, len(newArry)):
		myString = newArry[fullCount]
		space = ""
		thisStrL = len(myString)
		if (i > maxNumRows):
			thisRowL = len(strings[count])
	
		addition = ""

		if len(strings) > 0 and fullCount < maxNumRows:
			space = separator * (len(strings[0]) - (len(myString) + len(beginString)))
		elif len(strings) > 0:
			space = separator * (len(strings[0]) - (len(myString) + len(strings[count])))
	
		if len(strings) == 0:
			addition = beginString + myString + separator * 2
			addRow(strings, addition)
		elif len(strings) < maxNumRows:
			addition = beginString + myString + space
			strings.append(addition);
		else:
			if count == 0:
				addition = myString + separator * 2
			elif len(strings[count]) + len(endString) + len(space) + len(myString) < len(printString):
				addition = myString + space
			elif (count not in skips) and len(strings[count]) + len(endString) + len(space) + len(myString) > len(printString):
				excess = len(printString) - (len(strings[count]) + len(endString))
				spaces = ' ' * excess
				addition = spaces + endString
				i -= 1
				count -= 1
				fullCount -= 1
				count = count % len(strings)
				skips.append(count)

			strings[count] = strings[count] + addition
	
		count = count + 1
		fullCount += 1
		count = count % int(maxNumRows)
	
	# Need to add the string's endings
	addEndings(strings, separator, printString)
	return strings

def box(arry):
	'''
	This function takes an array and draws a box around its contents, arranged in columns from the longest string to the shortest string.
	'''
	printStr = "- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -"
	if len(arry) == 0:
		print(printStr)
		return
	elif len(arry) == 1 and (len(arry[0]) == 0):
		#print(printStr)
		return
	
	baseB = "- "
	baseE = " -"
	sep = ' '
	# Box top
	print(printStr)
	strings = boxContents(arry, sep, baseB, baseE, printStr)
	
	# Finally print out all of the strings
	for myStr in strings:
		print(myStr)
	
	# Box bottom
	print(printStr)
	print("")

def isTypeA(myStr):
	if (typeA.search(myStr)):
		return True
	else:
		return False

def isTypeB(myStr):
	if (typeB.search(myStr)):
		return True
	else:
		return False
def isTypeD(myStr):
	if (typeD.search(myStr)):
		return True
	else:
		return False
def notTypeE(myStr):
	if (typeE.search(myStr)):
		return False
	else:
		return True
def notTypeF(myStr):
	if (typeF.search(myStr)):
		return False
	else:
		return True

def notTypeC(myStr):
	if (typeC.search(myStr)):
		return False
	else:
		return True
def notTypeG(myStr):
	if (typeG.search(myStr)):
		return False
	else:
		return True

def isNotInIt(pattern, string):
	if (pattern.match(string)):
		return False
	elif (pattern.search(string)):
		return False
	else:
		return True

def isInIt(pattern, string):
	if (pattern.match(string)):
		return True
	elif (pattern.search(string)):
		return True
	else:
		return False

def allAreInIt(types, string):
	truth = True
	for t in types:
		truth = truth and isInIt(t, string)
	return truth

def noneAreInIt(types, string):
	truth = True
	for t in types:
		truth = truth and isNotInIt(t, string)
	return truth




def trimSpace(myStr):
	myStr = re.sub("^(\s+)", "", myStr)
	myStr = re.sub("(\s+)$", "", myStr)
	return myStr


def trim(myStr):
	myStr = re.sub("^([\s=]+)", "", myStr)
	myStr = re.sub("([\s{=]+)$", "", myStr)
	return myStr

def trimSpec(myStr):
	a = myStr
	#myStr0 = re.sub("\{.*[}]*", "", myStr)
	myStrA = re.sub("^([\(\s]+)", "", myStr)
	myStrB = re.sub("([\)\s]+)$", "", myStrA)
	myStrC = re.sub("[,\s]*function[\s]*", "", myStrB)
	myStrD = trim(myStrC)
	#print(myStrA, myStrB, myStrC, sep=", ")
	#print(a, myStr)
	return myStrD


def trimArray(arry):
	arry = [trim(a) for a in arry if a != '']
	return arry

def deleteFx(myStr):
	patternA = re.compile("function")
	patternB = re.compile("(\(.*\))*")
	patternC = re.compile("(.*\.)")
	myStr = patternA.sub("", myStr)
	myStr = patternB.sub("", myStr)
	myStr = patternC.sub("", myStr)
	return trim(myStr)

def deleteDescribe(myStr):
	patternA = re.compile("describe")
	myStr = patternA.sub("", myStr)
	patternB = re.compile("[\(\)]")
	myStr = patternB.sub("", myStr)
	#print("Found: ", myStr, sep="")
	myStr1 = trimSpec(myStr)
	#print("Found2: ", myStr1, sep="")
	return myStr1


def findAll(myStrArray):
	lines = []
	for myStr in myStrArray:
		if (isTypeA(myStr) or isTypeB(myStr)) and notTypeG(myStr) and notTypeC(myStr):
			lines.append(deleteFx(myStr))
	return lines

def findSpecs(myStrArray):
	lines = []
	undesirables = [",", ";", "\}", "\)", "^[A-Z]{1}[a-zA-Z0-9]+"]
	undesired = [re.compile(pattern) for pattern in undesirables]
	for myStr in myStrArray:
		#myStr = trimSpec(myStr)
		if (noneAreInIt(undesired, myStr)):
			lines.append(trimSpec(deleteDescribe(myStr)))
	return lines

def splitLines(myStr):
	return myStr.split("\n")

def prune(arry):
	patternA = re.compile("//(\s)(.)*")
	patternB = re.compile("console\.log\(*\)")
	arry = [a for a in arry if not patternA.match(a)]
	arry = [b for b in arry if not patternB.search(b)]
	arry = [c for c in arry if not typeG.search(c)]
	#print("Src:", arry)
	return arry

def purge(arry):
	undesirables = [r"isDefined", r";", r":", r"functions", r"return", r"=", r"var", r"(describe\([\"\']{1}[A-Z]{1}[a-z]+: [a-zA-Z]+[\'\"]{1},)", r"beforeEach", r"toHaveBeen", r"spyOn", r"spy", r"expect", r"toBe", r"toEqual", r"(\s+)it", r"//"]
	undesiredPatterns = [re.compile(x) for x in undesirables]
	#arry = [a for a in arry for pattern in undesiredPatterns if not (pattern.match(a) or pattern.search(a))]
	myList = []
	for a in arry:
		if noneAreInIt(undesiredPatterns, a):
			myList.append(a)
# 		elif isInIt(re.compile("(describe)"), a):
# 			print("Trash: ", a, "because:")
# 			why = ""
# 			for pat in undesiredPatterns:
# 				if isInIt(pat, a):
# 					why = why + pat.pattern + " "
# 			print(why)
	return myList

def pruneSpecs(arry):
	
	myList = purge(arry)
# 	print("\n".join(myList))
	pattern0 = re.compile(r"describe\([\'\"]([\$]{0,1}scope\.|\w+\.){0,1}([\w\.]*)(\(\)){0,}[\'\"],.*$")
	#	pattern1 = re.compile("\"([\w\.]*)\"")
	pattern2 = re.compile(r"[\'\"](\tTest:\t)[\'\"]")
	pattern3 = re.compile(r"function.*")
	patternA = re.compile(r"[\\/\*\s\;\'\"\(\)]*")
	# print(arry)
	arryB = [pattern0.sub(r"\2", a) for a in myList]
	print(" | ".join(arryB))
	#arryC = [pattern1.sub(r"\0", a) for a in arryB]
	arryC = [pattern2.sub("", a) for a in arryB]
	arryC = [pattern3.sub("", a) for a in arryC]
	arryD = [patternA.sub("", a) for a in arryC]
	arryE = [re.compile(r"\t+").sub(" ", a) for a in arryD]
	arryF = []
	#arryF = [e for e in arryE if notTypeG(e)]
	for e in arryE:
		if (notTypeG(e)):
			arryF.append(e)
		else:
			arryF.append("")

	arryG = [f for f in arryF if f != ""]
# 	print(" | ".join(arryG))
# 	allStrings = []
# 	allStrings.append("A\tB\tC\tD\tE\tF")
# 	for i in range(0, len(arryB)):
# 		printString = "---------------------------------------------------------"
# 		myString = trimSpace(myList[i])
# 		myString = myString + "\t" + trimSpace(arryB[i])
# 		myString = myString + "\t" + trimSpace(arryC[i])
# 		myString = myString + "	" + trimSpace(arryD[i])
# 		myString = myString + "	" + trimSpace(arryE[i])
# 		if (len(arryF) > i):
# 		myString = myString + "	" + trimSpace(arryF[i])
# 		#if (len(arryG) > i):
# 		#	myString = myString + "	" + trimSpace(arryG[i])
# 		allStrings.append(myString)
	#print("\n".join(allStrings)) 
	#print("\n".join(arryG))
	return arryG

def getFunctions(path, myFinder, myPruner):
	onlyFiles = [f for f in listdir(path) if isfile(join(path, f)) and not re.search(r"\.py", f)]
	fileSplits = []
	myFiles = {}

	for file in onlyFiles:
		f = path + file
		fStr = open(f, 'r').read()
		splits = myPruner(splitLines(fStr))
		#	print(','.join(trimArray(splits)))
		myFiles[file] = list(flatten(myFinder(splits)))
	
	#print(myFiles)
	for f in myFiles.keys():
		myFiles[f] = [x for x in myFiles[f] if notTypeG(x)]
	#print(myFiles)
	# length = len(fileSplits)
	# if length > 100:
	#	length = 100
	
	for f in myFiles.keys():
		print(f)
		box(myFiles[f])

	return myFiles

def mapUniqueFunctions(srcFxs, testFxs):
	newDict = {}
	patternSub = re.compile(r"\.(.*)\.");
	
	lookupDict = {key: set(value) for key, value in testFxs.items()}
	
	for k,value in srcFxs.items():
	  kT = patternSub.sub(".spec.", k)
# 	  print(kT, kT not in testFxs)
	  if (kT not in testFxs):
	  	newDict[k] = []
	  	newDict[k].append(value)
	  else:
	  	for v in value:
	  		if v not in testFxs[kT]:
# 	  			print(v, testFxs[kT], sep=": ")
	  			if k not in newDict:
	  				newDict[k] = []
	  				newDict[k].append(v)
	  			else:
	  		 		newDict[k].append(v)
	newDict = {key: value for key, value in newDict.items()
		if len(value) != 0 and len(value[0]) != 0}
# 	newDict = {key: value[0] for key, value in newDict.items()}
	return newDict

