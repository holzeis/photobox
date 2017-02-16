'use strict';

const Logger = require('./../logger');

class GoproController {

    constructor () {
        this.ip = '10.5.5.9'; /* Gopro ip, should be 10.5.5.9 except in remote mode */
        this.broadcastip = '10.5.5.255'; /* Broadcast ip of the gopro network, use to wake up the gopro (WOL protocol), should be 10.5.5.255 */
        this.mac = 'D6:D9:19:5B:30:68'; /* Mac address, used to wake up the gopro, should be set if the camera is off before launching the script, available at cam._mac. Will be retrieved if not present. */
        this.logger = new Logger();
    }

    takePhoto() {
        if (this.ip && this.broadcastip && this.mac) {
            this.logger.log('Connecting to gopro ' + this.ip);
        } else {
            this.logger.log('No Gopro IP defined');
        }
    }

    getStatus() {
        return 'status OK!'; // TODO: call camera function to get status
    }
}

module.exports = GoproController;
