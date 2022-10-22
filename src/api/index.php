<?php
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Content-Type: application/json');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');

require_once("settings.php");
require_once("classes/dbmodel.php");
require_once("classes/auth.php");
require_once("classes/listBuilder.php");
require_once("classes/page.php");
require_once("classes/recipe.php");
require_once("classes/recipeAPI.php");
require_once("classes/recipeBuilder.php");
require_once("classes/response.php");
require_once("classes/session.php");
require_once("classes/user.php");



ini_set('session.cookie_secure', "1");
ini_set('session.cookie_samesite', 'None');
session_start();

$sid = session_id();

$resource = urldecode(strtok($_SERVER['QUERY_STRING'], '&'));

$route = routeTo($resource);
if (!$route) {
  $response = new Response(400, true, 'Bad request.');
  return $response;
} else {
  require('endpoints/'.$route);
}


if (isset($response) && $response instanceof Response) {
  if ($response->isError) {
    http_response_code($response->responseCode);
    echo json_encode($response->response);
  } else {
    http_response_code($response->responseCode);
    echo json_encode($response->response);
  }
  die();
}

function sendResponse($results, $error)
{
  if (!empty($error)) {
    http_response_code(400);
    echo json_encode($error);
  } else if ($results || empty($results)) {
    http_response_code(200);
    echo json_encode($results);
    $d = json_encode($results);
  } else {
    http_response_code(400);
    echo json_encode("bad request");
  }
}

function routeTo($resource)
{
  $urls = [
    'ready' => 'ready.php',//
    'categories' => 'categories.php',//
    'measurements' => 'measurements.php',//
    'difficulties' => 'difficulties.php',//
    'nationalities' => 'nationalities.php',//
    'costs' => 'costs.php',//
    'labels' => 'labels.php',//
    'search' => 'search.php',//
    'recipe' => 'recipe.php',//--get ok|put ok|post ok|del ok
    'list' => 'list.php',//
    'review' => 'review.php',//
    'reviews' => 'reviews.php',//
    'fridge' => 'fridge.php',//
    'subscribe' => 'subscribe.php',//
    'login' => 'auth/login.php',//
    'register' => 'auth/register.php',//
    'logout' => 'auth/logout.php',//
    'recovery' => 'auth/recovery.php',//php render kell
    'reset' => 'auth/reset.php',//
    'credentials' => 'auth/credentials.php',//
    'userlist' => 'auth/userlist.php',//
    'user' => 'auth/user.php',//
    'avatar' => 'auth/avatar.php',//
    'avatar/delete' => 'auth/avatar_delete.php',//
    'info' => 'auth/info.php',//
    'banuser' => 'auth/banuser.php',//
    'activateuser' => 'auth/activateuser.php',//
    'moderatereview' => 'auth/moderatereview.php',//
    'activatereview' => 'auth/activatereview.php',//
    'moderaterecipe' => 'auth/moderaterecipe.php',//
    'activaterecipe' => 'auth/activaterecipe.php',//
    'favorites/simple' => 'favorites.php',//
    'favorite' => 'favorites.php',//
    'recipecount' => 'recipecount.php',//
  ];

  $chk = array_key_exists($resource, $urls);
  if (!$chk) {
    return false;
  }
  return $urls[$resource];
}
