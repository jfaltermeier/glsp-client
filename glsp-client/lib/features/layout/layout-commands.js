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
var keyboard_1 = require("sprotty/lib/utils/keyboard");
var types_1 = require("../../types");
var smodel_util_1 = require("../../utils/smodel-util");
var operation_actions_1 = require("../operation/operation-actions");
var selection_service_1 = require("../select/selection-service");
var ResizeDimension;
(function (ResizeDimension) {
    ResizeDimension[ResizeDimension["Width"] = 0] = "Width";
    ResizeDimension[ResizeDimension["Height"] = 1] = "Height";
    ResizeDimension[ResizeDimension["Width_And_Height"] = 2] = "Width_And_Height";
})(ResizeDimension = exports.ResizeDimension || (exports.ResizeDimension = {}));
var Reduce;
(function (Reduce) {
    function min() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return Math.min.apply(Math, __spread(values));
    }
    Reduce.min = min;
    function max() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return Math.max.apply(Math, __spread(values));
    }
    Reduce.max = max;
    function avg() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return values.reduce(function (a, b) { return a + b; }, 0) / values.length;
    }
    Reduce.avg = avg;
    function first() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return values[0];
    }
    Reduce.first = first;
    function last() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return values[values.length - 1];
    }
    Reduce.last = last;
})(Reduce = exports.Reduce || (exports.Reduce = {}));
var ResizeElementsAction = /** @class */ (function () {
    function ResizeElementsAction(
    /**
     * IDs of the elements that should be resized. If no IDs are given, the selected elements will be resized.
     */
    elementIds, 
    /**
     * Resize dimension.
     */
    dimension, 
    /**
     * Function to reduce the dimension to a target dimension value, see Reduce.* for potential functions.
     */
    reductionFunction) {
        if (elementIds === void 0) { elementIds = []; }
        if (dimension === void 0) { dimension = ResizeDimension.Width; }
        this.elementIds = elementIds;
        this.dimension = dimension;
        this.reductionFunction = reductionFunction;
        this.kind = ResizeElementsCommand.KIND;
    }
    return ResizeElementsAction;
}());
exports.ResizeElementsAction = ResizeElementsAction;
var Alignment;
(function (Alignment) {
    Alignment[Alignment["Left"] = 0] = "Left";
    Alignment[Alignment["Center"] = 1] = "Center";
    Alignment[Alignment["Right"] = 2] = "Right";
    Alignment[Alignment["Top"] = 3] = "Top";
    Alignment[Alignment["Middle"] = 4] = "Middle";
    Alignment[Alignment["Bottom"] = 5] = "Bottom";
})(Alignment = exports.Alignment || (exports.Alignment = {}));
var Select;
(function (Select) {
    function all(elements) {
        return elements;
    }
    Select.all = all;
    function first(elements) {
        return [elements[0]];
    }
    Select.first = first;
    function last(elements) {
        return [elements[elements.length - 1]];
    }
    Select.last = last;
})(Select = exports.Select || (exports.Select = {}));
var AlignElementsAction = /** @class */ (function () {
    function AlignElementsAction(
    /**
     * IDs of the elements that should be aligned. If no IDs are given, the selected elements will be aligned.
     */
    elementIds, 
    /**
     * Alignment direction.
     */
    alignment, 
    /**
     * Function to selected elements that are considered during alignment calculation, see Select.* for potential functions.
     */
    selectionFunction) {
        if (elementIds === void 0) { elementIds = []; }
        if (alignment === void 0) { alignment = Alignment.Left; }
        if (selectionFunction === void 0) { selectionFunction = Select.all; }
        this.elementIds = elementIds;
        this.alignment = alignment;
        this.selectionFunction = selectionFunction;
        this.kind = AlignElementsCommand.KIND;
    }
    return AlignElementsAction;
}());
exports.AlignElementsAction = AlignElementsAction;
var LayoutElementsCommand = /** @class */ (function (_super) {
    __extends(LayoutElementsCommand, _super);
    function LayoutElementsCommand(action, actionDispatcher, selectionService) {
        var _this = _super.call(this) || this;
        _this.action = action;
        _this.actionDispatcher = actionDispatcher;
        _this.selectionService = selectionService;
        return _this;
    }
    LayoutElementsCommand.prototype.getActionElements = function (context) {
        var model = context.root;
        var elementIDs = this.action.elementIds;
        if (elementIDs.length === 0) {
            // collect the selected elements from the selection service (selection order is kept by service)
            this.selectionService.getSelectedElementIDs().forEach(function (elementID) { return elementIDs.push(elementID); });
        }
        var selectableBoundsAware = [];
        elementIDs.forEach(function (id) {
            var element = model.index.getById(id);
            if (element && smodel_util_1.isNonRoutableSelectedBoundsAware(element)) {
                selectableBoundsAware.push(element);
            }
        });
        return selectableBoundsAware;
    };
    LayoutElementsCommand.prototype.dispatchAction = function (action) {
        this.actionDispatcher.dispatch(action);
    };
    LayoutElementsCommand.prototype.dispatchActions = function (actions) {
        this.actionDispatcher.dispatchAll(actions);
    };
    LayoutElementsCommand = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(sprotty_1.TYPES.Action)),
        __param(1, inversify_1.inject(sprotty_1.TYPES.IActionDispatcher)),
        __param(2, inversify_1.inject(types_1.GLSP_TYPES.SelectionService)),
        __metadata("design:paramtypes", [Object, Object, selection_service_1.SelectionService])
    ], LayoutElementsCommand);
    return LayoutElementsCommand;
}(sprotty_1.Command));
var ResizeElementsCommand = /** @class */ (function (_super) {
    __extends(ResizeElementsCommand, _super);
    function ResizeElementsCommand(action, actionDispatcher, selectionService) {
        var _this = _super.call(this, action, actionDispatcher, selectionService) || this;
        _this.action = action;
        _this.actionDispatcher = actionDispatcher;
        _this.selectionService = selectionService;
        return _this;
    }
    ResizeElementsCommand.prototype.execute = function (context) {
        var elements = this.getActionElements(context);
        if (elements.length > 1) {
            switch (this.action.dimension) {
                case ResizeDimension.Width:
                    this.resizeWidth(elements);
                    break;
                case ResizeDimension.Height:
                    this.resizeHeight(elements);
                    break;
                case ResizeDimension.Width_And_Height:
                    this.resizeWidthAndHeight(elements);
                    break;
            }
        }
        return context.root;
    };
    ResizeElementsCommand.prototype.resizeWidth = function (elements) {
        var _a;
        var targetWidth = (_a = this.action).reductionFunction.apply(_a, __spread(elements.map(function (element) { return element.bounds.width; })));
        this.dispatchResizeActions(elements, function (element, bounds) {
            // resize around center
            var halfDiffWidth = 0.5 * (targetWidth - element.bounds.width);
            bounds.newPosition.x = element.bounds.x - halfDiffWidth;
            bounds.newSize.width = targetWidth;
        });
    };
    ResizeElementsCommand.prototype.resizeHeight = function (elements) {
        var _a;
        var targetHeight = (_a = this.action).reductionFunction.apply(_a, __spread(elements.map(function (element) { return element.bounds.height; })));
        this.dispatchResizeActions(elements, function (element, bounds) {
            // resize around middle
            var halfDiffHeight = 0.5 * (targetHeight - element.bounds.height);
            bounds.newPosition.y = element.bounds.y - halfDiffHeight;
            bounds.newSize.height = targetHeight;
        });
    };
    ResizeElementsCommand.prototype.resizeWidthAndHeight = function (elements) {
        var _a, _b;
        var targetWidth = (_a = this.action).reductionFunction.apply(_a, __spread(elements.map(function (element) { return element.bounds.width; })));
        var targetHeight = (_b = this.action).reductionFunction.apply(_b, __spread(elements.map(function (element) { return element.bounds.height; })));
        this.dispatchResizeActions(elements, function (element, bounds) {
            // resize around center and middle
            var halfDiffWidth = 0.5 * (targetWidth - element.bounds.width);
            var halfDiffHeight = 0.5 * (targetHeight - element.bounds.height);
            bounds.newPosition.x = element.bounds.x - halfDiffWidth;
            bounds.newPosition.y = element.bounds.y - halfDiffHeight;
            bounds.newSize.width = targetWidth;
            bounds.newSize.height = targetHeight;
        });
    };
    ResizeElementsCommand.prototype.dispatchResizeActions = function (elements, change) {
        var _this = this;
        var elementAndBounds = []; // client- and server-side resize
        elements.forEach(function (element) { return elementAndBounds.push(_this.createElementAndBounds(element, change)); });
        this.dispatchActions([new sprotty_1.SetBoundsAction(elementAndBounds), new operation_actions_1.ChangeBoundsOperationAction(elementAndBounds)]);
    };
    ResizeElementsCommand.prototype.createElementAndBounds = function (element, change) {
        var bounds = {
            elementId: element.id,
            newPosition: {
                x: element.bounds.x,
                y: element.bounds.y
            },
            newSize: {
                width: element.bounds.width,
                height: element.bounds.height
            }
        };
        change(element, bounds);
        return bounds;
    };
    ResizeElementsCommand.prototype.undo = function (context) {
        // we dispatch another action which can be undone, so no explicit implementation necessary
        return context.root;
    };
    ResizeElementsCommand.prototype.redo = function (context) {
        // we dispatch another action which can be redone, so no explicit implementation necessary
        return context.root;
    };
    ResizeElementsCommand.KIND = 'layout:resize';
    ResizeElementsCommand = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(sprotty_1.TYPES.Action)),
        __param(1, inversify_1.inject(sprotty_1.TYPES.IActionDispatcher)),
        __param(2, inversify_1.inject(types_1.GLSP_TYPES.SelectionService)),
        __metadata("design:paramtypes", [ResizeElementsAction, Object, selection_service_1.SelectionService])
    ], ResizeElementsCommand);
    return ResizeElementsCommand;
}(LayoutElementsCommand));
exports.ResizeElementsCommand = ResizeElementsCommand;
var AlignElementsCommand = /** @class */ (function (_super) {
    __extends(AlignElementsCommand, _super);
    function AlignElementsCommand(action, actionDispatcher, selectionService) {
        var _this = _super.call(this, action, actionDispatcher, selectionService) || this;
        _this.action = action;
        _this.actionDispatcher = actionDispatcher;
        _this.selectionService = selectionService;
        return _this;
    }
    AlignElementsCommand.prototype.execute = function (context) {
        var elements = this.getActionElements(context);
        if (elements.length > 1) {
            switch (this.action.alignment) {
                case Alignment.Left:
                    this.alignLeft(elements);
                    break;
                case Alignment.Center:
                    this.alignCenter(elements);
                    break;
                case Alignment.Right:
                    this.alignRight(elements);
                    break;
                case Alignment.Top:
                    this.alignTop(elements);
                    break;
                case Alignment.Middle:
                    this.alignMiddle(elements);
                    break;
                case Alignment.Bottom:
                    this.alignBottom(elements);
                    break;
            }
        }
        return context.root;
    };
    AlignElementsCommand.prototype.alignLeft = function (elements) {
        var calculationElements = this.action.selectionFunction(elements);
        var minX = calculationElements.map(function (element) { return element.bounds.x; }).reduce(function (a, b) { return Math.min(a, b); });
        this.dispatchAlignActions(elements, function (_, move) { return move.toPosition.x = minX; });
    };
    AlignElementsCommand.prototype.alignCenter = function (elements) {
        var calculationElements = this.action.selectionFunction(elements);
        var minX = calculationElements.map(function (element) { return element.bounds.x; }).reduce(function (a, b) { return Math.min(a, b); });
        var maxX = calculationElements.map(function (element) { return element.bounds.x + element.bounds.width; }).reduce(function (a, b) { return Math.max(a, b); });
        var diffX = maxX - minX;
        var centerX = minX + 0.5 * diffX;
        this.dispatchAlignActions(elements, function (element, move) { return move.toPosition.x = centerX - 0.5 * element.bounds.width; });
    };
    AlignElementsCommand.prototype.alignRight = function (elements) {
        var calculationElements = this.action.selectionFunction(elements);
        var maxX = calculationElements.map(function (element) { return element.bounds.x + element.bounds.width; }).reduce(function (a, b) { return Math.max(a, b); });
        this.dispatchAlignActions(elements, function (element, move) { return move.toPosition.x = maxX - element.bounds.width; });
    };
    AlignElementsCommand.prototype.alignTop = function (elements) {
        var calculationElements = this.action.selectionFunction(elements);
        var minY = calculationElements.map(function (element) { return element.bounds.y; }).reduce(function (a, b) { return Math.min(a, b); });
        this.dispatchAlignActions(elements, function (_, move) { return move.toPosition.y = minY; });
    };
    AlignElementsCommand.prototype.alignMiddle = function (elements) {
        var calculationElements = this.action.selectionFunction(elements);
        var minY = calculationElements.map(function (element) { return element.bounds.y; }).reduce(function (a, b) { return Math.min(a, b); });
        var maxY = calculationElements.map(function (element) { return element.bounds.y + element.bounds.height; }).reduce(function (a, b) { return Math.max(a, b); });
        var diffY = maxY - minY;
        var middleY = minY + 0.5 * diffY;
        this.dispatchAlignActions(elements, function (element, move) { return move.toPosition.y = middleY - 0.5 * element.bounds.height; });
    };
    AlignElementsCommand.prototype.alignBottom = function (elements) {
        var calculationElements = this.action.selectionFunction(elements);
        var maxY = calculationElements.map(function (element) { return element.bounds.y + element.bounds.height; }).reduce(function (a, b) { return Math.max(a, b); });
        this.dispatchAlignActions(elements, function (element, move) { return move.toPosition.y = maxY - element.bounds.height; });
    };
    AlignElementsCommand.prototype.dispatchAlignActions = function (elements, change) {
        var _this = this;
        var moves = []; // client-side move
        var elementAndBounds = []; // server-side move
        elements.forEach(function (element) {
            var move = _this.createElementMove(element, change);
            moves.push(move);
            var elementAndBound = _this.createElementAndBounds(element, move);
            elementAndBounds.push(elementAndBound);
        });
        this.dispatchActions([new sprotty_1.MoveAction(moves), new operation_actions_1.ChangeBoundsOperationAction(elementAndBounds)]);
    };
    AlignElementsCommand.prototype.createElementMove = function (element, change) {
        var move = {
            elementId: element.id,
            fromPosition: {
                x: element.bounds.x,
                y: element.bounds.y
            },
            toPosition: {
                x: element.bounds.x,
                y: element.bounds.y
            }
        };
        change(element, move);
        return move;
    };
    AlignElementsCommand.prototype.createElementAndBounds = function (element, move) {
        return {
            elementId: element.id,
            newPosition: {
                x: move.toPosition.x,
                y: move.toPosition.y
            },
            newSize: {
                width: element.bounds.width,
                height: element.bounds.height
            }
        };
    };
    AlignElementsCommand.prototype.undo = function (context) {
        // we dispatch another action which can be undone, so no explicit implementation necessary
        return context.root;
    };
    AlignElementsCommand.prototype.redo = function (context) {
        // we dispatch another action which can be redone, so no explicit implementation necessary
        return context.root;
    };
    AlignElementsCommand.KIND = 'layout:align';
    AlignElementsCommand = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(sprotty_1.TYPES.Action)),
        __param(1, inversify_1.inject(sprotty_1.TYPES.IActionDispatcher)),
        __param(2, inversify_1.inject(types_1.GLSP_TYPES.SelectionService)),
        __metadata("design:paramtypes", [AlignElementsAction, Object, selection_service_1.SelectionService])
    ], AlignElementsCommand);
    return AlignElementsCommand;
}(LayoutElementsCommand));
exports.AlignElementsCommand = AlignElementsCommand;
var LayoutKeyboardListener = /** @class */ (function (_super) {
    __extends(LayoutKeyboardListener, _super);
    function LayoutKeyboardListener() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LayoutKeyboardListener.prototype.keyDown = function (element, event) {
        if (keyboard_1.matchesKeystroke(event, 'KeyW', 'shift')) {
            return [new ResizeElementsAction([], ResizeDimension.Width, Reduce.max)];
        }
        if (keyboard_1.matchesKeystroke(event, 'KeyH', 'shift')) {
            return [new ResizeElementsAction([], ResizeDimension.Height, Reduce.max)];
        }
        return [];
    };
    return LayoutKeyboardListener;
}(sprotty_1.KeyListener));
exports.LayoutKeyboardListener = LayoutKeyboardListener;
//# sourceMappingURL=layout-commands.js.map