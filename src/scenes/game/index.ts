import { GameObjects, Physics, Scene } from "phaser";
import { GrassContainer } from "./grass-container";
import { Player } from "./player";
import { Interactable, InteractableInfo } from "./interactable";
import { Mover } from "./mover";

export class Game extends Scene {
  worldGroup: Physics.Arcade.StaticGroup;
  background: GameObjects.Image;
  grassContainer: GrassContainer;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;

  player: Player;
  mover: Mover;

  interactableInfo: InteractableInfo[] = [];

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
    this.load.json("interactables", "assets/interactables.json");
    this.interactableInfo = this.cache.json.get(
      "interactables"
    ) as InteractableInfo[];

    this.interactableInfo.forEach((info) => {
      this.load.image(info.imageKey, info.imageUrl);
      console.log(
        "Loading image key " + info.imageKey + " with url " + info.imageUrl
      );
    });
  }

  create() {
    this.worldGroup = this.physics.add.staticGroup();
    this.grassContainer = new GrassContainer(this, this.worldGroup);
    this.grassContainer.populateGrass(100);
    this.cursors = this.input.keyboard?.createCursorKeys();

    this.player = new Player(this, this.cursors);
    this.mover = new Mover(this.worldGroup, this.cursors);

    this.interactableInfo.forEach((info) => {
      new Interactable(this, this.worldGroup, info);
    });
  }

  update(_: number, delta: number): void {
    this.player.update(_, delta);
    this.mover.update(_, delta);
  }
}
