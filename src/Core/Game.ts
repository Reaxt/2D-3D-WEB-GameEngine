import { GameObject } from "./GameObjects/GameObject";
import InputManager from "./InputManager";
import ScreenManager from "./ScreenManager"
import StateManager from "./StateManager";

export default class Game {
    public ScreenManagerInstance:ScreenManager;
    public StateManagerInstance:StateManager;
    public InputManagerInstance:InputManager;
    private lastTime:number;
    public SysObjects:GameObject[]; //Any system level objects we dont want to kill on scene change.
    constructor() {
        this.ScreenManagerInstance = new ScreenManager();
        this.StateManagerInstance = new StateManager();
        this.InputManagerInstance = new InputManager();
        this.SysObjects = [];
        this.lastTime = 0;
    }
    public Start():void {
        this.StateManagerInstance.init();
        this.gameLoop();
    }

    gameLoop(currentTime = 0):void {
		// Calculates delta time and converts it to seconds instead of milliseconds.
		const deltaTime = (currentTime - this.lastTime) / 1000;

		this.update(deltaTime);
        this.render(deltaTime);
        this.lastTime = currentTime;
		requestAnimationFrame((time) => this.gameLoop(time));
	}
    private update(dt:number):void {
        this.StateManagerInstance.update(dt,this);
        this.SysObjects = this.SysObjects.filter(x=>x.Alive);
        this.SysObjects.forEach(x=> {
            x.SysUpdate(dt,this)
            x.Visuals = x.Visuals.filter(x=>x.Alive);
        });
    
    }
    private render(dt:number):void {
        let objs = this.StateManagerInstance.render();
        this.SysObjects.filter(x=>x.Visible).forEach(x => {
            x.Visuals.forEach(x=>objs.push(x));
        });
        this.ScreenManagerInstance.Render(objs, dt, this);

    }
}