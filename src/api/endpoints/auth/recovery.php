<?php

//require('../vendor/autoload.php');
// require('auth_functions.php');


if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['email'])) { 
  require('functions/post_recovery.php');
}
else if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['token'])) { 
  require('functions/get_recovery.php');
}

// if post-> email check -> token generation ->send token link to email

//if get->check token in db  


//$response = login();

//if (!userAuthentication()) {
 // header('location:login.php');
  //exit();
//}
