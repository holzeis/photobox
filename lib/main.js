#! /usr/bin/env node
'use strict';

import CameraController from './cameraController';
import Logger from './logger';
import GpioController from './gpioController';
import Rx from 'rxjs/Rx';

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

logger.log('listening for button');
// gpioController.startButtonListener();
const callback = (delta) => {
    console.log(delta);
};
// gpioController.startButtonListenerRx(callback); // old way, this works


let ledsOn = gpioController.turnLEDOnRx();
let ledsOff = gpioController.turnLEDOffRx();
console.log('just before subscribe');
gpioController
    .turnLEDOnRx()
    .delay(1000)
    .flatMap(() => gpioController.turnLEDOffRx())
    .subscribe({
        next: x => console.log('got value ' + x),
        error: err => console.error('something wrong occurred: ' + err),
        complete: () => console.log('done'),
    });
console.log('just after subscribe');


//
// let exists = Rx.Observable.bindCallback(gpioController.startButtonListenerRx);
//
// // Check if file.txt exists
// let source = exists();
//
// let subscription = source.subscribe(
//     function (x) {
//         console.log('Next: ' + x);
//     },
//     function (err) {
//         console.log('Error: ' + err);
//     },
//     function () {
//         console.log('Completed');
//     });


process.on('SIGTERM', () => {
    console.log("Terminating and cleaning up");

});