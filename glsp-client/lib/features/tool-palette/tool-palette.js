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
var lib_1 = require("sprotty/lib");
var set_operations_1 = require("../operation/set-operations");
var creation_tool_1 = require("../tools/creation-tool");
var delete_tool_1 = require("../tools/delete-tool");
var validate_1 = require("../validation/validate");
var CLICKED_CSS_CLASS = "clicked";
var ToolPalette = /** @class */ (function (_super) {
    __extends(ToolPalette, _super);
    function ToolPalette() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = ToolPalette_1.ID;
        _this.containerClass = "tool-palette";
        return _this;
    }
    ToolPalette_1 = ToolPalette;
    ToolPalette.prototype.initialize = function () {
        if (!this.operations) {
            return false;
        }
        return _super.prototype.initialize.call(this);
    };
    ToolPalette.prototype.initializeContents = function (containerElement) {
        this.createHeader();
        this.createBody();
    };
    ToolPalette.prototype.onBeforeShow = function (containerElement, root) {
        this.modelRootId = root.id;
    };
    ToolPalette.prototype.createBody = function () {
        var _this = this;
        var bodyDiv = document.createElement("div");
        bodyDiv.classList.add("palette-body");
        // Greate operation groups
        var groups = new Map();
        this.operations.map(set_operations_1.parentGroup).forEach(function (group) {
            if (!groups.has(group.id)) {
                groups.set(group.id, createToolGroup(group.label, group.id));
            }
        });
        // Fill groups
        this.operations.forEach(function (op) {
            var button = _this.createToolButton(op);
            var group = set_operations_1.parentGroup(op);
            var htmlGroup = groups.get(group.id);
            if (htmlGroup) {
                htmlGroup.appendChild(button);
            }
        });
        // Add groups to container
        Array.from(groups.values()).forEach(function (group) { return bodyDiv.appendChild(group); });
        this.containerElement.appendChild(bodyDiv);
    };
    ToolPalette.prototype.createHeader = function () {
        var _this = this;
        var headerCompartment = document.createElement("div");
        headerCompartment.classList.add("palette-header");
        // Title header
        var header = document.createElement("div");
        header.classList.add("header-icon");
        header.appendChild(createIcon(["fa", "fa-palette"]));
        header.insertAdjacentText("beforeend", "Palette");
        headerCompartment.append(header);
        // Header Tools Compartment
        var headerTools = document.createElement("div");
        headerTools.classList.add("header-tools");
        // Create button for DefaultTools
        this.defaultToolsButton = createIcon(["fas", "fa-mouse-pointer", "fa-xs", "clicked"]);
        this.defaultToolsButton.id = "btn_default_tools";
        this.defaultToolsButton.onclick = this.onClickToolButton(this.defaultToolsButton);
        headerTools.appendChild(this.defaultToolsButton);
        this.lastActivebutton = this.defaultToolsButton;
        // Create button for MouseDeleteTool
        var deleteToolButton = createIcon(["fas", "fa-eraser", "fa-xs"]);
        deleteToolButton.onclick = this.onClickToolButton(deleteToolButton, delete_tool_1.MouseDeleteTool.ID);
        headerTools.appendChild(deleteToolButton);
        // Create button for ValidationTool
        var validateActionButton = createIcon(["fas", "fa-check-square", "fa-xs"]);
        validateActionButton.onclick = function (ev) {
            var modelIds = [_this.modelRootId];
            _this.actionDispatcher.dispatch(new validate_1.RequestMarkersAction(modelIds));
        };
        headerTools.appendChild(validateActionButton);
        headerCompartment.appendChild(headerTools);
        this.containerElement.appendChild(headerCompartment);
    };
    ToolPalette.prototype.createToolButton = function (operation) {
        var button = document.createElement("div");
        button.classList.add("tool-button");
        button.innerHTML = operation.label;
        button.onclick = this.onClickToolButton(button, creation_tool_1.deriveToolId(operation.operationKind, operation.elementTypeId));
        return button;
    };
    ToolPalette.prototype.onClickToolButton = function (button, toolId) {
        var _this = this;
        return function (ev) {
            var action = toolId ? new lib_1.EnableToolsAction([toolId]) : new lib_1.EnableDefaultToolsAction();
            _this.actionDispatcher.dispatch(action);
            _this.changeActiveButton(button);
            _this.restoreFocus();
        };
    };
    ToolPalette.prototype.setOperations = function (operations) {
        this.operations = operations;
    };
    ToolPalette.prototype.changeActiveButton = function (button) {
        if (this.lastActivebutton) {
            this.lastActivebutton.classList.remove(CLICKED_CSS_CLASS);
        }
        if (button) {
            button.classList.add(CLICKED_CSS_CLASS);
            this.lastActivebutton = button;
        }
        else {
            this.defaultToolsButton.classList.add(CLICKED_CSS_CLASS);
            this.lastActivebutton = this.defaultToolsButton;
        }
    };
    var ToolPalette_1;
    ToolPalette.ID = "glsp_tool_palette";
    __decorate([
        inversify_1.inject(lib_1.TYPES.IActionDispatcher),
        __metadata("design:type", Object)
    ], ToolPalette.prototype, "actionDispatcher", void 0);
    ToolPalette = ToolPalette_1 = __decorate([
        inversify_1.injectable()
    ], ToolPalette);
    return ToolPalette;
}(lib_1.AbstractUIExtension));
exports.ToolPalette = ToolPalette;
function createIcon(cssClasses) {
    var _a;
    var icon = document.createElement("i");
    (_a = icon.classList).add.apply(_a, __spread(cssClasses));
    return icon;
}
function createToolGroup(label, groupId) {
    var group = document.createElement("div");
    group.classList.add("tool-group");
    group.id = groupId;
    var header = document.createElement("div");
    header.classList.add("group-header");
    header.appendChild(createIcon(["fas", "fa-hammer"]));
    header.insertAdjacentText('beforeend', label);
    header.ondblclick = function (ev) {
        var css = "collapsed";
        changeCSSClass(group, css);
        Array.from(group.children).forEach(function (item) { return changeCSSClass(item, css); });
        window.getSelection().removeAllRanges();
    };
    group.appendChild(header);
    return group;
}
function changeCSSClass(element, css) {
    element.classList.contains(css) ? element.classList.remove(css) :
        element.classList.add(css);
}
var ToolPaletteActionHandler = /** @class */ (function () {
    function ToolPaletteActionHandler() {
    }
    ToolPaletteActionHandler.prototype.handle = function (action) {
        if (set_operations_1.isSetOperationsAction(action)) {
            this.toolPalette.setOperations(action.operations);
            return new lib_1.SetUIExtensionVisibilityAction(ToolPalette.ID, true);
        }
        else if (action instanceof lib_1.EnableDefaultToolsAction) {
            this.toolPalette.changeActiveButton();
        }
    };
    __decorate([
        inversify_1.inject(ToolPalette),
        __metadata("design:type", ToolPalette)
    ], ToolPaletteActionHandler.prototype, "toolPalette", void 0);
    ToolPaletteActionHandler = __decorate([
        inversify_1.injectable()
    ], ToolPaletteActionHandler);
    return ToolPaletteActionHandler;
}());
exports.ToolPaletteActionHandler = ToolPaletteActionHandler;
//# sourceMappingURL=tool-palette.js.map