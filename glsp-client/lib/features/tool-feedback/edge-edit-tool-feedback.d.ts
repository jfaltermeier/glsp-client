import { VNode } from "snabbdom/vnode";
import { Action, AnchorComputerRegistry, CommandExecutionContext, CommandReturn, EdgeRouterRegistry, MouseListener, Point, SModelElement, SRoutingHandle, SwitchEditModeAction, SwitchEditModeCommand } from "sprotty/lib";
import { FeedbackEdgeEndMovingMouseListener } from "./creation-tool-feedback";
import { FeedbackCommand } from "./model";
/**
 * RECONNECT HANDLES FEEDBACK
 */
export declare class ShowEdgeReconnectHandlesFeedbackAction implements Action {
    readonly elementId?: string | undefined;
    kind: string;
    constructor(elementId?: string | undefined);
}
export declare class HideEdgeReconnectHandlesFeedbackAction implements Action {
    kind: string;
    constructor();
}
export declare class ShowEdgeReconnectHandlesFeedbackCommand extends FeedbackCommand {
    protected action: ShowEdgeReconnectHandlesFeedbackAction;
    static readonly KIND = "showReconnectHandlesFeedback";
    constructor(action: ShowEdgeReconnectHandlesFeedbackAction);
    execute(context: CommandExecutionContext): CommandReturn;
}
export declare class HideEdgeReconnectHandlesFeedbackCommand extends FeedbackCommand {
    protected action: HideEdgeReconnectHandlesFeedbackAction;
    static readonly KIND = "hideReconnectHandlesFeedback";
    constructor(action: HideEdgeReconnectHandlesFeedbackAction);
    execute(context: CommandExecutionContext): CommandReturn;
}
/**
 * ROUTING FEEDBACK
 */
export declare class SwitchRoutingModeAction extends SwitchEditModeAction {
    readonly kind: string;
}
export declare class SwitchRoutingModeCommand extends SwitchEditModeCommand {
    static KIND: string;
    constructor(action: SwitchRoutingModeAction);
}
/**
 * SOURCE AND TARGET EDGE FEEDBACK
 */
export declare class DrawFeedbackEdgeSourceAction implements Action {
    readonly elementTypeId: string;
    readonly targetId: string;
    kind: string;
    constructor(elementTypeId: string, targetId: string);
}
export declare class DrawFeedbackEdgeSourceCommand extends FeedbackCommand {
    protected action: DrawFeedbackEdgeSourceAction;
    static readonly KIND = "drawFeedbackEdgeSource";
    constructor(action: DrawFeedbackEdgeSourceAction);
    execute(context: CommandExecutionContext): CommandReturn;
}
/**
 * SOURCE AND TARGET MOUSE MOVE LISTENER
 */
export declare class FeedbackEdgeTargetMovingMouseListener extends FeedbackEdgeEndMovingMouseListener {
    protected anchorRegistry: AnchorComputerRegistry;
    constructor(anchorRegistry: AnchorComputerRegistry);
}
export declare class FeedbackEdgeSourceMovingMouseListener extends MouseListener {
    protected anchorRegistry: AnchorComputerRegistry;
    constructor(anchorRegistry: AnchorComputerRegistry);
    mouseMove(target: SModelElement, event: MouseEvent): Action[];
}
export declare class FeedbackEdgeRouteMovingMouseListener extends MouseListener {
    protected edgeRouterRegistry?: EdgeRouterRegistry | undefined;
    hasDragged: boolean;
    lastDragPosition: Point | undefined;
    constructor(edgeRouterRegistry?: EdgeRouterRegistry | undefined);
    mouseDown(target: SModelElement, event: MouseEvent): Action[];
    mouseMove(target: SModelElement, event: MouseEvent): Action[];
    protected getHandlePosition(handle: SRoutingHandle): Point | undefined;
    mouseEnter(target: SModelElement, event: MouseEvent): Action[];
    mouseUp(target: SModelElement, event: MouseEvent): Action[];
    decorate(vnode: VNode, element: SModelElement): VNode;
}
//# sourceMappingURL=edge-edit-tool-feedback.d.ts.map