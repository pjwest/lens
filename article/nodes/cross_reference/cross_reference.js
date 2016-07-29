var Document = require('../../../substance/document');
var Annotation = require('../annotation/annotation');

var CrossReference = function(node, doc) {
  Annotation.call(this, node, doc);
};

CrossReference.type = {
  id: "cross_reference",
  parent: "resource_reference",
  properties: {
    "target": "toc"
  }
};

CrossReference.Prototype = function() {};
CrossReference.Prototype.prototype = Annotation.prototype;
CrossReference.prototype = new CrossReference.Prototype();
CrossReference.prototype.constructor = CrossReference;

// Do not fragment this annotation
CrossReference.fragmentation = Annotation.NEVER;

Document.Node.defineProperties(CrossReference);

module.exports = CrossReference;
