//leap motion
Leap = require('./node_modules/leapjs/lib/index');
controller = new Leap.Controller({enableGestures: true});
//johnny-five
var Five = require('./lib/johnny-five'),
    board = new Five.Board(),
    led,
    servo;

controller.on('connect', function() {
    console.log("Leap ready.");
});

board.on('ready', function() {
    led = new Five.Led(13);
    servo = new Five.Servo(3);
    console.log("Arduino ready.");

    controller.connect();

    controller.on('frame',function(frame) {
        if (frame.hands.length > 0) {
            console.log('on');
            led.on();
        } else {
            console.log('off');
            led.off();
        }
    });
});

