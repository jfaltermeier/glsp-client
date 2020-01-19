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
var model_1 = require("../reconnect/model");
var creation_tool_feedback_1 = require("./creation-tool-feedback");
var model_2 = require("./model");
/**
 * RECONNECT HANDLES FEEDBACK
 */
var ShowEdgeReconnectHandlesFeedbackAction = /** @class */ (function () {
    function ShowEdgeReconnectHandlesFeedbackAction(elementId) {
        this.elementId = elementId;
        this.kind = ShowEdgeReconnectHandlesFeedbackCommand.KIND;
    }
    return ShowEdgeReconnectHandlesFeedbackAction;
}());
exports.ShowEdgeReconnectHandlesFeedbackAction = ShowEdgeReconnectHandlesFeedbackAction;
var HideEdgeReconnectHandlesFeedbackAction = /** @class */ (function () {
    function HideEdgeReconnectHandlesFeedbackAction() {
        this.kind = HideEdgeReconnectHandlesFeedbackCommand.KIND;
    }
    return HideEdgeReconnectHandlesFeedbackAction;
}());
exports.HideEdgeReconnectHandlesFeedbackAction = HideEdgeReconnectHandlesFeedbackAction;
var ShowEdgeReconnectHandlesFeedbackCommand = /** @class */ (function (_super) {
    __extends(ShowEdgeReconnectHandlesFeedbackCommand, _super);
    function ShowEdgeReconnectHandlesFeedbackCommand(action) {
        var _this = _super.call(this) || this;
        _this.action = action;
        return _this;
    }
    ShowEdgeReconnectHandlesFeedbackCommand.prototype.execute = function (context) {
        var index = context.root.index;
        index.all().filter(smodel_util_1.isRoutable).forEach(model_1.removeReconnectHandles);
        if (smodel_util_1.isNotUndefined(this.action.elementId)) {
            var routableElement = index.getById(this.action.elementId);
            if (smodel_util_1.isNotUndefined(routableElement) && smodel_util_1.isRoutable(routableElement)) {
                model_1.addReconnectHandles(routableElement);
            }
        }
        return context.root;
    };
    ShowEdgeReconnectHandlesFeedbackCommand.KIND = 'showReconnectHandlesFeedback';
    ShowEdgeReconnectHandlesFeedbackCommand = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(lib_1.TYPES.Action)),
        __metadata("design:paramtypes", [ShowEdgeReconnectHandlesFeedbackAction])
    ], ShowEdgeReconnectHandlesFeedbackCommand);
    return ShowEdgeReconnectHandlesFeedbackCommand;
}(model_2.FeedbackCommand));
exports.ShowEdgeReconnectHandlesFeedbackCommand = ShowEdgeReconnectHandlesFeedbackCommand;
var HideEdgeReconnectHandlesFeedbackCommand = /** @class */ (function (_super) {
    __extends(HideEdgeReconnectHandlesFeedbackCommand, _super);
    function HideEdgeReconnectHandlesFeedbackCommand(action) {
        var _this = _super.call(this) || this;
        _this.action = action;
        return _this;
    }
    HideEdgeReconnectHandlesFeedbackCommand.prototype.execute = function (context) {
        var index = context.root.index;
        index.all().filter(smodel_util_1.isRoutable).forEach(model_1.removeReconnectHandles);
        return context.root;
    };
    HideEdgeReconnectHandlesFeedbackCommand.KIND = 'hideReconnectHandlesFeedback';
    HideEdgeReconnectHandlesFeedbackCommand = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(lib_1.TYPES.Action)),
        __metadata("design:paramtypes", [HideEdgeReconnectHandlesFeedbackAction])
    ], HideEdgeReconnectHandlesFeedbackCommand);
    return HideEdgeReconnectHandlesFeedbackCommand;
}(model_2.FeedbackCommand));
exports.HideEdgeReconnectHandlesFeedbackCommand = HideEdgeReconnectHandlesFeedbackCommand;
/**
 * ROUTING FEEDBACK
 */
var SwitchRoutingModeAction = /** @class */ (function (_super) {
    __extends(SwitchRoutingModeAction, _super);
    function SwitchRoutingModeAction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.kind = SwitchRoutingModeCommand.KIND;
        return _this;
    }
    return SwitchRoutingModeAction;
}(lib_1.SwitchEditModeAction));
exports.SwitchRoutingModeAction = SwitchRoutingModeAction;
var SwitchRoutingModeCommand = /** @class */ (function (_super) {
    __extends(SwitchRoutingModeCommand, _super);
    function SwitchRoutingModeCommand(action) {
        return _super.call(this, action) || this;
    }
    SwitchRoutingModeCommand.KIND = "switchRoutingMode";
    SwitchRoutingModeCommand = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(lib_1.TYPES.Action)),
        __metadata("design:paramtypes", [SwitchRoutingModeAction])
    ], SwitchRoutingModeCommand);
    return SwitchRoutingModeCommand;
}(lib_1.SwitchEditModeCommand));
exports.SwitchRoutingModeCommand = SwitchRoutingModeCommand;
/**
 * SOURCE AND TARGET EDGE FEEDBACK
 */
var DrawFeedbackEdgeSourceAction = /** @class */ (function () {
    function DrawFeedbackEdgeSourceAction(elementTypeId, targetId) {
        this.elementTypeId = elementTypeId;
        this.targetId = targetId;
        this.kind = DrawFeedbackEdgeSourceCommand.KIND;
    }
    return DrawFeedbackEdgeSourceAction;
}());
exports.DrawFeedbackEdgeSourceAction = DrawFeedbackEdgeSourceAction;
var DrawFeedbackEdgeSourceCommand = /** @class */ (function (_super) {
    __extends(DrawFeedbackEdgeSourceCommand, _super);
    function DrawFeedbackEdgeSourceCommand(action) {
        var _this = _super.call(this) || this;
        _this.action = action;
        return _this;
    }
    DrawFeedbackEdgeSourceCommand.prototype.execute = function (context) {
        drawFeedbackEdgeSource(context, this.action.targetId, this.action.elementTypeId);
        return context.root;
    };
    DrawFeedbackEdgeSourceCommand.KIND = 'drawFeedbackEdgeSource';
    DrawFeedbackEdgeSourceCommand = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(lib_1.TYPES.Action)),
        __metadata("design:paramtypes", [DrawFeedbackEdgeSourceAction])
    ], DrawFeedbackEdgeSourceCommand);
    return DrawFeedbackEdgeSourceCommand;
}(model_2.FeedbackCommand));
exports.DrawFeedbackEdgeSourceCommand = DrawFeedbackEdgeSourceCommand;
/**
 * SOURCE AND TARGET MOUSE MOVE LISTENER
 */
var FeedbackEdgeTargetMovingMouseListener = /** @class */ (function (_super) {
    __extends(FeedbackEdgeTargetMovingMouseListener, _super);
    function FeedbackEdgeTargetMovingMouseListener(anchorRegistry) {
        var _this = _super.call(this, anchorRegistry) || this;
        _this.anchorRegistry = anchorRegistry;
        return _this;
    }
    return FeedbackEdgeTargetMovingMouseListener;
}(creation_tool_feedback_1.FeedbackEdgeEndMovingMouseListener));
exports.FeedbackEdgeTargetMovingMouseListener = FeedbackEdgeTargetMovingMouseListener;
var FeedbackEdgeSourceMovingMouseListener = /** @class */ (function (_super) {
    __extends(FeedbackEdgeSourceMovingMouseListener, _super);
    function FeedbackEdgeSourceMovingMouseListener(anchorRegistry) {
        var _this = _super.call(this) || this;
        _this.anchorRegistry = anchorRegistry;
        return _this;
    }
    FeedbackEdgeSourceMovingMouseListener.prototype.mouseMove = function (target, event) {
        var root = target.root;
        var edgeEnd = root.index.getById(creation_tool_feedback_1.feedbackEdgeEndId(root));
        if (!(edgeEnd instanceof creation_tool_feedback_1.FeedbackEdgeEnd) || !edgeEnd.feedbackEdge) {
            return [];
        }
        var edge = edgeEnd.feedbackEdge;
        var position = viewpoint_util_1.getAbsolutePosition(edgeEnd, event);
        var endAtMousePosition = lib_1.findChildrenAtPosition(target.root, position)
            .find(function (e) { return lib_1.isConnectable(e) && e.canConnect(edge, 'source'); });
        if (endAtMousePosition instanceof lib_1.SConnectableElement && edge.target && lib_1.isBoundsAware(edge.target)) {
            var anchorComputer = this.anchorRegistry.get(lib_1.PolylineEdgeRouter.KIND, endAtMousePosition.anchorKind);
            var anchor = anchorComputer.getAnchor(endAtMousePosition, lib_1.center(edge.target.bounds));
            if (lib_1.euclideanDistance(anchor, edgeEnd.position) > 1) {
                return [new lib_1.MoveAction([{ elementId: edgeEnd.id, toPosition: anchor }], false)];
            }
        }
        else {
            return [new lib_1.MoveAction([{ elementId: edgeEnd.id, toPosition: position }], false)];
        }
        return [];
    };
    return FeedbackEdgeSourceMovingMouseListener;
}(lib_1.MouseListener));
exports.FeedbackEdgeSourceMovingMouseListener = FeedbackEdgeSourceMovingMouseListener;
var FeedbackEdgeRouteMovingMouseListener = /** @class */ (function (_super) {
    __extends(FeedbackEdgeRouteMovingMouseListener, _super);
    function FeedbackEdgeRouteMovingMouseListener(edgeRouterRegistry) {
        var _this = _super.call(this) || this;
        _this.edgeRouterRegistry = edgeRouterRegistry;
        _this.hasDragged = false;
        return _this;
    }
    FeedbackEdgeRouteMovingMouseListener.prototype.mouseDown = function (target, event) {
        var result = [];
        if (event.button === 0) {
            var routingHandle = lib_1.findParentByFeature(target, smodel_util_1.isRoutingHandle);
            if (routingHandle !== undefined) {
                result.push(new SwitchRoutingModeAction([target.id], []));
                this.lastDragPosition = { x: event.pageX, y: event.pageY };
            }
            else {
                this.lastDragPosition = undefined;
            }
            this.hasDragged = false;
        }
        return result;
    };
    FeedbackEdgeRouteMovingMouseListener.prototype.mouseMove = function (target, event) {
        var _this = this;
        var result = [];
        if (event.buttons === 0)
            this.mouseUp(target, event);
        else if (this.lastDragPosition) {
            var viewport = lib_1.findParentByFeature(target, lib_1.isViewport);
            this.hasDragged = true;
            var zoom = viewport ? viewport.zoom : 1;
            var dx_1 = (event.pageX - this.lastDragPosition.x) / zoom;
            var dy_1 = (event.pageY - this.lastDragPosition.y) / zoom;
            var handleMoves_1 = [];
            target.root.index.all()
                .filter(function (element) { return lib_1.isSelected(element); })
                .forEach(function (element) {
                if (smodel_util_1.isRoutingHandle(element)) {
                    var point = _this.getHandlePosition(element);
                    if (point !== undefined) {
                        handleMoves_1.push({
                            elementId: element.id,
                            fromPosition: point,
                            toPosition: {
                                x: point.x + dx_1,
                                y: point.y + dy_1
                            }
                        });
                    }
                }
            });
            this.lastDragPosition = { x: event.pageX, y: event.pageY };
            if (handleMoves_1.length > 0)
                result.push(new lib_1.MoveAction(handleMoves_1, false));
        }
        return result;
    };
    FeedbackEdgeRouteMovingMouseListener.prototype.getHandlePosition = function (handle) {
        if (this.edgeRouterRegistry) {
            var parent_1 = handle.parent;
            if (!smodel_util_1.isRoutable(parent_1))
                return undefined;
            var router = this.edgeRouterRegistry.get(parent_1.routerKind);
            var route = router.route(parent_1);
            return router.getHandlePosition(parent_1, route, handle);
        }
        return undefined;
    };
    FeedbackEdgeRouteMovingMouseListener.prototype.mouseEnter = function (target, event) {
        if (target instanceof lib_1.SModelRoot && event.buttons === 0)
            this.mouseUp(target, event);
        return [];
    };
    FeedbackEdgeRouteMovingMouseListener.prototype.mouseUp = function (target, event) {
        this.hasDragged = false;
        this.lastDragPosition = undefined;
        return [];
    };
    FeedbackEdgeRouteMovingMouseListener.prototype.decorate = function (vnode, element) {
        return vnode;
    };
    return FeedbackEdgeRouteMovingMouseListener;
}(lib_1.MouseListener));
exports.FeedbackEdgeRouteMovingMouseListener = FeedbackEdgeRouteMovingMouseListener;
/**
 * UTILITY FUNCTIONS
 */
function drawFeedbackEdgeSource(context, targetId, elementTypeId) {
    var root = context.root;
    var targetChild = root.index.getById(targetId);
    if (!targetChild) {
        return;
    }
    var target = lib_1.findParentByFeature(targetChild, lib_1.isConnectable);
    if (!target || !lib_1.isBoundsAware(target)) {
        return;
    }
    var edgeEnd = new creation_tool_feedback_1.FeedbackEdgeEnd(target.id, elementTypeId);
    edgeEnd.id = creation_tool_feedback_1.feedbackEdgeEndId(root);
    edgeEnd.position = { x: target.bounds.x, y: target.bounds.y };
    var feedbackEdgeSchema = {
        type: 'edge',
        id: creation_tool_feedback_1.feedbackEdgeId(root),
        sourceId: edgeEnd.id,
        targetId: target.id,
        opacity: 0.3
    };
    var feedbackEdge = context.modelFactory.createElement(feedbackEdgeSchema);
    if (smodel_util_1.isRoutable(feedbackEdge)) {
        edgeEnd.feedbackEdge = feedbackEdge;
        root.add(edgeEnd);
        root.add(feedbackEdge);
    }
}
//# sourceMappingURL=edge-edit-tool-feedback.js.map