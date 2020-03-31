// Shield object around the base.
Dyson.Shield = function(game,asset,power,MAXPOWER,coolingTime) {
    this.game = game;
    this.key = asset || 'shield';
    this.sprite = null;
    this.shieldPower = power || 1;
    this.MAX_SHIELDPOWER = MAXPOWER || 1;
    this.coolingTime = coolingTime || 3000;
    this.active = false;
};

//Set Shield function prototype
Dyson.Shield.prototype = {
    create: function() {
        this.sprite = this.game.add.sprite(1000,1000,this.key);
        this.game.physics.arcade.enable(this.sprite);
        this.sprite.anchor.setTo(0.5);
        this.sprite.scale.setTo(0.25);
        this.sprite.kill();

        this.coolingPeriod = 0;

        //Shield
        this.shieldMeter = this.game.add.sprite(50,115,'shieldMeter');
        this.shieldMeter.rotation = Math.PI;
        this.shieldMeter.fixedToCamera = true;
        //this.shieldMeter.key.blendColorDodge = true;

        //change thee shield meter tint to blue
        this.shieldMeter.tint = 0x0000ff;

        //this.activateShieldBtn = this.game.add.button(695,695,"shieldBtn",this.shieldActive,this);
        //this.activateShieldBtn.fixedToCamera = true;

        this.shieldStyle = {font:"10px verdana", fill:"#fff"};
        this.shieldLbl = this.game.add.text(25,120,"Shield",this.shieldStyle);
        this.shieldLbl.fixedToCamera = true;

        this.shieldBtn = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },
    update: function() {
        this.sprite.angle += 0.5;

        //Shielding
        if(this.shieldBtn.isDown && this.shieldPower >= 0 && this.game.time.time > this.coolingPeriod){
            //this.shieldMeter.tint = 0x00ff00;
            this.shieldActive();
        }
        //Check whether shield is currently being active or the shield power is empty
        if(!this.active || this.shieldPower <= 0) {
            if(this.shieldPower <= 0) {
                this.rechargeShield();
                this.shieldPower = 0;
            }
            this.sprite.kill();

            //recharge the shield slowly when not in use
            if(this.shieldPower < this.MAX_SHIELDPOWER) {
                if (this.game.time.time > this.coolingPeriod) this.shieldMeter.tint = 0x0000ff;
                this.shieldPower += 0.0025;
            }
            this.shieldMeter.scale.setTo(1,this.shieldPower);
        }
        this.active = false;
    },
    shieldActive: function() {
        //Revive the shield when player activates it
        if (this.game.time.time < this.coolingPeriod) return;
        this.sprite.revive();
        this.shieldPower -= 0.01;
        this.shieldMeter.scale.setTo(1,this.shieldPower);
        this.active = true;
    },
    //Adds cooldown when the shield energy is reduce to zero
    rechargeShield: function() {
        this.coolingPeriod = this.game.time.time + this.coolingTime;
        //Indicate about the cooldown by changing the meter tint to red
        this.shieldMeter.tint = 0xff0000;
    }
};