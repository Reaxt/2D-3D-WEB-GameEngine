import { BoxGeometry, BufferGeometry, Material, Mesh, MeshBasicMaterial, Object3D, Vector3 } from "three";
import ScreenManager from "../ScreenManager";
import GVector3 from "../Vector3";
import RenderComponent2D from "./RenderComponent2D";
import RenderComponent3D from "./RenderComponent3D";

export default class PlainBox3D extends RenderComponent3D {
    private geo:BufferGeometry;
    private mat:Material;
    private obj:Object3D;
    constructor(pos:GVector3, scale:GVector3) {
        super(pos,scale);
        this.geo = new BoxGeometry(scale.x,scale.y,scale.z);
        this.mat = new MeshBasicMaterial({color:0x00FFFF});
        this.obj = new Mesh(this.geo, this.mat);
    }
    firstRender(scr: ScreenManager): void {
        scr.Scene3D.add(this.obj)
    }
    renderUpdate(scr: ScreenManager): void {
        this.obj.position.set(this.renderPos.x,this.renderPos.y,this.renderPos.z);
        this.obj.scale.set(this.renderScale.x,this.renderScale.y,this.renderScale.z)   
        
        this.obj.rotation.set(this.rotation.x,this.rotation.y,this.rotation.z);
    }
    
}