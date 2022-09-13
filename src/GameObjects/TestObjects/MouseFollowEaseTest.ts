import Game from "../../Core/Game";
import Easing from "../../Core/GameObjects/Easing";
import PlainBox2D from "../../Core/GameObjects/PlainBoxObj2D";
import GVector2 from "../../Core/Vector2";
import { easeOutBack } from "../../Util";

export default class MouseFollowEaseTest extends PlainBox2D{
    private clickedPos:GVector2;
    private prepEase:boolean;
    constructor() {
        super("MouseFollower",0,0,50,50,"#00FFFF");
        this.clickedPos = this.position;
        this.prepEase = false;
    }
    update(dt: number, gameRef: Game): void {
        if(!gameRef.InputManagerInstance.mouseDown && !this.prepEase) {
            this.position.x = (gameRef.InputManagerInstance.mouseX-(this.width/2));
            this.position.y = (gameRef.InputManagerInstance.mouseY-(this.height/2));
            this.clickedPos = this.position;
        } else if(this.prepEase && !gameRef.InputManagerInstance.mouseDown) {
            this.easeManager.AddEase(new Easing([[this.position.x, (gameRef.InputManagerInstance.mouseX-(this.width/2))],[this.position.y,(gameRef.InputManagerInstance.mouseY-(this.height/2))] ], 2, easeOutBack, 0, false, true));
            this.prepEase = false;
        } else if(gameRef.InputManagerInstance.mouseDown) {
            this.prepEase = true;
        }

    }
    
}