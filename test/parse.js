'use strict';
// nodemon -w . --exec npm test

var util = require('util'),
    fs = require('fs');

var log = function() {
  var args = Array.prototype.slice.call(arguments, 0);
  return util.log(util.inspect.call(null, args.length === 1 ? args[0] : args, false, null, true));
};

var xlsx = require('../index');

module.exports.parse = function(assert) {

  var fixture = JSON.parse(fs.readFileSync(__dirname + '/fixtures/parsed.json'));
  var filename = __dirname + '/fixtures/test.xlsx';
  var xlsObject;

  // parse file
  xlsObject = xlsx.parse(filename);
  assert.equal(!!(xlsObject && xlsObject.Sheets), true);
  assert.deepEqual(xlsObject.Sheets, fixture);

  // parse buffer
  xlsObject = xlsx.parse(fs.readFileSync(filename));
  assert.equal(!!(xlsObject && xlsObject.Sheets), true);
  assert.deepEqual(xlsObject.Sheets, fixture);

  assert.done();

};
