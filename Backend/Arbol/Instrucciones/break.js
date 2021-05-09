const instruccion = require('./instruccion');
const display = require('../Salida/display');
const errores = require('../Error/listaError');

class _break extends instruccion{
    constructor(linea, columna){
        super();
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(entorno){
        let ultimo = display.getUltimo();
        //console.log(ultimo);
        if (ultimo === 'switch' || ultimo === 'ciclo'){
            //console.log("Si entra al ultimo");
            return this;
        }else{
            errores.agregarError('semantico','Hay un break fuera de ciclo o switch', this.linea, this.columna);
            return null;
        }
    }
}

module.exports = _break;