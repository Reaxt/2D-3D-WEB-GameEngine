import Game from "../Core/Game";
import { GameObject } from "../Core/GameObject";

export default class GameObject2D extends GameObject {
    update(dt: number, gameRef: Game): void {
        throw new Error("Method not implemented.");
    }
    render(dt: number): void {
        throw new Error("Method not implemented.");
    }
    
}