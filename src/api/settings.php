<?php

$environmentVariables = [
  "DB_DSN" => getenv("DB_DSN"),
  "DB_USERNAME" => getenv("DB_USERNAME"),
  "DB_PASSWORD" => getenv("DB_PASSWORD"),
  "dbname" => getenv("dbname"),
  "MAILER_HOST" => getenv("MAILER_HOST"),
  "MAILER_USERNAME" => getenv("MAILER_USERNAME"),
  "MAILER_PASSWORD" => getenv("MAILER_PASSWORD")
];

if (getenv('production') == false) {
  error_reporting(E_ALL);
  ini_set("display_errors", "on");
  $environmentVariables = setDevelopmentEnvironment($environmentVariables);
}

date_default_timezone_set("Europe/Budapest");
define("DB_DSN", "mysql:host={$environmentVariables["DB_DSN"]};dbname={$environmentVariables["dbname"]};charset=utf8");
define("DB_USERNAME", $environmentVariables["DB_USERNAME"]);
define("DB_PASSWORD", $environmentVariables["DB_PASSWORD"]);
define("MAILER_HOST", $environmentVariables["MAILER_HOST"]);
define("MAILER_USERNAME", $environmentVariables["MAILER_USERNAME"]);
define("MAILER_PASSWORD", $environmentVariables["MAILER_PASSWORD"]);
define("SECRET_KEY", "rece-@#1_FICE");
define("SESSION_TIMEOUT", 3600);
define("API_URL", "http://localhost/angular/rece-fice/src/api");
define("RECOVERY_URL", "http://localhost/angular/rece-fice/src/api/recovery");
define("URL", "http://localhost:4200/angular/rece-fice/");
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
  $environmentVariables["dbname"] = "recefice";
  $environmentVariables["MAILER_HOST"] = "smtp.gmail.com";
  $environmentVariables["MAILER_USERNAME"] = "recefice.recepttar@gmail.com";
  $environmentVariables["MAILER_PASSWORD"] = "fwukybwymzqxppey";
  return $environmentVariables;
}
