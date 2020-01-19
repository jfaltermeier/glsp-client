"use strict";
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
/**
 * Return the position corresponding to this mouse event (Browser coordinates)
 * in the diagram coordinates system (i.e. relative to the Diagram's 0;0 point)
 *
 * This functions takes into account the following transformations:
 * - Location of the Diagram Canvas inside of the browser's page
 * - Current viewport Scroll and Zoom
 *
 * @param target
 *  An element from the diagram
 * @param mouseEvent
 *  A mouseEvent
 */
function getAbsolutePosition(target, mouseEvent) {
    var xPos = mouseEvent.pageX, yPos = mouseEvent.pageY;
    var canvasBounds = target.root.canvasBounds;
    xPos -= canvasBounds.x;
    yPos -= canvasBounds.y;
    var viewport = lib_1.findParentByFeature(target, lib_1.isViewport);
    var zoom = viewport ? viewport.zoom : 1;
    if (viewport) {
        var scroll_1 = { x: viewport.scroll.x, y: viewport.scroll.y };
        xPos += scroll_1.x * zoom;
        yPos += scroll_1.y * zoom;
        xPos /= zoom;
        yPos /= zoom;
    }
    xPos;
    return {
        x: xPos,
        y: yPos
    };
}
exports.getAbsolutePosition = getAbsolutePosition;
/**
 * Translates the bounds of the diagram element (local coordinates) into the diagram coordinates system
 * (i.e. relative to the Diagram's 0;0 point)
 *
 * @param target  A bounds-aware element from the diagram
 */
function toAbsoluteBounds(element) {
    var location = lib_1.isAlignable(element) ? element.alignment : lib_1.ORIGIN_POINT;
    var x = location.x;
    var y = location.y;
    var width = element.bounds.width;
    var height = element.bounds.height;
    return lib_1.translateBounds({ x: x, y: y, width: width, height: height }, element, element.root);
}
exports.toAbsoluteBounds = toAbsoluteBounds;
/**
 * Translates the position of the diagram element (local coordinates) into the diagram coordinates system
 * (i.e. relative to the Diagram's 0;0 point)
 *
 * @param target  A bounds-aware element from the diagram
 */
function toAbsolutePosition(target) {
    return toAbsoluteBounds(target);
}
exports.toAbsolutePosition = toAbsolutePosition;
/**
 * Translates the size of the diagram element (local coordinates) into the diagram coordinates system
 * (i.e. relative to the Diagram's 0;0 point)
 *
 * @param target  A bounds-aware element from the diagram
 */
function toAbsoluteSize(target) {
    return toAbsoluteBounds(target);
}
exports.toAbsoluteSize = toAbsoluteSize;
//# sourceMappingURL=viewpoint-util.js.map