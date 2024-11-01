import { Physics } from "phaser";
import { Game as MainGame } from "../index";

export abstract class DecorationContainer {
	constructor(
		protected scene: MainGame, 
		protected staticGroup: Physics.Arcade.StaticGroup
	) {

	}
}