Game.Preloader = function (game) {
    this.preloadBar = null;
}
Game.Preloader.prototype = {
    preload: function () {
        this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, "preloaderBar");

        this.preloadBar.anchor.setTo(0.5, 0.5);
        this.time.advancedTiming = true;
        this.load.setPreloadSprite(this.preloadBar);


        //Load all assets
        // this.load.tilemap("map", "./assets/level1.csv");-
        // this.load.image("tileset", "./assets/pared.png");-
        // this.load.image("star", "./assets/star.png");
        // this.load.spritesheet("player", "./assets/spriteSheetPlayer.png", 64, 64);-
        // this.load.image("bomba", "./assets/pasto.png");-
        // this.load.audio('backMusic', ['./assets/bodenstaendig_2000_in_rock_4bit.mp3', './assets/bodenstaendig_2000_in_rock_4bit.ogg']);-
        // this.load.image("titleGame", "./assets/titleGame.png");-
        // this.load.spritesheet("buttons", "./assets/button_sprite_sheet_rects.png", 744, 150);//744*150
        // this.load.physics('physicsData', './assets/physics.json');

        //load assets for mainMenu
        this.load.audio("backMainMenu", ["./assets/audio/GOT.mp3", "./assets/audio/GOT.ogg"]);
        this.load.image("titleGame", "./assets/imagenes/titleGame.png");
        this.load.spritesheet("buttons", "./assets/imagenes/button_sprite_sheet_rects.png", 744, 150);//744*150
        this.load.image("backImg", "./assets/imagenes/winter-is-coming_4529298.jpg");
        this.load.audio("overButton", ["./assets/audio/Click Button.mp3", "./assets/audio/Click Button.ogg"]);

        //load assets for Character Select
        this.load.spritesheet("Skrull", "./assets/imagenes/spriteSheetSkrull.png", 64, 64);
        this.load.spritesheet("Ned", "./assets/imagenes/spriteSheetNed.png", 64, 64);
        this.load.audio("backCharacterSelect", ["./assets/audio/LightOfTheSeven.mp3", "./assets/audio/LightOfTheSeven.ogg"]);

        //load assets for world
        this.load.tilemap("map", "./assets/topografia/mapa.csv");
        this.load.image("tile", "./assets/imagenes/floorTile.png");
        this.load.audio('backMusic', ['./assets/audio/bodenstaendig_2000_in_rock_4bit.mp3', './assets/bodenstaendig_2000_in_rock_4bit.ogg']);


        //load assets for player


        //load assets for bomb
        this.load.image("bomba", "./assets/imagenes/bomba.png");
        this.load.audio("putBomb", "./assets/audio/Put.ogg", "./assets/audio/Put.mp3");
        this.load.audio("explodeBomb", "./assets/audio/Bomb Explode.ogg", "./assets/audio/Bomb Explode.mp3");

    },
    create: function () {
       
        this.state.start("MainMenu");
    }
}