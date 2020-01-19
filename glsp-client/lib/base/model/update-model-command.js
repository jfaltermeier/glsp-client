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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var lib_1 = require("sprotty/lib");
var update_model_1 = require("sprotty/lib/features/update/update-model");
var model_1 = require("../../features/tool-feedback/model");
var types_1 = require("../../types");
/* ActionHandler that transforms a SetModelAction into an (feedback-aware) UpdateModelAction. This can be done because in sprotty
*  UpdateModel behaves the same as SetModel if no model is present yet.*/
var SetModelActionHandler = /** @class */ (function () {
    function SetModelActionHandler() {
    }
    SetModelActionHandler.prototype.handle = function (action) {
        if (isSetModelAction(action)) {
            return new update_model_1.UpdateModelAction(action.newRoot, false);
        }
    };
    SetModelActionHandler = __decorate([
        inversify_1.injectable()
    ], SetModelActionHandler);
    return SetModelActionHandler;
}());
exports.SetModelActionHandler = SetModelActionHandler;
function isSetModelAction(action) {
    return action !== undefined && (action.kind === lib_1.SetModelCommand.KIND)
        && action.newRoot !== undefined;
}
exports.isSetModelAction = isSetModelAction;
/**
 * A special`UpdateModelCommand` that retrieves all registered `actions` from the `IFeedbackActionDispatcher` (if present) and applies their feedback
 * to the `newRoot` before performing the update
 */
var FeedbackAwareUpdateModelCommand = /** @class */ (function (_super) {
    __extends(FeedbackAwareUpdateModelCommand, _super);
    function FeedbackAwareUpdateModelCommand(action, logger, feedbackActionDispatcher, actionHandlerRegistryProvider, modelRootListeners) {
        if (modelRootListeners === void 0) { modelRootListeners = []; }
        var _this = _super.call(this, action) || this;
        _this.logger = logger;
        _this.feedbackActionDispatcher = feedbackActionDispatcher;
        _this.actionHandlerRegistryProvider = actionHandlerRegistryProvider;
        _this.modelRootListeners = modelRootListeners;
        return _this;
    }
    FeedbackAwareUpdateModelCommand.prototype.performUpdate = function (oldRoot, newRoot, context) {
        var _this = this;
        if (this.feedbackActionDispatcher) {
            // Create a temporary context wich defines the `newRoot` as `root`
            // This way we do not corrupt the redo/undo behavior of the super class
            var tempContext_1 = {
                root: newRoot,
                duration: context.duration,
                logger: context.logger,
                modelChanged: context.modelChanged,
                modelFactory: context.modelFactory,
                syncer: context.syncer
            };
            this.actionHandlerRegistryProvider().then(function (registry) {
                var feedbackCommands = _this.getFeedbackCommands(registry);
                feedbackCommands.forEach(function (command) { return command.execute(tempContext_1); });
            });
        }
        this.modelRootListeners.forEach(function (listener) { return listener.modelRootChanged(newRoot); });
        return _super.prototype.performUpdate.call(this, oldRoot, newRoot, context);
    };
    FeedbackAwareUpdateModelCommand.prototype.getFeedbackCommands = function (registry) {
        var result = [];
        this.feedbackActionDispatcher.getRegisteredFeedback().forEach(function (action) {
            var handler = registry.get(action.kind).find(function (h) { return h instanceof lib_1.CommandActionHandler; });
            if (handler instanceof lib_1.CommandActionHandler) {
                result.push(handler.handle(action));
            }
        });
        // sort commands descanding by priority
        return result.sort(function (a, b) { return getPriority(b) - getPriority(a); });
    };
    FeedbackAwareUpdateModelCommand = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(lib_1.TYPES.Action)),
        __param(1, inversify_1.inject(lib_1.TYPES.ILogger)),
        __param(2, inversify_1.inject(types_1.GLSP_TYPES.IFeedbackActionDispatcher)), __param(2, inversify_1.optional()),
        __param(3, inversify_1.inject(lib_1.TYPES.ActionHandlerRegistryProvider)),
        __param(4, inversify_1.multiInject(types_1.GLSP_TYPES.SModelRootListener)), __param(4, inversify_1.optional()),
        __metadata("design:paramtypes", [update_model_1.UpdateModelAction, Object, Object, Function, Array])
    ], FeedbackAwareUpdateModelCommand);
    return FeedbackAwareUpdateModelCommand;
}(update_model_1.UpdateModelCommand));
exports.FeedbackAwareUpdateModelCommand = FeedbackAwareUpdateModelCommand;
function getPriority(command) {
    if (command instanceof model_1.FeedbackCommand) {
        return command.priority;
    }
    return 0;
}
//# sourceMappingURL=update-model-command.js.map