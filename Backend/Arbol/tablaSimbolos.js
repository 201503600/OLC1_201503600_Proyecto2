const simbolo = require('./simbolo');

class TablaSimbolo{
    constructor(){
        this.simbolos = [];
    }

    agregarSimbolo(tipo, nombre, valor){
        this.simbolos.push(new simbolo(tipo, nombre, valor));
    }
}

module.exports = TablaSimbolo;