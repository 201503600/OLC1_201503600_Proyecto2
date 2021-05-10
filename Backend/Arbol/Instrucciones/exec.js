const instruccion = require("./instruccion");

class exec extends instruccion{
    constructor(llamada, linea, columna){
        super();
        this.llamada = llamada;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(entorno){
        this.llamada.ejecutar(entorno);
    }
}

module.exports = exec;