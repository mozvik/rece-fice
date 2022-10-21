<?php
require_once("../settings.php");
spl_autoload_register(function ($type) {
  require_once("../classes/$type.php");
});

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['token'])) {
  $token = filter_input(INPUT_GET, 'token', FILTER_DEFAULT);
  if (!$token) {
    $error = ['format' => 'Érvénytelen token formátum!'];
  } else {
    $error = User::validateRecoveryToken($token);
  }

  if (is_bool($error)) {
    unset($error);
  }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['password']) && isset($_POST['confirm'])) {
  $password = filter_input(INPUT_POST, 'password', FILTER_DEFAULT);
  $confirm = filter_input(INPUT_POST, 'confirm', FILTER_DEFAULT);
  $token = filter_input(INPUT_POST, 'token', FILTER_DEFAULT);
  if (!$password || !$confirm) {
    $passwordError = 'Érvénytelen jelszó!';
  } else if (strlen($password) < 8 || strlen($confirm) < 8) {
    $passwordError = 'Túl rövid jelszó!';
  } else if ($password !== $confirm) {
    $passwordError = 'A jelszavak nem azonosak!';
  } else{

    $response = Auth::resetPassword($password, $token);
    if($response->isError){
      $passwordError = 'Ismeretlen hiba történt.';
    }
    else{
      $passwordOk = true;
    }
  }
}

?>


<!DOCTYPE html>
<html lang="hu">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Jelszó visszaállítás</title>
  <style>
    html,
    body {
      margin: 0;
      padding: 0;
      background-color: lightslategrey;
      font-family: Arial, Helvetica, sans-serif;
      width: 100%;
    }

    .container {
      max-width: 400px;
      width: 100%;
      margin: auto;
    }

    h2 {
      margin-top: 5rem;
      text-align: center;
    }

    p,
    h3 {
      text-align: center;
    }

    .inner-container {
      border: 2px solid gainsboro;
      border-radius: 12px;
      padding: 1rem;
      max-width: 360px;
      width: auto;
      margin: 1rem;
      display: flex;
      flex-direction: column;
    }

    form>div {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: flex-start;
    }

    label {
      padding-bottom: .5rem;
      width: 100%;
    }

    input,
    button {
      color: teal;
      width: 100%;
      padding: .5rem 1rem;
      font-size: 16px;
      border-style: none;
      border-radius: 6px;
      outline: none;
      transition: all .2s ease;
    }

    input[type=button]:hover,
    button:hover {
      cursor: pointer;
      background-color: gainsboro;
      transition: all .2s ease;
    }

    .hidden {
      display: none;
    }

    .error {
      color: brown;
      padding-bottom: 1rem;
      margin: 0 auto;
    }
  </style>
</head>

<body>


  <div class="container">
    <?php if (isset($error)) {
      echo "<div>
          <h2>" . $error[array_key_first($error)] . "</h2>
        </div>";
    } ?>

    <div class="new-password-box <?php echo isset($error) && $_SERVER['REQUEST_METHOD'] === 'GET' || isset($passwordOk) ? 'hidden' : '' ?>">
      <h2>Új jelszó beállítása</h2>
      <p><small>Minimum 8 karakter hosszú jelszót adj meg.</small></p>
      <form class="inner-container" action="" method="POST">
        <div>
          <input type="hidden" name="token" value="<?php echo isset($token) ? $token:'' ?>">
        </div>
        <div>
          <label for="password">Jelszó</label>
          <input type="password" id="password" name="password"><br>
        </div>
        <div>
          <label for="confirm">Jelszó újra</label>
          <input type="password" id="confirm" name="confirm"><br><br>
        </div>
        <div class="error">
          <span><?php echo isset($passwordError) ? $passwordError : ''; ?></span>
        </div>
        <button type="submit">Ok</button>
      </form>
    </div>

    <div class="new-password-box <?php echo $_SERVER['REQUEST_METHOD'] === 'GET' && !isset($passwordOk) ? 'hidden' : '' ?>">
      <div class="inner-container">
        <h3>Sikeres jelszóváltoztatás!</h3>
        <input type="button" id="backToLoginPage" value="Vissza a recepttárba">
      </div>

    </div>
  </div>
  <script>
    document.getElementById("backToLoginPage").addEventListener('click', (event) => {
      event.preventDefault()
      location.href = "<?php echo URL .'login' ?>";
    })
  </script>

</body>

</html>