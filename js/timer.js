/**
 * Code from Stackoverflow:
 * http://stackoverflow.com/questions/20318822/how-to-create-a-stopwatch-using-javascript
 * With some modifications for my own purposes, although
 * all of the functions are not mine unless otherwise stated.
 * http://usejsdoc.org/
 */

var Stopwatch = function(elem, options) {

  var timer       = createTimer(),
      startButton = createButton("start", start),
      stopButton  = createButton("stop", stop),
      resetButton = createButton("reset", reset),
      offset,
      clock,
      time,
      state,
      interval;

  // default options
  options = options || {};
  options.delay = options.delay || 3;
	
  // Another one of my additions:
  state = {running: false, stopped: false};
  time = "00:00.00";
  clock = 9.5 * 60 * 1000;
  // append elements     
  elem.appendChild(timer);
  elem.appendChild(document.createElement("br"));
  elem.appendChild(startButton);
  elem.appendChild(stopButton);
  elem.appendChild(resetButton);

  // initialize
  reset();

  // private functions
  function createTimer() {
    return document.createElement("span");
  }

  function createButton(action, handler) {
    var a = document.createElement("a");
    a.href = "#" + action;
    a.innerHTML = action;
    a.addEventListener("click", function(event) {
      handler();
      event.preventDefault();
    });
    return a;
  }

  function start() {
  	console.log("helppppp!!");
  	reset();
    if (!interval) {
    	state.running = true;
    	state.stopped = false;
      offset   = Date.now();
      interval = setInterval(update, options.delay);
      
    }
  }
  function start() {
    if (!interval) {
      offset   = Date.now();
      interval = setInterval(update, options.delay);
    }
  }

  function stop() {
    if (interval) {
    	state.running = false;
    	state.stopped = true;
      clearInterval(interval);
      interval = null;
    }
  }

  function reset() {
  	console.log("help mee!!!");
    clock = 9 * 60 * 1000;
    render();
  }
  function stop() {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }

  function reset() {
    clock = 0;
    render();
  }

  function update() {
    clock += delta();
    render();
  }

  function render() {
  	var minutes = ((clock < 1000 * 60) ? "00" : ((clock < 10 * 60 * 1000) ? "0" + parseInt(clock / 60000) : parseInt(clock / 60000)));
  	var seconds = (((clock % 60000) < 1000) ? ":00" : (((clock % 60000) < 1000 * 10) ? ":0" + parseInt((clock % 60000) / 1000) : ":" + parseInt((clock % 60000) / 1000)));
    var milliseconds = (((clock % 1000) < 10) ? ".00" + parseInt(clock % 1000) : ((clock % 1000) < 100) ? ".0" + (clock % 1000) : "." + (clock % 1000));
  	time = minutes + seconds + milliseconds;
  	timer.innerHTML = time; 
  }

  function delta() {
    var now = Date.now(),
        d   = now - offset;

    offset = now;
    return d;
  }

  // public API
  this.start  = start;
  this.stop   = stop;
  this.reset  = reset;
};

// Also basically not my code:
var elems = document.getElementsByClassName("stopwatch");
var timers = [];

for (var i=0, len=elems.length; i<len; i++) {
  timers.push(new Stopwatch(elems[i]));
}