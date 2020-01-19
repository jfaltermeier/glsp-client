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
require("../css/diagram.css");
require("balloon-css/balloon.min.css");
require("sprotty/css/edit-label.css");
var lib_1 = require("@eclipse-glsp/client/lib");
var di_config_1 = require("@eclipse-glsp/client/lib/features/execute/di.config");
var inversify_1 = require("inversify");
var model_1 = require("./model");
var workflow_views_1 = require("./workflow-views");
var workflowDiagramModule = new inversify_1.ContainerModule(function (bind, unbind, isBound, rebind) {
    rebind(lib_1.TYPES.ILogger).to(lib_1.ConsoleLogger).inSingletonScope();
    rebind(lib_1.TYPES.LogLevel).toConstantValue(lib_1.LogLevel.warn);
    bind(lib_1.GLSP_TYPES.IMovementRestrictor).to(lib_1.NoCollisionMovementRestrictor).inSingletonScope();
    bind(lib_1.TYPES.ICommandPaletteActionProvider).to(lib_1.RevealNamedElementActionProvider);
    bind(lib_1.TYPES.IContextMenuItemProvider).to(lib_1.DeleteContextMenuItemProvider);
    var context = { bind: bind, unbind: unbind, isBound: isBound, rebind: rebind };
    lib_1.configureModelElement(context, 'graph', lib_1.GLSPGraph, lib_1.SGraphView);
    lib_1.configureModelElement(context, 'task:automated', model_1.TaskNode, workflow_views_1.TaskNodeView);
    lib_1.configureModelElement(context, 'task:manual', model_1.TaskNode, workflow_views_1.TaskNodeView);
    lib_1.configureModelElement(context, 'label:heading', lib_1.SLabel, lib_1.SLabelView, { enable: [lib_1.editLabelFeature] });
    lib_1.configureModelElement(context, 'comp:comp', lib_1.SCompartment, lib_1.SCompartmentView);
    lib_1.configureModelElement(context, 'comp:header', lib_1.SCompartment, lib_1.SCompartmentView);
    lib_1.configureModelElement(context, 'label:icon', lib_1.SLabel, lib_1.SLabelView);
    lib_1.configureModelElement(context, 'html', lib_1.HtmlRoot, lib_1.HtmlRootView);
    lib_1.configureModelElement(context, 'pre-rendered', lib_1.PreRenderedElement, lib_1.PreRenderedView);
    lib_1.configureModelElement(context, 'button:expand', lib_1.SButton, lib_1.ExpandButtonView);
    lib_1.configureModelElement(context, 'routing-point', lib_1.SRoutingHandle, lib_1.SRoutingHandleView);
    lib_1.configureModelElement(context, 'volatile-routing-point', lib_1.SRoutingHandle, lib_1.SRoutingHandleView);
    lib_1.configureModelElement(context, 'edge', lib_1.SEdge, workflow_views_1.WorkflowEdgeView);
    lib_1.configureModelElement(context, 'edge:weighted', model_1.WeightedEdge, workflow_views_1.WeightedEdgeView);
    lib_1.configureModelElement(context, 'icon', model_1.Icon, workflow_views_1.IconView);
    lib_1.configureModelElement(context, 'activityNode:merge', model_1.ActivityNode, lib_1.DiamondNodeView);
    lib_1.configureModelElement(context, 'activityNode:decision', model_1.ActivityNode, lib_1.DiamondNodeView);
    lib_1.configureModelElement(context, 'activityNode:fork', model_1.ActivityNode, workflow_views_1.ForkOrJoinNodeView);
    lib_1.configureModelElement(context, 'activityNode:join', model_1.ActivityNode, workflow_views_1.ForkOrJoinNodeView);
});
function createContainer(widgetId) {
    var container = new inversify_1.Container();
    container.load(lib_1.decorationModule, lib_1.validationModule, lib_1.defaultModule, lib_1.glspMouseToolModule, lib_1.defaultGLSPModule, lib_1.glspSelectModule, lib_1.boundsModule, lib_1.viewportModule, lib_1.hoverModule, lib_1.fadeModule, lib_1.exportModule, lib_1.expandModule, lib_1.openModule, lib_1.buttonModule, lib_1.modelSourceModule, lib_1.labelEditModule, lib_1.labelEditUiModule, lib_1.glspEditLabelValidationModule, workflowDiagramModule, lib_1.saveModule, di_config_1.default, lib_1.toolFeedbackModule, lib_1.modelHintsModule, lib_1.contextMenuModule, lib_1.glspContextMenuModule, lib_1.commandPaletteModule, lib_1.glspCommandPaletteModule, lib_1.paletteModule, lib_1.requestResponseModule, lib_1.routingModule, lib_1.edgeLayoutModule, lib_1.zorderModule, lib_1.layoutCommandsModule);
    lib_1.overrideViewerOptions(container, {
        baseDiv: widgetId,
        hiddenDiv: widgetId + "_hidden",
        needsClientLayout: true
    });
    return container;
}
exports.default = createContainer;
//# sourceMappingURL=di.config.js.map