<?php
error_reporting(E_ALL);
ini_set( "display_errors", "on" );
date_default_timezone_set( "Europe/Budapest" );  // http://www.php.net/manual/en/timezones.php
// define( "MAILER_HOST", "smtp.gmail.com"); 
// define( "MAILER_USERNAME", "recefice.recepttar@gmail.com");
// define( "MAILER_PASSWORD", "Asdf?1234");
define( "DB_DSN", "mysql:host=localhost;dbname=recefice;charset=utf8" );
define( "DB_USERNAME", "root" );
define( "DB_PASSWORD", "" );
// define( "ADMIN_USERNAME", "xxx" );
// define( "ADMIN_PASSWORD", "xxx" );
define( "SECRET_KEY", "rece-@#1_FICE" );
define( "SESSION_TIMEOUT", 3600 );//másodperc
define( "API_URL", "http://localhost/angular/rece-fice/src/api" );
define( "RECOVERY_URL", "http://localhost:4200/recovery" );
// define( "API_URL", "http://recefice.esoguides.hu/api" );
define( "URL", "http://localhost/angular/rece-fice/" );
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
