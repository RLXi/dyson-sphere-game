(function () {
    //  Create Phaser game and inject it into the game div.
    var game = new Phaser.Game(800, 800, Phaser.AUTO, 'game');

    //  Add the States
    game.state.add('Boot', Dyson.Boot);
    game.state.add('Preload', Dyson.Preload);
    game.state.add('Menu', Dyson.Menu);
    game.state.add('Credits', Dyson.Credits);
    game.state.add('GameOver',Dyson.Gameover);
    game.state.add('Story', Dyson.Story);
    game.state.add('Endless', Dyson.Endless);

    //  start the Boot state.
    game.state.start('Boot');
})();