<?php
error_reporting(E_ALL);
ini_set( "display_errors", "on" );
date_default_timezone_set( "Europe/Budapest" );  
define( "MAILER_HOST", "smtp.gmail.com"); 
define( "MAILER_USERNAME", "recefice.recepttar@gmail.com");
define( "MAILER_PASSWORD", "fwukybwymzqxppey");
define( "DB_DSN", "mysql:host=db;dbname=recefice;charset=utf8" );
define( "DB_USERNAME", "root" );
define( "DB_PASSWORD", "root" );
define( "SECRET_KEY", "rece-@#1_FICE" );
define( "SESSION_TIMEOUT", 3600 );
define( "API_URL", "http://localhost/angular/rece-fice/src/api" );
define( "RECOVERY_URL", "http://localhost/angular/rece-fice/src/api/recovery" );
define( "URL", "http://localhost:4200/angular/rece-fice/" );
define( "ROOT", $_SERVER['DOCUMENT_ROOT'] . '/rece-fice');

function handleException( $exception ) {

  echo "Sorry, a problem occurred: ".json_encode($exception->getMessage());
  error_log( $exception->getMessage() );
}

set_exception_handler( 'handleException' );

function console_log( $data ){
  echo '<script>';
  echo 'console.log('. json_encode( $data ) .')';
  echo '</script>';
}
