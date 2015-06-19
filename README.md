node-motion
=================

This repository contains node-motion, which will eventually become a standalone client.

It is a simple wrapper for the motion package that can be used on Linux boxes to view a usb connected webcam. It will spawn motion and a simple express server to view the cam. It uses a JSON file in `config/` to create a temporary `motion.conf` file. Values can be overridden in the config.

See `index.js` for a simple use. This package is not yet published on the npm registry, because the cli is not ready yet.

Install
-------------

* clone the repository
* ```npm install```
* run ```node cli.js```
* open `localhost:3000` to view your webcam

Prerequisites
--------------

* Only works on Linux (tested and developed on Ubuntu)
* Needs the motion package, currently only works on version 3.2.12 (others are developed)

TODO
--------------
* Add grunt/gulp
* Writing tests
* Splitting different modules in seperate npm-packages
* Setting up the client

## [License](https://github.com/j3lte/node-motion/blob/master/LICENSE)

(The MIT License)

Copyright (c) 2015 Jelte Lagendijk <jwlagendijk@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.