Game.MainMenu = function (game) {

}
Game.MainMenu.prototype = {
    create: function (game) {
        this.stage.backgroundColor = "#fff";
        back = game.add.image(game.world.centerX, game.world.centerY, "backImg");
        back.anchor.setTo(0.5, 0.5);
        back.scale.setTo(2, 2);

        //añadir sfx
        music = this.add.audio("backMainMenu");
        music.loopFull();
        // music.volume=0.9;
        music.play();

        //crear main menu
        titleGame = this.add.sprite(game.world.centerX - 137, 0, "titleGame");
        game.physics.arcade.enable(titleGame);
        titleGame.body.bounce.set(1);
        titleGame.body.collideWorldBounds = true;
        titleGame.body.velocity.x = 100;
        btn_jugar = this.createButton(game, " P l a y ", game.world.centerX, 310, 300, 75, () => { music.destroy(); this.state.start("CharacterSelect"); });
        btn_sobre = this.createButton(game, " A b o u t ", game.world.centerX, 310 + 75 + 20, 300, 75, () => { console.log("About selected") });


    },
    update: function (game) {

    },
    createButton: function (game, string, x, y, w, h, callback) {
        let button1 = game.add.button(x, y, "buttons", callback, this, 1, 0, 2);
        let sfx = game.add.audio("overButton", true);
        sfx.volume = 0.3;
        button1.anchor.setTo(0.5, 0.5);
        button1.width = w;
        button1.height = h;
        button1.onInputOver.add(() => {
            sfx.play();
        }, this);
        let txt = game.add.text(button1.x, button1.y, string, { font: "48px Great Vibes", fill: "black", align: "center" });
        txt.anchor.setTo(0.5, 0.5);

    }

}