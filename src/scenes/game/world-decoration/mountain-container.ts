import { Physics, Scene } from "phaser";
import { screenSize } from "../../../constants";
import { GrassContainer } from "./grass-container";

export class MountainContainer {
  static mountainScale = 3.5;

  constructor(
    private scene: Scene,
    private mountainGroup: Physics.Arcade.StaticGroup
  ) {
    this.scene.textures
      .get("mountain")
      .setFilter(Phaser.Textures.FilterMode.NEAREST);

    this.populateMountains(10);
  }

  createMountain(x: number) {
    const mountain = this.scene.add
      .image(0, 0, "mountain")
      .setScale(MountainContainer.mountainScale)
      .setOrigin(0, 1);

    mountain.setPosition(
      x * mountain.width * MountainContainer.mountainScale,
      screenSize.y - GrassContainer.grassSize.y
    );
    this.mountainGroup.add(mountain);
  }

  populateMountains(width: number) {
    for (let i = -1; i < width - 1; i++) {
      this.createMountain(i);
    }
  }
}
