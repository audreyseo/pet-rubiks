angular.module('myApp')
  .value('cubeTurns', {
    "3x3x3": ["F", "B", "R", "L", "D", "U"],
    "2x2x2": ["F", "B", "R", "L", "D", "U"],
    "4x4x4": ["F", "B", "R", "L", "D", "U", "Uw", "Rw", "Lw", "Fw", "Bw", "Dw", "r", "l", "f", "b", "u", "d"],
    "Pyraminx": ["F", "R", "L", "U", "f", "u", "r", "l"]
  });
