<?php

if(!Auth::userAuthentication()){
  $response = new Response(200, false, null);
  return $response;
}

$response = Auth::moderateReview();