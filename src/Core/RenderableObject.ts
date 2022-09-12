import RenderComponent2D from "./RenderComponent2D";
import RenderComponent3D from "./RenderComponent3D";

export default interface RenderableObject {
    RenderableComponents:RenderComponent2D[]|RenderComponent3D[]
}
