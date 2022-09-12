import { GameObject } from "./GameObject.js";
import InputManager from "./InputManager.js";
import ScreenManager from "./ScreenManager.js"
import StateManager from "./StateManager.js";

export default class Game {
    public ScreenManagerInstance:ScreenManager;
    public StateManagerInstance:StateManager;
    public InputManagerInstance:InputManager;
    public SysObjects:GameObject[]; //Any system level objects we dont want to kill on scene change.
    constructor() {
        this.ScreenManagerInstance = new ScreenManager();
        this.StateManagerInstance = new StateManager();
        this.InputManagerInstance = new InputManager();
        this.SysObjects = [];
    }
}