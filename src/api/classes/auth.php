<?php
abstract class Auth{

  public static function login(){
    $errors = [];

    if (!isset($_POST['password']) && !isset($_POST['email'])) {
        $errors['request'] = 'Bad request';
        $response = new Response(400, true, $errors);
        return $response;
        die();
    }

    $email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
    if (!$email) {
        $errors['email'] = 'Érvénytelen email formátum!';
    }
    $password = filter_input(INPUT_POST, 'password');
    if (empty($password)) {
        $errors['password'] = 'Kötelező kitölteni!';
    } elseif (!$password) {
        $errors['password'] = 'Érvénytelen formátum!';
    }

    $user = User::getByEmail($email);
    if ($user === null) {
        $errors['email'] = 'Nem megfelelő email/jelszó páros!';
        $errors['password'] = 'Nem megfelelő email/jelszó páros!';
    }

    if (!isset($_SESSION['loginattempts'])) $_SESSION['loginattempts'] = 0;
    if (!empty($errors)) {
        $response = new Response(200, false, [
            'errors' => $errors
        ]);
        return $response;
        die();
    }

    if (self::checkLoginTimeout($user) === true) {
        if ($user !== null && password_verify($password, $user->passwordHash))  //ezt majd visszaállitani
        //if ($user !== null && $password === $user->passwordHash) // ideiglenes check hash nélkül
        {
            if (!$user->active) {
                $errors['inactive'] = 'A felhasználó inaktív.';
                $response = new Response(200, false, [
                    'errors' => $errors
                ]);
                return $response;
                die();
            }
            
            $user->lastLogin = date("Y-m-d H:i:s");
            $user->sessionId = session_id(); 
            
            $user->token = Session::generateToken($user->sessionId . $user->email . SECRET_KEY);
            $user->sessionTime = time(); 
            $session = new Session(array("sid" => $user->sessionId, "stoken" => $user->token, "stime" => $user->sessionTime));
            $_SESSION['userdata'] = [
                'userId' => $user->id,
                'username' => $user->name,
                'email' => $user->email,
                'sid' => $user->sessionId,
                'loggedIn' => true
            ];
            $_SESSION['loginattempts'] = $user->loginAttempts = 0;
            $user->lockoutTime = 0;
            $user->updateLoginAttempts();
            
            $session->delete();
            $session->insert();

            $user->updateLastLogin(); 

        } else {
            $_SESSION['loginattempts']++;
            $user->loginAttempts++;
            $user->lockoutTime = time();
            $user->updateLoginAttempts();
            $errors['email'] = 'Nem megfelelő email/jelszó páros!';
            $errors['password'] = 'Nem megfelelő email/jelszó páros!';
            $response = new Response(200, false, [
                'errors' => $errors
            ]);
            return $response;
            die();
        }
    } else {
        if ($user->active === false) {
            $errors['lockout'] = 'A felhasználó inaktív. Vegye fel a kapcsolatot egy adminisztrátorral.';
            $response = new Response(200, false, [
                'errors' => $errors
            ]);
            return $response;
            die();
        } else {
            $errors['lockout'] = 'Próbálkozz ' . Self::checkLoginTimeout($user) . ' múlva.';
            $response = new Response(200, false, [
                'errors' => $errors
            ]);
            return $response;
            die();
        }
    }
    $userStats = User::getUserStatistics($user->id);
    if (!$userStats) {
        $response = new Response(200, false, null);
        return;
    }

    $data = [
        'userId' => $user->id,
        'name' => $user->name,
        'email' => $user->email,
        'created' => $user->created,
        'password' => '',
        'avatar' => $user->avatar,
        'role' => $user->role,
        'active' => $user->active,
        'description' => $user->description,
        'totalReviews' => $userStats['totalReviews'],
        'totalRecipes' => $userStats['totalRecipes'],
        'totalFavorites' => $userStats['totalFavorites']
    ];

    $response = new Response(200, false, $data);
    return $response;
  }

  public static function userAuthentication()
  {
      Session::deleteExpiredSessions(time() - SESSION_TIMEOUT); 
      if (!isset($_SESSION) && !isset($_SESSION['userdata']) && !$_SESSION['userdata']['loggedIn']) {
          return false; 
      }
  
      $session = Session::getBySessionId(session_id());
  
      if ($session != null && Session::generateToken($_SESSION['userdata']['sid'] . $_SESSION['userdata']['email'] . SECRET_KEY) === $session->stoken) {
          $session->updateSessionTime();
          return true;
      }
      return false;
  }

  public static function register()
  {
      $errors = [];
  
      if (!isset($_POST['passwordNew']) && !isset($_POST['passwordConfirm']) && !isset($_POST['email']) && !isset($_POST['name']) && !isset($_POST['gdpr'])) {
          $errors['request'] = 'Bad request';
          $response = new Response(400, true, $errors);
          return $response;
          die();
      }
  
      $passwordNew = filter_input(INPUT_POST, 'passwordNew', FILTER_DEFAULT);
      if (empty($passwordNew)) {
          $errors['passwordNew'] = 'Kötelező kitölteni!';
      } elseif (!$passwordNew) {
          $errors['passwordNew'] = 'Érvénytelen formátum!';
      }
      $passwordConfirm = filter_input(INPUT_POST, 'passwordConfirm', FILTER_DEFAULT);
      if (empty($passwordConfirm)) {
          $errors['passwordConfirm'] = 'Kötelező kitölteni!';
      } elseif (!$passwordConfirm) {
          $errors['passwordConfirm'] = 'Érvénytelen formátum!';
      }
  
  
      $gdpr = filter_input(INPUT_POST, 'gdpr', FILTER_DEFAULT);
      if (!$gdpr && ($gdpr != true) || $gdpr != 'true') {
          $errors['gdpr'] = 'Kötelező elfogadni.';
      }
  
  
      $name = filter_input(INPUT_POST, 'name', FILTER_DEFAULT);
      if (empty($name)) {
          $errors['name'] = 'Kötelező kitölteni!';
      } elseif (!$name || mb_strlen($name) < 4) {
          $errors['name'] = 'Minimum 4 karakter legyen!';
      }
  
      $email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
      if (!$email) {
          $errors['email'] = 'Érvénytelen formátum!';
      } elseif (User::hasField('email', $email)) {
          $errors['email'] = 'Ez az e-mail cím már foglalt!';
      }
  
      if (!empty($passwordNew) && $passwordNew !== $passwordConfirm) {
          $errors['passwordNew'] = 'A két jelszó nem azonos!';
          $errors['passwordConfirm'] = 'A két jelszó nem azonos!';
      }
  
      if (mb_strlen($passwordNew) < 8) {
          $errors['passwordNew'] = 'Minimum 8 karakter legyen!';
      }
      if (mb_strlen($passwordConfirm) < 8) {
          $errors['passwordConfirm'] = 'Minimum 8 karakter legyen!';
      }
  
      if (!empty($errors)) {
          $response = new Response(200, false, [
              'errors' => $errors
          ]);
          return $response;
          die();
      }
  
  
  
      $user = new User();
      $user->name = $name;
      $user->email = $email;
      $user->passwordHash = User::generateHash($passwordNew);
  
  
      $user->active = true;
      $user->created = date("Y-m-d H:i:s");
  
      $response = $user->insertUser();
      if (is_a($response->response, 'User')) {
          $data = [
              'userId' => $response->response->id,
              'name' => $response->response->name,
              'email' => $response->response->email,
              'password' => '',
              'avatar' => $response->response->avatar,
              'role' => $response->response->role,
              'active' => $response->response->active,
          ];
          return new Response(200, false, $data);
      }
  
      return $response;
  }

  public static function logout()
  {
      if (isset($_SESSION['userdata']['sid'])) {
          Session::deleteSession($_SESSION['userdata']['sid']);
      }
      $_SESSION = [];
      session_destroy();
  }

  public static function updateUserAvatar()
  {
      require('functions/upload_images.php');
      $id = filter_input(INPUT_POST, 'id', FILTER_VALIDATE_INT);
      if (!$id) {
          return new Response(400, true, false);
      }
      $files = $_FILES;
      $url = uploadImages($files, true);
      User::updateAvatar($id, $url[0]);
      return $url;
  }

  public static function updateUserCredentials()
  {
      $errors = [];
  
      $name = filter_input(INPUT_POST, 'name', FILTER_DEFAULT);
      if (!$name) {
          $errors['name'] = 'Érvénytelen név!';
      } else if (strlen($name) < 4) {
          $errors['name'] = 'Minimum 4 karakter!';
      }
  
      $email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
      if (!$email) {
          $errors['email'] = 'Érvénytelen email formátum!';
      }
  
  
      $passwordCurrent = filter_input(INPUT_POST, 'passwordCurrent');
      if (empty($passwordCurrent)) {
          $errors['passwordCurrent'] = 'Kötelező kitölteni!';
      } elseif (!$passwordCurrent) {
          $errors['passwordCurrent'] = 'Érvénytelen jelszó!';
      }
  
      $passwordNew = filter_input(INPUT_POST, 'passwordNew');
      $passwordNewCheck = filter_input(INPUT_POST, 'passwordNewCheck');
      if (!empty($passwordNew) && $passwordNew !== $passwordNewCheck) {
          $errors['passwordNew'] = 'A két jelszó nem azonos!';
          $errors['passwordNewCheck'] = 'A két jelszó nem azonos!';
      }
  
      $id = filter_input(INPUT_POST, 'id', FILTER_DEFAULT);
      if (!$id) {
          $errors['id'] = 'Érvénytelen ID';
      }
  
      $user = User::getById($id);
      if ($user === null) {
          $errors['id'] = 'Felhasználó nem található (ID)';
      }
  
      if ($user->email !== $email) {
          if (User::hasField('email', $email)) {
              $errors['email'] = 'Ez az email cím már foglalt!';
          }
      }
  
  
      if (!empty($errors)) {
          $response = new Response(200, false, [
              'errors' => $errors
          ]);
          return $response;
          die();
      }

      if ($user !== null && password_verify($passwordCurrent, $user->passwordHash))
      {
          if (!$user->active) {
              $errors['inactive'] = 'A felhasználó inaktív.';
              $response = new Response(200, false, [
                  'errors' => $errors
              ]);
              return $response;
              die();
          }
      } else {
  
          $errors['email'] = 'Nem megfelelő email/jelszó páros!';
          $errors['passwordCurrent'] = 'Nem megfelelő email/jelszó páros!';
          $response = new Response(200, false, [
              'errors' => $errors
          ]);
          return $response;
          die();
      }

      $user->name = $name;
      $user->email = $email;
      if (!empty($passwordNew) && $passwordNew === $passwordNewCheck) {
          $user->passwordHash = User::generateHash($passwordNew);
      }
      $user->description = $_POST['description'];
      $user->active = true;
      $user->updated = date("Y-m-d H:i:s");
      $user->updateUser();
  
      $responseData = [
          'userId' => $user->id,
          'name' => $user->name,
          'email' => $user->email,
          'created' => $user->created,
          'password' => '',
          'avatar' => $user->avatar,
          'role' => $user->role,
          'active' => $user->active,
          'description' => $user->description,
      ];
  
      $response = new Response(200, false, $responseData);
      return $response;
  }
  
  public static function resetPassword()
  {
      $errors = [];
  
      if (!isset($_POST['password1']) && !isset($_POST['password2']) && !isset($_POST['token'])) {
          $errors['request'] = 'Bad request';
          $response = new Response(400, true, $errors);
          return $response;
          die();
      }
  
      $password1 = filter_input(INPUT_POST, 'password1', FILTER_DEFAULT);
      if (empty($password1)) {
          $errors['password1'] = 'Kötelező kitölteni!';
      } elseif (!$password1) {
          $errors['password1'] = 'Érvénytelen formátum!';
      }
      $password2 = filter_input(INPUT_POST, 'password2', FILTER_DEFAULT);
      if (empty($password2)) {
          $errors['password2'] = 'Kötelező kitölteni!';
      } elseif (!$password2) {
          $errors['password2'] = 'Érvénytelen formátum!';
      }
  
      if (!empty($password1) && $password1 !== $password2) {
          $errors['password1'] = 'A két jelszó nem azonos!';
          $errors['password2'] = 'A két jelszó nem azonos!';
      }
  
      if (mb_strlen($password1) < 8) {
          $errors['password1'] = 'Minimum 8 karakter legyen!';
      }
      if (mb_strlen($password2) < 8) {
          $errors['password2'] = 'Minimum 8 karakter legyen!';
      }  
  
      $token = filter_input(INPUT_POST, 'token', FILTER_DEFAULT);
      $tokenCheck = User::validateRecoveryToken($token);
      if (empty($token)) {
          $errors['token'] = 'Hiányzó token';
      } elseif (!$token) {
          $errors['token'] = 'Érvénytelen token';
      } elseif (isset($tokenCheck->response['error'])) {
          $errors['token'] = $tokenCheck->response['error'];
      }
  
  
      if (!empty($password1) && $password1 !== $password2) {
          $errors['password1'] = 'A két jelszó nem azonos!';
          $errors['password2'] = 'A két jelszó nem azonos!';
      }
      if (!empty($errors)) {
          $response = new Response(200, false, [
              'errors' => $errors
          ]);
          return $response;
          die();
      }
  
      $passwordHash = User::generateHash($password1);
      $response = User::passwordRecovery($token, $passwordHash);
  
      return $response;
  }

  public static function activateUser()
  {
    if($_SESSION['userdata']['username']!=='Admin'){
        $response = new Response(403, true, 'Unauthorized request');
        return $response;
      }
      
      $id = filter_input(INPUT_POST, 'id', FILTER_SANITIZE_NUMBER_INT);
      if (!$id) {
        $response = new Response(200, false, null);
        return;
      }
      $user = User::getByID($id);
      if (!$user) {
        $response = new Response(200, false, null);
        return;
      }
      $user->active = true;
      $user->loginAttempts = 0;
      $user->lockoutTime = 0;
      $user->updateUser();
      
      $responseData = [
        'id' => $user->id,
        'active' => $user->active,
      ];
      return $response = new Response(200, false, $responseData);
  }

  public static function banUser()
  {
    if($_SESSION['userdata']['username']!=='Admin'){
        $response = new Response(403, true, 'Unauthorized request');
        return $response;
      }
      
      $id = filter_input(INPUT_POST, 'id', FILTER_SANITIZE_NUMBER_INT);
      if (!$id) {
        $response = new Response(200, false, null);
        return;
      }
      $user = User::getByID($id);
      if (!$user) {
        $response = new Response(200, false, null);
        return;
      }
      $user->active = false;
      $user->updateUser();
      
      $responseData = [
        'id' => $user->id,
        'active' => $user->active,
      ];
      return $response = new Response(200, false, $responseData);
  }

  public static function moderateReview()
  {
    if($_SESSION['userdata']['username']!=='Admin'){
        $response = new Response(403, true, 'Unauthorized request');
        return $response;
      }
      
      $id = filter_input(INPUT_POST, 'id', FILTER_SANITIZE_NUMBER_INT);
      if (!$id) {
        $response = new Response(200, false, null);
        return;
      }
      
      $conn = DBmodel::connect();
      try {
        $st = $conn->prepare("UPDATE review SET moderated = ? WHERE id = ? LIMIT 1");
        $st->execute(['1', $id]);
        $conn = null;
        } catch (Exception $e) {
          $response = new Response(400, true, $e->getMessage());
          return;
        }
        
        $responseData = [
        'id' => $id
      ];
      return $response = new Response(200, false, $responseData);
      
  }

  public static function activateReview()
  {
    if($_SESSION['userdata']['username']!=='Admin'){
        $response = new Response(403, true, 'Unauthorized request');
        return $response;
      }
      
      $id = filter_input(INPUT_POST, 'id', FILTER_SANITIZE_NUMBER_INT);
      if (!$id) {
        $response = new Response(200, false, null);
        return;
      }
      
      $conn = DBmodel::connect();
      try {
        $st = $conn->prepare("UPDATE review SET moderated = ? WHERE id = ? LIMIT 1");
        $st->execute(['0', $id]);
        $conn = null;
        } catch (Exception $e) {
          $response = new Response(400, true, $e->getMessage());
          return;
        }
        
        $responseData = [
        'id' => $id
      ];
      return $response = new Response(200, false, $responseData);
  }

  public static function moderateRecipe()
  {
    if($_SESSION['userdata']['username']!=='Admin'){
        $response = new Response(403, true, 'Unauthorized request');
        return $response;
      }
      
      $id = filter_input(INPUT_POST, 'id', FILTER_SANITIZE_NUMBER_INT);
      if (!$id) {
        $response = new Response(200, false, null);
        return;
      }
      
      $conn = DBmodel::connect();
      try {
        $st = $conn->prepare("UPDATE recipe SET moderated = ? WHERE recipeId = ? LIMIT 1");
        $st->execute(['1', $id]);
        $conn = null;
        } catch (Exception $e) {
          $response = new Response(400, true, $e->getMessage());
          return;
        }
        
        $responseData = [
        'id' => $id
      ];
      return $response = new Response(200, false, $responseData);
  }

  public static function activateRecipe()
  {
    if($_SESSION['userdata']['username']!=='Admin'){
        $response = new Response(403, true, 'Unauthorized request');
        return $response;
      }
      
      $id = filter_input(INPUT_POST, 'id', FILTER_SANITIZE_NUMBER_INT);
      if (!$id) {
        $response = new Response(200, false, null);
        return;
      }
      
      $conn = DBmodel::connect();
      try {
        $st = $conn->prepare("UPDATE recipe SET moderated = ? WHERE recipeId = ? LIMIT 1");
        $st->execute(['0', $id]);
        $conn = null;
        } catch (Exception $e) {
          $response = new Response(400, true, $e->getMessage());
          return;
        }
        
        $responseData = [
        'id' => $id
      ];
      return $response = new Response(200, false, $responseData);
      
  }

  /**
 * Ha még lehet loginnal próbálkozni true,
 * egyébként a hátralévő time lock idejét adja vissza
 * 
 * @param  User $user
 * @return mixed true ha nincs timeout
 * @return mixed false ha le van tiltva
 * @return mixed string hátralévő idő óra:perc:másodperc 
 */
private static function checkLoginTimeout(User $user)
{
    if ($user->loginAttempts < 3) {
        return true;
    }
    $rt = time() - $user->lockoutTime;
    if ($user->loginAttempts == 3) { // 5perc
        if ($rt < 300) {
            $arr = explode(':', date('i:s', 300 - $rt));
            return $arr[0] . ' perc ' . $arr[1] . ' másodperc ';
        } else {
            return true;
        }
    }
    if ($user->loginAttempts == 4) { // 30perc
        if ($rt < 1800) {
            $arr = explode(':', date('i:s', 1800 - $rt));
            return $arr[0] . ' perc ' . $arr[1] . ' másodperc ';
        } else {
            return true;
        }
    }
    if ($user->loginAttempts == 5) { // 120perc
        if ($rt < 7200) {
            $arr = explode(':', date('h:i:s', 7200 - $rt));
            return $arr[0] - 1 . ' óra ' . $arr[1] . ' perc ' . $arr[2] . ' másodperc ';
        } else {
            return true;
        }
    }
    if ($user->loginAttempts > 5) { // inactive + mail
        if ($user->active === true) {
            $user->active = false;
            $user->updateUserActive();
            return 'A belépés visszautasítva. Kérem vegye fel a kapcsolatot egy adminisztrátorral.';
            //include_once('../mail/sendalert.php');
        }
        return false;
    }
}

}