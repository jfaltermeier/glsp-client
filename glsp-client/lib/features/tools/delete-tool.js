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
var keyboard_1 = require("sprotty/lib/utils/keyboard");
var types_1 = require("../../types");
var operation_actions_1 = require("../operation/operation-actions");
var cursor_feedback_1 = require("../tool-feedback/cursor-feedback");
/**
 * Deletes selected elements when hitting the `Del` key.
 */
var DelKeyDeleteTool = /** @class */ (function () {
    function DelKeyDeleteTool(keytool) {
        this.keytool = keytool;
        this.id = DelKeyDeleteTool_1.ID;
        this.deleteKeyListener = new DeleteKeyListener();
    }
    DelKeyDeleteTool_1 = DelKeyDeleteTool;
    DelKeyDeleteTool.prototype.enable = function () {
        this.keytool.register(this.deleteKeyListener);
    };
    DelKeyDeleteTool.prototype.disable = function () {
        this.keytool.deregister(this.deleteKeyListener);
    };
    var DelKeyDeleteTool_1;
    DelKeyDeleteTool.ID = "glsp.delete-keyboard";
    DelKeyDeleteTool = DelKeyDeleteTool_1 = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(lib_1.KeyTool)),
        __metadata("design:paramtypes", [lib_1.KeyTool])
    ], DelKeyDeleteTool);
    return DelKeyDeleteTool;
}());
exports.DelKeyDeleteTool = DelKeyDeleteTool;
var DeleteKeyListener = /** @class */ (function (_super) {
    __extends(DeleteKeyListener, _super);
    function DeleteKeyListener() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DeleteKeyListener.prototype.keyDown = function (element, event) {
        if (keyboard_1.matchesKeystroke(event, 'Delete')) {
            var deleteElementIds = Array.from(element.root.index.all().filter(function (e) { return lib_1.isDeletable(e) && lib_1.isSelectable(e) && e.selected; })
                .filter(function (e) { return e.id !== e.root.id; }).map(function (e) { return e.id; }));
            return [new operation_actions_1.DeleteElementOperationAction(deleteElementIds)];
        }
        return [];
    };
    DeleteKeyListener = __decorate([
        inversify_1.injectable()
    ], DeleteKeyListener);
    return DeleteKeyListener;
}(lib_1.KeyListener));
exports.DeleteKeyListener = DeleteKeyListener;
/**
 * Deletes selected elements when clicking on them.
 */
var MouseDeleteTool = /** @class */ (function () {
    function MouseDeleteTool(mouseTool, feedbackDispatcher) {
        this.mouseTool = mouseTool;
        this.feedbackDispatcher = feedbackDispatcher;
        this.id = MouseDeleteTool_1.ID;
        this.deleteToolMouseListener = new DeleteToolMouseListener();
    }
    MouseDeleteTool_1 = MouseDeleteTool;
    MouseDeleteTool.prototype.enable = function () {
        this.mouseTool.register(this.deleteToolMouseListener);
        this.feedbackDispatcher.registerFeedback(this, [new cursor_feedback_1.ApplyCursorCSSFeedbackAction(cursor_feedback_1.CursorCSS.ELEMENT_DELETION)]);
    };
    MouseDeleteTool.prototype.disable = function () {
        this.mouseTool.deregister(this.deleteToolMouseListener);
        this.feedbackDispatcher.registerFeedback(this, [new cursor_feedback_1.ApplyCursorCSSFeedbackAction()]);
    };
    var MouseDeleteTool_1;
    MouseDeleteTool.ID = "glsp.delete-mouse";
    MouseDeleteTool = MouseDeleteTool_1 = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(types_1.GLSP_TYPES.MouseTool)),
        __param(1, inversify_1.inject(types_1.GLSP_TYPES.IFeedbackActionDispatcher)),
        __metadata("design:paramtypes", [Object, Object])
    ], MouseDeleteTool);
    return MouseDeleteTool;
}());
exports.MouseDeleteTool = MouseDeleteTool;
var DeleteToolMouseListener = /** @class */ (function (_super) {
    __extends(DeleteToolMouseListener, _super);
    function DeleteToolMouseListener() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DeleteToolMouseListener.prototype.mouseUp = function (target, event) {
        if (!lib_1.isDeletable(target)) {
            return [];
        }
        var result = [];
        result.push(new operation_actions_1.DeleteElementOperationAction([target.id]));
        if (!lib_1.isCtrlOrCmd(event)) {
            result.push(new lib_1.EnableDefaultToolsAction());
        }
        return result;
    };
    DeleteToolMouseListener = __decorate([
        inversify_1.injectable()
    ], DeleteToolMouseListener);
    return DeleteToolMouseListener;
}(lib_1.MouseListener));
exports.DeleteToolMouseListener = DeleteToolMouseListener;
//# sourceMappingURL=delete-tool.js.map