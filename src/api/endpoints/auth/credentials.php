<?php

if (!Auth::userAuthentication()) {
  $response = new Response(200, false, null);
  return;
}

$_SESSION;
$user = (new User())::getByID($_SESSION['userdata']['userId']);
$user->passwordHash = '';
$userStats = User::getUserStatistics($_SESSION['userdata']['userId']);

if (!$user || !$userStats) {
  $response = new Response(200, false, null);
  return;
}

$responseData = (array)$user;
$responseData = array_merge($responseData, $userStats);  
$response = new Response(200, false, $responseData);
