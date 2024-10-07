// Definim tots els objectes
const inpuObj = document.getElementById("paraulaSecreta");
const buttObj = document.getElementById("button");

// Variables
let paraulaSecreta;

function comencarPartida() {

    paraulaSecreta = inpuObj.value;

    if (paraulaSecreta) {
        if (!isNaN(paraulaSecreta)) {
            alert("Has d'introduir una paraula, un número no és vàlid");
        } else {
            if (paraulaSecreta.length > 3) {
                console.log(paraulaSecreta);
                console.log(paraulaSecreta.split(""));
                inpuObj.disabled = true;
                buttObj.disabled = true;
            } else {
                alert("Has d'introduir una paraula de com a mínim 4 lletres");
            }
        }
    } else {
        alert("No has introduït una paraula");
    }
}

function mostrarParaula() {
    if (inpuObj.type === "password") {
        inpuObj.type = "text";
    } else {
        inpuObj.type = "password";
    }
}
