'use strict'

const Logger = require('./logger');
const GoproController = require('./cameras/goproController');
const CommandLineCamera = require('./cameras/clCameraController');

class CameraController {

    constructor (ipAddress) {
        this.cameraController = null;
        this.ip = ipAddress;
        this.logger = new Logger();
    }

    init() {
        if (this.ip && this.ip.startsWith('10.5.5.')) {
            this.logger.log('Loading GoPro Controller');
            this.cameraController = new GoproController();
            this.logger.log(this.cameraController.getStatus());
        } else {
            this.cameraController = new CommandLineCamera();
        }
    }

    takePhoto() {
        this.cameraController.takePhoto();
    }

    getStatus() {
        return this.cameraController.getStatus();
    }

}

module.exports = CameraController;
