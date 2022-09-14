import GVector2 from "../Vector2";
import GVector3 from "../Vector3";
import { Vector3EaseManager } from "../GameObjects/EaseManager";
import Game from "../Game";
import RenderComponent from "./RenderComponent";
import ScreenManager from "../ScreenManager";
export default abstract class RenderComponent3D extends RenderComponent {
    public position:GVector3;
    protected renderPos:GVector3;
    public easeManager:Vector3EaseManager;
    public scale:GVector3;
    public scaleEase:Vector3EaseManager;
    protected renderScale:GVector3;
    public rotation:GVector3;
    private didFirstRender:boolean;
    constructor(position:GVector3, scale:GVector3) {
        super();
        this.didFirstRender = false;
        this.position= position;
        this.renderPos=this.position;
        this.easeManager = new Vector3EaseManager();
        this.scaleEase = new Vector3EaseManager();
        this.rotation = new GVector3(0,0,0);
        this.scale = scale;
        this.renderScale = this.scale; 
    }
    render(scr: ScreenManager): void {
        if(!this.didFirstRender) {
            this.firstRender(scr);
            this.didFirstRender = true;
        } else {
            this.renderUpdate(scr);
        }
    }
    abstract firstRender(scr:ScreenManager):void
    abstract renderUpdate(scr:ScreenManager):void
    SysUpdate(dt: number, gameRef: Game): void {
        
        this.position = this.easeManager.UpdateVec(dt, this.position);
        this.scale = this.scaleEase.UpdateVec(dt, this.scale);
        this.renderPos = this.position;
        this.renderScale = this.scale;
    }
} 