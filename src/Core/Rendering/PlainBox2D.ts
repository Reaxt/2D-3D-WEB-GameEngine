import ScreenManager from "../ScreenManager";
import RenderComponent2D from "./RenderComponent2D";

export default class PlainBox2D extends RenderComponent2D {

    
    public Color:string;
    constructor(x:number,y:number,width:number,height:number,color:string, z:number=0) {
        super(x,y,width,height,z);
        this.Color=color;
    }
    render(scr: ScreenManager): void {
        let ctx = scr.Context2D;
        ctx.save();
        //ctx.rotate(this.rotation * Math.PI / 180);
        ctx.fillStyle = this.Color;
        let vec = scr.LocalToCanvas(this.renderPos.x, this.renderPos.y);
        let size = scr.LocalToCanvas(this.renderScale.x, this.renderScale.y);
        ctx.fillRect(vec.x,vec.y, size.x, size.y);
        ctx.restore();
    }
}