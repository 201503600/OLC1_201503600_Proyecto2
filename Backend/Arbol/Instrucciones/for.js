const instruccion = require('./instruccion');
const expresion = require('../Expresiones/expresion');
const tipo = require('../Expresiones/tipos');
const errores = require('../Error/listaError');
const display = require('../Salida/display');
const _break = require('./break');
const _continue = require('./continue');
const declaracion = require('./declaracion');

class _for extends instruccion{
    constructor(inicializacion, condicion, accion, instrucciones, linea, columna){
        super();
        this.inicializacion = inicializacion;
        this.condicion = condicion;
        this.accion = accion;
        this.instrucciones = instrucciones;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(entorno){
        /* Primero se verifica si es declaracion o asignacion */
        if (this.inicializacion instanceof declaracion){
            /* Si es declaracion se debe verificar que venga consigo una expresion a asignar */
            console.log(this.inicializacion.valor);
            /*if (this.valor instanceof expresion){
                
            }*/
        }
    }
}

module.exports = _for;