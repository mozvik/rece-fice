<?php
$environmentVariables = [];
require_once("environment.php");

if ( !isset($environmentVariables["PRODUCTION"]) || $environmentVariables["PRODUCTION"] == false) {
  error_reporting(E_ALL);
  ini_set("display_errors", "on");
  
  $environmentVariables = setDevelopmentEnvironment($environmentVariables);
}

date_default_timezone_set("Europe/Budapest");
define("DB_DSN", "mysql:host={$environmentVariables["DB_DSN"]};dbname={$environmentVariables["DB_NAME"]};charset=utf8");
define("DB_USERNAME", $environmentVariables["DB_USERNAME"]);
define("DB_PASSWORD", $environmentVariables["DB_PASSWORD"]);
define("MAILER_HOST", $environmentVariables["MAILER_HOST"]);
define("MAILER_USERNAME", $environmentVariables["MAILER_USERNAME"]);
define("MAILER_PASSWORD", $environmentVariables["MAILER_PASSWORD"]);
define("SECRET_KEY", "rece-@#1_FICE");
define("SESSION_TIMEOUT", 3600);
define("API_URL", $environmentVariables["API_URL"]);
define("RECOVERY_URL", $environmentVariables["RECOVERY_URL"]);
define("URL", $environmentVariables["URL"]);
define("ROOT", $_SERVER['DOCUMENT_ROOT'] . '/rece-fice');

function handleException($exception)
{

  echo "Sorry, a problem occurred: " . json_encode($exception->getMessage());
  error_log($exception->getMessage());
}

set_exception_handler('handleException');

function console_log($data)
{
  echo '<script>';
  echo 'console.log(' . json_encode($data) . ')';
  echo '</script>';
}

function setDevelopmentEnvironment($environmentVariables)
{
  $environmentVariables["DB_DSN"] = "localhost";
  $environmentVariables["DB_USERNAME"] = "root";
  $environmentVariables["DB_PASSWORD"] = "";
  $environmentVariables["DB_NAME"] = "recefice";
  $environmentVariables["MAILER_HOST"] = "smtp.gmail.com";
  $environmentVariables["MAILER_USERNAME"] = "recefice.recepttar@gmail.com";
  $environmentVariables["MAILER_PASSWORD"] = "fwukybwymzqxppey";
  $environmentVariables["RECOVERY_URL"] = "http://localhost/angular/rece-fice/src/recovery";
  $environmentVariables["API_URL"] = "http://localhost/angular/rece-fice/src/api";
  $environmentVariables["URL"] = "http://localhost:4200/angular/rece-fice/";
  return $environmentVariables;
}
