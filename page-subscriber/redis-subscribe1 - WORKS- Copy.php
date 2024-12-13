
<!DOCTYPE html>
<html>
  <head>
          <title>PubSub</title>
          <script src="https://cdn.socket.io/4.8.1/socket.io.min.js" integrity="sha384-mkQ3/7FUtcGyoppY6bz/PORYoGqOl7/aSUMn2ymDOJcapfS6PHqxhRTMh1RR0Q6+" crossorigin="anonymous"></script>
          <script src="./lib/jquery-1.4.3.min.js"></script>
    <style>
    /*
        http://localhost/php-practice/redis-subscribe1.php
    */
    </style>
  </head>
  <body>
      <?php
       echo '<div class="my_class">==================== START redis-subscribe1 <br></div>';
      ?>

<div id="content"></div>
    <script>
        $(document).ready(function() {
//             var socket = new io.Socket('localhost', {port: 3100, rememberTransport: false/*, transports: ['xhr-polling']*/});

                var connectionOptions =  {
//                             'Access-Control-Allow-Credentials': true,
//                             "withCredentials": true,
                            "force new connection" : true,
                            "reconnectionAttempts": "Infinity",
                            "timeout" : 10000,
//                             "transports" : ["websocket",'polling', 'flashsocket']

                        };

            var socket = io.connect('http://localhost:3100', connectionOptions );
//             var socket = new io.Socket('localhost', {port: 3100, rememberTransport: false/*, transports: ['xhr-polling']*/});
            console.log("=== socket ",socket)
            var content = $('#content');

            socket.on('connect', function() {
                    console.log("=== connect OK1")
            });

            socket.on('messageTo1', function(message){
                console.log("=== messageTo1 received ",message)
                content.prepend(message + '<br />');
            }) ;

            socket.on('disconnect', function() {
                console.log('disconnected');
                content.html("<b>Disconnected!</b>");
            });

            socket.connect();
        });
    </script>
  </body>
</html>


