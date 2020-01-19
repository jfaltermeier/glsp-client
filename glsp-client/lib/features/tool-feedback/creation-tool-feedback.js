"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
/********************************************************************************
 * Copyright (c) 2019 EclipseSource and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/
var inversify_1 = require("inversify");
var lib_1 = require("sprotty/lib");
var smodel_util_1 = require("../../utils/smodel-util");
var viewpoint_util_1 = require("../../utils/viewpoint-util");
var model_1 = require("./model");
var DrawFeedbackEdgeAction = /** @class */ (function () {
    function DrawFeedbackEdgeAction(elementTypeId, sourceId, routerKind) {
        this.elementTypeId = elementTypeId;
        this.sourceId = sourceId;
        this.routerKind = routerKind;
        this.kind = DrawFeedbackEdgeCommand.KIND;
    }
    return DrawFeedbackEdgeAction;
}());
exports.DrawFeedbackEdgeAction = DrawFeedbackEdgeAction;
var DrawFeedbackEdgeCommand = /** @class */ (function (_super) {
    __extends(DrawFeedbackEdgeCommand, _super);
    function DrawFeedbackEdgeCommand(action) {
        var _this = _super.call(this) || this;
        _this.action = action;
        return _this;
    }
    DrawFeedbackEdgeCommand.prototype.execute = function (context) {
        drawFeedbackEdge(context, this.action.sourceId, this.action.elementTypeId, this.action.routerKind);
        return context.root;
    };
    DrawFeedbackEdgeCommand.KIND = 'drawFeedbackEdge';
    DrawFeedbackEdgeCommand = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(lib_1.TYPES.Action)),
        __metadata("design:paramtypes", [DrawFeedbackEdgeAction])
    ], DrawFeedbackEdgeCommand);
    return DrawFeedbackEdgeCommand;
}(model_1.FeedbackCommand));
exports.DrawFeedbackEdgeCommand = DrawFeedbackEdgeCommand;
var RemoveFeedbackEdgeAction = /** @class */ (function () {
    function RemoveFeedbackEdgeAction() {
        this.kind = RemoveFeedbackEdgeCommand.KIND;
    }
    return RemoveFeedbackEdgeAction;
}());
exports.RemoveFeedbackEdgeAction = RemoveFeedbackEdgeAction;
var RemoveFeedbackEdgeCommand = /** @class */ (function (_super) {
    __extends(RemoveFeedbackEdgeCommand, _super);
    function RemoveFeedbackEdgeCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RemoveFeedbackEdgeCommand.prototype.execute = function (context) {
        removeFeedbackEdge(context.root);
        return context.root;
    };
    RemoveFeedbackEdgeCommand.KIND = 'removeFeedbackEdgeCommand';
    RemoveFeedbackEdgeCommand = __decorate([
        inversify_1.injectable()
    ], RemoveFeedbackEdgeCommand);
    return RemoveFeedbackEdgeCommand;
}(model_1.FeedbackCommand));
exports.RemoveFeedbackEdgeCommand = RemoveFeedbackEdgeCommand;
var FeedbackEdgeEnd = /** @class */ (function (_super) {
    __extends(FeedbackEdgeEnd, _super);
    function FeedbackEdgeEnd(sourceId, elementTypeId, feedbackEdge) {
        if (feedbackEdge === void 0) { feedbackEdge = undefined; }
        var _this = _super.call(this) || this;
        _this.sourceId = sourceId;
        _this.elementTypeId = elementTypeId;
        _this.feedbackEdge = feedbackEdge;
        _this.type = FeedbackEdgeEnd.TYPE;
        return _this;
    }
    FeedbackEdgeEnd.TYPE = 'feedback-edge-end';
    return FeedbackEdgeEnd;
}(lib_1.SDanglingAnchor));
exports.FeedbackEdgeEnd = FeedbackEdgeEnd;
var FeedbackEdgeEndMovingMouseListener = /** @class */ (function (_super) {
    __extends(FeedbackEdgeEndMovingMouseListener, _super);
    function FeedbackEdgeEndMovingMouseListener(anchorRegistry) {
        var _this = _super.call(this) || this;
        _this.anchorRegistry = anchorRegistry;
        return _this;
    }
    FeedbackEdgeEndMovingMouseListener.prototype.mouseMove = function (target, event) {
        var root = target.root;
        var edgeEnd = root.index.getById(feedbackEdgeEndId(root));
        if (!(edgeEnd instanceof FeedbackEdgeEnd) || !edgeEnd.feedbackEdge) {
            return [];
        }
        var edge = edgeEnd.feedbackEdge;
        var position = viewpoint_util_1.getAbsolutePosition(edgeEnd, event);
        var endAtMousePosition = lib_1.findChildrenAtPosition(target.root, position)
            .find(function (e) { return lib_1.isConnectable(e) && e.canConnect(edge, 'target'); });
        if (endAtMousePosition instanceof lib_1.SConnectableElement && edge.source && lib_1.isBoundsAware(edge.source)) {
            var anchorComputer = this.anchorRegistry.get(lib_1.PolylineEdgeRouter.KIND, endAtMousePosition.anchorKind);
            var anchor = anchorComputer.getAnchor(endAtMousePosition, lib_1.center(edge.source.bounds));
            if (lib_1.euclideanDistance(anchor, edgeEnd.position) > 1) {
                return [new lib_1.MoveAction([{ elementId: edgeEnd.id, toPosition: anchor }], false)];
            }
        }
        else {
            return [new lib_1.MoveAction([{ elementId: edgeEnd.id, toPosition: position }], false)];
        }
        return [];
    };
    return FeedbackEdgeEndMovingMouseListener;
}(lib_1.MouseListener));
exports.FeedbackEdgeEndMovingMouseListener = FeedbackEdgeEndMovingMouseListener;
function feedbackEdgeId(root) {
    return root.id + '_feedback_edge';
}
exports.feedbackEdgeId = feedbackEdgeId;
function feedbackEdgeEndId(root) {
    return root.id + '_feedback_anchor';
}
exports.feedbackEdgeEndId = feedbackEdgeEndId;
function drawFeedbackEdge(context, sourceId, elementTypeId, routerKind) {
    var root = context.root;
    var sourceChild = root.index.getById(sourceId);
    if (!sourceChild) {
        return;
    }
    var source = lib_1.findParentByFeature(sourceChild, lib_1.isConnectable);
    if (!source || !lib_1.isBoundsAware(source)) {
        return;
    }
    var edgeEnd = new FeedbackEdgeEnd(source.id, elementTypeId);
    edgeEnd.id = feedbackEdgeEndId(root);
    edgeEnd.position = viewpoint_util_1.toAbsolutePosition(source);
    var feedbackEdgeSchema = {
        type: 'edge',
        id: feedbackEdgeId(root),
        sourceId: source.id,
        targetId: edgeEnd.id,
        cssClasses: ["feedback-edge"],
        routerKind: routerKind,
        opacity: 0.3
    };
    var feedbackEdge = context.modelFactory.createElement(feedbackEdgeSchema);
    if (smodel_util_1.isRoutable(feedbackEdge)) {
        edgeEnd.feedbackEdge = feedbackEdge;
        root.add(edgeEnd);
        root.add(feedbackEdge);
    }
}
function removeFeedbackEdge(root) {
    var feedbackEdge = root.index.getById(feedbackEdgeId(root));
    var feedbackEdgeEnd = root.index.getById(feedbackEdgeEndId(root));
    if (feedbackEdge instanceof lib_1.SChildElement)
        root.remove(feedbackEdge);
    if (feedbackEdgeEnd instanceof lib_1.SChildElement)
        root.remove(feedbackEdgeEnd);
}
//# sourceMappingURL=creation-tool-feedback.js.map