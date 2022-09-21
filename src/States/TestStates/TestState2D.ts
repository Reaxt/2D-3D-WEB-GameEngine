import { Camera } from "babylonjs/Cameras/camera";
import Game from "../../Core/Game";
import Easing from "../../Core/GameObjects/Easing";
import { GameObject } from "../../Core/GameObjects/GameObject";
import StandardState from "../../Core/StandardState";
import State from "../../Core/State";
import MouseFollowEaseTest from "../../GameObjects/TestObjects/MouseFollowEaseTest";
import { easeInOutBack, easeOutExpo } from "../../Util";

export default class TestState2D extends StandardState {
    enter(params: any): void {
        //throw new Error("Method not implemented.");
        let test = new MouseFollowEaseTest();
        this.objects.push(test);
        //test.easeManager.AddEase(new Easing([[0,0],[0,500]],4,easeOutExpo,2,false,true));
        //test.position.x = 1280;
        //test.position.y = 720-12;
        
    }
    exit(): void {
        //throw new Error("Method not implemented.");
    }
    exitProcess(dt: number): void {
        //throw new Error("Method not implemented.");
    }
    
}