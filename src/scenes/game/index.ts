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
    // this.input.keyboard?.addKeys(
    //   {up:Phaser.Input.Keyboard.KeyCodes.W,
    //     down:Phaser.Input.Keyboard.KeyCodes.S,
    //     left:Phaser.Input.Keyboard.KeyCodes.A,
    //     right:Phaser.Input.Keyboard.KeyCodes.D});

        
    this.cursors = this.input.keyboard?.createCursorKeys();
    this.interactableInfo.forEach((info) => {
      this.interactables.push(new Interactable(this, this.worldGroup, info));
    });

    this.player = new Player(this, this.cursors);
    this.mover = new Mover(this.worldGroup, this.cursors);

    this.ui = new UI(this);

    this.interactionListener = new InteractionListener(
      this,
      this.interactables
    );
  }

  update(_: number, delta: number): void {
    this.player.update(_, delta);
    this.mover.update(_, delta);
    this.ui.update(_, delta);
    this.interactionListener.update();
  }
}
