import { GameObjects, Scene } from "phaser";
import { screenSize } from "../../constants";
import { GrassContainer } from "./grass-container";
import { Mover } from "./mover";
import { Game as MainGame } from "./index";

export class Player {
  sprite: GameObjects.Sprite;
  wasWalking = false;

  constructor(
    private scene: MainGame,
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined
  ) {
    this.sprite = scene.add
      .sprite(
        screenSize.x / 2,
        screenSize.y - GrassContainer.grassSize.y,
        "player"
      )
      .setOrigin(0.44, 1)
      .setScale(4);

    scene.anims.create({
      key: "idle",
      frames: scene.anims.generateFrameNumbers("player", { frames: [0] }),
      frameRate: 10,
      repeat: -1,
    });

    scene.anims.create({
      key: "run",
      frames: scene.anims.generateFrameNumbers("player", {
        start: 21,
        end: 40,
      }),
      frameRate: Mover.playerSpeed * 2.4,
      repeat: -1,
    });
  }

  update(_: number, __: number): void {
    if (this.cursors) {
      if (this.scene.movingLeft) {
        this.sprite.setOrigin(0.53, 1);
        this.sprite.flipX = true;

        if (!this.wasWalking) {
          this.sprite.play("run");
          this.wasWalking = true;
        }
      } else if (this.scene.movingRight) {
        this.sprite.setOrigin(0.47, 1);
        this.sprite.flipX = false;

        if (!this.wasWalking) {
          this.sprite.play("run");
          this.wasWalking = true;
        }
      } else {
        if (this.wasWalking) {
          this.sprite.play("idle");
          this.wasWalking = false;
        }
      }
    }
  }
}
