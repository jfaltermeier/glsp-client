import { Action, AnchorComputerRegistry, SEdge, SModelElement, Tool } from "sprotty/lib";
import { TypeAware } from "../../base/tool-manager/tool-manager-action-handler";
import { Containable } from "../hints/model";
import { ITypeHintProvider } from "../hints/type-hints";
import { IMouseTool } from "../mouse-tool/mouse-tool";
import { FeedbackEdgeEndMovingMouseListener } from "../tool-feedback/creation-tool-feedback";
import { IFeedbackActionDispatcher } from "../tool-feedback/feedback-action-dispatcher";
import { DragAwareMouseListener } from "./drag-aware-mouse-listener";
export declare const TOOL_ID_PREFIX = "tool";
export declare function deriveToolId(operationKind: string, elementTypeId?: string): string;
export declare class NodeCreationTool implements Tool, TypeAware {
    protected mouseTool: IMouseTool;
    protected feedbackDispatcher: IFeedbackActionDispatcher;
    elementTypeId: string;
    protected creationToolMouseListener: NodeCreationToolMouseListener;
    constructor(mouseTool: IMouseTool, feedbackDispatcher: IFeedbackActionDispatcher);
    readonly id: string;
    enable(): void;
    disable(): void;
    dispatchFeedback(actions: Action[]): void;
}
export declare class NodeCreationToolMouseListener extends DragAwareMouseListener {
    protected elementTypeId: string;
    protected tool: NodeCreationTool;
    protected container?: SModelElement & Containable;
    constructor(elementTypeId: string, tool: NodeCreationTool);
    protected creationAllowed(elementTypeId: string): boolean | undefined;
    nonDraggingMouseUp(target: SModelElement, event: MouseEvent): Action[];
    mouseOver(target: SModelElement, event: MouseEvent): Action[];
}
/**
 * Tool to create connections in a Diagram, by selecting a source and target node.
 */
export declare class EdgeCreationTool implements Tool, TypeAware {
    protected mouseTool: IMouseTool;
    protected feedbackDispatcher: IFeedbackActionDispatcher;
    protected anchorRegistry: AnchorComputerRegistry;
    readonly typeHintProvider: ITypeHintProvider;
    elementTypeId: string;
    protected creationToolMouseListener: EdgeCreationToolMouseListener;
    protected feedbackEndMovingMouseListener: FeedbackEdgeEndMovingMouseListener;
    constructor(mouseTool: IMouseTool, feedbackDispatcher: IFeedbackActionDispatcher, anchorRegistry: AnchorComputerRegistry, typeHintProvider: ITypeHintProvider);
    readonly id: string;
    enable(): void;
    disable(): void;
    dispatchFeedback(actions: Action[]): void;
}
export declare class EdgeCreationToolMouseListener extends DragAwareMouseListener {
    protected elementTypeId: string;
    protected tool: EdgeCreationTool;
    protected source?: string;
    protected target?: string;
    protected currentTarget?: SModelElement;
    protected allowedTarget: boolean;
    protected proxyEdge: SEdge;
    constructor(elementTypeId: string, tool: EdgeCreationTool);
    protected reinitialize(): void;
    nonDraggingMouseUp(element: SModelElement, event: MouseEvent): Action[];
    protected isSourceSelected(): boolean;
    protected isTargetSelected(): boolean;
    mouseOver(target: SModelElement, event: MouseEvent): Action[];
    protected isAllowedSource(element: SModelElement | undefined): boolean;
    protected isAllowedTarget(element: SModelElement | undefined): boolean;
}
//# sourceMappingURL=creation-tool.d.ts.map