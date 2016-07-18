import re
f = open('stats.factory.js', 'r')

myFile = f.read()

fxs = re.findall(r'function (\w{2,})\(', myFile);

fxs = sorted(fxs, key=str.lower)

for str in fxs:
  print "factory." + str + " = " + str + ";"
