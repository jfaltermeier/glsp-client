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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var model_1 = require("../rank/model");
var RankingMouseTool = /** @class */ (function (_super) {
    __extends(RankingMouseTool, _super);
    function RankingMouseTool(mouseListeners) {
        if (mouseListeners === void 0) { mouseListeners = []; }
        var _this = _super.call(this, mouseListeners) || this;
        _this.mouseListeners = mouseListeners;
        _this.rankedMouseListeners = groupBy(mouseListeners, function (listener) { return model_1.getRank(listener); });
        return _this;
    }
    RankingMouseTool.prototype.register = function (mouseListener) {
        _super.prototype.register.call(this, mouseListener);
        this.rankedMouseListeners = groupBy(this.mouseListeners, function (listener) { return model_1.getRank(listener); });
    };
    RankingMouseTool.prototype.deregister = function (mouseListener) {
        _super.prototype.deregister.call(this, mouseListener);
        this.rankedMouseListeners = groupBy(this.mouseListeners, function (listener) { return model_1.getRank(listener); });
    };
    RankingMouseTool.prototype.decorate = function (vnode, element) {
        // we need to overwrite the existing event handlers registered by the original mouse tool
        if (element instanceof sprotty_1.SModelRoot) {
            overwriteOn(vnode, 'mouseover', this.mouseOver.bind(this), element);
            overwriteOn(vnode, 'mouseout', this.mouseOut.bind(this), element);
            overwriteOn(vnode, 'mouseenter', this.mouseEnter.bind(this), element);
            overwriteOn(vnode, 'mouseleave', this.mouseLeave.bind(this), element);
            overwriteOn(vnode, 'mousedown', this.mouseDown.bind(this), element);
            overwriteOn(vnode, 'mouseup', this.mouseUp.bind(this), element);
            overwriteOn(vnode, 'mousemove', this.mouseMove.bind(this), element);
            overwriteOn(vnode, 'wheel', this.wheel.bind(this), element);
            overwriteOn(vnode, 'contextmenu', function (target, event) {
                event.preventDefault();
            }, element);
            overwriteOn(vnode, 'dblclick', this.doubleClick.bind(this), element);
        }
        vnode = this.mouseListeners.reduce(function (n, listener) { return listener.decorate(n, element); }, vnode);
        return vnode;
    };
    RankingMouseTool.prototype.handleEvent = function (methodName, model, event) {
        this.focusOnMouseEvent(methodName, model);
        var element = this.getTargetElement(model, event);
        if (!element) {
            return;
        }
        this.notifyListenersByRank(element, methodName, model, event);
    };
    RankingMouseTool.prototype.notifyListenersByRank = function (element, methodName, model, event) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, rank, e_1_1;
            var e_1, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 5, 6, 7]);
                        _a = __values(this.rankedMouseListeners), _b = _a.next();
                        _d.label = 1;
                    case 1:
                        if (!!_b.done) return [3 /*break*/, 4];
                        rank = _b.value;
                        return [4 /*yield*/, this.dispatchActions(rank[1], methodName, element, event)];
                    case 2:
                        _d.sent();
                        _d.label = 3;
                    case 3:
                        _b = _a.next();
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        e_1_1 = _d.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 7];
                    case 6:
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    RankingMouseTool.prototype.dispatchActions = function (mouseListeners, methodName, element, event) {
        return __awaiter(this, void 0, void 0, function () {
            var actions, actions_1, actions_1_1, actionOrPromise, e_2_1;
            var e_2, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        actions = mouseListeners
                            .map(function (listener) { return listener[methodName].apply(listener, [element, event]); })
                            .reduce(function (a, b) { return a.concat(b); });
                        if (!(actions.length > 0)) return [3 /*break*/, 9];
                        event.preventDefault();
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 7, 8, 9]);
                        actions_1 = __values(actions), actions_1_1 = actions_1.next();
                        _b.label = 2;
                    case 2:
                        if (!!actions_1_1.done) return [3 /*break*/, 6];
                        actionOrPromise = actions_1_1.value;
                        if (!sprotty_1.isAction(actionOrPromise)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.actionDispatcher.dispatch(actionOrPromise)];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        actionOrPromise.then(function (action) {
                            _this.actionDispatcher.dispatch(action);
                        });
                        _b.label = 5;
                    case 5:
                        actions_1_1 = actions_1.next();
                        return [3 /*break*/, 2];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_2_1 = _b.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (actions_1_1 && !actions_1_1.done && (_a = actions_1.return)) _a.call(actions_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    RankingMouseTool = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.multiInject(sprotty_1.TYPES.MouseListener)), __param(0, inversify_1.optional()),
        __metadata("design:paramtypes", [Array])
    ], RankingMouseTool);
    return RankingMouseTool;
}(sprotty_1.MouseTool));
exports.RankingMouseTool = RankingMouseTool;
function groupBy(array, keyFunction) {
    var unsortedMap = array.reduce(function (result, item) {
        var key = keyFunction(item);
        if (!result.has(key)) {
            result.set(key, [item]);
        }
        else {
            var entries = result.get(key);
            if (entries) {
                entries.push(item);
            }
        }
        return result;
    }, new Map());
    return new Map(__spread(unsortedMap.entries()).sort());
}
function overwriteOn(vnode, event, listener, element) {
    var val = getOn(vnode);
    // ignore any previous val[event] registrations
    val[event] = [listener, element];
}
function getOn(vnode) {
    var data = getData(vnode);
    if (!data.on)
        data.on = {};
    return data.on;
}
function getData(vnode) {
    if (!vnode.data)
        vnode.data = {};
    return vnode.data;
}
//# sourceMappingURL=mouse-tool.js.map