'use strict'

const Logger = require('./logger');

class GpioPin {

    constructor (number, status) {
        this.number = number;
        this.status = status;
    }

}

module.exports = GpioPin;
