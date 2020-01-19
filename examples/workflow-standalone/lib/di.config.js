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
var lib_1 = require("@eclipse-glsp-examples/workflow-sprotty/lib");
var lib_2 = require("@eclipse-glsp/client/lib");
var lib_3 = require("sprotty/lib");
function createContainer() {
    var container = lib_1.createWorkflowDiagramContainer('sprotty');
    container.bind(lib_3.TYPES.ModelSource).to(lib_2.GLSPWebsocketDiagramServer).inSingletonScope();
    container.rebind(lib_3.TYPES.ILogger).to(lib_3.ConsoleLogger).inSingletonScope();
    container.rebind(lib_3.TYPES.LogLevel).toConstantValue(lib_3.LogLevel.warn);
    lib_2.registerDefaultTools(container);
    return container;
}
exports.default = createContainer;
//# sourceMappingURL=di.config.js.map