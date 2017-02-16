'use strict';

import Logger from './../logger';

class ClController {

    constructor () {
        this.logger = new Logger();
    }

    takePhoto() {
        this.logger.log("Smile!");
    }

    getStatus() {
        return 'the red light is only the standby light ;)';
    }
}

module.exports = ClController;
