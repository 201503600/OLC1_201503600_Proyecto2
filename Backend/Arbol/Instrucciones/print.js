const instruccion = require('./instruccion');
const expresion = require('../Expresiones/expresion');
const output = require('../Salida/output');
const llamada = require('./llamada');

class print extends instruccion{
    constructor(valor){
        super();
        this.expresion = valor;
    }

    ejecutar(entorno){
        let resultado;
        let r1;
        if (this.expresion instanceof expresion)
            resultado = this.expresion.getValor(entorno);
        else if (this.expresion instanceof llamada){
            resultado = this.expresion.ejecutar(entorno).getValor(entorno);
        }
        
        output.agregarTexto('> ' + resultado + '\n');
    }
}

module.exports = print;