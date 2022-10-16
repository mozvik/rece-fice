<?php
abstract class DBmodel
{
  /**
   * Csatlakozik a settings.php-ban megadott adatbázishoz
   * 
   * @return $conn egy PDO objektum
   */
  public static function connect()
  { //db csatlakozási kísérlet
    try {
      $conn = new PDO(DB_DSN, DB_USERNAME, DB_PASSWORD);
    } catch (PDOException $e) {
      error_log($e->getMessage());
      // echo('Sikertelen csatlakozás az adatbázishoz. '); 
      return $e->errorInfo[1];
    }
    return $conn;
  }
}
