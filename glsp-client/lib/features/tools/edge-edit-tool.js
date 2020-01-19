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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
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
var types_1 = require("../../types");
var smodel_util_1 = require("../../utils/smodel-util");
var operation_actions_1 = require("../operation/operation-actions");
var model_1 = require("../reconnect/model");
var selection_service_1 = require("../select/selection-service");
var creation_tool_feedback_1 = require("../tool-feedback/creation-tool-feedback");
var cursor_feedback_1 = require("../tool-feedback/cursor-feedback");
var edge_edit_tool_feedback_1 = require("../tool-feedback/edge-edit-tool-feedback");
var EdgeEditTool = /** @class */ (function () {
    function EdgeEditTool(selectionService, mouseTool, feedbackDispatcher, anchorRegistry, edgeRouterRegistry) {
        this.selectionService = selectionService;
        this.mouseTool = mouseTool;
        this.feedbackDispatcher = feedbackDispatcher;
        this.anchorRegistry = anchorRegistry;
        this.edgeRouterRegistry = edgeRouterRegistry;
        this.id = EdgeEditTool_1.ID;
    }
    EdgeEditTool_1 = EdgeEditTool;
    EdgeEditTool.prototype.enable = function () {
        this.reconnectEdgeListener = new ReconnectEdgeListener(this);
        this.mouseTool.register(this.reconnectEdgeListener);
        this.selectionService.register(this.reconnectEdgeListener);
        // install feedback move mouse listener for client-side move updates
        this.feedbackEdgeSourceMovingListener = new edge_edit_tool_feedback_1.FeedbackEdgeSourceMovingMouseListener(this.anchorRegistry);
        this.feedbackEdgeTargetMovingListener = new edge_edit_tool_feedback_1.FeedbackEdgeTargetMovingMouseListener(this.anchorRegistry);
        this.feedbackMovingListener = new edge_edit_tool_feedback_1.FeedbackEdgeRouteMovingMouseListener(this.edgeRouterRegistry);
        this.mouseTool.register(this.feedbackEdgeSourceMovingListener);
        this.mouseTool.register(this.feedbackEdgeTargetMovingListener);
        this.mouseTool.register(this.feedbackMovingListener);
    };
    EdgeEditTool.prototype.disable = function () {
        this.reconnectEdgeListener.reset();
        this.selectionService.deregister(this.reconnectEdgeListener);
        this.mouseTool.deregister(this.feedbackEdgeSourceMovingListener);
        this.mouseTool.deregister(this.feedbackEdgeTargetMovingListener);
        this.mouseTool.deregister(this.feedbackMovingListener);
        this.mouseTool.deregister(this.reconnectEdgeListener);
    };
    EdgeEditTool.prototype.dispatchFeedback = function (actions) {
        this.feedbackDispatcher.registerFeedback(this, actions);
    };
    var EdgeEditTool_1;
    EdgeEditTool.ID = "glsp.edge-edit-tool";
    EdgeEditTool = EdgeEditTool_1 = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(types_1.GLSP_TYPES.SelectionService)),
        __param(1, inversify_1.inject(types_1.GLSP_TYPES.MouseTool)),
        __param(2, inversify_1.inject(types_1.GLSP_TYPES.IFeedbackActionDispatcher)),
        __param(3, inversify_1.inject(lib_1.AnchorComputerRegistry)),
        __param(4, inversify_1.inject(lib_1.EdgeRouterRegistry)), __param(4, inversify_1.optional()),
        __metadata("design:paramtypes", [selection_service_1.SelectionService, Object, Object, lib_1.AnchorComputerRegistry,
            lib_1.EdgeRouterRegistry])
    ], EdgeEditTool);
    return EdgeEditTool;
}());
exports.EdgeEditTool = EdgeEditTool;
var ReconnectEdgeListener = /** @class */ (function (_super) {
    __extends(ReconnectEdgeListener, _super);
    function ReconnectEdgeListener(tool) {
        var _this = _super.call(this) || this;
        _this.tool = tool;
        return _this;
    }
    ReconnectEdgeListener.prototype.isValidEdge = function (edge) {
        return edge !== undefined && edge.id !== creation_tool_feedback_1.feedbackEdgeId(edge.root) && lib_1.isSelected(edge);
    };
    ReconnectEdgeListener.prototype.setEdgeSelected = function (edge) {
        if (this.edge && this.edge.id !== edge.id) {
            // reset from a previously selected edge
            this.reset();
        }
        this.edge = edge;
        // note: order is important here as we want the reconnect handles to cover the routing handles
        var feedbackActions = [];
        if (lib_1.canEditRouting(edge)) {
            feedbackActions.push(new edge_edit_tool_feedback_1.SwitchRoutingModeAction([this.edge.id], []));
        }
        if (model_1.isReconnectable(edge)) {
            feedbackActions.push(new edge_edit_tool_feedback_1.ShowEdgeReconnectHandlesFeedbackAction(this.edge.id));
        }
        this.tool.dispatchFeedback(feedbackActions);
    };
    ReconnectEdgeListener.prototype.isEdgeSelected = function () {
        return this.edge !== undefined && lib_1.isSelected(this.edge);
    };
    ReconnectEdgeListener.prototype.setReconnectHandleSelected = function (edge, reconnectHandle) {
        if (this.edge && this.edge.target && this.edge.source) {
            if (model_1.isSourceRoutingHandle(edge, reconnectHandle)) {
                this.tool.dispatchFeedback([new edge_edit_tool_feedback_1.HideEdgeReconnectHandlesFeedbackAction(),
                    new cursor_feedback_1.ApplyCursorCSSFeedbackAction(cursor_feedback_1.CursorCSS.EDGE_RECONNECT),
                    new edge_edit_tool_feedback_1.DrawFeedbackEdgeSourceAction(this.edge.type, this.edge.targetId)]);
                this.reconnectMode = "NEW_SOURCE";
            }
            else if (model_1.isTargetRoutingHandle(edge, reconnectHandle)) {
                this.tool.dispatchFeedback([new edge_edit_tool_feedback_1.HideEdgeReconnectHandlesFeedbackAction(),
                    new cursor_feedback_1.ApplyCursorCSSFeedbackAction(cursor_feedback_1.CursorCSS.EDGE_CREATION_TARGET),
                    new creation_tool_feedback_1.DrawFeedbackEdgeAction(this.edge.type, this.edge.sourceId)]);
                this.reconnectMode = "NEW_TARGET";
            }
        }
    };
    ReconnectEdgeListener.prototype.isReconnecting = function () {
        return this.reconnectMode !== undefined;
    };
    ReconnectEdgeListener.prototype.isReconnectingNewSource = function () {
        return this.reconnectMode === "NEW_SOURCE";
    };
    ReconnectEdgeListener.prototype.setRoutingHandleSelected = function (edge, routingHandle) {
        if (this.edge && this.edge.target && this.edge.source) {
            this.routingHandle = routingHandle;
        }
    };
    ReconnectEdgeListener.prototype.requiresReconnect = function (sourceId, targetId) {
        return this.edge !== undefined && (this.edge.sourceId !== sourceId || this.edge.targetId !== targetId);
    };
    ReconnectEdgeListener.prototype.setNewConnectable = function (connectable) {
        this.newConnectable = connectable;
    };
    ReconnectEdgeListener.prototype.isReadyToReconnect = function () {
        return this.edge && this.isReconnecting() && this.newConnectable !== undefined;
    };
    ReconnectEdgeListener.prototype.isReadyToReroute = function () {
        return this.routingHandle !== undefined;
    };
    ReconnectEdgeListener.prototype.mouseDown = function (target, event) {
        var result = [];
        this.isMouseDown = true;
        if (event.button === 0) {
            var reconnectHandle = lib_1.findParentByFeature(target, model_1.isReconnectHandle);
            var routingHandle = !reconnectHandle ? lib_1.findParentByFeature(target, smodel_util_1.isRoutingHandle) : undefined;
            var edge = lib_1.findParentByFeature(target, smodel_util_1.isRoutable);
            if (this.isEdgeSelected() && edge && reconnectHandle) {
                // PHASE 2 Reconnect: Select reconnect handle on selected edge
                this.setReconnectHandleSelected(edge, reconnectHandle);
            }
            else if (this.isEdgeSelected() && edge && routingHandle) {
                // PHASE 2 Reroute: Select routing handle on selected edge
                this.setRoutingHandleSelected(edge, routingHandle);
            }
            else if (this.isValidEdge(edge)) {
                // PHASE 1: Select edge
                this.setEdgeSelected(edge);
            }
        }
        else if (event.button === 2) {
            this.reset();
        }
        return result;
    };
    ReconnectEdgeListener.prototype.mouseMove = function (target, event) {
        if (this.isMouseDown) {
            // reset any selected connectables when we are dragging, maybe the user is just panning
            this.setNewConnectable(undefined);
        }
        return [];
    };
    ReconnectEdgeListener.prototype.mouseUp = function (target, event) {
        this.isMouseDown = false;
        if (!this.isReadyToReconnect() && !this.isReadyToReroute()) {
            return [];
        }
        var result = [];
        if (this.edge && this.newConnectable) {
            var sourceId = this.isReconnectingNewSource() ? this.newConnectable.id : this.edge.sourceId;
            var targetId = this.isReconnectingNewSource() ? this.edge.targetId : this.newConnectable.id;
            if (this.requiresReconnect(sourceId, targetId)) {
                result.push(new operation_actions_1.ReconnectConnectionOperationAction(this.edge.id, sourceId, targetId));
            }
            this.reset();
        }
        else if (this.edge && this.routingHandle) {
            // we need to re-retrieve the edge as it might have changed due to a server udpate since we do not reset the state between reroute actions
            var latestEdge = target.index.getById(this.edge.id);
            if (latestEdge && smodel_util_1.isRoutable(latestEdge)) {
                result.push(new operation_actions_1.ChangeRoutingPointsOperation([{ elementId: latestEdge.id, newRoutingPoints: latestEdge.routingPoints }]));
                this.routingHandle = undefined;
            }
        }
        return result;
    };
    ReconnectEdgeListener.prototype.mouseOver = function (target, event) {
        if (this.edge && this.isReconnecting()) {
            var currentTarget = lib_1.findParentByFeature(target, lib_1.isConnectable);
            if (!this.newConnectable || currentTarget !== this.newConnectable) {
                this.setNewConnectable(currentTarget);
                if (currentTarget) {
                    if ((this.reconnectMode === 'NEW_SOURCE' && currentTarget.canConnect(this.edge, "source")) ||
                        (this.reconnectMode === 'NEW_TARGET' && currentTarget.canConnect(this.edge, "target"))) {
                        this.tool.dispatchFeedback([new cursor_feedback_1.ApplyCursorCSSFeedbackAction(cursor_feedback_1.CursorCSS.EDGE_RECONNECT)]);
                        return [];
                    }
                }
                this.tool.dispatchFeedback([new cursor_feedback_1.ApplyCursorCSSFeedbackAction(cursor_feedback_1.CursorCSS.OPERATION_NOT_ALLOWED)]);
            }
        }
        return [];
    };
    ReconnectEdgeListener.prototype.selectionChanged = function (root, selectedElements) {
        var e_1, _a;
        if (this.edge) {
            if (selectedElements.indexOf(this.edge.id) > -1) {
                // our active edge is still selected, nothing to do
                return;
            }
            if (this.isReconnecting()) {
                // we are reconnecting, so we may have clicked on a potential target
                return;
            }
            try {
                // try to find some other selected element and mark that active
                for (var _b = __values(selectedElements.reverse()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var elementId = _c.value;
                    var element = root.index.getById(elementId);
                    if (element) {
                        var edge = lib_1.findParentByFeature(element, smodel_util_1.isRoutable);
                        if (this.isValidEdge(edge)) {
                            // PHASE 1: Select edge
                            this.setEdgeSelected(edge);
                            return;
                        }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this.reset();
        }
    };
    ReconnectEdgeListener.prototype.reset = function () {
        this.resetFeedback();
        this.resetData();
    };
    ReconnectEdgeListener.prototype.resetData = function () {
        this.isMouseDown = false;
        this.edge = undefined;
        this.reconnectMode = undefined;
        this.newConnectable = undefined;
        this.routingHandle = undefined;
    };
    ReconnectEdgeListener.prototype.resetFeedback = function () {
        var result = [];
        if (this.edge) {
            result.push(new edge_edit_tool_feedback_1.SwitchRoutingModeAction([], [this.edge.id]));
        }
        result.push.apply(result, __spread([new edge_edit_tool_feedback_1.HideEdgeReconnectHandlesFeedbackAction(),
            new cursor_feedback_1.ApplyCursorCSSFeedbackAction(), new creation_tool_feedback_1.RemoveFeedbackEdgeAction()]));
        this.tool.dispatchFeedback(result);
    };
    return ReconnectEdgeListener;
}(lib_1.MouseListener));
//# sourceMappingURL=edge-edit-tool.js.map