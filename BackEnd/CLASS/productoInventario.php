<?php
include_once('item.php');

class productoInventario{
    private $codProducto;
    private $nombreProducto;
    private $valorProducto;
    
    public function __construct ($codProducto,$nombreProducto,$valorProducto){
        $this->codProducto = $codProducto;
        $this->nombreProducto = $nombreProducto;
        $this->valorProducto = $valorProducto;
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

public function guardarProducto(){
    $contenidoArchivo=file_get_contents("../DATA/productosInventario.json");
    $productosInventario = json_decode($contenidoArchivo,true);
    $productosInventario[] = array(
        "codProducto"=>$this->codProducto,
        "nombreProducto"=>$this->nombreProducto,
        "valorProducto"=>$this->valorProducto
    );
    $archivo = fopen("../DATA/productosInventario.json","w");
    fwrite($archivo,json_encode($productosInventario));
    fclose($archivo);

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