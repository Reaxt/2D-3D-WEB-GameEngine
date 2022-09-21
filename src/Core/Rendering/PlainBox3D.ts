import * as BABYLON from 'babylonjs';
import ScreenManager from "../ScreenManager";
import GVector3 from "../Vector3";
import RenderComponent2D from "./RenderComponent2D";
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
    }
    renderUpdate(scr: ScreenManager): void {
        this.geo.position.set(this.renderPos.x,this.renderPos.y,this.renderPos.z);
        this.geo.scaling.set(this.renderScale.x,this.renderScale.y,this.renderScale.z)   
        
        this.geo.rotation.set(this.rotation.x,this.rotation.y,this.rotation.z);
    }
    
}