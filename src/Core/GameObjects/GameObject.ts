import { Vector3 } from "three";
import Game from "../Game.js";

export abstract class GameObject {
    
    public Alive:boolean;
    public Visible:boolean;
    public Name:string;

    constructor(name:string) {
        this.Name = name;
        this.Alive = true;
        this.Visible = true;
    }
    SysUpdate(dt:number,gameRef:Game) {
        this.update(dt,gameRef);
    };
    abstract update(dt:number, gameRef:Game):void;

}