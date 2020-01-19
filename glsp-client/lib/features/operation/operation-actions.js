"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var set_operations_1 = require("./set-operations");
var CreateNodeOperationAction = /** @class */ (function () {
    function CreateNodeOperationAction(elementTypeId, location, containerId) {
        this.elementTypeId = elementTypeId;
        this.location = location;
        this.containerId = containerId;
        this.kind = set_operations_1.OperationKind.CREATE_NODE;
    }
    return CreateNodeOperationAction;
}());
exports.CreateNodeOperationAction = CreateNodeOperationAction;
var CreateConnectionOperationAction = /** @class */ (function () {
    function CreateConnectionOperationAction(elementTypeId, sourceElementId, targetElementId) {
        this.elementTypeId = elementTypeId;
        this.sourceElementId = sourceElementId;
        this.targetElementId = targetElementId;
        this.kind = set_operations_1.OperationKind.CREATE_CONNECTION;
    }
    return CreateConnectionOperationAction;
}());
exports.CreateConnectionOperationAction = CreateConnectionOperationAction;
var DeleteElementOperationAction = /** @class */ (function () {
    function DeleteElementOperationAction(elementIds) {
        this.elementIds = elementIds;
        this.kind = set_operations_1.OperationKind.DELETE_ELEMENT;
    }
    return DeleteElementOperationAction;
}());
exports.DeleteElementOperationAction = DeleteElementOperationAction;
var ChangeBoundsOperationAction = /** @class */ (function () {
    function ChangeBoundsOperationAction(newBounds) {
        this.newBounds = newBounds;
        this.kind = set_operations_1.OperationKind.CHANGE_BOUNDS;
    }
    return ChangeBoundsOperationAction;
}());
exports.ChangeBoundsOperationAction = ChangeBoundsOperationAction;
var ChangeContainerOperation = /** @class */ (function () {
    function ChangeContainerOperation(elementId, targetContainerId, location) {
        this.elementId = elementId;
        this.targetContainerId = targetContainerId;
        this.location = location;
        this.kind = set_operations_1.OperationKind.CHANGE_CONTAINER;
    }
    return ChangeContainerOperation;
}());
exports.ChangeContainerOperation = ChangeContainerOperation;
var ReconnectConnectionOperationAction = /** @class */ (function () {
    function ReconnectConnectionOperationAction(connectionElementId, sourceElementId, targetElementId) {
        this.connectionElementId = connectionElementId;
        this.sourceElementId = sourceElementId;
        this.targetElementId = targetElementId;
        this.kind = set_operations_1.OperationKind.RECONNECT_CONNECTION;
    }
    return ReconnectConnectionOperationAction;
}());
exports.ReconnectConnectionOperationAction = ReconnectConnectionOperationAction;
var ChangeRoutingPointsOperation = /** @class */ (function () {
    function ChangeRoutingPointsOperation(newRoutingPoints) {
        this.newRoutingPoints = newRoutingPoints;
        this.kind = set_operations_1.OperationKind.CHANGE_ROUTING_POINTS;
    }
    return ChangeRoutingPointsOperation;
}());
exports.ChangeRoutingPointsOperation = ChangeRoutingPointsOperation;
var GenericOperationAction = /** @class */ (function () {
    function GenericOperationAction(id, elementId, location) {
        this.id = id;
        this.elementId = elementId;
        this.location = location;
        this.kind = set_operations_1.OperationKind.GENERIC;
    }
    return GenericOperationAction;
}());
exports.GenericOperationAction = GenericOperationAction;
//# sourceMappingURL=operation-actions.js.map