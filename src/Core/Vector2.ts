import { lerp } from "../Util";

export default class GVector2 {
    public x:number
    public y:number
    constructor(x:number, y:number) {
        this.x = x;
        this.y = y;
    }
    /**
     * Add
     */
    public Add(otherVector:GVector2) {
        this.x += otherVector.x;
        this.y += otherVector.y;
    }
    public static Lerp(pos1:GVector2, pos2:GVector2, percent:number) :GVector2 {
        let x = lerp(pos1.x, pos2.x, percent);
        let y = lerp(pos1.y, pos2.y, percent);
        return new GVector2(x,y);
    }
}