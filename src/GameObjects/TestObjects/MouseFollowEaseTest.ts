import Game from "../../Core/Game";
import Easing from "../../Core/GameObjects/Easing";
import { GameObject } from "../../Core/GameObjects/GameObject";
import Graphic from "../../Core/Rendering/GImage";
import PlainBox2D from "../../Core/Rendering/PlainBox2D";
import Sprite2D from "../../Core/Rendering/Sprite2D";
import GVector2 from "../../Core/Vector2";
import { easeOutBack } from "../../Util";

export default class MouseFollowEaseTest extends GameObject{
    private clickedPos:GVector2;
    private prepEase:boolean;
    private box:Sprite2D;
    private continue:boolean;
    constructor() {
        super("MouseFollower");
        let grph = new Graphic("./img/sprite_sheet.png",1152, 1536);

        this.box = new Sprite2D(grph,0,0,32,16,0,0,0.125,0);
        this.clickedPos = this.box.position;
        this.prepEase = false;
        this.Visuals.push(this.box);
        this.continue = true;
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

    }
    
}