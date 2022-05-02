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

// Funciones

const CrearItem = (codProducto, nombreProducto, valorProducto) => {
  let item = {
    codProducto: codProducto,
    valorProducto: valorProducto,
    nombreProducto: nombreProducto,
  };
  let indexArray = arrayProductos.findIndex(
    (producto) => producto.codProducto === codProducto
  );

  if (indexArray === -1) {
    arrayProductos.push(item);
  } else {
    alert("Ya Existe");
  }

  return item;
};

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
  let indexArray = arrayProductos.findIndex(
    (producto) => producto.codProducto === codProducto
  );
  arrayProductos.splice(indexArray, 1);
  EliminarProductosCarritoDB(codProducto);
  GuardarProductosDB();
};
const EliminarProductosCarritoDB = (codProducto) => {
  let indexArray = arrayCarrito.findIndex(
    (producto) => producto.codProducto === codProducto
  );
  arrayCarrito.splice(indexArray, 1);
  GuardarProductosCarritoDB();
  pintarCarrito();
  pintarFooter();
};

const LeerProductosDB = () => {
  listaProductosUI.innerHTML = "";
  listaProductosUI.innerHTML +=
    '<h3 class="my-4" id="lista">Lista de Productos</h3>';
  arrayProductos = JSON.parse(localStorage.getItem("Productos"));

  if (arrayProductos == null) {
    arrayProductos = [];
  } else {
    if (arrayProductos.length === 0) {
      listaProductosUI.innerHTML = `<th scope="row" colspan="5">Lista vacia - Agregue Productos!</th>
            </tr>`;
      return;
    } else {
      listaProductosUI.innerHTML = "";
      arrayProductos.forEach((producto) => {
        templateTarjeta.querySelector("h5").textContent =
          producto.nombreProducto;
        templateTarjeta.querySelector("h6").textContent = producto.codProducto;
        templateTarjeta.querySelector("p").textContent = producto.valorProducto;

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
  indexArray = arrayCarrito.findIndex(
    (producto) => producto.codProducto === codProducto
  );
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
      templateCarrito.querySelectorAll("td")[1].textContent =
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
  let indexArray = arrayCarrito.findIndex(
    (producto) => producto.codProducto === e.target.dataset.id
  );
  console.log(e.target.dataset.id, indexArray);

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

// EventListener

items.addEventListener("click", (e) => {
  btnAccion(e);
});

formularioUI.addEventListener("submit", (e) => {
  e.preventDefault();
  let codProductoUI = document.getElementById("codProducto").value;
  let nombreProductoUI = document.getElementById("nombreProducto").value;
  let valorProductoUI = document.getElementById("valorProducto").value;

  CrearItem(codProductoUI, nombreProductoUI, valorProductoUI);

  formularioUI.reset();

  GuardarProductosDB();
});

document.addEventListener(
  "DOMContentLoaded",
  LeerProductosDB(),
  pintarCarrito(),
  pintarFooter()
);

listaProductosUI.addEventListener("click", (e) => {
  e.preventDefault();
  let texto = e.target.parentElement.querySelector("h6").textContent;

  if (e.target.textContent == "Comprar") {
    ComprarProductosDB(texto);
  } else if (e.target.textContent == "Borrar") {
    EliminarProductosDB(texto);
  }
});
