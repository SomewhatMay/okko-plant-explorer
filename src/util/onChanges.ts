import { Scene } from "phaser";

export function onChanges(
  scene: Scene,
  targetKey: string,
  callback: (parent: any, key: any, value: any) => void
) {
  const onEvent = (parent: any, key: any, value: any) => {
    if (key === targetKey) {
      callback(parent, key, value);
    }
  };

  scene.registry.events.on("setdata", onEvent);
  scene.registry.events.on("changedata", onEvent);
}
