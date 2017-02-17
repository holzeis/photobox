#! /usr/bin/env node
'use strict';

import CameraController from './cameraController';
import Logger from './logger';
import GpioController from './gpioController';

let logger = new Logger();

// let c = new CameraController();
// logger.log("1. initializing camera controller");
// c.init();
// logger.log("2. camera status: " + c.getStatus());
// logger.log("3. take picture");
// c.takePhoto();
logger.log('starting gpio controller');
let gpioController = new GpioController();
gpioController.init();


console.log('just before subscribe');
gpioController
    .startButtonListenerRx()
    .throttleTime(2000) //only take a signal every second
    .flatMap(() => gpioController.turnLEDOnRx())
    .delay(1000)
    .flatMap(() => gpioController.turnLEDOffRx())
    .subscribe({
        next: x => console.log('got value ' + x),
        error: err => console.error('something wrong occurred: ' + err),
        complete: () => console.log('done'),
    });
console.log('just after subscribe');

process.on('SIGTERM', () => {
    console.log("Terminating and cleaning up");

});