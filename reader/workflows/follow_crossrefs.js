"use strict";

var _ = require('underscore');
var Workflow = require('./workflow');

var FollowCrossrefs = function () {
    Workflow.apply(this, arguments);

    this._followCrossReference = _.bind(this.followCrossReference, this);
};

FollowCrossrefs.Prototype = function () {

    this.registerHandlers = function () {
        this.readerView.$el.on('click', '.annotation.cross_reference', this._followCrossReference);
    };

    this.unRegisterHandlers = function () {
        this.readerView.$el.off('click', '.annotation.cross_reference', this._followCrossReference);
    };

    this.followCrossReference = function (e) {
        e.preventDefault();
        e.stopPropagation();
        var refId = e.currentTarget.dataset.id;
        var crossRef = this.readerCtrl.getDocument().get(refId);
        var crossRefTarget;
        if (crossRef !==undefined) {
            if (crossRef.target !== undefined) {
                crossRefTarget = crossRef.target;
                this.readerView.contentView.scrollTo(crossRefTarget);
            }
            if (crossRefTarget === undefined) {
                if (crossRef.properties !== undefined) {
                    crossRefTarget = crossRef.properties.id;
                    this.readerView.contentView.scrollTo(crossRefTarget);
                }
            }
        }


    };

};
FollowCrossrefs.Prototype.prototype = Workflow.prototype;
FollowCrossrefs.prototype = new FollowCrossrefs.Prototype();

module.exports = FollowCrossrefs;
