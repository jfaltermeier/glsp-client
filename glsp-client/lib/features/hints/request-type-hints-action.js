"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RequestTypeHintsAction = /** @class */ (function () {
    function RequestTypeHintsAction(diagramType) {
        this.diagramType = diagramType;
        this.kind = RequestTypeHintsAction.KIND;
    }
    RequestTypeHintsAction.KIND = "requestTypeHints";
    return RequestTypeHintsAction;
}());
exports.RequestTypeHintsAction = RequestTypeHintsAction;
var SetTypeHintsAction = /** @class */ (function () {
    function SetTypeHintsAction(shapeHints, edgeHints) {
        this.shapeHints = shapeHints;
        this.edgeHints = edgeHints;
        this.kind = SetTypeHintsAction.KIND;
    }
    SetTypeHintsAction.KIND = "setTypeHints";
    return SetTypeHintsAction;
}());
exports.SetTypeHintsAction = SetTypeHintsAction;
function isSetTypeHintsAction(action) {
    return action !== undefined && (action.kind === SetTypeHintsAction.KIND)
        && action.shapeHints !== undefined && action.edgeHints !== undefined;
}
exports.isSetTypeHintsAction = isSetTypeHintsAction;
//# sourceMappingURL=request-type-hints-action.js.map