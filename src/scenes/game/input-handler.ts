import { Game as MainGame } from "./index";

type CursorKeys = Phaser.Types.Input.Keyboard.CursorKeys;
type Key = Phaser.Input.Keyboard.Key;

export class InputHandler {
  cursors: CursorKeys | undefined;

  movingLeft: boolean;
  movingRight: boolean;

  aKey: Key;
  dKey: Key;

  // runs on scene.create()
  constructor(scene: MainGame) {
    if (scene.input.keyboard) {
      this.cursors = scene.input.keyboard.createCursorKeys();
      this.aKey = scene.input.keyboard.addKey("A");
      this.dKey = scene.input.keyboard.addKey("D");
    }

    this.cursors = scene.input.keyboard?.createCursorKeys();
  }

  update() {
    this.movingLeft = this.cursors?.left.isDown || this.aKey.isDown;
    this.movingRight = this.cursors?.right.isDown || this.dKey.isDown;
  }
}
