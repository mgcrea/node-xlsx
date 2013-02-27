'use strict';

var debug = require('debug')('node-xlsx'),
    fs = require('fs'),
    vm = require('vm');

var sandbox = vm.createContext();
var loadVendor = function(fileName) {
    vm.runInNewContext(fs.readFileSync(__dirname + '/' + fileName), sandbox, fileName);
};
loadVendor('jszip/jszip.js');
loadVendor('jszip/jszip-deflate.js');
loadVendor('jszip/jszip-inflate.js');
loadVendor('jszip/jszip-load.js');
loadVendor('xlsx/xlsx.js');

module.exports = {
  parse: function(mixed) {
    if(typeof mixed === 'string') mixed = fs.readFileSync(mixed);
    debug('parsed a %d-sized xml', mixed.length);
    return sandbox.xlsx(mixed.toString('base64'));
  },
  build: function(object) {
    var data = sandbox.xlsx(object); // [ 'base64', 'zipTime', 'processTime', 'href' ]
    if(!data.base64) return false;
    var buffer = new Buffer(data.base64, 'base64');
    debug('built a %d-sized xml, processTime:%dms, zipTime:%dms', buffer.length, data.processTime, data.zipTime);
    return buffer;
  }
};
