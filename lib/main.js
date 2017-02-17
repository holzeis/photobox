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

logger.log('listening for button');
gpioController.startButtonListener();


