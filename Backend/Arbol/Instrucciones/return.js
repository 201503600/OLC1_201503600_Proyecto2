const instruccion = require("./instruccion");
const display = require("../Salida/display");

class _return extends instruccion{
    constructor(expresion, linea, columna){
        super();
        this.expresion = expresion;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(entorno){
        let ultimo = display.getFuncion();
        //console.log(ultimo);
        if (ultimo){ // return <e>;
            return this;
        }else{
            errores.agregarError('semantico','Hay un return fuera de un metodo/funcion', this.linea, this.columna);
            return null;
        }
    }
}

module.exports = _return;