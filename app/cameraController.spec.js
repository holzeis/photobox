'use strict';

const CameraController = require('./cameraController');
const GoproController = require('./cameras/goproController');
const ClCameraController = require('./cameras/clCameraController');
const DefaultIP = '10.5.5.90';

describe('cameraController', () => {

    describe('Default Constructor', () => {

        it('should have property ip with undefined', () => {
            let sut = new CameraController();
            expect(sut).to.have.property('ip');
            expect(sut.ip).to.be.undefined;
        });

        it('should initialize a CL Camera Controller', () => {
            let sut = new CameraController();
            sut.init();
            expect(sut.cameraController).to.be.an.instanceof(ClCameraController);
        });

    });

    describe('GoProCamera Constructor', () => {

        it('should create default clCameraController', () => {
            let sut = new CameraController(DefaultIP);
            expect(sut).to.have.property('ip');
        });

        it('should init a ClController', () => {
            let sut = new CameraController(DefaultIP);
            sut.init();
            expect(sut.cameraController).to.be.an.instanceof(GoproController);
        });

    });

    describe('getStatus', () => {
        it('should call get status of specific controller', () => {
            let clCameraController = new ClCameraController();
            let stub = sinon.stub(clCameraController, 'getStatus').returns();
            let sut = new CameraController();
            sut.cameraController = clCameraController;

            sut.getStatus();

            expect(clCameraController.getStatus).to.have.been.calledOnce;

            stub.restore();
        });

    });

    describe('takePhoto', () => {
        it('should show the camera status', () => {
            let clCameraController = new ClCameraController();
            let stub = sinon.stub(clCameraController, 'takePhoto').returns();
            let sut = new CameraController();
            sut.cameraController = clCameraController;

            sut.takePhoto();

            expect(clCameraController.takePhoto).to.have.been.calledOnce;

            stub.restore();
        });

    });

});
