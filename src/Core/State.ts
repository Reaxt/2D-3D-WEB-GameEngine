import Game from "./Game";
import { GameObject } from "./GameObjects/GameObject";
import RenderComponent from "./Rendering/RenderComponent";

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
