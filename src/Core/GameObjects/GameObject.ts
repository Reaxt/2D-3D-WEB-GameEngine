import { Vector3 } from "three";
import Game from "../Game";
import RenderComponent from "../Rendering/RenderComponent";
import ScreenManager from "../ScreenManager";

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