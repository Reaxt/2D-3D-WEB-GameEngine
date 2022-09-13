import Game from "../Game";
import ScreenManager from "../ScreenManager";
import GVector2 from "../Vector2";
import GameObject2D from "./GameObject2D";

export default abstract class PlainBox2D extends GameObject2D {
    
    public width:number;
    public height:number;
    public color:string;
    constructor(name:string, x:number,y:number,width:number,height:number,color:string, z:number=0) {
        super(name,x,y,z);
        this.width = width;
        this.height = height;
        this.color = color;
    }
    Render(ctx: CanvasRenderingContext2D, scr:ScreenManager): void {
        ctx.save();
        //ctx.rotate(this.rotation * Math.PI / 180);
        ctx.fillStyle = this.color;
        let vec = scr.LocalToCanvas(this.renderPos.x, this.renderPos.y);
        let size = scr.LocalToCanvas(this.width, this.height);
        ctx.fillRect(vec.x,vec.y, size.x, size.y);
        ctx.restore();
    }

    
}