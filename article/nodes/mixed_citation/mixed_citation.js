var _ = require('underscore');
var Document = require('../../../substance/document');

// Lens.Footnote
// -----------------
//

var MixedCitation = function(node, doc) {
  Document.Node.call(this, node, doc);
};

// Type definition
// -----------------
//

MixedCitation.type = {
  "id": "mixed_citation",
  "parent": "content",
  "properties": {
    "source_id": "string",
    "text": "object",
    "label": "string",
    "authors": ["array", "string"],
    "doi": "string",
    "source": "string",
    "volume": "string",
    "citation_type": "string",
    "publisher_name": "string",
    "publisher_location": "string",
    "fpage": "string",
    "lpage": "string",
    "year": "string",
    "comment": "string",
    "citation_urls": ["array", "object"],
    "source_formats": ["array", "object"]
  }
};

// This is used for the auto-generated docs
// -----------------
//

MixedCitation.description = {
  "name": "MixedCitation",
  "remarks": [
    "A journal citation.",
    "This element can be used to describe all kinds of citations."
  ],
  "properties": {
    "title": "The article's title",
    "label": "Optional label (could be a number for instance)",
    "doi": "DOI reference",
    "source": "Usually the journal name",
    "volume": "Issue number",
    "citation_type": "Footnote Type",
    "publisher_name": "Publisher Name",
    "publisher_location": "Publisher Location",
    "fpage": "First page",
    "lpage": "Last page",
    "year": "The year of publication",
    "comment": "Author comment.",
    "citation_urls": "A list of links for accessing the article on the web"
  }
};



// Example Footnote
// -----------------
//

MixedCitation.example = {
  "id": "article_nature08160",
  "type": "article_citation",
  "label": "5",
  "title": "The genome of the blood fluke Schistosoma mansoni",
  "authors": [
    "M Berriman",
    "BJ Haas",
    "PT LoVerde"
  ],
  "citation_type": "Journal Article",
  "doi": "http://dx.doi.org/10.1038/nature08160",
  "source": "Nature",
  "volume": "460",
  "fpage": "352",
  "lpage": "8",
  "year": "1984",
  "comment": "This is a comment.",
  "citation_urls": [
    {
      "name": "PubMed",
      "url": "http://www.ncbi.nlm.nih.gov/pubmed/19606141"
    }
  ]
};


MixedCitation.Prototype = function() {

  // Returns the citation URLs if available
  // Falls back to the DOI url
  // Always returns an array;
  this.urls = function() {
    return this.properties.citation_urls.length > 0 ? this.properties.citation_urls
                                                    : [this.properties.doi];
  };

  this.getHeader = function() {
    return _.compact([this.properties.label, this.properties.citation_type || locales.Reference]).join(' - ');
  };
};

MixedCitation.Prototype.prototype = Document.Node.prototype;
MixedCitation.prototype = new MixedCitation.Prototype();
MixedCitation.prototype.constructor = MixedCitation;

Document.Node.defineProperties(MixedCitation);

module.exports = MixedCitation;
