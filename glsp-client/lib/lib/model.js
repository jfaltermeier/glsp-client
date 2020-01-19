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
var model_1 = require("../features/hints/model");
var model_2 = require("../features/save/model");
var GLSPGraph = /** @class */ (function (_super) {
    __extends(GLSPGraph, _super);
    function GLSPGraph() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dirty = false;
        return _this;
    }
    GLSPGraph.prototype.isContainableElement = function (input) {
        return true;
    };
    GLSPGraph.DEFAULT_FEATURES = [lib_1.viewportFeature, lib_1.exportFeature, model_2.saveFeature, model_1.containerFeature];
    return GLSPGraph;
}(lib_1.SGraph));
exports.GLSPGraph = GLSPGraph;
//# sourceMappingURL=model.js.map