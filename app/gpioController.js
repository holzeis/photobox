'use strict'

const Logger = require('./logger');
const GpioPin = require('./GPIOPin');
//const WiringPiController = require('./wiringPiController');

const wpi = require('wiring-pi');


class GpioController {

    constructor (ipAddress) {
        this.logger = new Logger();
        this.buttonPin = new GpioPin(18, 0);
        this.ledPin1 = new GpioPin(13, 0);
        this.ledPin2 = new GpioPin(15, 0);
    }

    init() {
        wpi.wiringPiSetup();
        wpi.pinMode(this.ledPin1, wpi.OUTPUT);
        wpi.pinMode(this.ledPin2, wpi.OUTPUT);
        wpi.pinMode(this.buttonPin, wpi.INPUT);
    }

    getStatus() {
        return "status";
    }

    turnLEDOn() {
        wpi.digitalWrite(ledPin1, ledPin1.status = 1);
        wpi.digitalWrite(ledPin2, ledPin2.status = 1);
    }

    turnLEDOff() {
        wpi.digitalWrite(ledPin1, ledPin1.status = 0);
        wpi.digitalWrite(ledPin2, ledPin2.status = 0);
    }

}

module.exports = GpioController;
