import EaseManager, { Vector2EaseManager } from "./EaseManager";
import Game from "../Game";
import { GameObject } from "./GameObject";
import GVector2 from "../Vector2";
import ScreenManager from "../ScreenManager";

export default abstract class GameObject2D extends GameObject {
    public position:GVector2;
    protected renderPos:GVector2;
    public easeManager:Vector2EaseManager;
    
    public Z:number;
    public rotation:number;
    
    constructor(name:string, x:number, y:number, z:number=0) {
        super(name);
        this.Z = z;
        this.position= new GVector2(x,y)
        this.renderPos=this.position;
        this.easeManager = new Vector2EaseManager(); 
        this.rotation = 0;
    }

    SysUpdate(dt: number, gameRef: Game): void {
        this.renderPos=this.position;
        this.renderPos = this.easeManager.UpdateVec(dt, this.renderPos);
        this.update(dt, gameRef);
    }

    abstract Render(ctx:CanvasRenderingContext2D, screenManager:ScreenManager):void;

}