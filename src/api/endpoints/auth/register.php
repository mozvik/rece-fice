<?php

if (filter_input(INPUT_POST, 'subscribe', FILTER_VALIDATE_BOOLEAN)) {
  if (isset($_POST['email'])) {
    $email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
    if (!$email) {
      $errors['email'] = 'Érvénytelen formátum!';
      $response = new Response(200, false, [
        'errors' => $errors
    ]);
    return $response;
    die();
    } elseif (!User::isSubscriber( $email)) {
      $response = RecipeAPI::subscribeEmail($email);
    }
  }
}

$response = Auth::register();
