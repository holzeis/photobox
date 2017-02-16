'use strict';

import clCameraController from './clCameraController';
import Logger from './../logger';
const DefaultCameraControllerStatus = 'the red light is only the standby light ;)';
const DefaultPhotoAction = 'Smile!';


describe('clCameraController', () => {

    describe('takePhoto', () => {
        it('should log to console values when started', () => {
            let logger = new Logger();
            let stub = sinon.stub(logger, 'log').returns();
            let sut = new clCameraController();
            sut.logger = logger;

            sut.takePhoto();

            expect(logger.log).to.have.been.calledOnce;
            expect(logger.log).to.have.been.calledWith(DefaultPhotoAction);

            stub.restore();
        });

    });

    describe('Status', () => {
        it('should show the camera status', () => {
            let sut = new clCameraController();

            let status = sut.getStatus();

            expect(status).to.equal(DefaultCameraControllerStatus);
        });

    });

});
