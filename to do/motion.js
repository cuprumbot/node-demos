//leap motion
Leap = require('./node_modules/leapjs/lib/index');
controller = new Leap.Controller({enableGestures: true});
//johnny-five
var Five = require('./lib/johnny-five'),
    board = new Five.Board(),
    led,
    servo;

board.on('ready', function() {
    led = new Five.Led(13);
    servo = new Five.Servo(3);
    console.log("Arduino ready.");

    servo.center();
    ang = 90;

    controller.connect();
});

controller.on('connect', function() {
    console.log("Leap ready.");
});

controller.on('frame',function(frame) {
    if (frame.hands.length > 0) led.on();
    else led.off();

    if (frame.gestures.length > 0) {
        
        v = frame.gestures[0].direction;
        if (v != undefined) {
            v = v[0];
            if (v < 0) servo.min();
            else servo.max();
            console.log(v);
        } else {
            servo.center();
        }
        
/*
        len = frame.gestures.length;    //cantidad de gestos
        ammount = 0;                    //contador de gestos
        firstSwipe;                     //primer swipe
        secondSwipe;                    //segundo swipe

        for (i = 0; i < len; i++) {
            if (frame.gestures[i].type == 'Swipe') {                    //si fue un swipe
                if (ammount == 0) firstSwipe = frame.gestures[i];       //guarda primer swipe
                else if (ammount == 1) secondSwipe = frame.gestures[i]; //guarde segundo swipe
                else break;                                             //termina si ya tiene dos swipes
            }
        }

        if (ammount == 2) {                                                 //si guardo dos swipes
            console.log('GOT TWO SWIPES');

            fp = firstSwipe.position[0];                                    //guarda posiciones y direcciones
            fd = firstSwipe.direction[0];
            sp = secondSwipe.position[0];
            sd = secondSwipe.direction[0];

            console.log('Swipe 1\nPosition: '+fp+' Direction: '+fd+'\n\n'); //imprime posiciones y direcciones
            console.log('Swipe 2\nPosition: '+sp+' Direction: '+sd+'\n\n');

            if (fp > sp) {                                                  //primer swipe esta a la derecha
                if (fp < 0 && sp > 0) console.log('Closing pinch (1)');
                if (fp > 0 && sp < 0) console.log('Opening pinch (1)');
            }

            if (fp < sp) {                                                  //primer swipe esta a la izquierda
                if (fp < 0 && sp > 0) console.log('Opening pinch (2)');
                if (fp > 0 && sp < 0) console.log('Closing pinch (2)');
            }
        }*/
    }
});