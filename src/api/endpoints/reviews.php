<?php

if ($_SERVER['REQUEST_METHOD'] !== 'GET'){
  die();
}
if (!isset($_GET['userid'])){
  die();
}

$userId = filter_input(INPUT_GET,'userid',FILTER_VALIDATE_INT);
if (!$userId) {
  $response = new Response(400, true, "Bad request");
  die();
}

$conn = DBmodel::connect();
  
try {
  $st = $conn->prepare("SELECT review.id, review.rating, review.comment AS review, review.created, review.moderated, recipe.recipeId, recipe.recipeName FROM review JOIN recipe ON review.recipeId = recipe.recipeId WHERE review.userId = ? ORDER BY review.created DESC");
  $st->execute([$userId]);
  $result = $st->fetchAll(PDO::FETCH_ASSOC);
  
  } catch (Exception $e) {
    $response = new Response(400, true, $e->getMessage());
    return;
  }
  $response = new Response(200, false, $result);
  $conn = null;
