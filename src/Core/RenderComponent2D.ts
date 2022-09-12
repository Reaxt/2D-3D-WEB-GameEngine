import { Vector2 } from "three";

export default abstract class RenderComponent2D {

    constructor(position:Vector2, rotation:number=0) {

    }
    
    abstract render(context:CanvasRenderingContext2D, x:number, y:number) : void;
}