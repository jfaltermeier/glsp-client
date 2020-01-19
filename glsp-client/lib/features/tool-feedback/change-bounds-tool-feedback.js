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
var model_1 = require("../change-bounds/model");
var model_2 = require("./model");
var ShowChangeBoundsToolResizeFeedbackAction = /** @class */ (function () {
    function ShowChangeBoundsToolResizeFeedbackAction(elementId) {
        this.elementId = elementId;
        this.kind = ShowChangeBoundsToolResizeFeedbackCommand.KIND;
    }
    return ShowChangeBoundsToolResizeFeedbackAction;
}());
exports.ShowChangeBoundsToolResizeFeedbackAction = ShowChangeBoundsToolResizeFeedbackAction;
var HideChangeBoundsToolResizeFeedbackAction = /** @class */ (function () {
    function HideChangeBoundsToolResizeFeedbackAction() {
        this.kind = HideChangeBoundsToolResizeFeedbackCommand.KIND;
    }
    return HideChangeBoundsToolResizeFeedbackAction;
}());
exports.HideChangeBoundsToolResizeFeedbackAction = HideChangeBoundsToolResizeFeedbackAction;
var ShowChangeBoundsToolResizeFeedbackCommand = /** @class */ (function (_super) {
    __extends(ShowChangeBoundsToolResizeFeedbackCommand, _super);
    function ShowChangeBoundsToolResizeFeedbackCommand(action) {
        var _this = _super.call(this) || this;
        _this.action = action;
        return _this;
    }
    ShowChangeBoundsToolResizeFeedbackCommand.prototype.execute = function (context) {
        var index = context.root.index;
        index.all().filter(model_1.isResizable).forEach(model_1.removeResizeHandles);
        if (smodel_util_1.isNotUndefined(this.action.elementId)) {
            var resizeElement = index.getById(this.action.elementId);
            if (smodel_util_1.isNotUndefined(resizeElement) && model_1.isResizable(resizeElement)) {
                model_1.addResizeHandles(resizeElement);
            }
        }
        return context.root;
    };
    ShowChangeBoundsToolResizeFeedbackCommand.KIND = 'showChangeBoundsToolResizeFeedback';
    ShowChangeBoundsToolResizeFeedbackCommand = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(lib_1.TYPES.Action)),
        __metadata("design:paramtypes", [ShowChangeBoundsToolResizeFeedbackAction])
    ], ShowChangeBoundsToolResizeFeedbackCommand);
    return ShowChangeBoundsToolResizeFeedbackCommand;
}(model_2.FeedbackCommand));
exports.ShowChangeBoundsToolResizeFeedbackCommand = ShowChangeBoundsToolResizeFeedbackCommand;
var HideChangeBoundsToolResizeFeedbackCommand = /** @class */ (function (_super) {
    __extends(HideChangeBoundsToolResizeFeedbackCommand, _super);
    function HideChangeBoundsToolResizeFeedbackCommand(action) {
        var _this = _super.call(this) || this;
        _this.action = action;
        return _this;
    }
    HideChangeBoundsToolResizeFeedbackCommand.prototype.execute = function (context) {
        var index = context.root.index;
        index.all().filter(model_1.isResizable).forEach(model_1.removeResizeHandles);
        return context.root;
    };
    HideChangeBoundsToolResizeFeedbackCommand.KIND = 'hideChangeBoundsToolResizeFeedback';
    HideChangeBoundsToolResizeFeedbackCommand = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(lib_1.TYPES.Action)),
        __metadata("design:paramtypes", [HideChangeBoundsToolResizeFeedbackAction])
    ], HideChangeBoundsToolResizeFeedbackCommand);
    return HideChangeBoundsToolResizeFeedbackCommand;
}(model_2.FeedbackCommand));
exports.HideChangeBoundsToolResizeFeedbackCommand = HideChangeBoundsToolResizeFeedbackCommand;
/**
 * This mouse listener provides visual feedback for moving by sending client-side
 * `MoveAction`s while elements are selected and dragged. This will also update
 * their bounds, which is important, as it is not only required for rendering
 * the visual feedback but also the basis for sending the change to the server
 * (see also `tools/MoveTool`).
 */
var FeedbackMoveMouseListener = /** @class */ (function (_super) {
    __extends(FeedbackMoveMouseListener, _super);
    function FeedbackMoveMouseListener(movementRestrictor) {
        var _this = _super.call(this) || this;
        _this.movementRestrictor = movementRestrictor;
        _this.hasDragged = false;
        return _this;
    }
    FeedbackMoveMouseListener.prototype.mouseDown = function (target, event) {
        if (event.button === 0 && !(target instanceof model_1.SResizeHandle)) {
            var moveable = lib_1.findParentByFeature(target, lib_1.isMoveable);
            if (moveable !== undefined) {
                this.lastDragPosition = { x: event.pageX, y: event.pageY };
            }
            else {
                this.lastDragPosition = undefined;
            }
            this.hasDragged = false;
        }
        return [];
    };
    FeedbackMoveMouseListener.prototype.mouseMove = function (target, event) {
        var _this = this;
        var result = [];
        if (event.buttons === 0)
            this.mouseUp(target, event);
        else if (this.lastDragPosition) {
            var viewport = lib_1.findParentByFeature(target, lib_1.isViewport);
            this.hasDragged = true;
            var zoom = viewport ? viewport.zoom : 1;
            var mousePoint_1 = viewpoint_util_1.getAbsolutePosition(target, event);
            var dx_1 = (event.pageX - this.lastDragPosition.x) / zoom;
            var dy_1 = (event.pageY - this.lastDragPosition.y) / zoom;
            var nodeMoves_1 = [];
            var isValidMove_1 = true;
            target.root.index.all()
                .filter(function (element) { return lib_1.isSelectable(element) && element.selected; })
                .forEach(function (element) {
                if (model_1.isBoundsAwareMoveable(element)) {
                    // If a movement restrictor is bound attemt a non restricted move
                    if (_this.movementRestrictor) {
                        isValidMove_1 = _this.movementRestrictor.attemptMove(element, mousePoint_1, target, { x: dx_1, y: dy_1 }, result);
                    }
                }
                if (lib_1.isMoveable(element) && isValidMove_1) {
                    nodeMoves_1.push({
                        elementId: element.id,
                        fromPosition: {
                            x: element.position.x,
                            y: element.position.y
                        },
                        toPosition: {
                            x: element.position.x + dx_1,
                            y: element.position.y + dy_1
                        }
                    });
                }
            });
            this.lastDragPosition = { x: event.pageX, y: event.pageY };
            if (nodeMoves_1.length > 0 && isValidMove_1) {
                result.push(new lib_1.MoveAction(nodeMoves_1, false));
            }
        }
        return result;
    };
    FeedbackMoveMouseListener.prototype.mouseEnter = function (target, event) {
        if (target instanceof lib_1.SModelRoot && event.buttons === 0)
            this.mouseUp(target, event);
        return [];
    };
    FeedbackMoveMouseListener.prototype.mouseUp = function (target, event) {
        this.hasDragged = false;
        this.lastDragPosition = undefined;
        return [];
    };
    FeedbackMoveMouseListener.prototype.decorate = function (vnode, element) {
        return vnode;
    };
    return FeedbackMoveMouseListener;
}(lib_1.MouseListener));
exports.FeedbackMoveMouseListener = FeedbackMoveMouseListener;
//# sourceMappingURL=change-bounds-tool-feedback.js.map