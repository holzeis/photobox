var wpi = require('wiring-pi');

// GPIO pin of the button
var configPin = 19;
var ledPin = 18;

console.log('setting things up');
wpi.setup('phys');
console.log('done, registering button');

var started = false;
wpi.pinMode(configPin, wpi.INPUT);
wpi.pinMode(ledPin, wpi.OUTPUT);

wpi.pullUpDnControl(configPin, wpi.PUD_UP);
wpi.wiringPiISR(configPin, wpi.INT_EDGE_BOTH, function() {
    if (wpi.digitalRead(configPin)) {
        if (false === started) {
            started = true;
            handleButton();
        }
    }
    else {
        started = false;
    }
});

function handleButton() {
    if (wpi.digitalRead(configPin)) {
        console.log('On');
        wpi.digitalWrite(ledPin, 1);
    } else {
        console.log('Off');
        wpi.digitalWrite(ledPin, 0);
    }
}