#! /usr/bin/env node
'use strict';

import GoproController from './cameras/goproController';
import GpioController from './gpioController';

let gpioController = new GpioController();
let cam = new GoproController();

console.log('just before subscribe');
cam
    .init()
    .flatMap(() => gpioController.turnFlashLEDOffRx())
    .flatMap(() => gpioController.startButtonListenerRx())
    .filter(x => x > 0)
    .throttleTime(2000) //only take a signal every second
    .do(x => console.log("button clicked: ", x))
    .flatMap(() => gpioController.turnButtonLEDOnRx())
    .do(x => console.log("button LED on: ", x))
    .delay(1000)
    .flatMap(() => gpioController.turnButtonLEDOffRx())
    .do(x => console.log("button LED off: ", x))
    .flatMap(() => gpioController.turnFlashLEDBlinking())
    .do(x => console.log("flashing done: photo 1 ", x))
    .flatMap(() => gpioController.turnFlashLEDOnRx())
    .flatMap(() => cam.takePicture())
    .flatMap(() => gpioController.turnFlashLEDOffRx())
    .delay(500)
    .do(x => console.log("photo 2 ", x))
    .flatMap(() => gpioController.turnFlashLEDOnRx())
    .flatMap(() => cam.takePicture())
    .flatMap(() => gpioController.turnFlashLEDOffRx())
    .delay(500)
    .do(x => console.log("photo 3 ", x))
    .flatMap(() => gpioController.turnFlashLEDOnRx())
    .flatMap(() => cam.takePicture())
    .flatMap(() => gpioController.turnFlashLEDOffRx())
    .flatMap(() => cam.getLastThree())
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