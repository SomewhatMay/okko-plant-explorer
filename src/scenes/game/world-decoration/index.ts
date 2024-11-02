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
import { CloudContainer1 } from "./cloud-containers";
import { screenSize } from "../../../constants";

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

  CLOUD_CLASS = CloudContainer1;
  cloudContainer: CloudContainer1;

  decorationContainers: ContainerInfo[] = [
    { speedMultiplier: 0.025, class: CloudContainer1 },
    { speedMultiplier: 1, class: GrassContainer },
    { speedMultiplier: 0.075, class: MountainContainer },
    { speedMultiplier: 0.15, class: TreeContainer3 }, // farther ones should be drawn first
    { speedMultiplier: 0.2, class: TreeContainer2 },
    { speedMultiplier: 0.25, class: TreeContainer1 },
  ];

  decorationInfos: DecorationInfo[] = [];

  constructor(scene: MainGame) {
    scene.add.image(screenSize.x - 250, 200, "sun").setScale(0.8);

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
      } else if (containerInfo.class == this.CLOUD_CLASS) {
        this.cloudContainer = instance as CloudContainer1;
      }
    });
  }

  addToForegroundGroup(object: GameObjects.Image) {
    this.foregroundGroup.add(object);
  }

  update(_: number, delta: number) {
    this.cloudContainer.update(_, delta);
  }
}
