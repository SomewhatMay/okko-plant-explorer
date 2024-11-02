import { Game as MainGame } from "../index";
import { Store } from "../store";
import { Interactable, InteractableInfo } from "./interactable";
import { InteractionListener } from "./interaction-listener";
import { Notification } from "../../ui/notification";
import { WorldDecoration } from "../world-decoration";

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
    });
  }

  create(
    store: Store,
    notification: Notification,
    worldDecoration: WorldDecoration
  ) {
    this.interactableInfo.forEach((info) => {
      this.interactables.push(
        new Interactable(this.scene, worldDecoration, info)
      );
    });

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
