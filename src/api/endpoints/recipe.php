<?php
$id = strtok($_SERVER['QUERY_STRING'], '=');


if ($_SERVER['REQUEST_METHOD'] === 'GET') { 
  // require('functions/get_recipe.php');
  $response = RecipeAPI::Get();
} else if ($_SERVER['REQUEST_METHOD'] === 'DELETE'){
  // require('functions/delete_recipe.php');
  $response = RecipeAPI::Delete();
}
else if ($_SERVER['REQUEST_METHOD'] === 'POST' && !isset($_POST['_method'])) { //upload-create recipe
  $response = RecipeAPI::Post();
}
else if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['_method']) && $_POST['_method'] === 'PUT') { //update recipe
  $response = RecipeAPI::Put();
}






