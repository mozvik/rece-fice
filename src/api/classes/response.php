<?php

/**
 * Response osztály. 
 * A Frontend felé küldött válasz.
 */
class Response
{
  public $responseCode; //http válasz kódja
  public $isError; //Hiba?
  public $response; //válasz tartalma
  
  
  /**
   * __construct
   * Summary: Response osztály konstruktora.
   * Egy asszociatív tömbbel lehet létrehozni az osztálypéldányt.
   * @param int $responseCode
   * @param boolean isError
   * @param array | string  response
   */
  public function __construct($responseCode, $isError, $response)
  {
    $this->responseCode = (int) $responseCode;
    $this->isError = (boolean) $isError;
    $this->response = $response;
  }
 
}
