<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
require 'vendor/autoload.php';

$mail = new PHPMailer(true);

$email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
if (!$email) {
  $errors['email'] = 'Érvénytelen formátum!';
} 
elseif (!User::hasField('email', $email)) {
  // Nem található ilyen email cím a rendszerben!;
  // Ne segítsük a hackereket, tegyünk úgy mintha létezne az email cim a rendszerben de nem fog levélküldés történni 
  $response = new Response(200, false, []);
  return $response;
  die();
}



$length = 16; 
$token = bin2hex(random_bytes($length)); // bin2hex output -> url safe.
$response = User::setRecoveryToken($email, $token);

if($response===true) {
  try {
    //Server settings
    $mail->SMTPDebug = 0;                      // Enable verbose debug output
    $mail->isSMTP();                           // Set mailer to use SMTP
    $mail->Host = 'mail.elin.hu';              // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                    // Enable SMTP authentication
    $mail->Username = 'info@esoguides.hu';     // SMTP username
    $mail->Password = '5610Levelek';           // SMTP password
    $mail->SMTPSecure = 'tls';                 // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 587;                         // TCP port to connect to
    $mail->CharSet = 'UTF-8';
    //Recipients
    $mail->setFrom('recefice@esoguides.hu', 'Recefice Recepttár');   //feladó
    //$mail->addAddress('joe@example.net', 'Joe User');     // Add a recipient
    //$mail->addAddress('joe@example.net');          //címzett, Name is optional
    $mail->addReplyTo('recefice@esoguides.hu', 'Recefice Recepttár');
    //$mail->addCC('cc@example.com');
    //$mail->addBCC('bcc@example.com');
  
    //Attachments
    //$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
    //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
  
    //Content
    $mail->isHTML(true);               // Set email format to HTML
    $mail->Subject = 'Jelszó visszaállítás';
    $mail->Body = '<h1>Kattintson a következő linkre a jelszó visszaállításához:</h1><br><a href="' . RECOVERY_URL . '/' . $token.'" target="_blank">Új jelszó beállítása</a>';
    $mail->addAddress($email); 
    $mail->send();
    } catch (Exception $e) {
      $errors['email'] = 'Hiba a levelek küldése közben!'; 
      $response = new Response(200, false, [
          'errors' => $errors]);
      return $response;
      die();
    }

    $response = new Response(200, false, [$token]);
}

