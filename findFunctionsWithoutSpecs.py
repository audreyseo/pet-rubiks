# Finds all of the functions in all of my specs that do not currently have any unit tests.
import findFunctionsWithoutSpecsLib as cleaner


# Beginning of the actual program

cleaner.border("Begin Compiling Files", True)

sourcePath = "src/"
testsPath = "tests/"

sourceFunctions = cleaner.getFunctions(sourcePath, cleaner.findAll, cleaner.prune)
print("\n" * 5)

testFunctions = cleaner.getFunctions(testsPath, cleaner.findSpecs, cleaner.pruneSpecs)

cleaner.border("Completed Compiling Files", False)

# At this point, we should have a list of PURELY function names
# Well at least for each key in myFiles.keys()

cleaner.border("Begin Comparing Files", True)

notInTests = cleaner.mapUniqueFunctions(sourceFunctions, testFunctions)

for fx in notInTests.keys():
  print(fx, len(notInTests[fx]))
  cleaner.box(notInTests[fx])

counter = 0.0
for fx in notInTests:
  counter = counter + len(notInTests[fx])

total = 0.0
for fx in sourceFunctions:
  total = total + len(sourceFunctions[fx])

template = "# of Functions to Go: {0}\nTotal # of Functions: {1}\nTotal Percentage of Completed Functions: {2}%\n# of Functions Completed: {3}"

print(template.format(int(counter), int(total), round(((total - counter) / total) * 100, 2), int(total - counter)))

cleaner.border("Completed Comparing Files", False)
