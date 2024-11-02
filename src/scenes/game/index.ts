import { GameObjects, Scene } from "phaser";
// import {
//   GrassContainer,
//   MountainContainer,
//   TreeContainer,
// } from "./world-decoration";
import { Player } from "./player";
import { InteractableContainer } from "./interactables";
import { Mover } from "./mover";
import { UI } from "../ui";
import { Store } from "./store";
import { InputHandler } from "./input-handler";
import { WorldDecoration } from "./world-decoration";

export class Game extends Scene {
  background: GameObjects.Image;

  store: Store;
  inputHandler: InputHandler;
  interactableContainer: InteractableContainer;
  worldDecoration: WorldDecoration;

  player: Player;
  mover: Mover;

  ui: UI;

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

    this.interactableContainer = new InteractableContainer(this);
  }

  preload() {
    this.interactableContainer.preload();
  }

  create() {
    this.store = new Store(this, this.interactableContainer);

    this.inputHandler = new InputHandler(this);
    this.worldDecoration = new WorldDecoration(this);

    this.mover = new Mover(this.inputHandler, this.worldDecoration);
    this.player = new Player(this, this.inputHandler, this.mover);

    this.ui = new UI(this, this.store);
    this.interactableContainer.create(
      this.store,
      this.ui.notification,
      this.worldDecoration
    );
  }

  update(_: number, delta: number): void {
    this.inputHandler.update();

    this.player.update(_, delta);
    this.mover.update(_, delta);
    this.ui.update(_, delta);
    this.interactableContainer.update();
    this.worldDecoration.update(_, delta);
  }
}
