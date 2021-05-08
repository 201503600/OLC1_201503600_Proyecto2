class Output{
    constructor(){
        this.salida = '';

        if (typeof Output._instance === "object"){
            return Output._instance;
        }
        Output._instance = this;
        return this;
    }

    static getInstance() {
        return this._instance;
    }

    agregarTexto(texto){
        this.salida += texto;
    }

    getSalida(){
        return this.salida;
    }

    limpiar(){
        this.salida = '';
    }
}

const output = new Output();
module.exports = output;