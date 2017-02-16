'use strict';

const GpioController = require('./gpioController');
const Logger = require('./logger');
const GpioPin = require('./GPIOPin');

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
            expect(sut.buttonPin).to.deep.equal(new GpioPin(18, 0));
            expect(sut.ledPin1).to.deep.equal(new GpioPin(13, 0));
            expect(sut.ledPin2).to.deep.equal(new GpioPin(15, 0));
        });

    });

});
