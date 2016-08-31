
var Annotation = require('../annotation/annotation');

var Capitalize = function(node, doc) {
  Annotation.call(this, node, doc);
};

Capitalize.type = {
  id: "capitalize",
  parent: "annotation",
  properties: {}
};

Capitalize.Prototype = function() {};
Capitalize.Prototype.prototype = Annotation.prototype;
Capitalize.prototype = new Capitalize.Prototype();
Capitalize.prototype.constructor = Capitalize;

Capitalize.fragmentation = Annotation.DONT_CARE;

module.exports = Capitalize;
