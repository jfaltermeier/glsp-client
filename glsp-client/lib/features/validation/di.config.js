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
var inversify_1 = require("inversify");
var lib_1 = require("sprotty/lib");
var validate_1 = require("./validate");
var validationModule = new inversify_1.ContainerModule(function (bind, _unbind, isBound) {
    lib_1.configureCommand({ bind: bind, isBound: isBound }, validate_1.SetMarkersCommand);
    lib_1.configureCommand({ bind: bind, isBound: isBound }, validate_1.ApplyMarkersCommand);
    lib_1.configureCommand({ bind: bind, isBound: isBound }, validate_1.ClearMarkersCommand);
    bind(validate_1.ValidationFeedbackEmitter).toSelf().inSingletonScope();
});
exports.default = validationModule;
//# sourceMappingURL=di.config.js.map