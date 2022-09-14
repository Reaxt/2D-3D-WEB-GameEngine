import { Vector3 } from "three";
import Game from "../Game.js";
import RenderComponent from "../Rendering/RenderComponent.js";
import RenderComponent2D from "../Rendering/RenderComponent2D.js";
import ScreenManager from "../ScreenManager.js";

export abstract class GameObject {
    
    public Alive:boolean;
    public Visible:boolean;
    public Name:string;
    public Visuals:RenderComponent[]
    constructor(name:string) {
        this.Name = name;
        this.Alive = true;
        this.Visible = true;
        this.Visuals = [];
    }
    SysUpdate(dt:number,gameRef:Game) {
        this.update(dt,gameRef);
    };
    abstract update(dt:number, gameRef:Game):void;

    render(screenManager:ScreenManager):RenderComponent[] {
        return this.Visuals;
    }
}