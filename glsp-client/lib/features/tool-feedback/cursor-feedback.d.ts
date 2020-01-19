import { Action, CommandExecutionContext, SModelRoot } from "sprotty/lib";
import { FeedbackCommand } from "./model";
export declare enum CursorCSS {
    DEFAULT = "default-mode",
    OVERLAP_FORBIDDEN = "overlap-forbidden-mode",
    NODE_CREATION = "node-creation-mode",
    EDGE_CREATION_SOURCE = "edge-creation-select-source-mode",
    EDGE_CREATION_TARGET = "edge-creation-select-target-mode",
    EDGE_RECONNECT = "edge-reconnect-select-target-mode",
    OPERATION_NOT_ALLOWED = "edge-modification-not-allowed-mode",
    ELEMENT_DELETION = "element-deletion-mode"
}
export declare class ApplyCursorCSSFeedbackAction implements Action {
    readonly cssClass?: CursorCSS | undefined;
    kind: string;
    constructor(cssClass?: CursorCSS | undefined);
}
export declare class ApplyCursorCSSFeedbackActionCommand extends FeedbackCommand {
    readonly action: ApplyCursorCSSFeedbackAction;
    static readonly KIND = "applyCursorCssFeedback";
    constructor(action: ApplyCursorCSSFeedbackAction);
    execute(context: CommandExecutionContext): SModelRoot;
}
//# sourceMappingURL=cursor-feedback.d.ts.map