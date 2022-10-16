<?php

if ($_SERVER['REQUEST_METHOD'] !== 'POST'){
  die();
}


$review = $_POST;
$review['created'] = date("Y-m-d h:i:sa");
  
$conn = DBmodel::connect();
  
try {
  $st = $conn->prepare("SELECT id FROM review WHERE userId = ? AND recipeId = ? LIMIT 1");
  $st->execute([$review['userId'], $review['recipeId']]);
  $result = $st->fetchAll(PDO::FETCH_ASSOC);
  if (count($result) > 0) {
    $response = new Response(400, true, "A receptet már értékelted.");
    $conn = null;
    return;
  }
 
  $sql = "INSERT INTO review (recipeId, userId, comment, rating, created) VALUES (?, ?, ?, ?, ?)";
  $st = $conn->prepare($sql);
  $st->execute(array_values($review));
  
  } catch (Exception $e) {
    $response = new Response(400, true, $e->getMessage());
    return;
  }
  $response = new Response(200, false, $review);
  $conn = null;