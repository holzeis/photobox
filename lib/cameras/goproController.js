'use strict';

import Logger from './../logger';
import GoPro from 'goproh4';
import Rx from 'rxjs/Rx';

class GoproController {

    constructor() {
        this.ip = '10.5.5.9';
        /* Gopro ip, should be 10.5.5.9 except in remote mode */
        this.broadcastip = '10.5.5.255';
        /* Broadcast ip of the gopro network, use to wake up the gopro (WOL protocol), should be 10.5.5.255 */
        this.mac = 'D6:D9:19:5B:30:68';
        /* Mac address, used to wake up the gopro, should be set if the camera is off before launching the script, available at cam._mac. Will be retrieved if not present. */
        this.logger = new Logger();
    }

    takePhoto() {
        if (this.ip && this.broadcastip && this.mac) {
            this.logger.log('Connecting to gopro ' + this.ip);
        } else {
            this.logger.log('No Gopro IP defined');
        }
    }

    init() {
        return Rx.Observable.create((observer) => {
            this.cam = new GoPro.Camera({
                ip: this.ip,
                broadcastip: this.broadcastip,
                mac: this.mac
            });
            this.cam.mode(GoPro.Settings.Modes.Photo, GoPro.Settings.Submodes.Photo.Single)
            observer.next(1);
            observer.complete();
        });

    }

    takePicture() {
        return Rx.Observable.create((observer) => {
            this.cam
                .start()
                .then(function () {
                    console.log('[picture taken]');
                    observer.next(1);
                    observer.complete();
                });
        });
    }

    getLastThree() {
        return Rx.Observable.create((observer) => {

            this.cam.listMedia().then(result => {

                console.log("get lastDirectory");
                let lastDirectory = result.media[result.media.length - 1];
                let lastFile = lastDirectory.fs[lastDirectory.fs.length - 1];
                let lastFile2 = lastDirectory.fs[lastDirectory.fs.length - 2];
                let lastFile3 = lastDirectory.fs[lastDirectory.fs.length - 3];

                console.log("copying [%s, %s, %s]", lastFile.n, lastFile2.n, lastFile3.n);
                // get last media
                let bindNodeCallback = Rx.Observable.bindNodeCallback(this.copyPhoto);
                bindNodeCallback(this.cam, lastDirectory, lastFile)
                    .flatMap((x) => bindNodeCallback(this.cam, lastDirectory, lastFile2))
                    .flatMap((x) => bindNodeCallback(this.cam, lastDirectory, lastFile3))
                    .subscribe({
                            next: x => console.log("copying done"),
                            error: err => console.log("something went wrong, err: %s", err),
                            complete: () => console.log('done')
                        }
                    );
            });
        });
    }

    getLastPhoto() {
        return Rx.Observable.create((observer) => {

            this.cam.listMedia().then(result => {
                let lastDirectory = result.media[result.media.length - 1];
                let lastFile = lastDirectory.fs[lastDirectory.fs.length - 1];

                // get last media
                this.cam
                    .getMedia(lastDirectory.d, lastFile.n, lastFile.n)
                    .then(filename => {
                        console.log(filename, '[saved]');
                        observer.next(1);
                        observer.complete();
                    });
            });
        });

    }

    copyPhoto(cam, lastDirectory, lastFile, callback) {
        cam
            .getMedia(lastDirectory.d, lastFile.n, lastFile.n)
            .then(filename => {
                console.log("copied: %s", filename);
                callback(null, filename);
            });
    }

}

module.exports = GoproController;
