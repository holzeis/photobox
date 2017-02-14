#! /usr/bin/env node
'use strict'

const CameraCommander = require('./app/cameraController');

let c = new CameraCommander();

c.init();
