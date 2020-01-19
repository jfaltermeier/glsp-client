"use strict";
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
var ContextActions;
(function (ContextActions) {
    ContextActions.UI_CONTROL_KEY = "ui-control";
})(ContextActions = exports.ContextActions || (exports.ContextActions = {}));
var RequestContextActions = /** @class */ (function () {
    function RequestContextActions(selectedElementIds, lastMousePosition, args, requestId) {
        if (selectedElementIds === void 0) { selectedElementIds = []; }
        if (requestId === void 0) { requestId = lib_1.generateRequestId(); }
        this.selectedElementIds = selectedElementIds;
        this.lastMousePosition = lastMousePosition;
        this.args = args;
        this.requestId = requestId;
        this.kind = RequestContextActions.KIND;
    }
    RequestContextActions.KIND = "requestContextActions";
    return RequestContextActions;
}());
exports.RequestContextActions = RequestContextActions;
var SetContextActions = /** @class */ (function () {
    function SetContextActions(actions, responseId) {
        if (responseId === void 0) { responseId = ''; }
        this.actions = actions;
        this.responseId = responseId;
        this.kind = SetContextActions.KIND;
    }
    SetContextActions.KIND = "setContextActions";
    return SetContextActions;
}());
exports.SetContextActions = SetContextActions;
function isSetContextActionsAction(action) {
    return action !== undefined && (action.kind === SetContextActions.KIND)
        && action.actions !== undefined;
}
exports.isSetContextActionsAction = isSetContextActionsAction;
//# sourceMappingURL=action-definitions.js.map