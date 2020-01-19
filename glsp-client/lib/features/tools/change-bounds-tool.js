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
var model_1 = require("../change-bounds/model");
var operation_actions_1 = require("../operation/operation-actions");
var selection_service_1 = require("../select/selection-service");
var change_bounds_tool_feedback_1 = require("../tool-feedback/change-bounds-tool-feedback");
/**
 * The change bounds tool has the license to move multiple elements or resize a single element by implementing the ChangeBounds operation.
 * In contrast to Sprotty's implementation this tool only sends a `ChangeBoundsOperationAction` when an operation has finished and does not
 * provide client-side live updates to improve performance.
 *
 * | Operation | Client Update    | Server Update
 * +-----------+------------------+----------------------------
 * | Move      | MoveAction       | ChangeBoundsOperationAction
 * | Resize    | SetBoundsAction  | ChangeBoundsOperationAction
 *
 * To provide a visual client updates during move we install the `FeedbackMoveMouseListener` and to provide visual client updates during resize
 * and send the server updates we install the `ChangeBoundsListener`.
 */
var ChangeBoundsTool = /** @class */ (function () {
    function ChangeBoundsTool(selectionService, mouseTool, keyTool, feedbackDispatcher, edgeRouterRegistry, movementRestrictor) {
        this.selectionService = selectionService;
        this.mouseTool = mouseTool;
        this.keyTool = keyTool;
        this.feedbackDispatcher = feedbackDispatcher;
        this.edgeRouterRegistry = edgeRouterRegistry;
        this.movementRestrictor = movementRestrictor;
        this.id = ChangeBoundsTool_1.ID;
    }
    ChangeBoundsTool_1 = ChangeBoundsTool;
    ChangeBoundsTool.prototype.enable = function () {
        // install feedback move mouse listener for client-side move updates
        this.feedbackMoveMouseListener = this.createMoveMouseListener();
        this.mouseTool.register(this.feedbackMoveMouseListener);
        // install change bounds listener for client-side resize updates and server-side updates
        this.changeBoundsListener = this.createChangeBoundsListener();
        this.mouseTool.register(this.changeBoundsListener);
        this.selectionService.register(this.changeBoundsListener);
        // register feedback
        this.feedbackDispatcher.registerFeedback(this, [new change_bounds_tool_feedback_1.ShowChangeBoundsToolResizeFeedbackAction]);
    };
    ChangeBoundsTool.prototype.createMoveMouseListener = function () {
        return new change_bounds_tool_feedback_1.FeedbackMoveMouseListener(this.movementRestrictor);
    };
    ChangeBoundsTool.prototype.createChangeBoundsListener = function () {
        return new ChangeBoundsListener(this);
    };
    ChangeBoundsTool.prototype.disable = function () {
        this.mouseTool.deregister(this.changeBoundsListener);
        this.selectionService.deregister(this.changeBoundsListener);
        this.mouseTool.deregister(this.feedbackMoveMouseListener);
        this.feedbackDispatcher.deregisterFeedback(this, [new change_bounds_tool_feedback_1.HideChangeBoundsToolResizeFeedbackAction]);
    };
    ChangeBoundsTool.prototype.dispatchFeedback = function (actions) {
        this.feedbackDispatcher.registerFeedback(this, actions);
    };
    var ChangeBoundsTool_1;
    ChangeBoundsTool.ID = "glsp.change-bounds-tool";
    ChangeBoundsTool = ChangeBoundsTool_1 = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(types_1.GLSP_TYPES.SelectionService)),
        __param(1, inversify_1.inject(types_1.GLSP_TYPES.MouseTool)),
        __param(2, inversify_1.inject(lib_1.KeyTool)),
        __param(3, inversify_1.inject(types_1.GLSP_TYPES.IFeedbackActionDispatcher)),
        __param(4, inversify_1.inject(lib_1.EdgeRouterRegistry)), __param(4, inversify_1.optional()),
        __param(5, inversify_1.inject(types_1.GLSP_TYPES.IMovementRestrictor)), __param(5, inversify_1.optional()),
        __metadata("design:paramtypes", [selection_service_1.SelectionService, Object, lib_1.KeyTool, Object, lib_1.EdgeRouterRegistry, Object])
    ], ChangeBoundsTool);
    return ChangeBoundsTool;
}());
exports.ChangeBoundsTool = ChangeBoundsTool;
var ChangeBoundsListener = /** @class */ (function (_super) {
    __extends(ChangeBoundsListener, _super);
    function ChangeBoundsListener(tool) {
        var _this = _super.call(this) || this;
        _this.tool = tool;
        _this.positionDelta = { x: 0, y: 0 };
        return _this;
    }
    ChangeBoundsListener.prototype.mouseDown = function (target, event) {
        if (event.button !== 0) {
            return [];
        }
        // check if we have a resize handle (only single-selection)
        if (this.activeResizeElementId && target instanceof model_1.SResizeHandle) {
            this.activeResizeHandle = target;
        }
        else {
            this.setActiveResizeElement(target);
        }
        if (this.activeResizeElementId) {
            this.initPosition(event);
        }
        else {
            this.reset();
        }
        return [];
    };
    ChangeBoundsListener.prototype.mouseMove = function (target, event) {
        if (this.updatePosition(target, event)) {
            // rely on the FeedbackMoveMouseListener to update the element bounds of selected elements
            // consider resize handles ourselves
            return this.handleElementResize();
        }
        return [];
    };
    ChangeBoundsListener.prototype.mouseUp = function (target, event) {
        var _this = this;
        if (this.lastDragPosition === undefined) {
            this.resetPosition();
            return [];
        }
        var actions = [];
        if (this.activeResizeHandle) {
            // Resize, not move
            var resizeElement = lib_1.findParentByFeature(this.activeResizeHandle, model_1.isResizable);
            if (this.isActiveResizeElement(resizeElement)) {
                this.createChangeBoundsAction(resizeElement).forEach(function (action) { return actions.push(action); });
            }
        }
        else {
            // Move
            var newBounds_1 = [];
            var newRoutingPoints_1 = [];
            smodel_util_1.forEachElement(target, smodel_util_1.isNonRoutableSelectedMovableBoundsAware, function (element) {
                _this.createElementAndBounds(element).forEach(function (bounds) { return newBounds_1.push(bounds); });
                //  If client routing is enabled -> delegate routingpoints of connected edges to server
                if (_this.tool.edgeRouterRegistry && element instanceof lib_1.SConnectableElement) {
                    element.incomingEdges.map(smodel_util_1.toElementAndRoutingPoints).forEach(function (ear) { return newRoutingPoints_1.push(ear); });
                    element.outgoingEdges.map(smodel_util_1.toElementAndRoutingPoints).forEach(function (ear) { return newRoutingPoints_1.push(ear); });
                }
            });
            if (newBounds_1.length > 0) {
                actions.push(new operation_actions_1.ChangeBoundsOperationAction(newBounds_1));
            }
            if (newRoutingPoints_1.length > 0) {
                actions.push(new operation_actions_1.ChangeRoutingPointsOperation(newRoutingPoints_1));
            }
        }
        this.resetPosition();
        return actions;
    };
    ChangeBoundsListener.prototype.selectionChanged = function (root, selectedElements) {
        var e_1, _a;
        if (this.activeResizeElementId) {
            if (selectedElements.includes(this.activeResizeElementId)) {
                // our active element is still selected, nothing to do
                return;
            }
            try {
                // try to find some other selected element and mark that active
                for (var _b = __values(selectedElements.reverse()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var elementId = _c.value;
                    var element = root.index.getById(elementId);
                    if (element && this.setActiveResizeElement(element)) {
                        return;
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
    ChangeBoundsListener.prototype.setActiveResizeElement = function (target) {
        // check if we have a selected, moveable element (multi-selection allowed)
        var moveableElement = lib_1.findParentByFeature(target, model_1.isBoundsAwareMoveable);
        if (lib_1.isSelected(moveableElement)) {
            // only allow one element to have the element resize handles
            this.activeResizeElementId = moveableElement.id;
            this.tool.dispatchFeedback([new change_bounds_tool_feedback_1.ShowChangeBoundsToolResizeFeedbackAction(this.activeResizeElementId)]);
            return true;
        }
        return false;
    };
    ChangeBoundsListener.prototype.isActiveResizeElement = function (element) {
        return element !== undefined && element.id === this.activeResizeElementId;
    };
    ChangeBoundsListener.prototype.initPosition = function (event) {
        this.lastDragPosition = { x: event.pageX, y: event.pageY };
    };
    ChangeBoundsListener.prototype.updatePosition = function (target, event) {
        if (this.lastDragPosition) {
            var viewport = lib_1.findParentByFeature(target, lib_1.isViewport);
            var zoom = viewport ? viewport.zoom : 1;
            var dx = (event.pageX - this.lastDragPosition.x) / zoom;
            var dy = (event.pageY - this.lastDragPosition.y) / zoom;
            this.positionDelta = { x: dx, y: dy };
            this.lastDragPosition = { x: event.pageX, y: event.pageY };
            return true;
        }
        return false;
    };
    ChangeBoundsListener.prototype.reset = function () {
        this.tool.dispatchFeedback([new change_bounds_tool_feedback_1.HideChangeBoundsToolResizeFeedbackAction()]);
        this.resetPosition();
    };
    ChangeBoundsListener.prototype.resetPosition = function () {
        this.activeResizeHandle = undefined;
        this.lastDragPosition = undefined;
        this.positionDelta = { x: 0, y: 0 };
    };
    ChangeBoundsListener.prototype.handleElementResize = function () {
        if (!this.activeResizeHandle) {
            return [];
        }
        var actions = [];
        var resizeElement = lib_1.findParentByFeature(this.activeResizeHandle, model_1.isResizable);
        if (this.isActiveResizeElement(resizeElement)) {
            switch (this.activeResizeHandle.location) {
                case model_1.ResizeHandleLocation.TopLeft:
                    this.createSetBoundsAction(resizeElement, resizeElement.bounds.x + this.positionDelta.x, resizeElement.bounds.y + this.positionDelta.y, resizeElement.bounds.width - this.positionDelta.x, resizeElement.bounds.height - this.positionDelta.y)
                        .forEach(function (action) { return actions.push(action); });
                    break;
                case model_1.ResizeHandleLocation.TopRight:
                    this.createSetBoundsAction(resizeElement, resizeElement.bounds.x, resizeElement.bounds.y + this.positionDelta.y, resizeElement.bounds.width + this.positionDelta.x, resizeElement.bounds.height - this.positionDelta.y)
                        .forEach(function (action) { return actions.push(action); });
                    break;
                case model_1.ResizeHandleLocation.BottomLeft:
                    this.createSetBoundsAction(resizeElement, resizeElement.bounds.x + this.positionDelta.x, resizeElement.bounds.y, resizeElement.bounds.width - this.positionDelta.x, resizeElement.bounds.height + this.positionDelta.y)
                        .forEach(function (action) { return actions.push(action); });
                    break;
                case model_1.ResizeHandleLocation.BottomRight:
                    this.createSetBoundsAction(resizeElement, resizeElement.bounds.x, resizeElement.bounds.y, resizeElement.bounds.width + this.positionDelta.x, resizeElement.bounds.height + this.positionDelta.y)
                        .forEach(function (action) { return actions.push(action); });
                    break;
            }
        }
        return actions;
    };
    ChangeBoundsListener.prototype.createChangeBoundsAction = function (element) {
        if (this.isValidBoundChange(element, element.bounds, element.bounds)) {
            return [new operation_actions_1.ChangeBoundsOperationAction([smodel_util_1.toElementAndBounds(element)])];
        }
        return [];
    };
    ChangeBoundsListener.prototype.createElementAndBounds = function (element) {
        if (this.isValidBoundChange(element, element.bounds, element.bounds)) {
            return [smodel_util_1.toElementAndBounds(element)];
        }
        return [];
    };
    ChangeBoundsListener.prototype.createSetBoundsAction = function (element, x, y, width, height) {
        var newPosition = { x: x, y: y };
        var newSize = { width: width, height: height };
        if (this.isValidBoundChange(element, newPosition, newSize)) {
            return [new lib_1.SetBoundsAction([{ elementId: element.id, newPosition: newPosition, newSize: newSize }])];
        }
        return [];
    };
    ChangeBoundsListener.prototype.isValidBoundChange = function (element, newPosition, newSize) {
        return newSize.width >= this.minWidth(element) && newSize.height >= this.minHeight(element);
    };
    ChangeBoundsListener.prototype.minWidth = function (element) {
        var layoutOptions = this.getLayoutOptions(element);
        if (layoutOptions !== undefined && typeof layoutOptions.minWidth === 'number') {
            return layoutOptions.minWidth;
        }
        return 1;
    };
    ChangeBoundsListener.prototype.minHeight = function (element) {
        var layoutOptions = this.getLayoutOptions(element);
        if (layoutOptions !== undefined && typeof layoutOptions.minHeight === 'number') {
            return layoutOptions.minHeight;
        }
        return 1;
    };
    ChangeBoundsListener.prototype.getLayoutOptions = function (element) {
        var layoutOptions = element.layoutOptions;
        if (layoutOptions !== undefined) {
            return layoutOptions;
        }
        return undefined;
    };
    return ChangeBoundsListener;
}(lib_1.MouseListener));
exports.ChangeBoundsListener = ChangeBoundsListener;
//# sourceMappingURL=change-bounds-tool.js.map