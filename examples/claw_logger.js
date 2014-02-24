var	webSocket = require('ws'),
    ws = new webSocket('ws://127.0.0.1:6437');


ws.on('message', function(data, flags) {
    frame = JSON.parse(data);

    if (frame.hands && frame.hands.length >= 1) {

        w = 90 + (90 * frame.hands[0].palmNormal[0]);
		
		c = 0;
		if (frame.pointables) {
			c = (frame.pointables.length - 1) * 15;
			if (c > 60) c = 60;
			if (c < 0) c = 0;
		}

		console.log(c.toFixed(1) + "\t" + w.toFixed(1));

    }
    else {
        console.log("no hands");
    }
});