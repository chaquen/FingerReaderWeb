<?php
header('Content-Type:text/html; Charset="UTF-8"');    
header('Access-Control-Allow-Origin: *'); 
require_once '../datos/Install.php';



$db= new Install();
echo json_encode($db->eliminar_db());

