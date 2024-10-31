import { Menu } from "./menu";
import { InfoDisplay } from "./info-display";
import { Store } from "../game/store";
import { Game as MainGame } from "../game/index";

export class UI {
  menu: Menu;
  infoDisplay: InfoDisplay;

  constructor(scene: MainGame, store: Store) {
    this.menu = new Menu(scene, store);
    this.infoDisplay = new InfoDisplay(scene, store);
  }

  update(_: number, __: number) {
    this.menu.update();
  }
}
