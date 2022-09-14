import GVector2 from "../Vector2";
import { Vector2EaseManager } from "../GameObjects/EaseManager";
import Game from "../Game";
import RenderComponent from "./RenderComponent";
export default abstract class RenderComponent2D extends RenderComponent {
    public position:GVector2;
    protected renderPos:GVector2;
    public easeManager:Vector2EaseManager;
    public scale:GVector2;
    public scaleEase:Vector2EaseManager;
    protected renderScale:GVector2;
    public Z:number;
    public rotation:number;
    
    constructor(x:number, y:number, width:number=0, height:number=0, z:number=0) {
        super();
        this.Z = z;
        this.position= new GVector2(x,y)
        this.renderPos=this.position;
        this.easeManager = new Vector2EaseManager();
        this.scaleEase = new Vector2EaseManager();
        this.rotation = 0;
        this.scale = new GVector2(width,height);
        this.renderScale = this.scale; 
    }
    SysUpdate(dt: number, gameRef: Game): void {
        this.renderPos=this.position;
        this.renderPos = this.easeManager.UpdateVec(dt, this.renderPos);
        this.renderScale = this.scaleEase.UpdateVec(dt, this.renderScale);
    }
} 