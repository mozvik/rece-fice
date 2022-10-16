<?php
// require('auth_functions.php');
Auth::logout();
$response = new Response(200, false, 'User logged out. Session destroyed.');
