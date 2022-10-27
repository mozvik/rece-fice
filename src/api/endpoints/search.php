<?php
// require_once('functions/add_labels.php');
// require_once('functions/add_categories.php');
// require_once('functions/add_difficulties.php');
// require_once('functions/add_nationalities.php');
// require_once('functions/add_costs.php');
// require_once('functions/add_reviews.php');
// require_once('functions/add_creator.php');
// require_once('functions/validate_page.php');
// require_once('functions/validate_items_per_page.php');


$ss=$_SERVER['REQUEST_METHOD'];
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

  $postData = json_decode(file_get_contents('php://input'), true);

  if (isset($postData['page'])) {
    $page = Page::validatePage($postData['page']);
    if ($page === false) {
      $response = new Response(400, true, 'Page number must be a positive integer, or zero.');
      return $response;
    }
  } else {
    $page = 0;
  }

  if (isset($postData['itemsPerPage'])) {
    $itemsPerPage = Page::validateItemsPerPage($postData['itemsPerPage']);
    if ($itemsPerPage === false) {
      $response = new Response(400, true, 'Items per page must be a positive integer.');
      return $response;
    }
  } else {
    $itemsPerPage = 4;
  }

  $response = new Response(200, false, multiSearch($postData, $page, $itemsPerPage));
}


function getTotalItems($searchArray)
{
  $categoryQuery = "(";
  $costQuery = "(";
  $difficultyQuery = "(";
  $nationalityQuery = "(";
  $labelQuery = "(";

  if (empty($searchArray)) return [];
  if (isset($searchArray['category'])) {
    foreach ($searchArray['category'] as $key => $value) {
      $categoryQuery .= " categoryId = :caid" . $key . " OR";
    }
    $categoryQuery = substr($categoryQuery, 0, strrpos($categoryQuery, ' OR')) . " )";
  }
  if (isset($searchArray['cost'])) {
    foreach ($searchArray['cost'] as $key => $value) {
      $costQuery .= " costId = :coid" . $key . " OR";
    }
    $costQuery = substr($costQuery, 0, strrpos($costQuery, ' OR')) . " )";
  }
  if (isset($searchArray['difficulty'])) {
    foreach ($searchArray['difficulty'] as $key => $value) {
      $difficultyQuery .= " difficultyId = :diid" . $key . " OR";
    }
    $difficultyQuery = substr($difficultyQuery, 0, strrpos($difficultyQuery, ' OR')) . " )";
  }
  if (isset($searchArray['nationality'])) {
    foreach ($searchArray['nationality'] as $key => $value) {
      $nationalityQuery .= " nationalityId = :naid" . $key . " OR";
    }
    $nationalityQuery = substr($nationalityQuery, 0, strrpos($nationalityQuery, ' OR')) . " )";
  }
  $conn = DBmodel::connect();

  try{
    $sql = "SELECT DISTINCT recipe.recipeId 
    FROM recipe 
    JOIN recipe_labels ON recipe_labels.recipeId = recipe.recipeId
    WHERE recipe.moderated = 0 AND ";

    if (!empty($searchArray['text'])) {
      $sql .= "recipe.recipeName LIKE :ss ";
    } else {
      $sql .= "recipe.recipeName LIKE '%' ";
    }
    $sql .= isset($searchArray['category']) && count($searchArray['category']) > 0 ? " AND " . $categoryQuery : "";
    $sql .= isset($searchArray['cost']) && count($searchArray['cost']) > 0 ? " AND " . $costQuery : "";
    $sql .= isset($searchArray['difficulty']) && count($searchArray['difficulty']) > 0 ? " AND " . $difficultyQuery : "";
    $sql .= isset($searchArray['nationality']) && count($searchArray['nationality']) > 0 ? " AND " . $nationalityQuery : "";
    if (isset($searchArray['label']) && count($searchArray['label']) > 0) {
      foreach ($searchArray['label'] as $key => $value) {
        $labelQuery .= " labelId = :laid" . $key . " OR";
      }
      $labelQuery = substr($labelQuery, 0, strrpos($labelQuery, ' OR')) . " )";
      $sql .= " AND " . $labelQuery;
    }
    $sql .=  " GROUP BY recipe.recipeId";
    $st = $conn->prepare($sql);

    if (isset($searchArray['category'])) {
      foreach ($searchArray['category'] as $key => $value) {
        $st->bindValue(":caid" . $key, (int)$value, PDO::PARAM_INT);
      }
    }
    if (isset($searchArray['cost'])) {
      foreach ($searchArray['cost'] as $key => $value) {
        $st->bindValue(":coid" . $key, (int)$value, PDO::PARAM_INT);
      }
    }
    if (isset($searchArray['difficulty'])) {
      foreach ($searchArray['difficulty'] as $key => $value) {
        $st->bindValue(":diid" . $key, (int)$value, PDO::PARAM_INT);
      }
    }
    if (isset($searchArray['nationality'])) {
      foreach ($searchArray['nationality'] as $key => $value) {
        $st->bindValue(":naid" . $key, (int)$value, PDO::PARAM_INT);
      }
    }
    if (!is_array($searchArray['text']) && $searchArray['text']) {
      $st->bindValue(":ss", "%" . $searchArray['text'] . "%");
    }
    if (isset($searchArray['label']) && $searchArray['label']) {
      foreach ($searchArray['label'] as $key => $value) {
        $st->bindValue(":laid" . $key, (int)$value, PDO::PARAM_INT);
      }
    }

    $st->execute();

    $recipes = $st->fetchAll(PDO::FETCH_ASSOC);
    $countOfResults = count($recipes);
    if ($countOfResults === 0) return 0;
  } catch (PDOException $e) {
    error_log($e->getMessage());
    $response = new Response($e->getMessage(), true, $e->getMessage());
    die();
  }

  $conn = null;
  return count($recipes);
}

function multiSearch($searchArray, $page, $itemsPerPage)
{
  $categoryQuery = "(";
  $costQuery = "(";
  $difficultyQuery = "(";
  $nationalityQuery = "(";
  $labelQuery = "(";

  if (empty($searchArray)) return [];

  $total = getTotalItems($searchArray);

  if (isset($searchArray['category'])) {
    foreach ($searchArray['category'] as $key => $value) {
      $categoryQuery .= " categoryId = :caid" . $key . " OR";
    }
    $categoryQuery = substr($categoryQuery, 0, strrpos($categoryQuery, ' OR')) . " )";
  }
  if (isset($searchArray['cost'])) {
    foreach ($searchArray['cost'] as $key => $value) {
      $costQuery .= " costId = :coid" . $key . " OR";
    }
    $costQuery = substr($costQuery, 0, strrpos($costQuery, ' OR')) . " )";
  }
  if (isset($searchArray['difficulty'])) {
    foreach ($searchArray['difficulty'] as $key => $value) {
      $difficultyQuery .= " difficultyId = :diid" . $key . " OR";
    }
    $difficultyQuery = substr($difficultyQuery, 0, strrpos($difficultyQuery, ' OR')) . " )";
  }
  if (isset($searchArray['nationality'])) {
    foreach ($searchArray['nationality'] as $key => $value) {
      $nationalityQuery .= " recipe.nationalityId = :naid" . $key . " OR";
    }
    $nationalityQuery = substr($nationalityQuery, 0, strrpos($nationalityQuery, ' OR')) . " )";
  }
  $conn = DBmodel::connect();

  try {


    $sql = "SELECT DISTINCT * 
    FROM recipe 
    JOIN recipe_labels ON recipe_labels.recipeId = recipe.recipeId
    WHERE recipe.moderated = 0 AND ";

    if (!empty($searchArray['text'])) {
      $sql .= "recipe.recipeName LIKE :ss ";
    } else {
      $sql .= "recipe.recipeName LIKE '%' ";
    }
    $sql .= isset($searchArray['category']) && count($searchArray['category']) > 0 ? " AND " . $categoryQuery : "";
    $sql .= isset($searchArray['cost']) && count($searchArray['cost']) > 0 ? " AND " . $costQuery : "";
    $sql .= isset($searchArray['difficulty']) && count($searchArray['difficulty']) > 0 ? " AND " . $difficultyQuery : "";
    $sql .= isset($searchArray['nationality']) && count($searchArray['nationality']) > 0 ? " AND " . $nationalityQuery : "";

    if (isset($searchArray['label']) && count($searchArray['label']) > 0) {
      foreach ($searchArray['label'] as $key => $value) {
        $labelQuery .= " labelId = :laid" . $key . " OR";
      }
      $labelQuery = substr($labelQuery, 0, strrpos($labelQuery, ' OR')) . " )";
      $sql .= " AND " . $labelQuery;
    }
    $sql .= " GROUP BY recipe.recipeId LIMIT " . $itemsPerPage . " OFFSET " . $page * $itemsPerPage;

    $st = $conn->prepare($sql);
    if (isset($searchArray['category'])) {
      foreach ($searchArray['category'] as $key => $value) {
        $st->bindValue(":caid" . $key, (int)$value, PDO::PARAM_INT);
      }
    }
    if (isset($searchArray['cost'])) {
      foreach ($searchArray['cost'] as $key => $value) {
        $st->bindValue(":coid" . $key, (int)$value, PDO::PARAM_INT);
      }
    }
    if (isset($searchArray['difficulty'])) {
      foreach ($searchArray['difficulty'] as $key => $value) {
        $st->bindValue(":diid" . $key, (int)$value, PDO::PARAM_INT);
      }
    }
    if (isset($searchArray['nationality'])) {
      foreach ($searchArray['nationality'] as $key => $value) {
        $st->bindValue(":naid" . $key, (int)$value, PDO::PARAM_INT);
      }
    }
    if (!is_array($searchArray['text']) && $searchArray['text']) {
      $st->bindValue(":ss", "%" . $searchArray['text'] . "%");
    }

    if (isset($searchArray['label']) && $searchArray['label']) {
      foreach ($searchArray['label'] as $key => $value) {
        $st->bindValue(":laid" . $key, (int)$value, PDO::PARAM_INT);
      }
    }

    $st->execute();
    $recipes = $st->fetchAll(PDO::FETCH_ASSOC);
    $countOfResults = count($recipes);
    if ($countOfResults === 0) return [];

    // $recipes = addLabels($recipes);
    // $recipes = addCategories($recipes);
    // $recipes = addDifficulties($recipes);
    // $recipes = addNationalities($recipes);
    // $recipes = addCosts($recipes);
    // $recipes = addReviews($recipes);
    // $recipes = addCreator($recipes);

    $recipes = RecipeBuilder::add($recipes);
  } catch (PDOException $e) {
    error_log($e->getMessage());
    $response = new Response(400, true, $e->getMessage());
    die();
  }
  $conn = null;
  return ["itemCount" => count($recipes), "totalResults" => $total, "items" => $recipes];
}
