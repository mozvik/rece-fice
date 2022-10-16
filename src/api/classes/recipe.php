<?php

/**
 * Recept osztály. 
 * A receptek adatait tárolja.
 */
class Recipe
{
  public $recipeId; //id a recipe tábla AUTO increment idje
  public $recipeName; //a recept neve
  public $ingredients = array(); //hozzávalók
  public $directions = array(); //elkészítési javaslatok
  public $created; //éééé-hh-nn hh:mm:ss
  public $updated; //éééé-hh-nn hh:mm:ss
  public $userId; //jelenleg INT de TODO: user osztály egy egyede
  public $cookingTime; //elkészítési idő percben
  public $difficulty = [
    "id" => "",
    "name" => "",
  ]; //nehézség
  public $cost = [
    "id" => "",
    "name" => "",
  ]; // ár
  public $category = [
    "id" => "",
    "name" => "",
  ]; //kategória
  public $nationality = [
    "id" => "",
    "name" => "",
  ]; //nemzetközi étel
  public $image = []; //image1 url
  public $calorie; //kalória
  public $protein; //fehérje
  public $carbonhydrate; //szénhidrát
  public $fat; //zsír
  public $sugar; //cukor
  public $servings; //hány főre
  public $ratings; //átlagos értékelés
  public $reviews = []; //hozzászólások értékelések
  public $labels = [
    "id" => "",
    "name" => "",
  ]; //címkék



  /**
   * __construct
   * Summary: Recipe (Recept) osztály konstruktora.
   * Egy asszociatív tömbbel lehet létrehozni az osztálypéldányt.
   * @param int $recipeId
   * @param string recipeName
   * @param array ingredients
   * @param array directions
   * @param string created
   * @param string updated
   * @param int userId
   * @param int cookingTime
   * @param array difficulty
   * @param array cost
   * @param array category
   * @param array nationality
   * @param array image
   * @param int calorie
   * @param float protein
   * @param float carbonhydrate
   * @param float fat
   * @param float sugar
   * @param int servings
   * @param float ratings
   * @param any reviews
   * @param any labels
   * @return void
   */
  public function __construct($data = array())
  {
    if (isset($data['recipeId'])) $this->recipeId = (int) $data['recipeId'];
    if (isset($data['recipeName'])) $this->recipeName = $data['recipeName'];
    if (isset($data['ingredients'])) $this->ingredients = (array) $data['ingredients'];
    if (isset($data['directions'])) $this->directions = (array) $data['directions'];
    if (isset($data['created'])) $this->created = $data['created'];
    if (isset($data['updated'])) $this->updated = $data['updated'];
    if (isset($data['userId'])) $this->userId = (int) $data['userId'];
    if (isset($data['cookingTime'])) $this->cookingTime = (int) $data['cookingTime'];
    if (isset($data['difficulty'])) $this->difficulty = (array) $data['difficulty'];
    if (isset($data['cost'])) $this->cost = (array) $data['cost'];
    if (isset($data['category'])) $this->category = (array) $data['category'];
    if (isset($data['nationality'])) $this->nationality = (array) $data['nationality'];
    if (isset($data['image'])) $this->image = (array) $data['image'];
    if (isset($data['calorie'])) $this->calorie = (int) $data['calorie'];
    if (isset($data['protein'])) $this->protein = (float) $data['protein'];
    if (isset($data['carbonhydrate'])) $this->carbonhydrate = (float) $data['carbonhydrate'];
    if (isset($data['fat'])) $this->fat = (float) $data['fat'];
    if (isset($data['sugar'])) $this->sugar = (float) $data['sugar'];
    if (isset($data['servings'])) $this->servings = (int) $data['servings'];
    if (isset($data['ratings'])) $this->ratings = (float) $data['ratings'];
    if (isset($data['reviews'])) $this->reviews =  $data['reviews'];
    if (isset($data['labels'])) $this->labels =  $data['labels'];
  }
  public function getId()
  {
    return $this->recipeId;
  }
}



//INSERT INTO `user` (`id`, `name`, `email`, `password`, `active`, `userCreated`, `lastLogin`, `userUpdated`, `role`) VALUES (NULL, 'Atika', 'mozvik@yahoo.com', '$2y$10$u4vORc424GeBpMQMuy9zoe7oavUkTdsduKu.x16IhKRgvsXvMU21O', '1', '2021-06-07 19:03:46.000000', NULL, NULL, 'SuperAdmin');