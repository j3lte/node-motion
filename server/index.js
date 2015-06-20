'use strict';
/*
 * node-motion
 * https://github.com/j3lte/node-motion
 *
 * Copyright (c) 2015 Jelte Lagendijk
 * Licensed under the MIT license.
 */
var express = require('express');
var path = require('path');
var app = express();

var Server = function(port){
  this.port = port || 3000;

  this.streamPort = null;
};

Server.prototype.start = function(){
  var that = this;

  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

  app.use(express.static(path.join(__dirname, 'public')));

  app.get('/', function(req, res) {
    res.render('home', {
      streamPort: that.streamPort
    });
  });

  app.listen(that.port);
};

module.exports = Server;
