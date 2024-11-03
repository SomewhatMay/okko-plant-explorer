import { Menu } from "./menu";
import { InfoDisplay } from "./info-display";
import { Store } from "../game/store";
import { Game as MainGame } from "../game/index";
import { Notification } from "./notification";
import { CitationalGratitudeButton } from "./citational-gratitude";
import { MainWindow as CitationalGratitudeMainWindow } from "./citational-gratitude/";

export class UI {
  menu: Menu;
  infoDisplay: InfoDisplay;
  notification: Notification;
  citationalGratitudeMainWindow: CitationalGratitudeMainWindow;
  citationalGratitudeButton: CitationalGratitudeButton;

  constructor(scene: MainGame, store: Store) {
    this.menu = new Menu(scene, store);
    this.infoDisplay = new InfoDisplay(scene, store);
    this.notification = new Notification(scene);
    this.citationalGratitudeMainWindow = new CitationalGratitudeMainWindow(
      scene
    );
    this.citationalGratitudeButton = new CitationalGratitudeButton(
      scene,
      this.citationalGratitudeMainWindow
    );
  }

  update(_: number, __: number) {
    this.menu.update();
  }
}
