import Game from "./Game.js";
import { GameObject } from "./GameObjects/GameObject.js";
import RenderComponent from "./Rendering/RenderComponent.js";

export default abstract class State {
	public objects: GameObject[]
    constructor() {
        this.objects = [];
    }
    abstract enter(params:any):void;

	abstract exit():void;

	abstract exitProcess(dt:number):void;

	abstract update(dt:number, gameRef:Game):void;

	abstract render(dt:number):RenderComponent[];
}
