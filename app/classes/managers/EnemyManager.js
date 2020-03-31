//Currently not in use
Dyson.EnemyManager = function(game, base) {
    this.game = game;
    this.base = base || null;
    this.enemies = null;
};
Dyson.EnemyManager.prototype = {
    create: function() {
        this.enemyInfo = this.game.cache.JSON('enemiesJSON');
        this.enemies = this.game.add.group();
        this.enemies.enableBody = true;
    },
    update: function() {

    },
    //Spawn enemy to a new location outside the boundaries
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
    //Spawn new enemy
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
                //newEnemy.hitpoints = this.enemyInfo.enemies[i].health;
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
        //var v = this.game.add.graphics(0,0);
        //v.beginFill("0x00ff00",1);
        //v.drawRect(rx,ry,5,5);
        //v.boundsPadding = 0;
        //var sprt = this.game.add.sprite(0,0,null,null,this.radarEntities);
        //sprt.addChild(v);
        this.enemyCount++;
        this.enemyLbl.text = "Enemies left "+this.enemyCount;
    },
};