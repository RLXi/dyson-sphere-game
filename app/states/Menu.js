// Create Game function
Dyson.Menu = function(game) {
    this.game = game;
    this.musicPlaying = false;
};

//Set Game function prototype
Dyson.Menu.prototype = {
    create: function() {
        this.game.world.setBounds(0,0,800,800);

        //Images
        this.game.add.image(0,0,'background');

        //Random enemy sprite
        //this.hulk = this.game.add.sprite(-1000,100,'beetle');
        //this.game.physics.arcade.enable(this.hulk);
        //this.game.physics.arcade.angleBetween(this.hulk,{x:400,y:400});

        //var eJSON = this.game.cache.getJSON('enemiesJSON');
        //console.log(eJSON.enemies[2].name);
        //console.log(eJSON.enemies[2].description);
        //console.log(eJSON.enemies[2].health);

        //UI
        var titleStyle = {font: '70px courier', fill:'#fff', align:'center'};
        var otherStyle = {font: '20px courier', fill:'#fff', align:'center'};
        var title = this.game.add.text(this.game.world.centerX,170, 'DYSON\nSPHERE', titleStyle);
        title.anchor.setTo(0.5);
        title.setShadow(0, 3, 'rgba(255,255,255,1)', 5);

        //var muBtn = this.game.add.button(5,5,'musicBtn',this.pauseMusic,this);
        //muBtn.animations.add('inactive',[0],1,true);
        //muBtn.animations.add('active',[1],1,true);
        //muBtn.events.onInputOver.add(function() {muBtn.animations.play('active');this.selectNoise.play();},this);
        //muBtn.events.onInputOut.add(function() {muBtn.animations.play('inactive')},this);

        //this.buttons = this.game.add.group();
        //var story = this.buttons.create(100,300,'storyBtn');
        //var endless = this.buttons.create(100,400,'endlessBtn');
        //var credits = this.buttons.create(100,500,'creditsBtn');

        var newSto = this.game.add.button(50,310,'storyBtn',this.story,this);
        newSto.animations.add('inactive', [0],1,true);
        newSto.animations.add('active', [1],1,true);
        newSto.events.onInputOver.add(function() {newSto.animations.play('active');this.selectNoise.play();},this);
        newSto.events.onInputOut.add(function() {newSto.animations.play('inactive')},this);
        //var sto = this.game.add.button(170,310,'storyBtn',this.story,this);
        //sto.anchor.setTo(0.5,0.5);
        //sto.events.onInputOver.add(this.over,this);
        //sto.events.onInputOut.add(this.out,this);
        //this.game.add.text(310,303,'(Under development)', otherStyle);

        var newEnd = this.game.add.button(50,410,'endlessBtn',this.endless,this);
        newEnd.animations.add('inactive', [0],1,true);
        newEnd.animations.add('active', [1],1,true);
        newEnd.events.onInputOver.add(function() {newEnd.animations.play('active');this.selectNoise.play();},this);
        newEnd.events.onInputOut.add(function() {newEnd.animations.play('inactive')},this);
        //var end = this.game.add.button(170,410,'endlessBtn',this.endless,this);
        //end.anchor.setTo(0.5,0.5);
        //end.events.onInputOver.add(this.over,this);
        //end.events.onInputOut.add(this.out,this);
        //this.game.add.text(310,403,'(Under development)', otherStyle);

        var newCre = this.game.add.button(50,510,'creditsBtn',this.credits,this);
        newCre.animations.add('inactive', [0],1,true);
        newCre.animations.add('active', [1],1,true);
        newCre.events.onInputOver.add(function() {newCre.animations.play('active');this.selectNoise.play();},this);
        newCre.events.onInputOut.add(function() {newCre.animations.play('inactive')},this);
        //var cre = this.game.add.button(170,510,'creditsBtn',this.credits,this);
        //cre.anchor.setTo(0.5,0.5);
        //cre.events.onInputOver.add(this.over,this);
        //cre.events.onInputOut.add(this.out,this);
        //this.game.add.text(310,503,'(Under development)', otherStyle);

        this.altCursor = this.game.add.sprite(0,0,'cursor');

        //SFX
        this.selectNoise = this.game.add.audio('select');
        this.selectNoise.volume = 0.5;
        this.selecttrueNoise = this.game.add.audio('selecttrue');
        this.selecttrueNoise.volume = 0.5;

        //Music
        this.mu = this.game.add.audio('menuMusic');
        this.mu.loop = true;
        this.mu.onDecoded.add(this.startMusic, this);
    },
    pauseMusic: function() {
        if (!this.musicPlaying) {
            this.mu.play();
        }
        else {
            this.mu.stop();
        }
        this.musicPlaying = !this.musicPlaying;
    },
    startMusic: function() {
        if(!this.musicPlaying) {
            this.mu.play();
            this.musicPlaying = !this.musicPlaying;
        }
    },
    update: function() {
        this.altCursor.x = this.game.input.activePointer.x;
        this.altCursor.y = this.game.input.activePointer.y;

        //var t = this.game.time.time/2;
        //var x = 250*Math.cos(t)+400;
        //var y = 150*Math.cos(t)+400;
        //this.game.physics.arcade.accelerateToXY(this.hulk,x,y,40,400,400);
        //this.hulk.rotation = this.game.physics.arcade.angleBetween(this.hulk,{x:400,y:400})+Math.PI/2;
        //this.hulk.angle = Phaser.Math.radToDeg(this.game.physics.arcade.angleBetween(this.hulk,{x:400,y:400})+Math.PI/2);
    },
    story: function() {
        console.log('story');
        this.selecttrueNoise.play();
        this.pauseMusic();
        this.game.state.start('Story');
    },
    endless: function() {
        console.log('endless');
        this.selecttrueNoise.play();
        this.pauseMusic();
        this.game.state.start('Endless');
    },
    credits: function() {
        console.log('credits');
        this.selecttrueNoise.play();
        this.pauseMusic();
        this.game.state.start('Credits');
    }
};
