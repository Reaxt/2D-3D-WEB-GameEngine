import { easeLinear, lerp } from "../../Util";

export default class Easing {
    private easePositions:[number,number][]
    private time:number;
    private duration:number;
    private delayStart:number;
    private easing:(a:number)=>number;
    public endAfterEase:boolean;
    private easeHappening:boolean;
    public relative:boolean;
    private onEaseEnd:null|(()=>void)
    public get EaseHappening():boolean {
        return this.easeHappening;
    }
    private easeEnded:boolean;
    constructor(easePositions:[number,number][], time:number, easing:(a:number)=> number = easeLinear, delayStart:number = 0, endEaseAfter:boolean = true, relative:boolean = false, onEaseEnd:null|(()=>void)=null) {
        this.easePositions = easePositions;
        this.duration = time;
        this.time = 0;
        this.delayStart = delayStart;
        this.endAfterEase = endEaseAfter;
        this.easeHappening = true;
        this.relative = relative;
        this.easing = easing;
        this.onEaseEnd = onEaseEnd;
        this.easeEnded = false;
    }
    public update(dt:number):number[] {
        this.time += dt;
        let positions:number[] = [];
        if(this.time < this.delayStart) {
            //waiting...
            this.easePositions.forEach(x=>positions.push(x[0]));
        } else if(this.time < this.delayStart+this.duration) {
            let actualTime = this.time-this.delayStart;
            this.easePositions.forEach(x => {
                let res = lerp(x[0],x[1],actualTime/this.duration,this.easing);
                positions.push(res);
            })
        } else if(this.time >= this.delayStart+this.duration) {
            if(this.endAfterEase) this.easeHappening = false;
            this.easePositions.forEach(x=>positions.push(x[1]));
            if(!this.easeEnded) {
                this.easeEnded = true;
                console.log("ough...")
                if(this.onEaseEnd != null) {
                    console.log("yea");
                    this.onEaseEnd();
                }
            }
        }
        return positions;
        //go through everything
    }
}