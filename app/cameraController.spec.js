'use strict'

const GoproController = require('./cameras/goproController');
const Logger = require('./logger');
const DefaultIP = '10.5.5.9';
const DefaultBroadcast = '10.5.5.255';
const DefaultMac = 'D6:D9:19:5B:30:68';
const DefaultGreeting = 'Connecting to gopro 10.5.5.9';
const DefaultCameraCommanderStatus = 'status OK!';


describe('GoproController', () => {

    describe('Constructor', () => {

        it('should be created with three properties: ip, broadcastip, and mac', () => {
            let sut = new GoproController();
            expect(sut).to.have.property('ip');
            expect(sut).to.have.property('broadcastip');
            expect(sut).to.have.property('mac');
        });

        it('should have default values', () => {
            let sut = new GoproController();
            expect(sut.ip).to.equal(DefaultIP);
            expect(sut.broadcastip).to.equal(DefaultBroadcast);
            expect(sut.mac).to.equal(DefaultMac);
        });

    });

    describe('Run', () => {
        it('should log default values when started', () => {
            let logger = new Logger();
            let stub = sinon.stub(logger, 'log').returns();
            let sut = new GoproController();
            sut.logger = logger;

            sut.run();

            expect(logger.log).to.have.been.calledOnce;
            expect(logger.log).to.have.been.calledWith(DefaultGreeting);

            stub.restore();
        });

        it('should log default ip when started', () => {
            let logger = new Logger();
            let stub = sinon.stub(logger, 'log').returns();
            let sut = new GoproController();
            sut.logger = logger;

            sut.run();

            expect(logger.log).to.have.been.calledOnce;
            expect(logger.log).to.have.been.calledWith(DefaultGreeting);

            stub.restore();
        });
    });

    describe('Status', () => {
        it('should show the camera status', () => {
            let logger = new Logger();
            let sut = new GoproController();

            let status = sut.getStatus();

            expect(status).to.equal(DefaultCameraCommanderStatus);
        });

    });

});
