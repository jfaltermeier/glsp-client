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
var lib_1 = require("sprotty/lib");
exports.reconnectFeature = Symbol("reconnectFeature");
function isReconnectable(element) {
    return element instanceof lib_1.SRoutableElement && element.hasFeature(exports.reconnectFeature);
}
exports.isReconnectable = isReconnectable;
var ROUTING_HANDLE_SOURCE_INDEX = -2;
function isReconnectHandle(element) {
    return element !== undefined && element instanceof SReconnectHandle;
}
exports.isReconnectHandle = isReconnectHandle;
function addReconnectHandles(element) {
    removeReconnectHandles(element);
    createReconnectHandle(element, 'source', ROUTING_HANDLE_SOURCE_INDEX);
    createReconnectHandle(element, 'target', element.routingPoints.length);
}
exports.addReconnectHandles = addReconnectHandles;
function removeReconnectHandles(element) {
    element.removeAll(function (child) { return child instanceof SReconnectHandle; });
}
exports.removeReconnectHandles = removeReconnectHandles;
function isSourceRoutingHandle(edge, routingHandle) {
    return routingHandle.pointIndex === ROUTING_HANDLE_SOURCE_INDEX;
}
exports.isSourceRoutingHandle = isSourceRoutingHandle;
function isTargetRoutingHandle(edge, routingHandle) {
    return routingHandle.pointIndex === edge.routingPoints.length;
}
exports.isTargetRoutingHandle = isTargetRoutingHandle;
function createReconnectHandle(edge, kind, routingPointIndex) {
    var handle = new SReconnectHandle();
    handle.kind = kind;
    handle.pointIndex = routingPointIndex;
    handle.type = 'routing-point';
    if (kind === 'target' && edge.id === lib_1.edgeInProgressID) {
        handle.id = lib_1.edgeInProgressTargetHandleID;
    }
    edge.add(handle);
    return handle;
}
exports.createReconnectHandle = createReconnectHandle;
var SReconnectHandle = /** @class */ (function (_super) {
    __extends(SReconnectHandle, _super);
    function SReconnectHandle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SReconnectHandle.prototype.hasFeature = function (feature) {
        return feature !== lib_1.selectFeature && _super.prototype.hasFeature.call(this, feature);
    };
    return SReconnectHandle;
}(lib_1.SRoutingHandle));
exports.SReconnectHandle = SReconnectHandle;
//# sourceMappingURL=model.js.map