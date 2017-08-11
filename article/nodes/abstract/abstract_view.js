"use strict";

var NodeView = require('../node').View;
var CompositeView = require("../composite").View;
var $$ = require("../../../substance/application").$$;

// Lens.abstract.View
// ==========================================================================

var abstractView = function (node, viewFactory) {
    CompositeView.call(this, node, viewFactory);
};

abstractView.Prototype = function () {

    this.render = function () {
        NodeView.prototype.render.call(this);
        this.content = document.createElement("div");
        var title = this.node.title;
        var childView = this.createChildView(title);
        var childViewEl = childView.render().el;
        this.content.appendChild(childViewEl);

        this.renderChildren();
        this.el.appendChild(this.content);
        return this;
    };
};

abstractView.Prototype.prototype = CompositeView.prototype;
abstractView.prototype = new abstractView.Prototype();

module.exports = abstractView;

