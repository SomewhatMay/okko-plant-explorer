import { GameObjects, Physics, Scene } from "phaser";
import { GrassContainer } from "./grass-container";
import { Player } from "./player";
import { Interactable, InteractableInfo } from "./interactable";
import { Mover } from "./mover";
import { UI } from "../ui";

export class Game extends Scene {
  worldGroup: Physics.Arcade.StaticGroup;
  background: GameObjects.Image;
  grassContainer: GrassContainer;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;

  player: Player;
  mover: Mover;

  ui: UI;

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
    // Initialize Data
    this.data.set("target", "");
    this.data.set("action", "");
    this.data.set(
      "interactables",
      JSON.parse(JSON.stringify(this.interactableInfo)) // Storing a copy of the data so we can mutate it
    );

    this.worldGroup = this.physics.add.staticGroup();
    this.grassContainer = new GrassContainer(this, this.worldGroup);
    this.grassContainer.populateGrass(100);

    this.cursors = this.input.keyboard?.createCursorKeys();

    this.interactableInfo.forEach((info) => {
      this.interactables.push(new Interactable(this, this.worldGroup, info));
    });

    this.player = new Player(this, this.cursors);
    this.mover = new Mover(this.worldGroup, this.cursors);

    this.ui = new UI(this);
  }

  update(_: number, delta: number): void {
    this.player.update(_, delta);
    this.mover.update(_, delta);
    this.ui.update(_, delta);
  }
}
