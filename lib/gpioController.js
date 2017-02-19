'use strict';

import Logger from './logger';
import GpioPin from './GPIOPin';
import Rx from 'rxjs/Rx';

import {Gpio} from 'onoff';

class GpioController {

    constructor(ipAddress) {
        this.logger = new Logger();
        this.buttonPin = new Gpio(10, 'in', 'both');
        this.buttonLedPin = new Gpio(24, 'out');
        this.ledPin1 = new Gpio(2, 'out');
        this.ledPin2 = new Gpio(3, 'out');
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

    turnButtonLEDOnRx() {
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

    turnButtonLEDOffRx() {
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

    turnFlashLED1OnRx() {
        return Rx.Observable.create((observer) => {
            this.ledPin1.write(0, function (err) {
                console.log("Led off: err: ", err);
                if (err) {
                    observer.error(err);
                } else {
                    observer.next("Led Off");
                }
            });
        });
    }

    turnFlashLED1OffRx() {
        return Rx.Observable.create((observer) => {
            this.ledPin1.write(1, function (err) {
                console.log("Led off: err: ", err);
                if (err) {
                    observer.error(err);
                } else {
                    observer.next("Led Off");
                }
            });
        });
    }turnFlashLED2OnRx() {
        return Rx.Observable.create((observer) => {
            this.ledPin2.write(0, function (err) {
                console.log("Led off: err: ", err);
                if (err) {
                    observer.error(err);
                } else {
                    observer.next("Led Off");
                }
            });
        });
    }

    turnFlashLED2OffRx() {
        return Rx.Observable.create((observer) => {
            this.ledPin2.write(1, function (err) {
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
        this.ledPin1.unexport();
        this.ledPin2.unexport();
    }

}

module.exports = GpioController;
