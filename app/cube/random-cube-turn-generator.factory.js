angular.module('myApp')
  .factory('RandomCubeTurnGenerator', RandomCubeTurnGenerator);

RandomCubeTurnGenerator.$inject = ["cubeTurnTypes", "cubeTurns", "cubeTypes"];

function RandomCubeTurnGenerator(turnTypes, turns, cubeTypes) {
  var factory = {};
  factory.cubeType = "3x3x3"; // Set default cube type
  factory.lastTurnType = "";
  factory.lastTurn = "";
  factory.turns = [];
  factory.turnTypes = [];
  factory.randomTurn = randomTurn;
  factory.init = init;


  function init(cubeType) {
    if (cubeType < cubeTypes.length || cubeTYpe in cubeTypes) {
      if (angular.isNumber(cubeType) && cubeType < cubeTypes.length) {
        factory.cubeType = cubeTypes[cubeType];

      } else {
        factory.cubeType = cubeType;
      }
      factory.turns = turns[factory.cubeType];
      factory.turnTypes = turnTypes[factory.cubeType];
    }

  }

  function randomTurn() {
    var randTurn = parseInt(Math.rand() * factory.turns.length);
    var randType = parseInt(Math.rand() * factory.turnTypes.length);

    while (factory.lastTurn == factory.turns[randTurn]) {
      randTurn = parseInt(Math.rand() * factory.turns.length);
    }

    factory.lastTurn = factory.turns[randTurn];
    factory.lastTurnType = factory.turnTypes[randType];
    return factory.lastTurn + factory.lastTurnType;
  }


  return factory;
}
