<?php

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  $conn = DBmodel::connect();
  if ($conn instanceof PDO) {
    $conn = NULL;
    $response = new Response(200, false, 'Server is ready.');
  }
  else{
    $response = new Response($conn, true, 'Service is unavailable.');
  }
}