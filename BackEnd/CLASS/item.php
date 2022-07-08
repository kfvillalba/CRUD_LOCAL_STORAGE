<?php

abstract class item{
    private $idProducto;
    private $nombreProducto;
    private $valorProducto;

    public function __construct ($idProducto,$nombreProducto,$valorProducto){
        $this->idProducto = $idProducto;
        $this->nombreProducto = $nombreProducto;
        $this->valorProducto = $valorProducto;
    }

    public function getIdProducto(){
        return $this->idProducto;
    }
    public function getNombreProducto(){
        return $this->nombreProducto;
    }
    public function getValorProducto(){
        return $this->$valorProducto;
    }

    public function setIdProducto($idProducto){
        $this->idProducto = $idProducto ;
    }
    public function setNombreProducto($nombreProducto){
        $this->nombreProducto = $nombreProducto;
    }
    public function setValorProducto($valorProducto){
        $this->nombreProducto = $valorProducto;
    }

    public abstract function guardarProducto();
    public abstract function ObternerProducto();
    public abstract function ObternerProductos();
    public abstract function editarProducto();
    public abstract function eliminarProducto();

}
?>