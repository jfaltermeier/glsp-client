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
import { Action, LabeledAction, Point, RequestAction, ResponseAction } from "sprotty/lib";
export declare namespace ContextActions {
    const UI_CONTROL_KEY = "ui-control";
}
export declare class RequestContextActions implements RequestAction<SetContextActions> {
    readonly selectedElementIds: string[];
    readonly lastMousePosition?: Point | undefined;
    readonly args?: {
        [key: string]: string | number | boolean;
    } | undefined;
    readonly requestId: string;
    static readonly KIND = "requestContextActions";
    kind: string;
    constructor(selectedElementIds?: string[], lastMousePosition?: Point | undefined, args?: {
        [key: string]: string | number | boolean;
    } | undefined, requestId?: string);
}
export declare class SetContextActions implements ResponseAction {
    readonly actions: LabeledAction[];
    readonly responseId: string;
    static readonly KIND = "setContextActions";
    kind: string;
    constructor(actions: LabeledAction[], responseId?: string);
}
export declare function isSetContextActionsAction(action: Action): action is SetContextActions;
//# sourceMappingURL=action-definitions.d.ts.map