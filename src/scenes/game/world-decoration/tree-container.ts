import { Physics, Scene } from "phaser";
import { screenSize } from "../../../constants";
import { GrassContainer } from "./grass-container";

export class TreeContainer {
  static treeScale = 8;
  static treeCount = 4; // number of tree textures labeled as "tree{n}"

  constructor(
    private scene: Scene,
    private treeGroup: Physics.Arcade.StaticGroup
  ) {
    for (let i = 0; i < TreeContainer.treeCount; i++) {
      this.scene.textures
        .get("tree" + i)
        .setFilter(Phaser.Textures.FilterMode.NEAREST);
    }

    this.populateTrees(100);
  }

  createTree(x: number) {
    const tree = this.scene.add
      .image(0, 0, "tree" + Math.floor(Math.random() * TreeContainer.treeCount))
      .setScale(TreeContainer.treeScale)
      .setOrigin(0, 1);

    tree.setPosition(
      x * tree.width * TreeContainer.treeScale,
      screenSize.y - GrassContainer.grassSize.y
    );
    this.treeGroup.add(tree);
  }

  populateTrees(width: number) {
    for (let i = -1; i < width - 1; i += Math.random() * 2) {
      this.createTree(i);
    }
  }
}
