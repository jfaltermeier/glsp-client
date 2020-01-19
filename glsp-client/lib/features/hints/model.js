"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.containerFeature = Symbol("containable");
function isContainable(element) {
    return element.hasFeature(exports.containerFeature);
}
exports.isContainable = isContainable;
exports.reparentFeature = Symbol("reparentFeature");
function isReparentable(element) {
    return element.hasFeature(exports.reparentFeature);
}
exports.isReparentable = isReparentable;
//# sourceMappingURL=model.js.map