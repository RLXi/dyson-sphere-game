// Bullets, does only one type of bullets.
Dyson.Bullet = function(game,asset,type,dmg) {
    this.game = game;
    this.key = asset;
    this.bulletType = type;
    this.baseDamage = dmg;
    this.bullet = null;
};

//Set Game function prototype
Dyson.Bullet.prototype = {
    create: function() {
        this.bullet = this.game.add.sprite(0,0,this.key);
        this.game.physics.arcade.enable(this.bullet);

        //animation for the green pellet
        this.bullet.animations.add('spin', [0,1,2],12,true);
        this.bullet.animations.play('spin');

        this.bullet.anchor.set(0.5);

        //Kill the bullet when it leaves the game boundaries
        this.bullet.checkWorldBounds = true;
        this.bullet.outOfBoundsKill = true;
        this.bullet.exists = false;

        this.bullet.tracking = false;
        this.bullet.scaleSpeed = 0;
        this.bullet.offsetX = 20;
        return this;
    },
    update: function() {
        if (this.bullet.tracking) {
            this.bullet.rotation = Math.atan2(this.bullet.body.velocity.y, this.bullet.body.velocity.x);
        }

        if (this.bullet.scaleSpeed > 0) {
            this.bullet.scale.x += this.bullet.scaleSpeed;
            this.bullet.scale.y += this.bullet.scaleSpeed;
        }
    },
    //Fire function
    fire: function(x, y, angle, speed, gx, gy) {
        //Changes how the bullets behave
        //Adds gravity
        gx = gx || 0;
        gy = gy || 0;

        this.bullet.reset(x, y);
        this.bullet.scale.set(1);

        //Bullets fly from angle and speed determined by the weapon
        this.game.physics.arcade.velocityFromAngle(angle, speed, this.bullet.body.velocity);

        //needed to correct [REDACTED] angle
        this.bullet.angle = angle+90;

        this.bullet.body.gravity.setTo(gx, gy);
        this.update();
    }
};