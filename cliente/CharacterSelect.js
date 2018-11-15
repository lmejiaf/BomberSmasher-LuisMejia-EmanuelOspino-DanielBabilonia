Game.CharacterSelect = function (game) {

}
Game.CharacterSelect.prototype = {
    create: function (game) {
        this.stage.backgroundColor = "#fff";
        music = this.add.audio("backCharacterSelect", true);
        music.loopFull();
        music.play();


        txt = this.add.text(game.world.centerX, 50, " Selecciona tu personaje ", { font: "72px Great Vibes", fill: "black", align: "center" });
        txt.anchor.setTo(0.5, 0.5);
        btn_Ned = this.createPersonaje(game, "Ned", game.world.centerX - 150, game.world.centerY, 200, 192, () => { music.destroy(); game.namePlayer = "Ned"; this.state.start("Level1") });
        btn_Ned = this.createPersonaje(game, "Skrull", game.world.centerX + 150, game.world.centerY, 200, 192, () => { music.destroy(); game.namePlayer = "Skrull"; this.state.start("Level1") });

    },
    update: function (game) {

    },
    createPersonaje: function (game, string, x, y, w, h, callback) {
        let button1 = game.add.button(x, y, "buttons", callback, this, 1, 0, 2);
        let sprite = game.add.image(button1.x, button1.y - 36, string);
        sprite.anchor.setTo(0.5, 0.5);
        sprite.scale.setTo(1.5, 1.5);
        let sfx = game.add.audio("overButton", true);
        sfx.volume = 0.3;
        button1.anchor.setTo(0.5, 0.5);
        button1.width = w;
        button1.height = h;
        button1.onInputOver.add(() => {
            sfx.play();
        }, this);
        let txt = game.add.text(button1.x, button1.y + 48, " " + string + " ", { font: "36px Great Vibes", fill: "black", align: "center" });
        txt.anchor.setTo(0.5, 0.5);

    }

}