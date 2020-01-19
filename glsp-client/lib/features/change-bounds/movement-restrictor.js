"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var inversify_1 = require("inversify");
var lib_1 = require("sprotty/lib");
var iterable_1 = require("sprotty/lib/utils/iterable");
var cursor_feedback_1 = require("../tool-feedback/cursor-feedback");
var model_1 = require("./model");
var NoCollisionMovementRestrictor = /** @class */ (function () {
    function NoCollisionMovementRestrictor() {
        this.hasCollided = false;
    }
    /*
    * Attempt to perform an element move. Returns true if the move is not restricted anc can be applied successfull and false otherwise
    */
    NoCollisionMovementRestrictor.prototype.attemptMove = function (element, mousePoint, target, delta, result) {
        var _this = this;
        if (!model_1.isBoundsAwareMoveable(element)) {
            return false;
        }
        var mouseOverElement = false;
        var willOverlap = false;
        // Create ghost element to check possible bounds
        var ghostElement = Object.create(element);
        ghostElement.bounds = this.getCenteredBoundsToPointer(mousePoint, element.bounds);
        // Set type to Ghost to keep tracking it through elements
        ghostElement.type = "Ghost";
        ghostElement.id = element.id;
        // Check collision for gost element (to see when it has passed beyond obstacle)
        var collisionTargetsGhost = this.getCollisionChain(target, ghostElement, delta, [])
            .filter(function (collidingElement) { return lib_1.isSelectable(collidingElement) && !collidingElement.selected; });
        // After collision the mouse is back inside the element => change cursor back to default
        if (this.hasCollided && lib_1.includes(element.bounds, mousePoint)) {
            mouseOverElement = true;
            result.push(new cursor_feedback_1.ApplyCursorCSSFeedbackAction(cursor_feedback_1.CursorCSS.DEFAULT));
        }
        var selectedElements = target.root.index.all()
            .filter(function (selected) { return lib_1.isSelectable(selected) && selected.selected; });
        // If the ghost element has moved beyond the obstacle move the actual element there aswell
        // But only if a single element is selected (multi-selection jumps are not supported)
        if (this.hasCollided && collisionTargetsGhost.length === 0 && iterable_1.toArray(selectedElements).length === 1) {
            mouseOverElement = true;
            result.push(new cursor_feedback_1.ApplyCursorCSSFeedbackAction(cursor_feedback_1.CursorCSS.DEFAULT));
            if (element.id === ghostElement.id) {
                element.bounds = ghostElement.bounds;
            }
        }
        // Get only the valid, non-slected collision targets to avoid in-selection collisions
        var collisionTargets = this.getCollisionChain(target, element, delta, [])
            .filter(function (collidingElement) { return lib_1.isSelectable(collidingElement) && !collidingElement.selected; });
        if (collisionTargets.length > 0) {
            collisionTargets.forEach(function (collisionTarget) {
                if (lib_1.isBoundsAware(collisionTarget)) {
                    // Only snap on first collision to avoid erratic jumps
                    if (!_this.hasCollided) {
                        var snappedBounds = _this.getSnappedBounds(element, collisionTarget);
                        var snapMoves = [];
                        snapMoves.push({
                            elementId: element.id,
                            fromPosition: {
                                x: element.position.x,
                                y: element.position.y
                            },
                            toPosition: {
                                x: snappedBounds.x,
                                y: snappedBounds.y
                            }
                        });
                        result.push(new lib_1.MoveAction(snapMoves, false));
                    }
                    willOverlap = true;
                    _this.hasCollided = true;
                    result.push(new cursor_feedback_1.ApplyCursorCSSFeedbackAction(cursor_feedback_1.CursorCSS.OVERLAP_FORBIDDEN));
                }
            });
        }
        if ((!willOverlap && !this.hasCollided) ||
            (this.hasCollided && !willOverlap && mouseOverElement)) {
            this.hasCollided = false;
            return true;
        }
        return false;
    };
    /**
       * Used to return the collision target(s) or the collision chain in case of multiple selected elements
       */
    NoCollisionMovementRestrictor.prototype.getCollisionChain = function (target, element, delta, collisionChain) {
        var _this = this;
        if (model_1.isBoundsAwareMoveable(element)) {
            target.root.index.all()
                .filter(function (candidate) { return lib_1.isSelectable(candidate) && element.id !== candidate.id && collisionChain.indexOf(candidate) < 0; })
                .forEach(function (candidate) {
                if (lib_1.isMoveable(element) && lib_1.isMoveable(candidate)) {
                    if (lib_1.isBoundsAware(element) && lib_1.isBoundsAware(candidate)) {
                        var futureBounds = {
                            x: element.position.x + delta.x,
                            y: element.position.y + delta.y,
                            width: element.bounds.width,
                            height: element.bounds.height
                        };
                        if (isOverlappingBounds(futureBounds, candidate.bounds) && (!isOverlappingBounds(element.bounds, candidate.bounds) || element.type === "Ghost")) {
                            collisionChain.push(candidate);
                            if (lib_1.isSelectable(candidate) && candidate.selected) {
                                // Check what the selected candidate will collide with and add it to the chain
                                collisionChain.push.apply(collisionChain, _this.getCollisionChain(target, candidate, delta, collisionChain));
                            }
                        }
                    }
                }
            });
        }
        return collisionChain;
    };
    /**
    * Returns bounds centered around the point
    */
    NoCollisionMovementRestrictor.prototype.getCenteredBoundsToPointer = function (mousePoint, bounds) {
        var middleX = mousePoint.x - bounds.width / 2;
        var middleY = mousePoint.y - bounds.height / 2;
        var shiftedBounds = { x: middleX, y: middleY, width: bounds.width, height: bounds.height };
        return shiftedBounds;
    };
    // Remove this and use the one from the improved routing branch
    NoCollisionMovementRestrictor.prototype.getDistanceBetweenParallelLines = function (p1, p2, secondLine) {
        var numerator = Math.abs((secondLine.a * p1.x) + (secondLine.b * p1.y) - secondLine.c);
        var denominator = Math.sqrt(Math.pow(secondLine.a, 2) + Math.pow(secondLine.b, 2));
        return numerator / denominator;
    };
    /**
     * Snaps the element to the target in case of a collision
     */
    NoCollisionMovementRestrictor.prototype.getSnappedBounds = function (element, target) {
        var snappedBounds = element.bounds;
        // Build corner points
        var elementTopLeft = {
            x: element.bounds.x,
            y: element.bounds.y
        };
        var elementTopRight = {
            x: element.bounds.x + element.bounds.width,
            y: element.bounds.y
        };
        var elementBottomLeft = {
            x: element.bounds.x,
            y: element.bounds.y + element.bounds.height
        };
        var elementBottomRight = {
            x: element.bounds.x + element.bounds.width,
            y: element.bounds.y + element.bounds.height
        };
        var targetTopLeft = {
            x: target.bounds.x,
            y: target.bounds.y
        };
        var targetTopRight = {
            x: target.bounds.x + target.bounds.width,
            y: target.bounds.y
        };
        var targetBottomLeft = {
            x: target.bounds.x,
            y: target.bounds.y + target.bounds.height
        };
        var targetBottomRight = {
            x: target.bounds.x + target.bounds.width,
            y: target.bounds.y + target.bounds.height
        };
        // Build lines
        var targetTopLine = new lib_1.PointToPointLine(targetTopLeft, targetTopRight);
        var targetBottomLine = new lib_1.PointToPointLine(targetBottomLeft, targetBottomRight);
        var targetLeftLine = new lib_1.PointToPointLine(targetTopLeft, targetBottomLeft);
        var targetRightLine = new lib_1.PointToPointLine(targetTopRight, targetBottomRight);
        // Compute distances
        var distanceTop = this.getDistanceBetweenParallelLines(elementBottomLeft, elementBottomRight, targetTopLine);
        var distanceBottom = this.getDistanceBetweenParallelLines(elementTopLeft, elementTopRight, targetBottomLine);
        var distanceLeft = this.getDistanceBetweenParallelLines(elementTopLeft, elementBottomLeft, targetRightLine);
        var distanceRight = this.getDistanceBetweenParallelLines(elementTopRight, elementBottomRight, targetLeftLine);
        var minimumCandidates = [];
        // Overlap on the horizontal lines
        if (isOverlapping1Dimension(element.bounds.x, element.bounds.width, target.bounds.x, target.bounds.width)) {
            minimumCandidates.push(distanceTop.valueOf());
            minimumCandidates.push(distanceBottom.valueOf());
        }
        // Overlap on the horizontal lines
        if (isOverlapping1Dimension(element.bounds.y, element.bounds.height, target.bounds.y, target.bounds.height)) {
            minimumCandidates.push(distanceLeft.valueOf());
            minimumCandidates.push(distanceRight.valueOf());
        }
        // Get minimum distance and then snap accordingly
        minimumCandidates.sort(function (a, b) { return a - b; });
        var minimumDistance = minimumCandidates[0];
        if (minimumDistance === distanceTop) {
            snappedBounds = {
                x: element.bounds.x,
                y: target.bounds.y - 1 - element.bounds.height,
                width: element.bounds.width,
                height: element.bounds.height
            };
        }
        if (minimumDistance === distanceBottom) {
            snappedBounds = {
                x: element.bounds.x,
                y: target.bounds.y + target.bounds.height + 1,
                width: element.bounds.width,
                height: element.bounds.height
            };
        }
        if (minimumDistance === distanceLeft) {
            snappedBounds = {
                x: target.bounds.x + target.bounds.width + 1,
                y: element.bounds.y,
                width: element.bounds.width,
                height: element.bounds.height
            };
        }
        if (minimumDistance === distanceRight) {
            snappedBounds = {
                x: target.bounds.x - 1 - element.bounds.width,
                y: element.bounds.y,
                width: element.bounds.width,
                height: element.bounds.height
            };
        }
        return snappedBounds;
    };
    NoCollisionMovementRestrictor = __decorate([
        inversify_1.injectable()
    ], NoCollisionMovementRestrictor);
    return NoCollisionMovementRestrictor;
}());
exports.NoCollisionMovementRestrictor = NoCollisionMovementRestrictor;
/**
* Used to check if 1D boxes (lines) overlap
*/
function isOverlapping1Dimension(x1, width1, x2, width2) {
    return x1 + width1 >= x2 && x2 + width2 >= x1;
}
exports.isOverlapping1Dimension = isOverlapping1Dimension;
/**
* Used to check if 2 bounds are overlapping
*/
function isOverlappingBounds(bounds1, bounds2) {
    return isOverlapping1Dimension(bounds1.x, bounds1.width, bounds2.x, bounds2.width) &&
        isOverlapping1Dimension(bounds1.y, bounds1.height, bounds2.y, bounds2.height);
}
exports.isOverlappingBounds = isOverlappingBounds;
//# sourceMappingURL=movement-restrictor.js.map