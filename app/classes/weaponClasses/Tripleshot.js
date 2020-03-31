Dyson.Tripleshot = function(game, name, dmg) {
    this.game = game;
    this.weaponName = name || "Tripleshot";
    this.baseDamage = dmg || 1;
};
Dyson.Tripleshot.prototype = {
    create: function() {
        this.bulletGroup = [];
        this.nextFire = 0;
        this.bulletSpeed = 600;
        this.fireRate = 100;
        this.lzr = this.game.add.audio('lazer');
        this.lzr.volume = 0.25;

        for (var i = 0; i < 64; i++) {
            var a = new Dyson.Bullet(this.game, 'basicbullet', 'basic', this.baseDamage);
            this.bulletGroup.push(a.create());
        }

        return this.bulletGroup;
    },
    fireWeapon: function(source) {
        if (this.game.time.time < this.nextFire) return;
        //var x = source.x;
        //var y = source.y;

        var angle = source.angle - 90;
        var x = 130*Math.cos(Phaser.Math.degToRad(angle))+1000;
        var y = 130*Math.sin(Phaser.Math.degToRad(angle))+1000;

        this.bulletGroup[0].fire(x, y, angle, this.bulletSpeed, 0, 0);
        this.bulletGroup.push(this.bulletGroup.shift());
        this.bulletGroup[0].fire(x, y, angle + 15, this.bulletSpeed, 0, 0);
        this.bulletGroup.push(this.bulletGroup.shift());
        this.bulletGroup[0].fire(x, y, angle - 15, this.bulletSpeed, 0, 0);
        this.bulletGroup.push(this.bulletGroup.shift());

        this.nextFire = this.game.time.time + this.fireRate;
        this.lzr.play();
    }
};