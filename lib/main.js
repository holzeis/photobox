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

console.log('just before subscribe');
gpioController
    .startButtonListenerRx()
    .filter(x => x > 0)
    .throttleTime(2000) //only take a signal every second
    .do(x => console.log("button clicked: ", x))
    .flatMap(() => gpioController.turnButtonLEDOnRx())
    .do(x => console.log("button LED on: ", x))
    .delay(1000)
    .flatMap(() => gpioController.turnButtonLEDOffRx())
    .do(x => console.log("button LED off: ", x))
    .flatMap(() => gpioController.turnFlashLEDOnRx())
    .do(x => console.log("flash LED on: ", x))
    .delay(3000)
    .flatMap(() => gpioController.turnFlashLEDOffRx())
    .do(x => console.log("flash LED off: ", x))
    .subscribe({
        next: x => console.log('got value ' + x),
        error: err => console.error('something wrong occurred: ' + err),
        complete: () => console.log('done'),
    });
console.log('just after subscribe');

process.on('SIGINT', () => {
    console.log("\nCleaning up...");
    gpioController.cleanUp();
});