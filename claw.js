//import johnny-five and connect a board
five = require('johnny-five');
board = new five.Board();

//import WebSocket and create a connection
webSocket = require('ws');
ws = new webSocket('ws://127.0.0.1:6437');

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

        	//angle for wrist based on position of palm
            w = 90 + (90 * frame.hands[0].palmNormal[0]);
			
            //angle for claw based on number of fingers
			c = 0;
			if (frame.pointables) {
				//will ignore one finger and limit movement of claw
				c = (frame.pointables.length - 1) * 15;
				if (c > 60) c = 60;
				if (c < 0) c = 0;
			}

			//displaying values
			console.log("claw:\t" + c.toFixed(1) + "\twrist:\t" + w.toFixed(1));

			//changing servo position
			wrist.to(w);
			claw.to(c);

        } //end if
    }); //end ws.on("message")
}); //end board.on("ready")