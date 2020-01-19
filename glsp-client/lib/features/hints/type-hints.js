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
var types_1 = require("../../types");
var model_1 = require("../change-bounds/model");
var model_2 = require("../reconnect/model");
var model_3 = require("../tool-feedback/model");
var model_4 = require("./model");
var request_type_hints_action_1 = require("./request-type-hints-action");
var TypeHint = /** @class */ (function () {
    function TypeHint() {
    }
    return TypeHint;
}());
exports.TypeHint = TypeHint;
var ShapeTypeHint = /** @class */ (function (_super) {
    __extends(ShapeTypeHint, _super);
    function ShapeTypeHint() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ShapeTypeHint;
}(TypeHint));
exports.ShapeTypeHint = ShapeTypeHint;
var EdgeTypeHint = /** @class */ (function (_super) {
    __extends(EdgeTypeHint, _super);
    function EdgeTypeHint() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EdgeTypeHint.prototype.isAllowedSource = function (input) {
        var type = getElementTypeId(input);
        return this.sourceElementTypeIds.includes(type);
    };
    EdgeTypeHint.prototype.isAllowedTarget = function (input) {
        var type = getElementTypeId(input);
        return this.targetElementTypeIds.includes(type);
    };
    return EdgeTypeHint;
}(TypeHint));
exports.EdgeTypeHint = EdgeTypeHint;
var ApplyTypeHintsAction = /** @class */ (function () {
    function ApplyTypeHintsAction() {
        this.kind = ApplyTypeHintsCommand.KIND;
    }
    ApplyTypeHintsAction = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], ApplyTypeHintsAction);
    return ApplyTypeHintsAction;
}());
exports.ApplyTypeHintsAction = ApplyTypeHintsAction;
var ApplyTypeHintsCommand = /** @class */ (function (_super) {
    __extends(ApplyTypeHintsCommand, _super);
    function ApplyTypeHintsCommand(action, typeHintProvider) {
        var _this = _super.call(this) || this;
        _this.action = action;
        _this.typeHintProvider = typeHintProvider;
        _this.priority = 10;
        return _this;
    }
    ApplyTypeHintsCommand.prototype.execute = function (context) {
        var _this = this;
        context.root.index.all()
            .forEach(function (element) {
            if (element instanceof lib_1.SShapeElement || element instanceof lib_1.SModelRoot) {
                _this.applyShapeTypeHint(element);
            }
            else if (element instanceof lib_1.SEdge) {
                return _this.applyEdgeTypeHint(element);
            }
        });
        return context.root;
    };
    ApplyTypeHintsCommand.prototype.applyEdgeTypeHint = function (element) {
        var hint = this.typeHintProvider.getEdgeTypeHint(element);
        if (hint && isModifiableFetureSet(element.features)) {
            addOrRemove(element.features, lib_1.deletableFeature, hint.deletable);
            addOrRemove(element.features, lib_1.editFeature, hint.routable);
            addOrRemove(element.features, model_2.reconnectFeature, hint.repositionable);
        }
    };
    ApplyTypeHintsCommand.prototype.applyShapeTypeHint = function (element) {
        var hint = this.typeHintProvider.getShapeTypeHint(element);
        if (hint && isModifiableFetureSet(element.features)) {
            addOrRemove(element.features, lib_1.deletableFeature, hint.deletable);
            addOrRemove(element.features, lib_1.moveFeature, hint.repositionable);
            addOrRemove(element.features, model_1.resizeFeature, hint.resizable);
            addOrRemove(element.features, model_4.reparentFeature, hint.reparentable);
            addOrRemove(element.features, model_4.containerFeature, true);
            var containable = createContainable(hint);
            Object.assign(element, containable);
            addOrRemove(element.features, lib_1.connectableFeature, true);
            var validSourceEdges = this.typeHintProvider.getValidEdgeElementTypes(element, "source");
            var validTargetEdges = this.typeHintProvider.getValidEdgeElementTypes(element, "target");
            var connectable = createConnectable(validSourceEdges, validTargetEdges);
            Object.assign(element, connectable);
        }
    };
    ApplyTypeHintsCommand.KIND = "applyTypeHints";
    ApplyTypeHintsCommand = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(lib_1.TYPES.Action)),
        __param(1, inversify_1.inject(types_1.GLSP_TYPES.ITypeHintProvider)),
        __metadata("design:paramtypes", [ApplyTypeHintsAction, Object])
    ], ApplyTypeHintsCommand);
    return ApplyTypeHintsCommand;
}(model_3.FeedbackCommand));
exports.ApplyTypeHintsCommand = ApplyTypeHintsCommand;
function createConnectable(validSourceEdges, validTargetEdges) {
    return {
        canConnect: function (routable, role) {
            return role === "source" ?
                validSourceEdges.includes(routable.type) :
                validTargetEdges.includes(routable.type);
        }
    };
}
function createContainable(hint) {
    return {
        isContainableElement: function (element) {
            return hint.containableElementTypeIds ?
                hint.containableElementTypeIds.includes(getElementTypeId(element)) :
                false;
        }
    };
}
function addOrRemove(features, feature, add) {
    if (add && !features.has(feature)) {
        features.add(feature);
    }
    else if (!add && features.has(feature)) {
        features.delete(feature);
    }
}
function isModifiableFetureSet(featureSet) {
    return featureSet !== undefined && featureSet instanceof Set;
}
var TypeHintProvider = /** @class */ (function () {
    function TypeHintProvider() {
        this.shapeHints = new Map;
        this.edgeHints = new Map;
    }
    TypeHintProvider.prototype.handle = function (action) {
        var _this = this;
        if (request_type_hints_action_1.isSetTypeHintsAction(action)) {
            action.shapeHints.forEach(function (hint) { return _this.shapeHints.set(hint.elementTypeId, hint); });
            action.edgeHints.forEach(function (hint) { return _this.edgeHints.set(hint.elementTypeId, hint); });
            this.feedbackActionDispatcher.registerFeedback(this, [new ApplyTypeHintsAction()]);
        }
    };
    TypeHintProvider.prototype.getValidEdgeElementTypes = function (input, role) {
        var elementTypeId = getElementTypeId(input);
        if (role === "source") {
            return Array.from(Array.from(this.edgeHints.values())
                .filter(function (hint) { return hint.sourceElementTypeIds.includes(elementTypeId); })
                .map(function (hint) { return hint.elementTypeId; }));
        }
        else {
            return Array.from(Array.from(this.edgeHints.values())
                .filter(function (hint) { return hint.targetElementTypeIds.includes(elementTypeId); })
                .map(function (hint) { return hint.elementTypeId; }));
        }
    };
    TypeHintProvider.prototype.getShapeTypeHint = function (input) {
        var type = getElementTypeId(input);
        return this.shapeHints.get(type);
    };
    TypeHintProvider.prototype.getEdgeTypeHint = function (input) {
        var type = getElementTypeId(input);
        return this.edgeHints.get(type);
    };
    __decorate([
        inversify_1.inject(types_1.GLSP_TYPES.IFeedbackActionDispatcher),
        __metadata("design:type", Object)
    ], TypeHintProvider.prototype, "feedbackActionDispatcher", void 0);
    TypeHintProvider = __decorate([
        inversify_1.injectable()
    ], TypeHintProvider);
    return TypeHintProvider;
}());
exports.TypeHintProvider = TypeHintProvider;
function getElementTypeId(input) {
    if (typeof input === 'string') {
        return input;
    }
    else {
        return input["type"];
    }
}
exports.getElementTypeId = getElementTypeId;
//# sourceMappingURL=type-hints.js.map