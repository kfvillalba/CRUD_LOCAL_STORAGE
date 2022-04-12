// Variables Globales

const formularioUI = document.getElementById('formulario');
const listaProductosUI = document.getElementById('listaProductos');
let arrayProductos = [];




// Funciones

const CrearItem = (producto) =>{

    let item = {
        producto: producto,
        estado : false
    }
    arrayProductos.push(item);
    return item;
}

const GuardarDB = () =>{
    localStorage.setItem('carrito', JSON.stringify(arrayProductos));
    
    LeerDB();
}

const LeerDB = () =>{    
    listaProductosUI.innerHTML = '';

    arrayProductos = JSON.parse(localStorage.getItem('carrito'));
   
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
            <b>${element.producto}</b> - ${element.estado}  
            <span class="float-end">
                <i class="material-icons">
                    done
                </i>  
                <i class="material-icons">
                    delete
                </i>                   
            </span> 
          </div>`            
        });
    }
}

const EliminarDB = (producto) =>{
    let indexArray = arrayProductos.findIndex((elemento)=>elemento.producto === producto)
    arrayProductos.splice(indexArray,1);
    GuardarDB();
}
const EditarDB = (producto) => {
    let indexArray = arrayProductos.findIndex((elemento)=>elemento.producto === producto)
    arrayProductos[indexArray].estado = true;
    console.log(indexArray);
    GuardarDB();
}


// EventListener

formularioUI.addEventListener('submit', (e) => {
    e.preventDefault();
    let productoUI = document.getElementById('producto').value;
    
    CrearItem(productoUI);

    formularioUI.reset();

    GuardarDB();
})

document.addEventListener('DOMContentLoaded', LeerDB());

listaProductosUI.addEventListener('click', (e) =>{
    e.preventDefault();
    let texto =  e.path[2].childNodes[3].innerHTML;
     console.log(texto);
    if (e.target.innerHTML.trim() == 'done') {
        EditarDB(texto);
   }else if( e.target.innerHTML.trim() == 'delete'){       
       EliminarDB(texto);
   }
  
})