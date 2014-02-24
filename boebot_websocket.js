johnnyFive = require("johnny-five");
board = new johnnyFive.Board();

webSocket = require('ws');
ws = new webSocket('ws://127.0.0.1:6437');

//keypress = require('keypress');

var r, l;
//var ledClose, ledFar;
//var ping;

//auto stop
acceptOrders = true;
execTime = 1000;

board.on("ready", function() {
  //create instances of servo
  l = new johnnyFive.Servo({pin:11,type:"continuous"});
  r = new johnnyFive.Servo({pin:10,type:"continuous"});

  //ledClose = new johnnyFive.Led(2);
  //ledFar = new johnnyFive.Led(12);
  //ping = new johnnyFive.Ping(13);

  //inject in repl instance
  //board.repl.inject( { r:r, l:l } );

  //keypress(process.stdin);
  //process.stdin.setRawMode(true);
  //process.stdin.resume();
  
  stop();

  // ----- LISTENERS -----
  /*
  process.stdin.on('keypress', function (ch, key) {
    console.log('got "keypress"', key);

    if (key.name == 'up') {
      forward();
    }else if (key.name == 'down') {
      backward();
    }else if (key.name == 'right') {
      right();
    }else if (key.name == 'left') {
      left();
    }else if (key.name == 's'){
      stop();
    }
  });
  */

  /*
  ping.on("change", function(err, value) {
    console.log(this.cm);

    if (this.cm < 20)
      ledClose.on();
    else
      ledClose.off();

    if (this.cm < 40)
      ledFar.on();
    else
      ledFar.off();
  });
  */

  ws.on("message", function(data, flags) {
    frame = JSON.parse(data);

    if (frame.hands && frame.hands.length > 0) {
      direction = frame.hands[0].palmNormal[0];

      //console.log(frame.hands[0].palmPosition[1])

      if (frame.pointables && frame.pointables.length > 0)  //fingers
        if (direction < -0.4)
          exec(right,execTime);
        else if (direction > 0.4)
          exec(left,execTime);
        else
          if (frame.hands[0].palmPosition[1] > 150)         //z-axis position
            exec(forward,execTime);
          else
            exec(backward,execTime);
      else
        stop();
    }
  })
});

// ----- auto stop -----
exec = function (foo,time) {
  if (acceptOrders) {
    acceptOrders = false;
    foo();
    setTimeout(stop,time);
    setTimeout(function () {acceptOrders = true;},time);
  }
}

// ----- BOEBOT -----
stop = function () {
  r.stop();
  l.stop();
}

forward = function () {
  r.ccw(1);
  l.cw(1);
}

backward = function () {
  r.cw(1);
  l.ccw(1);
}

left = function () {
  r.ccw(1);
  l.ccw(1);
}

right = function () {
  l.cw(1);
  r.cw(1);
}