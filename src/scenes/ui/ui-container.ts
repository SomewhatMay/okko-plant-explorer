import { GameObjects, Scene } from "phaser";

export abstract class UIContainer {
  graphics: GameObjects.Graphics;
  layer: GameObjects.Layer;

  children: GameObjects.GameObject[] = [];

  constructor(
    protected scene: Scene,
    protected offsetX: number = 0,
    protected offsetY: number = 0
  ) {
    this.graphics = scene.add.graphics();
    this.layer = scene.add.layer();
    this.layer.add(this.graphics);
  }

  draw() {}

  drawRoundRect(
    x: number,
    y: number,
    width: number,
    height: number,
    fillColor: number = 0xffffff,
    strokeColor: number = 0x000000,
    radius: number = 20
  ) {
    this.graphics.lineStyle(2, strokeColor, 1);
    this.graphics.fillStyle(fillColor, 1);
    this.graphics.fillRoundedRect(
      x + this.offsetX,
      y + this.offsetY,
      width,
      height,
      radius
    );
    this.graphics.strokeRoundedRect(
      x + this.offsetX,
      y + this.offsetY,
      width,
      height,
      radius
    );
  }

  drawLine(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    color: number = 0x000000,
    thickness: number = 1
  ) {
    this.graphics.lineStyle(thickness, color, 1);
    this.graphics.lineBetween(
      x1 + this.offsetX,
      y1 + this.offsetY,
      x2 + this.offsetX,
      y2 + this.offsetY
    );
  }

  drawText(
    x: number,
    y: number,
    text: string,
    fontSize: number = 16,
    color: string = "black"
  ) {
    const textObj = this.scene.add.text(
      x + this.offsetX,
      y + this.offsetY,
      text,
      {
        fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
        fontSize: fontSize + "px",
      }
    );
    textObj.setColor(color);
    this.children.push(textObj);
    this.layer.add(textObj);

    return textObj;
  }

  clear() {
    this.graphics.clear();
    this.children.forEach((child) => {
      child.destroy();
    });
  }

  setVisible(visible: boolean) {
    this.layer.visible = visible;
  }
}
