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
exports.resizeFeature = Symbol("resizeFeature");
function isResizable(element) {
    return lib_1.isBoundsAware(element) && lib_1.isSelectable(element) && element instanceof lib_1.SParentElement && element.hasFeature(exports.resizeFeature);
}
exports.isResizable = isResizable;
var ResizeHandleLocation;
(function (ResizeHandleLocation) {
    ResizeHandleLocation["TopLeft"] = "top-left";
    ResizeHandleLocation["TopRight"] = "top-right";
    ResizeHandleLocation["BottomLeft"] = "bottom-left";
    ResizeHandleLocation["BottomRight"] = "bottom-right";
})(ResizeHandleLocation = exports.ResizeHandleLocation || (exports.ResizeHandleLocation = {}));
function isBoundsAwareMoveable(element) {
    return lib_1.isMoveable(element) && lib_1.isBoundsAware(element);
}
exports.isBoundsAwareMoveable = isBoundsAwareMoveable;
var SResizeHandle = /** @class */ (function (_super) {
    __extends(SResizeHandle, _super);
    function SResizeHandle(location) {
        var _this = _super.call(this) || this;
        _this.type = SResizeHandle.TYPE;
        _this.hoverFeedback = false;
        _this.location = location;
        return _this;
    }
    SResizeHandle.prototype.hasFeature = function (feature) {
        return feature === lib_1.hoverFeedbackFeature;
    };
    SResizeHandle.TYPE = 'resize-handle';
    return SResizeHandle;
}(lib_1.SChildElement));
exports.SResizeHandle = SResizeHandle;
function addResizeHandles(element) {
    removeResizeHandles(element);
    element.add(new SResizeHandle(ResizeHandleLocation.TopLeft));
    element.add(new SResizeHandle(ResizeHandleLocation.TopRight));
    element.add(new SResizeHandle(ResizeHandleLocation.BottomLeft));
    element.add(new SResizeHandle(ResizeHandleLocation.BottomRight));
}
exports.addResizeHandles = addResizeHandles;
function removeResizeHandles(element) {
    element.removeAll(function (child) { return child instanceof SResizeHandle; });
}
exports.removeResizeHandles = removeResizeHandles;
//# sourceMappingURL=model.js.map