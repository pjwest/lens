"use strict";
var _ = require("underscore");
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
        var node = this.node;
        this.content = document.createElement("div");

        var authors = $$('.authors', {
            children: _.map(node.getAuthors(), function(authorPara) {
                var paraView = this.viewFactory.createView(authorPara);
                var paraEl = paraView.render().el;
                this.content.appendChild(paraEl);
                return paraEl;
            }, this)
        });

        authors.appendChild($$('.content-node.text.plain', {
            children: [
                $$('.content', {text: this.node.document.on_behalf_of})
            ]
        }));
        this.content.appendChild(authors);


        var abstract = $$('.abstract', {
            children: _.map(node.getAbstract(), function(authorPara) {
                var paraView = this.viewFactory.createView(authorPara);
                var paraEl = paraView.render().el;
                this.content.appendChild(paraEl);
                return paraEl;
            }, this)
        });
        this.content.appendChild(abstract);

        this.el.appendChild(this.content);
        return this;
    };
};

secMetaView.Prototype.prototype = CompositeView.prototype;
secMetaView.prototype = new secMetaView.Prototype();

module.exports = secMetaView;
