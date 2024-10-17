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
const maxJugadesFallades = 10;

function comencarPartida() {
    let paraulaIntroduida = inpuObj.value;
    imgObj.src = "img/penjat_0.jpg";
    jugadaFallada = 0;
    


    if (paraulaIntroduida) {
        if (!isNaN(paraulaIntroduida)) {  
            alert("Has d'introduir una paraula, un número no és vàlid");
        } else {
            if (paraulaIntroduida.length > 3) { 
                paraulaSecreta = paraulaIntroduida.toUpperCase().split(""); 
                inpuObj.disabled = true;
                buttObj.disabled = true;
                habilitarButo();  
                paraulaActualInicial(); // Inicializar la palabra actual con "_"
                mostrarParaulaPantalla(); // Mostrar la palabra en pantalla
                paraulaActualObj.style.backgroundColor = ""; // Resetear color de fondo de la palabra
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
    let lletraJugada = obj.textContent;
    let lletraEncertada = false; // Variable para saber si la letra ha sido acertada
    

    // Verificar si la letra jugada está en la palabra secreta
    if (paraulaSecreta.includes(lletraJugada)) {
        // Recorrer la palabra secreta y actualizar la palabra actual en todas las posiciones correctas
        for (let i = 0; i < paraulaSecreta.length; i++) {
            if (paraulaSecreta[i] === lletraJugada) {
                paraulaActual[i] = lletraJugada; // Revelar la letra en la palabra actual
                lletraEncertada = true;
            }
        }
    } else {
        // Incrementar jugadas falladas si la letra no está en la palabra secreta
        jugadaFallada++;
        imgObj.src = "img/penjat_" + jugadaFallada + ".jpg"; // Actualizar imagen del ahorcado
    }

    

    mostrarParaulaPantalla(); // Mostrar la palabra actualizada en la pantalla
    obj.disabled = true; // Deshabilitar el botón de la letra jugada
    obj.classList.remove('boto-habilitat');  
    obj.classList.add('boto-seleccionat');

    if (lletraEncertada) {
        comprovarVictoria();
        
    } else if (jugadaFallada >= maxJugadesFallades) {
        perdrePartida();
        
    }
}

function comprovarVictoria() {
    // Si todas las letras han sido adivinadas, se gana la partida
    if (paraulaActual.join('') === paraulaSecreta.join('')) {
        paraulaActualObj.style.backgroundColor = "green"; // Cambiar fondo de la palabra a verde
        deshabilitarButo(); // Deshabilitar botones
        inpuObj.disabled = false;
        buttObj.disabled = false;
    }
}

function perdrePartida() {
    // Mostrar la palabra secreta completa y cambiar fondo de la palabra a rojo
    paraulaActualObj.textContent = paraulaSecreta.join(' '); // Mostrar la palabra secreta completa
    paraulaActualObj.style.backgroundColor = "red"; // Cambiar fondo de la palabra a rojo
    deshabilitarButo(); // Deshabilitar botones
    inpuObj.disabled = false;
    buttObj.disabled = false;
}


function deshabilitarButo() {
    for (let i = 1; i <= 26; i++) {  
        let literal = "boto" + i;
        const botoA = document.getElementById(literal);
        botoA.disabled = true;
        botoA.classList.remove('boto-habilitat');
        botoA.classList.add('boto-deshabilitat');
        
    }
}

function habilitarButo() {
    for (let i = 1; i <= 26; i++) {  
        let literal = "boto" + i;
        const botoA = document.getElementById(literal);
        botoA.disabled = false;
        botoA.classList.remove('boto-deshabilitat', 'boto-seleccionat');
        botoA.classList.add('boto-habilitat');

        
    }
}

function paraulaActualInicial() {
    // Inicializar la palabra actual con guiones bajos
    paraulaActual = [];
    for (let i = 0; i < paraulaSecreta.length; i++) {
        paraulaActual.push('_');
    }
}

function mostrarParaulaPantalla() {
    // Mostrar la palabra actual en la pantalla, separada por espacios
    paraulaActualObj.textContent = paraulaActual.join(' ');
}

deshabilitarButo();
