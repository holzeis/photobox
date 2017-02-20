'use strict';

import GpioController from './gpioController';
import Rx from 'rxjs/Rx';
import {TestSubscriber} from 'rxjs/Rx';


describe('GpioController', () => {

    describe('Default Constructor', () => {

        it('should be created with three properties: buttonPin, ledPin1, and ledPin2', () => {

            let sut = new GpioController();
            expect(sut).to.have.property('buttonPin');
            expect(sut).to.have.property('ledPin1');
            expect(sut).to.have.property('ledPin2');
        });

    });

    describe('Testing listening button', () => {

        it('subscribe to the button using an observable, should receive expectedValue', () => {
            //setup stub for testing
            let stub = sinon.stub(onoffStub.Gpio.prototype, 'watch', callback => {
                callback(null, 'expectedValue');
            });

            let sut = new GpioController();

            sut
                .startButtonListenerRx()
                .subscribe({
                    next: x => expect(x).to.equal('expectedValue'),
                    error: err => {
                        throw new Error('should not happen')
                    },
                    complete: () => console.log('done'),
                });
            //restoring original method call
            onoffStub.Gpio.prototype.watch.restore();
        });

        it('subscribe to the button using an observable, should receive error', () => {
            sinon.stub(onoffStub.Gpio.prototype, 'watch', callback => {
                callback('error', '1');
            });

            let sut = new GpioController();

            sut
                .startButtonListenerRx()
                .subscribe({
                    next: x => expect(x).to.equal('1'),
                    error: err => expect(err).to.equal('error'),
                    complete: () => console.log('done'),
                });
            //restoring original method call
            onoffStub.Gpio.prototype.watch.restore();
        });

    });

    it('subscribe to the button using an observable, should receive error', () => {
        //setup mock for testing
        let gpioStub = sinon.createStubInstance(onoffStub.Gpio);
        gpioStub.watch.callsArgWith(1, 'err', '1');

        const sut = new GpioController();
        sut.buttonLedPin = gpioStub;

        sut
            .startButtonListenerRx()
            .subscribe({
                next: x => expect(x).to.equal('1'),
                error: err => expect(err).to.equal('err'),
                complete: () => console.log('done'),
            });
    });

    describe('Testing activating light', () => {
        it('should call write light on', () => {
            //setup mock for testing
            let gpioStub = sinon.createStubInstance(onoffStub.Gpio);
            gpioStub.write.callsArgWith(1, null);

            const sut = new GpioController();
            sut.buttonLedPin = gpioStub;

            sut
                .turnButtonLEDOnRx()
                .subscribe({
                    next: x => expect(x).to.equal('Led On'),
                    error: err => {
                        throw new Error('should not happen')
                    },
                    complete: () => console.log('done'),
                });
            expect(gpioStub.write.calledWith('1', sinon.match.any));

        });

        it('should call write light on and light off', () => {
            //setup mock for testing
            let gpioStub = sinon.createStubInstance(onoffStub.Gpio);
            gpioStub.write
                .onFirstCall().callsArgWith(1, null)
                .onSecondCall().callsArgWith(1, null);

            const sut = new GpioController();
            sut.buttonLedPin = gpioStub;

            sut
                .turnButtonLEDOnRx()
                .flatMap(() => sut.turnButtonLEDOffRx())
                .subscribe({
                    next: x => expect(x).to.equal('Led Off'),
                    error: err => {
                        throw new Error('should not happen')
                    },
                    complete: () => console.log('done'),
                });
            expect(gpioStub.write.calledWith('1', sinon.match.any));
            expect(gpioStub.write.calledWith('0', sinon.match.any));
        });

        it('should call write light on and return error on first call', () => {
            //setup mock for testing
            let gpioStub = sinon.createStubInstance(onoffStub.Gpio);
            gpioStub.write
                .onFirstCall().callsArgWith(1, 'err')
                .onSecondCall().callsArgWith(1, null);

            const sut = new GpioController();
            sut.buttonLedPin = gpioStub;

            sut
                .turnButtonLEDOnRx()
                .flatMap(() => sut.turnButtonLEDOffRx())
                .subscribe({
                    next: x => {
                        throw new Error('should not happen')
                    },
                    error: err => expect(err).to.equal('err'),
                    complete: () => console.log('done'),
                });

            expect(gpioStub.write.calledWith('1', sinon.match.any));
            expect(gpioStub.write.calledWith('0', sinon.match.any));
        });

    });
});
