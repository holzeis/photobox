'use strict';

import Logger from './logger';
import GoproController from './cameras/goproController';
import CommandLineCamera from './cameras/clCameraController';
import GpioController from './gpioController';

class CameraController {

    constructor (ipAddress) {
        this.cameraController = null;
        this.gpioController = null;
        this.ip = ipAddress;
        this.logger = new Logger();
    }

    init() {
        this.initGpioController();
        this.initCameraController();
    }

    initGpioController() {
        this.gpioController = new GpioController();
    }

    initCameraController() {
        if (this.ip && this.ip.startsWith('10.5.5.')) {
            this.logger.log('Loading GoPro Controller');
            this.cameraController = new GoproController();
        } else {
            this.cameraController = new CommandLineCamera();
        }
    }

    getStatus() {
        return this.cameraController.getStatus();
    }

    takePhoto() {
        this.cameraController.takePhoto();
    }
}

module.exports = CameraController;
