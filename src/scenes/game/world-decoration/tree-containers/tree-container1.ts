import { Physics } from "phaser";
import { Game as MainGame } from "../../index";
import { TreeContainer } from "./tree-container";

export class TreeContainer1 extends TreeContainer {
  constructor(scene: MainGame, treeGroup: Physics.Arcade.StaticGroup) {
    super(scene, treeGroup);
    this.treeScale = 8;
    this.create();
  }
}
