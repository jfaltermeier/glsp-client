"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GlspUndoAction = /** @class */ (function () {
    function GlspUndoAction() {
        this.kind = GlspUndoAction.KIND;
    }
    GlspUndoAction.KIND = 'glspUndo';
    return GlspUndoAction;
}());
exports.GlspUndoAction = GlspUndoAction;
var GlspRedoAction = /** @class */ (function () {
    function GlspRedoAction() {
        this.kind = GlspRedoAction.KIND;
    }
    GlspRedoAction.KIND = 'glspRedo';
    return GlspRedoAction;
}());
exports.GlspRedoAction = GlspRedoAction;
//# sourceMappingURL=model.js.map