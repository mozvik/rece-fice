<?php

$id = strtok($_SERVER['QUERY_STRING'], '=');

if ($_SERVER['REQUEST_METHOD'] === 'GET' && $resource === 'favorites/simple') { 
  $user = filter_input(INPUT_GET, 'user', FILTER_DEFAULT);
  $response = User::getFavorites($user);
} 
 
else if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['userId']) && isset($_POST['recipeId']) && isset($_POST['flag'])) {
  $userId = filter_input(INPUT_POST, 'userId', FILTER_DEFAULT);
  $recipeId = filter_input(INPUT_POST, 'recipeId', FILTER_DEFAULT);
  $flag = filter_input(INPUT_POST, 'flag', FILTER_VALIDATE_BOOLEAN);
  $response = User::setFavorites($userId,$recipeId,$flag);
}
