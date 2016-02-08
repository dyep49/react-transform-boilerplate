const path = require('path');
const express = require('express');

const app = express();
const server = require('http').Server(app);
const PORT = process.env.NODE_PORT || 3000

if(process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const config = require('./webpack.config.dev');
  const compiler = webpack(config);
  const chokidar = require('chokidar');

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));

}


app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html')); });

server.listen(PORT, function(err) {
  if (err) { console.log(err); }
  console.log(`Server listening on port ${PORT}`);
});

//Setup websockets
const io = require('socket.io')(server);

io.on('connection', function(socket) {
  console.log('socket connection');
})

//Setup MQTT
const mqtt = require('mqtt');
const rabbitmqBroker = 'process.env.RABBITMQ_BROKER';
const client = mqtt.connect(rabbitmqBroker);

client.on('connect', function() {
  console.log('connected to mqtt broker');
});

client.subscribe('v1/vest/#/orien');

client.on('message', function(topic, message) {
  var pitch = JSON.parse(message).ori[0];
  var tag = topic.split('/')[2];
  console.log(topic);
  io.emit('test', JSON.stringify({tag: tag, date: Date.now(), ori: pitch}));
})

// this function is called when you want the server to die gracefully
// i.e. wait for existing connections
var gracefulShutdown = function() {
  console.log("Received kill signal, shutting down gracefully.");
  server.close(function() {
    console.log("Closed out remaining connections.");
    process.exit()
  });
  
   // if after 
   setTimeout(function() {
       console.error("Could not close connections in time, forcefully shutting down");
       process.exit()
  }, 10*1000);
}

// listen for TERM signal .e.g. kill 
process.on ('SIGTERM', gracefulShutdown);

// listen for INT signal e.g. Ctrl-C
process.on ('SIGINT', gracefulShutdown); 

