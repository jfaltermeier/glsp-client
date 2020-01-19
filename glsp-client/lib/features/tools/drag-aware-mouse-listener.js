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
var lib_1 = require("sprotty/lib");
/**
 * A mouse listener that is aware of prior mouse dragging.
 *
 * Therefore, this listener distinguishes between mouse up events after dragging and
 * mouse up events without prior dragging. Subclasses may override the methods
 * `draggingMouseUp` and/or `nonDraggingMouseUp` to react to only these specific kinds
 * of mouse up events.
 */
var DragAwareMouseListener = /** @class */ (function (_super) {
    __extends(DragAwareMouseListener, _super);
    function DragAwareMouseListener() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isMouseDown = false;
        _this.isMouseDrag = false;
        return _this;
    }
    DragAwareMouseListener.prototype.mouseDown = function (target, event) {
        this.isMouseDown = true;
        return [];
    };
    DragAwareMouseListener.prototype.mouseMove = function (target, event) {
        if (this.isMouseDown) {
            this.isMouseDrag = true;
        }
        return [];
    };
    DragAwareMouseListener.prototype.mouseUp = function (element, event) {
        this.isMouseDown = false;
        if (this.isMouseDrag) {
            this.isMouseDrag = false;
            return this.draggingMouseUp(element, event);
        }
        return this.nonDraggingMouseUp(element, event);
    };
    DragAwareMouseListener.prototype.nonDraggingMouseUp = function (element, event) {
        return [];
    };
    DragAwareMouseListener.prototype.draggingMouseUp = function (element, event) {
        return [];
    };
    Object.defineProperty(DragAwareMouseListener.prototype, "isDragging", {
        get: function () {
            return this.isMouseDrag;
        },
        enumerable: true,
        configurable: true
    });
    return DragAwareMouseListener;
}(lib_1.MouseListener));
exports.DragAwareMouseListener = DragAwareMouseListener;
//# sourceMappingURL=drag-aware-mouse-listener.js.map