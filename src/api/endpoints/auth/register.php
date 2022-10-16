<?php
// require('auth_functions.php');
$response = Auth::register();
$subscribe = filter_input(INPUT_POST, 'subscribe', FILTER_VALIDATE_BOOLEAN);
if($subscribe && !$response->isError){
  $email = $response->response['email'];
  require('functions/subscribe_email.php');
  subscribeEmail($email);
}

