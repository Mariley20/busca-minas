// principiante 10 minas y 8x8
// intermedio 40 minas 16x16
//experto 99 minas 31x16
// personlaizado
let posicionBombas = [];

tableroHTML(); //dibuja el tablero
ubicacionAleatoriaBombas(); // determina las ubicacion aleatoriade bombas
configurarBTN(); // añade evento click a cada td/celdita

function configurarBTN() {
    $('td').click(mostrarBombaHTML)
}

function tableroHTML() {
    for (let i = 0; i < 8; i++) {
        $('#tablero').append(`<tr id='fila${i}'>`);
        for (let j = 0; j < 8; j++) {
            $('#fila' + i).append(`<td id='${i}-${j}'></td>`);
        }
    }
}

function ubicacionAleatoriaBombas() {
    Array.prototype.unique = function(a) {
        return function() {
            return this.filter(a)
        }
    }(function(a, b, c) {
        return c.indexOf(a, b + 1) < 0
    });
    let bandera = true;
    while (bandera) {
        posicionBombas = [];
        let nroAleatorio = [];
        for (let i = 0; i < 11; i++) {
            let num = Math.floor((Math.random() * 8));
            nroAleatorio.push(num);
        }
        for (let j = 0; j < nroAleatorio.length; j++) {
            if (nroAleatorio[j + 1] != undefined) {
                let num = nroAleatorio[j] + '-' + nroAleatorio[j + 1];
                posicionBombas.push(num);
            }
        }
        if (posicionBombas.unique().length == 10) {
            bandera = false;
        }
    }
    console.log(posicionBombas)
}

function mostrarBombaHTML(event) {
    let indiceBomba = event.target.id;
    //console.log(indiceBomba)
    let hayBomba = buscarBomba(indiceBomba)
    if (indiceBomba != "") {
        if (hayBomba) {
            $('td#' + indiceBomba).append(`<i class="fa fa-bomb fa-lg" aria-hidden="true"></i>`);
            //perdiste juego falta implementar
        } else {
            let nroBombas = buscarBombaAlrededor(indiceBomba);
        }
    }
}

function buscarBomba(indiceBomba) {
    let existe = undefined;
    let x = posicionBombas.filter((value) => {
        return (value == indiceBomba);
    });
    (x.length) ? existe = true: existe = false;
    return existe;
}

function buscarBombaAlrededor(indiceBomba) {
    let posicionesAlrededor = [
        [-1, -1], // arriba izquierda
        [-1, 0], // arriba dentro
        [-1, 1], //arriba derecha
        [0, -1], //izquierda
        [0, 1], //derecha
        [1, -1], //abajo Inquierda
        [1, 0], //abajo centro
        [1, 1] //abajo derecha
    ];
    let indiceBombaArray = indiceBomba.split('-');
    let actualX = parseInt(indiceBombaArray[0]);
    let actualY = parseInt(indiceBombaArray[1]);
    let nroBombas = 0;
    for (let i = 0; i < posicionesAlrededor.length; i++) {
        let posicionX = (actualX + posicionesAlrededor[i][0]);
        let posicionY = (actualY + posicionesAlrededor[i][1]);
        let comprobarBomba = buscarBomba(posicionX + "-" + posicionY);
        if (comprobarBomba) {
            nroBombas += 1;
        }
    }
    //nroBombas = 0 debe aparecer los numeros de su contorno
    $('td#' + indiceBomba).html(nroBombas + "");
}