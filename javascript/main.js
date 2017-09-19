'use strict'
//mover(0, 1); // derecha
//mover(0, -1);  //izquierda
//mover(1, 0);//abajo
//mover(-1, 0); //moverse arriba

const buscaMinas = {
    inicio: () => {
        buscaMinas.tableroHTML();
    },
    tableroHTML: () => {
        for(let i = 0; i < 8; i++){
            $('#tablero').append(`<tr id='fila${i}'>`);
            for(let j = 0; j < 8; j++){
                $('#fila'+i).append(`<td id='${i},${j}'>${i},${j}</td>`);
            }
        }
    },
    ubicacionBombas: () =>{
        
    }
}
$(document).ready(buscaMinas.inicio)