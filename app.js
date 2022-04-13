// Variables Globales

const formularioUI = document.getElementById('formulario');
const listaProductosUI = document.getElementById('listaProductos');
let arrayProductos = [];
let arrayCarrito = [];




// Funciones

const CrearItem = (codProducto,nombreProducto,valorProducto,stockProducto) =>{

    let item = {
        codProducto: codProducto,
        valorProducto: valorProducto,
        nombreProducto: nombreProducto,
        stockProducto : stockProducto,
        estado : false
    }
    arrayProductos.push(item);
    return item;
}

const GuardarProductosDB = () =>{
    localStorage.setItem('Productos', JSON.stringify(arrayProductos));
    
    LeerProductosDB();
}

const LeerProductosDB = () =>{    
    listaProductosUI.innerHTML = '';
    listaProductosUI.innerHTML += '<h3 class="my-4" id="lista">LISTA DE PRODUCTOS</h3>'; 
       

    arrayProductos = JSON.parse(localStorage.getItem('Productos'));
   
    if(arrayProductos == null){
        arrayProductos = [];
    }else{     
        arrayProductos.forEach(element => {
            let customStatus;
            element.estado === false ? customStatus = 'danger': customStatus = 'success'; 
            listaProductosUI.innerHTML += `<div class="alert alert-${customStatus}" role="alert">
            <i class="material-icons float-start me-3">
                shopping_bag
            </i>
            <b>${element.codProducto}</b>  
            <span class="float-end">
                <i class="material-icons">
                    shopping_cart
                </i>  
                <i class="material-icons">
                    delete
                </i>                   
            </span> 
            <span class="float-start me-5">
                ${element.nombreProducto} 
            </span>  

            <span class="float-end me-5">
                ${element.stockProducto} 
            </span>

            <span class="float-end me-5">
                ${element.valorProducto}  
            </span> 

          </div>`            
        });
    }
}

const EliminarProductosDB = (codProducto) =>{
    let indexArray = arrayProductos.findIndex((producto)=>producto.codProducto === codProducto)
    arrayProductos.splice(indexArray,1);
    GuardarProductosDB();
}
const EditarProductosDB = (codProducto) => {
    let indexArray = arrayProductos.findIndex((producto)=>producto.codProducto === codProducto)
    arrayProductos[indexArray].estado = true;
    console.log(indexArray);
    GuardarProductosDB();
}


// EventListener

formularioUI.addEventListener('submit', (e) => {
    e.preventDefault();
    let codProductoUI = document.getElementById('codProducto').value;
    let nombreProductoUI = document.getElementById('nombreProducto').value;
    let stockProductoUI = document.getElementById('stockProducto').value;
    let valorProductoUI = document.getElementById('valorProducto').value;
    
    CrearItem(codProductoUI,nombreProductoUI,valorProductoUI,stockProductoUI);

    formularioUI.reset();

    GuardarProductosDB();
})

document.addEventListener('DOMContentLoaded', LeerProductosDB());

listaProductosUI.addEventListener('click', (e) =>{
    e.preventDefault();
    let texto =  e.path[2].childNodes[3].innerHTML;
     
    if (e.target.innerHTML.trim() == 'shopping_cart') {
        EditarProductosDB(texto);
   }else if( e.target.innerHTML.trim() == 'delete'){       
       EliminarProductosDB(texto);
   }
  
})