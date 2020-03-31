// Player object
// handels player firing and position calculations
Dyson.Player = function(game, x, y, locationAngle) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.locationAngle = locationAngle;
    this.sprite = null;
    this.origo = 1000;
    this.radius = 110;
};

//Set Game function prototype
Dyson.Player.prototype = {
    create: function() {
        this.sprite = this.game.add.sprite(this.x,this.y+250,'cannon');

        this.sprite.anchor.setTo(0.5);
        this.sprite.scale.setTo(0.75,0.75);
        this.sprite.angle = 90;

        this.game.physics.arcade.enable(this.sprite);

        this.weapons = new Dyson.Weapons(this.game);
        this.weapons.create();

        //Autofire
        this.autoFire = false;

        //Input
        this.shoot = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.afMode = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    },
    update: function() {
        //Fire weapons
        if((this.game.input.activePointer.isDown || this.shoot.isDown) && !this.autoFire) {
            this.weapons.fire(1,this.sprite);
        }
        //Enable Autofire mode
        if(this.afMode.justDown)
            this.autoFire = !this.autoFire;
        //Check if Autofire is enabled
        if(this.autoFire)
            this.weapons.fire(0,this.sprite);

        //Set player sprite's rotation so that the weapons point outwards
        this.sprite.rotation = this.locationAngle+Math.PI/2;

        //Determine player's location around the base
        this.sprite.x = this.radius*Math.cos(this.locationAngle)+this.origo;
        this.sprite.y = this.radius*Math.sin(this.locationAngle)+this.origo;
    }
};