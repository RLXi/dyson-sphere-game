// Story mode, currently only displays an apology for not being ready and summarizes the story
// Pretty much the same as the index page, actually.
Dyson.Story = function(game) {
    this.game = game;
};

Dyson.Story.prototype = {
    create: function() {
        var style = {font:"48px verdana",fill:"#fff"};
        var text = this.game.add.text(10,10,'Sorry',style);
        this.game.add.text(10,68,'Under development',style);
        this.game.add.text(10,138,'Story in a nutshell',{font:"32px verdana",fill:"#fff"});
        this.game.add.text(10,186,'In a distant future, humanity has finally elevated from Type 1 civilization to Type 2 by building a super\nstructure known as the Dyson Sphere. With it, humans are able to harness the entire energy output of\nthe Sun. But this development has not gone unnoticed. Other hostile alien races sees this new structure\nas a threat and are determined to destroy it, no matter what. As a countermeasure, You have been selected\nto defend the Sphere from the attackers. Fortunately, they are not very bright and their only method of\nattacking is ramming their ships towards the Sphere.\nUnfortunately, there are seemingly infinite number of them.',{font:"14px verdana",fill:"#fff"});
        this.game.add.text(10,400,'Press ENTER/Click/Tap to return',{font:"20px verdana",fill:"#fff"});

        this.return = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER)
    },
    update: function() {
        //Wait for user input
        if(this.return.justDown || this.game.input.activePointer.isDown)
            this.game.state.start('Menu');
    }
};