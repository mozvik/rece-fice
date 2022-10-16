<?php

$token = filter_input(INPUT_GET, 'token', FILTER_DEFAULT);
if (!$token) {
  $response = new Response(200, false, ['error' => 'Érvénytelen token formátum!']);
  return $response;
  die();
} 


$response = User::validateRecoveryToken($token);


