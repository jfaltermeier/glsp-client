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
var model_1 = require("../features/undo-redo/model");
var GLSPCommandStack = /** @class */ (function (_super) {
    __extends(GLSPCommandStack, _super);
    function GLSPCommandStack() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GLSPCommandStack.prototype.undo = function () {
        this.actionDispatcher().then(function (dispatcher) { return dispatcher.dispatch(new model_1.GlspUndoAction()); });
        return this.thenUpdate();
    };
    GLSPCommandStack.prototype.redo = function () {
        this.actionDispatcher().then(function (dispatcher) { return dispatcher.dispatch(new model_1.GlspRedoAction()); });
        return this.thenUpdate();
    };
    __decorate([
        inversify_1.inject(lib_1.TYPES.IActionDispatcherProvider),
        __metadata("design:type", Function)
    ], GLSPCommandStack.prototype, "actionDispatcher", void 0);
    GLSPCommandStack = __decorate([
        inversify_1.injectable()
    ], GLSPCommandStack);
    return GLSPCommandStack;
}(lib_1.CommandStack));
exports.GLSPCommandStack = GLSPCommandStack;
//# sourceMappingURL=command-stack.js.map