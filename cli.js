'use strict';
/*
 * node-motion
 * https://github.com/j3lte/node-motion
 *
 * Copyright (c) 2015 Jelte Lagendijk
 * Licensed under the MIT license.
 */
var chalk = require('chalk');
var optimist = require('optimist');
var updateNotifier = require('update-notifier');
var shell = require('shelljs');
var path = require('path');

var pkg = require('./package.json');

var MotionConfig = require('./config');
var MotionHandler = require('./motion');
var ViewServer = require('./server');

var motion, config;

var banner = [
  '',
  '                                                                                 ',
  '                       _                            _   _                        ',
  '       _ __   ___   __| | ___       _ __ ___   ___ | |_(_) ___  _ __             ',
  '      | \'_ \\ / _ \\ / _\` |/ _ \\_____| \'_ ` _ \\ / _ \\| __| |/ _ \\| \'_ \\            ',
  '      | | | | (_) | (_| |  __/_____| | | | | | (_) | |_| | (_) | | | |           ',
  '      |_| |_|\\___/ \\__,_|\\___|     |_| |_| |_|\\___/ \\__|_|\\___/|_| |_|           ',
  '                                                                                 ',
  '                                                                Version : ' + chalk.cyan(pkg.version),
  '                                                                By      : ' + chalk.cyan('@j3lte'),
  ''
].join('\n');

var argv = optimist
  .usage([
    '',
    ' ' + chalk.green('Node motion : Control motion with NodeJS'),
    '',
    ' Usage : ' + chalk.bold.cyan('node-motion [OPTIONS] [CONFIG-FILE]'),
    '',
    ' Configuration-file can either be a JSON or a .conf file',
    '',
    ' If you experience issues, report them here: ' + chalk.green('https://github.com/j3lte/node-motion/issues')
  ].join('\n'))
  .alias('n', 'no_webserver')
    .describe('n', 'Do not start a preview server')
    .boolean('n')
  .alias('v', 'videodevice')
    .describe('v', 'Videodevice (e.g. /dev/video0) (overridden by config-file)')
  .alias('c', 'control_port')
    .describe('c', 'Controlport for motion (overridden by config-file)')
    .default('c', 9000)
  .alias('s', 'webcam_port')
    .describe('s', 'Port for motion stream (overridden by config-file)')
    .default('s', 9001)
  .alias('b', 'motion_bin')
    .describe('b', 'Path to motion binary, in case it is not available in $PATH')
  .alias('p', 'preview_port')
    .describe('p', 'Port for hosting the preview server (http://localhost:<port>/')
    .default('p', 3000)
  .alias('d', 'debug')
      .describe('d', 'Verbose debug output')
      .boolean('d')
  .alias('h', 'help')
      .describe('h', 'Shows this help screen')
  .alias('u', 'update')
      .describe('u', 'Checks if there is an update for node-motion')
  .argv;

console.log(banner);

function runMotion(motionConfFile) {

  var viewServer;
  var useJSON = true;

  if (argv.motion_bin) {
    motion = new MotionHandler(argv.motion_bin);
  } else {
    motion = new MotionHandler();
  }

  if (motionConfFile && motionConfFile.type === '.json') {
    console.log('[NODE-MOTION] Using json: ' + motionConfFile.file);
    config = new MotionConfig(motionConfFile.file);
  } else if (motionConfFile && motionConfFile.type === '.conf') {
    console.log('[NODE-MOTION] Using conf : ' + motionConfFile.file);
    useJSON = false;
  } else {
    console.log('[NODE-MOTION] Generating temporary config file');
    var motionParams = {
      'control_port': argv.control_port, // This is used for controlling Motion
      'webcontrol_port': argv.control_port, // version 3_2_12_git20140228
      'webcam_port': argv.webcam_port, // This is used for the stream
      'stream_port': argv.webcam_port // version 3_2_12_git20140228
    };
    if (argv.videodevice) {
      motionParams.videodevice = argv.videodevice;
    }
    config = new MotionConfig({
      version: motion.version,
      params: motionParams
    });
  }

  if (!argv.no_webserver) {
    viewServer = new ViewServer(argv.preview_port);
  }

  if (useJSON) {
    config.on('info:configWritten', function (filename) {
      motion.setConfig(filename);
      motion.start();
      viewServer && viewServer.start();
    });
  } else {
    motion.setConfig(config.file);
    motion.start();
    viewServer && viewServer.start();
  }

  motion
    .on('info', function(msg) {
      argv.debug && console.log('[MOTION INFO]', msg);
    })
    .on('debug', function(msg) {
      argv.debug && console.log('[MOTION DEBUG]', msg);
    })
    .on('msg', function(msg) {
      //argv.debug && console.log('[MOTION MSG]', msg);
      if (msg.action === 'stream' && msg.value !== null && !argv.no_webserver) {
        viewServer.streamPort = msg.value;
        console.log('[NODE-MOTION] Preview started on http://localhost:' + argv.preview_port);
      }
    })
    .on('exit', function(msg) {
      console.log('[MOTION EXIT]', msg);
      config && config.deleteConfig();
    });
}

var platform = process.platform;

if (platform === 'linux') {
  if (process.arch === 'x64') {
    platform += '64';
  } else {
    platform += '32';
  }
} else {
  console.log(chalk.bold.red('Unexpected platform or architecture, node-motion only runs on Linux:'), process.platform, process.arch);
  process.exit(1);
}

if (argv.update) {
  console.log(chalk.cyan('\n Checking for an update'));
  updateNotifier({
    pkg: pkg,
    callback: function(err, update) {
      if (err) {
        console.log(chalk.red('\n Error checking the update : %s\n'), err);
      } else {
        if (update.latest !== update.current) {
          console.log(chalk.green(' Update available! Run ') + chalk.bold.cyan('npm update -g node-motion') + chalk.green(' to install version ') + chalk.bold.cyan(update.latest) + '\n');
        } else {
          console.log(chalk.green(' You are running the latest version :-)\n'));
        }
      }
      process.exit(0);
    }
  });
} else if (argv.help || argv._.length > 1) {
  console.log(optimist.help());
  process.exit(0);
} else if (argv._.length === 1) {
  var configFileName = argv._[0];
  if (!shell.test('-e', configFileName)) {
    console.log(chalk.red('\n\n Error, cannot find ' + configFileName));
    process.exit(1);
  } else {
    var filePath = path.resolve(configFileName);
    var ext = path.extname(configFileName);
    if (ext === '.json' || ext === '.conf') {
      runMotion({
        type: ext,
        file: filePath
      });
    } else {
      console.log(chalk.red('\n\n The file ' + configFileName + ' should either be a .json or a .conf file\n'));
      process.exit(1);
    }
  }
} else {
  runMotion();
}

process.on('SIGINT', function() {
  config && config.tmpFileName && config.deleteConfig();
  motion.motion && motion.stop();
  console.log('\n[NODE-MOTION] CTRL+C. exited.');
  return process.exit();
});
