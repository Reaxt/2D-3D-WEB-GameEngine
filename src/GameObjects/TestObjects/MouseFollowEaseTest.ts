import Game from "../../Core/Game";
import Easing from "../../Core/GameObjects/Easing";
import { GameObject } from "../../Core/GameObjects/GameObject";
import Graphic from "../../Core/Rendering/GImage";
import PlainBox2D from "../../Core/Rendering/PlainBox2D";
import PlainBox3D from "../../Core/Rendering/PlainBox3D";
import Sprite2D from "../../Core/Rendering/Sprite2D";
import GVector2 from "../../Core/Vector2";
import GVector3 from "../../Core/Vector3";
import { easeInOutBack, easeOutBack } from "../../Util";

export default class MouseFollowEaseTest extends GameObject{
    private clickedPos:GVector2;
    private prepEase:boolean;
    private box:Sprite2D;
    private continue:boolean;
    private box2:PlainBox3D
    constructor() {
        super("MouseFollower");
        let grph = new Graphic("./img/sprite_sheet.png",1152, 1536);

        this.box = new Sprite2D(grph,0,0,32,16,0,0,0.125,0);
        this.clickedPos = this.box.position;
        this.prepEase = false;
        this.Visuals.push(this.box);
        this.continue = true;
        this.box2 = new PlainBox3D(new GVector3(0,0,0), new GVector3(1,1,1));
        this.box2.easeManager.AddEase(new Easing(
            [[0,1],[0,1],[0,-1]],
            3,
            easeInOutBack,
            1,
            true,
            false
        ))
        this.Visuals.push(this.box2);
    }
    update(dt: number, gameRef: Game): void {
        if(!gameRef.InputManagerInstance.mouseDown && !this.prepEase && this.continue) {
            this.box.position.x = (gameRef.InputManagerInstance.mouseX-(this.box.scale.x/2));
            this.box.position.y = (gameRef.InputManagerInstance.mouseY-(this.box.scale.y/2));
            this.clickedPos = this.box.position;
        } else if(this.prepEase && !gameRef.InputManagerInstance.mouseDown) {
            this.continue=false;
            this.box.easeManager.AddEase(new Easing([[
                this.box.position.x, (gameRef.InputManagerInstance.mouseX-(this.box.scale.x/2))],
                [this.box.position.y,(gameRef.InputManagerInstance.mouseY-(this.box.scale.y/2))]],
                2,
                easeOutBack,
                0,
                true,
                false,()=>{this.continue=true; console.log("awa..")}));
            this.prepEase = false;
        } else if(gameRef.InputManagerInstance.mouseDown) {
            this.prepEase = true;
        }
        this.box2.rotation.x += 0.1;
        this.box2.rotation.y += 0.1;
    }
    
}