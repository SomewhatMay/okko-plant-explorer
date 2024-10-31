import { GameObjects, Physics, Scene } from "phaser";
import { GrassContainer } from "./grass-container";
import { Player } from "./player";
import { Interactable, InteractableInfo } from "./interactable";
import { InteractionListener } from "./interaction-listener";
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

  player: Player;
  mover: Mover;

  ui: UI;

  interactionListener: InteractionListener;
  interactableInfo: InteractableInfo[] = [];
  interactables: Interactable[] = [];

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
    // Retrieve the interactables json from cache
    this.load.json("interactables", "assets/interactables.json");
    this.interactableInfo = this.cache.json.get(
      "interactables"
    ) as InteractableInfo[];

    // Load all interactable sprites
    this.interactableInfo.forEach((info) => {
      this.load.image(info.imageKey, info.imageUrl);
      console.log(
        "Loading image key " + info.imageKey + " with url " + info.imageUrl
      );
    });
  }

  create() {
    this.store = new Store(this);

    this.worldGroup = this.physics.add.staticGroup();
    this.grassContainer = new GrassContainer(this, this.worldGroup);
    this.grassContainer.populateGrass(100);

    this.inputHandler = new InputHandler(this);

    this.interactableInfo.forEach((info) => {
      this.interactables.push(new Interactable(this, this.worldGroup, info));
    });

    this.mover = new Mover(this.inputHandler, this.worldGroup);
    this.player = new Player(this, this.inputHandler, this.mover);

    this.ui = new UI(this, this.store);

    this.interactionListener = new InteractionListener(
      this,
      this.interactables
    );
  }

  update(_: number, delta: number): void {
    this.inputHandler.update();

    this.player.update(_, delta);
    this.mover.update(_, delta);
    this.ui.update(_, delta);
    this.interactionListener.update();
  }
}
