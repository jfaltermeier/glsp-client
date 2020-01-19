import { Action, AnchorComputerRegistry, CommandExecutionContext, CommandReturn, MouseListener, SDanglingAnchor, SModelElement, SModelRoot, SRoutableElement } from "sprotty/lib";
import { FeedbackCommand } from "./model";
export declare class DrawFeedbackEdgeAction implements Action {
    readonly elementTypeId: string;
    readonly sourceId: string;
    readonly routerKind?: string | undefined;
    kind: string;
    constructor(elementTypeId: string, sourceId: string, routerKind?: string | undefined);
}
export declare class DrawFeedbackEdgeCommand extends FeedbackCommand {
    protected action: DrawFeedbackEdgeAction;
    static readonly KIND = "drawFeedbackEdge";
    constructor(action: DrawFeedbackEdgeAction);
    execute(context: CommandExecutionContext): CommandReturn;
}
export declare class RemoveFeedbackEdgeAction implements Action {
    kind: string;
    constructor();
}
export declare class RemoveFeedbackEdgeCommand extends FeedbackCommand {
    static readonly KIND = "removeFeedbackEdgeCommand";
    execute(context: CommandExecutionContext): CommandReturn;
}
export declare class FeedbackEdgeEnd extends SDanglingAnchor {
    readonly sourceId: string;
    readonly elementTypeId: string;
    feedbackEdge: SRoutableElement | undefined;
    static readonly TYPE = "feedback-edge-end";
    type: string;
    constructor(sourceId: string, elementTypeId: string, feedbackEdge?: SRoutableElement | undefined);
}
export declare class FeedbackEdgeEndMovingMouseListener extends MouseListener {
    protected anchorRegistry: AnchorComputerRegistry;
    constructor(anchorRegistry: AnchorComputerRegistry);
    mouseMove(target: SModelElement, event: MouseEvent): Action[];
}
export declare function feedbackEdgeId(root: SModelRoot): string;
export declare function feedbackEdgeEndId(root: SModelRoot): string;
//# sourceMappingURL=creation-tool-feedback.d.ts.map