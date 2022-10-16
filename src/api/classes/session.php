<?php
/**
 * Session osztály. 
 * A munkafolyamat adatait tárolja.
 */
class Session{
    private $sid;
    public $stoken;
    public $stime;
        
    /**
     * __construct
     * Summary: Session (Munkafolyamat) osztály konstruktora.
     * Egy asszociatív tömbbel lehet létrehozni az osztálypéldányt.
     * @param  int $data 'sid' session id
     * @param  string $data 'stoken' session token
     * @param  string $data 'stime' session time
     * @return void
     */
    public function __construct( $data=array() ) {
        if ( isset( $data['sid'] ) ) $this->sid = $data['sid'];
        if ( isset( $data['stoken'] ) ) $this->stoken = $data['stoken'];
        if ( isset( $data['stime'] ) ) $this->stime = (int) $data['stime'];
      }
     

      /**
     * Csatlakozik a settings.php-ban megadott adatbázishoz
     * 
     * @return $conn egy PDO objektum
     */
      private static function DBconn(){ //db csatlakozási kísérlet
        try {
          $conn = new PDO(DB_DSN, DB_USERNAME, DB_PASSWORD);
        } catch (PDOException $e) {
          error_log($e->getMessage());
          exit('Sikertelen csatlakozás az adatbázishoz.'); 
        }
        return $conn;
      }
    
      public static function generateToken( $text ){
        return md5($text);
      }

      /**
     * Kitörli az adatbázisból az objektumot
     * 
     * 
     */
    public function delete() {

    $conn = Session::DBconn();
    try { 
        $st = $conn->prepare ( "DELETE FROM session WHERE sid = :sid LIMIT 1" );
        $st->bindValue( ":sid", $this->sid, PDO::PARAM_STR );
        $st->execute();
    } catch (PDOException $e) {
        error_log($e->getMessage());
        exit('Sikertelen törlési kísérlet az adatbázisból.'); 
    }
    $conn = null;
    }

    /**
     * Beírja az adatbázisba a session adatokat
     * 
     * 
     */
    public function insert() {
    
    $conn = Session::DBconn();
    try {  //ins
        $sql = "INSERT INTO session ( sid, stoken, stime ) VALUES ( :sid, :stoken, :stime)";
        $st = $conn->prepare ( $sql );
        $st->bindValue( ":sid", $this->sid, PDO::PARAM_STR );
        $st->bindValue( ":stoken", $this->stoken, PDO::PARAM_STR );
        $st->bindValue( ":stime", $this->stime, PDO::PARAM_INT );
        
        $st->execute();
    } catch (PDOException $e) {
        error_log($e->getMessage());
        exit('Sikertelen felvitel az adatbázisba.'); 
    }
    $conn = null;
    }
    /**
     * Frissíti az adatbázisban a session időt
     * 
     * 
     */
    public function updateSessionTime() {
    
      $conn = Session::DBconn();
      try {  //upd
          $sql = "UPDATE session SET stime = :stime WHERE sid = :sid LIMIT 1";
          $st = $conn->prepare ( $sql );
          $st->bindValue( ":sid", $this->sid, PDO::PARAM_STR );
          $this->stime = time();
          $st->bindValue( ":stime", $this->stime, PDO::PARAM_INT );
          
          $st->execute();
      } catch (PDOException $e) {
          error_log($e->getMessage());
          exit('Sikertelen módosítás az adatbázisba.'); 
      }
      $conn = null;
      }
      /**
    * Session lekérdezés session ID alapján
    * adatbázisból
    * @param string $sid session ID
    * @return Session|null 
    */

    public static function getBySessionId( $sid ) {
        $conn = Session::DBconn();
        $sql = "SELECT * FROM session WHERE sid = :sid LIMIT 1";
        $st = $conn->prepare( $sql );
        $st->bindValue( ":sid", $sid, PDO::PARAM_STR );
        $st->execute();
        $row = $st->fetch(PDO::FETCH_ASSOC);
        $conn = null;
        if ( $row ) return new Session( $row );
      }
       /**
     * Kitörli az adatbázisból 
     * a lejárt munkafolyamatokat
     * @param int $seconds A paraméter által megadott időt túllépve kitörli az adatbázisból
     * a munkafolyamatot
     */
    public static function deleteExpiredSessions($seconds) {

      $conn = Session::DBconn();
      try { 
          $st = $conn->prepare ( "DELETE FROM session WHERE stime < :seconds" );
          $st->bindValue( ":seconds", $seconds, PDO::PARAM_INT );
          $st->execute();
      } catch (PDOException $e) {
          error_log($e->getMessage());
          exit('Sikertelen törlési kísérlet az adatbázisból.'); 
      }
      $conn = null;
      }
       /**
     * Kitörli az adatbázisból 
     * a megadott munkafolyamatot
     * @param int $sid Session ID
     * 
     */
    public static function deleteSession($sid) {

      $conn = Session::DBconn();
      try { 
          $st = $conn->prepare ( "DELETE FROM session WHERE sid = :sid LIMIT 1" );
          $st->bindValue( ":sid", $sid, PDO::PARAM_STR );
          $st->execute();
      } catch (PDOException $e) {
          error_log($e->getMessage());
          exit('Sikertelen törlési kísérlet az adatbázisból.'); 
      }
      $conn = null;
      }
  
}
