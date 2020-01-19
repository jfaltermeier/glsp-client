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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
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
var types_1 = require("../../types");
var marker_1 = require("../../utils/marker");
var model_1 = require("../tool-feedback/model");
/**
* Action to retrieve markers for a model
*/
var RequestMarkersAction = /** @class */ (function () {
    function RequestMarkersAction(elementsIDs) {
        if (elementsIDs === void 0) { elementsIDs = []; }
        this.elementsIDs = elementsIDs;
        this.kind = RequestMarkersAction.KIND;
    }
    RequestMarkersAction.KIND = 'requestMarkers';
    return RequestMarkersAction;
}());
exports.RequestMarkersAction = RequestMarkersAction;
/**
 * Feedback emitter sending actions for visualizing model validation feedback and
 * re-establishing this feedback visualization after the model has been updated.
 */
var ValidationFeedbackEmitter = /** @class */ (function () {
    function ValidationFeedbackEmitter() {
    }
    /**
     * Register the action that should be emitted for visualizing validation feedback.
     * @param action the action that should be emitted when the model is updated and that will visualize the model validation feedback.
     */
    ValidationFeedbackEmitter.prototype.registerValidationFeedbackAction = function (action) {
        // De-register old action responsible for applying markers and re-applying them when the model is updated
        this.feedbackActionDispatcher.deregisterFeedback(this, []);
        // Clear existing markers
        if (this.registeredAction !== undefined) {
            var clearMarkersAction_1 = new ClearMarkersAction(this.registeredAction.markers);
            this.actionDispatcher().then(function (dispatcher) { return dispatcher.dispatch(clearMarkersAction_1); });
        }
        // Register new action responsible for applying markers and re-applying them when the model is updated
        this.feedbackActionDispatcher.registerFeedback(this, [action]);
        this.registeredAction = action;
    };
    __decorate([
        inversify_1.inject(types_1.GLSP_TYPES.IFeedbackActionDispatcher),
        __metadata("design:type", Object)
    ], ValidationFeedbackEmitter.prototype, "feedbackActionDispatcher", void 0);
    __decorate([
        inversify_1.inject(lib_1.TYPES.IActionDispatcherProvider),
        __metadata("design:type", Function)
    ], ValidationFeedbackEmitter.prototype, "actionDispatcher", void 0);
    ValidationFeedbackEmitter = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], ValidationFeedbackEmitter);
    return ValidationFeedbackEmitter;
}());
exports.ValidationFeedbackEmitter = ValidationFeedbackEmitter;
/**
 * Action to set markers for a model
 */
var SetMarkersAction = /** @class */ (function () {
    function SetMarkersAction(markers) {
        this.markers = markers;
        this.kind = SetMarkersCommand.KIND;
    }
    return SetMarkersAction;
}());
exports.SetMarkersAction = SetMarkersAction;
/**
 * Command for handling `SetMarkersAction`
 */
var SetMarkersCommand = /** @class */ (function (_super) {
    __extends(SetMarkersCommand, _super);
    function SetMarkersCommand(action) {
        var _this = _super.call(this) || this;
        _this.action = action;
        return _this;
    }
    SetMarkersCommand.prototype.execute = function (context) {
        var markers = this.action.markers;
        var applyMarkersAction = new ApplyMarkersAction(markers);
        this.validationFeedbackEmitter.registerValidationFeedbackAction(applyMarkersAction);
        return context.root;
    };
    SetMarkersCommand.prototype.undo = function (context) {
        return context.root;
    };
    SetMarkersCommand.prototype.redo = function (context) {
        return this.execute(context);
    };
    SetMarkersCommand.KIND = 'setMarkers';
    __decorate([
        inversify_1.inject(ValidationFeedbackEmitter),
        __metadata("design:type", ValidationFeedbackEmitter)
    ], SetMarkersCommand.prototype, "validationFeedbackEmitter", void 0);
    SetMarkersCommand = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(lib_1.TYPES.Action)),
        __metadata("design:paramtypes", [SetMarkersAction])
    ], SetMarkersCommand);
    return SetMarkersCommand;
}(lib_1.Command));
exports.SetMarkersCommand = SetMarkersCommand;
/**
 * Action for applying makers to a model
 */
var ApplyMarkersAction = /** @class */ (function () {
    function ApplyMarkersAction(markers) {
        this.markers = markers;
        this.kind = ApplyMarkersCommand.KIND;
    }
    ApplyMarkersAction = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [Array])
    ], ApplyMarkersAction);
    return ApplyMarkersAction;
}());
exports.ApplyMarkersAction = ApplyMarkersAction;
/**
 * Command for handling `ApplyMarkersAction`
 */
var ApplyMarkersCommand = /** @class */ (function (_super) {
    __extends(ApplyMarkersCommand, _super);
    function ApplyMarkersCommand(action) {
        var _this = _super.call(this) || this;
        _this.action = action;
        _this.priority = 0;
        return _this;
    }
    ApplyMarkersCommand.prototype.execute = function (context) {
        var e_1, _a;
        var markers = this.action.markers;
        try {
            for (var markers_1 = __values(markers), markers_1_1 = markers_1.next(); !markers_1_1.done; markers_1_1 = markers_1.next()) {
                var marker = markers_1_1.value;
                var modelElement = context.root.index.getById(marker.elementId);
                if (modelElement instanceof lib_1.SParentElement) {
                    var issueMarker = getOrCreateSIssueMarker(modelElement);
                    var issue = createSIssue(marker);
                    issueMarker.issues.push(issue);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (markers_1_1 && !markers_1_1.done && (_a = markers_1.return)) _a.call(markers_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return context.root;
    };
    ApplyMarkersCommand.prototype.undo = function (context) {
        return context.root;
    };
    ApplyMarkersCommand.prototype.redo = function (context) {
        return this.execute(context);
    };
    ApplyMarkersCommand.KIND = "applyMarkers";
    ApplyMarkersCommand = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(lib_1.TYPES.Action)),
        __metadata("design:paramtypes", [ApplyMarkersAction])
    ], ApplyMarkersCommand);
    return ApplyMarkersCommand;
}(model_1.FeedbackCommand));
exports.ApplyMarkersCommand = ApplyMarkersCommand;
/**
 * Retrieves the `SIssueMarker` contained by the provided model element as
 * direct child or a newly instantiated `SIssueMarker` if no child
 * `SIssueMarker` exists.
 * @param modelElement for which the `SIssueMarker` should be retrieved or created.
 * @returns the child `SIssueMarker` or a new `SIssueMarker` if no such child exists.
 */
function getOrCreateSIssueMarker(modelElement) {
    var issueMarker;
    issueMarker = getSIssueMarker(modelElement);
    if (issueMarker === undefined) {
        issueMarker = new lib_1.SIssueMarker();
        issueMarker.type = "marker";
        issueMarker.issues = new Array();
        modelElement.add(issueMarker);
    }
    return issueMarker;
}
/**
 * Retrieves the `SIssueMarker` contained by the provided model element as
 * direct child or `undefined` if such an `SIssueMarker` does not exist.
 * @param modelElement for which the `SIssueMarker` should be retrieved.
 * @returns the child `SIssueMarker` or `undefined` if no such child exists.
 */
function getSIssueMarker(modelElement) {
    var e_2, _a;
    var issueMarker;
    try {
        for (var _b = __values(modelElement.children), _c = _b.next(); !_c.done; _c = _b.next()) {
            var child = _c.value;
            if (child instanceof lib_1.SIssueMarker) {
                issueMarker = child;
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return issueMarker;
}
/**
 * Creates an `SIssue` with `severity` and `message` set according to
 * the `kind` and `description` of the provided `Marker`.
 * @param marker `Marker` for that an `SIssue` should be created.
 * @returns the created `SIssue`.
 */
function createSIssue(marker) {
    var issue = new lib_1.SIssue();
    issue.message = marker.description;
    switch (marker.kind) {
        case marker_1.MarkerKind.ERROR: {
            issue.severity = 'error';
            break;
        }
        case marker_1.MarkerKind.INFO: {
            issue.severity = 'info';
            break;
        }
        case marker_1.MarkerKind.WARNING: {
            issue.severity = 'warning';
            break;
        }
    }
    return issue;
}
/**
 * Action for clearing makers of a model
 */
var ClearMarkersAction = /** @class */ (function () {
    function ClearMarkersAction(markers) {
        this.markers = markers;
        this.kind = ClearMarkersCommand.KIND;
    }
    ClearMarkersAction = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [Array])
    ], ClearMarkersAction);
    return ClearMarkersAction;
}());
exports.ClearMarkersAction = ClearMarkersAction;
/**
 * Command for handling `ClearMarkersAction`
 */
var ClearMarkersCommand = /** @class */ (function (_super) {
    __extends(ClearMarkersCommand, _super);
    function ClearMarkersCommand(action) {
        var _this = _super.call(this) || this;
        _this.action = action;
        return _this;
    }
    ClearMarkersCommand.prototype.execute = function (context) {
        var e_3, _a;
        var markers = this.action.markers;
        try {
            for (var markers_2 = __values(markers), markers_2_1 = markers_2.next(); !markers_2_1.done; markers_2_1 = markers_2.next()) {
                var marker = markers_2_1.value;
                var modelElement = context.root.index.getById(marker.elementId);
                if (modelElement instanceof lib_1.SParentElement) {
                    var issueMarker = getSIssueMarker(modelElement);
                    if (issueMarker !== undefined) {
                        for (var index = 0; index < issueMarker.issues.length; ++index) {
                            var issue = issueMarker.issues[index];
                            if (issue.message === marker.description) {
                                issueMarker.issues.splice(index--, 1);
                            }
                        }
                        if (issueMarker.issues.length === 0) {
                            modelElement.remove(issueMarker);
                        }
                    }
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (markers_2_1 && !markers_2_1.done && (_a = markers_2.return)) _a.call(markers_2);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return context.root;
    };
    ClearMarkersCommand.prototype.undo = function (context) {
        return context.root;
    };
    ClearMarkersCommand.prototype.redo = function (context) {
        return this.execute(context);
    };
    ClearMarkersCommand.KIND = "clearMarkers";
    ClearMarkersCommand = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(lib_1.TYPES.Action)),
        __metadata("design:paramtypes", [ClearMarkersAction])
    ], ClearMarkersCommand);
    return ClearMarkersCommand;
}(lib_1.Command));
exports.ClearMarkersCommand = ClearMarkersCommand;
//# sourceMappingURL=validate.js.map