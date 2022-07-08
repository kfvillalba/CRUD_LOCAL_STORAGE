<?php

class productoCarrito{

private $cantidadProducto;
private $codProducto;
private $nombreProducto;
private $valorProducto;

public function __construct ($codProducto,$nombreProducto,$valorProducto,$cantidadProducto){
    $this->codProducto = $codProducto;
    $this->nombreProducto = $nombreProducto;
    $this->valorProducto = $valorProducto;
    $this->cantidadProducto = $cantidadProducto;
}

public function getcodProducto(){
    return $this->codProducto;
}
public function getNombreProducto(){
    return $this->nombreProducto;
}
public function getValorProducto(){
    return $this->$valorProducto;
}

public function setcodProducto($codProducto){
    $this->codProducto = $codProducto ;
}
public function setNombreProducto($nombreProducto){
    $this->nombreProducto = $nombreProducto;
}
public function setValorProducto($valorProducto){
    $this->nombreProducto = $valorProducto;
}

public function getcantidadProducto(){
    return $this->cantidadProducto;
}
public function setcantidadProducto($cantidadProducto){
    $this->cantidadProducto = $cantidadProducto;  
}

public function guardarProducto(){

}
public function obtenerProducto(){

}
public function obtenerProductos(){

}
public function editarProducto(){

}
public function eliminarProducto(){

}

} 


?>