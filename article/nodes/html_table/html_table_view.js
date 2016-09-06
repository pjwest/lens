"use strict";

var NodeView = require('../node').View;
var CompositeView = require("../composite").View;

var $$ = require("../../../substance/application").$$;


var HTMLTableView = function (node, viewFactory) {
    CompositeView.call(this, node, viewFactory);
};

HTMLTableView.Prototype = function () {

    this.render = function () {
        NodeView.prototype.render.call(this);
        var i, childView, childViewEl, htmlTable, row, tr, td;

        htmlTable = document.createElement('table');
        htmlTable.setAttribute('class', 'html-table');

        var tr = document.createElement('tr');
        tr.setAttribute('class', 'html-table');

        var rows = this.node.getChildrenIds();

        if (rows !== undefined) {
            for (var r in rows) {
                row = rows[r];
                tr = document.createElement('tr');
                for (var i = 0; i < row.length; i++) {
                    td = document.createElement('td');
                    td.setAttribute('class', 'html-table');
                    childView = this.createChildView(row[i].id);
                    childViewEl = childView.render().el;
                    td.appendChild(childViewEl);
                    tr.appendChild(td);
                    htmlTable.appendChild(tr);

                }
            }
        }

        this.content.appendChild(htmlTable);

        this.el.appendChild(this.content);

        return this;
    };
};

HTMLTableView.Prototype.prototype = CompositeView.prototype;
HTMLTableView.prototype = new HTMLTableView.Prototype();

module.exports = HTMLTableView;

/**
 var footers = $$('.footers', {
      children: _.map(this.node.footers, function(footer) {
        return $$('.footer', { html: "<b>"+footer.label+"</b> " + footer.content });
      })
    });

 // Display caption


 if (this.node.caption) {
      var captionView = this.createView(this.node.caption);
      this.content.appendChild(captionView.render().el);
    }

 this.content.appendChild(footers);
 **/