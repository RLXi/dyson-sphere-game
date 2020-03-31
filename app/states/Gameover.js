// Gameover screen. Starts when the base's integrity is reduced to zero or below
// Displays "Game Over" text and player's score and high score
Dyson.Gameover = function(game) {
    this.game = game;
};

//Set Game function prototype
Dyson.Gameover.prototype = {
    create: function() {
        this.game.world.setBounds(0,0,800,800);

        this.game.add.image(0,0,'background');
        this.style = {font:"70px courier",fill:'#fff',align:'center'};
        this.style2 = {font:"20px courier",fill:'#fff'};
        this.gameoverTxt = this.game.add.text(this.game.world.centerX,300,"GAME\nOVER",this.style);
        this.gameoverTxt.anchor.setTo(0.5);

        //Display player's score
        this.game.add.text(50,400,"You survived "+Dyson.survived+" waves",this.style2);
        this.game.add.text(50,440,"You destroyed "+Dyson.enemiesDestroyed+" enemies",this.style2);
        this.game.add.text(50,480,"You obliterated "+Dyson.enemiesObliterated+" enemies",this.style2);

        this.instructions = this.game.add.text(this.game.world.centerX,this.game.world.centerY+200,"Press ENTER/Click/Tap to return to menu",this.style2);
        this.instructions.anchor.setTo(0.5);

        this.fare = this.game.add.audio('fanfare');
        this.fare.play();

        var highWave, highDestroy, highOb;

        if (!this.supportsLocalStorage()) {
            // not supporting storage so there is no high score
            console.log("Your browser doesn't support Local Storage.");
        } else {
            if (!localStorage["dysonWaveCount"] || !localStorage["dysonEnemyCount"] || !localStorage["dysonEnemyObCount"]) {
                // no high score in the storage
                localStorage['dysonWaveCount'] = 0;
                localStorage['dysonEnemyCount'] = 0;
                localStorage['dysonEnemyObCount'] = 0;
            }

            // new high score?
            if (Dyson.survived > localStorage['dysonWaveCount'])
                localStorage['dysonWaveCount'] = Dyson.survived;
            if (Dyson.enemiesDestroyed > localStorage['dysonEnemyCount'])
                localStorage['dysonEnemyCount'] = Dyson.enemiesDestroyed;
            if (Dyson.enemiesObliterated > localStorage['dysonEnemyObCount'])
                localStorage['dysonEnemyObCount'] = Dyson.enemiesObliterated;

            highWave = localStorage['dysonWaveCount'];
            highDestroy = localStorage['dysonEnemyCount'];
            highOb = localStorage['dysonEnemyObCount'];
        }

        //Display the high scores
        this.game.add.text(400,400,"Longest survived: "+highWave+" waves",this.style2);
        this.game.add.text(400,440,"Most destroyed: "+highDestroy+" enemies",this.style2);
        this.game.add.text(400,480,"Most obliterated: "+highOb+" enemies",this.style2);

        this.restart = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    },
    update: function() {
        if(this.restart.justDown || this.game.input.activePointer.isDown) {
            //stop the music before switching state
            this.fare.stop();
            //this.game.state.start('Endless');
            this.game.state.start('Menu');
        }
    },
    supportsLocalStorage: function() {
        // checks if user's browser supports Storage
        return ('localStorage' in window) && window['localStorage'] !== null;
}
};
