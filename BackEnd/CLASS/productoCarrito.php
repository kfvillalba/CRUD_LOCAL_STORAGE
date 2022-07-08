<?php
include_once('item.php')
class productoCarrito extends item{

private $cantidad;

public function __construct($idProducto,$nombreProducto,$valorProducto,$cantidad){
    parent::__construct($idProducto,$nombreProducto,$valorProducto);
    $this->cantidad = $cantidad;    
}

public function getCantidad(){
    return $this->cantidad;
}
public function setCantidad($cantidad){
    $this->cantidad = $cantidad;  
}

public function guardarProducto(){

}
public function ObternerProducto(){

}
public function ObternerProducto(){

}
public function editarProducto(){

}
public function eliminarProducto(){

}

} 


?>