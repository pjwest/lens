"use strict";

var NodeView = require('../node').View;
var CompositeView = require("../composite").View;
var $$ = require("../../../substance/application").$$;

// Lens.Box.View
// ==========================================================================

var secMetaView = function(node, viewFactory) {
  CompositeView.call(this, node, viewFactory);
};

secMetaView.Prototype = function() {

  // Render it
  // --------
  //

  this.render = function() {
    NodeView.prototype.render.call(this);
    console.log("view", this.node);

    if (this.node.label) {
      var labelEl = $$('.label', {
        text: this.node.label
      });
      this.content.appendChild(labelEl);
    }



      if (this.node.abstract.heading) {
          var labelElx = $$('.label', {
              text: this.node.abstract.heading.content
          });
          this.content.appendChild(labelElx);
      }
      if (this.node.abstract.text) {
          var labelElx = $$('.label', {
              text: this.node.abstract.text[0]
          });
          this.content.appendChild(labelElx);
      }

    this.renderChildren();

    this.el.appendChild(this.content);

    return this;
  };
};

secMetaView.Prototype.prototype = CompositeView.prototype;
secMetaView.prototype = new secMetaView.Prototype();

module.exports = secMetaView;
