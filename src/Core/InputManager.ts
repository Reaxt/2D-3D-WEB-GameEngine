import { LOCAL_HEIGHT, LOCAL_WIDTH } from "./ScreenManager";

export default class InputManager {
    public readonly Keys: {[key:string]:boolean} 
    private _mouseX:number;
    public get mouseX():number {
        return this._mouseX*LOCAL_WIDTH;
    }
    public get mouseY():number{
        return (this._mouseY*LOCAL_HEIGHT);
    }
    private _mouseY:number;
    private _mouseClick:boolean;
    public get mouseDown():boolean{return this._mouseClick;}
    private CanvasRect?:DOMRect;
    constructor() {
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
        document.onmousemove = (mouseevent:MouseEvent) =>{
            if(this.CanvasRect != null) {
                if(mouseevent.clientX>=this.CanvasRect.left && mouseevent.clientX <= this.CanvasRect.right){
                    if(mouseevent.clientY >= this.CanvasRect.top && mouseevent.clientY <= this.CanvasRect.bottom) {
                        //we're in!
                        this._mouseX = (mouseevent.clientX-this.CanvasRect.left)/this.CanvasRect.width;
                        this._mouseY = (mouseevent.clientY-this.CanvasRect.top)/this.CanvasRect.height;
                        console.log(`${this._mouseX},${this._mouseY}`);
                    }
                }
            } else {
                console.log("No canvas rect! mouse input wont work!");
            }

        }
        document.onmousedown=(mouse:MouseEvent) => {
            this._mouseClick = true;
        }
        document.onmouseup=(mouse:MouseEvent) => {
            this._mouseClick = false;
        }
    }
}