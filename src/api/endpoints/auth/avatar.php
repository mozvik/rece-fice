<?php
// require('auth_functions.php');

  if(!Auth::userAuthentication()){
    $response = new Response(200, false, null);
    return $response;
  }
  $id = filter_input(INPUT_POST, 'id', FILTER_VALIDATE_INT);
  if (!$id) {
    $response = new Response(400, true, false);
    return $response;
  } 
  $files = $_FILES;
  
  $response = User::updateAvatar($id, $files);
