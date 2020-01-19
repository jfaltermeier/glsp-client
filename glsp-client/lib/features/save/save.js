"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var lib_1 = require("sprotty/lib");
var keyboard_1 = require("sprotty/lib/utils/keyboard");
var SaveModelAction = /** @class */ (function () {
    function SaveModelAction() {
        this.kind = SaveModelAction.KIND;
    }
    SaveModelAction.KIND = "saveModel";
    return SaveModelAction;
}());
exports.SaveModelAction = SaveModelAction;
var SaveModelKeyboardListener = /** @class */ (function (_super) {
    __extends(SaveModelKeyboardListener, _super);
    function SaveModelKeyboardListener() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SaveModelKeyboardListener.prototype.keyDown = function (element, event) {
        if (keyboard_1.matchesKeystroke(event, 'KeyS', 'ctrlCmd')) {
            return [new SaveModelAction()];
        }
        return [];
    };
    return SaveModelKeyboardListener;
}(lib_1.KeyListener));
exports.SaveModelKeyboardListener = SaveModelKeyboardListener;
//# sourceMappingURL=save.js.map