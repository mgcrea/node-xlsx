'use strict';

var debug = require('debug')('node-xlsx');
var fs = require('fs');
var xlsx = require(__dirname + '/xlsx/xlsx.js');

module.exports = {
  parse: function(mixed, options) {
    if(typeof mixed === 'string') mixed = fs.readFileSync(mixed);
    debug('parsed a %d-sized xml', mixed.length);
    return xlsx(mixed.toString('base64'), options);
  },
  build: function(object, options) {
    var data = xlsx(object, options); // [ 'base64', 'zipTime', 'processTime', 'href' ]
    if(!data.base64) return false;
    var buffer = new Buffer(data.base64, 'base64');
    debug('built a %d-sized xml, processTime:%dms, zipTime:%dms', buffer.length, data.processTime, data.zipTime);
    return buffer;
  }
};
