const instruccion = require('./instruccion');
const tipo = require('./tipos');

class _if extends instruccion{
    constructor(condicion, listaSentencias){
        this.condicion = condicion;
        this.sentencias = listaSentencias;
    }

    ejecutar(){
        let resultado = this.condicion.getValor(); 
        if (this.condicion.getTipo() === tipo.BOOLEAN){
            if (resultado){
                /* Se cumple la condicion y se recorren las sentencias */
                for(i in this.sentencias){
                    this.sentencias[i].ejecutar();
                    /* if this.sentencias[i] typeof expresion{
                        let valor = this.sentencias[i].getValor();
                        if this.sentencias[i] typeof _return{
                            return valor;
                        }

                    }else{
                        this.sentencias[i].ejecutar();
                    }*/
                }
            }
        }else{
            /* Se agrega a errores semanticos */
        }
    }
}

module.exports = _if;