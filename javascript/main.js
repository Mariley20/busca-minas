'use strict'
//mover(0, 1); // derecha
//mover(0, -1);  //izquierda
//mover(1, 0);//abajo
//mover(-1, 0); //moverse arriba


const buscaMinas = {
    posicionBombas: undefined,
    inicio: () => {
        buscaMinas.tableroHTML();
        buscaMinas.ubicacionAleatoriaBombas();
        buscaMinas.configurarBTN();
    },
    configurarBTN: () => {
        $('td').click(buscaMinas.mostrarBombaHTML)
    },
    tableroHTML: () => {
        for (let i = 0; i < 8; i++) {
            $('#tablero').append(`<tr id='fila${i}'>`);
            for (let j = 0; j < 8; j++) {
                $('#fila' + i).append(`<td id='${i}-${j}'></td>`);
            }
        }
    },
    ubicacionAleatoriaBombas: () => {
        Array.prototype.unique = function (a) {
            return function () {
                return this.filter(a)
            }
        }(function (a, b, c) {
            return c.indexOf(a, b + 1) < 0
        });
        let bandera = true;
        while (bandera) {
        let nroAleatorio = [];
        let posicion = [];
            for (let i = 0; i < 11; i++) {
                let num = Math.floor((Math.random() * 8));
                nroAleatorio.push(num);
            }
            for (let j = 0; j < nroAleatorio.length; j++) {
                if (nroAleatorio[j + 1] != undefined) {
                    let num = nroAleatorio[j] + '-' + nroAleatorio[j + 1];
                    posicion.push(num);
                }
            }
            if (posicion.unique().length == 10) {
                bandera = false;
                buscaMinas.posicionBombas = posicion;
            }
        }
        console.log(buscaMinas.posicionBombas)
    },
    mostrarBombaHTML:(event) =>{
        let indiceBomba = event.target.id;
        let hayBomba = buscaMinas.buscarBomba(indiceBomba) 
        console.log(hayBomba);
        if(hayBomba){
            console.log(hayBomba+".."+indiceBomba);
            console.log($("td #3-4"))
            $('td#'+indiceBomba).append(`<i class="fa fa-bomb" aria-hidden="true"></i>`);
        }else{
            let nroBombas = buscaMinas.buscarBombaAlrededor(indiceBomba);
        }
    },
    buscarBomba: (indiceBomba) => {
        let existe = undefined;
        let x = buscaMinas.posicionBombas.filter((value) =>{
            return (value == indiceBomba);
        });
        (x.length)? existe = true : existe = false;
        return existe;
    },
    buscarBombaAlrededor: (indiceBomba) => {
        let posicionesAlrededor = [
            [-1, -1], [-1, 0], [-1, 1],  //arriba
            [0, -1], [0, 1],  //centro
            [1, -1], [1, 0], [1, 1] //abajo
        ];
        let indiceBombaArray = indiceBomba.split('-');
        let actualX = parseInt(indiceBombaArray[0]);
        let actualY = parseInt(indiceBombaArray[1]);
        let nroBombas = 0;
        //console.log(indiceBombaArray);
        console.log(posicionesAlrededor[1][0])
        for(let i = 0; i < posicionesAlrededor.length; i++){
            let posicionX = (actualX + posicionesAlrededor[i][0]);
            let posicionY = (actualY + posicionesAlrededor[i][1]);
            let comprobarBomba = buscaMinas.buscarBomba(posicionX+"-"+posicionY);
            if(comprobarBomba){
                nroBombas += 1;
            }  
        }
        $('td#'+indiceBomba).html(nroBombas+"");
    }
}
$(document).ready(buscaMinas.inicio)