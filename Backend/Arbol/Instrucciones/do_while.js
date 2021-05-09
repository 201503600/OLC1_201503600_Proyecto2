const instruccion = require('./instruccion');
const expresion = require('../Expresiones/expresion');
const tipo = require('../Expresiones/tipos');
const errores = require('../Error/listaError');
const display = require('../Salida/display');
const _break = require('./break');
const _continue = require('./continue');

class _doWhile extends instruccion{
    constructor(condicion, instrucciones, linea, columna){
        super();
        this.condicion = condicion;
        this.instrucciones = instrucciones;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(entorno){
        display.agregar("ciclo");
        for(let i = 0; i < this.instrucciones.length; i++){
            if (this.instrucciones[i] instanceof expresion){
                let valor = this.instrucciones[i].getValor(entorno); // Para incremento y decremento
                /*if this.sentencias[i] typeof _return{
                    return valor;
                }*/    
            }else if (this.instrucciones[i] instanceof instruccion){
                let auxiliar = this.instrucciones[i].ejecutar(entorno);
                if (auxiliar instanceof _break){
                    break;
                }else if ( auxiliar instanceof _continue) {
                    i = this.instrucciones.length - 1;
                }
            }
            if (i == this.instrucciones.length - 1 && this.condicion.getValor(entorno) 
                && this.condicion.getTipo(entorno) === tipo.BOOLEAN)
                i = -1;
        }
        if (display.getUltimo() === 'ciclo')
            display.deleteUltimo();
    }
}

module.exports = _doWhile;