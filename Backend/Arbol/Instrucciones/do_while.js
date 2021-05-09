const instruccion = require('./instruccion');
const expresion = require('../Expresiones/expresion');
const tipo = require('../Expresiones/tipos');
const errores = require('../Error/listaError');
const display = require('../Salida/display');
const _break = require('./break');
const _continue = require('./continue');
const Entorno = require('../entorno');

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
        let local = new Entorno('Ciclo Do-While',entorno, entorno.global);
        let sizeLista = this.instrucciones.length;
        for(let i = 0; i < sizeLista; i++){
            let inst = this.instrucciones[i];
            if (inst instanceof expresion){
                let valor = inst.getValor(local); // Para incremento y decremento
                /*if this.sentencias[i] typeof _return{
                    return valor;
                }*/    
            }else if (inst instanceof instruccion){
                let auxiliar = inst.ejecutar(local);
                if (auxiliar instanceof _break){
                    break;
                }else if ( auxiliar instanceof _continue) {
                    i = sizeLista - 1;
                }
            }
            if (i == sizeLista - 1 && this.condicion.getValor(local) 
                && this.condicion.getTipo(local) === tipo.BOOLEAN)
                i = -1;
        }
        if (display.getUltimo() === 'ciclo')
            display.deleteUltimo();
    }
}

module.exports = _doWhile;