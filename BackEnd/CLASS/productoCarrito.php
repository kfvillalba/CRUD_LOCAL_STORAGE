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

public static function obtenerKey($Array,$codProducto){
    foreach ($Array as $key => $value) {
        if ($value["codProducto"]==$codProducto) {
            return $key;
        }        
    }
    return -1;
}

public function guardarProducto(){
    $contenidoArchivo=file_get_contents("../DATA/productosCarrito.json");
    $productosCarrito = json_decode($contenidoArchivo,true);
    $productosCarrito[] = array(
        "codProducto"=>$this->codProducto,
        "nombreProducto"=>$this->nombreProducto,
        "valorProducto"=>$this->valorProducto,
        "cantidadProducto"=>1
    );
    $archivo = fopen("../DATA/productosCarrito.json","w");
    fwrite($archivo,json_encode($productosCarrito));
    fclose($archivo);
}
public static function  obtenerProducto($codProducto){
    $contenidoArchivo=file_get_contents("../DATA/productosCarrito.json");
    $productosCarrito = json_decode($contenidoArchivo,true);    
    $key = productoCarrito::obtenerKey($productosCarrito,$codProducto);
    echo(json_encode($productosCarrito[$key]));

}
public static function obtenerProductos(){
    $contenidoArchivo=file_get_contents("../DATA/productosCarrito.json");
    echo($contenidoArchivo);
}

public function editarProducto(){
    $contenidoArchivo=file_get_contents("../DATA/productosCarrito.json");
    $productosCarrito = json_decode($contenidoArchivo,true);
    $key = productoCarrito::obtenerKey($productosCarrito,$this->codProducto);
    $productoCarrito = array(
            "codProducto"=>$this->codProducto,
            "nombreProducto"=>$this->nombreProducto,
            "valorProducto"=>$this->valorProducto,
            "cantidadProducto"=>1
        );
    $productosCarrito[$key] = $productoCarrito;
    $archivo = fopen("../DATA/productosCarrito.json","w");
    fwrite($archivo,json_encode($productosCarrito));
    fclose($archivo);
}
public static function eliminarProducto($codProducto){
    $contenidoArchivo=file_get_contents("../DATA/productosCarrito.json");
    $productosCarrito = json_decode($contenidoArchivo,true);
    $key = productoCarrito::obtenerKey($productosCarrito,$codProducto);
    array_splice($productosCarrito,$key,1);

    $archivo = fopen("../DATA/productosCarrito.json","w");
    fwrite($archivo,json_encode($productosCarrito));
    fclose($archivo);
    echo("Eliminado");

}

public static function vaciarCarrito(){
    $contenidoArchivo=file_get_contents("../DATA/productosCarrito.json");
    $productosCarrito = json_decode($contenidoArchivo,true);
    $productosCarrito = [];
    $archivo = fopen("../DATA/productosCarrito.json","w");
    fwrite($archivo,json_encode($productosCarrito));
    fclose($archivo);

}

} 


?>