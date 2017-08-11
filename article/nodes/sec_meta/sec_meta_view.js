"use strict";

var NodeView = require('../node').View;
var CompositeView = require("../composite").View;
var $$ = require("../../../substance/application").$$;

// Lens.SecMeta.View
// ==========================================================================

var secMetaView = function (node, viewFactory) {
    CompositeView.call(this, node, viewFactory);
};

secMetaView.Prototype = function () {
    this.render = function () {
        this.content = document.createElement("div");
        this.renderChildren();
        this.el.appendChild(this.content);
        return this;
    };
};

secMetaView.Prototype.prototype = CompositeView.prototype;
secMetaView.prototype = new secMetaView.Prototype();

module.exports = secMetaView;
