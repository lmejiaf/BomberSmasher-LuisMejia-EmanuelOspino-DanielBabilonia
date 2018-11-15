Game.Level1 = function (game) { }

var map;
var layer;


var player;
Game.Level1.prototype = {
    create: function (game) {
        //cargar sfx
        this.stage.backgroundColor = "#4C0B5F";
        music = this.add.audio('backMusic', true);
        music.loopFull(4);
        music.volume = 0.4;
        music.play();

        //añado el mapa
        map = this.add.tilemap("map", 64, 64);
        map.addTilesetImage("tile");
        layer = map.createLayer(0);
        layer.resizeWorld();
        map.setCollisionBetween(0, 19);

        //cargar conexion
        this.socket = io();
        this.socket.on("closeCLient", () => {

            this.state.start("MainMenu");
        });
        self = this;
        this.otherPlayers = this.add.physicsGroup();
        this.socket.on('currentPlayers', function (players) {
            Object.keys(players).forEach(function (id) {
                if (players[id].playerId !== self.socket.id) {
                    let otherPlayer = self.add.sprite(players[id].x, players[id].y, "Ned");
                    otherPlayer.playerId = players[id].playerId;
                    otherPlayer.animations.add("izquierda", [0, 1, 2, 3, 4, 5, 4, 3, 2, 1], 48, true);
                    otherPlayer.animations.add("derecha", [6, 7, 8, 9, 10, 11, 10, 9, 8, 7], 48, true);
                    self.otherPlayers.add(otherPlayer);
                }
            });
        });
        this.socket.on('newPlayer', function (player) {
            let otherPlayer = self.add.sprite(player.x, player.y, "Ned");
            otherPlayer.playerId = player.playerId;
            otherPlayer.animations.add("izquierda", [0, 1, 2, 3, 4, 5, 4, 3, 2, 1], 48, true);
            otherPlayer.animations.add("derecha", [6, 7, 8, 9, 10, 11, 10, 9, 8, 7], 48, true);
            self.otherPlayers.add(otherPlayer);
        });
        this.socket.on('disconnect', function (playerId) {
            self.otherPlayers.children.forEach(function (otherPlayer) {
                if (playerId === otherPlayer.playerId) {
                    otherPlayer.destroy();
                }
            });
        });







        //añado al player
        player = this.add.sprite(64, 64, "Ned");
        // player.anchor.setTo(0.5, 0.5);
        player.animations.add("izquierda", [0, 1, 2, 3, 4, 5, 4, 3, 2, 1], 48, true);
        player.animations.add("derecha", [6, 7, 8, 9, 10, 11, 10, 9, 8, 7], 48, true);
        dir = 1;
        player_vel = 260;
        calm = true;;
        this.camera.follow(player);
        this.physics.arcade.enable(player);
        // new offset, derecha= 22*50
        // new offset, izquierda= 11*50
        player.body.setSize(30, 12, 16, 50);
        player.body.collideWorldBounds = true;
        posPlayer = {
            x: player.x,
            y: player.y,
        }
        controls = {
            up: this.input.keyboard.addKey(Phaser.Keyboard.W),
            right: this.input.keyboard.addKey(Phaser.Keyboard.D),
            down: this.input.keyboard.addKey(Phaser.Keyboard.S),
            left: this.input.keyboard.addKey(Phaser.Keyboard.A),
            fight: this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
            // l: this.input.keyboard.addKey(Phaser.Keyboard.L),//prueba pausa
        }


        //añado la bomba
        numbombas = 10;
        bombas = this.add.physicsGroup(Phaser.Physics.ARCADE);
        bombas.collideWorldBounds = true;
        posBomba = {
            x: player.x + player.width + 4,
            y: player.y + player.height / 2,
        }

        txt = this.add.text(this.world.centerX, this.world.centerY, numbombas, { font: "48px Great Vibes", fill: "black", align: "center" });
        txt.anchor.setTo(0.5, 0.5);
        this.socket.on("playerShooted", (posBomba) => {
            let bomba = this.add.sprite(posBomba.x, posBomba.y, "bomba");
            this.physics.arcade.enable(bomba);
            bomba.body.onCollide = new Phaser.Signal();
            bomba.id = self.socket.id;
            bomba.body.onCollide.add(() => {
                bombas.remove(bomba);
            }, this);

            bombas.add(bomba);
        });

        this.socket.on('playerMoved', function (playerInfo) {
            self.otherPlayers.children.forEach(function (otherPlayer) {
                if (playerInfo.playerId === otherPlayer.playerId) {
                    if (playerInfo.calm === false) {
                        otherPlayer.animations.play(playerInfo.anim);
                        otherPlayer.x = playerInfo.posPlayer.x;
                        otherPlayer.y = playerInfo.posPlayer.y;

                    } else {
                        otherPlayer.animations.stop();
                        (playerInfo.dir === 1) ? otherPlayer.frame = 6 : otherPlayer.frame = 0;

                    }

                }

            });

        });







    },


    update: function () {
        if (player) {
            this.physics.arcade.collide(player, layer);
            this.physics.arcade.collide(player, bombas)
            this.physics.arcade.collide(this.otherPlayers, bombas);






            posBomba.x = player.x + player.width / 2 - 16;
            posBomba.y = player.y + player.height;



            if (controls.up.isDown) {
                if (dir === 1) {
                    player.animations.play("derecha");
                } else {
                    player.animations.play("izquierda");
                }
                player.body.velocity.y = -player_vel;
                player.body.velocity.x = 0;
                calm = false;

            } else
                if (controls.right.isDown) {
                    player.animations.play("derecha");
                    dir = 1;
                    player.body.velocity.x = player_vel;
                    player.body.velocity.y = 0;
                    calm = false;
                } else
                    if (controls.down.isDown) {
                        if (dir === 1) {
                            player.animations.play("derecha");
                        } else {
                            player.animations.play("izquierda");
                        }
                        player.body.velocity.y = player_vel;
                        player.body.velocity.x = 0;
                        calm = false;
                    } else
                        if (controls.left.isDown) {
                            player.animations.play("izquierda");
                            dir = -1;
                            player.body.velocity.y = 0;
                            player.body.velocity.x = -player_vel;
                            calm = false;
                        } else {
                            player.animations.stop();
                            if (dir === 1) {
                                player.frame = 6;
                            } else {
                                player.frame = 0;
                            }
                            player.body.velocity.y = 0;
                            player.body.velocity.x = 0;
                            calm = true;
                        }
            posPlayer.x = player.x;
            posPlayer.y = player.y;
            this.socket.emit('playerMovement', { posPlayer, animation: dir === 1 ? "derecha" : "izquierda", calm, dir });

            if (controls.fight.isDown && numbombas > 0) {

                this.socket.emit('playerShoot', { x: posBomba.x, y: posBomba.y });
                game.time.events.add(Phaser.Timer.SECOND * 4, () => {

                }, this);


            }


        }

    },

}