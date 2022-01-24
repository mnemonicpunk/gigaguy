import GameKit from "../engine/gamekit.js";
import TitleScene from "./titlescene.js";

new GameKit();

gamekit.setResolution(1920, 1080);

gamekit.assets.loadImage("title_bg", "./gigaguy/assets/gigaguy.png");
gamekit.assets.loadImage("mmsprite", "./gigaguy/assets/mmsprite.png");
gamekit.assets.loadImage("block", "./gigaguy/assets/block.png");

gamekit.assets.loadSound("title-bgm", "./gigaguy/assets/Bonus_Man.mp3");
gamekit.assets.loadSound("stage1-bgm", "./gigaguy/assets/Drizzle_Man.mp3");

gamekit.preloadAndStartWith(new TitleScene());