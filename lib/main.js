#! /usr/bin/env node
'use strict';

import GoproController from './cameras/goproController';
import GpioController from './gpioController';

let gpioController = new GpioController();
let cam = new GoproController();

console.log('just before subscribe');
cam
    .init()
    .flatMap(() => gpioController.startButtonListenerRx())
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
    .flatMap(() => cam.takePicture())
    .do(x => console.log("picture taken: ", x))
    .flatMap(() => cam.getLastPhoto())
    .delay(3000)
    .flatMap(() => gpioController.turnFlashLEDOffRx())
    .do(x => console.log("flash LED off: ", x))
    .subscribe({
        next: x => console.log('got value ' + x),
        error: err => console.error('something wrong occurred: ' + err),
        complete: () => console.log('done'),
    });
console.log('just after subscribe');


// cam
//     .init()
//     .do(x => console.log("initialized: ", x))
//     .flatMap(() => cam.takePicture())
//     .do(x => console.log("picture taken: ", x))
//     .flatMap(() => cam.getLastPhoto())
//     .subscribe({
//         next: x => console.log('copied ' + x),
//         error: err => console.error('something wrong occurred: ' + err),
//         complete: () => console.log('done'),
//     });


process.on('SIGINT', () => {
    console.log("\nCleaning up...");
    gpioController.cleanUp();
});