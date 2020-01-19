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
var inversify_1 = require("inversify");
var lib_1 = require("sprotty/lib");
var types_1 = require("../../types");
var model_1 = require("../change-bounds/model");
var change_bounds_tool_feedback_1 = require("./change-bounds-tool-feedback");
var creation_tool_feedback_1 = require("./creation-tool-feedback");
var cursor_feedback_1 = require("./cursor-feedback");
var edge_edit_tool_feedback_1 = require("./edge-edit-tool-feedback");
var feedback_action_dispatcher_1 = require("./feedback-action-dispatcher");
var view_1 = require("./view");
var toolFeedbackModule = new inversify_1.ContainerModule(function (bind, _unbind, isBound) {
    bind(types_1.GLSP_TYPES.IFeedbackActionDispatcher).to(feedback_action_dispatcher_1.FeedbackActionDispatcher).inSingletonScope();
    // create node and edge tool feedback
    lib_1.configureCommand({ bind: bind, isBound: isBound }, cursor_feedback_1.ApplyCursorCSSFeedbackActionCommand);
    lib_1.configureCommand({ bind: bind, isBound: isBound }, creation_tool_feedback_1.DrawFeedbackEdgeCommand);
    lib_1.configureCommand({ bind: bind, isBound: isBound }, creation_tool_feedback_1.RemoveFeedbackEdgeCommand);
    lib_1.configureView({ bind: bind, isBound: isBound }, creation_tool_feedback_1.FeedbackEdgeEnd.TYPE, view_1.FeedbackEdgeEndView);
    // move tool feedback: we use sprotties MoveCommand as client-side visual feedback
    lib_1.configureCommand({ bind: bind, isBound: isBound }, lib_1.MoveCommand);
    // resize tool feedback
    lib_1.configureCommand({ bind: bind, isBound: isBound }, change_bounds_tool_feedback_1.ShowChangeBoundsToolResizeFeedbackCommand);
    lib_1.configureCommand({ bind: bind, isBound: isBound }, change_bounds_tool_feedback_1.HideChangeBoundsToolResizeFeedbackCommand);
    lib_1.configureView({ bind: bind, isBound: isBound }, model_1.SResizeHandle.TYPE, view_1.SResizeHandleView);
    // reconnect edge tool feedback
    lib_1.configureCommand({ bind: bind, isBound: isBound }, edge_edit_tool_feedback_1.ShowEdgeReconnectHandlesFeedbackCommand);
    lib_1.configureCommand({ bind: bind, isBound: isBound }, edge_edit_tool_feedback_1.HideEdgeReconnectHandlesFeedbackCommand);
    lib_1.configureCommand({ bind: bind, isBound: isBound }, edge_edit_tool_feedback_1.DrawFeedbackEdgeSourceCommand);
    lib_1.configureCommand({ bind: bind, isBound: isBound }, edge_edit_tool_feedback_1.SwitchRoutingModeCommand);
    bind(lib_1.TYPES.IVNodePostprocessor).to(lib_1.LocationPostprocessor);
    bind(lib_1.TYPES.HiddenVNodePostprocessor).to(lib_1.LocationPostprocessor);
});
exports.default = toolFeedbackModule;
//# sourceMappingURL=di.config.js.map