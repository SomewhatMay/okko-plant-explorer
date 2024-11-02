import { Physics } from "phaser";
import { Game as MainGame } from "../index";
import { DecorationContainer } from "./decoration-container";
import { GrassContainer } from "./grass-container";
import { MountainContainer } from "./mountain-container";
import { TreeContainer } from "./tree-container";

type DecorationInfo = {
	instance: DecorationContainer,
	group: Physics.Arcade.StaticGroup
}

export class WorldDecoration {
	decorationContainers = [
		GrassContainer,
		MountainContainer,
		TreeContainer
	]

	decorationInfos: DecorationInfo[] = [];

	constructor(private scene: MainGame) {
		this.decorationContainers.forEach((container) => {
			const staticGroup = scene.physics.add.staticGroup();
			const instance = new container(scene, staticGroup);
			this.decorationInfos.push({
				instance,
				group: staticGroup
			})
		});
	}
	
	addToWorldGroup() {
		
	}
}