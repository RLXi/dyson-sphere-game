// Credit page. Shows who's responsible for this atrocity
// TODO Missing some vital credits
Dyson.Credits = function(game) {
    this.game = game;
};

//Set Game function prototype
Dyson.Credits.prototype = {
    create: function() {
        this.game.world.setBounds(0,0,800,800);

        this.game.add.image(0,0,'background');
        this.style = {font:"70px courier",fill:'#fff'};
        this.style2 = {font:"20px courier",fill:'#fff'};
        this.game.add.text(10,10,"Game made for GameDev course",this.style2);

        var musicTxt = "- MUSIC -\n" +
            "Menu: [REDACTED]" +
            "Endless: [REDACTED]";
        var assetTxt = "- ASSETS -\n" +
            "Enemy ships: \n" +
            "Bullets: \n" +
            "Base: \n" +
            "Other: ";
        var codeTxt = "- PROGRAMMING -\n" +
            "";
        var storyTxt = "- STORY -\n" +
            "";
        var sfxTxt = "- SFX -\n" +
            "";
        var softTxt = "- SOFTWARE -\n" +
            "SFXR by DrPepper\n" +
            "Adobe Photoshop\n" +
            "JetBrains PHPStorm\n" +
            "Notepad++\n";
        this.game.add.text(10,100,codeTxt,this.style2);
        this.game.add.text(10,200,storyTxt,this.style2);
        this.game.add.text(10,300,assetTxt,this.style2);
        this.game.add.text(10,450,musicTxt,this.style2);
        this.game.add.text(10,550,sfxTxt,this.style2);
        this.game.add.text(300,100,softTxt,this.style2);

        this.instructions = this.game.add.text(this.game.world.centerX,this.game.world.centerY+300,"Press ENTER/Click/Tap to return",this.style2);
        this.instructions.anchor.setTo(0.5);

        this.return = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    },
    update: function() {
        if(this.return.justDown || this.game.input.activePointer.isDown)
            this.game.state.start('Menu');
    }
};
