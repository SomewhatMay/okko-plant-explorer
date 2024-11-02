import { Physics } from "phaser";
import { Game as MainGame } from "../../index";
import { TreeContainer } from "./tree-container";

export class TreeContainer2 extends TreeContainer {
  constructor(scene: MainGame, treeGroup: Physics.Arcade.StaticGroup) {
    super(scene, treeGroup);
    this.treeScale = 7;
    this.create();
  }
}
