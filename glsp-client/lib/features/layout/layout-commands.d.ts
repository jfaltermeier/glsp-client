import { Action, Command, CommandExecutionContext, CommandReturn, Dimension, ElementAndBounds, ElementMove, IActionDispatcher, KeyListener, Point, SModelElement } from "sprotty";
import { SelectableBoundsAware } from "../../utils/smodel-util";
import { SelectionService } from "../select/selection-service";
export declare enum ResizeDimension {
    Width = 0,
    Height = 1,
    Width_And_Height = 2
}
export declare namespace Reduce {
    function min(...values: number[]): number;
    function max(...values: number[]): number;
    function avg(...values: number[]): number;
    function first(...values: number[]): number;
    function last(...values: number[]): number;
}
export declare class ResizeElementsAction implements Action {
    /**
     * IDs of the elements that should be resized. If no IDs are given, the selected elements will be resized.
     */
    readonly elementIds: string[];
    /**
     * Resize dimension.
     */
    readonly dimension: ResizeDimension;
    /**
     * Function to reduce the dimension to a target dimension value, see Reduce.* for potential functions.
     */
    readonly reductionFunction: (...values: number[]) => number;
    readonly kind = "layout:resize";
    constructor(
    /**
     * IDs of the elements that should be resized. If no IDs are given, the selected elements will be resized.
     */
    elementIds: string[], 
    /**
     * Resize dimension.
     */
    dimension: ResizeDimension, 
    /**
     * Function to reduce the dimension to a target dimension value, see Reduce.* for potential functions.
     */
    reductionFunction: (...values: number[]) => number);
}
export declare enum Alignment {
    Left = 0,
    Center = 1,
    Right = 2,
    Top = 3,
    Middle = 4,
    Bottom = 5
}
export declare namespace Select {
    function all(elements: SelectableBoundsAware[]): (SModelElement & import("sprotty").BoundsAware & import("sprotty").Selectable)[];
    function first(elements: SelectableBoundsAware[]): (SModelElement & import("sprotty").BoundsAware & import("sprotty").Selectable)[];
    function last(elements: SelectableBoundsAware[]): (SModelElement & import("sprotty").BoundsAware & import("sprotty").Selectable)[];
}
export declare class AlignElementsAction implements Action {
    /**
     * IDs of the elements that should be aligned. If no IDs are given, the selected elements will be aligned.
     */
    readonly elementIds: string[];
    /**
     * Alignment direction.
     */
    readonly alignment: Alignment;
    /**
     * Function to selected elements that are considered during alignment calculation, see Select.* for potential functions.
     */
    readonly selectionFunction: (elements: SelectableBoundsAware[]) => SelectableBoundsAware[];
    readonly kind = "layout:align";
    constructor(
    /**
     * IDs of the elements that should be aligned. If no IDs are given, the selected elements will be aligned.
     */
    elementIds?: string[], 
    /**
     * Alignment direction.
     */
    alignment?: Alignment, 
    /**
     * Function to selected elements that are considered during alignment calculation, see Select.* for potential functions.
     */
    selectionFunction?: (elements: SelectableBoundsAware[]) => SelectableBoundsAware[]);
}
declare abstract class LayoutElementsCommand extends Command {
    protected action: ResizeElementsAction | AlignElementsAction;
    protected actionDispatcher: IActionDispatcher;
    protected selectionService: SelectionService;
    constructor(action: ResizeElementsAction | AlignElementsAction, actionDispatcher: IActionDispatcher, selectionService: SelectionService);
    getActionElements(context: CommandExecutionContext): SelectableBoundsAware[];
    dispatchAction(action: Action): void;
    dispatchActions(actions: Action[]): void;
}
export declare class ResizeElementsCommand extends LayoutElementsCommand {
    protected action: ResizeElementsAction;
    protected actionDispatcher: IActionDispatcher;
    protected selectionService: SelectionService;
    static readonly KIND = "layout:resize";
    constructor(action: ResizeElementsAction, actionDispatcher: IActionDispatcher, selectionService: SelectionService);
    execute(context: CommandExecutionContext): CommandReturn;
    resizeWidth(elements: SelectableBoundsAware[]): void;
    resizeHeight(elements: SelectableBoundsAware[]): void;
    resizeWidthAndHeight(elements: SelectableBoundsAware[]): void;
    dispatchResizeActions(elements: SelectableBoundsAware[], change: (element: SelectableBoundsAware, bounds: WriteableElementAndBounds) => void): void;
    createElementAndBounds(element: SelectableBoundsAware, change: (element: SelectableBoundsAware, bounds: WriteableElementAndBounds) => void): WriteableElementAndBounds;
    undo(context: CommandExecutionContext): CommandReturn;
    redo(context: CommandExecutionContext): CommandReturn;
}
export declare class AlignElementsCommand extends LayoutElementsCommand {
    protected action: AlignElementsAction;
    protected actionDispatcher: IActionDispatcher;
    protected selectionService: SelectionService;
    static readonly KIND = "layout:align";
    constructor(action: AlignElementsAction, actionDispatcher: IActionDispatcher, selectionService: SelectionService);
    execute(context: CommandExecutionContext): CommandReturn;
    alignLeft(elements: SelectableBoundsAware[]): void;
    alignCenter(elements: SelectableBoundsAware[]): void;
    alignRight(elements: SelectableBoundsAware[]): void;
    alignTop(elements: SelectableBoundsAware[]): void;
    alignMiddle(elements: SelectableBoundsAware[]): void;
    alignBottom(elements: SelectableBoundsAware[]): void;
    dispatchAlignActions(elements: SelectableBoundsAware[], change: (element: SelectableBoundsAware, move: WriteableElementMove) => void): void;
    createElementMove(element: SelectableBoundsAware, change: (element: SelectableBoundsAware, move: WriteableElementMove) => void): WriteableElementMove;
    createElementAndBounds(element: SelectableBoundsAware, move: ElementMove): ElementAndBounds;
    undo(context: CommandExecutionContext): CommandReturn;
    redo(context: CommandExecutionContext): CommandReturn;
}
export declare class LayoutKeyboardListener extends KeyListener {
    keyDown(element: SModelElement, event: KeyboardEvent): Action[];
}
interface WriteablePoint extends Point {
    x: number;
    y: number;
}
interface WriteableElementMove extends ElementMove {
    fromPosition?: WriteablePoint;
    toPosition: WriteablePoint;
}
interface WriteableDimension extends Dimension {
    width: number;
    height: number;
}
interface WriteableElementAndBounds extends ElementAndBounds {
    newPosition: WriteablePoint;
    newSize: WriteableDimension;
}
export {};
//# sourceMappingURL=layout-commands.d.ts.map