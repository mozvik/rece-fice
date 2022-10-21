<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['email'])) { 
  require('functions/post_recovery.php');
}
