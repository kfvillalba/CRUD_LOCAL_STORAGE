<?php
header("Content-Type: aplication/json");

include_once("../CLASS/productoInventario.php");

switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST':
        $_POST = json_decode(file_get_contents('php://input'),true);
        $productoInventario = new productoInventario($_POST["codProducto"],$_POST["nombreProducto"],$_POST["valorProducto"]);
        $productoInventario->guardarProducto();
        break;

    case 'GET':  
            
        break;

    case 'PUT':
        
        break;

    case 'DELETE':
        
        break;   
    
}
;

?>