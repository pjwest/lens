"use strict";

var Document = require('../../../substance/document');
var Composite = Document.Composite;

// Lens.Box
// -----------------
//

var secMeta = function(node, doc) {
  Composite.call(this, node, doc);
};

// Type definition
// -----------------
//

secMeta.type = {
  "id": "sec_meta",
  "parent": "content",
  "properties": {
    "source_id": "string",
    "label": "string",
    "children": ["array", "paragraph"],
    "abstract":{
      "head":  ["array", "paragraph"],
        "text": ["array", "paragraph"]
    }

  }
};

// This is used for the auto-generated docs
// -----------------
//

secMeta.description = {
  "name": "Box",
  "remarks": [
    "A box type.",
  ],
  "properties": {
    "label": "string",
    "children": "0..n Paragraph nodes",
  }
};


// Example Box
// -----------------
//

secMeta.example = {
  "id": "box_1",
  "type": "box",
  "label": "Box 1",
  "children": ["paragraph_1", "paragraph_2"]
};

secMeta.Prototype = function() {

  this.getChildrenIds = function() {
    return this.properties.children;
  };

};

secMeta.Prototype.prototype = Composite.prototype;
secMeta.prototype = new secMeta.Prototype();
secMeta.prototype.constructor = secMeta;

Document.Node.defineProperties(secMeta);

module.exports = secMeta;
