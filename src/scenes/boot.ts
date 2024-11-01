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
    this.load.image("grass", "assets/grass.png");
    this.load.image("mountain", "assets/mountain.png");
    this.load.image("tree0", "assets/tree0.png");
    this.load.image("tree1", "assets/tree1.png");
    this.load.image("tree2", "assets/tree2.png");
    this.load.image("tree3", "assets/tree3.png");
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
