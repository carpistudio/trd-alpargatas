let botonesNext = document.querySelectorAll(".next-step");
let botonesPrev = document.querySelectorAll(".prev-step");
let mainForm = document.querySelector("#main-form");

botonesNext.forEach(boton => {
    let botonNextParent = boton.parentElement.parentElement;
    let botonNextStep = botonNextParent.nextElementSibling;
    boton.addEventListener("click", () => {
        if (!boton.classList.contains("disabled")) {
            botonNextParent.classList.add("step-hidden");
            botonNextStep.classList.remove("step-hidden");
        }
    })
})

botonesPrev.forEach(boton => {
    let botonPrevParent = boton.parentElement.parentElement;
    let botonPrevStep = botonPrevParent.previousElementSibling;
    boton.addEventListener("click", () => {
        if (!boton.classList.contains("disabled")) {
            botonPrevParent.classList.add("step-hidden");
            botonPrevStep.classList.remove("step-hidden");
        }
    })
})

mainForm.addEventListener("input", checkStep1);
function checkStep1() {
    if ( document.querySelector("#tipo_de_entrega-retirar").checked ||
        document.querySelector("#tipo_de_entrega-envio").checked ) {
            document.querySelector("#step-1 .next-step").classList.remove("disabled");
        } else {
            document.querySelector("#step-1 .next-step").classList.add("disabled");
        }
}
checkStep1();

mainForm.addEventListener("input", checkStep2);
function checkStep2() {
    if ( 
        document.querySelector("#nombre").value != "" &&
        document.querySelector("#tel").value != "" &&
        document.querySelector("#zona").value != "Elegí tu zona") {
            document.querySelector("#step-2 .next-step").classList.remove("disabled");
        } else {
            document.querySelector("#step-2 .next-step").classList.add("disabled");
        }
}
checkStep2();

mainForm.addEventListener("input", checkStep3);
function checkStep3() {
    let allInputs = document.querySelectorAll(".input-talle");
    let totalUnidades = 0;
    for(let i=0; i < allInputs.length; i++){
        totalUnidades += parseInt
        (
            allInputs[i].value * 1
        );
    }
    if (totalUnidades >= 50) {
        document.querySelector("#step-3 .end-order").classList.remove("disabled");
    } else {
        document.querySelector("#step-3 .end-order").classList.add("disabled");
    }

}
checkStep3();

function loadSolapas(productos) {
    let solapas = document.querySelectorAll(".solapa");
    solapas.forEach(solapa => {
        solapa.addEventListener("click", () => {
            solapas.forEach(solapa => {
                solapa.classList.remove("selected");
            })
            solapa.classList.add("selected");
            let solapaTarget = solapa.getAttribute("data-target");
            let divCantidades = document.querySelectorAll(".cantidades");
            divCantidades.forEach(div => {
                div.classList.add("disabled");
                if(solapaTarget == div.id) {
                    div.classList.remove("disabled");
                }
            })
        })
    })
}


const URL_PRODUCTOS = "./json/data.json";
const pedirProductos = async () => {
    const resp = await fetch(URL_PRODUCTOS);
    let productos = await resp.json();
    return productos;
};

let productos = pedirProductos();
productos.then((productos) => productosFetched(productos));

function productosFetched(productos) {
    productos.forEach((producto, index) => {

        // Agregar los productos en las solapas
        let solapasContainer = document.querySelector("#step-3 .solapas");
        let solapa = document.createElement("div");
        solapa.classList.add("solapa");
        solapa.setAttribute("data-target", producto.id);
        if (index == 0) {
            solapa.classList.add("selected");
        }
        solapa.innerHTML = producto.nombre;
        solapasContainer.appendChild(solapa);
        loadSolapas(productos);

        // Agregar talles y colores
        // Crear la grilla principal
        let grillaContainer = document.querySelector("#step-3 .grilla-container");
        let grilla = document.createElement("div");
        grilla.classList.add("cantidades");
        grilla.setAttribute("id", producto.id);
        if (index != 0) {
            grilla.classList.add("disabled");
        }

        // Crear la columna de talles
        let columnaTalles = document.createElement("div");
        columnaTalles.classList.add("talles");
        let tituloTalles = document.createElement("p");
        tituloTalles.classList.add("talle-nombre");
        tituloTalles.innerHTML = "Talles";
        columnaTalles.appendChild(tituloTalles);
        producto.talles.forEach(talle => {
            let parrafoTalle = document.createElement("p");
            parrafoTalle.setAttribute("data-talle", talle.talle);
            parrafoTalle.classList.add("talle-numero")
            parrafoTalle.innerHTML = talle.talle;
            columnaTalles.appendChild(parrafoTalle);
        })
        grilla.appendChild(columnaTalles);

        // Crear las columnas de colores
        producto.colores.forEach(color => {
            let columnaColor = document.createElement("div");
            columnaColor.classList.add("color");
            let tituloColor = document.createElement("p");
            tituloColor.classList.add("color-nombre");
            tituloColor.innerHTML = color.nombre;
            columnaColor.appendChild(tituloColor);
            producto.talles.forEach(talle => {
                let inputTalle = document.createElement("input");
                if (color.sinstock.includes(talle.talle)) {
                    inputTalle.setAttribute("disabled", "disabled");
                }
                inputTalle.classList.add("input-talle");
                inputTalle.setAttribute("type", "number");
                inputTalle.setAttribute("name", `${color.id}-${talle.talle}`);
                inputTalle.setAttribute("data-precio", talle.precio);
                inputTalle.setAttribute("data-color", color.nombre);
                inputTalle.setAttribute("data-talle", talle.talle);
                inputTalle.setAttribute("data-producto", producto.nombre)
                columnaColor.appendChild(inputTalle);
            })
            grilla.appendChild(columnaColor);
        });

        mainForm.addEventListener("input", calcularTotal);
        function calcularTotal() {
            let valorTotalContainer = document.querySelector("#step-3 .totales .valor");
            let allInputs = document.querySelectorAll(".input-talle");
            let total = 0;
            for(let i=0; i < allInputs.length; i++){
                total += parseInt
                (
                    allInputs[i].value *
                    allInputs[i].getAttribute("data-precio")
                );
            }
            valorTotalContainer.innerHTML = "$" + total;
            document.querySelector("[name='valor-total']").value = "$" + total;

            let cantidadTotalContainer = document.querySelector("#step-3 .cantidad-total .cantidad");
            let cantidadTotal = 0;
            for(let i=0; i < allInputs.length; i++) {
                cantidadTotal += parseInt
                (
                    allInputs[i].value * 1
                )
            cantidadTotalContainer.innerHTML = cantidadTotal;
            document.querySelector("[name='cantidad-total']").value = cantidadTotal;
            }
        }
        calcularTotal();


        grillaContainer.appendChild(grilla);

    })

    let allInputs = document.querySelectorAll(".input-talle");
    allInputs.forEach(input => {
        input.addEventListener("input", guardarValores);
    })
    let productosAgregados = [];
    function guardarValores(e) {
        let producto = {
            "producto": e.target.getAttribute("data-producto"),
            "cantidad": e.target.value,
            "nombre": e.target.getAttribute("name"),
            "talle": e.target.getAttribute("data-talle"),
            "color": e.target.getAttribute("data-color")
        }
        if (productosAgregados.some(e => e.nombre === producto.nombre)) {
            const indexOfObject = productosAgregados.findIndex(object => {
                return object.nombre === producto.nombre;
            });
            productosAgregados[indexOfObject].cantidad = e.target.value;
        } else {
            productosAgregados.push(producto);
        }
        if (e.target.value == 0 || e.target.value == "") {
            const indexOfObject = productosAgregados.findIndex(object => {
                return object.nombre === producto.nombre;
            });
            productosAgregados.splice(indexOfObject, 1);
        }
        localStorage.setItem("productos-agregados", JSON.stringify(productosAgregados));
    }


}

mainForm.addEventListener("submit", submitForm);

function submitForm() {
    let numeroPedido = "TRD" + new Date().getFullYear() + Math.floor(100000 + Math.random() * 900000);
    localStorage.setItem("numero-pedido", numeroPedido);
    document.querySelector("[name='numero-pedido']").value = numeroPedido;

    let productosFinales = localStorage.getItem("productos-agregados");
    let productosFinalesInput = document.querySelector("[name='productos-finales']");
    productosFinales = JSON.parse(productosFinales);
    productosFinales.sort((a, b) => parseFloat(a.talle) - parseFloat(b.talle));
    productosFinales.sort((a, b) => a.color.localeCompare(b.color));
    productosFinales.sort((a, b) => a.producto.localeCompare(b.producto));
    productosFinales.forEach(producto => {
        let productoCompleto = `
        <b>${producto.producto} - Color ${producto.color} - Talle ${producto.talle}</b>:
        ${producto.cantidad > 1 ? producto.cantidad + " unidades" : producto.cantidad + " unidad"}.<br>
        `;
        productosFinalesInput.value += productoCompleto;
    })

}
