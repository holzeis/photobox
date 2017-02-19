'use strict';

global.chai = require('chai');
global.chai.should();

global.expect = global.chai.expect;
global.sinon = require('sinon');

global.sinonChai = require('sinon-chai');
global.chai.use(global.sinonChai);

global.onoffStub = {};
class Gpio {
    constructor(gpio, direction, edge, options) {
    }
    watch(callback) {
        callback(null, "1");
    }
    unexport() {
    }
}
global.onoffStub.Gpio = Gpio;

global.proxyquire = require('proxyquire').noCallThru();
proxyquire('../lib/gpioController', {'onoff': onoffStub});