
const redis = require('redis');

(async () => {

    const client = redis.createClient();

    const subscriber = client.duplicate();

    await subscriber.connect();

    await subscriber.subscribe('my_channel', (message) => {
        console.log("=== message",JSON.parse(message))
    });

    console.log("=== started",Date.now())

})();
