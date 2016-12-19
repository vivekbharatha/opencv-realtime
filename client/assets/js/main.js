/**
 * Created by vivek on 19/12/16.
 */
var socket = io.connect();

var canvas = document.getElementById('canvas-camera');
var context = canvas.getContext('2d');
var img = new Image();

context.fillStyle = '#333';
context.fillText('opencv-realtime loading....', canvas.width/2, canvas.height/2);

socket.on('outputFrame', function (op) {
    var uint8Arr = new Uint8Array(op.buffer);
    var string = String.fromCharCode.apply(null, uint8Arr);
    var base64String = btoa(string);

    img.onload = function () {
        context.drawImage(this, 0, 0, canvas.width, canvas.height);
    };

    img.src = 'data:image/png;base64,' + base64String;
});