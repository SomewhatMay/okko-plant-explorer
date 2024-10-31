import { GameObjects, Physics, Scene } from "phaser";
import { GrassContainer } from "./grass-container";
import { Player } from "./player";
import { Interactable, InteractableInfo } from "./interactable";
import { InteractionListener } from "./interaction-listener";
import { Mover } from "./mover";
import { UI } from "../ui";

type CursorKeys = Phaser.Types.Input.Keyboard.CursorKeys;
type Key = Phaser.Input.Keyboard.Key;

export class Game extends Scene {
  worldGroup: Physics.Arcade.StaticGroup;
  background: GameObjects.Image;
  grassContainer: GrassContainer;
  cursors: CursorKeys | undefined;

  movingLeft: boolean;
  movingRight: boolean;

  aKey: Key;
  dKey: Key;

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
    // Initialize Data
    this.registry.set("target", "");
    this.registry.set("action", "");
    this.registry.set(
      "interactables",
      JSON.parse(JSON.stringify(this.interactableInfo)) // Storing a copy of the data so we can mutate it
    );

    this.worldGroup = this.physics.add.staticGroup();
    this.grassContainer = new GrassContainer(this, this.worldGroup);
    this.grassContainer.populateGrass(100);

    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
      this.aKey = this.input.keyboard.addKey("A");
      this.dKey = this.input.keyboard.addKey("D");
    }

    this.cursors = this.input.keyboard?.createCursorKeys();
    this.interactableInfo.forEach((info) => {
      this.interactables.push(new Interactable(this, this.worldGroup, info));
    });

    this.mover = new Mover(this, this.worldGroup);
    this.player = new Player(this, this.cursors, this.mover);

    this.ui = new UI(this);

    this.interactionListener = new InteractionListener(
      this,
      this.interactables
    );
  }

  getInfo(title: string) {
    let result;

    const interactables = this.registry.get(
      "interactables"
    ) as InteractableInfo[];
    interactables.forEach((info) => {
      if (info.title === title) {
        result = info;
      }
    });

    return result as unknown as (InteractableInfo | undefined);
  }

  /**
   * Returns the percentage discovered, 
   * rounded to nearest whole number.
   */
  getDiscovered(title: string): number {
    const info = this.getInfo(title);
    if (info) {
      const discovered = 
        Object.values(info.discovered).reduce(
          (previous, value) => 
            ((previous as unknown as number) + (value ? 1 : 0)) as unknown as boolean
        ) as unknown as number / Object.values(info.discovered).length;

      return Math.floor(discovered * 100);
    }

    return 0;
  }

  update(_: number, delta: number): void {
    this.movingLeft = this.cursors?.left.isDown || this.aKey.isDown;
    this.movingRight = this.cursors?.right.isDown || this.dKey.isDown;

    this.player.update(_, delta);
    this.mover.update(_, delta);
    this.ui.update(_, delta);
    this.interactionListener.update();
  }
}
