var motion_config = require(__dirname + '/motion_conf.json');

var fs = require('fs');
var _ = require('lodash');
var tmp = require('tmp');
var shell = require('shelljs');

var Emitter = require('events').EventEmitter;
var util = require('util');

var Config = function(config) {
    this.tmpFile = tmp.fileSync({ mode: 0644, prefix: 'motion-conf-', postfix: '.conf', keep: true});
    this.tmpFileName = this.tmpFile.name;
    if (typeof(config) === "object") {
        if (config.version) {
            configFile = __dirname + '/motion_conf_' + config.version + '.json';
            if (!shell.test('-e', configFile)) {
                shell.echo('Sorry, configuration for version ' + config.version + ' cannot be found');
                this.tmpFile.removeCallback();
                process.exit(1);
            } else {
                this.config = require(configFile);
            }
        }
        if (config.params && typeof(config.params) === "object") {
            this.config = _.assign(motion_config, config.params);
        }
    } else {
        this.config = motion_config;
    }
    this.writeConfig();
};

util.inherits(Config, Emitter);

Config.prototype.readConfig = function(){};

Config.prototype.writeConfig = function writeTempConfig() {
    var _this = this;
    configText = _.map(_this.config, function(value, key) {
        return key + " " + value;
    }).join('\n');
    fs.writeFile(_this.tmpFileName, configText, function (err) {
        if (err) {
            _this.emit('error', new Error('writing configFile : ' + err));
        } else {
            _this.emit('info:configWritten', _this.tmpFile.name);
        }
    });
};

Config.prototype.deleteConfig = function() {
    var _this = this;
    this.emit('info', 'Removing configfile : ' + this.tmpFile.name);
    this.tmpFile.removeCallback();
};

module.exports = Config;