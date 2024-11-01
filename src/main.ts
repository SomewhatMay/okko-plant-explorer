import { Boot } from "./scenes/boot";
// import { Game as MainGame } from "./example-scenes/Game";
// import { GameOver } from "./example-scenes/GameOver";
// import { MainMenu } from "./example-scenes/MainMenu";
// import { Preloader } from "./example-scenes/Preloader";
import { Game as MainGame } from "./scenes/game/";

import { Game, Types } from "phaser";
import { screenSize } from "./constants";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: screenSize.x,
  height: screenSize.y,
  parent: "game-container",
  backgroundColor: "#028af8",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        x: 0,
        y: 0,
      },
      // debug: true,
    },
  },
  scene: [Boot, MainGame],
};

export default new Game(config);
