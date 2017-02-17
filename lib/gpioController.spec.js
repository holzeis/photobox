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

        it('should have default values', () => {
            let sut = new GpioController();
            expect(sut.buttonPin).to.deep.equal(new GpioPin(19, 0));
            expect(sut.ledPin1).to.deep.equal(new GpioPin(13, 0));
            expect(sut.ledPin2).to.deep.equal(new GpioPin(15, 0));
        });

    });

    describe('Testing using observable ', () => {

        it('subscribe to the button using an observable', () => {
            let sut = new GpioController();
            sut.startButtonListenerRx((delta) => {
                console.log(delta);
            });
            /*let buttonListener = Rx.Observable.fromCallback(sut.startButtonListenerRx);

             // Check if file.txt exists
             let source = buttonListener();

             let subscription = source.subscribe(
             function (x) {
             console.log('Next: ' + x);
             },
             function (err) {
             console.log('Error: ' + err);
             },
             function () {
             console.log('Completed');
             });*/
        });

    });
});
