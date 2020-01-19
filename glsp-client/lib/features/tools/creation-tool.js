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
var types_1 = require("../../types");
var viewpoint_util_1 = require("../../utils/viewpoint-util");
var model_1 = require("../hints/model");
var operation_actions_1 = require("../operation/operation-actions");
var set_operations_1 = require("../operation/set-operations");
var creation_tool_feedback_1 = require("../tool-feedback/creation-tool-feedback");
var cursor_feedback_1 = require("../tool-feedback/cursor-feedback");
var drag_aware_mouse_listener_1 = require("./drag-aware-mouse-listener");
exports.TOOL_ID_PREFIX = "tool";
function deriveToolId(operationKind, elementTypeId) {
    return exports.TOOL_ID_PREFIX + "_" + set_operations_1.deriveOperationId(operationKind, elementTypeId);
}
exports.deriveToolId = deriveToolId;
var NodeCreationTool = /** @class */ (function () {
    function NodeCreationTool(mouseTool, feedbackDispatcher) {
        this.mouseTool = mouseTool;
        this.feedbackDispatcher = feedbackDispatcher;
        this.elementTypeId = "unknown";
    }
    Object.defineProperty(NodeCreationTool.prototype, "id", {
        get: function () {
            return deriveToolId(set_operations_1.OperationKind.CREATE_NODE, this.elementTypeId);
        },
        enumerable: true,
        configurable: true
    });
    NodeCreationTool.prototype.enable = function () {
        this.creationToolMouseListener = new NodeCreationToolMouseListener(this.elementTypeId, this);
        this.mouseTool.register(this.creationToolMouseListener);
        this.feedbackDispatcher.registerFeedback(this, [new cursor_feedback_1.ApplyCursorCSSFeedbackAction(cursor_feedback_1.CursorCSS.NODE_CREATION)]);
    };
    NodeCreationTool.prototype.disable = function () {
        this.mouseTool.deregister(this.creationToolMouseListener);
        this.feedbackDispatcher.deregisterFeedback(this, [new cursor_feedback_1.ApplyCursorCSSFeedbackAction()]);
    };
    NodeCreationTool.prototype.dispatchFeedback = function (actions) {
        this.feedbackDispatcher.registerFeedback(this, actions);
    };
    NodeCreationTool = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(types_1.GLSP_TYPES.MouseTool)),
        __param(1, inversify_1.inject(types_1.GLSP_TYPES.IFeedbackActionDispatcher)),
        __metadata("design:paramtypes", [Object, Object])
    ], NodeCreationTool);
    return NodeCreationTool;
}());
exports.NodeCreationTool = NodeCreationTool;
var NodeCreationToolMouseListener = /** @class */ (function (_super) {
    __extends(NodeCreationToolMouseListener, _super);
    function NodeCreationToolMouseListener(elementTypeId, tool) {
        var _this = _super.call(this) || this;
        _this.elementTypeId = elementTypeId;
        _this.tool = tool;
        return _this;
    }
    NodeCreationToolMouseListener.prototype.creationAllowed = function (elementTypeId) {
        return this.container && this.container.isContainableElement(elementTypeId);
    };
    NodeCreationToolMouseListener.prototype.nonDraggingMouseUp = function (target, event) {
        var result = [];
        if (this.creationAllowed(this.elementTypeId)) {
            var containerId = this.container ? this.container.id : undefined;
            var location_1 = viewpoint_util_1.getAbsolutePosition(target, event);
            result.push(new operation_actions_1.CreateNodeOperationAction(this.elementTypeId, location_1, containerId));
            if (!lib_1.isCtrlOrCmd(event)) {
                result.push(new lib_1.EnableDefaultToolsAction());
            }
        }
        return result;
    };
    NodeCreationToolMouseListener.prototype.mouseOver = function (target, event) {
        var currentContainer = lib_1.findParentByFeature(target, model_1.isContainable);
        if (!this.container || currentContainer !== this.container) {
            this.container = currentContainer;
            var feedback = this.creationAllowed(this.elementTypeId)
                ? new cursor_feedback_1.ApplyCursorCSSFeedbackAction(cursor_feedback_1.CursorCSS.NODE_CREATION) :
                new cursor_feedback_1.ApplyCursorCSSFeedbackAction(cursor_feedback_1.CursorCSS.OPERATION_NOT_ALLOWED);
            this.tool.dispatchFeedback([feedback]);
        }
        return [];
    };
    NodeCreationToolMouseListener = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [String, NodeCreationTool])
    ], NodeCreationToolMouseListener);
    return NodeCreationToolMouseListener;
}(drag_aware_mouse_listener_1.DragAwareMouseListener));
exports.NodeCreationToolMouseListener = NodeCreationToolMouseListener;
/**
 * Tool to create connections in a Diagram, by selecting a source and target node.
 */
var EdgeCreationTool = /** @class */ (function () {
    function EdgeCreationTool(mouseTool, feedbackDispatcher, anchorRegistry, typeHintProvider) {
        this.mouseTool = mouseTool;
        this.feedbackDispatcher = feedbackDispatcher;
        this.anchorRegistry = anchorRegistry;
        this.typeHintProvider = typeHintProvider;
        this.elementTypeId = "unknown";
    }
    Object.defineProperty(EdgeCreationTool.prototype, "id", {
        get: function () {
            return deriveToolId(set_operations_1.OperationKind.CREATE_CONNECTION, this.elementTypeId);
        },
        enumerable: true,
        configurable: true
    });
    EdgeCreationTool.prototype.enable = function () {
        this.creationToolMouseListener = new EdgeCreationToolMouseListener(this.elementTypeId, this);
        this.mouseTool.register(this.creationToolMouseListener);
        this.feedbackEndMovingMouseListener = new creation_tool_feedback_1.FeedbackEdgeEndMovingMouseListener(this.anchorRegistry);
        this.mouseTool.register(this.feedbackEndMovingMouseListener);
        this.dispatchFeedback([new cursor_feedback_1.ApplyCursorCSSFeedbackAction(cursor_feedback_1.CursorCSS.OPERATION_NOT_ALLOWED)]);
    };
    EdgeCreationTool.prototype.disable = function () {
        this.mouseTool.deregister(this.creationToolMouseListener);
        this.mouseTool.deregister(this.feedbackEndMovingMouseListener);
        this.feedbackDispatcher.deregisterFeedback(this, [new creation_tool_feedback_1.RemoveFeedbackEdgeAction(), new cursor_feedback_1.ApplyCursorCSSFeedbackAction()]);
    };
    EdgeCreationTool.prototype.dispatchFeedback = function (actions) {
        this.feedbackDispatcher.registerFeedback(this, actions);
    };
    EdgeCreationTool = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(types_1.GLSP_TYPES.MouseTool)),
        __param(1, inversify_1.inject(types_1.GLSP_TYPES.IFeedbackActionDispatcher)),
        __param(2, inversify_1.inject(lib_1.AnchorComputerRegistry)),
        __param(3, inversify_1.inject(types_1.GLSP_TYPES.ITypeHintProvider)),
        __metadata("design:paramtypes", [Object, Object, lib_1.AnchorComputerRegistry, Object])
    ], EdgeCreationTool);
    return EdgeCreationTool;
}());
exports.EdgeCreationTool = EdgeCreationTool;
var EdgeCreationToolMouseListener = /** @class */ (function (_super) {
    __extends(EdgeCreationToolMouseListener, _super);
    function EdgeCreationToolMouseListener(elementTypeId, tool) {
        var _this = _super.call(this) || this;
        _this.elementTypeId = elementTypeId;
        _this.tool = tool;
        _this.allowedTarget = false;
        _this.proxyEdge = new lib_1.SEdge();
        _this.proxyEdge.type = elementTypeId;
        return _this;
    }
    EdgeCreationToolMouseListener.prototype.reinitialize = function () {
        this.source = undefined;
        this.target = undefined;
        this.currentTarget = undefined;
        this.allowedTarget = false;
        this.tool.dispatchFeedback([new creation_tool_feedback_1.RemoveFeedbackEdgeAction()]);
    };
    EdgeCreationToolMouseListener.prototype.nonDraggingMouseUp = function (element, event) {
        var result = [];
        if (event.button === 0) {
            if (!this.isSourceSelected()) {
                if (this.currentTarget && this.allowedTarget) {
                    this.source = this.currentTarget.id;
                    this.tool.dispatchFeedback([new creation_tool_feedback_1.DrawFeedbackEdgeAction(this.elementTypeId, this.source)]);
                }
            }
            else {
                if (this.currentTarget && this.allowedTarget) {
                    this.target = this.currentTarget.id;
                }
            }
            if (this.isSourceSelected() && this.isTargetSelected()) {
                result.push(new operation_actions_1.CreateConnectionOperationAction(this.elementTypeId, this.source, this.target));
                if (!lib_1.isCtrlOrCmd(event)) {
                    result.push(new lib_1.EnableDefaultToolsAction());
                }
                else {
                    this.reinitialize();
                }
            }
        }
        else if (event.button === 2) {
            result.push(new lib_1.EnableDefaultToolsAction());
        }
        return result;
    };
    EdgeCreationToolMouseListener.prototype.isSourceSelected = function () {
        return this.source !== undefined;
    };
    EdgeCreationToolMouseListener.prototype.isTargetSelected = function () {
        return this.target !== undefined;
    };
    EdgeCreationToolMouseListener.prototype.mouseOver = function (target, event) {
        var newCurrentTarget = lib_1.findParentByFeature(target, lib_1.isConnectable);
        if (newCurrentTarget !== this.currentTarget) {
            this.currentTarget = newCurrentTarget;
            if (this.currentTarget) {
                if (!this.isSourceSelected()) {
                    this.allowedTarget = this.isAllowedSource(newCurrentTarget);
                }
                else if (!this.isTargetSelected()) {
                    this.allowedTarget = this.isAllowedTarget(newCurrentTarget);
                }
                if (this.allowedTarget) {
                    var action = !this.isSourceSelected() ? new cursor_feedback_1.ApplyCursorCSSFeedbackAction(cursor_feedback_1.CursorCSS.EDGE_CREATION_SOURCE) :
                        new cursor_feedback_1.ApplyCursorCSSFeedbackAction(cursor_feedback_1.CursorCSS.EDGE_CREATION_TARGET);
                    return [action];
                }
            }
            return [new cursor_feedback_1.ApplyCursorCSSFeedbackAction(cursor_feedback_1.CursorCSS.OPERATION_NOT_ALLOWED)];
        }
        return [];
    };
    EdgeCreationToolMouseListener.prototype.isAllowedSource = function (element) {
        return element !== undefined && lib_1.isConnectable(element) && element.canConnect(this.proxyEdge, "source");
    };
    EdgeCreationToolMouseListener.prototype.isAllowedTarget = function (element) {
        return element !== undefined && lib_1.isConnectable(element) && element.canConnect(this.proxyEdge, "target");
    };
    EdgeCreationToolMouseListener = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [String, EdgeCreationTool])
    ], EdgeCreationToolMouseListener);
    return EdgeCreationToolMouseListener;
}(drag_aware_mouse_listener_1.DragAwareMouseListener));
exports.EdgeCreationToolMouseListener = EdgeCreationToolMouseListener;
//# sourceMappingURL=creation-tool.js.map