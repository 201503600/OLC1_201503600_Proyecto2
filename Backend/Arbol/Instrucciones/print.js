const instruccion = require('./instruccion');
const output = require('../Salida/output');

class print extends instruccion{
    constructor(valor){
        super();
        this.expresion = valor;
    }

    ejecutar(){
        let resultado = this.expresion.getValor().toString().replace(/\"/g,"");
        output.agregarTexto('> ' + resultado + '\n');
    }
}

module.exports = print;