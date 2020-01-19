import { AbstractUIExtension, Action, IActionDispatcher, IActionHandler, ICommand, SModelRoot } from "sprotty/lib";
import { Operation } from "../operation/set-operations";
export declare class ToolPalette extends AbstractUIExtension {
    protected readonly actionDispatcher: IActionDispatcher;
    static readonly ID = "glsp_tool_palette";
    readonly id = "glsp_tool_palette";
    readonly containerClass = "tool-palette";
    protected operations: Operation[];
    protected lastActivebutton?: HTMLElement;
    protected defaultToolsButton: HTMLElement;
    modelRootId: string;
    initialize(): boolean;
    protected initializeContents(containerElement: HTMLElement): void;
    protected onBeforeShow(containerElement: HTMLElement, root: Readonly<SModelRoot>): void;
    protected createBody(): void;
    protected createHeader(): void;
    protected createToolButton(operation: Operation): HTMLElement;
    protected onClickToolButton(button: HTMLElement, toolId?: string): (ev: MouseEvent) => void;
    setOperations(operations: Operation[]): void;
    changeActiveButton(button?: HTMLElement): void;
}
export declare class ToolPaletteActionHandler implements IActionHandler {
    protected readonly toolPalette: ToolPalette;
    handle(action: Action): ICommand | Action | void;
}
//# sourceMappingURL=tool-palette.d.ts.map