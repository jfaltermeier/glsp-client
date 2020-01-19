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
var action_definitions_1 = require("../context-actions/action-definitions");
var glsp_action_dispatcher_1 = require("../request-response/glsp-action-dispatcher");
var ServerContextMenu;
(function (ServerContextMenu) {
    ServerContextMenu.KEY = "context-menu";
})(ServerContextMenu = exports.ServerContextMenu || (exports.ServerContextMenu = {}));
var ServerContextMenuItemProvider = /** @class */ (function () {
    function ServerContextMenuItemProvider(actionDispatcher) {
        this.actionDispatcher = actionDispatcher;
    }
    ServerContextMenuItemProvider.prototype.getItems = function (root, lastMousePosition) {
        var _a;
        var _this = this;
        var selectedElementIds = Array.from(root.index.all().filter(lib_1.isSelected).map(function (e) { return e.id; }));
        var localPosition = lastMousePosition ? root.root.parentToLocal(lib_1.subtract(lastMousePosition, root.root.canvasBounds)) : undefined;
        var requestAction = new action_definitions_1.RequestContextActions(selectedElementIds, localPosition, (_a = {}, _a[action_definitions_1.ContextActions.UI_CONTROL_KEY] = ServerContextMenu.KEY, _a));
        return this.actionDispatcher.requestUntil(requestAction).then(function (response) { return _this.getContextActionsFromResponse(response); });
    };
    ServerContextMenuItemProvider.prototype.getContextActionsFromResponse = function (action) {
        if (action_definitions_1.isSetContextActionsAction(action)) {
            return action.actions;
        }
        return [];
    };
    ServerContextMenuItemProvider = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(lib_1.TYPES.IActionDispatcher)),
        __metadata("design:paramtypes", [glsp_action_dispatcher_1.GLSPActionDispatcher])
    ], ServerContextMenuItemProvider);
    return ServerContextMenuItemProvider;
}());
exports.ServerContextMenuItemProvider = ServerContextMenuItemProvider;
//# sourceMappingURL=server-context-menu-provider.js.map