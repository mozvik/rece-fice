<?php
$id = strtok($_SERVER['QUERY_STRING'], '=');



if ($_SERVER['REQUEST_METHOD'] === 'GET') {

  $conn = DBmodel::connect();
  try {
    $st = $conn->prepare("SELECT COUNT(recipeId) FROM recipe");
    $st->execute();
    $count = $st->fetchColumn();
    $conn = null;
  } catch (Exception $e) {
    $response = new Response(400, true, $e->getMessage());
    return;
  }

  $responseData = [
    'totalRecipes' => $count
  ];
  $response = new Response(200, false, $responseData);
}
