import Scene from '../engine/scene.js';
import Entity from "../engine/entity.js";
import { StaticImageSprite, TextSprite } from "../engine/sprite.js";

import GameScene from "./gamescene.js";

class TitleEntity extends Entity {
    constructor() {
        super();
        this.sprite = new StaticImageSprite({
            image: gamekit.assets.image('title_bg').get(),
        });

        this.text_banner = this.sprite.add(new TextSprite({
            x: 960,
            y: 810,
            text: "Press SPACE to start!",
            font: "36px Console",
            color: "#f0f",
            outline: true,
            alignment: "center"
        }));
        
        this.announced = false;
        this.timer = 0;
    }
    tick(scene) {
        this.timer = scene.uptime%60;

        this.text_banner.color = "#fff";
        if (this.timer > 30) {
            this.text_banner.color = "#aaa";
        }

        let bgm = gamekit.assets.sound('title-bgm');

        bgm.play(); 

        if (bgm.isPlaying()) {
            let ctrl = gamekit.controls;
            if (ctrl.checkPressed(" ")) {
                bgm.stop();
                scene.switchScene(new GameScene());
            }
        }
    }
}

export default class TitleScene extends Scene {
    constructor() {
        super();
        this.add(new TitleEntity());
    }
}