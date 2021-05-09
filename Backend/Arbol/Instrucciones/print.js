const instruccion = require('./instruccion');
const output = require('../Salida/output');

class print extends instruccion{
    constructor(valor){
        super();
        this.expresion = valor;
    }

    ejecutar(entorno){
        let resultado = this.expresion.getValor(entorno).toString().replace(/\"/g,"");
        output.agregarTexto('> ' + resultado + '\n');
    }
}

module.exports = print;