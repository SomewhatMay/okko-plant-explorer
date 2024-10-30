import { Scene } from "phaser";
import { Interactable } from "./interactable";

export class InteractionListener {
  maxDistance = 500; // px

  constructor(
    private scene: Scene,
    private interactables: Interactable[]
  ) {}

  update() {
    let closest: Interactable | undefined = undefined,
      distance: number = Infinity;

    this.interactables.forEach((interactable) => {
      const interactableDistance = Math.abs(interactable.getDistance());
      if (interactableDistance < distance) {
        distance = interactableDistance;
        closest = interactable;
      }
    });

    if (closest && distance < this.maxDistance) {
      // if this is a new target, we reset the action
      if (
        this.scene.data.get("target") !== (closest as Interactable).info.title
      )
        this.scene.data.set("action", "");

      this.scene.data.set("target", (closest as Interactable).info.title);
    } else {
      this.scene.data.set("target", "");
    }
  }
}
