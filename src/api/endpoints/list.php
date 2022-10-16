<?php

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
  die();
}

if (isset($_GET['page'])) {
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

$listRequestName = [
  'appetiser',
  'soup',
  'maincourse',
  'sidedish',
  'dessert',
  'drink',
  'latest',
  'free',
  'daily',
  'popular',
  'userrecipes',
  'userfavorites',
  'similar',
];

$idx = array_search($_GET['category'], $listRequestName);
if ($idx === false) {
  $response = new Response(400, true, 'Bad request.');
  return;
}

switch ($listRequestName[$idx]) {
  case 'latest':
    $query = "SELECT * FROM recipe WHERE moderated != 1 ORDER BY created DESC LIMIT " . $itemsPerPage . " OFFSET " . $page * $itemsPerPage;
    break;
  case 'free':
    $response = new Response(200, false, ListBuilder::getFree($itemsPerPage));
    return;
    break;
  case 'daily':
    $response = new Response(200, false, ListBuilder::getDaily($itemsPerPage));
    return;
    break;
  case 'popular':
    $query = "SELECT recipe.*, AVG(rating) AS average 
      FROM review 
      LEFT JOIN recipe ON review.recipeId=recipe.recipeId WHERE recipe.moderated != 1 
      GROUP BY recipe.recipeId
      ORDER BY average DESC LIMIT " . $itemsPerPage;
    break;
  case NULL:
    $response = new Response(400, true, 'Bad request');
    return $response;
    die();
    break;
  case 'userrecipes':
    if (!isset($_GET['user'])) {
      $response = new Response(400, true, 'Missing user id');
      return $response;
      die();
    }
    $query = "SELECT * FROM recipe WHERE userId = ?
        ORDER BY created DESC LIMIT " . $itemsPerPage . " OFFSET " . $page * $itemsPerPage;
    $response = new Response(200, false, ListBuilder::getUserRecipes($query, $_GET['user']));
    return;
    break;
  case 'userfavorites':
    if (!isset($_GET['user'])) {
      $response = new Response(400, true, 'Missing user id');
      return $response;
      die();
    }
    $query = "SELECT 
      recipe.recipeId, recipe.recipeName, recipe.created, recipe.updated, recipe.userId, recipe.cookingTime, recipe.difficultyId, recipe.costId, recipe.categoryId, recipe.nationalityId, recipe.image1, recipe.image2, recipe.image3, recipe.calorie, recipe.protein, recipe.carbonhydrate, recipe.fat, recipe.sugar, recipe.servings 
      FROM user_favorites
      JOIN recipe ON user_favorites.recipeId = recipe.recipeId
      WHERE user_favorites.userId = ? AND recipe.moderated != 1
        ORDER BY created DESC LIMIT " . $itemsPerPage . " OFFSET " . $page * $itemsPerPage;
    $response = new Response(200, false, ListBuilder::getUserRecipes($query, $_GET['user']));
    return;
    break;
  case 'similar':
    if (!isset($_GET['recipe'])) {
      $response = new Response(400, true, 'Missing recipe id');
      return $response;
      die();
    }
    $response = new Response(200, false, ListBuilder::getSimilarRecipes($_GET['recipe']));
    return;
    break;
  default:
    $query = "SELECT * FROM recipe WHERE categoryId = ?  AND recipe.moderated != 1 ORDER BY created DESC LIMIT " . $itemsPerPage . " OFFSET " . $page * $itemsPerPage;
    $response = new Response(200, false, ListBuilder::getList($query, $idx + 1));
    return;
    break;
}

$response = new Response(200, false, ListBuilder::getList($query));
