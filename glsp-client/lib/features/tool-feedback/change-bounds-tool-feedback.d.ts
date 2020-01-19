import { VNode } from "snabbdom/vnode";
import { Action, CommandExecutionContext, CommandReturn, MouseListener, Point, SModelElement } from "sprotty/lib";
import { IMovementRestrictor } from "../change-bounds/movement-restrictor";
import { FeedbackCommand } from "./model";
export declare class ShowChangeBoundsToolResizeFeedbackAction implements Action {
    readonly elementId?: string | undefined;
    kind: string;
    constructor(elementId?: string | undefined);
}
export declare class HideChangeBoundsToolResizeFeedbackAction implements Action {
    kind: string;
    constructor();
}
export declare class ShowChangeBoundsToolResizeFeedbackCommand extends FeedbackCommand {
    protected action: ShowChangeBoundsToolResizeFeedbackAction;
    static readonly KIND = "showChangeBoundsToolResizeFeedback";
    constructor(action: ShowChangeBoundsToolResizeFeedbackAction);
    execute(context: CommandExecutionContext): CommandReturn;
}
export declare class HideChangeBoundsToolResizeFeedbackCommand extends FeedbackCommand {
    protected action: HideChangeBoundsToolResizeFeedbackAction;
    static readonly KIND = "hideChangeBoundsToolResizeFeedback";
    constructor(action: HideChangeBoundsToolResizeFeedbackAction);
    execute(context: CommandExecutionContext): CommandReturn;
}
/**
 * This mouse listener provides visual feedback for moving by sending client-side
 * `MoveAction`s while elements are selected and dragged. This will also update
 * their bounds, which is important, as it is not only required for rendering
 * the visual feedback but also the basis for sending the change to the server
 * (see also `tools/MoveTool`).
 */
export declare class FeedbackMoveMouseListener extends MouseListener {
    protected movementRestrictor?: IMovementRestrictor | undefined;
    hasDragged: boolean;
    lastDragPosition: Point | undefined;
    constructor(movementRestrictor?: IMovementRestrictor | undefined);
    mouseDown(target: SModelElement, event: MouseEvent): Action[];
    mouseMove(target: SModelElement, event: MouseEvent): Action[];
    mouseEnter(target: SModelElement, event: MouseEvent): Action[];
    mouseUp(target: SModelElement, event: MouseEvent): Action[];
    decorate(vnode: VNode, element: SModelElement): VNode;
}
//# sourceMappingURL=change-bounds-tool-feedback.d.ts.map