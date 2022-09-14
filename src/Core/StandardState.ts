import Game from "./Game";
import RenderComponent from "./Rendering/RenderComponent";
import State from "./State";

export default abstract class StandardState extends State {
    abstract enter(params: any):void;
    abstract exit():void;
    abstract exitProcess(dt: number):void;
    update(dt: number, gameRef: Game): void {
        this.objects = this.objects.filter(x=>x.Alive);
        this.objects.forEach(x=> {
            x.update(dt, gameRef);
            x.Visuals.forEach(x=>{if(x.Alive)x.SysUpdate(dt,gameRef)});
            //x.Visuals = x.Visuals.filter(x=>x.Alive);
        })
    
    }
    render(dt: number): RenderComponent[] {
        let RenderComponents: RenderComponent[] = [];
        this.objects.forEach(x=>{
            if(x.Visible){
                x.Visuals.forEach(x=> {
                    
                    RenderComponents.push(x);
                    
                })
            }
        })
        return RenderComponents;
    }
    
}