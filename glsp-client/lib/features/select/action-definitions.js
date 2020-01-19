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
var sprotty_1 = require("sprotty");
var types_1 = require("../../types");
var selection_service_1 = require("./selection-service");
var SelectFeedbackAction = /** @class */ (function () {
    function SelectFeedbackAction(selectedElementsIDs, deselectedElementsIDs) {
        if (selectedElementsIDs === void 0) { selectedElementsIDs = []; }
        if (deselectedElementsIDs === void 0) { deselectedElementsIDs = []; }
        this.selectedElementsIDs = selectedElementsIDs;
        this.deselectedElementsIDs = deselectedElementsIDs;
        this.kind = SelectFeedbackCommand.KIND;
    }
    return SelectFeedbackAction;
}());
exports.SelectFeedbackAction = SelectFeedbackAction;
var SelectAllFeedbackAction = /** @class */ (function () {
    /**
     * If `select` is true, all elements are selected, othewise they are deselected.
     */
    function SelectAllFeedbackAction(select) {
        if (select === void 0) { select = true; }
        this.select = select;
        this.kind = SelectAllFeedbackCommand.KIND;
    }
    return SelectAllFeedbackAction;
}());
exports.SelectAllFeedbackAction = SelectAllFeedbackAction;
var SelectFeedbackCommand = /** @class */ (function (_super) {
    __extends(SelectFeedbackCommand, _super);
    function SelectFeedbackCommand(action) {
        var _this = _super.call(this) || this;
        _this.action = action;
        _this.sprottySelectCommand = new sprotty_1.SelectCommand(action);
        return _this;
    }
    SelectFeedbackCommand.prototype.execute = function (context) {
        return this.sprottySelectCommand.execute(context);
    };
    SelectFeedbackCommand.prototype.undo = function (context) {
        return this.sprottySelectCommand.undo(context);
    };
    SelectFeedbackCommand.prototype.redo = function (context) {
        return this.sprottySelectCommand.redo(context);
    };
    SelectFeedbackCommand.KIND = 'elementSelectedFeedback';
    SelectFeedbackCommand = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(sprotty_1.TYPES.Action)),
        __metadata("design:paramtypes", [SelectFeedbackAction])
    ], SelectFeedbackCommand);
    return SelectFeedbackCommand;
}(sprotty_1.Command));
exports.SelectFeedbackCommand = SelectFeedbackCommand;
var SelectAllFeedbackCommand = /** @class */ (function (_super) {
    __extends(SelectAllFeedbackCommand, _super);
    function SelectAllFeedbackCommand(action) {
        var _this = _super.call(this) || this;
        _this.action = action;
        _this.sprottySelectAllCommand = new sprotty_1.SelectAllCommand(action);
        return _this;
    }
    SelectAllFeedbackCommand.prototype.execute = function (context) {
        return this.sprottySelectAllCommand.execute(context);
    };
    SelectAllFeedbackCommand.prototype.undo = function (context) {
        return this.sprottySelectAllCommand.undo(context);
    };
    SelectAllFeedbackCommand.prototype.redo = function (context) {
        return this.sprottySelectAllCommand.redo(context);
    };
    SelectAllFeedbackCommand.KIND = 'allSelectedFeedback';
    SelectAllFeedbackCommand = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(sprotty_1.TYPES.Action)),
        __metadata("design:paramtypes", [SelectAllFeedbackAction])
    ], SelectAllFeedbackCommand);
    return SelectAllFeedbackCommand;
}(sprotty_1.Command));
exports.SelectAllFeedbackCommand = SelectAllFeedbackCommand;
var SelectCommand = /** @class */ (function (_super) {
    __extends(SelectCommand, _super);
    function SelectCommand(action, selectionService) {
        var _this = _super.call(this) || this;
        _this.action = action;
        _this.selectionService = selectionService;
        _this.selected = [];
        _this.deselected = [];
        return _this;
    }
    SelectCommand.prototype.execute = function (context) {
        var _this = this;
        var model = context.root;
        this.action.selectedElementsIDs.forEach(function (id) {
            var element = model.index.getById(id);
            if (element instanceof sprotty_1.SChildElement && sprotty_1.isSelectable(element)) {
                _this.selected.push(element);
            }
        });
        this.action.deselectedElementsIDs.forEach(function (id) {
            var element = model.index.getById(id);
            if (element instanceof sprotty_1.SChildElement && sprotty_1.isSelectable(element)) {
                _this.deselected.push(element);
            }
        });
        return this.redo(context);
    };
    SelectCommand.prototype.undo = function (context) {
        var select = this.deselected.map(function (element) { return element.id; });
        var deselect = this.selected.map(function (element) { return element.id; });
        this.selectionService.updateSelection(context.root, select, deselect);
        return context.root;
    };
    SelectCommand.prototype.redo = function (context) {
        var select = this.selected.map(function (element) { return element.id; });
        var deselect = this.deselected.map(function (element) { return element.id; });
        this.selectionService.updateSelection(context.root, select, deselect);
        return context.root;
    };
    SelectCommand.KIND = sprotty_1.SelectCommand.KIND;
    SelectCommand = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(sprotty_1.TYPES.Action)), __param(1, inversify_1.inject(types_1.GLSP_TYPES.SelectionService)),
        __metadata("design:paramtypes", [sprotty_1.SelectAction, selection_service_1.SelectionService])
    ], SelectCommand);
    return SelectCommand;
}(sprotty_1.Command));
exports.SelectCommand = SelectCommand;
var SelectAllCommand = /** @class */ (function (_super) {
    __extends(SelectAllCommand, _super);
    function SelectAllCommand(action, selectionService) {
        var _this = _super.call(this) || this;
        _this.action = action;
        _this.selectionService = selectionService;
        _this.previousSelection = new Map();
        return _this;
    }
    SelectAllCommand.prototype.execute = function (context) {
        return this.redo(context);
    };
    SelectAllCommand.prototype.undo = function (context) {
        var e_1, _a;
        var index = context.root.index;
        try {
            for (var _b = __values(this.previousSelection), _c = _b.next(); !_c.done; _c = _b.next()) {
                var previousState = _c.value;
                var element = index.getById(previousState[0]);
                if (element !== undefined && sprotty_1.isSelectable(element)) {
                    element.selected = previousState[1];
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return context.root;
    };
    SelectAllCommand.prototype.redo = function (context) {
        var selectables = [];
        this.selectAll(context.root, this.action.select, selectables);
        if (this.action.select) {
            this.selectionService.updateSelection(context.root, selectables, []);
        }
        else {
            this.selectionService.updateSelection(context.root, [], selectables);
        }
        return context.root;
    };
    SelectAllCommand.prototype.selectAll = function (element, newState, selected) {
        var e_2, _a;
        if (sprotty_1.isSelectable(element)) {
            this.previousSelection.set(element.id, element.selected);
            selected.push(element.id);
        }
        try {
            for (var _b = __values(element.children), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
                this.selectAll(child, newState, selected);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    SelectAllCommand.KIND = sprotty_1.SelectAllCommand.KIND;
    SelectAllCommand = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(sprotty_1.TYPES.Action)), __param(1, inversify_1.inject(types_1.GLSP_TYPES.SelectionService)),
        __metadata("design:paramtypes", [sprotty_1.SelectAllAction, selection_service_1.SelectionService])
    ], SelectAllCommand);
    return SelectAllCommand;
}(sprotty_1.Command));
exports.SelectAllCommand = SelectAllCommand;
//# sourceMappingURL=action-definitions.js.map