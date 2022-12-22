<?php

/**
 * User osztály. 
 * A belépett felhasználó adatait tárolja.
 */
class User
{
  public $id; //id az user DB tábla AUTO increment es idje
  public $email; //email
  public $passwordHash; //pw hash
  public $sessionId;
  public $token; //session token ami egyedi általam összerakott: sessionID + email + SECRET_KEY(settings.phpban)
  public $sessionTime; //unix time int
  public $name; //username
  public $active; //true false
  public $created; //éééé-hh-nn hh:mm:ss
  public $lastLogin; //éééé-hh-nn hh:mm:ss
  public $updated; //éééé-hh-nn hh:mm:ss
  public $loginAttempts; //login próbálkozások száma
  public $lockoutTime; //UNIX timestamp a lockout lejárat nyomon követésére
  public $description; //rólam
  public $avatar; //image url
  public $role; //jogosultság
  public $recoveryToken; //pw reset token
  public $recoveryTimer; //pw reset time


  /**
   * __construct
   * Summary: User (Felhasználó) osztály konstruktora.
   * Egy asszociatív tömbbel lehet létrehozni az osztálypéldányt.
   * @param  int $data 'id'
   * @param  string $data 'email'
   * @param  string $data 'passwordHash'
   * @param  string $data 'sessionId'
   * @param  int $data 'sessionTime'
   * @param  string $data 'name'
   * @param  boolean $data 'active'
   * @param  string $data 'lastLogin'
   * @param  string $data 'created'
   * @param  string $data 'updated'
   * @param  int $data 'loginAttempts'
   * @param  int $data 'lockoutTime'
   * @param  int $data 'roles'
   * @param  string $data 'description'
   * @param  string $data 'avatar'
   * @param  string $data 'recoveryToken'
   * @param  string $data 'recoveryTimer'
   * @return void
   */
  public function __construct($data = array())
  {
    if (isset($data['id'])) $this->id = (int) $data['id'];
    if (isset($data['email'])) $this->email = $data['email'];
    if (isset($data['passwordHash'])) $this->passwordHash = $data['passwordHash'];
    if (isset($data['sessionId'])) $this->sessionId = $data['sessionId'];
    if (isset($data['sessionTime'])) $this->sessionTime = (int) $data['sessionTime'];
    if (isset($data['name'])) $this->name = $data['name'];
    if (isset($data['active'])) $this->active = (bool) $data['active'];
    if (isset($data['lastLogin'])) $this->lastLogin = $data['lastLogin'];
    if (isset($data['created'])) $this->created = $data['created'];
    if (isset($data['updated'])) $this->updated = $data['updated'];
    if (isset($data['loginAttempts'])) $this->loginAttempts = $data['loginAttempts'];
    if (isset($data['lockoutTime'])) $this->lockoutTime = $data['lockoutTime'];
    if (isset($data['roles'])) $this->roles = $data['roles'];
    if (isset($data['modules'])) $this->modules = $data['modules'];
    if (isset($data['description'])) $this->description = $data['description'];
    if (isset($data['avatar'])) $this->avatar = $data['avatar'];
    if (isset($data['role'])) $this->role = $data['role'];
    if (isset($data['recoveryToken'])) $this->recoveryToken = $data['recoveryToken'];
    if (isset($data['recoveryTimer'])) $this->recoveryTimer = $data['recoveryTimer'];
  }
  public function getId()
  {
    return $this->id;
  }
  /**
   * Csatlakozik a settings.php-ban megadott adatbázishoz
   * 
   * @return $conn egy PDO objektum
   */
  private static function DBconn()
  { //db csatlakozási kísérlet
    try {
      $conn = new PDO(DB_DSN, DB_USERNAME, DB_PASSWORD);
    } catch (PDOException $e) {
      error_log($e->getMessage());
      exit('Sikertelen csatlakozás az adatbázishoz.');
    }
    return $conn;
  }

  public static function generateHash($text)
  {
    return password_hash($text, PASSWORD_BCRYPT);
  }


  /**
   * User lekér Email alapján
   *
   * @param string email
   * @return User|null 
   */

  public static function getByEmail($email)
  {
    $conn = User::DBconn();
    $sql = "SELECT * FROM user WHERE email = :email LIMIT 1";
    $st = $conn->prepare($sql);
    $st->bindValue(":email", $email, PDO::PARAM_STR);
    $st->execute();
    $row = $st->fetch(PDO::FETCH_ASSOC);
    $conn = null;
    if ($row) return new User($row);
  }
  public static function getByID($id)
  {
    $conn = User::DBconn();
    $sql = "SELECT * FROM user WHERE id = :id LIMIT 1";
    $st = $conn->prepare($sql);
    $st->bindValue(":id", $id, PDO::PARAM_INT);
    $st->execute();
    $row = $st->fetch();
    $conn = null;
    if ($row) {
      $obj = new User($row);
      return $obj;
    }
  }
  public static function getUserList()
  {
    $conn = User::DBconn();
    $sql = "SELECT * FROM user";
    $st = $conn->prepare($sql);
    $st->execute();
    $rows = $st->fetchAll(PDO::FETCH_ASSOC);
    $conn = null;
    if ($rows && count($rows) > 0) {
      $arr = [];
      foreach ($rows as $key => $value) {
        $user = new User($value);
        $user->passwordHash = '';
        array_push($arr, $user);
      }

      return $arr;
    }
  }
  public static function getUserStatistics($id)
  {
    $conn = User::DBconn();
    $sql = "SELECT COUNT(userId) FROM review 
      WHERE userId = :id";
    $st = $conn->prepare($sql);
    $st->bindValue(":id", $id, PDO::PARAM_INT);
    $st->execute();
    $totalReviews = (int)$st->fetch(PDO::FETCH_COLUMN);

    $sql = "SELECT COUNT(userId) FROM recipe 
      WHERE userId = :id";
    $st = $conn->prepare($sql);
    $st->bindValue(":id", $id, PDO::PARAM_INT);
    $st->execute();
    $totalRecipes = (int)$st->fetch(PDO::FETCH_COLUMN);

    $sql = "SELECT COUNT(userId) FROM user_favorites 
      WHERE userId = :id";
    $st = $conn->prepare($sql);
    $st->bindValue(":id", $id, PDO::PARAM_INT);
    $st->execute();
    $totalFavorites = (int)$st->fetch(PDO::FETCH_COLUMN);

    $conn = null;
    return [
      'totalReviews' => $totalReviews,
      'totalRecipes' => $totalRecipes,
      'totalFavorites' => $totalFavorites
    ];
  }

  /**
   * van már ilyen $value a $field oszlopban az adatbázisban?
   * 
   * @param  string $field
   * @param  string $value
   * @return boolean  true-van | false-nincs
   */
  public static function hasField($field, $value)
  {
    $conn = User::DBconn();
    $sql = 'SELECT ' . $field . ' FROM user WHERE ' . $field . ' = :val';
    $st = $conn->prepare($sql);
    $st->bindValue(":val",  $value, PDO::PARAM_STR);
    $st->execute();
    $row = $st->fetch(PDO::FETCH_ASSOC);
    $conn = null;
    if (empty($row)) return false;
    else  return true;
  }

  /**
   * fel van már iratkozva hírlevélre?
   * 
   * @param  string $email
   * @return boolean  true-igen | false-nem
   */
  public static function isSubscriber($email)
  {
    try {
      $conn = User::DBconn();
      $sql = "SELECT id FROM subscriber WHERE email = :email LIMIT 1";
      $st = $conn->prepare($sql);
      $st->bindValue(":email",  $email, PDO::PARAM_STR);
      $st->execute();
      $row = $st->fetch(PDO::FETCH_ASSOC);
      $conn = null;
      if (empty($row)) return false;
      else  return true;
    } catch (Exception $e) {
      error_log($e->getMessage());
      $response = new Response(400, true, $e->getMessage());
      return $response;
      die();
    }
  }

  /**
   * Utolsó bejelentkezés idejét írja be az adatbázisba
   *
   * @return void
   */
  public function updateLastLogin()
  {
    $conn = User::DBconn();
    try {  //updt
      $sql = "UPDATE user SET lastLogin=:lastLogin WHERE id = :id";
      $st = $conn->prepare($sql);
      $st->bindValue(":id", $this->id, PDO::PARAM_INT);
      $st->bindValue(":lastLogin",  $this->lastLogin, PDO::PARAM_STR);
      $st->execute();
    } catch (PDOException $e) {
      error_log($e->getMessage());
      exit('Sikertelen módosítás az adatbázisban.');
    }
    $conn = null;
  }

  public function insertUser()
  {
    $conn = User::DBconn();
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    try { //user táblába felvitel      
      $sql = "INSERT INTO user ( name , email , passwordHash , active , created, role ) VALUES (:name, :email, :passwordHash, :active, :created, :role)";
      $st = $conn->prepare($sql);
      $st->bindValue(":name", $this->name, PDO::PARAM_STR);
      $st->bindValue(":email", $this->email, PDO::PARAM_STR);
      $st->bindValue(":passwordHash", $this->passwordHash, PDO::PARAM_STR);
      $st->bindValue(":active", $this->active, PDO::PARAM_INT);
      $st->bindValue(":created", $this->created, PDO::PARAM_STR);
      $st->bindValue(":role", 0, PDO::PARAM_INT);

      $st->execute();
      $this->id = $conn->lastInsertId();
      $conn = null;
    } catch (PDOException $e) {
      error_log($e->getMessage());
      return new Response(400, true, $e->getMessage());
    }
    return new Response(200, false, $this);
  }

  //inkább updt useractive metodust
  // public static function deleteUser($id){
  //   $conn = User::DBconn();
  //   $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  //   try { 

  //     $sql = "UPDATE user SET active = :active WHERE id = :id";
  //     $st = $conn->prepare( $sql );
  //     $st->bindValue( ":id", $id, PDO::PARAM_INT );
  //     $st->bindValue( ":active", 0, PDO::PARAM_INT );
  //     $st->execute();  
  //     $conn = null;

  //   } catch (PDOException $e) {
  //     error_log($e->getMessage());
  //     return new Response(400, true, $e->getMessage());
  //   }

  // }

  public function updateUser()
  {
    $conn = User::DBconn();
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    try { //user táblába felvitel      

      $sql = "UPDATE user SET name = :name , email = :email , passwordHash = :passwordHash, active = :active, updated = :updated, description = :description, avatar = :avatar, loginAttempts = :loginAttempts, lockoutTime = :lockoutTime WHERE id = :id";
      $st = $conn->prepare($sql);
      $st->bindValue(":name", $this->name, PDO::PARAM_STR);
      $st->bindValue(":email", $this->email, PDO::PARAM_STR);
      $st->bindValue(":passwordHash", $this->passwordHash, PDO::PARAM_STR);
      $st->bindValue(":active", $this->active, PDO::PARAM_INT);
      $st->bindValue(":updated", $this->updated, PDO::PARAM_STR);
      $st->bindValue(":id", $this->id, PDO::PARAM_INT);
      $st->bindValue(":description", $this->description, PDO::PARAM_STR);
      $st->bindValue(":avatar", $this->avatar, PDO::PARAM_STR);
      $st->bindValue(":loginAttempts", $this->loginAttempts, PDO::PARAM_INT);
      $st->bindValue(":lockoutTime", $this->lockoutTime, PDO::PARAM_INT);
      $st->execute();
      $conn = null;
    } catch (PDOException $e) {
      error_log($e->getMessage());
      return new Response(400, true, $e->getMessage());
    }
  }

  public function updateLoginAttempts()
  {
    $conn = User::DBconn();
    try {  //updt
      $sql = "UPDATE user SET loginAttempts=:loginAttempts, lockoutTime=:lockoutTime WHERE id = :id";
      $st = $conn->prepare($sql);
      $st->bindValue(":id", $this->id, PDO::PARAM_INT);
      $st->bindValue(":loginAttempts",  $this->loginAttempts, PDO::PARAM_INT);
      $st->bindValue(":lockoutTime",  $this->lockoutTime, PDO::PARAM_INT);
      $st->execute();
      $conn = null;
    } catch (PDOException $e) {
      error_log($e->getMessage());
      return new Response(400, true, $e->getMessage());
    }
  }
  public function updateUserActive()
  {
    $conn = User::DBconn();
    try {  //updt
      $sql = "UPDATE user SET active=:active WHERE id = :id";
      $st = $conn->prepare($sql);
      $st->bindValue(":id", $this->id, PDO::PARAM_INT);
      $st->bindValue(":active",  $this->active, PDO::PARAM_INT);
      $st->execute();
      $conn = null;
    } catch (PDOException $e) {
      error_log($e->getMessage());
      return new Response(400, true, $e->getMessage());
    }
  }
  public static function setFavorites($userId, $recipeId, $flag)
  {
    $conn = User::DBconn();
    try {
      $sql = "SELECT recipeId FROM user_favorites WHERE userId = :uid AND recipeId = :rid LIMIT 1";
      $st = $conn->prepare($sql);
      $st->bindValue(":uid", $userId, PDO::PARAM_INT);
      $st->bindValue(":rid", $recipeId, PDO::PARAM_INT);
      $st->execute();
      $row = $st->fetch(PDO::FETCH_COLUMN);
      if (!$row && !$flag) {
        return new Response(200, false, 'Nincs ilyen recept.');
      } else if (!!$row && $flag == true) {
        return new Response(200, false, 'Már kedvenc.');
      }

      if ($flag) {
        $sql = "INSERT INTO user_favorites ( userId , recipeId ) VALUES (:uid, :rid)";
        $st = $conn->prepare($sql);
        $st->bindValue(":uid", $userId, PDO::PARAM_INT);
        $st->bindValue(":rid", $recipeId, PDO::PARAM_INT);
        $st->execute();
        $conn = null;
        return new Response(200, false, 'Sikeresen hozzáadva a kedvencekhez.');
      } else {
        $sql = "DELETE FROM user_favorites WHERE userId = :uid AND recipeId = :rid";
        $st = $conn->prepare($sql);
        $st->bindValue(":uid", $userId, PDO::PARAM_INT);
        $st->bindValue(":rid", $recipeId, PDO::PARAM_INT);
        $st->execute();
        $conn = null;
        return new Response(200, false, 'Sikeresen eltávolítva a kedvencekből.');
      }
    } catch (PDOException $e) {
      error_log($e->getMessage());
      return new Response(400, true, $e->getMessage());
    }
  }

  public static function getFavorites($id)
  {
    $conn = User::DBconn();
    try {
      $sql = "SELECT recipeId FROM user_favorites WHERE userId = :id";
      $st = $conn->prepare($sql);
      $st->bindValue(":id", $id, PDO::PARAM_INT);
      $st->execute();
      $rows = $st->fetchAll(PDO::FETCH_COLUMN);
      $conn = null;
      return new Response(200, false, $rows);
    } catch (PDOException $e) {
      error_log($e->getMessage());
      return new Response(400, true, $e->getMessage());
    }
  }

  public static function updateAvatar($id, $images)
  {
    $url = User::putAvatar($images);
    if ($url === false) {
      $response = new Response(400, true, 'Hiba történt a fájl feltöltésekor');
      return $response;
      die();
    }
    $conn = User::DBconn();
    try {
      $sql = "SELECT avatar FROM user WHERE id = :id LIMIT 1";
      $st = $conn->prepare($sql);
      $st->bindValue(":id", $id, PDO::PARAM_INT);
      $st->execute();
      $oldAvatar = $st->fetch(PDO::FETCH_NUM);

      //updt
      $sql = "UPDATE user SET avatar=:avatar WHERE id = :id";
      $st = $conn->prepare($sql);
      $st->bindValue(":id", $id, PDO::PARAM_INT);
      $st->bindValue(":avatar", $url[0]);
      $st->execute();
      $conn = null;

      if ($oldAvatar[0] !== '') {
        $res = User::unlinkAvatar($oldAvatar);
        if (!$res) {
          $response = new Response(400, true, 'There was an error deleting file.');
          return $response;
        }
      }
    } catch (PDOException $e) {
      User::unlinkAvatar($url);
      error_log($e->getMessage());
      return new Response(400, true, $e->getMessage());
    }
    return new Response(200, false, $url[0]);
  }
  public static function deleteAvatar($id)
  {

    $conn = User::DBconn();
    try {
      $sql = "SELECT avatar FROM user WHERE id = :id LIMIT 1";
      $st = $conn->prepare($sql);
      $st->bindValue(":id", $id, PDO::PARAM_INT);
      $st->execute();
      $oldAvatar = $st->fetch(PDO::FETCH_NUM);

      //updt
      $sql = "UPDATE user SET avatar=:avatar WHERE id = :id";
      $st = $conn->prepare($sql);
      $st->bindValue(":id", $id, PDO::PARAM_INT);
      $st->bindValue(":avatar", '');
      $st->execute();
      $conn = null;

      $res = User::unlinkAvatar($oldAvatar);
      if (!$res) {
        $response = new Response(400, true, 'There was an error deleting file.');
        return $response;
      }
    } catch (PDOException $e) {
      error_log($e->getMessage());
      return new Response(400, true, $e->getMessage());
    }
    return new Response(200, false, true);
  }

  public static function unlinkAvatar($images)
  {
    try {
      for ($i = 0; $i < count($images); $i++) {
        if (file_exists('../' . $images[$i])) {
          unlink('../' . $images[$i]);
        }
      }
      return true;
    } catch (\Exception $e) {
      return false;
    }
  }

  private static function putAvatar($images)
  {
    $arr = [];

    if (file_exists('../assets/uploads/avatars')) {
      if (!is_dir('../assets/uploads/avatars')) {
        mkdir('../assets/uploads/avatars', 0777);
      }
    } else {
      mkdir('../assets/uploads/avatars', 0777);
    }

    $target_dir = "assets/uploads/avatars/";


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


  public static function setRecoveryToken($email, $token)
  {
    $conn = User::DBconn();
    try {

      $sql = "UPDATE user SET recoveryToken = :recoveryToken  , recoveryTimer = :recoveryTimer WHERE email = :email LIMIT 1";
      $st = $conn->prepare($sql);
      $st->bindValue(":recoveryToken", $token, PDO::PARAM_STR);
      $st->bindValue(":email", $email, PDO::PARAM_STR);
      $st->bindValue(":recoveryTimer", time(), PDO::PARAM_INT);

      $st->execute();
      $conn = null;
    } catch (PDOException $e) {
      error_log($e->getMessage());
      return new Response(400, true, $e->getMessage());
    }
    return true;
  }

  public static function validateRecoveryToken($token)
  {
    $conn = User::DBconn();
    try {

      $sql = "SELECT recoveryTimer FROM user WHERE recoveryToken = :recoveryToken LIMIT 1";
      $st = $conn->prepare($sql);
      $st->bindValue(":recoveryToken", $token, PDO::PARAM_STR);
      $st->execute();
      $recoveryTimer = $st->fetch(PDO::FETCH_NUM);
      $conn = null;
    } catch (PDOException $e) {
      error_log($e->getMessage());
      return ['pdo' => 'Adatbázis hiba!'];
    }

    if (is_array($recoveryTimer)) {
      if (time() - (int)$recoveryTimer[0] > 3600) { // 1 óra
        return ['expired' => 'A token érvényessége lejárt'];
      }
      return true;
    } else {
      return ['format' => 'Érvénytelen token formátum!'];
    }
  }

  public static function passwordRecovery($token, $password)
  {
    $conn = User::DBconn();
    try {
      $sql = "SELECT id FROM user WHERE recoveryToken = :recoveryToken LIMIT 1";
      $st = $conn->prepare($sql);
      $st->bindValue(":recoveryToken", $token, PDO::PARAM_STR);
      $st->execute();
      $id = $st->fetch(PDO::FETCH_NUM);
      if (!is_array($id)) {
        return new Response(400, true, ['Adatbázis hiba']);
        die();
      }

      $sql = "UPDATE user SET recoveryToken = :recoveryToken  , recoveryTimer = :recoveryTimer, passwordHash = :passwordHash WHERE id = :id LIMIT 1";
      $st = $conn->prepare($sql);
      $st->bindValue(":recoveryToken", null);
      $st->bindValue(":id", $id[0], PDO::PARAM_INT);
      $st->bindValue(":passwordHash", $password, PDO::PARAM_STR);
      $st->bindValue(":recoveryTimer", null);

      $st->execute();
      $conn = null;
    } catch (PDOException $e) {
      error_log($e->getMessage());
      return new Response(400, true, $e->getMessage());
    }
    return new Response(200, false, [
      'Sikeres jelszó változtatás'
    ]);
  }
}



//INSERT INTO `user` (`id`, `name`, `email`, `password`, `active`, `userCreated`, `lastLogin`, `userUpdated`, `role`) VALUES (NULL, 'Atika', 'mozvik@yahoo.com', '$2y$10$u4vORc424GeBpMQMuy9zoe7oavUkTdsduKu.x16IhKRgvsXvMU21O', '1', '2021-06-07 19:03:46.000000', NULL, NULL, 'SuperAdmin');