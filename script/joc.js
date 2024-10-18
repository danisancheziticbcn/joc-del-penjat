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
    let lletraEncertada = false;
    let lletresEncertades = 0;

    if (paraulaSecreta.includes(lletraJugada)) {
        for (let i = 0; i < paraulaSecreta.length; i++) {
            if (paraulaSecreta[i] === lletraJugada) {
                paraulaActual[i] = lletraJugada;
                lletraEncertada = true;
                lletresEncertades++;
            }
        }
    } else {
        jugadaFallada++;
        imgObj.src = "img/penjat_" + jugadaFallada + ".jpg";
    }

    mostrarParaulaPantalla();
    puntsActualsObj.textContent = puntsActuals;
    obj.disabled = true;
    obj.classList.remove('boto-habilitat');
    obj.classList.add('boto-seleccionat');

    if (lletraEncertada) {
        encertsConsecutius++;
        let punts = encertsConsecutius * lletresEncertades;
        puntsActuals += punts;
        mostrarParaulaPantalla();
        comprovarVictoria();
    } else {
        encertsConsecutius = 0;
        if (puntsActuals > 0) {
            puntsActuals--;
        }
        if (jugadaFallada >= maxJugadesFallades) {
            perdrePartida();
        }
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
    paraulaActualObj.classList.remove("ganado", "perdido");
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
