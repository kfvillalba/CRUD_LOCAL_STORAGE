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
        if(isset($_GET['codProducto'])){
            productoInventario::obtenerProducto($_GET['codProducto']);
        } else{
            productoInventario::obtenerProductos();
        }            
        break;

    case 'PUT':
        $_PUT = json_decode(file_get_contents('php://input'),true);
        $productoInventario = new productoInventario($_PUT["codProducto"],$_PUT["nombreProducto"],$_PUT["valorProducto"]);
        $productoInventario->editarProducto();
        break;

    case 'DELETE':        
        productoInventario::eliminarProducto($_GET['codProducto']);
        break;   
    
}
;

?>