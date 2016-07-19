from os import listdir
from os.path import isfile, join
myPath = "./"
onlyfiles = [f for f in listdir(myPath) if isfile(join(myPath, f))]

for file in onlyfiles:
  template = "<script src='spec/{0}'></script>"
  print template.format(file)
