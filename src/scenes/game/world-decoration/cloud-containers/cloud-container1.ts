import { Physics } from "phaser";
import { Game as MainGame } from "../../index";
import { CloudContainer } from "./cloud-container";

export class CloudContainer1 extends CloudContainer {
  constructor(scene: MainGame, cloudGroup: Physics.Arcade.StaticGroup) {
    super(scene, cloudGroup);
    this.cloudScale = 8;
    this.create();
  }
}
