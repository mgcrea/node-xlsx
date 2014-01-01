**New Features Added:**

* More customizable options like font name and color.
* Limited support for colSpan AND rowSpan.
* Forced row height and column width.
* Added textRotation.
* Added page scale and sheet view option.

---

[node-xlsx](http://mgcrea.github.com/node-xlsx) [![Build Status](https://secure.travis-ci.org/mgcrea/node-xlsx.png?branch=master)](http://travis-ci.org/#!/mgcrea/node-xlsx)
=================

Excel parser/builder that relies on [xlsx.js](https://raw.github.com/stephen-hardy/xlsx.js) (Microsoft Office Extensible File License), this package had to be released under the same restrictive license. Please read it carefully.

An opensource alternative is currently being developped by [Niggler](https://github.com/Niggler/js-xlsx), reader-only for now.

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

  This license governs use of the accompanying software. If you use the software, you
   accept this license. If you do not accept the license, do not use the software.

  1. Definitions
   The terms "reproduce," "reproduction," "derivative works," and "distribution" have the
   same meaning here as under U.S. copyright law.
   A "contribution" is the original software, or any additions or changes to the software.
   A "contributor" is any person that distributes its contribution under this license.
   "Licensed patents" are a contributor's patent claims that read directly on its contribution.
   "Excluded Products” are software products or components, or web-based or hosted services, that primarily perform the same general functions as any of the following software applications: Microsoft Office, Word, Excel, PowerPoint, Outlook, OneNote, Publisher, SharePoint, or Access.

  2. Grant of Rights
   (A) Copyright Grant- Subject to the terms of this license, including the license conditions and limitations in section 3, each contributor grants you a non-exclusive, worldwide, royalty-free copyright license to reproduce its contribution, prepare derivative works of its contribution, and distribute its contribution or any derivative works that you create.
   (B) Patent Grant- Subject to the terms of this license, including the license conditions and limitations in section 3, each contributor grants you a non-exclusive, worldwide, royalty-free license under its licensed patents to make, have made, use, sell, offer for sale, import, and/or otherwise dispose of its contribution in the software or derivative works of the contribution in the software.

  3. Conditions and Limitations
   (A) No Trademark License- This license does not grant you rights to use any contributors' name, logo, or trademarks.
   (B) If you bring a patent claim against any contributor over patents that you claim are infringed by the software, your patent license from such contributor to the software ends automatically.
   (C) If you distribute any portion of the software, you must retain all copyright, patent, trademark, and attribution notices that are present in the software.
   (D) If you distribute any portion of the software in source code form, you may do so only under this license by including a complete copy of this license with your distribution. If you distribute any portion of the software in compiled or object code form, you may only do so under a license that complies with this license.
   (E) The software is licensed "as-is." You bear the risk of using it. The contributors give no express warranties, guarantees or conditions. You may have additional consumer rights under your local laws which this license cannot change. To the extent permitted under your local laws, the contributors exclude the implied warranties of merchantability, fitness for a particular purpose and non-infringement.
   (F) Platform Limitation- The licenses granted in sections 2(A) & 2(B) extend only to the software or derivative works that (1) are run on a Microsoft Windows operating system product, and (2) are not Excluded Products.
