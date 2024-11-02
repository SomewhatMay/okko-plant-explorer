import { Physics } from "phaser";
import { Game as MainGame } from "../../index";
import { screenSize } from "../../../../constants";
import { GrassContainer } from "../grass-container";
import { DecorationContainer } from "../decoration-container";

export abstract class TreeContainer extends DecorationContainer {
  treeScale = 8;
  // static scaleVariation = 3; // deviation from treeScale (subtraction or addition)
  static treeCount = 4; // number of tree textures labeled as "tree{n}"

  constructor(scene: MainGame, treeGroup: Physics.Arcade.StaticGroup) {
    super(scene, treeGroup);
    for (let i = 0; i < TreeContainer.treeCount; i++) {
      this.scene.textures
        .get("tree" + i)
        .setFilter(Phaser.Textures.FilterMode.NEAREST);
    }
  }

  create() {
    this.populateTrees(100);
  }

  createTree(x: number) {
    const tree = this.scene.add
      .image(0, 0, "tree" + Math.floor(Math.random() * TreeContainer.treeCount))
      .setScale(
        this.treeScale //+
        // (Math.random() - 0.5) * TreeContainer.scaleVariation
      )
      .setOrigin(0, 1);

    tree.setPosition(
      x * tree.width * this.treeScale,
      screenSize.y - GrassContainer.grassSize.y
    );
    this.staticGroup.add(tree);
  }

  populateTrees(width: number) {
    for (let i = -1; i < width - 1; i += 0.5 + Math.random() * 1.5) {
      this.createTree(i);
    }
  }
}
