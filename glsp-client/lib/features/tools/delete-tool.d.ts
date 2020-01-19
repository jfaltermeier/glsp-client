import { Action, KeyListener, KeyTool, MouseListener, SModelElement, Tool } from "sprotty/lib";
import { IMouseTool } from "../mouse-tool/mouse-tool";
import { IFeedbackActionDispatcher } from "../tool-feedback/feedback-action-dispatcher";
/**
 * Deletes selected elements when hitting the `Del` key.
 */
export declare class DelKeyDeleteTool implements Tool {
    protected readonly keytool: KeyTool;
    static ID: string;
    readonly id: string;
    protected deleteKeyListener: DeleteKeyListener;
    constructor(keytool: KeyTool);
    enable(): void;
    disable(): void;
}
export declare class DeleteKeyListener extends KeyListener {
    keyDown(element: SModelElement, event: KeyboardEvent): Action[];
}
/**
 * Deletes selected elements when clicking on them.
 */
export declare class MouseDeleteTool implements Tool {
    protected mouseTool: IMouseTool;
    protected readonly feedbackDispatcher: IFeedbackActionDispatcher;
    static ID: string;
    readonly id: string;
    protected deleteToolMouseListener: DeleteToolMouseListener;
    constructor(mouseTool: IMouseTool, feedbackDispatcher: IFeedbackActionDispatcher);
    enable(): void;
    disable(): void;
}
export declare class DeleteToolMouseListener extends MouseListener {
    mouseUp(target: SModelElement, event: MouseEvent): Action[];
}
//# sourceMappingURL=delete-tool.d.ts.map