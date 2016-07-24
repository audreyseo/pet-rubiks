import re
f = open('index.html', 'r')

text = f.read();
f.close();
patternA = r'<script type\=\"text/javascript\" src\=\"\/app/app\.modu(le\.js\"></script>){0,1}'
patternB = r'<script type\=\"text/javascript\" src\=\"\/js/animation(\.js\"></script>){0,1}'
patternAB = r".*"
#escapedA = re.escape(patternA)
#escapedB = re.escape(patternB)

patternC = '<link rel="stylesheet" type="text/css" href="/css/basic.css">'
patternD = '<link rel="stylesheet" type="text/css" href="/css/casesTable.css">'

#print(escapedA, escapedB, sep="\n")
print()
#fullPattern = "{0}{1}{2}".format(escapedA, patternAB, escapedB)
fullPattern = patternA + patternAB + patternB #"{0}{1}{2}".format(patternA, patternAB, patternB)
finder = re.compile(fullPattern, re.MULTILINE)
#print(text)
template = '<script type="text/javascript" src="{0}"></script>\n<script type="text/javascript" src="js/animation.min.js"></script>'
replacer = "js/app.min.js"
newText = text
filledTemplate = template.format(replacer)

print(len(newText))
thisText = finder.sub(template.format(replacer), newText)
#print(len(text))
#print(len(newText))
print(thisText)

print(finder.search(newText))
print(re.search(patternA, newText))
print(re.search(patternB, newText))

lines = newText.split("\n")
indices = []
minInd = 0
maxInd = 0
for i in range(0, len(lines)):
  line = lines[i]
  if (re.search(patternA, line)):
    minInd = i
  elif (re.search(patternB, line)):
    maxInd = i

for i in range(minInd, maxInd + 1):
  lines[i] = "REPLACE ME A"

minInd = 0
maxInd = 0
for i in range(0, len(lines)):
  line = lines[i]
  if (re.search(patternC, line)):
    minInd = i
  elif (re.search(patternD, line)):
    maxInd = i

for i in range(minInd, maxInd + 1):
  lines[i] = "REPLACE ME B"

print("\n".join(lines))

myNewText = "\n".join(lines)

myNewText = re.sub(r"(REPLACE ME A\n)+", filledTemplate, myNewText)
myNewText = re.sub(r"(REPLACE ME B\n)+", '<link rel="stylesheet" type="text/css" href="css/pretty.min.css">', myNewText)

print(myNewText)

f = open("build/index.html", "w")
f.write(myNewText)
f.close()
