"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
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
var set_operations_1 = require("../../features/operation/set-operations");
var creation_tool_1 = require("../../features/tools/creation-tool");
var delete_tool_1 = require("../../features/tools/delete-tool");
var types_1 = require("../../types");
var GLSPToolManagerActionHandler = /** @class */ (function () {
    function GLSPToolManagerActionHandler() {
    }
    GLSPToolManagerActionHandler.prototype.handle = function (action) {
        if (set_operations_1.isSetOperationsAction(action)) {
            this.configure(action);
        }
    };
    GLSPToolManagerActionHandler.prototype.configure = function (action) {
        var _a;
        var _this = this;
        var configuredTools = action.operations.map(function (op) {
            var tool = _this.toolFactory(op.operationKind);
            if (isTypeAware(tool) && op.elementTypeId) {
                tool.elementTypeId = op.elementTypeId;
            }
            return tool;
        }).filter(function (tool) { return tool.id !== UNDEFINED_TOOL_ID; });
        (_a = this.toolManager).registerTools.apply(_a, __spread(configuredTools));
    };
    __decorate([
        inversify_1.inject(types_1.GLSP_TYPES.IToolFactory),
        __metadata("design:type", Function)
    ], GLSPToolManagerActionHandler.prototype, "toolFactory", void 0);
    __decorate([
        inversify_1.inject(lib_1.TYPES.IToolManager),
        __metadata("design:type", lib_1.ToolManager)
    ], GLSPToolManagerActionHandler.prototype, "toolManager", void 0);
    GLSPToolManagerActionHandler = __decorate([
        inversify_1.injectable()
    ], GLSPToolManagerActionHandler);
    return GLSPToolManagerActionHandler;
}());
exports.GLSPToolManagerActionHandler = GLSPToolManagerActionHandler;
function isTypeAware(tool) {
    return tool["elementTypeId"] !== undefined && typeof tool["elementTypeId"] === "string";
}
exports.isTypeAware = isTypeAware;
var UNDEFINED_TOOL_ID = "undefined-tool";
function createToolFactory() {
    return function (context) {
        return function (operationKind) {
            switch (operationKind) {
                case set_operations_1.OperationKind.CREATE_NODE:
                    return context.container.resolve(creation_tool_1.NodeCreationTool);
                case set_operations_1.OperationKind.CREATE_CONNECTION:
                    return context.container.resolve(creation_tool_1.EdgeCreationTool);
                case set_operations_1.OperationKind.DELETE_ELEMENT:
                    return context.container.resolve(delete_tool_1.MouseDeleteTool);
                default:
                    return {
                        id: UNDEFINED_TOOL_ID,
                        disable: function () { },
                        enable: function () { }
                    };
            }
        };
    };
}
exports.createToolFactory = createToolFactory;
//# sourceMappingURL=tool-manager-action-handler.js.map