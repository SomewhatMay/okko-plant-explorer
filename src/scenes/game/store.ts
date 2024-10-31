import { Game as MainGame } from "./index";
import { InteractableInfo } from "./interactable";

export class Store {
  // run with the create function
  constructor(private scene: MainGame) {
    // Initialize Data
    scene.registry.set("target", "");
    scene.registry.set("action", "");
    scene.registry.set(
      "interactables",
      JSON.parse(JSON.stringify(scene.interactableInfo)) // Storing a copy of the data so we can mutate it
    );
  }

  getInfo(title: string) {
    let result;

    const interactables = this.scene.registry.get(
      "interactables"
    ) as InteractableInfo[];
    interactables.forEach((info) => {
      if (info.title === title) {
        result = info;
      }
    });

    return result as unknown as InteractableInfo | undefined;
  }

  /**
   * Returns the percentage discovered,
   * rounded to nearest whole number.
   */
  getDiscovered(title: string): number {
    const info = this.getInfo(title);
    if (info) {
      const discovered =
        (Object.values(info.discovered).reduce(
          (previous, value) =>
            ((previous as unknown as number) +
              (value ? 1 : 0)) as unknown as boolean
        ) as unknown as number) / Object.values(info.discovered).length;

      return Math.floor(discovered * 100);
    }

    return 0;
  }

  get(key: string) {
    return this.scene.registry.get(key);
  }

  changed(key: string, callback: (value: unknown) => void) {
    const onEvent = (_: any, eventKey: any, value: any) => {
      if (eventKey === key) {
        callback(value);
      }
    };

    this.scene.registry.events.on("setdata", onEvent);
    this.scene.registry.events.on("changedata", onEvent);
  }
}
