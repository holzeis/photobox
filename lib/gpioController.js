'use strict';

import Rx from 'rxjs/Rx';

import {Gpio} from 'onoff';

class GpioController {

    constructor(ipAddress) {
        this.buttonPin = new Gpio(11, 'in', 'both');
        this.buttonLedPin = new Gpio(24, 'out');
        this.ledPin1 = new Gpio(2, 'out');
        this.ledPin2 = new Gpio(3, 'out');
    }

    startButtonListenerRx() {
        console.log("starting listening");
        return Rx.Observable.create((observer) => {
            this.buttonPin.watch((err, value) => {
                if (err) {
                    observer.error(err);
                } else {
                    observer.next(value);
                }
            });
        });
    }

    turnButtonLEDOnRx() {
        return Rx.Observable.create((observer) => {
            this.buttonLedPin.write(1, err =>{
                if (err) {
                    observer.error(err);
                } else {
                    observer.next("Led On");
                }
                observer.complete();
            });
        });
    }

    turnButtonLEDOffRx() {
        return Rx.Observable.create((observer) => {
            this.buttonLedPin.write(0, err =>{
                if (err) {
                    observer.error(err);
                } else {
                    observer.next("Led Off");
                }
                observer.complete();
            });
        });
    }

    turnFlashLED1OnRx() {
        return Rx.Observable.create((observer) => {
            this.ledPin1.write(0, err =>{
                if (err) {
                    observer.error(err);
                } else {
                    observer.next("Led On");
                }
                observer.complete();
            });
        });
    }

    turnFlashLED1OffRx() {
        return Rx.Observable.create((observer) => {
            this.ledPin1.write(1, err =>{
                if (err) {
                    observer.error(err);
                } else {
                    observer.next("Led Off");
                }
                observer.complete();
            });
        });
    }

    turnFlashLED2OnRx() {
        return Rx.Observable.create((observer) => {
            this.ledPin2.write(0, err =>{
                if (err) {
                    observer.error(err);
                } else {
                    observer.next("Led On");
                }
                observer.complete();
            });
        });
    }

    turnFlashLED2OffRx() {
        return Rx.Observable.create((observer) => {
            this.ledPin2.write(1, err =>{
                if (err) {
                    observer.error(err);
                } else {
                    observer.next("Led Off");
                }
                observer.complete();
            });
        });
    }

    turnFlashLEDOnRx() {
        return Rx.Observable.forkJoin(
            this.turnFlashLED1OnRx(),
            this.turnFlashLED2OnRx()
        );
    }
    turnFlashLEDOffRx() {
        return Rx.Observable.forkJoin(
            this.turnFlashLED1OffRx(),
            this.turnFlashLED2OffRx()
        );
    }


    cleanUp() {
        this.buttonPin.unexport();
        this.buttonLedPin.unexport();
        this.ledPin1.unexport();
        this.ledPin2.unexport();
    }

}

module.exports = GpioController;
