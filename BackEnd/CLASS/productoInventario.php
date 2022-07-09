<?php

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

    public static function obtenerKey($Array,$codProducto){
        foreach ($Array as $key => $value) {
            if ($value["codProducto"]==$codProducto) {
                return $key;
            }        
        }
        return -1;
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


    public static function obtenerProducto($codProducto){   
        $contenidoArchivo=file_get_contents("../DATA/productosInventario.json");
        $productosInventario = json_decode($contenidoArchivo,true);    
        $key = productoInventario::obtenerKey($productosInventario,$codProducto);
        echo(json_encode($productosInventario[$key]));
    }

    public static function obtenerProductos(){
        $contenidoArchivo=file_get_contents("../DATA/productosInventario.json");
        echo($contenidoArchivo);
    }
    public function editarProducto(){
        $contenidoArchivo=file_get_contents("../DATA/productosInventario.json");
        $productosInventario = json_decode($contenidoArchivo,true);
        $key = productoInventario::obtenerKey($productosInventario,$this->codProducto);
        $productoInventario = array(
            "codProducto"=>$this->codProducto,
            "nombreProducto"=>$this->nombreProducto,
            "valorProducto"=>$this->valorProducto
        );
        $productosInventario[$key] = $productoInventario;
        $archivo = fopen("../DATA/productosInventario.json","w");
        fwrite($archivo,json_encode($productosInventario));
        fclose($archivo);

    }

        
    public static function eliminarProducto($codProducto){
        $contenidoArchivo=file_get_contents("../DATA/productosInventario.json");
        $productosInventario = json_decode($contenidoArchivo,true);
        $key = productoInventario::obtenerKey($productosInventario,$codProducto);
        array_splice($productosInventario,$key,1);

        $archivo = fopen("../DATA/productosInventario.json","w");
        fwrite($archivo,json_encode($productosInventario));
        fclose($archivo);
        echo("Eliminado");
    }

}


?>