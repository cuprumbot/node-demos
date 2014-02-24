var five = require("johnny-five");

var board = new five.Board();

board.on("ready", function() {
	
	var ping = new five.Ping(2);
	ping.on("change", function( err, value ) {

		console.log(this.cm);

	});

});