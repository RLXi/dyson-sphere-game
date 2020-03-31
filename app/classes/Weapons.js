Dyson.Weapons = function(game) {
    this.game = game;
    this.weapons = [];
    this.currentWeapon = 0;
};
Dyson.Weapons.prototype = {
    create: function() {
        this.blaster = new Dyson.Blaster(this.game, "Blaster", 3);
        this.tripleshot = new Dyson.Tripleshot(this.game, "Tripleshot", 1);
        this.weapons.push(this.blaster.create());
        this.weapons.push(this.tripleshot.create());
    },
    fire: function(weapon,sprite) {
        switch (weapon) {
            case 0:
                this.blaster.fireWeapon(sprite);
                break;
            case 1:
                this.tripleshot.fireWeapon(sprite);
                break;
            default:
                this.blaster.fireWeapon(sprite);
        }
    }
};