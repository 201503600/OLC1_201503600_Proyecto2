const expresion = require('./expresion');

class primitivo extends expresion{
    constructor(tipoValor, valor){
        super();
        this.valor = valor;
        this.tipo = tipoValor;
    }

    getTipo(){
        return this.tipo;
    }

    getValor(){
        return this.valor;
    }
}

module.exports = primitivo;