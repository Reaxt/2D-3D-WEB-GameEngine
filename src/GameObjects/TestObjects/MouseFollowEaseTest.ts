import Game from "../../Core/Game";
import Easing from "../../Core/GameObjects/Easing";
import { GameObject } from "../../Core/GameObjects/GameObject";
import Graphic from "../../Core/Rendering/GImage";
import PlainBox3D from "../../Core/Rendering/PlainBox3D";

import GVector2 from "../../Core/Vector2";
import GVector3 from "../../Core/Vector3";
import { easeInOutBack, easeOutBack } from "../../Util";

export default class MouseFollowEaseTest extends GameObject{
    private prepEase:boolean;
    private continue:boolean;
    private box2:PlainBox3D
    private ground:BABYLON.GroundMesh;
    constructor() {
        super("MouseFollower");
        let grph = new Graphic("./img/sprite_sheet.png",1152, 1536);

        this.prepEase = false;
        this.continue = true;
        this.box2 = new PlainBox3D(new GVector3(1,1,1), new GVector3(1,1,1));
        /*
        this.box2.easeManager.AddEase(new Easing(
            [[0,1],[0,1],[0,-1]],
            3,
            easeInOutBack,
            1,
            true,
            false
        )) */
        this.ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 200, height: 200});
        this.ground.position.y = -1;
        this.ground.material = new BABYLON.StandardMaterial("mat");
        this.Visuals.push(this.box2);
    }
    update(dt: number, gameRef: Game): void {
        if(!gameRef.InputManagerInstance.mouseDown && !this.prepEase && this.continue) {
        } else if(this.prepEase && !gameRef.InputManagerInstance.mouseDown) {
            this.continue=false;

            this.prepEase = false;
        } else if(gameRef.InputManagerInstance.mouseDown) {
            this.prepEase = true;
        }
        //this.box2.rotation.x += 0.1;
        //this.box2.rotation.y += 0.1;
        //this.box2.position = gameRef.ScreenManagerInstance.ScreenToWorldPos(new GVector2(gameRef.InputManagerInstance.mouseX, gameRef.InputManagerInstance.mouseY), 0.5);
        console.log(this.box2.position);
    }
    
}