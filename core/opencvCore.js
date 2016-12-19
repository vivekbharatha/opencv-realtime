/**
 * Created by vivek on 19/12/16.
 */

var opencv = require('opencv');
var serverConfig = require('./../config/serverConfig');

var camera = new opencv.VideoCapture(0);
camera.setWidth(serverConfig.camera.width);
camera.setHeight(serverConfig.camera.height);
module.exports = function (socket) {
    console.log('One client connected with id', socket.id);
    var intervalProcess = setInterval(function () {
        camera.read(function (err, im) {
            if (err) throw err;
            im.detectObject('node_modules/opencv/data/haarcascade_frontalface_alt2.xml', {}, function (err, faces) {
                if (err) throw err;
                for (var i = 0; i < faces.length; i++) {
                    var face = faces[i];
                    // im.ellipse(face.x + face.width/2, face.y + face.width/2, face.width/2, face.height/2);
                    im.rectangle([face.x, face.y], [face.width, face.height], serverConfig.detectionColor, serverConfig.detectionBorderThickness);
                }

                socket.emit('outputFrame', { buffer: im.toBuffer() });
            });
        });
    }, serverConfig.camera.interval);

    socket.on('disconnect', function () {
        console.log('disconnected', socket.id);
        clearInterval(intervalProcess);
    });
};