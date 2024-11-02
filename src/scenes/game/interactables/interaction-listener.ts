import { Scene } from "phaser";
import { Interactable, InteractableInfo } from ".";
import { Store } from "../store";
import { Notification } from "../../ui/notification";

export class InteractionListener {
  constructor(
    private scene: Scene,
    private interactables: Interactable[],
    store: Store,
    notification: Notification
  ) {
    // Listen to key presses
    const createInteraction = (key: string, action: string) => {
      scene.input.keyboard?.on("keydown-" + key, () => {
        const target = this.scene.registry.get("target");
        const currentAction = this.scene.registry.get("action");

        if (target !== "" && currentAction === "") {
          this.scene.registry.set("action", action);

          const wasDiscovered = store.getDiscovered(target);
          const interactableInfo = (
            scene.registry.get("interactables") as InteractableInfo[]
          ).map((info) => {
            if (info.title === target) {
              return {
                ...info,
                discovered: {
                  ...info.discovered,
                  [action]: true,
                },
              };
            }
            return info;
          });
          scene.registry.set("interactables", interactableInfo);

          if (wasDiscovered !== 100 && store.getDiscovered(target) === 100) {
            notification.displayNotification(
              "You have discovered " + target + "!"
            );
          }
        }
      });
    };

    createInteraction("E", "observe");
    createInteraction("F", "touch");
    createInteraction("Q", "smell");

    scene.input.keyboard?.on("keydown", (event: any) => {
      if (event.key == "Escape") {
        const target = this.scene.registry.get("target");

        if (target !== "") {
          this.scene.registry.set("action", "");
        }
      }
    });
  }

  update() {
    let closest: Interactable | undefined = undefined,
      distance: number = Infinity;

    this.interactables.forEach((interactable) => {
      const interactableDistance = Math.abs(interactable.getDistance());
      if (
        interactableDistance < distance &&
        interactableDistance <= interactable.info.interactionDistance
      ) {
        distance = interactableDistance;
        closest = interactable;
      }
    });

    const prevTarget = this.scene.registry.get("target");
    if (closest !== undefined) {
      if (prevTarget !== (closest as Interactable).info.title) {
        // if this is a new target, we reset the action
        this.scene.registry.set("action", "");
        this.scene.registry.set("target", (closest as Interactable).info.title);
      }
    } else if (prevTarget !== "") {
      this.scene.registry.set("target", "");
      this.scene.registry.set("action", "");
    }
  }
}
