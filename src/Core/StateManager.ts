import Game from "./Game.js";
import { GameObject } from "./GameObject.js";
import State from "./State.js";

export default class StateManager {
	private States : {[key:string]: State}
	public DeltaTime:number;
	private exitProcesses : State[];
	private currentState?:State;
    constructor() {
		this.States = {};
		//this kinda sucks.. but it makes dt accessible to everyone.
		this.DeltaTime = 0;
		this.exitProcesses = [];
		
	}

	add(stateName:string, state:State) {
		this.States[stateName] = state;

	}

	change(stateName:string, enterParameters:any, doExitProcess = false) {
		this.currentState?.exit();
		if(doExitProcess && this.currentState != null) {this.exitProcesses.push(this.currentState)} //exit process is used for exit animations and transitions
		this.currentState = this.States[stateName];
		this.currentState.enter(enterParameters);
	}

	update(dt:number,gameRef:Game) {
		this.DeltaTime = dt;
		this.exitProcesses = this.exitProcesses.filter(x=>x.exitProcess(dt));
		this.currentState?.update(dt, gameRef);
	}

	
	render(): GameObject[] {
		if(this.currentState != null) {
			return this.currentState.render(this.DeltaTime);
		} else {
			return [];
		}
	}
}
