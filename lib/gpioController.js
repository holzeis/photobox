'use strict';

import Rx from 'rxjs/Rx';

import {Gpio} from 'onoff';

class GpioController {

    constructor(ipAddress) {
        this.btnPin = new Gpio(7, 'in', 'both');
        this.btnLedPin = new Gpio(24, 'out');
        this.ledPin1 = new Gpio(2, 'out');
        this.ledPin2 = new Gpio(3, 'out');
    }

    startButtonListenerRx() {
        console.log("starting listening");
        return Rx.Observable.create((observer) => {
            this.btnPin.watch((err, value) => {
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
            this.btnLedPin.write(1, err => {
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
            this.btnLedPin.write(0, err => {
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
            this.ledPin1.write(0, err => {
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
            this.ledPin1.write(1, err => {
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
            this.ledPin2.write(0, err => {
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
            this.ledPin2.write(1, err => {
                if (err) {
                    observer.error(err);
                } else {
                    observer.next("Led Off");
                }
                observer.complete();
            });
        });
    }

    startBlinking = (count, timer, callback) => {
        count++;
        if (count > 30) {
            return callback();
        }
        console.log("%s led value: %s, timer value: %s, sleeping value %s",
            count, count % 2, timer, count % 2 == 0 ? timer : 100);

        this.ledPin1.writeSync(count % 2);
        this.ledPin2.writeSync(count % 2);
        if (count < (3 * 2)) {
            console.log("timer 1000");
            timer = 1000;
        } else if (count < (7 * 2)) {
            timer = timer - 100;
            console.log("timer %s", timer);
        } else {
            timer = 50;
        }

        setTimeout(() => {
            this.startBlinking(count, timer, callback);
        }, count % 2 == 0 ? 100 : timer);
    };

    turnFlashLEDBlinking() {
        return Rx.Observable.create((observer) => {
            this.startBlinking(0, 1000, () => {
                console.log("callback called inside");
                observer.next();
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
        this.btnPin.unexport();
        this.btnLedPin.unexport();
        this.ledPin1.unexport();
        this.ledPin2.unexport();
    }

}

module.exports = GpioController;
