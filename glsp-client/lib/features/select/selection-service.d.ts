import { Action, ILogger, SModelRoot } from "sprotty";
import { SModelRootListener } from "../../base/model/update-model-command";
import { IFeedbackActionDispatcher } from "../tool-feedback/feedback-action-dispatcher";
export interface SelectionListener {
    selectionChanged(root: Readonly<SModelRoot>, selectedElements: string[]): void;
}
export declare class SelectionService implements SModelRootListener {
    protected selectionListeners: SelectionListener[];
    private root;
    private selectedElementIDs;
    protected feedbackDispatcher: IFeedbackActionDispatcher;
    protected logger: ILogger;
    constructor(selectionListeners?: SelectionListener[]);
    register(selectionListener: SelectionListener): void;
    deregister(selectionListener: SelectionListener): void;
    modelRootChanged(root: Readonly<SModelRoot>): void;
    updateSelection(root: Readonly<SModelRoot>, select: string[], deselect: string[]): void;
    dispatchFeedback(actions: Action[]): void;
    notifyListeners(root: SModelRoot, selectedElementIDs: Set<string>): void;
    /**
     * QUERY METHODS
     */
    getSelectedElementIDs(): Set<string>;
    hasSelectedElements(): boolean;
    isSingleSelection(): boolean;
    isMultiSelection(): boolean;
}
//# sourceMappingURL=selection-service.d.ts.map