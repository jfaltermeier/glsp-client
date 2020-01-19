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
import { Action } from "sprotty/lib";
export declare namespace OperationKind {
    const CREATE_NODE = "createNode";
    const CREATE_CONNECTION = "createConnection";
    const RECONNECT_CONNECTION = "reconnectConnection";
    const CHANGE_ROUTING_POINTS = "changeRoutingPoints";
    const DELETE_ELEMENT = "deleteElement";
    const CHANGE_BOUNDS = "changeBounds";
    const CHANGE_CONTAINER = "changeContainer";
    const GENERIC = "generic";
}
export interface Operation {
    readonly elementTypeId?: string;
    readonly label: string;
    readonly operationKind: string;
    readonly group?: Group;
}
export interface Group {
    readonly id: string;
    readonly label: string;
    readonly parentGroup?: Group;
}
export declare const UNGROUPED: Group;
export declare function parentGroup(operation: Operation): Group;
export declare class RequestOperationsAction implements Action {
    static readonly KIND = "requestOperations";
    readonly kind = "requestOperations";
    constructor();
}
export declare class SetOperationsAction implements Action {
    readonly operations: Operation[];
    static readonly KIND = "setOperations";
    readonly kind = "setOperations";
    constructor(operations: Operation[]);
}
export declare function isSetOperationsAction(action: Action): action is SetOperationsAction;
export declare function deriveOperationId(operationKind: string, elementTypeId?: string): string;
//# sourceMappingURL=set-operations.d.ts.map