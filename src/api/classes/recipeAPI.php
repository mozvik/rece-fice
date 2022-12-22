<?php
abstract class RecipeAPI
{

  public static function Get()
  {
    $id = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_NUMBER_INT);

    $conn = DBmodel::connect();

    try {
      $st = $conn->prepare("SELECT * FROM recipe WHERE recipeId = ? LIMIT 1");
      $st->execute([$id]);
      $recipe = $st->fetchAll(PDO::FETCH_ASSOC);

      $recipe = RecipeBuilder::add($recipe);
      $response = new Response(200, false, $recipe);
    } catch (PDOException $e) {
      error_log($e->getMessage());
      $response = new Response($e->getMessage(), true, $e->getMessage());
    }
    $conn = null;
    return $response;
  }

  public static function Put()
  {

    $recipe = new Recipe(json_decode($_POST['recipe'], true));
    $files = $_FILES;

    $uploadedFilenames = Self::uploadImages($files);


    if (!is_array($uploadedFilenames) || count($uploadedFilenames) === 0) {
      $response = new Response(400, true, 'There was an error uploading file.');
      return $response;
      die();
    }

    $conn = DBmodel::connect();

    try {
      $conn->beginTransaction();
      $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      // query Recept

      $sql = "SELECT image1, image2, image3 FROM recipe WHERE recipeId = :reid LIMIT 1";
      $st = $conn->prepare($sql);
      $st->bindValue(":reid", $recipe->getId(), PDO::PARAM_INT);
      $st->execute();
      $originalFilenames = $st->fetch(PDO::FETCH_NUM);
      $originalFilenames = array_filter($originalFilenames);

      $sql = "UPDATE recipe SET
       recipeName = :recipeName, updated = :updated, userId = :userId, cookingTime = :cookingTime, difficultyId = :difficultyId, costId = :costId, categoryId = :categoryId, nationalityId = :nationalityId, image1 = :image1, image2 = :image2, image3 = :image3, calorie = :calorie, protein = :protein, carbonhydrate = :carbonhydrate, fat = :fat, sugar = :sugar, servings = :servings
      WHERE recipeId = :reid";

      $st = $conn->prepare($sql);
      $st->bindValue(":reid", $recipe->getId(), PDO::PARAM_INT);
      $st->bindValue(":recipeName", $recipe->recipeName, PDO::PARAM_STR);
      $st->bindValue(":updated", date("Y-m-d h:i:s"), PDO::PARAM_STR);
      $st->bindValue(":userId", $recipe->userId, PDO::PARAM_INT);
      $st->bindValue(":cookingTime", $recipe->cookingTime, PDO::PARAM_INT);
      $st->bindValue(":difficultyId", $recipe->difficulty['id'], PDO::PARAM_INT);
      $st->bindValue(":costId", $recipe->cost['id'], PDO::PARAM_INT);
      $st->bindValue(":categoryId", $recipe->category['id'], PDO::PARAM_INT);
      $st->bindValue(":nationalityId", $recipe->nationality['id'], PDO::PARAM_INT);
      $st->bindValue(":image1", count($uploadedFilenames) >= 0 ? $uploadedFilenames[0] : '', PDO::PARAM_STR);
      $st->bindValue(":image2", count($uploadedFilenames) >= 2 ? $uploadedFilenames[1] : '', PDO::PARAM_STR);
      $st->bindValue(":image3", count($uploadedFilenames) == 3 ? $uploadedFilenames[2] : '', PDO::PARAM_STR);

      $st->bindValue(":calorie", $recipe->calorie, PDO::PARAM_INT);
      $st->bindValue(":protein", $recipe->protein, PDO::PARAM_STR);
      $st->bindValue(":carbonhydrate", $recipe->carbonhydrate, PDO::PARAM_STR);
      $st->bindValue(":fat", $recipe->fat, PDO::PARAM_STR);
      $st->bindValue(":sugar", $recipe->sugar, PDO::PARAM_STR);
      $st->bindValue(":servings", $recipe->servings, PDO::PARAM_INT);

      $st->execute();

      //hozzávalók törlés + insert
      $sql = "DELETE FROM ingredient WHERE recipeId = :reid";
      $st = $conn->prepare($sql);
      $st->bindValue(":reid", $recipe->getId(), PDO::PARAM_INT);
      $st->execute();

      $st = $conn->prepare("INSERT INTO ingredient (quantity, name, measurementId, recipeId)
      VALUES (?,?,?,?)");

      foreach ($recipe->ingredients as $key => $value) {
        $st->execute(array($value['quantity'], $value['name'], (int)$value['measurementId'], $recipe->getId()));
      }

      //elkészítés lépései törlés + insert
      $sql = "DELETE FROM direction WHERE recipeId = :reid";
      $st = $conn->prepare($sql);
      $st->bindValue(":reid", $recipe->getId(), PDO::PARAM_INT);
      $st->execute();

      $st = $conn->prepare("INSERT INTO direction (direction, recipeId)
      VALUES (?,?)");

      foreach ($recipe->directions as $key => $value) {
        $st->execute(array($value, $recipe->getId()));
      }

      // query Címkék delete + insert


      $sql = "DELETE FROM recipe_labels WHERE recipeId = :reid";
      $st = $conn->prepare($sql);
      $st->bindValue(":reid", $recipe->getId(), PDO::PARAM_INT);
      $st->execute();

      $st = $conn->prepare("INSERT INTO recipe_labels (recipeId, labelId)
      VALUES (?,?)");

      foreach ($recipe->labels as $key => $value) {
        $st->execute(array(
          $recipe->getId(), $value['id']
        ));
      }

      if (!Self::removeFiles($originalFilenames, $uploadedFilenames)) {
        throw new Exception("There was an error deleting file.", 1);
      }

      $sql = "SELECT * FROM recipe WHERE recipeId = :reid LIMIT 1";
      $st = $conn->prepare($sql);
      $st->bindValue(":reid", $recipe->getId(), PDO::PARAM_INT);
      $st->execute();
      $updatedRecipe = $st->fetch(PDO::FETCH_ASSOC);

      $conn->commit();
    } catch (Exception $e) {
      $conn->rollBack();
      $response = new Response(400, true, $e->getMessage());
      return $response;
    }
    $conn = null;
    $response = new Response(200, false, [
      "result" => "The recipe " . $recipe->recipeName . " has been updated.",
      "id" => $recipe->getId()
    ]);
    return $response;
  }

  public static function Post()
  {

    $recipe = new Recipe(json_decode($_POST['recipe'], true));
    $files = $_FILES;

    $uploadedFilenames = Self::uploadImages($files);

    if (!is_array($uploadedFilenames) || count($uploadedFilenames) === 0) {
      $response = new Response(400, true, 'There was an error uploading file.');
      return $response;
      die();
    }

    $conn = DBmodel::connect();

    try {
      $conn->beginTransaction();
      $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      // query Recept
      $sql = "INSERT INTO recipe 
        ( recipeName, created, userId, cookingTime, difficultyId, costId, categoryId, nationalityId, image1, image2, image3, calorie, protein, carbonhydrate, fat, sugar, servings )
        VALUES 
        (:recipeName,:created,:userId,:cookingTime,:difficultyId,:costId,:categoryId,:nationalityId,:image1,:image2,:image3,:calorie,:protein,:carbonhydrate,:fat,:sugar,:servings)";

      $st = $conn->prepare($sql);
      $st->bindValue(":recipeName", $recipe->recipeName, PDO::PARAM_STR);
      $st->bindValue(":created", date("Y-m-d h:i:s"), PDO::PARAM_STR);
      $st->bindValue(":userId", $recipe->userId, PDO::PARAM_INT);
      $st->bindValue(":cookingTime", $recipe->cookingTime, PDO::PARAM_INT);
      $st->bindValue(":difficultyId", $recipe->difficulty['id'], PDO::PARAM_INT);
      $st->bindValue(":costId", $recipe->cost['id'], PDO::PARAM_INT);
      $st->bindValue(":categoryId", $recipe->category['id'], PDO::PARAM_INT);
      $st->bindValue(":nationalityId", $recipe->nationality['id'], PDO::PARAM_INT);
      $st->bindValue(":image1", count($uploadedFilenames) >= 0 ? $uploadedFilenames[0] : '', PDO::PARAM_STR);
      $st->bindValue(":image2", count($uploadedFilenames) > 1 ? $uploadedFilenames[1] : '', PDO::PARAM_STR);
      $st->bindValue(":image3", count($uploadedFilenames) > 2 ? $uploadedFilenames[2] : '', PDO::PARAM_STR);
      $st->bindValue(":calorie", $recipe->calorie, PDO::PARAM_INT);
      $st->bindValue(":protein", $recipe->protein, PDO::PARAM_STR);
      $st->bindValue(":carbonhydrate", $recipe->carbonhydrate, PDO::PARAM_STR);
      $st->bindValue(":fat", $recipe->fat, PDO::PARAM_STR);
      $st->bindValue(":sugar", $recipe->sugar, PDO::PARAM_STR);
      $st->bindValue(":servings", $recipe->servings, PDO::PARAM_INT);

      $st->execute();

      $id = $conn->lastInsertId();
      //hozzávalók 
      $st = $conn->prepare("INSERT INTO ingredient (quantity, name, measurementId, recipeId)
      VALUES (?,?,?,?)");

      foreach ($recipe->ingredients as $key => $value) {
        $st->execute(array($value['quantity'], $value['name'], (int)$value['measurementId'], $id));
      }

      //elkészítés lépései 

      $st = $conn->prepare("INSERT INTO direction (direction, recipeId)
      VALUES (?,?)");

      foreach ($recipe->directions as $key => $value) {
        $st->execute(array($value, $id));
      }



      // query Címkék

      $st = $conn->prepare("INSERT INTO recipe_labels (recipeId, labelId) VALUES (?,?)");

      foreach ($recipe->labels as $key => $value) {
        $st->execute(array($id, $value['id']));
      }

      $conn->commit();
    } catch (Exception $e) {
      $conn->rollBack();
      Self::deleteImages($uploadedFilenames);
      $response = new Response(400, true, $e->getMessage());
      return $response;
    }
    $conn = null;
    $response = new Response(200, false, [
      "result" => "The recipe " . $recipe->recipeName . " has been uploaded.",
      "id" => $id
    ]);
    return $response;
  }

  public static function Delete()
  {
    if (!isset($_GET['id'])) {
      $response = new Response(400, true, 'Bad request.');
      return $response;
    }

    if (!Auth::userAuthentication()) {
      $response = new Response(200, false, 'Authorization failed');
      return $response;
      die();
    }

    $recipeId = $_GET['id'];

    $conn = DBmodel::connect();

    try {
      $conn->beginTransaction();
      $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

      $sql = "SELECT image1, image2, image3 FROM recipe WHERE recipeId = :reid LIMIT 1";

      $st = $conn->prepare($sql);
      $st->bindValue(":reid", $recipeId, PDO::PARAM_INT);
      $st->execute();
      $files = $st->fetch(PDO::FETCH_NUM);
      $files = array_filter($files);

      $sql = "DELETE FROM review WHERE recipeId = :reid";

      $st = $conn->prepare($sql);
      $st->bindValue(":reid", $recipeId, PDO::PARAM_INT);
      $st->execute();

      $sql = "DELETE FROM recipe_labels WHERE recipeId = :reid";

      $st = $conn->prepare($sql);
      $st->bindValue(":reid", $recipeId, PDO::PARAM_INT);
      $st->execute();

      $sql = "DELETE FROM ingredient WHERE recipeId = :reid";

      $st = $conn->prepare($sql);
      $st->bindValue(":reid", $recipeId, PDO::PARAM_INT);
      $st->execute();

      $sql = "DELETE FROM direction WHERE recipeId = :reid";

      $st = $conn->prepare($sql);
      $st->bindValue(":reid", $recipeId, PDO::PARAM_INT);
      $st->execute();

      $sql = "DELETE FROM recipe WHERE recipeId = :reid";

      $st = $conn->prepare($sql);
      $st->bindValue(":reid", $recipeId, PDO::PARAM_INT);
      $st->execute();

      $conn->commit();
    } catch (Exception $e) {
      $conn->rollBack();
      $response = new Response(400, true, $e->getMessage());
      return $response;
      die();
    }
    Self::deleteImages($files);
    $conn = null;
    $response = new Response(200, false, [
      "result" => "The recipe has been deleted.",
      "id" => $recipeId
    ]);
    return $response;
  }

  public static function getListBy($tableName)
  {
    try {
      $conn = DBmodel::connect();
      $sql = "SELECT * FROM " . $tableName;
      $st = $conn->prepare($sql);
      $st->execute();
      $rows = $st->fetchAll(PDO::FETCH_ASSOC);
      if (count($rows) === 0) return ["itemCount" => 0, "totalResults" => 0, "items" => null];
      $conn = null;
    } catch (PDOException $e) {
      error_log($e->getMessage());
      return new Response(400, true, $e->getMessage());
    }

    return new Response(200, false, $rows);
  }

  public static function subscribeEmail($email)
  {
    if (User::isSubscriber($email)) {
      $response = new Response(200, false, ['duplicated' => 'Ezzel az e-mail címmel már feliratkoztak!']);
      return $response;
      die();
    } else {
      try {
        $conn = DBmodel::connect();
        $sql = "INSERT INTO subscriber (email, date, unsubscribeHash) VALUES (:email, :date, :unsubscribeHash)";
        $st = $conn->prepare($sql);
        $st->bindValue(":email", $email, PDO::PARAM_STR);
        $st->bindValue(":date", date("Y-m-d H:i:s"), PDO::PARAM_STR);
        $st->bindValue(":unsubscribeHash", hash("sha256", $email . date('Y-M-D-H:i:s')), PDO::PARAM_STR);
        $st->execute();
        $conn = null;
        $response = new Response(200, false, 'Sikeres feliratkozás.');
        return $response;
      } catch (Exception $e) {
        error_log($e->getMessage());
        $response = new Response(400, true, $e->getMessage());
        return $response;
        die();
      }
    }
  }

  public static function uploadImages($images)
  {
    $arr = [];

    if (file_exists('../assets/uploads')) {
      if (!is_dir('../assets/uploads')) {
        mkdir('../assets/uploads', 0777);
      }
    } else {
      mkdir('../assets/uploads', 0777);
    }

    $target_dir = "assets/uploads/";

    foreach ($images as $key => $value) {

      if (!file_exists('../' . $target_dir . $value["name"])) {
        do {
          $target_file =  $target_dir . date("Y-m-d-h-i-sa") . '_' . uniqid() . basename($value["name"]);
        } while (file_exists('../' . $target_file));


        $uploadOk = false;
        // FAKE image?
        $check = getimagesize($value["tmp_name"]);
        if ($check !== false) {
          $uploadOk = true;
        } else {
          $uploadOk = false;
        }
        if (!$uploadOk) {
          return false;
        } else {
          if (!move_uploaded_file($value["tmp_name"], '../' . $target_file)) {
            return false;
          } else {
            array_push($arr, $target_file);
          }
        }
      } else {
        array_push($arr, $target_dir . $value["name"]);
      }
    }
    return $arr;
  }

  private static function deleteImages($images)
  {
    for ($i = 0; $i < count($images); $i++) {
      $dd = $images[$i];
      if (!unlink('../' . $images[$i])) {
        $response = new Response(400, true, 'There was an error deleting file.');
        return $response;
        die();
      }
    }
  }

  private static function removeFiles($original, $uploaded)
  {
    foreach ($original as $key => $value) {
      if (
        array_search($value, $uploaded) === false &&
        $value !== '' && $value !== null
      ) {
        if (!unlink('../' . $value)) {
          return false;
        }
      }
    }
    return true;
  }
}
