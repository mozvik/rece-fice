<?php
// require('auth_functions.php');

if(!Auth::userAuthentication()){
  $response = new Response(200, false, null);
  return $response;
}

$id = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_NUMBER_INT);
if (!$id) {
  $response = new Response(200, false, null);
  return;
}
$user = User::getByID($id);
$userStats = User::getUserStatistics($id);

if (!$user || !$userStats) {
  $response = new Response(200, false, null);
  return;
}

$responseData = [
  'id' => $user->id,
  'name' => $user->name,
  'totalReviews' => $userStats['totalReviews'],
  'totalRecipes' => $userStats['totalRecipes'],
  'totalFavorites' => $userStats['totalFavorites'],  
  'avatar' => $user->avatar
];
$response = new Response(200, false, $responseData);
