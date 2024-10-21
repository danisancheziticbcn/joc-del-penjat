// Definim tots els objectes
const inpuObj = document.getElementById("paraulaSecreta");
const buttObj = document.getElementById("button");
const imgObj = document.getElementById("imatge");
const paraulaActualObj = document.getElementById("paraulaActual");
const puntsActualsObj = document.getElementById("puntsActuals");
const totalPartidesObj = document.getElementById("totalPartides");
const partidesGuanyadesObj = document.getElementById("partidesGuanyades");
const percentatgeGuanyadesObj = document.getElementById("percentatgeGuanyades");
const millorPartidaObj = document.getElementById("millorPartida");

// Variables de la partida
let paraulaSecreta;
let paraulaActual = [];
let jugadaFallada = 0;
let puntsActuals = 0;
let encertsConsecutius = 0;
const maxJugadesFallades = 10;

// Variables d'estadístiques globals
let totalPartides = 0;
let partidesGuanyades = 0;
let millorPuntuacio = 0;
let millorPuntuacioData = null;

// Funcions

function comencarPartida() {
    let paraulaIntroduida = inpuObj.value;
    
    if (paraulaIntroduida) {
        if (!isNaN(paraulaIntroduida)) {
            alert("Has d'introduir una paraula, un número no és vàlid");
        } else {
            if (paraulaIntroduida.length > 3) {
                paraulaSecreta = paraulaIntroduida.toUpperCase().split("");
                inpuObj.disabled = true;
                buttObj.disabled = true;
                habilitarBoto();
                paraulaActualInicial();
                puntsActuals = 0;
                jugadaFallada = 0;
                encertsConsecutius = 0;
                mostrarParaulaPantalla();
                imgObj.src = "img/penjat_0.jpg";
                puntsActualsObj.textContent = puntsActuals;
                paraulaActualObj.style.backgroundColor = ""; // Resetear color de fondo de la palabra
                // Cambiar el espaciado de las letras al iniciar la partida
                const textComencar = document.querySelector(".paraula_secreta");
                textComencar.style.letterSpacing = "10px";
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
    let lletresEncertades = 0;
    
    // Verificar si la letra jugada está en la palabra secreta
    if (paraulaSecreta.includes(lletraJugada)) {
        // Recorrer la palabra secreta y actualizar la palabra actual en todas las posiciones correctas
        for (let i = 0; i < paraulaSecreta.length; i++) {
            if (paraulaSecreta[i] === lletraJugada) {
                paraulaActual[i] = lletraJugada; // Revelar la letra en la palabra actual
                lletraEncertada = true;
                lletresEncertades++;
            }
        }
        
        // Si acertamos, actualizamos los puntos
        encertsConsecutius++;
        let punts = encertsConsecutius * lletresEncertades; // Puntos consecutivos * letras acertadas
        puntsActuals += punts; // Sumar puntos actualizados
    } else {
        // Si fallamos, se suma el contador de jugadas falladas
        jugadaFallada++;
        imgObj.src = "img/penjat_" + jugadaFallada + ".jpg"; // Actualizar imagen del ahorcado
        
        // Restamos un punto solo si los puntos actuales son mayores a 0 (para evitar negativos)
        if (puntsActuals > 0) {
            puntsActuals--;
        }
        
        // Reiniciamos la cuenta de aciertos consecutivos porque fallamos
        encertsConsecutius = 0;
    }

    // Actualizamos la palabra en la pantalla
    mostrarParaulaPantalla(); // Mostrar la palabra actualizada en la pantalla

    // Actualizar los puntos en pantalla
    document.getElementById('puntsActuals').textContent = puntsActuals; // Mostrar los puntos actuales
    
    // Deshabilitar el botón de la letra jugada y cambiar su estilo
    obj.disabled = true;
    obj.classList.remove('boto-habilitat');  
    obj.classList.add('boto-seleccionat');

    // Comprobamos si hemos ganado la partida
    if (lletraEncertada) {
        comprovarVictoria();
    } else if (jugadaFallada >= maxJugadesFallades) {
        perdrePartida();
    }
}


function comprovarVictoria() {
    if (paraulaActual.join('') === paraulaSecreta.join('')) {
        paraulaActualObj.style.backgroundColor = "green";
        deshabilitarBoto();
        actualitzarEstadistiques(true); // Gana la partida
        resetPartida();
    }
}

function perdrePartida() {
    paraulaActualObj.textContent = paraulaSecreta.join(' ');
    paraulaActualObj.style.backgroundColor = "red";
    deshabilitarBoto();
    actualitzarEstadistiques(false); // Pierde la partida
    resetPartida();
}

function actualitzarEstadistiques(guanyada) {
    totalPartides++;
    totalPartidesObj.textContent = totalPartides;
    
    if (guanyada) {
        partidesGuanyades++;
        partidesGuanyadesObj.textContent = partidesGuanyades;
    }

    let percentatgeGuanyades = (partidesGuanyades / totalPartides) * 100;
    percentatgeGuanyadesObj.textContent = Math.round(percentatgeGuanyades);

    if (puntsActuals > millorPuntuacio) {
        millorPuntuacio = puntsActuals;
        millorPuntuacioData = new Date().toLocaleString();
        millorPartidaObj.textContent = `${millorPuntuacioData} - ${millorPuntuacio} punts`;
    }
}

function resetPartida() {
    inpuObj.disabled = false;
    buttObj.disabled = false;
    paraulaActual = [];
}

function habilitarBoto() {
    for (let i = 1; i <= 26; i++) {
        let literal = "boto" + i;
        const botoA = document.getElementById(literal);
        botoA.disabled = false;
        botoA.classList.remove('boto-deshabilitat', 'boto-seleccionat');
        botoA.classList.add('boto-habilitat');
    }
}

function deshabilitarBoto() {
    for (let i = 1; i <= 26; i++) {
        let literal = "boto" + i;
        const botoA = document.getElementById(literal);
        botoA.disabled = true;
        botoA.classList.remove('boto-habilitat');
        botoA.classList.add('boto-deshabilitat');
    }
}

function paraulaActualInicial() {
    paraulaActual = Array(paraulaSecreta.length).fill('_');
    mostrarParaulaPantalla();
}

function mostrarParaulaPantalla() {
    paraulaActualObj.textContent = paraulaActual.join(' ');
}

deshabilitarBoto();
