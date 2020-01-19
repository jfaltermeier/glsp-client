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
var lib_1 = require("@eclipse-glsp/client/lib");
var model_schema_1 = require("./model-schema");
var TaskNode = /** @class */ (function (_super) {
    __extends(TaskNode, _super);
    function TaskNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "";
        return _this;
    }
    Object.defineProperty(TaskNode.prototype, "editableLabel", {
        get: function () {
            var headerComp = this.children.find(function (element) { return element.type === 'comp:header'; });
            if (headerComp) {
                var label = headerComp.children.find(function (element) { return element.type === 'label:heading'; });
                if (label && lib_1.isEditableLabel(label)) {
                    return label;
                }
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    TaskNode.DEFAULT_FEATURES = [lib_1.connectableFeature, lib_1.deletableFeature, lib_1.selectFeature, lib_1.boundsFeature,
        lib_1.moveFeature, lib_1.layoutContainerFeature, lib_1.fadeFeature, lib_1.hoverFeedbackFeature, lib_1.popupFeature, lib_1.nameFeature, lib_1.withEditLabelFeature];
    return TaskNode;
}(lib_1.RectangularNode));
exports.TaskNode = TaskNode;
var WeightedEdge = /** @class */ (function (_super) {
    __extends(WeightedEdge, _super);
    function WeightedEdge() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return WeightedEdge;
}(lib_1.SEdge));
exports.WeightedEdge = WeightedEdge;
var ActivityNode = /** @class */ (function (_super) {
    __extends(ActivityNode, _super);
    function ActivityNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nodeType = model_schema_1.ActivityNodeSchema.Type.UNDEFINED;
        _this.size = {
            width: 32,
            height: 32
        };
        _this.strokeWidth = 1;
        return _this;
    }
    return ActivityNode;
}(lib_1.DiamondNode));
exports.ActivityNode = ActivityNode;
var Icon = /** @class */ (function (_super) {
    __extends(Icon, _super);
    function Icon() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.size = {
            width: 32,
            height: 32
        };
        return _this;
    }
    Icon.DEFAULT_FEATURES = [lib_1.boundsFeature, lib_1.layoutContainerFeature, lib_1.layoutableChildFeature, lib_1.fadeFeature, lib_1.executeCommandFeature];
    return Icon;
}(lib_1.SShapeElement));
exports.Icon = Icon;
//# sourceMappingURL=model.js.map