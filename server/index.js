var express = require('express');
var app = express();

var Server = function(port){
    this.port = port || 3000;

    this.streamPort = null;
}

Server.prototype.start = function(){
    var _this = this;

    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');

    app.use(express.static(__dirname + '/public'));

    app.get('/', function(req, res) {
      res.render('home', {
        streamPort : _this.streamPort
      });
    });

    app.listen(_this.port);
};

module.exports = Server;


