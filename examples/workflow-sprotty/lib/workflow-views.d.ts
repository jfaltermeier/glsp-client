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
import { IView, Point, PolylineEdgeView, RectangularNodeView, RenderingContext, SEdge, SShapeElement } from "@eclipse-glsp/client/lib";
import { VNode } from "snabbdom/vnode";
import { ActivityNode, Icon, TaskNode, WeightedEdge } from "./model";
export declare class TaskNodeView extends RectangularNodeView {
    render(node: TaskNode, context: RenderingContext): VNode;
    protected getRoundedCornerRadius(node: SShapeElement): number;
}
export declare class ForkOrJoinNodeView extends RectangularNodeView {
    render(node: ActivityNode, context: RenderingContext): VNode;
}
export declare class WorkflowEdgeView extends PolylineEdgeView {
    protected renderAdditionals(edge: SEdge, segments: Point[], context: RenderingContext): VNode[];
}
export declare class WeightedEdgeView extends WorkflowEdgeView {
    render(edge: Readonly<WeightedEdge>, context: RenderingContext): VNode;
}
export declare class IconView implements IView {
    render(element: Icon, context: RenderingContext): VNode;
    getRadius(): number;
}
//# sourceMappingURL=workflow-views.d.ts.map