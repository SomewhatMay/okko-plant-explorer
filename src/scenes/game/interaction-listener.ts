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

    const prevTarget = this.scene.registry.get("target");
    if (closest && distance < this.maxDistance) {
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
