'use strict';

import GpioController from './gpioController';
import Rx from 'rxjs/Rx';
import {TestSubscriber} from "rxjs/Rx";


describe('gpioController', () => {

    describe('Default Constructor', () => {

        it('should be created with three properties: buttonPin, ledPin1, and ledPin2', () => {

            let sut = new GpioController();
            expect(sut).to.have.property('buttonPin');
            expect(sut).to.have.property('ledPin1');
            expect(sut).to.have.property('ledPin2');
        });

    });

    describe('Testing listening button', () => {

        let TestButtonSuccess = class Gpio {
            constructor(gpio, direction, edge, options) {
            }

            watch(callback) {
                callback(null, 'expectedValue');
            }

            unexport() {
            }
        };

        let TestButtonFail = class Gpio {
            constructor(gpio, direction, edge, options) {
            }

            watch(callback) {
                callback('err', '1');
            }

            unexport() {
            }
        };
        it('subscribe to the button using an observable, should receive expectedValue', () => {

            onoffStub.Gpio = TestButtonSuccess;
            let sut = new GpioController();

            sut
                .startButtonListenerRx()
                .subscribe({
                    next: x => expect(x).to.equal('expectedValue'),
                    error: err => {
                        throw new Error("should not happen")
                    },
                    complete: () => console.log('done'),
                });
        });

        it('subscribe to the button using an observable, should receive error', () => {

            onoffStub.Gpio = TestButtonFail;
            let sut = new GpioController();

            sut
                .startButtonListenerRx()
                .subscribe({
                    next: x => expect(x).to.equal('1'),
                    error: err => expect(err).to.equal('err'),
                    complete: () => console.log('done'),
                });
        });

    });
});
