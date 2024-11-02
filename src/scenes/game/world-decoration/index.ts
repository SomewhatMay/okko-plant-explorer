import { GameObjects, Physics } from "phaser";
import { Game as MainGame } from "../index";
import { DecorationContainer } from "./decoration-container";
import { GrassContainer } from "./grass-container";
import { MountainContainer } from "./mountain-container";
import {
  TreeContainer1,
  TreeContainer2,
  TreeContainer3,
} from "./tree-containers";

type ContainerInfo = {
  speedMultiplier: number;
  /**
   * The multiplier for the speed of the container,
   * in relation to Mover.playerSpeed.
   */
  class: typeof DecorationContainer;
};

type DecorationInfo = {
  instance: DecorationContainer;
  group: Physics.Arcade.StaticGroup;
  speedMultiplier: number;
};

export class WorldDecoration {
  FOREGROUND_CLASS = GrassContainer;
  foregroundGroup: Physics.Arcade.StaticGroup;

  decorationContainers: ContainerInfo[] = [
    { speedMultiplier: 1, class: GrassContainer },
    { speedMultiplier: 0.075, class: MountainContainer },
    { speedMultiplier: 0.1, class: TreeContainer3 }, // farther ones should be drawn first
    { speedMultiplier: 0.11, class: TreeContainer2 },
    { speedMultiplier: 0.125, class: TreeContainer1 },
  ];

  decorationInfos: DecorationInfo[] = [];

  constructor(scene: MainGame) {
    this.decorationContainers.forEach((containerInfo) => {
      const staticGroup = scene.physics.add.staticGroup();
      const instance = new containerInfo.class(scene, staticGroup);
      this.decorationInfos.push({
        instance,
        group: staticGroup,
        speedMultiplier: containerInfo.speedMultiplier,
      });

      if (containerInfo.class == this.FOREGROUND_CLASS) {
        this.foregroundGroup = staticGroup;
      }
    });
  }

  addToForegroundGroup(object: GameObjects.Image) {
    this.foregroundGroup.add(object);
  }
}
