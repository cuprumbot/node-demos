var five = require("johnny-five");

var board = new five.Board();

var servo;

board.on("ready", function() {
	
	//servo = new five.Servo(10);
	servo = new five.Servo({pin:10,
							type:"continuous"});

	board.repl.inject({servo:servo});

	// move() es usado para controlar servos normales
	//servo.move();

	// stop() detiene el movimiento del servo
	// usado tambien para calibrar
	//servo.stop();

	// cw() y ccw() controlan servo continuo
	//servo.cw(0.75);
	//servo.ccw(0.75);
});

forward = function () {
	servo.cw(0.75);
};