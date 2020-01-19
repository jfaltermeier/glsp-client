import { Action, IContextMenuItemProvider, LabeledAction, Point, SModelElement } from "sprotty/lib";
import { GLSPActionDispatcher } from "../request-response/glsp-action-dispatcher";
export declare namespace ServerContextMenu {
    const KEY = "context-menu";
}
export declare class ServerContextMenuItemProvider implements IContextMenuItemProvider {
    protected actionDispatcher: GLSPActionDispatcher;
    constructor(actionDispatcher: GLSPActionDispatcher);
    getItems(root: Readonly<SModelElement>, lastMousePosition?: Point): Promise<LabeledAction[]>;
    getContextActionsFromResponse(action: Action): LabeledAction[];
}
//# sourceMappingURL=server-context-menu-provider.d.ts.map