<?php
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  $response = RecipeAPI::getListBy('label');
}
