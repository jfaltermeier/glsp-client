"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
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
var lib_1 = require("sprotty/lib");
function getIndex(element) {
    return element.root.index;
}
exports.getIndex = getIndex;
function forEachElement(element, predicate, runnable) {
    getIndex(element).all()
        .filter(predicate)
        .forEach(runnable);
}
exports.forEachElement = forEachElement;
function getMatchingElements(element, predicate) {
    var matching = [];
    forEachElement(element, predicate, function (item) { return matching.push(item); });
    return matching;
}
exports.getMatchingElements = getMatchingElements;
function hasSelectedElements(element) {
    return getSelectedElementCount(element) > 0;
}
exports.hasSelectedElements = hasSelectedElements;
function getSelectedElementCount(element) {
    var selected = 0;
    getIndex(element).all()
        .filter(lib_1.isSelected)
        .forEach(function (e) { return selected = selected + 1; });
    return selected;
}
exports.getSelectedElementCount = getSelectedElementCount;
function isNotUndefined(element) {
    return element !== undefined;
}
exports.isNotUndefined = isNotUndefined;
function addCssClasses(root, cssClasses) {
    var e_1, _a;
    if (root.cssClasses === undefined) {
        root.cssClasses = [];
    }
    try {
        for (var cssClasses_1 = __values(cssClasses), cssClasses_1_1 = cssClasses_1.next(); !cssClasses_1_1.done; cssClasses_1_1 = cssClasses_1.next()) {
            var cssClass = cssClasses_1_1.value;
            if (root.cssClasses.indexOf(cssClass) < 0) {
                root.cssClasses.push(cssClass);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (cssClasses_1_1 && !cssClasses_1_1.done && (_a = cssClasses_1.return)) _a.call(cssClasses_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
}
exports.addCssClasses = addCssClasses;
function removeCssClasses(root, cssClasses) {
    var e_2, _a;
    if (root.cssClasses === undefined || root.cssClasses.length === 0) {
        return;
    }
    try {
        for (var cssClasses_2 = __values(cssClasses), cssClasses_2_1 = cssClasses_2.next(); !cssClasses_2_1.done; cssClasses_2_1 = cssClasses_2.next()) {
            var cssClass = cssClasses_2_1.value;
            var index = root.cssClasses.indexOf(cssClass);
            if (index !== -1) {
                root.cssClasses.splice(root.cssClasses.indexOf(cssClass), 1);
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (cssClasses_2_1 && !cssClasses_2_1.done && (_a = cssClasses_2.return)) _a.call(cssClasses_2);
        }
        finally { if (e_2) throw e_2.error; }
    }
}
exports.removeCssClasses = removeCssClasses;
function isNonRoutableSelectedMovableBoundsAware(element) {
    return isNonRoutableSelectedBoundsAware(element) && lib_1.isMoveable(element);
}
exports.isNonRoutableSelectedMovableBoundsAware = isNonRoutableSelectedMovableBoundsAware;
function isNonRoutableSelectedBoundsAware(element) {
    return lib_1.isBoundsAware(element) && lib_1.isSelected(element) && !isRoutable(element);
}
exports.isNonRoutableSelectedBoundsAware = isNonRoutableSelectedBoundsAware;
function isRoutable(element) {
    return element instanceof lib_1.SRoutableElement && element.routingPoints !== undefined;
}
exports.isRoutable = isRoutable;
function isRoutingHandle(element) {
    return element !== undefined && element instanceof lib_1.SRoutingHandle;
}
exports.isRoutingHandle = isRoutingHandle;
function toElementAndBounds(element) {
    return {
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
}
exports.toElementAndBounds = toElementAndBounds;
function toElementAndRoutingPoints(element) {
    return {
        elementId: element.id,
        newRoutingPoints: element.routingPoints
    };
}
exports.toElementAndRoutingPoints = toElementAndRoutingPoints;
//# sourceMappingURL=smodel-util.js.map