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
var model_1 = require("./model");
var CursorCSS;
(function (CursorCSS) {
    CursorCSS["DEFAULT"] = "default-mode";
    CursorCSS["OVERLAP_FORBIDDEN"] = "overlap-forbidden-mode";
    CursorCSS["NODE_CREATION"] = "node-creation-mode";
    CursorCSS["EDGE_CREATION_SOURCE"] = "edge-creation-select-source-mode";
    CursorCSS["EDGE_CREATION_TARGET"] = "edge-creation-select-target-mode";
    CursorCSS["EDGE_RECONNECT"] = "edge-reconnect-select-target-mode";
    CursorCSS["OPERATION_NOT_ALLOWED"] = "edge-modification-not-allowed-mode";
    CursorCSS["ELEMENT_DELETION"] = "element-deletion-mode";
})(CursorCSS = exports.CursorCSS || (exports.CursorCSS = {}));
var ApplyCursorCSSFeedbackAction = /** @class */ (function () {
    function ApplyCursorCSSFeedbackAction(cssClass) {
        this.cssClass = cssClass;
        this.kind = ApplyCursorCSSFeedbackActionCommand.KIND;
    }
    return ApplyCursorCSSFeedbackAction;
}());
exports.ApplyCursorCSSFeedbackAction = ApplyCursorCSSFeedbackAction;
var ApplyCursorCSSFeedbackActionCommand = /** @class */ (function (_super) {
    __extends(ApplyCursorCSSFeedbackActionCommand, _super);
    function ApplyCursorCSSFeedbackActionCommand(action) {
        var _this = _super.call(this) || this;
        _this.action = action;
        return _this;
    }
    ApplyCursorCSSFeedbackActionCommand.prototype.execute = function (context) {
        smodel_util_1.removeCssClasses(context.root, Object.values(CursorCSS));
        if (this.action.cssClass) {
            smodel_util_1.addCssClasses(context.root, [this.action.cssClass]);
        }
        return context.root;
    };
    ApplyCursorCSSFeedbackActionCommand.KIND = 'applyCursorCssFeedback';
    ApplyCursorCSSFeedbackActionCommand = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(lib_1.TYPES.Action)),
        __metadata("design:paramtypes", [ApplyCursorCSSFeedbackAction])
    ], ApplyCursorCSSFeedbackActionCommand);
    return ApplyCursorCSSFeedbackActionCommand;
}(model_1.FeedbackCommand));
exports.ApplyCursorCSSFeedbackActionCommand = ApplyCursorCSSFeedbackActionCommand;
//# sourceMappingURL=cursor-feedback.js.map