var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

var players = {};
var socks = [];
app.use(express.static(__dirname + '/cliente'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

var cont = 0;
var p1 = {
  x: 64,
  y: 64
}
var p2 = {
  x: 1856,
  y: 896
}

io.on('connection', function (socket) {


  console.log('a user connected');
  if (Math.floor(Math.random() * ((100 - 1) + 1)) % 2 === 0) {
    players[socket.id] = {
      x: p1.x,
      y: p1.y,
      playerId: socket.id,


    };


  } else {
    players[socket.id] = {
      x: p2.x,
      y: p2.y,
      playerId: socket.id,


    };
  }




  // create a new player and add it to our players object



  // // send the players object to the new player
  socket.emit('currentPlayers', players);
  // // update all other players of the new player
  socket.broadcast.emit('newPlayer', players[socket.id]);

  // when a player moves, update the player data
  socket.on('playerMovement', function (movementData) {
    players[socket.id].posPlayer = movementData.posPlayer;
    players[socket.id].anim = movementData.animation;
    players[socket.id].calm = movementData.calm;
    players[socket.id].dir = movementData.dir;


    // emit a message to all players about the player that moved
    socket.broadcast.emit('playerMoved', players[socket.id]);
  });

  socket.on("playerShoot", (posBomba) => {

    io.sockets.emit("playerShooted", posBomba);
  });






  // when a player disconnects, remove them from our players object
  socket.on('disconnect', function () {
    console.log('user disconnected');
    // remove this player from our players object
    delete players[socket.id];


    // emit a message to all players to remove this player
    io.emit('disconnect', socket.id);
  });

});

server.listen(8080, function () {
  console.log(`Listening on ${server.address().port}`);
});
