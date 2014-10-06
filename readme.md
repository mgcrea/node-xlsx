[node-xlsx](http://mgcrea.github.com/node-xlsx) [![Build Status](https://secure.travis-ci.org/mgcrea/node-xlsx.png?branch=master)](http://travis-ci.org/#!/mgcrea/node-xlsx)
=================

Excel parser/builder that relies on [js-xlsx](https://github.com/SheetJS/js-xlsx).

Quick start
-----------

Parsing a xlsx from file/buffer
``` javascript
var xlsx = require('node-xlsx');

var obj = xlsx.parse(__dirname + '/myFile.xlsx'); // parses a file

var obj = xlsx.parse(fs.readFileSync(__dirname + '/myFile.xlsx')); // parses a buffer

```

Building a plist from an object
``` javascript
var xlsx = require('node-xlsx');

var data = [[1,2,3],[true, false, null, 'sheetjs'],['foo','bar',new Date('2014-02-19T14:30Z'), '0.3'], ['baz', null, 'qux']];
var buffer = xlsx.build([{name: "mySheetName", data: data}]); // returns a buffer

```

Testing
-------

`node-xlsx` is tested with `nodeunit`.

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

  Copyright (C) 2012-2014  Olivier Louvignes

     Licensed under the Apache License, Version 2.0 (the "License");
     you may not use this file except in compliance with the License.
     You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

     Unless required by applicable law or agreed to in writing, software
     distributed under the License is distributed on an "AS IS" BASIS,
     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     See the License for the specific language governing permissions and
     limitations under the License.

  Except where noted, this license applies to any and all software programs and associated documentation files created by the Original Author and distributed with the Software:

  'node-xlsx.js' is a modified version of SheetJS gist examples, Copyright (c) SheetJS.
