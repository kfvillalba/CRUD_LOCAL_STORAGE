<?php

header("Content-Type: application/json");

include_once("../CLASS/productoCarrito.php");


switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST':
        $_POST = json_decode(file_get_contents('php://input'),true);
        $productoCarrito = new productoCarrito($_POST["codProducto"],$_POST["nombreProducto"],$_POST["valorProducto"],1);
        $productoCarrito->guardarProducto();
        break;

    case 'GET': 
        if(isset($_GET['codProducto'])){
            productoCarrito::obtenerProducto($_GET['codProducto']);
        } else{
            productoCarrito::obtenerProductos();
        }            
        break;

    case 'PUT':
        $_PUT = json_decode(file_get_contents('php://input'),true);
        $productoCarrito = new productoCarrito($_PUT["codProducto"],$_PUT["nombreProducto"],$_PUT["valorProducto"],1);
        $productoCarrito->editarProducto();
        break;

    case 'DELETE':  
        if(isset($_GET['codProducto'])){
            productoCarrito::eliminarProducto($_GET['codProducto']);
        } else{
            productoCarrito::vaciarCarrito();
        }       
        
        break;   
    
}
;


?>