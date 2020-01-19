"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var snabbdom = require("snabbdom-jsx");
var lib_1 = require("sprotty/lib");
var model_1 = require("../change-bounds/model");
var JSX = { createElement: snabbdom.svg };
/**
* This view is used for the invisible end of the feedback edge.
* A feedback edge is shown as a visual feedback when creating edges.
*/
var FeedbackEdgeEndView = /** @class */ (function () {
    function FeedbackEdgeEndView() {
    }
    FeedbackEdgeEndView.prototype.render = function (model, context) {
        var position = model.position || lib_1.ORIGIN_POINT;
        return JSX.createElement("g", { x: position.x, y: position.y });
    };
    FeedbackEdgeEndView = __decorate([
        inversify_1.injectable()
    ], FeedbackEdgeEndView);
    return FeedbackEdgeEndView;
}());
exports.FeedbackEdgeEndView = FeedbackEdgeEndView;
var SResizeHandleView = /** @class */ (function () {
    function SResizeHandleView() {
    }
    SResizeHandleView.prototype.render = function (handle, context) {
        var position = this.getPosition(handle);
        if (position !== undefined) {
            var node = JSX.createElement("circle", { "class-sprotty-resize-handle": true, "class-mouseover": handle.hoverFeedback, cx: position.x, cy: position.y, r: this.getRadius() });
            lib_1.setAttr(node, 'data-kind', handle.location);
            return node;
        }
        // Fallback: Create an empty group
        return JSX.createElement("g", null);
    };
    SResizeHandleView.prototype.getPosition = function (handle) {
        var parent = handle.parent;
        if (model_1.isResizable(parent)) {
            if (handle.location === model_1.ResizeHandleLocation.TopLeft) {
                return { x: 0, y: 0 };
            }
            else if (handle.location === model_1.ResizeHandleLocation.TopRight) {
                return { x: parent.bounds.width, y: 0 };
            }
            else if (handle.location === model_1.ResizeHandleLocation.BottomLeft) {
                return { x: 0, y: parent.bounds.height };
            }
            else if (handle.location === model_1.ResizeHandleLocation.BottomRight) {
                return { x: parent.bounds.width, y: parent.bounds.height };
            }
        }
        return undefined;
    };
    SResizeHandleView.prototype.getRadius = function () {
        return 7;
    };
    SResizeHandleView = __decorate([
        inversify_1.injectable()
    ], SResizeHandleView);
    return SResizeHandleView;
}());
exports.SResizeHandleView = SResizeHandleView;
//# sourceMappingURL=view.js.map