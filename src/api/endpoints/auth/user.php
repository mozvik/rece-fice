<?php
// require('auth_functions.php');

if(!Auth::userAuthentication()){
  $response = new Response(200, false, null);
  return;
}

$response = Auth::updateUserCredentials();
