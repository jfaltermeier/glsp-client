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
var FeedbackCommand = /** @class */ (function (_super) {
    __extends(FeedbackCommand, _super);
    function FeedbackCommand() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // used by the `FeedbackAwareUpdateModelCommand`
        _this.priority = 0;
        return _this;
    }
    FeedbackCommand.prototype.undo = function (context) {
        return context.root;
    };
    FeedbackCommand.prototype.redo = function (context) {
        return context.root;
    };
    return FeedbackCommand;
}(lib_1.Command));
exports.FeedbackCommand = FeedbackCommand;
//# sourceMappingURL=model.js.map