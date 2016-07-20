#Finds all of the functions in all of my specs that do not currently have any unit tests.
import math
import random as r
import re
from os import listdir
from os.path import isfile, join
typeA = re.compile('function (\w{2,})')
typeB = re.compile('(\w{2,})\.(\w{2,}) = function')
def isTypeA(str):
  if (typeA.match(str)):
    return True
  else:
    return False

def isTypeB(str):
  if (typeB.match(str)):
    return True
  else:
    return False

def trim(str):
  str = re.sub("^([ ]+)", "", str)
  str = re.sub("([ ]+)$", "", str)
  return str

def findAll(myStrArray):
  lines = []
  for str in myStrArray:
    str = trim(str)
    if isTypeA(str) or isTypeB(str):
      lines.append(str)
  return lines

def splitLines(myStr):
  return myStr.split("\n")

path = "src/"
onlyFiles = [f for f in listdir(path) if isfile(join(path, f))]
fileText = []
factories = []
r.seed()
for file in onlyFiles:
  f = path + file
  if (re.match('^.*\.js$', file) and not re.match('^.*\.factory\.js', file)):
    newFile = open(f, 'r')
    fileText.append(newFile.read())
  if re.match('^.*\.factory\.js$', file) and not re.match('^stats\.factory', file):
    newFile = open(f, 'r')
    factories.append(newFile.read())
  elif re.match('^stats\.factory', file):
    fileText.append(newFile.read())
print(fileText[int(math.floor(r.random() * len(fileText)))])
fileSplits = []



finder = re.compile('.*LOOK HERE (.+) LOOK HERE.*', re.MULTILINE)



for file in fileText:
  newFiles = re.sub(r'function (\w{2,})', 'LOOK HERE \1 LOOK HERE', file)
  for f in newFiles:
    print(f)
    fileSplits.append(finder.findall(f))


for file in factories:
  newFiles = re.sub(r'factory\.(\w{2,}) = function\(', 'LOOK HERE \1 LOOK HERE', file)
  for f in newFiles:
    fileSplits.append(finder.findall(f))


#fileSplits = [f for f in fileSplits for g in f if g != '']

for i in range(0, len(fileSplits[0])):
  for j in range(0, len(fileSplits)):
    print(fileSplits[j][i])
