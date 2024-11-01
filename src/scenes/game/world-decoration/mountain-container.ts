import { Physics } from "phaser";
import { Game as MainGame } from "../index";
import { screenSize } from "../../../constants";
import { GrassContainer } from "./grass-container";
import { DecorationContainer } from "./decoration-container";

export class MountainContainer extends DecorationContainer {
  static mountainScale = 3.5;

  constructor(
    scene: MainGame,
    mountainGroup: Physics.Arcade.StaticGroup
  ) {
    super(scene, mountainGroup);
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
    this.staticGroup.add(mountain);
  }

  populateMountains(width: number) {
    for (let i = -1; i < width - 1; i++) {
      this.createMountain(i);
    }
  }
}
