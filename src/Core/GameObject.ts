import { Vector3 } from "three";
import Game from "./Game.js";

export abstract class GameObject {
    public Position:Vector3;
    public Alive:boolean;
    public Visible:boolean;
    constructor(x:number, y:number, z:number) {
        this.Position = new Vector3(x,y,z);
        this.Alive = true;
        this.Visible = true;
    }
    abstract update(dt:number, gameRef:Game):void;

    abstract render(dt:number):void;

}