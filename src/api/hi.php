<?php

$mysqli = new mysqli("db","root","root","recefice");

// Check connection
if ($mysqli -> connect_errno) {
  echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
  
}

   try {
     $conn = new PDO("mysql:host=db;dbname=recefice;charset=utf8", "root", "root");
   } catch (PDOException $e) {
     error_log($e->getMessage());
     echo('Sikertelen csatlakozás az adatbázishoz. '.var_export($e->getMessage())); 
     return $e->errorInfo[1];
   }

echo "hi";