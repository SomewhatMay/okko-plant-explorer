import { Scene } from "phaser";
import { Menu } from "./menu";
import { InfoDisplay } from "./info-display";

export class UI {
  menu: Menu;
  infoDisplay: InfoDisplay;

  constructor(private scene: Scene) {
    this.menu = new Menu(scene);
    this.infoDisplay = new InfoDisplay(scene);
  }

  update(_: number, delta: number) {
    this.menu.update();
  }
}
