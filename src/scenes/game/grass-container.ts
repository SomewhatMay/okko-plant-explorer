import { GameObjects, Physics, Scene } from "phaser";
import { screenSize } from "../../main";
import { Math as pMath } from "phaser";
const { Vector2 } = pMath;

export class GrassContainer {
  static grassSize = new Vector2(200, 200); // px

  constructor(
    private scene: Scene,
    private worldGroup: Physics.Arcade.StaticGroup
  ) {}

  createGrass(x: number) {
    const grass = this.scene.add
      .image(x * GrassContainer.grassSize.x, screenSize.y, "grass-side-view")
      .setOrigin(0, 1)
      .setDisplaySize(GrassContainer.grassSize.x, GrassContainer.grassSize.y);
    this.worldGroup.add(grass);
  }

  populateGrass(width: number) {
    for (let i = 0; i < width; i++) {
      this.createGrass(i);
    }
  }
}
