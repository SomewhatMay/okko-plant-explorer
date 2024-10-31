import { Physics, Scene } from "phaser";
import { screenSize } from "../../../constants";
import { Math as pMath } from "phaser";
const { Vector2 } = pMath;

export class GrassContainer {
  static grassSize = new Vector2(200, 200); // px

  constructor(
    private scene: Scene,
    private worldGroup: Physics.Arcade.StaticGroup
  ) {
    this.populateGrass(100);
  }

  createGrass(x: number) {
    const grass = this.scene.add
      .image(x * GrassContainer.grassSize.x, screenSize.y, "grass-side-view")
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
