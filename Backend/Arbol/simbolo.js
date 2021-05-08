class simbolo{
    constructor(tipo, nombre, valor){
        this.tipo = tipo;
        this.nombre = nombre;
        this.valor = valor;
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
}

module.exports = simbolo;