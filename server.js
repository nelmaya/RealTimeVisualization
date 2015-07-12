var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app)
  , Twit = require('twit')
  , port = process.env.PORT || 2000
  , io = require('socket.io').listen(server);

server.listen(port);
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
res.sendFile(__dirname + '/index.html');
});

var watchList = ['colombia','argentina'];
 var T = new Twit({
    consumer_key:         'rLoeDaKri0ocCK6si1d3EmuoP'
  , consumer_secret:      'E4hV6t056tR6WSHrhaZC5ltzKT55Amogr2g91cG3Vmvu0gN9Q5'
  , access_token:         '12074122-Wxa0CDmpZ0YGQmGBZhKVPIDgpsuqXB8hkgeWRfEFO'
  , access_token_secret:  'vELqHBx3GUqcL3LOeQuRqL2CRNhzW0KKH5mxdrMz3dULy'
})

io.sockets.on('connection', function (socket) {
  console.log('Connected');


 var stream = T.stream('statuses/filter', { track: watchList })

  stream.on('tweet', function (tweet) {
    console.log(tweet);
    io.sockets.emit('stream',tweet);

  });
 });