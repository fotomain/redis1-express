

//CLIENT https://localhost/php-practice/redis-subscribe1.php

const PORT = 3100;
const HOST = 'localhost';

const redisAdapter = require('redis');

const cors = require('cors');

// var express = require('express');
// var app = express();
// var server = require('http');
// var io = require('socket.io')
// io.use(server.Server(app));
// var redis = require('socket.io-redis');
// io.adapter(redis({ host: '127.0.0.1', port: 6379 }));


var express = require('express');
var app = express();

var redis = require('socket.io-redis');


const ALLOWED_ORIGINS=
    'https://render3-mern-client.netlify.app ' +
    'http://localhost:3100 ' +
    'http://localhost:3001 ' +
    'http://localhost:3000 ' +
    'http://localhost:4000 ' +
    'https://localhost ' +
    'http://localhost:8080 '


const customCorsOptions = {
    origin: (origin, callback) => {
        const allowedOrigins = ALLOWED_ORIGINS.split(" ");
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("=== myERROR Request from unauthorized origin" + JSON.stringify(origin)));
        }
    },
};

app.use(cors(
    customCorsOptions
));

const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
    cors:{
        origin:"https://localhost",
        methods: ["GET", "POST"],
        // credentials: true,
    }
});

io.adapter(redis({ host: '127.0.0.1', port: 6379 }));

httpServer.listen(PORT, HOST);

console.log("Express server listening on port %d", PORT)
// const socket  = io.listen(app);

    io.on('connection', function(client) {
        if(client) {
            console.log("=== connection +1")
        }
        const subscribe = redisAdapter.createClient(
            {
            'scheme'   : 'tcp',
            'host'     : '127.0.0.1',
            'port'     : 6379,
            'password' : '',
            'database' : 0,
    }
        );

        subscribe.subscribe('my_channel'); //    listen to messages from channel pubsub

        console.log("=== subscribe ",subscribe)

        subscribe.on("message", function(channel, message) {
            console.log("=== message ",message)
            client.send(message);
        });

        client.on('message', function(msg) {
        });

        client.on('disconnect', function() {
            subscribe.quit();
        });
    });


app.get('/', function (req,res) {
    res.send('Hello');
});

// if (!module.parent) {
//     app.listen(PORT, HOST);
//     console.log("Express server listening on port %d", PORT)
//
//     const socket  = io.listen(app);
//
//     socket.on('connection', function(client) {
//         const subscribe = redis.createClient();
//         subscribe.subscribe('pubsub'); //    listen to messages from channel pubsub
//
//         subscribe.on("message", function(channel, message) {
//             console.log("=== message ",message)
//             client.send(message);
//         });
//
//         client.on('message', function(msg) {
//         });
//
//         client.on('disconnect', function() {
//             subscribe.quit();
//         });
//     });
// }
