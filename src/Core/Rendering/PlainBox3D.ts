import * as BABYLON from 'babylonjs';
import ScreenManager from "../ScreenManager";
import GVector3 from "../Vector3";
import RenderComponent3D from "./RenderComponent3D";

export default class PlainBox3D extends RenderComponent3D {
    private geo:BABYLON.Mesh;
    private mat:BABYLON.Material;
    constructor(pos:GVector3, scale:GVector3) {
        super(pos,scale);
        this.mat = new BABYLON.StandardMaterial("mmat");
        this.geo = BABYLON.MeshBuilder.CreateBox("plainBox3d", {width:this.scale.x, height:this.scale.y, depth:this.scale.z});
        this.geo.material = this.mat;
        
    }
    firstRender(scr: ScreenManager): void {
        let scene = scr.Scene3D;
        var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
	
        //Materials
        var redMat = new BABYLON.StandardMaterial("red", scene);
        redMat.diffuseColor = new BABYLON.Color3(255, 0, 0);
        redMat.emissiveColor = new BABYLON.Color3(255, 0, 0);
        redMat.specularColor = new BABYLON.Color3(255, 0, 0);
        
        var greenMat = new BABYLON.StandardMaterial("green", scene);
        greenMat.diffuseColor = new BABYLON.Color3(0, 255, 0);
        greenMat.emissiveColor = new BABYLON.Color3(0, 255, 0);
        greenMat.specularColor = new BABYLON.Color3(0, 255, 0);
        
        var blueMat = new BABYLON.StandardMaterial("blue", scene);
        blueMat.diffuseColor = new BABYLON.Color3(0, 0, 255);
        blueMat.emissiveColor = new BABYLON.Color3(0, 0, 255);
        blueMat.specularColor = new BABYLON.Color3(0, 0, 255);
        
        // Shapes
        let plane1 = BABYLON.MeshBuilder.CreatePlane("plane1", {size:3, updatable:true, sideOrientation:BABYLON.Mesh.DOUBLESIDE},scene);
        plane1.position.x = -3;
        plane1.position.z = 0;
        plane1.material = redMat;
        
        var plane2 = BABYLON.MeshBuilder.CreatePlane("plane2", {size:3, updatable:true, sideOrientation:BABYLON.Mesh.DOUBLESIDE},scene);
        plane2.position.x = 3;
        plane2.position.z = -1.5;
        plane2.material = greenMat;
        
        var plane3 = BABYLON.MeshBuilder.CreatePlane("plane2", {size:3, updatable:true, sideOrientation:BABYLON.Mesh.DOUBLESIDE},scene);
        plane3.position.x = 3;
        plane3.position.z = 1.5;
        plane3.material = blueMat;
        
        var ground = BABYLON.Mesh.CreateGround("ground1", 10, 10, 2, scene);
    }
    renderUpdate(scr: ScreenManager): void {
        this.geo.position.set(this.renderPos.x,this.renderPos.y,this.renderPos.z);
        this.geo.scaling.set(this.renderScale.x,this.renderScale.y,this.renderScale.z)   
        
        this.geo.rotation.set(this.rotation.x,this.rotation.y,this.rotation.z);
    }
    
}