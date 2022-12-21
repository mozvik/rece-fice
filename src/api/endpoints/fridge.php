<?php

if ($_SERVER['REQUEST_METHOD'] !== 'GET'){
  die();
}

if (isset($_GET['page']) ) {
  $page = Page::validatePage(ceil($_GET['page']));

  if ($page === false) {
    $response = new Response(400, true, 'Page number must be a positive integer, or zero.');
    return $response;
  }

} else {
  $page = 0;
}

if (isset($_GET['itemsPerPage'])) {
  
  $itemsPerPage = Page::validateItemsPerPage($_GET['itemsPerPage']);
  if ($itemsPerPage === false) {
    $response = new Response(400, true, 'Items per page must be a positive integer.');
    return $response;
  }
} else {
  $itemsPerPage = 4;
}

if (!isset($_GET['q'])) {
  die();
}

$ingredients = explode(',', $_GET['q']);

$conn = DBmodel::connect();

try{
$sql = "SELECT * FROM recipe 
JOIN ingredient ON recipe.recipeId = ingredient.recipeId
WHERE ";

  if (is_array($ingredients)) {
    foreach ($ingredients as $key => $value) {
      $sql .= "ingredient.name LIKE :word" . $key . " OR ";
    }
    $sql = substr($sql, 0, strrpos($sql, ' OR'));
  } else {
    $sql .= "ingredient.name LIKE :word";
  }
  $sql .= " GROUP BY recipe.recipeId LIMIT " . $itemsPerPage . " OFFSET " . $page * $itemsPerPage;
  $st = $conn->prepare($sql);

  if (is_array($ingredients)) {
    foreach ($ingredients as $key => $value) {
      $st->bindValue(":word" . $key, "%".$value."%", PDO::PARAM_STR);
    }
  } else {
    $st->bindValue(":word", "%".$ingredients."%",PDO::PARAM_STR);
  }

  $st->execute();
  $recipes = $st->fetchAll(PDO::FETCH_ASSOC);
}catch (PDOException $e) {
  error_log($e->getMessage());
    $response = new Response(400, true, $e->getMessage());
    die();
}

  $conn = null;

  $recipes = RecipeBuilder::add($recipes);

  $response = new Response(200, false,["itemCount" => count($recipes), "totalResults" => count($recipes), "items" => $recipes]);
 
