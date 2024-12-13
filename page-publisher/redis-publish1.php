
<!DOCTYPE html>
<html>
  <head>
    <style>
    /*
        http://localhost/php-practice/redis-publish1.php
    */
    </style>
  </head>
  <body>
  <?php
   echo '<div class="my_class">==================== START redis-publish1 <br></div>';
  ?>

  <?php

  require 'predis/autoload.php';
  include __DIR__ . '/vendor/autoload.php';

  use Predis\Client as PredisClient;

  $redisAdapter = new PredisClient([
                  'scheme'   => 'tcp',
                  'host'     => '127.0.0.1',
                  'port'     => 6379,
                  'password' => '',
                  'database' => 0,
                  'read_write_timeout' => 0,
              ]);


//   print_r($redisAdapter);

  echo '<div class="my_class">====================<br></div>';
  echo '<div class="my_class">====================<br></div>';
  echo '<div class="my_class">====================<br></div>';

//   $redisAdapter->set("publisher","Alex N.");
//   $publisher=$redisAdapter->get("publisher");
//   echo '<div class="my_class">'.$publisher.'<br></div>';

        $adapter = new \Superbalist\PubSub\Redis\RedisPubSubAdapter($redisAdapter);
//      print_r($adapter);

    for($i=0; $i<100; $i++){
        $progressorData = array('progressor' => $i);
        $adapter->publish('my_channel', json_encode($progressorData));
        sleep(1);
    }


  ?>

  </body>
</html>


