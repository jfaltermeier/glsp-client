import { Action, Command, CommandExecutionContext, CommandReturn, IActionDispatcher } from "sprotty/lib";
import { Marker } from "../../utils/marker";
import { IFeedbackActionDispatcher, IFeedbackEmitter } from "../tool-feedback/feedback-action-dispatcher";
import { FeedbackCommand } from "../tool-feedback/model";
/**
* Action to retrieve markers for a model
*/
export declare class RequestMarkersAction implements Action {
    readonly elementsIDs: string[];
    static readonly KIND = "requestMarkers";
    readonly kind = "requestMarkers";
    constructor(elementsIDs?: string[]);
}
/**
 * Feedback emitter sending actions for visualizing model validation feedback and
 * re-establishing this feedback visualization after the model has been updated.
 */
export declare class ValidationFeedbackEmitter implements IFeedbackEmitter {
    protected feedbackActionDispatcher: IFeedbackActionDispatcher;
    protected actionDispatcher: () => Promise<IActionDispatcher>;
    private registeredAction;
    private constructor();
    /**
     * Register the action that should be emitted for visualizing validation feedback.
     * @param action the action that should be emitted when the model is updated and that will visualize the model validation feedback.
     */
    registerValidationFeedbackAction(action: MarkersAction): void;
}
/**
 * Interface for actions processing markers
 */
export interface MarkersAction extends Action {
    readonly markers: Marker[];
}
/**
 * Action to set markers for a model
 */
export declare class SetMarkersAction implements MarkersAction {
    readonly markers: Marker[];
    readonly kind = "setMarkers";
    constructor(markers: Marker[]);
}
/**
 * Command for handling `SetMarkersAction`
 */
export declare class SetMarkersCommand extends Command {
    action: SetMarkersAction;
    protected validationFeedbackEmitter: ValidationFeedbackEmitter;
    static readonly KIND = "setMarkers";
    constructor(action: SetMarkersAction);
    execute(context: CommandExecutionContext): CommandReturn;
    undo(context: CommandExecutionContext): CommandReturn;
    redo(context: CommandExecutionContext): CommandReturn;
}
/**
 * Action for applying makers to a model
 */
export declare class ApplyMarkersAction implements MarkersAction {
    readonly markers: Marker[];
    readonly kind: string;
    constructor(markers: Marker[]);
}
/**
 * Command for handling `ApplyMarkersAction`
 */
export declare class ApplyMarkersCommand extends FeedbackCommand {
    protected action: ApplyMarkersAction;
    static KIND: string;
    readonly priority = 0;
    constructor(action: ApplyMarkersAction);
    execute(context: CommandExecutionContext): CommandReturn;
    undo(context: CommandExecutionContext): CommandReturn;
    redo(context: CommandExecutionContext): CommandReturn;
}
/**
 * Action for clearing makers of a model
 */
export declare class ClearMarkersAction implements MarkersAction {
    readonly markers: Marker[];
    readonly kind: string;
    constructor(markers: Marker[]);
}
/**
 * Command for handling `ClearMarkersAction`
 */
export declare class ClearMarkersCommand extends Command {
    protected action: ClearMarkersAction;
    static KIND: string;
    constructor(action: ClearMarkersAction);
    execute(context: CommandExecutionContext): CommandReturn;
    undo(context: CommandExecutionContext): CommandReturn;
    redo(context: CommandExecutionContext): CommandReturn;
}
//# sourceMappingURL=validate.d.ts.map