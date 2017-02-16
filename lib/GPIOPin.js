'use strict';

import Logger from './logger';

class GpioPin {

    constructor (number, status) {
        this.number = number;
        this.status = status;
    }

}

module.exports = GpioPin;
