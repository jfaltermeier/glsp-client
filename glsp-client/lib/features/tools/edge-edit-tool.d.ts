import { Action, AnchorComputerRegistry, Connectable, EdgeRouterRegistry, MouseListener, SModelElement, SModelRoot, SRoutableElement, SRoutingHandle, Tool } from "sprotty/lib";
import { IMouseTool } from "../mouse-tool/mouse-tool";
import { SReconnectHandle } from "../reconnect/model";
import { SelectionListener, SelectionService } from "../select/selection-service";
import { FeedbackEdgeRouteMovingMouseListener, FeedbackEdgeSourceMovingMouseListener, FeedbackEdgeTargetMovingMouseListener } from "../tool-feedback/edge-edit-tool-feedback";
import { IFeedbackActionDispatcher } from "../tool-feedback/feedback-action-dispatcher";
export declare class EdgeEditTool implements Tool {
    protected selectionService: SelectionService;
    protected mouseTool: IMouseTool;
    protected feedbackDispatcher: IFeedbackActionDispatcher;
    protected anchorRegistry: AnchorComputerRegistry;
    protected edgeRouterRegistry?: EdgeRouterRegistry | undefined;
    static ID: string;
    readonly id: string;
    protected feedbackEdgeSourceMovingListener: FeedbackEdgeSourceMovingMouseListener;
    protected feedbackEdgeTargetMovingListener: FeedbackEdgeTargetMovingMouseListener;
    protected feedbackMovingListener: FeedbackEdgeRouteMovingMouseListener;
    protected reconnectEdgeListener: ReconnectEdgeListener;
    constructor(selectionService: SelectionService, mouseTool: IMouseTool, feedbackDispatcher: IFeedbackActionDispatcher, anchorRegistry: AnchorComputerRegistry, edgeRouterRegistry?: EdgeRouterRegistry | undefined);
    enable(): void;
    disable(): void;
    dispatchFeedback(actions: Action[]): void;
}
declare class ReconnectEdgeListener extends MouseListener implements SelectionListener {
    protected tool: EdgeEditTool;
    protected isMouseDown: boolean;
    protected edge?: SRoutableElement;
    protected routingHandle?: SRoutingHandle;
    protected newConnectable?: SModelElement & Connectable;
    protected reconnectMode?: 'NEW_SOURCE' | 'NEW_TARGET';
    constructor(tool: EdgeEditTool);
    protected isValidEdge(edge?: SRoutableElement): edge is SRoutableElement;
    protected setEdgeSelected(edge: SRoutableElement): void;
    protected isEdgeSelected(): boolean;
    protected setReconnectHandleSelected(edge: SRoutableElement, reconnectHandle: SReconnectHandle): void;
    protected isReconnecting(): boolean;
    protected isReconnectingNewSource(): boolean;
    protected setRoutingHandleSelected(edge: SRoutableElement, routingHandle: SRoutingHandle): void;
    protected requiresReconnect(sourceId: string, targetId: string): boolean;
    protected setNewConnectable(connectable?: SModelElement & Connectable): void;
    protected isReadyToReconnect(): boolean | undefined;
    protected isReadyToReroute(): boolean;
    mouseDown(target: SModelElement, event: MouseEvent): Action[];
    mouseMove(target: SModelElement, event: MouseEvent): Action[];
    mouseUp(target: SModelElement, event: MouseEvent): Action[];
    mouseOver(target: SModelElement, event: MouseEvent): Action[];
    selectionChanged(root: Readonly<SModelRoot>, selectedElements: string[]): void;
    reset(): void;
    protected resetData(): void;
    protected resetFeedback(): void;
}
export {};
//# sourceMappingURL=edge-edit-tool.d.ts.map