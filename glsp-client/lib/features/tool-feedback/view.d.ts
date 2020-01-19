import { VNode } from "snabbdom/vnode";
import { IView, Point, RenderingContext, SModelElement } from "sprotty/lib";
import { SResizeHandle } from "../change-bounds/model";
/**
* This view is used for the invisible end of the feedback edge.
* A feedback edge is shown as a visual feedback when creating edges.
*/
export declare class FeedbackEdgeEndView implements IView {
    render(model: Readonly<SModelElement>, context: RenderingContext): VNode;
}
export declare class SResizeHandleView implements IView {
    render(handle: SResizeHandle, context: RenderingContext): VNode;
    protected getPosition(handle: SResizeHandle): Point | undefined;
    getRadius(): number;
}
//# sourceMappingURL=view.d.ts.map