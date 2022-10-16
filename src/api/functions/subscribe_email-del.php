<?php


function subscribeEmail($email)
{
  try {
  $conn = DBmodel::connect();
  $sql = "SELECT id FROM subscriber WHERE email = :email LIMIT 1";

  $st = $conn->prepare($sql);

  $st->bindValue(":email", $email, PDO::PARAM_STR);

  $st->execute();
  $results = $st->fetchAll(PDO::FETCH_ASSOC);
  $countOfResults = count($results);
  if ($countOfResults > 0){
    $response = new Response(200, false, ['duplicated' => 'Ezzel az e-mail címmel már feliratkoztak!']);
    return $response;
    die();
  }
  else{
    $sql = "INSERT INTO subscriber (email, date, unsubscribeHash) VALUES (:email, :date, :unsubscribeHash)";
    $st = $conn->prepare($sql);
    $st->bindValue(":email", $email, PDO::PARAM_STR);
    $st->bindValue(":date", date("Y-m-d H:i:s"), PDO::PARAM_STR);
    $st->bindValue(":unsubscribeHash", hash("sha256", $email . date('Y-M-D-H:i:s')), PDO::PARAM_STR);
    $st->execute();
  } 


} 
catch (Exception $e) {
  error_log($e->getMessage());
  $response = new Response(400, true, $e->getMessage());
  return $response;
  die();
}
$conn = null;
$response = new Response(200, false, 'Sikeres feliratkozás.');
return $response;

  
}

