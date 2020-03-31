// create Dyson Class
Dyson = {
    //some global variables
    score : 0,
    survived: 0,
    enemiesDestroyed: 0,
    enemiesObliterated: 0,
    musicPlaying: false
};

// Create Game function
Dyson.Boot = function(game) {
    this.game = game;
};

//Set Game function prototype
Dyson.Boot.prototype = {
    //scaling is implemented in init() -function
    init: function () {
        // set up input max pointers
        this.input.maxPointers = 2;

        // set up stage disable visibility change
        this.stage.disableVisibilityChange = true;

        // Set up the scaling method used by the ScaleManager
        // Valid values for scaleMode are:
        // * EXACT_FIT //Stretches everything
        // * NO_SCALE //No scale, the canvas is as big as you set it to be, ie. 800x600
        // * SHOW_ALL //Scales with the size of the window, keeps aspect ratio
        // * RESIZE //Resizes the canvas but not the assets
        // See http://docs.phaser.io/Phaser.ScaleManager.html for full document
        //this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
        //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //this.scale.scaleMode = Phaser.ScaleManager.RESIZE;

        // If you wish to align your game in the middle of  the page then you can
        // set this value to true. It will place a re-calculated margin-left
        // pixel value onto the canvas element which is updated on orientation /
        // resizing events. It doesn't care about any other DOM element that may
        // be on the page, it literally just sets the margin.
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        // Force the orientation in landscape or portrait.
        // * Set first to true to force landscape.
        // * Set second to true to force portrait.
        //this.scale.forceOrientation(true, true);
        //this.scale.forceOrientation(false, false);
        this.scale.forceOrientation(true, false);
        //this.scale.forceOrientation(false, true);

        // Sets the callback that will be called when the window resize event
        // occurs, or if set the parent container changes dimensions. Use this
        // to handle responsive game layout options. Note that the callback will
        // only be called if the ScaleManager.scaleMode is set to RESIZE.
        this.scale.setResizeCallback(this.gameResized, this);

        // Set screen size automatically based on the scaleMode. This is only
        // needed if ScaleMode is not set to RESIZE.
        this.scale.setScreenSize(true);

        // Re-calculate scale mode and update screen size. This only applies if
        // ScaleMode is not set to RESIZE.
        this.scale.refresh();
    },
    preload: function() {
        //Load progress bar image
        this.load.image('progressBar', 'assets/img/ui/progress.png');
    },
    create: function() {
        //Start Preload phase
        this.game.state.start('Preload');
    }
};