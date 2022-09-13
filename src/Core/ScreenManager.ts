import { Vector2, WebGLRenderer } from "three";
import Game from "./Game";
import { GameObject } from "./GameObjects/GameObject";
import GameObject2D from "./GameObjects/GameObject2D";
import GVector2 from "./Vector2";
export const LOCAL_WIDTH:number = 1280;
export const LOCAL_HEIGHT:number = 720;


const ACTUAL_DRAW_WIDTH:number = 1280;
const ACTUAL_DRAW_HEIGHT:number = 720;
//import THREE from "three";
export default class ScreenManager {
    
    private context2D : CanvasRenderingContext2D;
    private context3D : WebGLRenderer;
    private CanvasRect : DOMRect
    constructor() {

        let canvas = document.getElementById('FlatCanvas') as HTMLCanvasElement;
        if(canvas == null) throw new Error("Null 2D Canvas");
        canvas.width = ACTUAL_DRAW_WIDTH;
        canvas.height = ACTUAL_DRAW_HEIGHT;
        let temp = canvas.getContext("2d");
        if(temp == null) throw new Error("Null2d!!")
        this.context2D = temp;
        let threeCanvas = document.getElementById('ThreeCanvas') as HTMLCanvasElement;
        this.context3D = new WebGLRenderer({canvas: threeCanvas})
        threeCanvas.width = ACTUAL_DRAW_HEIGHT;
        threeCanvas.height = ACTUAL_DRAW_WIDTH;
        let elm = document.querySelector("#FlatCanvas");
        this.CanvasRect = canvas.getBoundingClientRect();
    }
    /**
     * PercentToScreenCoord2D
     */
    public PercentToLocal(x:number,y:number):GVector2 {
        return new GVector2((x/100)*LOCAL_WIDTH,(y/100)*LOCAL_HEIGHT);
    }
    public LocalToCanvas(x:number,y:number):GVector2 {
        return new GVector2((x/LOCAL_WIDTH)*ACTUAL_DRAW_WIDTH, (y/LOCAL_HEIGHT)*ACTUAL_DRAW_HEIGHT);
    }
    public Render(objs:GameObject[], dt:number,gameRef:Game) {
        this.context2D.clearRect(0,0,ACTUAL_DRAW_WIDTH,ACTUAL_DRAW_HEIGHT);
        console.log('renderBegin');
        objs.forEach(obj=> {
            if(!obj.Visible)return;
            
            //2d
            if(obj instanceof GameObject2D) {
                obj.Render(this.context2D,this);
                console.log('drawing')
            }
        })
        console.log('renderEnd');
    }
}