'use strict';

import Logger from './logger';
import GpioPin from './GPIOPin';
import Rx from 'rxjs/Rx';

import { Gpio } from 'onoff';

class GpioController {

    constructor(ipAddress) {
        this.logger = new Logger();
        this.buttonPin = new Gpio(10, 'in', 'both');
        this.buttonLedPin = new Gpio(24, 'out');
        this.ledPin1 = new GpioPin(13, 0);
        this.ledPin2 = new GpioPin(15, 0);
    }

    init() {
        console.log('init called');
    }

    getStatus() {
        return "status";
    }

    turnLEDOn() {
        this.logger.log("turning leds on");
    }

    turnLEDOff() {
        this.logger.log("turning leds off");
    }

    startButtonListener() {
        console.log("starting listening");
    }

    startButtonListenerRx() {
        console.log("starting listening");
        return Rx.Observable.create((observer) => {
            this.buttonPin.watch((err, value) => {
                console.log("button clicked: err: " + err);
                if (err) {
                    observer.error(err);
                } else {
                    observer.next(value);
                }
            });
            return () => this.buttonPin.unexport();
        });
    }

    turnLEDOnRx() {
        return Rx.Observable.create((observer) => {
            this.buttonLedPin.write(1, function (err) {
                console.log("Led on: err: ", err);
                if (err) {
                    observer.error(err);
                } else {
                    observer.next("Led On");
                }
            });
        });
    }

    turnLEDOffRx() {
        return Rx.Observable.create((observer) => {
            this.buttonLedPin.write(0, function (err) {
                console.log("Led off: err: ", err);
                if (err) {
                    observer.error(err);
                } else {
                    observer.next("Led Off");
                }
            });
        });
    }

    cleanUp() {
        this.buttonPin.unexport();
        this.buttonLedPin.unexport();
    }

}

module.exports = GpioController;
