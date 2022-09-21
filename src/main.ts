import * as BABYLON from 'babylonjs';
import Game from "./Core/Game";
import TestState2D from './States/TestStates/TestState2D';

let game = new Game();
game.StateManagerInstance.add("TestState", new TestState2D());

game.Start();