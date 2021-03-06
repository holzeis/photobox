'use strict';

import GoproController from './goproController';
import Logger from './../logger'; const DefaultIP = '10.5.5.9';

const DefaultBroadcast = '10.5.5.255';
const DefaultMac = 'D6:D9:19:5B:30:68';
const DefaultCameraControllerStatus = 'status OK!';


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

});
