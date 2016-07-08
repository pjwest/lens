"use strict";

var NodeView = require('../node').View;
var CompositeView = require("../composite").View;

var $$ = require("../../../substance/application").$$;


var SpeechView = function (node, viewFactory) {
    CompositeView.call(this, node, viewFactory);
};

SpeechView.Prototype = function () {


    this.render = function () {
        NodeView.prototype.render.call(this);
        var speeches = this.node.speeches;
        var htmlTable = document.createElement('table');
        htmlTable.setAttribute('class', 'speeches');
        var i, tr, td, speaker;
        for (i = 0; i < speeches.length; i++) {
            tr = document.createElement('tr');
            td = document.createElement('td');
            td.setAttribute('class', 'speaker');
            td.innerText = speeches[i].speaker;
            tr.appendChild(td);
            td = document.createElement('td');
            td.setAttribute('class', 'speech');
            td.innerHTML = speeches[i].text;
            tr.appendChild(td);
            htmlTable.appendChild(tr);
        }
        this.content.appendChild(htmlTable);
        this.renderChildren();

        this.el.appendChild(this.content);
        return this;
    };
};

SpeechView.Prototype.prototype = CompositeView.prototype;
SpeechView.prototype = new SpeechView.Prototype();

module.exports = SpeechView;
