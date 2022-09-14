import Game from "./Game";

export default abstract class Component {
    public Alive:boolean;
    constructor() {
        this.Alive = true;
    }
    abstract SysUpdate(dt: number, gameRef: Game):void;
}