"use strict";

var NodeView = require('../node').View;
var CompositeView = require("../composite").View;
var $$ = require("../../../substance/application").$$;

// Lens.SecMeta.View
// ==========================================================================

var abstractView = function (node, viewFactory) {
    CompositeView.call(this, node, viewFactory);
};

abstractView.Prototype = function () {
    this.render = function () {
        console.log("abstract view",this.node);
        return this;
    };
};

abstractView.Prototype.prototype = CompositeView.prototype;
abstractView.prototype = new abstractView.Prototype();

module.exports = abstractView;

