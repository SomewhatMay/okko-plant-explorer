import { Scene } from "phaser";

export class Boot extends Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
    //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

    this.load.image("background", "assets/bg.png");
    this.load.image("transparent", "assets/transparent.png");
    this.load.image("grass-side-view", "assets/grass-block.webp");
    this.load.image("grass", "assets/grass.png");
    this.load.image("mountain", "assets/mountain.png");
    this.load.image("sun", "assets/sun.png");

    // load trees
    for (let i = 0; i < 4; i++) {
      this.load.image("tree" + i, "assets/tree" + i + ".png");
    }

    // load clouds
    for (let i = 0; i < 6; i++) {
      this.load.image("cloud" + i, "assets/cloud" + i + ".png");
    }

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
