'use strict';
/*
 * node-motion
 * https://github.com/j3lte/node-motion
 *
 * Copyright (c) 2015 Jelte Lagendijk
 * Licensed under the MIT license.
 */
var fs = require('fs');
var _ = require('lodash');
var path = require('path');
var tmp = require('tmp');
var shell = require('shelljs');
var Emitter = require('events').EventEmitter;
var util = require('util');

var defaultConfig = require(path.resolve(__dirname, 'motion_conf.json'));

var Config = function(config) {
  this.tmpFile = tmp.fileSync({ mode: '0644', prefix: 'motion-conf-', postfix: '.conf', keep: true});
  this.tmpFileName = this.tmpFile.name;
  if (typeof config === 'object') {
    if (config.version) {
      var fileName = 'motion_conf_' + config.version + '.json';
      var configFile = path.resolve(__dirname, fileName);
      if (!shell.test('-e', configFile)) {
        shell.echo('Sorry, configuration for version ' + config.version + ' cannot be found');
        this.tmpFile.removeCallback();
        process.exit(1);
      } else {
        this.config = require(configFile);
      }
    }
    if (config.params && typeof config.params === 'object') {
      this.config = _.assign(this.config, config.params);
    }
  } else if (typeof config === 'string') {
    // assuming the given string is a valid json file, currently only used in ../cli.js
    this.config = require(config);
  } else {
    this.config = defaultConfig;
  }
  this.writeConfig();
};

util.inherits(Config, Emitter);

Config.prototype.readConfig = function(){};

Config.prototype.writeConfig = function writeTempConfig() {
  var that = this;
  var configText = _.map(that.config, function(value, key) {
    return key + ' ' + value;
  }).join('\n');
  fs.writeFile(that.tmpFileName, configText, function (err) {
    if (err) {
      that.emit('error', new Error('writing configFile : ' + err));
    } else {
      that.emit('info:configWritten', that.tmpFile.name);
    }
  });
};

Config.prototype.deleteConfig = function() {
  this.emit('info', 'Removing configfile : ' + this.tmpFile.name);
  this.tmpFile.removeCallback();
};

module.exports = Config;
