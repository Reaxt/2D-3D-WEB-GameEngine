import Component from "../Component";
import ScreenManager from "../ScreenManager";

export default abstract class RenderComponent extends Component {

    public Visible:boolean;
    constructor(){
        super();
        this.Visible=true;
    }
    abstract render(scr:ScreenManager):void
}