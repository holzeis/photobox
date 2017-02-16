var wpi = require('wiring-pi');

// GPIO pin of the button
var configPin = 19;

console.log('setting things up');
wpi.setup('phys');
console.log('done, registering button');

var started = false;
wpi.pinMode(configPin, wpi.INPUT);
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
        clearTimeout(clock);
    }
});

function handleButton() {
    if (wpi.digitalRead(configPin)) {
        console.log('On');
    } else {
        console.log('Off');
    }
}