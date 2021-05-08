const instruccion = require('./instruccion');
const expresion = require('./expresion');
const tipo = require('./tipos');
const errores = require('./Error/listaError');

class _if extends instruccion{
    /*constructor(listaCondicion, listaSentenciasV, listaSentenciasF){
        this.condiciones = listaCondicion;
        this.sentenciasV = listaSentenciasV;
        this.sentenciasF = listaSentenciasF;
    }*/

    constructor(listaCondicion, listaSentenciasV, linea, columna){
        super();
        this.condiciones = listaCondicion;
        this.sentenciasV = listaSentenciasV;
        this.sentenciasF = [];
        this.linea = [linea];
        this.columna = [columna];
    }

    ejecutar(){
        for(let i = 0; i < this.condiciones.length; i++){
            let resultado = this.condiciones[i].getValor();
            if (this.condiciones[i].getTipo() === tipo.BOOLEAN){
                if (resultado){
                    /* Se cumple la condicion y se recorren las sentencias */
                    for(let j = 0; j < this.sentenciasV[i].length; j++){
                        if (this.sentenciasV[i][j] instanceof expresion){
                            let valor = this.sentenciasV[i][j].getValor(); // Para incremento y decremento
                            /*if this.sentencias[i] typeof _return{
                                return valor;
                            }*/    
                        }else if (this.sentenciasV[i][j] instanceof instruccion){
                            this.sentenciasV[i][j].ejecutar();
                        }
                    }
                    break;
                } else if (i == this.condiciones.length - 1){
                    // Se valida si es la ultima condicion para buscar un else
                    if (this.sentenciasF === undefined){
                        // No existe un else
                    }else{
                        // Existe un else y se ejecutan sus instrucciones
                        for(let j = 0; j < this.sentenciasF.length; j++){
                            if (this.sentenciasF[j] instanceof expresion){
                                let valor = this.sentenciasF[j].getValor(); // Para incremento y decremento
                                /*if this.sentencias[i] typeof _return{
                                    return valor;
                                }*/    
                            }else if (this.sentenciasF[j] instanceof instruccion){
                                this.sentenciasF[j].ejecutar();
                            }
                        }
                    }
                }
            }else{
                /* Se agrega a errores semanticos */
                console.log('Valor de i ' + i);
                console.log('Lineas ' + this.linea);
                console.log('Columnas ' + this.columna);
                errores.agregarError('semantico', 'La condicion debe ser un valor booleano', this.linea[i], this.columna[i]);
            }
        }
    }

    agregarElseIf(condicion, sentenciasV, linea, columna){
        this.condiciones.push(condicion);
        this.sentenciasV.push(sentenciasV);
        this.linea.push(linea);
        this.columna.push(columna);
    }

    agregarElse(sentencias){
        this.sentenciasF = sentencias;
    }
}

module.exports = _if;