<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['email'])) { 
  require('functions/post_recovery.php');
}
else if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['token'])) { 
  require('functions/get_recovery.php');
}

