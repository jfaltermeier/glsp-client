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
import { Action, ElementAndBounds, Point } from "sprotty/lib";
export declare class CreateNodeOperationAction implements Action {
    readonly elementTypeId: string;
    readonly location?: Point | undefined;
    readonly containerId?: string | undefined;
    readonly kind = "createNode";
    constructor(elementTypeId: string, location?: Point | undefined, containerId?: string | undefined);
}
export declare class CreateConnectionOperationAction implements Action {
    readonly elementTypeId: string;
    readonly sourceElementId?: string | undefined;
    readonly targetElementId?: string | undefined;
    readonly kind = "createConnection";
    constructor(elementTypeId: string, sourceElementId?: string | undefined, targetElementId?: string | undefined);
}
export declare class DeleteElementOperationAction implements Action {
    readonly elementIds: string[];
    kind: string;
    constructor(elementIds: string[]);
}
export declare class ChangeBoundsOperationAction implements Action {
    newBounds: ElementAndBounds[];
    readonly kind = "changeBounds";
    constructor(newBounds: ElementAndBounds[]);
}
export declare class ChangeContainerOperation implements Action {
    readonly elementId: string;
    readonly targetContainerId: string;
    readonly location?: string | undefined;
    readonly kind = "changeContainer";
    constructor(elementId: string, targetContainerId: string, location?: string | undefined);
}
export declare class ReconnectConnectionOperationAction implements Action {
    readonly connectionElementId: string;
    readonly sourceElementId: string;
    readonly targetElementId: string;
    readonly kind = "reconnectConnection";
    constructor(connectionElementId: string, sourceElementId: string, targetElementId: string);
}
export declare class ChangeRoutingPointsOperation implements Action {
    newRoutingPoints: ElementAndRoutingPoints[];
    readonly kind = "changeRoutingPoints";
    constructor(newRoutingPoints: ElementAndRoutingPoints[]);
}
export declare class GenericOperationAction implements Action {
    readonly id: string;
    readonly elementId?: string | undefined;
    readonly location?: Point | undefined;
    readonly kind = "generic";
    constructor(id: string, elementId?: string | undefined, location?: Point | undefined);
}
export interface ElementAndRoutingPoints {
    elementId: string;
    newRoutingPoints?: Point[];
}
//# sourceMappingURL=operation-actions.d.ts.map