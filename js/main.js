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

let solapas = document.querySelectorAll(".solapa");
solapas.forEach(solapa => {
    solapa.addEventListener("click", () => {
        solapas.forEach(solapa => {
            solapa.classList.remove("selected");
        })
        solapa.classList.add("selected");
    })
})