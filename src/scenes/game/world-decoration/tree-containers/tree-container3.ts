import { Physics } from "phaser";
import { Game as MainGame } from "../../index";
import { TreeContainer } from "./tree-container";

export class TreeContainer3 extends TreeContainer {
  constructor(scene: MainGame, treeGroup: Physics.Arcade.StaticGroup) {
    super(scene, treeGroup);
    this.treeScale = 6;
    this.create();
  }
}
