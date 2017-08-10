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
      "children":{
        "abstract":"abstract"
      }
    }


};

// This is used for the auto-generated docs
// -----------------
//

secMeta.description = {
  "name": "Section",
  "remarks": [
    "Sectin Element for metadata",
  ],
  "properties": {
    "children": {
      "abstract": "abstract element"
    }
  }
};


// Example Section Metadata
// -----------------
//

secMeta.example = {
  "id": "sec_meta_1",
  "type": "sec_meta",

  "children": {
      "abstract":"abstract_id"}
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
