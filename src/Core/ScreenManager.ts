import { Camera, PerspectiveCamera, Scene, Vector2, WebGLRenderer } from "three";
import Game from "./Game";
import { GameObject } from "./GameObjects/GameObject";
import RenderComponent from "./Rendering/RenderComponent";
import GVector2 from "./Vector2";
export const LOCAL_WIDTH:number = 1280;
export const LOCAL_HEIGHT:number = 720;


const ACTUAL_DRAW_WIDTH:number = 1280;
const ACTUAL_DRAW_HEIGHT:number = 720;
const FOV:number = 90;
//import THREE from "three";
export default class ScreenManager {
    
    private context2D : CanvasRenderingContext2D;
    private context3D : WebGLRenderer;
    private CanvasRect : DOMRect
    public get Context2D():CanvasRenderingContext2D {
        return this.context2D;
    } 
    public Cam3D : Camera;
    public Scene3D: Scene;

    constructor() {
        //#region 2dInit
        let canvas = document.getElementById('FlatCanvas') as HTMLCanvasElement;
        if(canvas == null) throw new Error("Null 2D Canvas");
        canvas.width = ACTUAL_DRAW_WIDTH;
        canvas.height = ACTUAL_DRAW_HEIGHT;
        let temp = canvas.getContext("2d");
        if(temp == null) throw new Error("Null2d!!")
        this.context2D = temp;
        //#endregion
        //#region 3dInit
        let threeCanvas = document.getElementById('ThreeCanvas') as HTMLCanvasElement;
        this.context3D = new WebGLRenderer({canvas: threeCanvas})
        //threeCanvas.width = ACTUAL_DRAW_HEIGHT;
        //threeCanvas.height = ACTUAL_DRAW_WIDTH;
        this.context3D.setSize(ACTUAL_DRAW_WIDTH, ACTUAL_DRAW_HEIGHT);
        let elm = document.querySelector("#FlatCanvas");
        this.CanvasRect = canvas.getBoundingClientRect();
        this.Scene3D = new Scene();
        this.Cam3D = new PerspectiveCamera(FOV, LOCAL_WIDTH/LOCAL_HEIGHT, 0.1, 1000);
        this.Cam3D.position.z=5;
        //#endregion

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
    public DivisionScale():GVector2 {
        return new GVector2(LOCAL_WIDTH/ACTUAL_DRAW_WIDTH, LOCAL_HEIGHT/ACTUAL_DRAW_HEIGHT)
    }
    public Render(objs:RenderComponent[], dt:number,gameRef:Game) {
        this.context2D.clearRect(0,0,ACTUAL_DRAW_WIDTH,ACTUAL_DRAW_HEIGHT);
        //console.log(objs.length);
        objs.forEach(obj=> {
            if(!obj.Alive)return;
            obj.render(this);
        })
        this.context3D.render(this.Scene3D, this.Cam3D);
    }
}