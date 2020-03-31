// Create Game function
Dyson.Base = function(game) {
    this.game = game;
    this.sprite = null;
    this.baseHitpoints = 0;
    this.baseHiBoxes = null;
};

//Set Game function prototype
Dyson.Base.prototype = {
    create: function() {
        //Dyson Sphere
        this.sprite = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'dyson');
        //this.base = this.game.add.sprite(300,500,'dyson');
        this.game.physics.arcade.enable(this.sprite);
        this.sprite.body.setSize(500,500,0,0);
        //this.sprite.body.setSize(0,0,0,0);
        //this.game.physics.p2.enable(this.sprite,false);
        this.sprite.anchor.setTo(0.5,0.5);
        this.sprite.scale.setTo(0.25,0.25);

        this.sprite.health = 10;

        //Additional hitboxes, arcade physics don't allow other than rectangular hitboxes
        // also not in use right now
        //TODO consider using p2 physics for better hitboxes
        //this.baseHitBoxes = this.game.add.group();
        //this.baseHitBoxes.enableBody = true;

        //this.sprite.addChild(this.baseHitBoxes);

        //var hitbox1 = this.baseHitBoxes.create(0,0,null);
        //hitbox1.body.setSize(250,50,-125,-235);
        //var hitbox2 = this.baseHitBoxes.create(0,0,null);
        //hitbox2.body.setSize(250,50,-125,185);
        //var hitbox3 = this.baseHitBoxes.create(0,0,null);
        //hitbox3.body.setSize(50,250,-235,-135);
        //var hitbox4 = this.baseHitBoxes.create(0,0,null);
        //hitbox4.body.setSize(50,250,185,-135);
    },
    update: function() {
        //Make the base spin slightly
        this.sprite.angle += 0.05;
    }
};