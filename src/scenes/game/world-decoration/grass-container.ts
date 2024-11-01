import { Physics, Scene } from "phaser";
import { screenSize } from "../../../constants";
import { Math as pMath } from "phaser";
const { Vector2 } = pMath;

export class GrassContainer {
  static grassSize = new Vector2(150, 150); // px

  constructor(
    private scene: Scene,
    private worldGroup: Physics.Arcade.StaticGroup
  ) {
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
    this.worldGroup.add(grass);
  }

  populateGrass(width: number) {
    for (let i = -20; i < width - 20; i++) {
      this.createGrass(i);
    }
  }
}
