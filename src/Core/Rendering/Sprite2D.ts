import ScreenManager from "../ScreenManager";
import GVector2 from "../Vector2";
import Graphic from "./GImage";
import RenderComponent2D from "./RenderComponent2D";

export default class Sprite2D extends RenderComponent2D {
    public sourceX:number;
    public sourceY:number;
    public sourceW:number;
    public sourceH:number;
    public sourceIMG:Graphic;
    
    constructor(sourceIMG:Graphic, sourceX:number, sourceY:number, sourceW:number, sourceH:number, x:number, y:number, scaleDivisor:number, z:number=0) {
        super(x,y,sourceW,sourceH,z);
        this.sourceX = sourceX;
        this.sourceY = sourceY;
        this.sourceW = sourceW;
        this.sourceH = sourceH;
        this.sourceIMG=sourceIMG;
        this.scale = new GVector2((this.sourceW)/scaleDivisor,(this.sourceH)/scaleDivisor);
        console.log(this.scale);

    }
    render(scr: ScreenManager): void {
        if(this.sourceIMG.Available) {
            scr.Context2D.drawImage(
                this.sourceIMG.image,
                this.sourceX,
                this.sourceY,
                this.sourceW,
                this.sourceH,
                this.renderPos.x,
                this.renderPos.y,
                this.scale.x,
                this.scale.y
            )
        }

    }
    
}