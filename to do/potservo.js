var five = require("./lib/johnny-five"),
    board, potentiometer, servo, button;

board = new five.Board();

board.on("ready", function() {

  potControl = true;

  // Create a new `potentiometer` hardware instance.
  potentiometer = new five.Sensor({
    pin: "A2",
    freq: 100
  });

  servo = new five.Servo(10);

  button = new five.Button(8);

  // Inject the `sensor` hardware into
  // the Repl instance's context;
  // allows direct command line access
  board.repl.inject({
    pot: potentiometer,
    servo: servo,
    button: button
  });

  // "read" get the current reading from the potentiometer
  potentiometer.on("read", function( err, value ) {
    if (potControl) {
      n = value * 180 / 1023;
      console.log( value, n );
      servo.move(n);
    }
  });

  button.on("down", function() {
    potControl = false;
    servo.center();
    setTimeout(function() {potControl = true;}, 1000);
  })
});
