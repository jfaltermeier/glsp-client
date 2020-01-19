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
var sprotty_1 = require("sprotty");
var rpc = require("vscode-ws-jsonrpc");
var vscode_ws_jsonrpc_1 = require("vscode-ws-jsonrpc");
var action_definitions_1 = require("../features/context-actions/action-definitions");
var execute_command_1 = require("../features/execute/execute-command");
var request_type_hints_action_1 = require("../features/hints/request-type-hints-action");
var set_operations_1 = require("../features/operation/set-operations");
var save_1 = require("../features/save/save");
var model_1 = require("../features/undo-redo/model");
var validate_1 = require("../features/validation/validate");
var edit_label_validator_1 = require("../features/edit-label-validation/edit-label-validator");
var GLSPWebsocketDiagramServer = /** @class */ (function (_super) {
    __extends(GLSPWebsocketDiagramServer, _super);
    function GLSPWebsocketDiagramServer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GLSPWebsocketDiagramServer.prototype.listen = function (webSocket) {
        var _this = this;
        rpc.listen({
            webSocket: webSocket,
            onConnection: function (connection) {
                connection.listen();
                connection.onNotification(ActionMessageNotification.type, function (message) { return _this.messageReceived(message); });
                _this.connection = connection;
            }
        });
    };
    GLSPWebsocketDiagramServer.prototype.sendMessage = function (message) {
        if (this.connection) {
            this.connection.sendNotification(ActionMessageNotification.type, message);
        }
        else {
            throw new Error('WebSocket is not connected');
        }
    };
    GLSPWebsocketDiagramServer.prototype.initialize = function (registry) {
        registerDefaultGLSPServerActions(registry, this);
        this.clientId = this.viewerOptions.baseDiv;
    };
    GLSPWebsocketDiagramServer.prototype.handle = function (action) {
        if (action instanceof sprotty_1.RequestModelAction && action.options !== undefined)
            this._sourceUri = action.options.sourceUri;
        return _super.prototype.handle.call(this, action);
    };
    GLSPWebsocketDiagramServer.prototype.getSourceURI = function () {
        return this._sourceUri;
    };
    GLSPWebsocketDiagramServer.prototype.handleComputedBounds = function (action) {
        return true;
    };
    GLSPWebsocketDiagramServer = __decorate([
        inversify_1.injectable()
    ], GLSPWebsocketDiagramServer);
    return GLSPWebsocketDiagramServer;
}(sprotty_1.DiagramServer));
exports.GLSPWebsocketDiagramServer = GLSPWebsocketDiagramServer;
function registerDefaultGLSPServerActions(registry, diagramServer) {
    registry.register(set_operations_1.RequestOperationsAction.KIND, diagramServer);
    registry.register(save_1.SaveModelAction.KIND, diagramServer);
    registry.register(model_1.GlspUndoAction.KIND, diagramServer);
    registry.register(model_1.GlspRedoAction.KIND, diagramServer);
    registry.register(set_operations_1.OperationKind.CREATE_CONNECTION, diagramServer);
    registry.register(set_operations_1.OperationKind.RECONNECT_CONNECTION, diagramServer);
    registry.register(set_operations_1.OperationKind.CHANGE_ROUTING_POINTS, diagramServer);
    registry.register(set_operations_1.OperationKind.CREATE_NODE, diagramServer);
    registry.register(set_operations_1.OperationKind.CHANGE_BOUNDS, diagramServer);
    registry.register(set_operations_1.OperationKind.DELETE_ELEMENT, diagramServer);
    registry.register(execute_command_1.ExecuteServerCommandAction.KIND, diagramServer);
    registry.register(request_type_hints_action_1.RequestTypeHintsAction.KIND, diagramServer);
    registry.register(sprotty_1.ComputedBoundsAction.KIND, diagramServer);
    registry.register(sprotty_1.RequestBoundsCommand.KIND, diagramServer);
    registry.register(sprotty_1.RequestPopupModelAction.KIND, diagramServer);
    registry.register(sprotty_1.CollapseExpandAction.KIND, diagramServer);
    registry.register(sprotty_1.CollapseExpandAllAction.KIND, diagramServer);
    registry.register(sprotty_1.OpenAction.KIND, diagramServer);
    registry.register(sprotty_1.ServerStatusAction.KIND, diagramServer);
    registry.register(sprotty_1.RequestModelAction.KIND, diagramServer);
    registry.register(sprotty_1.ExportSvgAction.KIND, diagramServer);
    registry.register(action_definitions_1.RequestContextActions.KIND, diagramServer);
    registry.register(edit_label_validator_1.ValidateLabelEditAction.KIND, diagramServer);
    registry.register(validate_1.RequestMarkersAction.KIND, diagramServer);
    registry.register(sprotty_1.LayoutAction.KIND, diagramServer);
    registry.register(sprotty_1.ApplyLabelEditAction.KIND, diagramServer);
    // Register an empty handler for SwitchEditMode, to avoid runtime exceptions.
    // We don't want to support SwitchEditMode, but sprotty still sends some corresponding
    // actions.
    registry.register(sprotty_1.SwitchEditModeCommand.KIND, { handle: function (action) { return undefined; } });
}
exports.registerDefaultGLSPServerActions = registerDefaultGLSPServerActions;
var ActionMessageNotification;
(function (ActionMessageNotification) {
    ActionMessageNotification.type = new vscode_ws_jsonrpc_1.NotificationType('process');
})(ActionMessageNotification || (ActionMessageNotification = {}));
//# sourceMappingURL=websocket-diagram-server.js.map