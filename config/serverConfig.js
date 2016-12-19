/**
 * Created by vivek on 19/12/16.
 */
module.exports = {
    PORT: 4545,
    staticPath: './client',
    camera: {
        width: 320,
        height: 240,
        fps: 10,
        interval: 1000/10,  // <-- denominator is cameraFPS value
    },
    detectionColor: [0, 0, 0],
    detectionBorderThickness: 1
};