import { Action, ICommandPaletteActionProvider, LabeledAction, Point, SModelElement } from "sprotty/lib";
import { GLSPActionDispatcher } from "../request-response/glsp-action-dispatcher";
export declare namespace ServerCommandPalette {
    const KEY = "command-palette";
    const TEXT = "text";
    const INDEX = "index";
}
export declare class ServerCommandPaletteActionProvider implements ICommandPaletteActionProvider {
    protected actionDispatcher: GLSPActionDispatcher;
    constructor(actionDispatcher: GLSPActionDispatcher);
    getActions(root: Readonly<SModelElement>, text: string, lastMousePosition?: Point, index?: number): Promise<LabeledAction[]>;
    getPaletteActionsFromResponse(action: Action): LabeledAction[];
}
//# sourceMappingURL=server-command-palette-provider.d.ts.map