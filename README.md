node-motion
=================

[![NPM](https://nodei.co/npm/node-motion.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/node-motion/)

[![DAVID](https://david-dm.org/j3lte/node-motion.png)](https://david-dm.org/j3lte/node-motion)
[![npm version](https://badge.fury.io/js/node-motion.svg)](http://badge.fury.io/js/node-motion)
[![Development Dependency Status](https://david-dm.org/j3lte/node-motion/dev-status.svg?theme=shields.io)](https://david-dm.org/j3lte/node-motion#info=devDependencies)
[![Code Climate](https://codeclimate.com/github/j3lte/node-motion/badges/gpa.svg)](https://codeclimate.com/github/j3lte/node-motion)

NodeJS terminal client for managing Motion

It is a simple wrapper for the [motion](http://www.lavrsen.dk/foswiki/bin/view/Motion) package that can be used on Linux boxes to view a usb connected webcam. It will spawn motion and a simple express server to view the cam.

  * It can use a JSON file that represents a .conf file ([see configs](https://github.com/j3lte/node-motion/tree/master/config))
  * It can use a valid motion.conf file (see [examples](http://www.lavrsen.dk/foswiki/bin/view/Motion/WorkingConfigs))
  * It uses a JSON file in `config/` ([see example config](https://github.com/j3lte/node-motion/blob/master/config/motion_conf.json)) to create a temporary `motion.conf` file. Values can be overridden with the client

## Usage

Install Node.js if you don't have it yet. Then from the command line:

    [sudo] npm install node-motion -g

Then proceed as follows:

    node-motion [options] [configfile]

See [client output](https://github.com/j3lte/node-motion/blob/master/docs/cli.md)

Prerequisites
--------------

* Only works on Linux (tested and developed on Ubuntu 14.04 & Raspberry Pi)
* Needs the motion package installed (`sudo apt-get install motion`), currently works on:
    * Motion version 3.2.12
    * Motion version 3.2.12+git20140228

TODO
--------------
* ~~Add grunt/gulp~~
* Writing tests
* ~~Setting up the client~~

## Bugs / issues / features

Please, if you find any bugs, or are a way better developer than I am (as in, you are thinking 'spaghetti' when looking at my code), feel free to create an issue. If you have features or addons for compatibility, please add a (pull request)[https://github.com/j3lte/node-motion/pulls]!

## [License](https://github.com/j3lte/node-motion/blob/master/LICENSE)

(The MIT License)

Copyright (c) 2015 Jelte Lagendijk <jwlagendijk@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
