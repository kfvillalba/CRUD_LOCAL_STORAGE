// Variables Globales

const formularioUI = document.getElementById("formulario");
const listaProductosUI = document.getElementById("listaProductos");
let arrayProductos = [];
let arrayCarrito = [];
const templateFooter = document.getElementById("template-footer").content;
const templateCarrito = document.getElementById("template-carrito").content;
const templateTarjeta = document.getElementById("template-card").content;
const items = document.getElementById("items");
const footer = document.getElementById("footer");
const fragment = document.createDocumentFragment();
const urlInventario = '../../BackEnd/API/productoInventario.php'
const urlCarrito = '../../BackEnd/API/productoCarrito.php'
// Funciones

const CrearProducto = (codProducto, nombreProducto, valorProducto) => {
  let producto = {
    codProducto: codProducto,
    valorProducto: valorProducto,
    nombreProducto: nombreProducto,
  };
 
  return producto;
};

const GuardarProducto = (producto) =>{
  let mensaje = ValidarFormulario(producto)
  flag = ValidarProductoExistente(producto.codProducto)
   
  if (mensaje === "" && flag == false){
    // arrayProductos.push(producto)
    axios({
      method:'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      url:urlInventario,
      responseType:'json',
      data:producto      
    }).then(res=>{
      console.log("producto: ",producto)
    }).catch(error=>{
      console.error(error)
    })
  }else if(flag = true && mensaje === ""){
    alert("El producto ya esta registardo")
  }else{
    alert (mensaje)
  }
  
}

const EditarProducto = (producto) =>{
  let mensaje = ValidarFormulario(producto)
  indexArray = BuscarProducto (producto.codProducto)
  indexArrayCarrito = BuscarProductoCarrito(producto.codProducto)
  flag = ValidarProductoExistente(producto.codProducto)

  if (mensaje === "" && flag == true){
    arrayProductos[indexArray].nombreProducto = producto.nombreProducto
    arrayProductos[indexArray].valorProducto = producto.valorProducto
    if (indexArrayCarrito != -1) {
      arrayCarrito[indexArrayCarrito].nombreProducto = producto.nombreProducto
      arrayCarrito[indexArrayCarrito].valorProducto = producto.valorProducto    
    }
  }else if (flag == false && mensaje === ""){
    alert("El producto no esta registardo")
  }else{
    alert (mensaje)
  }
  
}
const BuscarProducto = (codProducto) =>{
  let indexArray = arrayProductos.findIndex((producto) => producto.codProducto === codProducto
  );
  return indexArray;
}

const BuscarProductoCarrito = (codProducto) =>{
  let indexArray = arrayCarrito.findIndex((producto) => producto.codProducto === codProducto);
  return indexArray;
}

const ValidarProductoExistente = (codProducto) =>{
  let flag = false
  if (BuscarProducto(codProducto) != -1){
    flag = true
  }
  
  return flag
}

const ValidarFormulario = (producto) =>{
  let mensaje = "" 
 
  if (producto.codProducto == "" || producto.nombreProducto == "" || producto.valorProducto == ""){
    mensaje = "No se aceptan campos en blanco"
  }
  return mensaje
}

const GuardarProductosDB = () => {
  localStorage.setItem("Productos", JSON.stringify(arrayProductos));

  LeerProductosDB();
};

const GuardarProductosCarritoDB = () => {
  localStorage.setItem("Carrito", JSON.stringify(arrayCarrito));

  pintarCarrito();
  pintarFooter();
};

const EliminarProductosDB = (codProducto) => {
  let indexArray = BuscarProducto (codProducto);
  arrayProductos.splice(indexArray, 1);
  EliminarProductosCarritoDB(codProducto);
  GuardarProductosDB();
};
const EliminarProductosCarritoDB = (codProducto) => {
  let indexArray = BuscarProductoCarrito(codProducto)
  arrayCarrito.splice(indexArray, 1);
  GuardarProductosCarritoDB();
  pintarCarrito();
  pintarFooter();
};

const LeerProductosDB = () => {
  listaProductosUI.innerHTML = "";
  listaProductosUI.innerHTML +=
    '<h3 class="my-4" id="lista">Lista de Productos</h3>';

//  arrayProductos = JSON.parse(localStorage.getItem("Productos"));
  axios({
    method:'GET',
    url:urlInventario,
    responseType:'json'
  }).then(res=>{
    // console.log(res);
    // arrayProductos=res.data;
    
  }).catch(error=>{
    console.error(error);
  })

  if (arrayProductos == null) {
    arrayProductos = [];
  } else {
    if (arrayProductos.length === 0) {
      listaProductosUI.innerHTML = `<h4>Lista vacia - Agregue Productos!</h4>`;
      return;
    } else {
      listaProductosUI.innerHTML = "";
      arrayProductos.forEach((producto) => {
        templateTarjeta.querySelector("h6").textContent = producto.codProducto;
        templateTarjeta.querySelector("h5").textContent = producto.nombreProducto;
        templateTarjeta.querySelector("p").textContent = "$" +producto.valorProducto;

        const clone = templateTarjeta.cloneNode(true);
        fragment.appendChild(clone);
      });
      listaProductosUI.appendChild(fragment);
    }
  }
};
const ComprarProductosDB = (codProducto) => {
  let indexArray = arrayProductos.findIndex(
    (producto) => producto.codProducto === codProducto
  );
  let productoCarrito = {
    codProducto: arrayProductos[indexArray].codProducto,
    nombreProducto: arrayProductos[indexArray].nombreProducto,
    valorProducto: arrayProductos[indexArray].valorProducto,
    CantidadComprar: 1,
  };
  indexArray = BuscarProductoCarrito(codProducto)
  if (indexArray === -1) {
    arrayCarrito.push(productoCarrito);
  } else {
    arrayCarrito[indexArray].CantidadComprar += 1;
  }

  GuardarProductosDB();
  GuardarProductosCarritoDB();
};

const pintarCarrito = () => {
  arrayCarrito = JSON.parse(localStorage.getItem("Carrito"));
  if (arrayCarrito == null) {
    arrayCarrito = [];
  } else {
    items.innerHTML = "";
    arrayCarrito.forEach((producto) => {
      templateCarrito.querySelector("th").textContent = producto.codProducto;
      templateCarrito.querySelectorAll("td")[0].textContent =
        producto.nombreProducto;
      templateCarrito.querySelectorAll("td")[1].textContent = "$" +
        producto.valorProducto;  
      templateCarrito.querySelectorAll("td")[2].textContent =
        producto.CantidadComprar;    
      templateCarrito.querySelector(".btn-info").dataset.id =
        producto.codProducto;
      templateCarrito.querySelector(".btn-danger").dataset.id =
        producto.codProducto;
      templateCarrito.querySelector("span").textContent =
        producto.CantidadComprar * producto.valorProducto;

      const clone = templateCarrito.cloneNode(true);
      fragment.appendChild(clone);
    });
    items.appendChild(fragment);
  }
};

const pintarFooter = () => {
  footer.innerHTML = "";
  let total = 0;
  let nCantidad = 0;
  arrayCarrito = JSON.parse(localStorage.getItem("Carrito"));
  if (arrayCarrito === null) {
    arrayCarrito = [];
  } else {
    if (arrayCarrito.length === 0) {
      footer.innerHTML = `<th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
        </tr>`;
      return;
    }
    arrayCarrito.forEach((producto) => {
      let valor = producto.CantidadComprar * producto.valorProducto;
      total = valor + total;
      nCantidad = producto.CantidadComprar + nCantidad;
    });
    templateFooter.querySelectorAll("td")[0].textContent = nCantidad;
    templateFooter.querySelector("span").textContent = total;

    const clone = templateFooter.cloneNode(true);
    fragment.appendChild(clone);
    footer.appendChild(fragment);

    const botonVaciar = document.getElementById("btn_vaciar");
    botonVaciar.addEventListener("click", () => {
      arrayCarrito = [];
      GuardarProductosCarritoDB();
      pintarCarrito();
      pintarFooter();
    });
  }
};
const btnAccion = (e) => {
  let indexArray = BuscarProductoCarrito(e.target.dataset.id) 
  
  if (e.target.classList.contains("btn-info")) {
    arrayCarrito[indexArray].CantidadComprar++;
  } else if (e.target.classList.contains("btn-danger")) {
    arrayCarrito[indexArray].CantidadComprar--;
    if (arrayCarrito[indexArray].CantidadComprar === 0) {
      arrayCarrito.splice(indexArray, 1);
    }
  }
  GuardarProductosCarritoDB();
};

const CargarPagina = () =>{
  LeerProductosDB();
  pintarCarrito();
  pintarFooter();
}



// EventListener

items.addEventListener("click", (e) => {
  btnAccion(e);
});

formularioUI.addEventListener("click", (e) => {
  e.preventDefault();
  
  let codProductoUI = document.getElementById("codProducto").value;
  let nombreProductoUI = document.getElementById("nombreProducto").value;
  let valorProductoUI = document.getElementById("valorProducto").value;
  let producto = CrearProducto(codProductoUI,nombreProductoUI,valorProductoUI)

  if (e.target.classList.contains("btn-submit")){
    GuardarProducto(producto);
    formularioUI.reset();
  }else if (e.target.classList.contains("btn-editar")){
    EditarProducto(producto)
    formularioUI.reset();
  } 

  GuardarProductosDB();
  GuardarProductosCarritoDB();
});

document.addEventListener("DOMContentLoaded", CargarPagina());



listaProductosUI.addEventListener("click", (e) => {
  e.preventDefault();
  let texto = e.target.parentElement.querySelector("h6").textContent;

  if (e.target.textContent == "Comprar") {
    ComprarProductosDB(texto);
  } else if (e.target.textContent == "Borrar") {
    EliminarProductosDB(texto);
  }
});
