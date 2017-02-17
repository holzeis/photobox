'use strict';

import Logger from './logger';
import GpioPin from './GPIOPin';
import Rx from 'rxjs/Rx';

const wpi = require('wiring-pi');

class GpioController {

    constructor(ipAddress) {
        this.logger = new Logger();
        this.buttonPin = new GpioPin(19, 0);
        this.buttonLedPin = new GpioPin(18, 0);
        this.ledPin1 = new GpioPin(13, 0);
        this.ledPin2 = new GpioPin(15, 0);
    }

    init() {
        console.log('init called');
        wpi.setup('phys');
        wpi.pinMode(this.ledPin1.number, wpi.OUTPUT);
        wpi.pinMode(this.ledPin2.number, wpi.OUTPUT);
        wpi.pinMode(this.buttonLedPin.number, wpi.OUTPUT);
        wpi.pinMode(this.buttonPin.number, wpi.INPUT);
        wpi.pullUpDnControl(this.buttonLedPin.number, wpi.PUD_UP);
    }

    getStatus() {
        return "status";
    }

    turnLEDOn() {
        this.logger.log("turning leds on");
        wpi.digitalWrite(this.ledPin1.number, 1);
        wpi.digitalWrite(this.ledPin2.number, 1);
        wpi.digitalWrite(this.buttonLedPin.number, 1);
    }

    turnLEDOff() {
        this.logger.log("turning leds off");
        wpi.digitalWrite(this.ledPin1.number, 0);
        wpi.digitalWrite(this.ledPin2.number, 0);
        wpi.digitalWrite(this.buttonLedPin.number, 0);
    }

    startButtonListener() {
        console.log("starting listening");
        wpi.wiringPiISR(this.buttonPin.number, wpi.INT_EDGE_BOTH, (delta) => {
            if (wpi.digitalRead(this.buttonPin.number)) {
                console.log('buttonLED Off');
                this.turnLEDOff();
            }
            else {
                console.log('buttonLED On');
                this.turnLEDOn();
            }
        });

    }

    startButtonListenerRx() {
        console.log("starting listening");
        return Rx.Observable.create((observer) => {
            wpi.wiringPiISR(this.buttonPin.number, wpi.INT_EDGE_BOTH, (err, delta) => {
                console.debug("button pushed");
                observer.next(wpi.digitalRead(this.buttonPin.number));
            });
        });
    }

    turnLEDOnRx() {
        return Rx.Observable.create((observer) => {
            console.log("LEDs on");
            wpi.digitalWrite(this.ledPin1.number, 1);
            wpi.digitalWrite(this.ledPin2.number, 1);
            wpi.digitalWrite(this.buttonLedPin.number, 1);
            observer.next("LEDs are on");
        });
    }

    turnLEDOffRx() {
        return Rx.Observable.create((observer) => {
            console.log("LEDs off");
            wpi.digitalWrite(this.ledPin1.number, 0);
            wpi.digitalWrite(this.ledPin2.number, 0);
            wpi.digitalWrite(this.buttonLedPin.number, 0);
            observer.next("LEDs are off");
        });
    }

}

module.exports = GpioController;
