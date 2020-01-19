"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeCommandFeature = Symbol('executeFeature');
function isCommandExecutor(element) {
    return element.hasFeature(exports.executeCommandFeature);
}
exports.isCommandExecutor = isCommandExecutor;
//# sourceMappingURL=model.js.map