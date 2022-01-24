import Scene from '../engine/scene.js';
import Entity from "../engine/entity.js";
import { SheetSprite, StaticImageSprite, ActorSprite } from "../engine/sprite.js";

import GameOverScene from "./gameoverscene.js";

/*class Background extends Entity {
    constructor() {
        super();
        this.sprite = new StaticImageSprite({
            image: gamekit.assets.image('bg').get(),
            scale: 2
        });
    }
}

class Debris extends Entity {
    constructor() {
        super();
        this.sprite = new SheetSprite({
            image: gamekit.assets.image('debris').get(),
            columns: 1,
            rows: 2,
            scale: 2,
            image_max: 3,
            image_number: Math.floor(Math.random() * 4),
            ticks_per_frame: 1
        });

        this.timer = 0;
    }
    tick(scene) {
        this.timer++;
        if (this.timer > 30) {
            scene.remove(this);
        }
    }
}*/

class Player extends Entity {
    constructor() {
        super();
        this.render_layer = 1000000;
        this.sprite = new ActorSprite({
            image: gamekit.assets.image('mmsprite').get(),
            columns: 10,
            rows: 6,
            scale: 2,
            image_max: 60,
            ticks_per_frame: 6,
            position_tween: 0.25,
            x_offset: 37,
            named_animations: {
                'stand': [4, 5, 6, 7, 8, 9],
                'walk': [11, 12, 13, 14, 15, 16]
            }
        });

        this.dir = "right";
        this.alive = true;
        this.death_timer = 0;

        this.sprite.setAnimation('walk');
    }
    tick(scene) {
        let bgm = gamekit.assets.sound('stage1-bgm');
        let mspeed = 4;

        this.sprite.visible = this.alive;

        if (this.alive) {
            if (!bgm.isPlaying()) {
                bgm.play();
            }
        
            let ctrl = gamekit.controls;

            if (this.dir == "right") {
                this.sprite.x_scale = 2;
            } else {
                this.sprite.x_scale = -2;
            }

            this.sprite.setAnimation('stand');
            if (ctrl.check("a")) {
                this.dir = "left";
                this.x -= mspeed;
                this.sprite.setAnimation('walk');
            }
            if (ctrl.check("d")) {
                this.dir = "right";
                this.x += mspeed;
                this.sprite.setAnimation('walk');
            }        
            /*if (ctrl.check("w") && this.dir != 1) {
                this.dir = 3;
            }
            if (ctrl.check("s") && this.dir != 3) {
                this.dir = 1;
            }*/                
    
            // if we are outside the play space: die
            if ((this.x < 0) || (this.y < 0) || (this.x >= 1920/2) || (this.y >= 1080/2)) {
                this.die(scene);
            }
        } else {
            this.death_timer++;
            if (this.death_timer>120) {
                let gos = new GameOverScene();
                //gos.updateScore(this.eaten);
                scene.switchScene(gos);
            }
        }
    }
    /*emitDebris(scene) {
        let directions = [
            [-1, -1],
            [-1, 0],
            [-1, 1],
            [0, -1],
            [0, 1], 
            [1, -1],
            [1, 0],
            [1, 1],                       
        ]
        for (let i=0; i<directions.length; i++) {
            let d = scene.add(new Debris());
            d.x = this.x;
            d.y = this.y;
            d.xspeed = directions[i][0];
            d.yspeed = directions[i][1];
        }
        

    }*/
    die(scene) {
        //this.emitDebris(scene);
        this.alive = false;

        gamekit.assets.sound('stage1-bgm').stop();
        gamekit.assets.sound('egg-death').play();
    }
}

class Block extends Entity {
    constructor() {
        super();
        this.sprite = new SheetSprite({
            image: gamekit.assets.image('block').get(),
            columns: 1,
            rows: 1,
            scale: 1
        });
    }
    tick(scene) {
        // TO-DO: Collision! :D
    }
}

export default class GameScene extends Scene {
    constructor() {
        super();
        //this.add(new Background());

        let p = this.add(new Player());
        p.x = 64;
        p.y = 320;

        for (let i=0; i<=(1920 / 32); i++) {
            let b = this.add(new Block());
            b.x = 32*i;
            b.y = 390;
        }
    }
}