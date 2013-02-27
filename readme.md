[node-xlsx](http://mgcrea.github.com/node-xlsx) [![Build Status](https://secure.travis-ci.org/mgcrea/node-xlsx.png?branch=master)](http://travis-ci.org/#!/mgcrea/node-xlsx)
=================

Excel parser/builder that relies on [xlsx.js](https://raw.github.com/stephen-hardy/xlsx.js) (Microsoft Office Extensible File License).

Quick start
-----------

Parsing a xlsx from file/buffer
``` javascript
var xlsx = require('node-xlsx');

var obj = xlsx.parse(__dirname + '/myPlist.plist'); // parses a file

var obj = xlsx.parse(fs.readFileSync(__dirname + '/myPlist.plist')); // parses a buffer

```

Building a plist from an object
``` javascript
var xlsx = require('node-xlsx');

var buffer = xlsx.build({worksheets: [
  {"name":"mySheetName", "data":[
    ["A1", "B1"],
    [
      {"value":"A2","formatCode":"General"},
      {"value":"B2","formatCode":"General"}
    ]
  ]}
]}); // returns a buffer

```

Testing
-------

node-plist-native is tested with `nodeunit`.

>
	npm install --dev
	npm test

Contributing
------------

Please submit all pull requests the against master branch. If your unit test contains javascript patches or features, you should include relevant unit tests. Thanks!

Authors
-------

**Olivier Louvignes**

+ http://olouv.com
+ http://github.com/mgcrea

Copyright and license
---------------------

	The MIT License

	Copyright (c) 2012 Olivier Louvignes

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
