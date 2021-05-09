const instruccion = require('./instruccion');

class _continue extends instruccion{
    constructor(linea, columna){
        super();
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(entorno){
        let ultimo = display.getUltimo();
        if (ultimo === 'ciclo'){
            return this;
        }else{
            errores.agregarError('semantico','Hay un continue fuera de ciclo', this.linea, this.columna);
            return null;
        }
    }
}

module.exports = _continue;