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
  worldDecoration: WorldDecoration;

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
    this.worldDecoration = worldDecoration;
    this.populateInteractables(100);

    this.interactionListener = new InteractionListener(
      this.scene,
      this.interactables,
      store,
      notification
    );
  }

  populateInteractables(count: number) {
    for (let i = 0; i < count; i += 1 + Math.random()) {
      this.interactableInfo.forEach((info) => {
        this.interactables.push(
          new Interactable(this.scene, this.worldDecoration, info, i * 500)
        );
        i += (info.itemCountVariance[1] * info.distanceVariance[1]) / 2;
      });
    }
  }

  update() {
    this.interactionListener.update();
  }
}
