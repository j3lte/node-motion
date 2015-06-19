var Motion_config = require('./config');
var MotionHandler = require('./motion');
var ViewServer = require('./server');

var motion = new MotionHandler();
var config = new Motion_config({
    version : motion.version,
    params : {
        "control_port":"8080", // This is used for controlling Motion
        "webcam_port":"9001" // This is used for the stream
    }
});
var viewServer = new ViewServer(3000);

config.on('info:configWritten', function (filename) {
    motion.setConfig(filename);
    motion.start();
    viewServer.start();
});

motion
    .on('info', function(msg) {
        console.log('[MOTION INFO]', msg);
    })
    .on('debug', function(msg) {
        console.log('[MOTION DEBUG]', msg);
    })
    .on('msg', function(msg) {
        console.log('[MOTION MSG]', msg);
        if (msg.action === 'stream' && msg.value !== null) {
            viewServer.streamPort = msg.value;
        }
    })
    .on('exit', function(msg) {
        console.log('[MOTION EXIT]', msg);
        config.deleteConfig();
    });

process.on('SIGINT', function() {
    if (config.tmpFileName) {
        config.deleteConfig();
    }
    if (motion.motion) {
        motion.stop();
    }
    console.log('\nCTRL+C. Motion exited.');
    return process.exit();
});