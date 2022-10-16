<?php
abstract class ListBuilder{

  public static function getUserRecipes($query, $userId)
  {
    $conn = DBmodel::connect();
    
    try {
      $st = $conn->prepare($query);
      $st->execute([$userId]);
      $recipes = $st->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
      error_log($e->getMessage());
      $response = new Response(400, true, $e->getMessage());
      die();
    }
    $conn = null;
  
    $recipes = RecipeBuilder::add($recipes);
  
    return ["itemCount" => count($recipes), "totalResults" => 'N/A', "items" => $recipes];
  }

  public static function getList($query, $idx = NULL)
  {
      $conn = DBmodel::connect();
   
    try {
      $st = $conn->prepare($query);
      if ($idx == NULL) {
        $st->execute();
      } else {
        $st->execute([$idx]);
      }
      $recipes = $st->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
      error_log($e->getMessage());
      $response = new Response(400, true, $e->getMessage());
      die();
    }
    $conn = null;
  
    $recipes = RecipeBuilder::add($recipes);
  
    return ["itemCount" => count($recipes), "totalResults" => 'N/A', "items" => $recipes];
  }

  public static function getDaily($itemsPerPage)
  {
    $conn = DBmodel::connect();
  
    try {
  
      $sql = "SELECT recipeId FROM recipe WHERE moderated != 1";
      $st = $conn->prepare($sql);
      $st->execute();
      $recipes = $st->fetchAll(PDO::FETCH_COLUMN);
      if (count($recipes) < $itemsPerPage) {
        $itemsPerPage = count($recipes);
      }
  
      $seed = floor(time() / 86400);
      srand($seed);
      $randomRecipes = [];
  
      do {
        $index = rand(0, count($recipes) - 1);
        if (array_search($recipes[$index], $randomRecipes) === false) {
          array_push($randomRecipes, $recipes[$index]);
        }
      } while (count($randomRecipes) != $itemsPerPage);
  
      $sql = "SELECT * FROM recipe WHERE " .
        implode(" ", array_fill(0, $itemsPerPage, 'recipeId = ? OR'));
      $sql = substr($sql, 0, strrpos($sql, ' OR'));
  
      $st = $conn->prepare($sql);
      $st->execute($randomRecipes);
      $recipes = $st->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
      error_log($e->getMessage());
      $response = new Response(400, true, $e->getMessage());
      die();
    }
    $conn = null;
  
    $recipes = RecipeBuilder::add($recipes);
  
    return ["itemCount" => count($recipes), "totalResults" => 'N/A', "items" => $recipes];
  }

  public static function getFree($itemsPerPage)
  {
    $conn = DBmodel::connect();
  
    try {
  
      $sql = "SELECT recipe.recipeId FROM recipe
    JOIN recipe_labels ON recipe.recipeId=recipe_labels.recipeId 
    WHERE (recipe_labels.labelId=8 
    OR recipe_labels.labelId=3 OR recipe_labels.labelId=5
    OR recipe_labels.labelId=6 OR recipe_labels.labelId=7) AND moderated != 1
    GROUP BY recipe.recipeId";
  
      $st = $conn->prepare($sql);
      $st->execute();
      $recipes = $st->fetchAll(PDO::FETCH_COLUMN);
      if (count($recipes) < $itemsPerPage) {
        $itemsPerPage = count($recipes);
      }
  
      $randomRecipes = [];
  
      do {
        $index = rand(0, count($recipes) - 1);
        if (array_search($recipes[$index], $randomRecipes) === false) {
          array_push($randomRecipes, $recipes[$index]);
        }
      } while (count($randomRecipes) != $itemsPerPage);
  
      $sql = "SELECT * FROM recipe WHERE " .
        implode(" ", array_fill(0, $itemsPerPage, 'recipeId = ? OR'));
      $sql = substr($sql, 0, strrpos($sql, ' OR'));
  
      $st = $conn->prepare($sql);
      $st->execute($randomRecipes);
      $recipes = $st->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
      error_log($e->getMessage());
      $response = new Response(400, true, $e->getMessage());
      die();
    }
    $conn = null;
    $recipes = RecipeBuilder::add($recipes);
  
    return ["itemCount" => count($recipes), "totalResults" => 'N/A', "items" => $recipes];
  }

  public static function getSimilarRecipes($recipeId)
  {
    $conn = DBmodel::connect();
  
    try {
      $sql = "SELECT * FROM recipe WHERE recipeId = ? LIMIT 1";
      $st = $conn->prepare($sql);
      $st->execute([$recipeId]);
      $recipe = $st->fetch(PDO::FETCH_ASSOC);
      if (count($recipe) == 0) {
        return "No recipe with id " . $recipeId . " found";
        die();
      }
      $catId = $recipe['categoryId'];
      $natId = $recipe['nationalityId'];
      $sql = "SELECT recipeId FROM recipe 
      WHERE (categoryId = ? OR nationalityId = ?) AND moderated != 1";
      $st = $conn->prepare($sql);
      $st->execute([$catId, $natId]);
      $similarRecipesByCatNat = $st->fetchAll(PDO::FETCH_COLUMN);
  
      $sql = "SELECT DISTINCT recipe_labels.recipeId FROM recipe_labels 	
      JOIN recipe ON recipe_labels.recipeId = recipe.recipeId 
      WHERE recipe_labels.labelId IN (SELECT DISTINCT recipe_labels.labelId FROM recipe_labels, recipe
      WHERE recipe_labels.recipeId = ?)  AND recipe.moderated != 1";
      $st = $conn->prepare($sql);
      $st->execute([$recipeId]);
      $similarRecipesByLabel = $st->fetchAll(PDO::FETCH_COLUMN);
  
      $dumpArray = array_unique(array_merge($similarRecipesByCatNat, $similarRecipesByLabel));
      $idx = array_search($recipeId, $dumpArray);
      if ($idx !== false) {
        unset($dumpArray[$idx]);
      }
      $dumpArray = array_values(array_filter($dumpArray));
  
      $randomRecipes = [];
  
      if (count($dumpArray) > 4) {
        do {
          $index = rand(0, count($dumpArray) - 1);
          if (array_search($dumpArray[$index], $randomRecipes) === false) {
            array_push($randomRecipes, $dumpArray[$index]);
          }
        } while (count($randomRecipes) != 4);
      }
  
      $dumpArray = $randomRecipes;
 
      $sql = "SELECT * FROM recipe WHERE " .
        implode(" ", array_fill(0, count($dumpArray), 'recipeId = ? OR'));
      $sql = substr($sql, 0, strrpos($sql, ' OR'));
      $sql .= " AND recipe.moderated != 1";
      $st = $conn->prepare($sql);
      $st->execute($dumpArray);
      $recipes = $st->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
      error_log($e->getMessage());
      $response = new Response(400, true, $e->getMessage());
      die();
    }
    $conn = null;
    $recipes = RecipeBuilder::add($recipes);
  
    return ["itemCount" => count($recipes), "totalResults" => count($recipes), "items" => $recipes];
  }
}
