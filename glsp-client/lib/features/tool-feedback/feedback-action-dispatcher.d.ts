/********************************************************************************
 * Copyright (c) 2019 EclipseSource and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/
import { Action } from "sprotty/lib";
import { IActionDispatcher } from "sprotty/lib";
import { ILogger } from "sprotty/lib";
export interface IFeedbackEmitter {
}
/**
 * Dispatcher for actions that are meant to show visual feedback on
 * the diagram that is not part of the diagram sent from the server
 * after a model update.
 *
 * The purpose of this dispatcher is to re-establish the feedback
 * after the model has been updated or reset by the server, as this would
 * overwrite the already established feedback, in case it is drawn by
 * extending the `SModelRoot`. Therefore, tools can register themselves
 * as feedback emitters with actions they want to place for showing
 * feedback. This dispatcher will then re-establish all feedback actions
 * of the registered tools, whenever the `SModelRoot` has been set or updated.
 */
export interface IFeedbackActionDispatcher {
    /**
     * Registers `actions` to be sent out by a `feedbackEmitter`.
     * @param feedbackEmitter the emitter sending out feedback actions.
     * @param actions the actions to be sent out.
     */
    registerFeedback(feedbackEmitter: IFeedbackEmitter, actions: Action[]): void;
    /**
     * Deregisters a `feedbackEmitter` from this dispatcher and thereafter
     * dispatches the provided `actions`.
     * @param feedbackEmitter the emitter to be deregistered.
     * @param actions the actions to be dispatched right after the deregistration.
     * These actions do not have to be related to the actions sent out by the
     * deregistered `feedbackEmitter`. The purpose of these actions typically is
     * to reset the normal state of the diagram without the feedback (e.g., reset a
     * CSS class that was set by a feedbackEmitter).
     */
    deregisterFeedback(feedbackEmitter: IFeedbackEmitter, actions: Action[]): void;
    /**
    * Retrieve all `actions` sent out by currently registered `feedbackEmitter`.
    */
    getRegisteredFeedback(): Action[];
}
export declare class FeedbackActionDispatcher implements IFeedbackActionDispatcher {
    protected actionDispatcher: () => Promise<IActionDispatcher>;
    protected logger: ILogger;
    protected feedbackEmitters: Map<IFeedbackEmitter, Action[]>;
    constructor(actionDispatcher: () => Promise<IActionDispatcher>, logger: ILogger);
    registerFeedback(feedbackEmitter: IFeedbackEmitter, actions: Action[]): void;
    deregisterFeedback(feedbackEmitter: IFeedbackEmitter, actions: Action[]): void;
    private dispatch;
    getRegisteredFeedback(): Action[];
    getRegisteredFeedbackEmitters(action: Action): IFeedbackEmitter[];
}
//# sourceMappingURL=feedback-action-dispatcher.d.ts.map