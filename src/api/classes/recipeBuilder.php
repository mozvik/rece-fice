<?php
abstract class RecipeBuilder
{

  public static function add($recipes)
  {
    $recipes = self::addLabels($recipes);
    $recipes = self::addCategories($recipes);
    $recipes = self::addDifficulties($recipes);
    $recipes = self::addNationalities($recipes);
    $recipes = self::addCosts($recipes);
    $recipes = self::addReviews($recipes);
    $recipes = self::addCreator($recipes);
    $recipes = self::addIngredients($recipes);
    $recipes = self::addDirections($recipes);
    return $recipes;
  }

  private static function addLabels($recipes)
  {
    try {
      $conn = DBmodel::connect();
      foreach ($recipes as $key => $value) {
        $st = $conn->prepare("SELECT label.id, label.name FROM recipe_labels JOIN label ON recipe_labels.labelId = label.id WHERE recipeId = ?");
        $st->execute([(int)$value['recipeId']]);
        $recipes[$key]['labels'] = $st->fetchAll(PDO::FETCH_ASSOC);
        unset($recipes[$key]['labelId']);
      }
    } catch (PDOException $e) {
      error_log($e->getMessage());
      $response = new Response($e->getMessage(), true, $e->getMessage());
      die();
    }
    $conn = null;
    return $recipes;
  }

  private static function addCategories($recipes){
    try {
      $conn = DBmodel::connect();
      foreach ($recipes as $key => $value) {
        $st = $conn->prepare("SELECT * FROM category WHERE id = ? LIMIT 1");
        $st->execute([(int)$value['categoryId']]);
        $recipes[$key]['category'] = $st->fetch(PDO::FETCH_ASSOC);
        unset($recipes[$key]['categoryId']);
      }
    } catch (PDOException $e) {
      error_log($e->getMessage());
      $response = new Response($e->getMessage(), true, $e->getMessage());
      die();
    }
    $conn = null;
    return $recipes;
  }

  private static function addDifficulties($recipes){
    try {
      $conn = DBmodel::connect();
      foreach ($recipes as $key => $value) {
        $st = $conn->prepare("SELECT * FROM difficulty WHERE id = ? LIMIT 1");
        $st->execute([(int)$value['difficultyId']]);
        $recipes[$key]['difficulty'] = $st->fetch(PDO::FETCH_ASSOC);
        unset($recipes[$key]['difficultyId']);
      }
    } catch (PDOException $e) {
      error_log($e->getMessage());
      $response = new Response($e->getMessage(), true, $e->getMessage());
      die();
    }
    $conn = null;
    return $recipes;
  }

  private static function addNationalities($recipes){
    try {
      $conn = DBmodel::connect();
      foreach ($recipes as $key => $value) {
        $st = $conn->prepare("SELECT * FROM nationality WHERE id = ? LIMIT 1");
        $st->execute([(int)$value['nationalityId']]);
        $recipes[$key]['nationality'] = $st->fetch(PDO::FETCH_ASSOC);
        unset($recipes[$key]['nationalityId']);
      }
    } catch (PDOException $e) {
      error_log($e->getMessage());
      $response = new Response($e->getMessage(), true, $e->getMessage());
      die();
    }
    $conn = null;
    return $recipes;
  }

  private static function addCosts($recipes){
    try {
      $conn = DBmodel::connect();
      foreach ($recipes as $key => $value) {
        $st = $conn->prepare("SELECT * FROM cost WHERE id = ? LIMIT 1");
        $st->execute([(int)$value['costId']]);
        $recipes[$key]['cost'] = $st->fetch(PDO::FETCH_ASSOC);
        unset($recipes[$key]['costId']);
      }
    } catch (PDOException $e) {
      error_log($e->getMessage());
      $response = new Response($e->getMessage(), true, $e->getMessage());
      die();
    }
    $conn = null;
    return $recipes;
  }

  private static function addReviews($recipes){
    try {
      $conn = DBmodel::connect();
      foreach ($recipes as $key => $value) {
        $st = $conn->prepare("SELECT review.created, review.comment, review.rating, review.moderated, user.name AS userName, user.id AS userId, user.avatar AS avatar FROM review JOIN user ON review.userId = user.id WHERE recipeId = ?");
        $st->execute([(int)$value['recipeId']]);
        $recipes[$key]['reviews'] = $st->fetchAll(PDO::FETCH_ASSOC);
      }
    } catch (PDOException $e) {
      error_log($e->getMessage());
      $response = new Response($e->getMessage(), true, $e->getMessage());
      die();
    }
    $conn = null;
    return $recipes;
  }

  private static function addCreator($recipes){
    try {
      $conn = DBmodel::connect();
      foreach ($recipes as $key => $value) {
        $st = $conn->prepare("SELECT user.id, user.name, user.description, user.avatar FROM user WHERE user.id = ? LIMIT 1");
        $st->execute([(int)$value['userId']]);
        $recipes[$key]['creator'] = $st->fetch(PDO::FETCH_ASSOC);
      }
    } catch (PDOException $e) {
      error_log($e->getMessage());
      $response = new Response($e->getMessage(), true, $e->getMessage());
      die();
    }
    $conn = null;
    return $recipes;
  }

  private static function addIngredients($recipes){
    try {
      $conn = DBmodel::connect();
      foreach ($recipes as $key => $value) {
        $st = $conn->prepare("SELECT ingredient.name, ingredient.quantity, ingredient.measurementId AS measurementId, measurement.name AS measurementName, measurement.shortName AS measurementShortName FROM ingredient JOIN measurement ON ingredient.measurementId = measurement.id WHERE recipeId = ?");
        $st->execute([(int)$value['recipeId']]);
        $recipes[$key]['ingredients'] = $st->fetchAll(PDO::FETCH_ASSOC);
      }
    } catch (PDOException $e) {
      error_log($e->getMessage());
      $response = new Response($e->getMessage(), true, $e->getMessage());
      die();
    }
    $conn = null;
    return $recipes;
  }

  private static function addDirections($recipes){
    try {
      $conn = DBmodel::connect();
      foreach ($recipes as $key => $value) {
        $st = $conn->prepare("SELECT direction FROM direction WHERE recipeId = ?");
        $st->execute([(int)$value['recipeId']]);
        $recipes[$key]['directions'] = $st->fetchAll(PDO::FETCH_COLUMN);
      }
    } catch (PDOException $e) {
      error_log($e->getMessage());
      $response = new Response($e->getMessage(), true, $e->getMessage());
      die();
    }
    $conn = null;
    return $recipes;
  }
}
