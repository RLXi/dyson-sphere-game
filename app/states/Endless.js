// Endless game mode, pretty much the only way to play the game right now.
// Works pretty well but there's always something to improve
Dyson.Endless = function(game) {
    this.game = game;
    this.ENEMYDELAY = 500;
    this.enemyDelayTimer = 0;
    this.waveCount = 0;
    this.enemyCount = 0;
    this.enemiesDestroyed = 0;
    this.enemiesObliterated = 0;
};

//Set Game function prototype
Dyson.Endless.prototype = {
    create: function() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.weaponInfo = this.game.cache.getJSON("weaponsJSON");
        this.enemyInfo = this.game.cache.getJSON("enemiesJSON");

        this.waveCount = 0;
        this.enemyCount = 0;
        this.enemiesDestroyed = 0;
        this.enemiesObliterated = 0;

        Dyson.survived = 0;
        Dyson.enemiesDestroyed = 0;
        Dyson.enemiesObliterated = 0;

        this.bg = this.game.add.sprite(0,0,'background');

        this.game.world.setBounds(0,0,2000,2000);

        //Dyson Sphere
        this.base = new Dyson.Base(this.game);
        this.base.create();
        this.base.baseHitpoints = 2;

        //Enemies
        this.enemies = this.game.add.group();
        this.enemies.enableBody = true;

        //Radar
        //this.radarEntities = this.game.add.group();
        //this.radarEntities.fixedToCamera = true;
        //this.radarEntities.enableBody = true;

        //var v = this.game.add.graphics(0,0);
        //v.beginFill("0x000000",1);
        //v.drawRect(695,695,100,100);
        //v.fixedToCamera = true;

        //Player
        this.player = new Dyson.Player(this.game,0,0,0);
        this.player.create();

        this.ammo = this.game.add.group();
        this.ammo.enableBody = true;
        for(var i = 0;i<this.player.weapons.weapons[1].length;i++) this.ammo.add(this.player.weapons.weapons[1][i].bullet);
        for(var i = 0;i<this.player.weapons.weapons[0].length;i++) this.ammo.add(this.player.weapons.weapons[0][i].bullet);

        //Emitter
        this.sparkEmitter = this.game.add.emitter(0,0,3);

        this.hudStyle = {font:'20px verdana',fill:'#fff'};
        this.hudTxt = this.game.add.text(10,770,'BASE HEALTH: '+this.base.baseHitpoints,this.hudStyle);
        this.hudTxt.fixedToCamera = true;

        this.baseShield = new Dyson.Shield(this.game,'shield',1,1,3000);
        this.baseShield.create();

        //SFX
        this.hit = this.game.add.audio('hit');
        this.hit.volume = 0.5;

        //Music
        this.mu = this.game.add.audio('endlessMusic');
        this.mu.loop = true;
        this.mu.volume = 0.5;
        this.mu.play();

        this.explo = this.game.add.audio('blosion');
        this.explo.volume = 0.5;

        //Wave count label
        this.waveLbl = this.game.add.text(350,100,"Wave "+this.waveCount,this.hudStyle);
        this.waveLbl.fixedToCamera = true;

        //Enemy count
        this.enemyLbl = this.game.add.text(350,125,"Enemies left "+this.enemyCount,this.hudStyle);
        this.enemyLbl.fixedToCamera = true;

        //Focus camera on the base
        this.game.camera.focusOn(this.base.sprite);

        //Player "starting position"
        this.locationAngle = 0;

        //Custom cursor
        this.altCursor = this.game.add.sprite(0,0,'crosshair');
        this.altCursor.anchor.setTo(0.5);
        this.altCursor.scale.setTo(0.1);

        //Quit game input
        this.quit = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);

        //Spawn new wave after few seconds
        this.game.time.events.add(Phaser.Timer.SECOND * 2,this.newWave,this);
    },
    update: function() {
        //Quit the game if the user presses ESC
        if(this.quit.justDown){
            this.mu.stop();
            this.game.state.start("Menu");
        }

        //Few convenient variables, not really necessary though
        var game = this.game;
        var base = this.base;

        //Check for collisions
        this.game.physics.arcade.overlap(this.enemies, this.base.sprite, this.baseHit, null, this);
        this.game.physics.arcade.overlap(this.enemies, this.baseShield.sprite, this.shieldHit, null, this);
        this.game.physics.arcade.overlap(this.ammo, this.enemies, this.enemyHit, null, this);
        //this.game.physics.arcade.overlap(this.ammo2, this.enemies, this.enemyHit, null, this);

        //Alternative camera movement with active pointer
        this.game.camera.x = this.game.input.activePointer.x*1.5;
        this.game.camera.y = this.game.input.activePointer.y*1.5;

        //Update sprites
        this.base.update();
        this.baseShield.update();
        this.player.update();

        //Custom cursor position on the canvas
        this.altCursor.x = this.game.input.activePointer.x+this.game.camera.x;
        this.altCursor.y = this.game.input.activePointer.y+this.game.camera.y;

        //Position of the cursor also moves the player
        this.player.locationAngle = this.game.physics.arcade.angleBetween(base.sprite,this.altCursor);

        //Move each enemy towards the base
        this.enemies.forEach(function(e) {
            this.game.physics.arcade.moveToObject(e,base.sprite, e.movementSpeed);
        },this);

        //Radar, doesn't work
        //this.radarEntities.forEach(function(e) {
        //    this.game.physics.arcade.moveToObject(e,base.sprite,5);
        //},this);

        //Spawn new wave after there are none left
        //if(this.enemyCount === 0) this.newWave();
    },
    //Bullets hit enemies
    enemyHit: function(bullet,enemy) {
        //Play sound
        this.hit.play();

        //Start the emitter
        this.sparkEmitter.removeAll();
        this.sparkEmitter.setAlpha(1,0,3000);
        this.sparkEmitter.setScale(0.8, 0, 0.8, 0, 3000);
        this.sparkEmitter.x = enemy.x;
        this.sparkEmitter.y = enemy.y;
        this.sparkEmitter.makeParticles('particle');
        //this.sparkEmitter.start(false,500,50,10,10);
        this.sparkEmitter.start(true,1000,null,100);

        //Check which weapon hit the enemy and do damage
        for(var i = 0; i < this.weaponInfo.weapons.length; i++) {
            if(bullet.key == this.weaponInfo.weapons[i].key) {
                enemy.health -= this.weaponInfo.weapons[i].damage;
                break;
            }
        }

        //kill the enemy, if its health is reduced to zero or below
        if(enemy.health <= 0) {
            //enemy.kill();
            enemy.destroy();
            this.explo.play();
            console.log("Enemy destroyed");

            //reduce enemy count
            this.enemyCount--;
            this.enemyLbl.text = "Enemies left "+this.enemyCount;

            //update score
            this.enemiesDestroyed++;
            Dyson.enemiesDestroyed = this.enemiesDestroyed;
        }
        bullet.kill();

        //If enemy count is zero, spawn new wave of enemies
        if(this.enemyCount === 0) this.newWave();
    },
    //Enemies hit the base, almost identical with other collision checks
    baseHit: function(base,enemy) {
        this.sparkEmitter.removeAll();
        this.sparkEmitter.x = enemy.x;
        this.sparkEmitter.y = enemy.y;
        this.sparkEmitter.makeParticles('particle');
        this.sparkEmitter.start(false,100,50,10,10);
        this.base.baseHitpoints--;

        //emit some nice explosions and quit the game when the base's health is reduced to zero
        if(this.base.baseHitpoints <= 0) {
            this.sparkEmitter.setScale(2, 0, 2, 0, 3000);
            this.sparkEmitter.x = base.x;
            this.sparkEmitter.y = base.y;
            this.sparkEmitter.makeParticles('particle');
            this.sparkEmitter.start(false,3000,5);
            this.game.time.events.add(800,this.shutdown, this);
        }
        this.hudTxt.text = "BASE HEALTH: "+this.base.baseHitpoints;
        //enemy.kill();
        enemy.destroy();
        this.explo.play();
        console.log("Base took hit!");

        //There's probably bit too much repetion here
        //TODO do something about it
        this.enemyCount--;
        this.enemyLbl.text = "Enemies left "+this.enemyCount;
        if(this.enemyCount === 0) this.newWave();
    },
    //Enemies hit the shield, again almost identical with the others
    shieldHit: function(shield, enemy) {
        this.sparkEmitter.removeAll();
        this.sparkEmitter.x = enemy.x;
        this.sparkEmitter.y = enemy.y;
        this.sparkEmitter.makeParticles('particle');
        this.sparkEmitter.start(false,100,50,10,10);
        console.log("Shield got hit!");
        //enemy.kill();
        enemy.destroy();
        //this.spawnEnemy(enemy);
        this.explo.play();
        this.baseShield.shieldPower -= 0.2;
        this.enemyCount--;
        this.enemiesObliterated++;
        this.enemyLbl.text = "Enemies left "+this.enemyCount;
        Dyson.enemiesObliterated = this.enemiesObliterated;
        if(this.enemyCount === 0) this.newWave();
    },
    //Spawn enemy to a new location outside the boundaries
    //Not currently in use
    //TODO find use for spawnEnemy() or remove it
    spawnEnemy: function(e) {
        var direction = Math.floor(Math.random()*4+1);

        //Up
        if(direction === 1) {
            //console.log("Up");
            e.y = -50;
            e.x = Math.floor(Math.random()*2000+1);
        }
        //Right
        else if(direction === 2) {
            //console.log("Right");
            e.x = 2050;
            e.y = Math.floor(Math.random()*2000+1);
        }
        //Down
        else if(direction === 3) {
            //console.log("Down");
            e.y = 2050;
            e.x = Math.floor(Math.random()*2000+1);
        }
        //Left
        else {
            //console.log("Left");
            e.x = -50;
            e.y = Math.floor(Math.random()*2000+1);
        }
        //Rotate the enemy to point towards the base
        e.rotation = this.game.physics.arcade.angleBetween(e,this.base.sprite.body)+Phaser.Math.degToRad(90);
        e.revive();

        //Replenish enemy health
        if(e.enemyType == 1) e.health = 1;
        else if(e.enemyType == 2) e.health = 5;
        else e.health = 10;
    },
    //Spawn new enemies, put them on random locations outside the game bounds and make them face the base
    spawnNewEnemy: function() {
        var direction = Math.floor(Math.random()*4+1);
        var x = 0;
        var y = 0;
        var enemyHitpoints = 0;
        var enemyType = Math.floor(Math.random()*3+1);
        var newEnemy = null;

        //Up
        if(direction === 1) {
            y = -50;
            x = Math.floor(Math.random()*2000+1);
        }
        //Right
        else if(direction === 2) {
            x = 2050;
            y = Math.floor(Math.random()*2000+1);
        }
        //Down
        else if(direction === 3) {
            y = 2050;
            x = Math.floor(Math.random()*2000+1);
        }
        //Left
        else {
            x = -50;
            y = Math.floor(Math.random()*2000+1);
        }

        for(var i = 0; i < this.enemyInfo.enemies.length; i++){
            if(enemyType == this.enemyInfo.enemies[i].type){
                newEnemy = this.enemies.create(x,y,this.enemyInfo.enemies[i].name);
                newEnemy.enemyType = this.enemyInfo.enemies[i].type;
                newEnemy.health = this.enemyInfo.enemies[i].health;
                newEnemy.movementSpeed = this.enemyInfo.enemies[i].speed;
                break;
            }
        }

        newEnemy.enableBody = true;
        newEnemy.body.setSize(newEnemy.width/1.5,newEnemy.height/1.5);
        newEnemy.anchor.setTo(0.5);
        //Rotate the new enemy to point towards the base
        newEnemy.rotation = this.game.physics.arcade.angleBetween(newEnemy.body,this.base.sprite.body)+Phaser.Math.degToRad(90);

        //Radar entity experiment, not working
        //TODO make it work
        //var v = this.game.add.graphics(0,0);
        //v.beginFill("0x00ff00",1);
        //v.drawRect(rx,ry,5,5);
        //v.boundsPadding = 0;
        //var sprt = this.game.add.sprite(0,0,null,null,this.radarEntities);
        //sprt.addChild(v);
        this.enemyCount++;
        this.enemyLbl.text = "Enemies left "+this.enemyCount;
    },
    //Spawn new wave of enemies
    newWave: function() {
        this.waveCount++;
        this.spawnNewEnemy();
        this.game.time.events.repeat(Phaser.Timer.SECOND*(Math.floor(Math.random()*5)+1-(Math.ceil(this.waveCount*0.75))),Math.ceil(this.waveCount*1.25),this.spawnNewEnemy,this);
        //for(var i = 0; i< this.waveCount*2;i++){
        //    this.spawnNewEnemy();
        //}
        this.waveLbl.text = "Wave "+this.waveCount;
        Dyson.survived = this.waveCount-1;
    },
    //Quit the game
    shutdown: function() {
        this.mu.stop();
        this.game.state.start('GameOver');
    },
    //For debug
    render: function() {
        //this.game.debug.text("Time until event: " + this.game.time.events.duration, 64, 64);
        //var game = this.game;
        //this.game.debug.body(this.base.sprite);
        //this.game.debug.body(this.player.shield);
        //this.enemies.forEach(function(e) {
        //    game.debug.body(e);
        //});
        //this.game.debug.spriteInfo(this.player.sprite,32,32);
        //this.game.debug.cameraInfo(this.game.camera,32,32);
    }
};
