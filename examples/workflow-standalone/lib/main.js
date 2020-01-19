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
require("reflect-metadata");
var lib_1 = require("@eclipse-glsp/client/lib");
var path_1 = require("path");
var sprotty_1 = require("sprotty");
var di_config_1 = require("./di.config");
var container = di_config_1.default();
var websocket = new WebSocket("ws://localhost:8081/workflow");
var loc = window.location.pathname;
var currentDir = loc.substring(0, loc.lastIndexOf('/'));
var examplePath = path_1.resolve(path_1.join(currentDir, '..', 'app', 'example1.wf'));
var diagramServer = container.get(sprotty_1.TYPES.ModelSource);
diagramServer.listen(websocket);
var actionDispatcher = container.get(sprotty_1.TYPES.IActionDispatcher);
websocket.addEventListener('open', function (event) {
    actionDispatcher.dispatch(new sprotty_1.RequestModelAction({
        sourceUri: "file://" + examplePath,
        diagramType: "workflow-diagram",
    }));
    actionDispatcher.dispatch(new lib_1.RequestOperationsAction());
    actionDispatcher.dispatch(new lib_1.RequestTypeHintsAction("workflow-diagram"));
});
//# sourceMappingURL=main.js.map