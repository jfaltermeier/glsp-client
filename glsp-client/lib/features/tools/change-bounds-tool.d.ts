import { Action, BoundsAware, Dimension, EdgeRouterRegistry, ElementAndBounds, KeyTool, ModelLayoutOptions, MouseListener, Point, SModelElement, SModelRoot, SParentElement, Tool } from "sprotty/lib";
import { SResizeHandle } from "../change-bounds/model";
import { IMovementRestrictor } from "../change-bounds/movement-restrictor";
import { IMouseTool } from "../mouse-tool/mouse-tool";
import { SelectionListener, SelectionService } from "../select/selection-service";
import { IFeedbackActionDispatcher } from "../tool-feedback/feedback-action-dispatcher";
/**
 * The change bounds tool has the license to move multiple elements or resize a single element by implementing the ChangeBounds operation.
 * In contrast to Sprotty's implementation this tool only sends a `ChangeBoundsOperationAction` when an operation has finished and does not
 * provide client-side live updates to improve performance.
 *
 * | Operation | Client Update    | Server Update
 * +-----------+------------------+----------------------------
 * | Move      | MoveAction       | ChangeBoundsOperationAction
 * | Resize    | SetBoundsAction  | ChangeBoundsOperationAction
 *
 * To provide a visual client updates during move we install the `FeedbackMoveMouseListener` and to provide visual client updates during resize
 * and send the server updates we install the `ChangeBoundsListener`.
 */
export declare class ChangeBoundsTool implements Tool {
    protected selectionService: SelectionService;
    protected mouseTool: IMouseTool;
    protected keyTool: KeyTool;
    protected feedbackDispatcher: IFeedbackActionDispatcher;
    readonly edgeRouterRegistry?: EdgeRouterRegistry | undefined;
    protected movementRestrictor?: IMovementRestrictor | undefined;
    static ID: string;
    readonly id: string;
    protected feedbackMoveMouseListener: MouseListener;
    protected changeBoundsListener: MouseListener & SelectionListener;
    constructor(selectionService: SelectionService, mouseTool: IMouseTool, keyTool: KeyTool, feedbackDispatcher: IFeedbackActionDispatcher, edgeRouterRegistry?: EdgeRouterRegistry | undefined, movementRestrictor?: IMovementRestrictor | undefined);
    enable(): void;
    protected createMoveMouseListener(): MouseListener;
    protected createChangeBoundsListener(): MouseListener & SelectionListener;
    disable(): void;
    dispatchFeedback(actions: Action[]): void;
}
export declare class ChangeBoundsListener extends MouseListener implements SelectionListener {
    protected tool: ChangeBoundsTool;
    protected lastDragPosition?: Point;
    protected positionDelta: Point;
    protected activeResizeElementId?: string;
    protected activeResizeHandle?: SResizeHandle;
    constructor(tool: ChangeBoundsTool);
    mouseDown(target: SModelElement, event: MouseEvent): Action[];
    mouseMove(target: SModelElement, event: MouseEvent): Action[];
    mouseUp(target: SModelElement, event: MouseEvent): Action[];
    selectionChanged(root: SModelRoot, selectedElements: string[]): void;
    protected setActiveResizeElement(target: SModelElement): boolean;
    protected isActiveResizeElement(element?: SModelElement): element is SParentElement & BoundsAware;
    protected initPosition(event: MouseEvent): void;
    protected updatePosition(target: SModelElement, event: MouseEvent): boolean;
    protected reset(): void;
    protected resetPosition(): void;
    protected handleElementResize(): Action[];
    protected createChangeBoundsAction(element: SModelElement & BoundsAware): Action[];
    protected createElementAndBounds(element: SModelElement & BoundsAware): ElementAndBounds[];
    protected createSetBoundsAction(element: SModelElement & BoundsAware, x: number, y: number, width: number, height: number): Action[];
    protected isValidBoundChange(element: SModelElement & BoundsAware, newPosition: Point, newSize: Dimension): boolean;
    protected minWidth(element: SModelElement & BoundsAware): number;
    protected minHeight(element: SModelElement & BoundsAware): number;
    protected getLayoutOptions(element: SModelElement): ModelLayoutOptions | undefined;
}
//# sourceMappingURL=change-bounds-tool.d.ts.map