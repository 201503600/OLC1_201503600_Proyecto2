const expresion = require('./expresion');

class primitivo extends expresion{
    constructor(tipoValor, valor){
        super();
        this.valor = valor;
        this.tipo = tipoValor;
    }

    getTipo(entorno){
        return this.tipo;
    }

    getValor(entorno){
        return this.valor;
    }
}

module.exports = primitivo;