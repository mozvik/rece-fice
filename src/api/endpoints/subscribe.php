<?php
if (isset($_POST['email'])) {
 
  $email = filter_input(INPUT_POST,'email', FILTER_VALIDATE_EMAIL);
  if($email == false){
    $response = new Response(400, true, 'Nem megfelelő email formátum.');
    return $response;
  }
  
  $response = RecipeAPI::subscribeEmail($email);
}
