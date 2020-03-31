// Create Enemy function
Dyson.Enemy = function(game,x,y,asset,type) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.sprite = asset;
    this.enemyType = type;
};

//Set Enemy function prototype
Dyson.Enemy.prototype = {
    create: function() {
        this.cone = this.game.add.sprite(this.x,this.y-20,'cone');
        this.cone.anchor.setTo(0.5);
        this.cone.angle = 180;
        this.cone.animations.add('thrust',[0,1,2,3],12,true);
        this.cone.animations.play('thrust');

        this.raider = this.game.add.sprite(this.x,this.y,this.sprite);
        this.raider.anchor.setTo(0.5);
        this.raider.angle = 180;

        return this;
    },
    update: function() {
        //this.game.physics.arcade.moveToObject(this.sprite,this.base,100);
        //this.raider.y += 2;
        //this.cone.y += 2;

        //if(this.raider.y > 600 || this.cone.y > 600) {
        //    this.raider.y = 0;
        //    this.cone.y = this.raider.y-20;
        //}

        //this.game.physics.arcade.moveToObject(this.raider,target, speed);
    },
    move: function(target, speed) {
        this.game.physics.arcade.moveToObject(this.raider,target, speed);
    }
};