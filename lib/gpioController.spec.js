'use strict';

import GpioController from './gpioController';
import Logger from './logger';
import GpioPin from './GPIOPin';
import Rx from 'rxjs/Rx';


describe('gpioController', () => {

    describe('Default Constructor', () => {

        it('should be created with three properties: buttonPin, ledPin1, and ledPin2', () => {

            let sut = new GpioController();
            expect(sut).to.have.property('buttonPin');
            expect(sut).to.have.property('ledPin1');
            expect(sut).to.have.property('ledPin2');
        });

    });

    describe('Testing using observable ', () => {

        it('subscribe to the button using an observable', () => {
            let sut = new GpioController();
            sut.startButtonListenerRx((delta) => {
                console.log(delta); //TODO fix testcase
            });
        });

    });
});
