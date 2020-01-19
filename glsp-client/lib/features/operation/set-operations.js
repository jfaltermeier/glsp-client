"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OperationKind;
(function (OperationKind) {
    OperationKind.CREATE_NODE = "createNode";
    OperationKind.CREATE_CONNECTION = "createConnection";
    OperationKind.RECONNECT_CONNECTION = "reconnectConnection";
    OperationKind.CHANGE_ROUTING_POINTS = "changeRoutingPoints";
    OperationKind.DELETE_ELEMENT = "deleteElement";
    OperationKind.CHANGE_BOUNDS = "changeBounds";
    OperationKind.CHANGE_CONTAINER = "changeContainer";
    OperationKind.GENERIC = "generic";
})(OperationKind = exports.OperationKind || (exports.OperationKind = {}));
exports.UNGROUPED = { id: "ungrouped", label: "" };
function parentGroup(operation) {
    return parent(operation.group);
}
exports.parentGroup = parentGroup;
function parent(group) {
    if (group) {
        if (group.parentGroup) {
            return parent(group.parentGroup);
        }
        else {
            return group;
        }
    }
    return exports.UNGROUPED;
}
var RequestOperationsAction = /** @class */ (function () {
    function RequestOperationsAction() {
        this.kind = RequestOperationsAction.KIND;
    }
    RequestOperationsAction.KIND = 'requestOperations';
    return RequestOperationsAction;
}());
exports.RequestOperationsAction = RequestOperationsAction;
var SetOperationsAction = /** @class */ (function () {
    function SetOperationsAction(operations) {
        this.operations = operations;
        this.kind = SetOperationsAction.KIND;
    }
    SetOperationsAction.KIND = 'setOperations';
    return SetOperationsAction;
}());
exports.SetOperationsAction = SetOperationsAction;
function isSetOperationsAction(action) {
    return action !== undefined && (action.kind === SetOperationsAction.KIND)
        && action.operations !== undefined;
}
exports.isSetOperationsAction = isSetOperationsAction;
function deriveOperationId(operationKind, elementTypeId) {
    var elementTypeSuffix = elementTypeId ? '_' + elementTypeId : "";
    return "" + operationKind + elementTypeSuffix;
}
exports.deriveOperationId = deriveOperationId;
//# sourceMappingURL=set-operations.js.map