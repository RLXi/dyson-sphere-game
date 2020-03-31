//This file loads all the game assets.

// create Game function in Dyson. Game is a state.
Dyson.Preload = function (game) {
    //possible state variables
    this.game = game;
};

//set Game function prototype
Dyson.Preload.prototype = {
    //preload assets etc.
    preload: function () {
        //Draw progress bar for loading screen
        this.pro = this.game.add.graphics(0,0);
        this.pro.lineStyle(2,0xFFFFFF);
        this.pro.drawRect(this.game.world.centerX-116, this.game.world.centerY-30,232,60);
        this.preloadBar = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY,'progressBar');
        this.preloadBar.anchor.setTo(0.5);
        this.load.setPreloadSprite(this.preloadBar);

        //Images files (sprites, spritesheets, images etc.)
        //Menu buttons
        this.load.spritesheet('creditsBtn','assets/img/ui/creditsBtn.png',220,50,2);
        this.load.spritesheet('storyBtn','assets/img/ui/storyBtn.png',169,65,2);
        this.load.spritesheet('endlessBtn','assets/img/ui/endlessBtn.png',236,58,2);
        this.load.spritesheet('musicBtn','assets/img/ui/musicBtn.png',158,48,2);
        this.load.image('crosshair','assets/img/ui/crosshair.png');
        this.load.image('cursor','assets/img/ui/cursor.png');

        //Shield sprite
        this.load.image('shield','assets/img/base/shield.png');
        this.load.image('shieldMeter','assets/img/ui/shieldMeterW.png');

        //Player sprite
        this.load.image('defender','assets/img/player/defender.png');
        this.load.image('cannon','assets/img/player/cannon.png');
        this.load.image('wheel','assets/img/player/wheel.png');

        //Base sprite
        this.load.image('dyson','assets/img/base/starbase-tex.png');

        //Backgound images
        this.load.image('background','assets/img/background/starfield.png');
        //this.load.image('shieldBtn','assets/img/ui/shieldBtn.png');

        //Enemies
        this.load.image('bat','assets/img/enemies/Bat.png');
        //this.load.image('batmk2','assets/img/enemies/BatMk2.png');
        //this.load.image('batmk3','assets/img/enemies/BatMk3.png');
        this.load.image('beetle','assets/img/enemies/Beetle.png');
        //this.load.image('beetlemk2','assets/img/enemies/BeetleMk2.png');
        //this.load.image('beetlemk3','assets/img/enemies/BeetleMk3.png');
        this.load.image('omega','assets/img/enemies/Omega.png');

        //Ordnance
        this.load.spritesheet('basicbullet','assets/img/bullets/bullet.png',16,19,3);
        this.load.image('blaster','assets/img/bullets/bullet1.png');

        //Particle effects
        //this.load.image('particle', 'assets/img/particles/particle.png');
        this.load.image('particle', 'assets/img/particles/explosion1.png');

        //Sound files (music, sfx)
        this.load.audio('menuMusic', 'assets/music/menu_music.mp3');
        this.load.audio('endlessMusic', 'assets/music/endless_music.mp3');
        this.load.audio('fanfare', 'assets/music/fanfare.mp3');
        this.load.audio('whiz', 'assets/sfx/bullet_whizzing.wav');
        this.load.audio('explosion', 'assets/sfx/charge.wav');
        this.load.audio('blosion', 'assets/sfx/xplosion.wav');
        this.load.audio('select', 'assets/sfx/select.wav');
        this.load.audio('selecttrue', 'assets/sfx/selecttrue.wav');
        this.load.audio('lazer', 'assets/sfx/lazer.wav');
        this.load.audio('hit', 'assets/sfx/hit.wav');

        //JSON
        this.load.json('enemiesJSON','app/json/enemies.json');
        this.load.json('weaponsJSON','app/json/weapons.json');
        //this.load.json('dialogJSON','app/json/dialog.json');
    },
    create: function() {
        //Start the menu
        //this.game.add.plugin(Phaser.Plugin.Debug);
        this.game.state.start('Menu');
    }
};
