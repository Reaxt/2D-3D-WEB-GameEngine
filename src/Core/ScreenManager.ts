import * as BABYLON from 'babylonjs';
import Game from "./Game";
import { GameObject } from "./GameObjects/GameObject";
import RenderComponent from "./Rendering/RenderComponent";
import GVector2 from "./Vector2";
import GVector3 from "./Vector3";
export const LOCAL_WIDTH:number = 1280;
export const LOCAL_HEIGHT:number = 720;


const ACTUAL_DRAW_WIDTH:number = 1280;
const ACTUAL_DRAW_HEIGHT:number = 720;
const FOV:number = 90;
//import THREE from "three";
export default class ScreenManager {
    
    private engine : BABYLON.Engine;
    private CanvasRect : DOMRect
    private canvas:HTMLCanvasElement;
    public Cam3D : BABYLON.UniversalCamera;
    public Scene3D: BABYLON.Scene;
    private Light: BABYLON.Light;
    public static pointerLocked:boolean = false;
    constructor() {
        //#region 2dInit
        //#endregion
        //#region 3dInit

        this.canvas = document.getElementById('ThreeCanvas') as HTMLCanvasElement;
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.Scene3D = new BABYLON.Scene(this.engine);
        this.Cam3D = new BABYLON.UniversalCamera("camera", new BABYLON.Vector3(0, 0, -10), this.Scene3D);
        this.Cam3D.inertia = 0;
        this.Cam3D.setTarget(BABYLON.Vector3.Zero());
        this.Cam3D.attachControl(this.canvas, true);
        BABYLON.SceneLoader.ImportMeshAsync("", "https://assets.babylonjs.com/meshes/", "box.babylon");
        this.engine.runRenderLoop(() => {
            this.Scene3D.render();
        })
        this.Light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), this.Scene3D);
        
        
        this.CanvasRect = this.canvas.getBoundingClientRect();
        console.log("one");
        document.addEventListener("pointerlockchange", this.pointerlockchange, false);
        document.addEventListener("mspointerlockchange", this.pointerlockchange, false);
        document.addEventListener("mozpointerlockchange", this.pointerlockchange, false);
        document.addEventListener("webkitpointerlockchange", this.pointerlockchange, false);
        /*
        this.context3D = new THREE.WebGLRenderer({canvas: threeCanvas})
        //threeCanvas.width = ACTUAL_DRAW_HEIGHT;
        //threeCanvas.height = ACTUAL_DRAW_WIDTH;
        this.context3D.setSize(ACTUAL_DRAW_WIDTH, ACTUAL_DRAW_HEIGHT);
        let elm = document.querySelector("#FlatCanvas");
        this.Scene3D = new THREE.Scene();
        this.Cam3D = new THREE.PerspectiveCamera(FOV, LOCAL_WIDTH/LOCAL_HEIGHT, 0.1, 1000);
        this.Cam3D.position.z=5;
        */
        //#endregion

    }
    private pointerlockchange = function () {
		var controlEnabled = document.pointerLockElement || null;
		
		// If the user is already locked
		if (!controlEnabled) {
			//camera.detachControl(canvas);
			ScreenManager.pointerLocked = false;
		} else {
			//camera.attachControl(canvas);
			ScreenManager.pointerLocked = true;
		}
	};
	public requestLock() {
        this.canvas.requestPointerLock = this.canvas.requestPointerLock || this.canvas.msRequestPointerLock || this.canvas.mozRequestPointerLock || this.canvas.webkitRequestPointerLock;
        this.canvas.requestPointerLock();
    }
	// Attach events to the document

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
        //this.context2D.clearRect(0,0,ACTUAL_DRAW_WIDTH,ACTUAL_DRAW_HEIGHT);
        //console.log(objs.length);
        objs.forEach(obj=> {
            if(!obj.Alive)return;
            obj.render(this);
        })
        //this.context3D.render(this.Scene3D, this.Cam3D);
    }
    public WorldPosToScreen(object:THREE.Object3D): GVector2 {
        /*
        let vector = new THREE.Vector3;
        vector = vector.setFromMatrixPosition(object.matrixWorld);
        vector.project(this.Cam3D);
        let GVect:GVector2 = new GVector2(0,0);
        let wHalf = ACTUAL_DRAW_WIDTH/2;
        let hHalf = ACTUAL_DRAW_HEIGHT/2;
        GVect.x = (vector.x * wHalf)+wHalf;
        GVect.y = (vector.y*hHalf)+hHalf;
        return GVect; */
        return new GVector3(0,0,0);
    }
    public ScreenToWorldPos(pos:GVector2, Depth:number): GVector3 {
        //let x = ((pos.x/LOCAL_WIDTH))*this.engine.getRenderWidth();
        //let y = ((pos.y/LOCAL_HEIGHT))*this.engine.getRenderHeight();
        //let vec = new THREE.Vector3();
        //let posS = new THREE.Vector3();
        //vec.set(x,y,0.5);

        let vec = BABYLON.Vector3.Unproject(new BABYLON.Vector3(pos.x,pos.y,Depth),this.engine.getRenderWidth(),this.engine.getRenderHeight(), BABYLON.Matrix.Identity(), this.Cam3D.getViewMatrix(), this.Cam3D.getProjectionMatrix());
        return new GVector3(vec.x,vec.y,vec.z);
        

    }
}