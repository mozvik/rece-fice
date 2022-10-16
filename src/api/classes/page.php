<?php
abstract class Page{
  public static function validatePage($page)
  {
    $page = ceil($page);
    if ($page < 0) {
      return false;
    }
    return $page;
  }

  public static function validateItemsPerPage($itemCount)
  {
    $itemCount = ceil($itemCount);
    if ($itemCount <= 0) {
      return false;
    }
    return $itemCount;
  }
}