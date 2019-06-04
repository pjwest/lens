"use strict";

var _ = require('underscore');
var $$ = require("../../../substance/application").$$;
var NodeView = require("../node").View;
var ResourceView = require('../../resource_view');
var util = require("../../../substance/util");



// Lens.Citation.View

var FootnoteView = function (node, viewFactory, options) {
    NodeView.apply(this, arguments);

    // Mix-in
    ResourceView.call(this, options);


};


FootnoteView.Prototype = function () {

    // Mix-in
    _.extend(this, ResourceView.prototype);

    this.renderBody = function () {
        var frag = document.createDocumentFragment();
        var node = this.node;
        var i, k;
        var xref;
        var div;


        var texts = node.properties.text;


        function createElement(t, type, cls) {
            var elem = document.createElement(type);
            elem.className = cls;
            elem.innerHTML = t.textContent;
            if (t.target !== undefined) elem.setAttribute("data-id", t.target);
            return elem;
        }


        for (i = 0; i < texts.length; i++) {
            var x = texts[i];
            for (var j = 0; j < x.length; j++) {
                var part = x[j];

                if (part !== undefined) {
                    div = document.createElement("div");

                    if (part.handler === 'paragraph') {
                        part = part.nodes;
                        for (k = 0; k < part.length; k++) {
                            if (part[k].tagName == 'italic') {
                                div.appendChild(createElement(part[k], 'span', 'citation-italic'));
                            }
                            else if (part[k].tagName == 'xref' && part[k].getAttribute('ref-type') === "sec") {
                                div.appendChild(createElement(part[k], 'a', 'annotation cross_reference cross-reference'));
                            }
                            else if (part[k].tagName == 'xref' && part[k].getAttribute('ref-type') === "bibr") {
                                xref = createElement(part[k], 'a', '');
                                xref.setAttribute("href", '#citations/' + part[k].target);
                                div.appendChild(xref);
                            }
                            else {
                                if (part[k].tagName == 'ext-link') {
                                    xref = createElement(part[k], 'a', 'content-node link');
                                    xref.setAttribute("href", part[k]);
                                    xref.setAttribute("target", "_blank");
                                    var href = part[k].getAttributeNodeNS("http://www.w3.org/1999/xlink", "href")
                                    if (href) {
                                        xref.innerHTML = part[k].textContent;
                                        xref.setAttribute("href", href.textContent);
                                    }
                                    div.appendChild(xref);
                                }
                                else {
                                    div.appendChild(part[k]);
                                }


                            }
                        }

                    }
                    else if (part.handler === 'tableWrap') {

                        var children = util.dom.getChildren(part.node);
                        if (children[0]) {
                            var table = document.createElement('table');
                            table.innerHTML =children[0].innerHTML;
                            table.className="table";
                            frag.appendChild(table);

                        }

                    }
                    frag.appendChild(div);
                }
            }
        }


        // Add Authors
        // -------
        frag.appendChild($$('.authors', {
            html: node.authors.join(', ')
        }));

        // Add Source
        // -------

        var sourceText = "",
            sourceFrag = "",
            pagesFrag = "",
            publisherFrag = "";

        // Hack for handling unstructured citation types and render prettier
        if (node.source && node.volume === '') {
            sourceFrag = node.source;
        } else if (node.source && node.volume) {
            sourceFrag = [node.source, node.volume].join(', ');
        }

        if (node.fpage && node.lpage) {
            pagesFrag = [node.fpage, node.lpage].join('-');
        }

        // Publisher Frag

        var elems = [];

        if (node.publisher_name && node.publisher_location) {
            elems.push(node.publisher_name);
            elems.push(node.publisher_location);
        }

        if (node.year) {
            elems.push(node.year);
        }

        publisherFrag = elems.join(', ');

        // Put them together
        sourceText = sourceFrag;

        // Add separator only if there's content already, and more to display
        if (sourceFrag && (pagesFrag || publisherFrag)) {
            sourceText += ": ";
        }

        if (pagesFrag && publisherFrag) {
            sourceText += [pagesFrag, publisherFrag].join(", ");
        } else {
            // One of them without a separator char
            sourceText += pagesFrag;
            sourceText += publisherFrag;
        }

        frag.appendChild($$('.source', {
            html: sourceText
        }));

        if (node.comment) {
            var commentView = this.createTextView({path: [node.id, 'comment'], classes: 'comment'});
            frag.appendChild(commentView.render().el);
        }

        // Add DOI (if available)
        // -------

        if (node.doi) {
            frag.appendChild($$('.doi', {
                children: [
                    $$('b', {text: "DOI: "}),
                    $$('a', {
                        href: node.doi,
                        target: "_new",
                        text: node.doi
                    })
                ]
            }));
        }

        if (node.citation_urls.length > 0) {
            var citationUrlsEl = $$('.citation-urls');

            _.each(node.citation_urls, function (url) {
                citationUrlsEl.appendChild($$('a.url', {
                    href: url.url,
                    text: url.name,
                    target: "_blank"
                }));
            });

            frag.appendChild(citationUrlsEl);
        }
        this.content.appendChild(frag);
    };
};

FootnoteView.Prototype.prototype = NodeView.prototype;
FootnoteView.prototype = new FootnoteView.Prototype();
FootnoteView.prototype.constructor = FootnoteView;

module.exports = FootnoteView;
