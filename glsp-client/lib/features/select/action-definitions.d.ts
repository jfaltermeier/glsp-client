import { Command, CommandExecutionContext, SelectAction, SelectAllAction, SModelElement, SModelRoot, SParentElement } from "sprotty";
import { SelectionService } from "./selection-service";
export declare class SelectFeedbackAction {
    readonly selectedElementsIDs: string[];
    readonly deselectedElementsIDs: string[];
    kind: string;
    constructor(selectedElementsIDs?: string[], deselectedElementsIDs?: string[]);
}
export declare class SelectAllFeedbackAction {
    readonly select: boolean;
    kind: string;
    /**
     * If `select` is true, all elements are selected, othewise they are deselected.
     */
    constructor(select?: boolean);
}
export declare class SelectFeedbackCommand extends Command {
    action: SelectFeedbackAction;
    static readonly KIND = "elementSelectedFeedback";
    private sprottySelectCommand;
    constructor(action: SelectFeedbackAction);
    execute(context: CommandExecutionContext): SModelRoot;
    undo(context: CommandExecutionContext): SModelRoot;
    redo(context: CommandExecutionContext): SModelRoot;
}
export declare class SelectAllFeedbackCommand extends Command {
    action: SelectAllFeedbackAction;
    static readonly KIND = "allSelectedFeedback";
    private sprottySelectAllCommand;
    constructor(action: SelectAllFeedbackAction);
    execute(context: CommandExecutionContext): SModelRoot;
    undo(context: CommandExecutionContext): SModelRoot;
    redo(context: CommandExecutionContext): SModelRoot;
}
export declare class SelectCommand extends Command {
    action: SelectAction;
    selectionService: SelectionService;
    static readonly KIND = "elementSelected";
    protected selected: SModelElement[];
    protected deselected: SModelElement[];
    constructor(action: SelectAction, selectionService: SelectionService);
    execute(context: CommandExecutionContext): SModelRoot;
    undo(context: CommandExecutionContext): SModelRoot;
    redo(context: CommandExecutionContext): SModelRoot;
}
export declare class SelectAllCommand extends Command {
    action: SelectAllAction;
    selectionService: SelectionService;
    static readonly KIND = "allSelected";
    protected previousSelection: Map<string, boolean>;
    constructor(action: SelectAllAction, selectionService: SelectionService);
    execute(context: CommandExecutionContext): SModelRoot;
    undo(context: CommandExecutionContext): SModelRoot;
    redo(context: CommandExecutionContext): SModelRoot;
    protected selectAll(element: SParentElement, newState: boolean, selected: string[]): void;
}
//# sourceMappingURL=action-definitions.d.ts.map