import { lerp } from "../Util";

export default class Vector3 {
    public x:number
    public y:number
    public z:number
    constructor(x:number, y:number, z:number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    /**
     * Add
     */
    public Add(otherVector:Vector3) {
        this.x += otherVector.x;
        this.y += otherVector.y;
        this.z += otherVector.z;
    }
    public static Lerp(pos1:Vector3, pos2:Vector3, percent:number) :Vector3 {
        let x = lerp(pos1.x, pos2.x, percent);
        let y = lerp(pos1.y, pos2.y, percent);
        let z = lerp(pos1.z, pos2.z, percent);
        return new Vector3(x,y,z);
    }
}