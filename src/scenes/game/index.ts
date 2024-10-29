import { GameObjects, Physics, Scene } from "phaser";
import { GrassContainer } from "./grass-container";
import { Player } from "./player";
import { screenSize } from "../../main";
import { Interactable, InteractableInfo } from "./interactable";

export class Game extends Scene {
  worldGroup: Physics.Arcade.StaticGroup;
  background: GameObjects.Image;
  grassContainer: GrassContainer;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;

  playerSpeed = 10; // pixels per 100ms
  player: GameObjects.Sprite;
  wasWalking = false;
  worldPos = 0;

  interactableInfo: InteractableInfo[] = [];

  constructor() {
    super({
      key: "Game",
      pack: {
        files: [
          {
            type: "json",
            key: "interactables",
            url: "assets/interactables.json",
          },
        ],
      },
    });
  }

  preload() {
    this.load.json("interactables", "assets/interactables.json");
    this.interactableInfo = this.cache.json.get(
      "interactables"
    ) as InteractableInfo[];

    this.interactableInfo.forEach((info) => {
      this.load.image(info.imageKey, info.imageUrl);
      console.log(
        "Loading image key " + info.imageKey + " with url " + info.imageUrl
      );
    });
  }

  create() {
    this.worldGroup = this.physics.add.staticGroup();
    this.grassContainer = new GrassContainer(this, this.worldGroup);
    this.grassContainer.populateGrass(100);
    this.cursors = this.input.keyboard?.createCursorKeys();

    this.player = this.add
      .sprite(
        screenSize.x / 2,
        screenSize.y - GrassContainer.grassSize.y,
        "player"
      )
      .setOrigin(0.44, 1)
      .setScale(4);

    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("player", { frames: [0] }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNumbers("player", { start: 21, end: 40 }),
      frameRate: this.playerSpeed * 2.4,
      repeat: -1,
    });

    this.interactableInfo.forEach((info) => {
      new Interactable(this, this.worldGroup, info);
    });
  }

  moveWorld(offset: number) {
    this.worldPos += offset;

    this.worldGroup.getChildren().forEach((_child) => {
      const child = _child as GameObjects.Image;
      child.setPosition(child.x + offset, child.y);
    });
  }

  update(time: number, delta: number): void {
    console.log();
    if (this.cursors) {
      if (this.cursors.left?.isDown) {
        this.player.setOrigin(0.53, 1);
        this.player.flipX = true;
        this.moveWorld((this.playerSpeed * delta) / 10);

        if (!this.wasWalking) {
          this.player.play("run");
          this.wasWalking = true;
        }
      } else if (this.cursors.right?.isDown) {
        this.player.setOrigin(0.47, 1);
        this.player.flipX = false;
        this.moveWorld((-this.playerSpeed * delta) / 10);

        if (!this.wasWalking) {
          this.player.play("run");
          this.wasWalking = true;
        }
      } else {
        if (this.wasWalking) {
          this.player.play("idle");
          this.wasWalking = false;
        }
      }
    }
  }
}
