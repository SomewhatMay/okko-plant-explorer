import { GameObjects, Physics } from "phaser";

export class Mover {
  static playerSpeed = 10; // pixels per 100ms

  worldPos = 0;

  constructor(
    private worldGroup: Physics.Arcade.StaticGroup,
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined
  ) {}

  moveWorld(offset: number) {
    this.worldPos += offset;

    this.worldGroup.getChildren().forEach((_child) => {
      const child = _child as GameObjects.Image;
      child.setPosition(child.x + offset, child.y);
    });
  }

  update(_: number, delta: number) {
    if (this.cursors) {
      if (this.cursors.left?.isDown) {
        this.moveWorld((Mover.playerSpeed * delta) / 10);
      } else if (this.cursors.right?.isDown) {
        this.moveWorld((-Mover.playerSpeed * delta) / 10);
      }
    }
  }
}
