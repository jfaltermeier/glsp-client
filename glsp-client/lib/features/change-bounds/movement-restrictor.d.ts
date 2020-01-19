import { Action, Bounds, BoundsAware, Point, PointToPointLine, SModelElement } from "sprotty/lib";
export interface IMovementRestrictor {
    attemptMove(element: SModelElement, mousePoint: Point, target: SModelElement, delta: Point, result: Action[]): boolean;
}
export declare class NoCollisionMovementRestrictor {
    hasCollided: boolean;
    attemptMove(element: SModelElement, mousePoint: Point, target: SModelElement, delta: Point, result: Action[]): boolean;
    /**
       * Used to return the collision target(s) or the collision chain in case of multiple selected elements
       */
    getCollisionChain(target: SModelElement, element: SModelElement, delta: Point, collisionChain: SModelElement[]): SModelElement[];
    /**
    * Returns bounds centered around the point
    */
    getCenteredBoundsToPointer(mousePoint: Point, bounds: Bounds): Bounds;
    getDistanceBetweenParallelLines(p1: Point, p2: Point, secondLine: PointToPointLine): Number;
    /**
     * Snaps the element to the target in case of a collision
     */
    getSnappedBounds(element: SModelElement & BoundsAware, target: SModelElement & BoundsAware): Bounds;
}
/**
* Used to check if 1D boxes (lines) overlap
*/
export declare function isOverlapping1Dimension(x1: number, width1: number, x2: number, width2: number): boolean;
/**
* Used to check if 2 bounds are overlapping
*/
export declare function isOverlappingBounds(bounds1: Bounds, bounds2: Bounds): boolean;
//# sourceMappingURL=movement-restrictor.d.ts.map