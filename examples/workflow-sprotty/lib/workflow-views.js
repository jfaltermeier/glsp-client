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
var lib_1 = require("@eclipse-glsp/client/lib");
var inversify_1 = require("inversify");
var snabbdom = require("snabbdom-jsx");
var JSX = { createElement: snabbdom.svg };
var TaskNodeView = /** @class */ (function (_super) {
    __extends(TaskNodeView, _super);
    function TaskNodeView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskNodeView.prototype.render = function (node, context) {
        var rcr = this.getRoundedCornerRadius(node);
        var graph = JSX.createElement("g", null,
            JSX.createElement("rect", { "class-sprotty-node": true, "class-task": true, "class-automated": node.taskType === 'automated', "class-manual": node.taskType === 'manual', "class-mouseover": node.hoverFeedback, "class-selected": node.selected, x: 0, y: 0, rx: rcr, ry: rcr, width: Math.max(0, node.bounds.width), height: Math.max(0, node.bounds.height) }),
            context.renderChildren(node));
        return graph;
    };
    TaskNodeView.prototype.getRoundedCornerRadius = function (node) {
        return 5;
    };
    TaskNodeView = __decorate([
        inversify_1.injectable()
    ], TaskNodeView);
    return TaskNodeView;
}(lib_1.RectangularNodeView));
exports.TaskNodeView = TaskNodeView;
var ForkOrJoinNodeView = /** @class */ (function (_super) {
    __extends(ForkOrJoinNodeView, _super);
    function ForkOrJoinNodeView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ForkOrJoinNodeView.prototype.render = function (node, context) {
        var graph = JSX.createElement("g", null,
            JSX.createElement("rect", { "class-sprotty-node": true, "class-forkOrJoin": true, "class-mouseover": node.hoverFeedback, "class-selected": node.selected, width: 10, height: Math.max(50, node.bounds.height) }));
        return graph;
    };
    ForkOrJoinNodeView = __decorate([
        inversify_1.injectable()
    ], ForkOrJoinNodeView);
    return ForkOrJoinNodeView;
}(lib_1.RectangularNodeView));
exports.ForkOrJoinNodeView = ForkOrJoinNodeView;
var WorkflowEdgeView = /** @class */ (function (_super) {
    __extends(WorkflowEdgeView, _super);
    function WorkflowEdgeView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WorkflowEdgeView.prototype.renderAdditionals = function (edge, segments, context) {
        var p1 = segments[segments.length - 2];
        var p2 = segments[segments.length - 1];
        return [
            JSX.createElement("path", { "class-sprotty-edge": true, "class-arrow": true, d: "M 1.5,0 L 10,-4 L 10,4 Z", transform: "rotate(" + lib_1.toDegrees(lib_1.angleOfPoint({ x: p1.x - p2.x, y: p1.y - p2.y })) + " " + p2.x + " " + p2.y + ") translate(" + p2.x + " " + p2.y + ")" })
        ];
    };
    WorkflowEdgeView = __decorate([
        inversify_1.injectable()
    ], WorkflowEdgeView);
    return WorkflowEdgeView;
}(lib_1.PolylineEdgeView));
exports.WorkflowEdgeView = WorkflowEdgeView;
var WeightedEdgeView = /** @class */ (function (_super) {
    __extends(WeightedEdgeView, _super);
    function WeightedEdgeView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WeightedEdgeView.prototype.render = function (edge, context) {
        var router = this.edgeRouterRegistry.get(edge.routerKind);
        var route = router.route(edge);
        if (route.length === 0)
            return this.renderDanglingEdge("Cannot compute route", edge, context);
        return JSX.createElement("g", { "class-sprotty-edge": true, "class-weighted": true, "class-low": edge.probability === 'low', "class-medium": edge.probability === 'medium', "class-high": edge.probability === 'high', "class-mouseover": edge.hoverFeedback },
            this.renderLine(edge, route, context),
            this.renderAdditionals(edge, route, context),
            context.renderChildren(edge, { route: route }));
    };
    WeightedEdgeView = __decorate([
        inversify_1.injectable()
    ], WeightedEdgeView);
    return WeightedEdgeView;
}(WorkflowEdgeView));
exports.WeightedEdgeView = WeightedEdgeView;
var IconView = /** @class */ (function () {
    function IconView() {
    }
    IconView.prototype.render = function (element, context) {
        var radius = this.getRadius();
        return JSX.createElement("g", null,
            JSX.createElement("circle", { "class-sprotty-icon": true, r: radius, cx: radius, cy: radius }),
            context.renderChildren(element));
    };
    IconView.prototype.getRadius = function () {
        return 16;
    };
    IconView = __decorate([
        inversify_1.injectable()
    ], IconView);
    return IconView;
}());
exports.IconView = IconView;
//# sourceMappingURL=workflow-views.js.map