'use strict';

global.chai = require('chai');
global.chai.should();

global.expect = global.chai.expect;
global.sinon = require('sinon');

global.sinonChai = require('sinon-chai');
global.chai.use(global.sinonChai);

global.wiringpiStub = {
    OUTPUT: 'OUTPUT',
    INPUT: 'INPUT',
    PUD_UP: 'PUD_UP',

    setup(val) {
        console.log("wiring stub set up with ", val);
    },
    pinMode(pin, mode) {
        console.log("pin %s setup with mode %s", pin, mode);
    },
    pullUpDnControl(pin, mode) {
        console.log("pin %s setup with mode %s", pin, mode);
    },
    wiringPiISR(pin, mode) {
        console.log("pin %s setup with mode %s", pin, mode);
    }
};

global.proxyquire = require('proxyquire').noCallThru();
proxyquire('../lib/gpioController', {'wiring-pi': wiringpiStub});