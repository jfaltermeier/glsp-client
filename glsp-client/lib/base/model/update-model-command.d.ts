import { Action, ActionHandlerRegistry, CommandExecutionContext, CommandReturn, IActionHandler, ILogger, SetModelAction, SModelRoot } from "sprotty/lib";
import { UpdateModelAction, UpdateModelCommand } from "sprotty/lib/features/update/update-model";
import { IFeedbackActionDispatcher } from "src/features/tool-feedback/feedback-action-dispatcher";
export declare class SetModelActionHandler implements IActionHandler {
    handle(action: Action): Action | void;
}
export declare function isSetModelAction(action: Action): action is SetModelAction;
export interface SModelRootListener {
    modelRootChanged(root: Readonly<SModelRoot>): void;
}
/**
 * A special`UpdateModelCommand` that retrieves all registered `actions` from the `IFeedbackActionDispatcher` (if present) and applies their feedback
 * to the `newRoot` before performing the update
 */
export declare class FeedbackAwareUpdateModelCommand extends UpdateModelCommand {
    protected logger: ILogger;
    protected readonly feedbackActionDispatcher: IFeedbackActionDispatcher;
    protected actionHandlerRegistryProvider: () => Promise<ActionHandlerRegistry>;
    protected modelRootListeners: SModelRootListener[];
    constructor(action: UpdateModelAction, logger: ILogger, feedbackActionDispatcher: IFeedbackActionDispatcher, actionHandlerRegistryProvider: () => Promise<ActionHandlerRegistry>, modelRootListeners?: SModelRootListener[]);
    protected performUpdate(oldRoot: SModelRoot, newRoot: SModelRoot, context: CommandExecutionContext): CommandReturn;
    private getFeedbackCommands;
}
//# sourceMappingURL=update-model-command.d.ts.map