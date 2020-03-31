//Currently not in use
Dyson.CollisionManager = function(game) {
    this.game = game;
};

Dyson.CollisionManager.prototype = {
    create: function () {
        this.enemyInfo = this.game.cache.JSON('enemiesJSON');
        this.weaponInfo = this.game.cache.JSON('weaponsJSON');
    },
    update: function() {
        //Check for collisions
        this.game.physics.arcade.overlap(this.enemies, this.base.sprite, this.baseHit, null, this);
        this.game.physics.arcade.overlap(this.enemies, this.baseShield.sprite, this.shieldHit, null, this);
        this.game.physics.arcade.overlap(this.ammo, this.enemies, this.enemyHit, null, this);
        //this.game.physics.arcade.overlap(this.ammo2, this.enemies, this.enemyHit, null, this);
    },
    //Bullets hit enemies
    enemyHit: function(bullet,enemy) {
        this.hit.play();
        this.sparkEmitter.removeAll();
        this.sparkEmitter.x = enemy.x;
        this.sparkEmitter.y = enemy.y;
        this.sparkEmitter.makeParticles('particle');
        this.sparkEmitter.start(false,100,50,10,10);

        for(var i = 0; i < this.weaponInfo.weapons.length; i++) {
            if(bullet.key == this.weaponInfo.weapons[i].key) {
                enemy.health -= this.weaponInfo.weapons[i].damage;
                break;
            }
        }

        if(enemy.health <= 0) {
            //enemy.kill();
            enemy.destroy();
            this.explo.play();
            console.log("Enemy destroyed");
            this.enemiesDestroyed++;
            this.enemyCount--;
            this.enemyLbl.text = "Enemies left "+this.enemyCount;
            Dyson.enemiesDestroyed = this.enemiesDestroyed;
        }
        bullet.kill();
        if(this.enemyCount === 0) this.newWave();
    },
    //Enemies hit the base
    baseHit: function(base,enemy) {
        this.sparkEmitter.removeAll();
        this.sparkEmitter.x = enemy.x;
        this.sparkEmitter.y = enemy.y;
        this.sparkEmitter.makeParticles('particle');
        this.sparkEmitter.start(false,100,50,10,10);
        this.base.baseHitpoints--;
        if(this.base.baseHitpoints === 0) {
            this.mu.stop();
            this.shutdown();
            this.game.state.start('GameOver');
        }
        this.hudTxt.text = "BASE HEALTH: "+this.base.baseHitpoints;
        //enemy.kill();
        enemy.destroy();
        //this.spawnEnemy(enemy);
        this.explo.play();
        console.log("Base took hit!");
        this.enemyCount--;
        if(this.enemyCount === 0) this.newWave();
    },
    //Enemies hit the shield
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
};