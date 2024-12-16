

//CLIENT https://localhost/php-practice/redis-subscribe1.php

const PORT = 3100;
const HOST_REDIS = "redis://localhost:6379";

var {createServer} = require('http');
var {Server} = require('socket.io')
var {createClient} = require('redis')
var {createAdapter} = require('@socket.io/redis-adapter')

var express = require('express');
const redisAdapter = require("redis");
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


    socket.on('disconnect', () => {
        console.log('===========   Client disconnected');
    });
});

(async () => {
    const pubClient = createClient({ url: HOST_REDIS });  // Add your Redis URL here
    const subClient = pubClient.duplicate();

    await Promise.all([pubClient.connect(),subClient.connect()]);

    io.adapter(createAdapter(pubClient, subClient));

    subClient.subscribe('channelRedisToExpress',
        (params) => {
            console.log("=== message incomed ",params)
            io.emit("channelExpressToClient1",params)
        });


    server.listen(PORT, () => {
        console.log('Server listening on port '+PORT);
    });
})();

console.log("=== started ")


