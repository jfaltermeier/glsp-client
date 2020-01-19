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
require("../../../css/command-palette.css");
var inversify_1 = require("inversify");
var lib_1 = require("sprotty/lib");
var server_command_palette_provider_1 = require("./server-command-palette-provider");
var glspCommandPaletteModule = new inversify_1.ContainerModule(function (bind) {
    bind(lib_1.TYPES.ICommandPaletteActionProvider).to(server_command_palette_provider_1.ServerCommandPaletteActionProvider);
});
exports.default = glspCommandPaletteModule;
//# sourceMappingURL=di.config.js.map