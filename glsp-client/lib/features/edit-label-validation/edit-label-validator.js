"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
var sprotty_1 = require("sprotty");
var glsp_action_dispatcher_1 = require("../request-response/glsp-action-dispatcher");
var ValidateLabelEditAction = /** @class */ (function () {
    function ValidateLabelEditAction(value, labelId, requestId) {
        if (requestId === void 0) { requestId = sprotty_1.generateRequestId(); }
        this.value = value;
        this.labelId = labelId;
        this.requestId = requestId;
        this.kind = ValidateLabelEditAction.KIND;
    }
    ValidateLabelEditAction.KIND = "validateLabelEdit";
    return ValidateLabelEditAction;
}());
exports.ValidateLabelEditAction = ValidateLabelEditAction;
var SetLabelEditValidationResultAction = /** @class */ (function () {
    function SetLabelEditValidationResultAction(result, responseId) {
        if (responseId === void 0) { responseId = ''; }
        this.result = result;
        this.responseId = responseId;
        this.kind = SetLabelEditValidationResultAction.KIND;
    }
    SetLabelEditValidationResultAction.KIND = "setLabelEditValidationResult";
    return SetLabelEditValidationResultAction;
}());
exports.SetLabelEditValidationResultAction = SetLabelEditValidationResultAction;
function isSetLabelEditValidationResultAction(action) {
    return action !== undefined && (action.kind === SetLabelEditValidationResultAction.KIND)
        && action.result !== undefined;
}
exports.isSetLabelEditValidationResultAction = isSetLabelEditValidationResultAction;
var ServerEditLabelValidator = /** @class */ (function () {
    function ServerEditLabelValidator() {
    }
    ServerEditLabelValidator.prototype.validate = function (value, label) {
        var _this = this;
        var action = new ValidateLabelEditAction(value, label.id);
        return this.actionDispatcher.requestUntil(action).then(function (response) { return _this.getValidationResultFromResponse(response); });
    };
    ServerEditLabelValidator.prototype.getValidationResultFromResponse = function (action) {
        if (isSetLabelEditValidationResultAction(action)) {
            return action.result;
        }
        return { severity: 'ok' };
    };
    __decorate([
        inversify_1.inject(sprotty_1.TYPES.IActionDispatcher),
        __metadata("design:type", glsp_action_dispatcher_1.GLSPActionDispatcher)
    ], ServerEditLabelValidator.prototype, "actionDispatcher", void 0);
    ServerEditLabelValidator = __decorate([
        inversify_1.injectable()
    ], ServerEditLabelValidator);
    return ServerEditLabelValidator;
}());
exports.ServerEditLabelValidator = ServerEditLabelValidator;
var BalloonLabelValidationDecorator = /** @class */ (function () {
    function BalloonLabelValidationDecorator() {
    }
    BalloonLabelValidationDecorator.prototype.decorate = function (input, result) {
        var containerElement = input.parentElement;
        if (!containerElement) {
            return;
        }
        if (result.message) {
            containerElement.setAttribute('data-balloon', result.message);
            containerElement.setAttribute('data-balloon-pos', 'up-left');
            containerElement.setAttribute('data-balloon-visible', 'true');
        }
        switch (result.severity) {
            case 'ok':
                containerElement.classList.add('validation-ok');
                break;
            case 'warning':
                containerElement.classList.add('validation-warning');
                break;
            case 'error':
                containerElement.classList.add('validation-error');
                break;
        }
    };
    BalloonLabelValidationDecorator.prototype.dispose = function (input) {
        var containerElement = input.parentElement;
        if (containerElement) {
            containerElement.removeAttribute('data-balloon');
            containerElement.removeAttribute('data-balloon-pos');
            containerElement.removeAttribute('data-balloon-visible');
            containerElement.classList.remove('validation-ok', 'validation-warning', 'validation-error');
        }
    };
    BalloonLabelValidationDecorator = __decorate([
        inversify_1.injectable()
    ], BalloonLabelValidationDecorator);
    return BalloonLabelValidationDecorator;
}());
exports.BalloonLabelValidationDecorator = BalloonLabelValidationDecorator;
//# sourceMappingURL=edit-label-validator.js.map