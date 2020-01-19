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
import { Action, MouseListener, SModelElement } from "sprotty/lib";
export declare class ExecuteServerCommandAction implements Action {
    readonly commandId: String;
    readonly options?: {
        [key: string]: string;
    } | undefined;
    static readonly KIND = "executeServerCommand";
    kind: string;
    constructor(commandId: String, options?: {
        [key: string]: string;
    } | undefined);
}
export declare class ExecuteCommandMouseListener extends MouseListener {
    doubleClick(target: SModelElement, event: WheelEvent): (Action | Promise<Action>)[];
}
//# sourceMappingURL=execute-command.d.ts.map