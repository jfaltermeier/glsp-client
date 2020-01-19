import { Action, ActionHandlerRegistry, ActionMessage, ComputedBoundsAction, DiagramServer, ICommand } from "sprotty";
import * as rpc from "vscode-ws-jsonrpc";
export declare class GLSPWebsocketDiagramServer extends DiagramServer {
    protected _sourceUri: string;
    protected connection: rpc.MessageConnection;
    listen(webSocket: WebSocket): void;
    protected sendMessage(message: ActionMessage): void;
    initialize(registry: ActionHandlerRegistry): void;
    handle(action: Action): void | ICommand | Action;
    getSourceURI(): string;
    protected handleComputedBounds(action: ComputedBoundsAction): boolean;
}
export declare function registerDefaultGLSPServerActions(registry: ActionHandlerRegistry, diagramServer: DiagramServer): void;
//# sourceMappingURL=websocket-diagram-server.d.ts.map