'use strict'

const Logger = require('./logger');
const GoproController = require('./cameras/goproController');

class CameraCommander {

    constructor () {
        this.cameraCommander = null;
        this.ip = '10.5.5.101';
        this.logger = new Logger();
    }

    init() {
        if (this.ip.startsWith('10.5.5.')) {
            this.logger.log('Loading GoPro Commander');
            this.cameraCommander = new GoproCommander();
            this.logger.log(this.cameraCommander.getStatus());
        } else {
            this.logger.log('No Camera Commander defined')
        }
    }
}

module.exports = CameraCommander;
