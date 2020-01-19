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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
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
var array_utils_1 = require("../../utils/array-utils");
var action_definitions_1 = require("./action-definitions");
var SelectionService = /** @class */ (function () {
    function SelectionService(selectionListeners) {
        if (selectionListeners === void 0) { selectionListeners = []; }
        this.selectionListeners = selectionListeners;
        this.selectedElementIDs = new Set();
    }
    SelectionService.prototype.register = function (selectionListener) {
        array_utils_1.distinctAdd(this.selectionListeners, selectionListener);
    };
    SelectionService.prototype.deregister = function (selectionListener) {
        array_utils_1.remove(this.selectionListeners, selectionListener);
    };
    SelectionService.prototype.modelRootChanged = function (root) {
        this.updateSelection(root, [], []);
    };
    SelectionService.prototype.updateSelection = function (root, select, deselect) {
        var e_1, _a, e_2, _b, e_3, _c;
        if (root === undefined && select.length === 0 && deselect.length === 0) {
            return;
        }
        // update root
        this.root = root;
        // update selected element IDs and collect deselected elements
        var deselected = __spread(this.selectedElementIDs).filter(function (selected) { return deselect.indexOf(selected) !== -1; });
        try {
            for (var deselected_1 = __values(deselected), deselected_1_1 = deselected_1.next(); !deselected_1_1.done; deselected_1_1 = deselected_1.next()) {
                var id = deselected_1_1.value;
                this.selectedElementIDs.delete(id);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (deselected_1_1 && !deselected_1_1.done && (_a = deselected_1.return)) _a.call(deselected_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        try {
            for (var select_1 = __values(select), select_1_1 = select_1.next(); !select_1_1.done; select_1_1 = select_1.next()) {
                var id = select_1_1.value;
                this.selectedElementIDs.add(id);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (select_1_1 && !select_1_1.done && (_b = select_1.return)) _b.call(select_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        try {
            // see if selected elements still exist in the updated root
            for (var _d = __values(this.selectedElementIDs), _e = _d.next(); !_e.done; _e = _d.next()) {
                var id = _e.value;
                var element = root.index.getById(id);
                if (element === undefined) {
                    this.selectedElementIDs.delete(id);
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_c = _d.return)) _c.call(_d);
            }
            finally { if (e_3) throw e_3.error; }
        }
        // aggregate to feedback action handling all elements as only the last feedback is restored
        this.dispatchFeedback([new action_definitions_1.SelectFeedbackAction(__spread(this.selectedElementIDs), deselected)]);
        // notify listeners after the feedback action
        this.notifyListeners(this.root, this.selectedElementIDs);
    };
    SelectionService.prototype.dispatchFeedback = function (actions) {
        this.feedbackDispatcher.registerFeedback(this, actions);
    };
    SelectionService.prototype.notifyListeners = function (root, selectedElementIDs) {
        this.selectionListeners.forEach(function (listener) { return listener.selectionChanged(root, Array.from(selectedElementIDs)); });
    };
    /**
     * QUERY METHODS
     */
    SelectionService.prototype.getSelectedElementIDs = function () {
        return this.selectedElementIDs;
    };
    SelectionService.prototype.hasSelectedElements = function () {
        return this.selectedElementIDs.size > 0;
    };
    SelectionService.prototype.isSingleSelection = function () {
        return this.selectedElementIDs.size === 1;
    };
    SelectionService.prototype.isMultiSelection = function () {
        return this.selectedElementIDs.size > 1;
    };
    __decorate([
        inversify_1.inject(types_1.GLSP_TYPES.IFeedbackActionDispatcher),
        __metadata("design:type", Object)
    ], SelectionService.prototype, "feedbackDispatcher", void 0);
    __decorate([
        inversify_1.inject(sprotty_1.TYPES.ILogger),
        __metadata("design:type", Object)
    ], SelectionService.prototype, "logger", void 0);
    SelectionService = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.multiInject(types_1.GLSP_TYPES.SelectionListener)), __param(0, inversify_1.optional()),
        __metadata("design:paramtypes", [Array])
    ], SelectionService);
    return SelectionService;
}());
exports.SelectionService = SelectionService;
//# sourceMappingURL=selection-service.js.map