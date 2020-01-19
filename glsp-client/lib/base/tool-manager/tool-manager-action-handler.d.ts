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
import { interfaces } from "inversify";
import { Action, IActionHandler, ICommand, Tool, ToolManager } from "sprotty/lib";
import { SetOperationsAction } from "../../features/operation/set-operations";
export declare class GLSPToolManagerActionHandler implements IActionHandler {
    readonly toolFactory: (operationKind: string) => Tool;
    readonly toolManager: ToolManager;
    handle(action: Action): void | ICommand | Action;
    configure(action: SetOperationsAction): any;
}
export declare function isTypeAware(tool: Tool): tool is Tool & TypeAware;
export interface TypeAware {
    elementTypeId: string;
}
export declare function createToolFactory(): interfaces.FactoryCreator<Tool>;
//# sourceMappingURL=tool-manager-action-handler.d.ts.map