import { GameObjects, Physics, Scene } from "phaser";
import { GrassContainer } from "./world-decoration";
import { Player } from "./player";
import { InteractableContainer } from "./interactables";
import { Mover } from "./mover";
import { UI } from "../ui";
import { Store } from "./store";
import { InputHandler } from "./input-handler";

export class Game extends Scene {
  worldGroup: Physics.Arcade.StaticGroup;
  background: GameObjects.Image;
  grassContainer: GrassContainer;

  store: Store;
  inputHandler: InputHandler;
  interactableContainer: InteractableContainer;

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
    /*
      this order is important as interactableContainer 
      needs worldGroup to function
    */
    this.worldGroup = this.physics.add.staticGroup();
    /* 
      interactableContainer must be created before
      store since store depends on the data loaded
      by interactableContainer
    */
    this.interactableContainer.create();
    this.store = new Store(this, this.interactableContainer);

    this.grassContainer = new GrassContainer(this, this.worldGroup);

    this.inputHandler = new InputHandler(this);

    this.mover = new Mover(this.inputHandler, this.worldGroup);
    this.player = new Player(this, this.inputHandler, this.mover);

    this.ui = new UI(this, this.store);
  }

  update(_: number, delta: number): void {
    this.inputHandler.update();

    this.player.update(_, delta);
    this.mover.update(_, delta);
    this.ui.update(_, delta);
    this.interactableContainer.update();
  }
}
