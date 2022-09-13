import * as THREE from 'three';
import Game from "./Core/Game.js";
import TestState2D from './States/TestStates/TestState2D.js';

let game = new Game();
game.StateManagerInstance.add("TestState", new TestState2D());

game.Start();