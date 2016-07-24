from os import listdir
from os.path import isfile, join
import re
path = "./css/"

files = [f for f in listdir(path) if isfile(join(path, f))]

for f in files:
  print(f)


fileDict = {}
for f in files:
  fLess = re.sub(r"\.css", ".less", f)
  fileDict[fLess] = open(join(path, f), 'r').read()

def preview(fileArry):
  for f in fileArry:
    print("", f, "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~", sep="\n")
    splitArry = fileArry[f].split('\n')
    limit = len(splitArry)
    if (limit > 20):
      limit = 20

    for j in range(0, limit):
      print(splitArry[j])


#preview(fileDict)

newPath = "./less/"

for k, v in fileDict.items():
  filePath = "{0}{1}".format(newPath, k)
  newFile = open(filePath, 'w')
  print(type(v))
  newFile.write(v)
  newFile.close()
