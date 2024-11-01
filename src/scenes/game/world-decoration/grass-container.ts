import { Physics, Scene } from "phaser";
import { Game as MainGame } from "../index";
import { screenSize } from "../../../constants";
import { Math as pMath } from "phaser";
import { DecorationContainer } from "./decoration-container";
const { Vector2 } = pMath;

export class GrassContainer extends DecorationContainer {
  static grassSize = new Vector2(150, 150); // px

  constructor(
    scene: MainGame,
    worldGroup: Physics.Arcade.StaticGroup
  ) {
    super(scene, worldGroup);
    this.populateGrass(800);
    this.scene.textures
      .get("grass")
      .setFilter(Phaser.Textures.FilterMode.NEAREST);
  }

  createGrass(x: number) {
    const grass = this.scene.add
      .image(x * GrassContainer.grassSize.x, screenSize.y, "grass")
      .setOrigin(0, 1)
      .setDisplaySize(GrassContainer.grassSize.x, GrassContainer.grassSize.y);
    this.staticGroup.add(grass);
  }

  populateGrass(width: number) {
    for (let i = -20; i < width - 20; i++) {
      this.createGrass(i);
    }
  }
}
