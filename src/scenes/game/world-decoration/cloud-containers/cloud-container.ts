import { Physics } from "phaser";
import { Game as MainGame } from "../../index";
import { DecorationContainer } from "../decoration-container";
import { screenSize } from "../../../../constants";

export abstract class CloudContainer extends DecorationContainer {
  cloudScale = 1;
  cloudSpeed = 0.15;

  // static scaleVariation = 3; // deviation from treeScale (subtraction or addition)
  static cloudCount = 6; // number of tree textures labeled as "tree{n}" [0, n)

  constructor(
    scene: MainGame,
    private cloudGroup: Physics.Arcade.StaticGroup
  ) {
    super(scene, cloudGroup);
    for (let i = 0; i < CloudContainer.cloudCount; i++) {
      this.scene.textures
        .get("cloud" + i)
        .setFilter(Phaser.Textures.FilterMode.NEAREST);
    }
  }

  create() {
    this.populateClouds(10);
  }

  createCloud(x: number) {
    const cloud = this.scene.add
      .image(
        0,
        0,
        "cloud" + Math.floor(Math.random() * CloudContainer.cloudCount)
      )
      .setScale(
        this.cloudScale //+
        // (Math.random() - 0.5) * TreeContainer.scaleVariation
      )
      .setOrigin(0, 0);

    const posX = x * cloud.width * this.cloudScale;
    cloud.setPosition(posX, cloud.height);
    cloud.setData("startingX", x);
    this.staticGroup.add(cloud);
  }

  populateClouds(width: number) {
    const start = Math.random() * 2;

    for (let i = -start; i < width - 1; i += 1) {
      this.createCloud(i);
    }
  }

  update(_: number, delta: number) {
    this.cloudGroup.getChildren().forEach((_cloud) => {
      const cloud = _cloud as Phaser.Physics.Arcade.Image;
      const offset = this.cloudSpeed * delta;
      cloud.setPosition(cloud.x - offset, cloud.y);
      if (cloud.x < -screenSize.x) {
        cloud.setPosition(
          screenSize.x +
            1000 +
            cloud.getData("startingX") * cloud.width * this.cloudScale,
          cloud.y
        );
      }
    });
  }
}
