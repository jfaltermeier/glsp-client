import { Action, CommandExecutionContext, CommandReturn, IActionHandler, ICommand, SModelElement, SModelElementSchema } from "sprotty/lib";
import { IFeedbackActionDispatcher } from "../tool-feedback/feedback-action-dispatcher";
import { FeedbackCommand } from "../tool-feedback/model";
export declare abstract class TypeHint {
    /**
    The id of the element.
    */
    readonly elementTypeId: string;
    /**
    * Specifies whether the element can be relocated.
    */
    readonly repositionable: boolean;
    /**
     * Specifices wheter the element can be deleted
     */
    readonly deletable: boolean;
}
export declare class ShapeTypeHint extends TypeHint {
    /**
     * Specifies whether the element can be resized.
     */
    readonly resizable: boolean;
    /**
     * Specifies whether the element can be moved to another parent
     */
    readonly reparentable: boolean;
    /**
     * The types of elements that can be contained by this element (if any)
     */
    readonly containableElementTypeIds?: string[];
}
export declare class EdgeTypeHint extends TypeHint {
    /**
     * Specifies whether the routing of this element can be changed.
     */
    readonly routable: boolean;
    /**
     * Allowed source element types for this edge type
     */
    readonly sourceElementTypeIds: string[];
    /**
    * Allowed targe element types for this edge type
    */
    readonly targetElementTypeIds: string[];
    isAllowedSource(input: SModelElement | SModelElementSchema | string): boolean;
    isAllowedTarget(input: SModelElement | SModelElementSchema | string): boolean;
}
export declare class ApplyTypeHintsAction implements Action {
    readonly kind: string;
    constructor();
}
export declare class ApplyTypeHintsCommand extends FeedbackCommand {
    protected action: ApplyTypeHintsAction;
    protected typeHintProvider: ITypeHintProvider;
    static KIND: string;
    readonly priority = 10;
    constructor(action: ApplyTypeHintsAction, typeHintProvider: ITypeHintProvider);
    execute(context: CommandExecutionContext): CommandReturn;
    protected applyEdgeTypeHint(element: SModelElement): void;
    protected applyShapeTypeHint(element: SModelElement): void;
}
export interface ITypeHintProvider {
    getShapeTypeHint(input: SModelElement | SModelElement | string): ShapeTypeHint | undefined;
    getEdgeTypeHint(input: SModelElement | SModelElement | string): EdgeTypeHint | undefined;
    getValidEdgeElementTypes(input: SModelElement | SModelElement | string, role: "source" | "target"): string[];
}
export declare class TypeHintProvider implements IActionHandler, ITypeHintProvider {
    protected feedbackActionDispatcher: IFeedbackActionDispatcher;
    protected shapeHints: Map<string, ShapeTypeHint>;
    protected edgeHints: Map<string, EdgeTypeHint>;
    handle(action: Action): ICommand | Action | void;
    getValidEdgeElementTypes(input: SModelElement | SModelElement | string, role: "source" | "target"): string[];
    getShapeTypeHint(input: SModelElement | SModelElement | string): ShapeTypeHint | undefined;
    getEdgeTypeHint(input: SModelElement | SModelElement | string): EdgeTypeHint | undefined;
}
export declare function getElementTypeId(input: SModelElement | SModelElementSchema | string): string;
//# sourceMappingURL=type-hints.d.ts.map