import { GameObject } from "./GameObjects/GameObject.js";
import InputManager from "./InputManager.js";
import ScreenManager from "./ScreenManager.js"
import StateManager from "./StateManager.js";

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
        this.SysObjects.forEach(x=>x.SysUpdate(dt,this));
        
    }
    private render(dt:number):void {
        let objs = this.StateManagerInstance.render();
        this.SysObjects.filter(x=>x.Visible).forEach(y => objs.push(y));
        this.ScreenManagerInstance.Render(objs, dt, this);

    }
}