import { CommandStack, IActionDispatcher, SModelRoot } from "sprotty/lib";
export declare class GLSPCommandStack extends CommandStack {
    protected actionDispatcher: () => Promise<IActionDispatcher>;
    undo(): Promise<SModelRoot>;
    redo(): Promise<SModelRoot>;
}
//# sourceMappingURL=command-stack.d.ts.map