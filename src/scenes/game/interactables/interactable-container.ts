import { Game as MainGame } from "../index";
import { Store } from "../store";
import { Interactable, InteractableInfo } from "./interactable";
import { InteractionListener } from "./interaction-listener";
import { Notification } from "../../ui/notification";

/**
 * See note on constructor
 */
export class InteractableContainer {
  interactionListener: InteractionListener;
  interactableInfo: InteractableInfo[] = [];
  interactables: Interactable[] = [];

  /**
   * This class is created before preload!
   */
  constructor(private scene: MainGame) {}

  preload() {
    // Retrieve the interactables json from cache
    this.scene.load.json("interactables", "assets/interactables.json");
    this.interactableInfo = this.scene.cache.json.get(
      "interactables"
    ) as InteractableInfo[];

    // Load all interactable sprites
    this.interactableInfo.forEach((info) => {
      this.scene.load.image(info.imageKey, info.imageUrl);
      console.log(
        "Loading image key " + info.imageKey + " with url " + info.imageUrl
      );
    });
  }

  create() {
    this.interactableInfo.forEach((info) => {
      this.interactables.push(
        new Interactable(this.scene, this.scene.worldGroup, info)
      );
    });
  }

  postCreate(store: Store, notification: Notification) {
    this.interactionListener = new InteractionListener(
      this.scene,
      this.interactables,
      store,
      notification
    );
  }

  update() {
    this.interactionListener.update();
  }
}
