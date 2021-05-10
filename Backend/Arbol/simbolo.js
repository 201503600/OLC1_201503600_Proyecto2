class simbolo{
    constructor(tipo, nombre, valor, linea, columna){
        this.tipo = tipo;
        this.nombre = nombre;
        this.valor = valor;
        this.linea = linea;
        this.columna = columna;
        this.parametros;
        this.instrucciones;
    }

    getTipo(){
        return this.tipo;
    }

    getNombre(){
        return this.nombre;
    }

    getValor(){
        return this.valor;
    }

    getLinea(){
        return this.linea;
    }

    getColumna(){
        return this.columna;
    }

    setParametros(params){
        this.parametros = params;
    }

    getParametros(){
        return this.parametros;
    }

    setInstrucciones(inst){
        this.instrucciones = inst;
    }

    getInstrucciones(){
        return this.instrucciones;
    }
}

module.exports = simbolo;