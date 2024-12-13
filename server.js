

//CLIENT https://localhost/php-practice/redis-subscribe1.php

const PORT = 3100;

var {createServer} = require('http');
var {Server} = require('socket.io')
var {createClient} = require('redis')
var {createAdapter} = require('@socket.io/redis-adapter')

var express = require('express');
var app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        credentials: true,
        origin:"https://localhost",
    },
    maxHttpBufferSize: 1e8,
});

io.on('connection', (socket) => {
    console.log('=========== A new client connected');

    // Handle socket events here

    socket.on('disconnect', () => {
        console.log('===========   Client disconnected');
    });
});

(async () => {
    const pubClient = createClient({ url: "redis://localhost:6379" });  // Add your Redis URL here
    const subClient = pubClient.duplicate();

    await Promise.all([pubClient.connect(),subClient.connect()]);

    io.adapter(createAdapter(pubClient, subClient));

    server.listen(PORT, () => {
        console.log('Server listening on port '+PORT);
    });
})();

console.log("=== started ")


