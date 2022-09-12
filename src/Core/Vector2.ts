import { lerp } from "../Util";

export default class Vector2 {
    public x:number
    public y:number
    constructor(x:number, y:number) {
        this.x = x;
        this.y = y;
    }
    /**
     * Add
     */
    public Add(otherVector:Vector2) {
        this.x += otherVector.x;
        this.y += otherVector.y;
    }
    public static Lerp(pos1:Vector2, pos2:Vector2, percent:number) :Vector2 {
        let x = lerp(pos1.x, pos2.x, percent);
        let y = lerp(pos1.y, pos2.y, percent);
        return new Vector2(x,y);
    }
}