'use strict';

const Logger = require('./logger');
const GpioPin = require('./GPIOPin');

const wpi = require('wiring-pi');

class GpioController {

    constructor(ipAddress) {
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
        wpi.pullUpDnControl(this.butonLedPin.number, wpi.PUD_UP);
    }

    getStatus() {
        return "status";
    }

    turnLEDOn() {
        this.logger.log("turning leds on");
        wpi.digitalWrite(this.ledPin1.number, 1);
        wpi.digitalWrite(this.ledPin2.number, 1);
        wpi.digitalWrite(this.butonLedPin.number, 1);
    }

    turnLEDOff() {
        this.logger.log("turning leds off");
        wpi.digitalWrite(this.ledPin1.number, 0);
        wpi.digitalWrite(this.ledPin2.number, 0);
        wpi.digitalWrite(this.butonLedPin.number, 0);
    }

    startButtonListener() {
        console.log("starting listening");
        let status = this.buttonPin.status;
        console.log('current button status: ' + this.butonLedPin.status);
        wpi.wiringPiISR(this.buttonPin.number, wpi.INT_EDGE_BOTH, () =>  {
            if (wpi.digitalRead(this.buttonPin.number)) {
                if (false === status) {
                    status = 1;
                    handleButton();
                }
            }
            else {
                status = 0;
            }
        });

        function handleButton() {
            if (wpi.digitalRead(this.buttonPin.number)) {
                console.log('On');
                this.turnLEDOn();
            } else {
                console.log('Off');
                this.turnLEDOff();
            }
        }
    }


}

module.exports = GpioController;
