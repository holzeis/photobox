#! /usr/bin/env node
'use strict';

const CameraController = require('./../app/cameraController');
const Logger = require('./../app/logger');
const GpioController = require('./../app/gpioController');

let logger = new Logger();

// let c = new CameraController();
// logger.log("1. initializing camera controller");
// c.init();
// logger.log("2. camera status: " + c.getStatus());
// logger.log("3. take picture");
// c.takePhoto();
let gpioController = new GpioController();
gpioController.init();

gpioController.startButtonListener();

