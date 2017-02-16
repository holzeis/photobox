'use strict';

const Logger = require('./logger');
const GpioPin = require('./GPIOPin');

const wpi = require('wiring-pi');

class GpioController {

    constructor (ipAddress) {
        this.logger = new Logger();
        this.buttonPin = new GpioPin(19, 0);
        this.butonLedPin = new GpioPin(18, 0);
        this.ledPin1 = new GpioPin(13, 0);
        this.ledPin2 = new GpioPin(15, 0);
    }

    init() {
        wpi.setup('phys');
        wpi.pinMode(this.ledPin1.number, wpi.OUTPUT);
        wpi.pinMode(this.ledPin2.number, wpi.OUTPUT);
        wpi.pinMode(this.butonLedPin.number, wpi.OUTPUT);
        wpi.pinMode(this.buttonPin.number, wpi.INPUT);
    }

    getStatus() {
        return "status";
    }

    turnLEDOn() {
        wpi.digitalWrite(this.ledPin1.number, 1);
        wpi.digitalWrite(this.ledPin2.number, 1);
        wpi.digitalWrite(this.butonLedPin.number, 1);
    }

    turnLEDOff() {
        wpi.digitalWrite(this.ledPin1.number, 0);
        wpi.digitalWrite(this.ledPin2.number, 0);
        wpi.digitalWrite(this.butonLedPin.number, 0);
    }

}

module.exports = GpioController;
