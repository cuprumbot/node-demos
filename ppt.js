//import johnny-five and connect a board
five = require('johnny-five');
board = new five.Board();

//import WebSocket and create a connection
webSocket = require('ws');
ws = new webSocket('ws://127.0.0.1:6437');

flag = true;

//will trigger when board is created
board.on('ready', function() {
	
	//abstraction for servos provided by johnny-five
    wrist = new five.Servo(10);
    claw = new five.Servo(11);

    //will trigger when WebSocket connection receives a message
    ws.on('message', function(data, flags) {
    	
    	//Leap Motion uses JSON to send data through WebSocket
        frame = JSON.parse(data);

        //check if frame contain useful information
        if (frame.hands && frame.hands.length >= 1) {

        	if (frame.pointables && flag) {
        		flag = false;

        		var c,w;

        		fingers = frame.pointables.length;

        		switch (fingers) {
        		case 0:
        		case 1:
        			c = 60;
        			w = 90;
        			console.log("Piedra, responder con papel.");
        			break;
        		case 2:
        			c = 0;
        			w = 90;
        			console.log("Tijera, responder con piedra.");
        			break;
        		case 5:
        			c = 40;
        			w = 0;
        			console.log("Papel, responder con tijera");
        			break;
        		default:
        			c = 0;
        			w = 0;
        		}

				//changing servo position
				wrist.to(w);
				claw.to(c);

				setTimeout(function() {
										flag = true;
				},3000);

        	} //end if
        } //end if
    }); //end ws.on("message")
}); //end board.on("ready")