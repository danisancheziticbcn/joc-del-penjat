// Definim tots els objectes
const inpuObj = document.getElementById("paraulaSecreta");
const buttObj = document.getElementById("button");
const imgObj = document.getElementById("imatge");
const paraulaActualObj = document.getElementById("paraulaActual");

// Variables
let paraulaSecreta;
let paraulaIntroduida;
let paraulaActual = [];
let jugadaFallada = 0;


function comencarPartida() {

    let paraulaIntroduida = inpuObj.value;

    if (paraulaIntroduida) {
        if (!isNaN(paraulaIntroduida)) {  
            alert("Has d'introduir una paraula, un número no és vàlid");
        } else {
            if (paraulaIntroduida.length > 3) { 
                console.log(paraulaIntroduida);
                paraulaSecreta = paraulaIntroduida.split(""); 
                inpuObj.disabled = true;
                buttObj.disabled = true;
                console.log(paraulaSecreta);
                habilitarButo();  
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

function jugarLletra(obj) {
    let lletraJugada = inpuObj.value.toUpperCase();

    if(paraulaSecreta.includes(paraulaActual)){
        for(let i =0; i <){
            //Iteració per buscar la lletra 
            //Canviar la paraula actual per la posició de la que es troba
        }
            
    }
    else{
            console.log("No existeix lletra");
    }
    
    jugadaFallada = jugadaFallada + 1;
    
    imgObj.src = "img/penjat_" + jugadaFallada + ".jpg";
    console.log(jugadaFallada);
    console.log(lletraJugada);
    obj.disabled = true;
}

function deshabilitarButo() {
    for (let i = 1; i <= 25; i++) {  
        let literal = "boto" + i;
        const botoA = document.getElementById(literal);
        botoA.disabled = true;
    }
}

function habilitarButo() {
    for (let i = 1; i <= 25; i++) {  
        let literal = "boto" + i;
        const botoA = document.getElementById(literal);
        botoA.disabled = false;
    }
}
function paraulaActualInicial(){
    for(let i=0; i < paraulaSecreta.length; i++){
        paraulaActual.push["_"];
    }
}
function mostrarParaulaPantalla(){
    paraulaActualObj.textContent = paraulaActual.toString().replace(","," ");
    
}
deshabilitarButo();
