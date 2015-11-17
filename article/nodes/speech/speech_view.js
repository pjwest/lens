"use strict";

var NodeView = require('../node').View;
var CompositeView = require("../composite").View;

var $$ = require("../../../substance/application").$$;

// Lens.Speech.View
// ==========================================================================

var SpeechView = function(node, viewFactory) {
  CompositeView.call(this, node, viewFactory);
};

SpeechView.Prototype = function() {


  this.render = function() {
    NodeView.prototype.render.call(this);
    var speeches = this.node.speeches;
    var htmlTable="<table>";
    var i;
      for (i = 0; i < speeches.length; i++) {
          htmlTable +="<tr>";
          htmlTable += "<td><b>"+speeches[i].speaker+"</b></td>";
          htmlTable += "<td>"+speeches[i].text+"</td>";

          htmlTable +="</tr>";
      }
      htmlTable+="</table>";

    if (this.node.speeches) {
      var speechTable = $$('.speeches', {
          html: htmlTable

      });

      this.content.appendChild(speechTable);
    };

    this.renderChildren();

    this.el.appendChild(this.content);
    return this;
  };
};

SpeechView.Prototype.prototype = CompositeView.prototype;
SpeechView.prototype = new SpeechView.Prototype();

module.exports = SpeechView;
