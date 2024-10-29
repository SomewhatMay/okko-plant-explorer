import { Scene } from "phaser";

export class Boot extends Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
    //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

    this.load.image("background", "assets/bg.png");
    this.load.image("grass-side-view", "assets/grass-block.webp");
    // this.load.image("player-idle", "assets/player-idle.png");
    this.load.spritesheet("player", "assets/stickman-sprites.png", {
      frameWidth: 128,
      frameHeight: 128,
    });
  }

  create() {
    this.scene.start("Game");
  }
}
