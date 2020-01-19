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
import { Bounds, CommandExecutor, DiamondNode, LayoutContainer, Nameable, RectangularNode, SEdge, SShapeElement, WithEditableLabel } from "@eclipse-glsp/client/lib";
export declare class TaskNode extends RectangularNode implements Nameable, WithEditableLabel {
    static readonly DEFAULT_FEATURES: symbol[];
    name: string;
    duration?: number;
    taskType?: string;
    reference?: string;
    readonly editableLabel: (import("@eclipse-glsp/client/lib").SChildElement & import("@eclipse-glsp/client/lib").EditableLabel) | undefined;
}
export declare class WeightedEdge extends SEdge {
    probability?: string;
}
export declare class ActivityNode extends DiamondNode {
    nodeType: string;
    size: {
        width: number;
        height: number;
    };
    strokeWidth: number;
}
export declare class Icon extends SShapeElement implements LayoutContainer, CommandExecutor {
    static readonly DEFAULT_FEATURES: symbol[];
    commandId: string;
    layout: string;
    layoutOptions?: {
        [key: string]: string | number | boolean;
    };
    bounds: Bounds;
    size: {
        width: number;
        height: number;
    };
}
//# sourceMappingURL=model.d.ts.map