import { IMouseEvent, IPointerEvent } from "babylonjs/Events/deviceInputEvents";
import ScreenManager, { LOCAL_HEIGHT, LOCAL_WIDTH } from "./ScreenManager";

export default class InputManager {
    public readonly Keys: {[key:string]:boolean} 
    private _mouseX:number;
    public get mouseX():number {
        return this.screen.Scene3D.pointerX;
    }
    public get mouseY():number{
        return this.screen.Scene3D.pointerY;
    }
    private _mouseY:number;
    private _mouseClick:boolean;
    public get mouseDown():boolean{return this._mouseClick;}
    private CanvasRect?:DOMRect;
    private screen:ScreenManager;
    constructor(screen:ScreenManager) {
        this.screen = screen;
        this._mouseClick = false;
        this.Keys = {};
        document.addEventListener('keydown', event => {
            this.Keys[event.key] = true;
        });
        // Set the appropriate key in our `keys` object to `false` if a key was unpressed.
        document.addEventListener('keyup', event => {
            this.Keys[event.key] = false;
        });
        this._mouseX = 0;
        this._mouseY = 0;
        let elm = document.querySelector("#FlatCanvas");
        this.CanvasRect = elm?.getBoundingClientRect();

        /*
        screen.Scene3D.onPointerDown = (mouseevent:IMouseEvent) =>{
            
            if(this.CanvasRect != null) {
                if(mouseevent.clientX>=this.CanvasRect.left && mouseevent.clientX <= this.CanvasRect.right){
                    if(mouseevent.clientY >= this.CanvasRect.top && mouseevent.clientY <= this.CanvasRect.bottom) {
                        //we're in!
                        this._mouseX = (mouseevent.clientX-this.CanvasRect.left)/this.CanvasRect.width;
                        this._mouseY = (mouseevent.clientY-this.CanvasRect.top)/this.CanvasRect.height;
                        //console.log(`${this._mouseX},${this._mouseY}`);
                    }
                }
            } else {
                console.log("No canvas rect! mouse input wont work!");
            } 

        } */
        screen.Scene3D.onPointerDown=(mouse:IPointerEvent) => {
            //check
            if(!ScreenManager.pointerLocked) {
                screen.requestLock();
            }
            this._mouseClick = true;
        }
        screen.Scene3D.onPointerUp=(mouse:IPointerEvent) => {
            this._mouseClick = false;
        }
        
    }
}