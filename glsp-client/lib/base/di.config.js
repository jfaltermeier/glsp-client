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
require("../../css/glsp-sprotty.css");
var inversify_1 = require("inversify");
var lib_1 = require("sprotty/lib");
var set_operations_1 = require("../features/operation/set-operations");
var types_1 = require("../types");
var command_stack_1 = require("./command-stack");
var update_model_command_1 = require("./model/update-model-command");
var tool_manager_action_handler_1 = require("./tool-manager/tool-manager-action-handler");
var defaultGLSPModule = new inversify_1.ContainerModule(function (bind, _unbind, isBound, rebind) {
    var context = { bind: bind, _unbind: _unbind, isBound: isBound, rebind: rebind };
    // Tool manager initialization ------------------------------------
    lib_1.configureActionHandler(context, set_operations_1.SetOperationsAction.KIND, tool_manager_action_handler_1.GLSPToolManagerActionHandler);
    bind(types_1.GLSP_TYPES.IToolFactory).toFactory((tool_manager_action_handler_1.createToolFactory()));
    // Model update initialization ------------------------------------
    lib_1.configureCommand(context, update_model_command_1.FeedbackAwareUpdateModelCommand);
    lib_1.configureActionHandler(context, lib_1.SetModelCommand.KIND, update_model_command_1.SetModelActionHandler);
    rebind(lib_1.TYPES.ICommandStack).to(command_stack_1.GLSPCommandStack);
});
exports.default = defaultGLSPModule;
//# sourceMappingURL=di.config.js.map