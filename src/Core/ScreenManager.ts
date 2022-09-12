import { WebGLRenderer } from "three";


//import THREE from "three";
export default class ScreenManager {
    private context2D : CanvasRenderingContext2D | null;
    private context3D : WebGLRenderer;
    constructor() {
        let canvas = document.getElementById('FlatCanvas') as HTMLCanvasElement;
        this.context2D = canvas.getContext("2d");
        let threeCanvas = document.getElementById('ThreeCanvas') as HTMLCanvasElement;
        this.context3D = new WebGLRenderer({canvas: threeCanvas})

    }
}