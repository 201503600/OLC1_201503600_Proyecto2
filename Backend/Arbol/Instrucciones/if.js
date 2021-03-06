const instruccion = require('./instruccion');
const expresion = require('../Expresiones/expresion');
const tipo = require('../Expresiones/tipos');
const errores = require('../Error/listaError');
const display = require('../Salida/display');
const _break = require('./break');
const _continue = require('./continue');
const Entorno = require('../entorno');
const _return = require('./return');

class _if extends instruccion{
    constructor(listaCondicion, listaSentenciasV, linea, columna){
        super();
        this.condiciones = listaCondicion;
        this.sentenciasV = listaSentenciasV;
        this.sentenciasF = [];
        this.linea = [linea];
        this.columna = [columna];
    }

    ejecutar(entorno){
        for(let i = 0; i < this.condiciones.length; i++){
            let resultado = this.condiciones[i].getValor(entorno);
            //console.log(this.condiciones[i]);
            //console.log(resultado);
            if (this.condiciones[i].getTipo() === tipo.ERROR){
                return;
            }
            if (this.condiciones[i].getTipo(entorno) === tipo.BOOLEAN){
                if (resultado){
                    /* Se cumple la condicion y se recorren las sentencias */
                    let local = new Entorno('Sentencia de control If', entorno, entorno.global);
                    for(let j = 0; j < this.sentenciasV[i].length; j++){
                        let d = this.sentenciasV[i][j];
                        if (d instanceof expresion){
                            let valor = d.getValor(local); // Para incremento y decremento
                            /*if this.sentencias[i] typeof _return{
                                return valor;
                            }*/    
                        }else if (d instanceof instruccion){
                            let auxiliar = d.ejecutar(local);
                            if (auxiliar instanceof _break || auxiliar instanceof _continue || auxiliar instanceof _return){
                                j = this.sentenciasV[i].length;
                                return auxiliar;
                            }
                        }
                    }
                    break;
                } else if (i == this.condiciones.length - 1){
                    // Se valida si es la ultima condicion para buscar un else
                    if (this.sentenciasF === undefined){
                        // No existe un else
                    }else{
                        // Existe un else y se ejecutan sus instrucciones
                        let local = new Entorno('Sentencia de control Else', entorno, entorno.global);
                        for(let j = 0; j < this.sentenciasF.length; j++){
                            let sentencia = this.sentenciasF[j];
                            if (sentencia instanceof expresion){
                                let valor = sentencia.getValor(local); // Para incremento y decremento
                                /*if this.sentencias[i] typeof _return{
                                    return valor; 
                                }*/    
                            }else if (sentencia instanceof instruccion){
                                let auxiliar = sentencia.ejecutar(local);
                                if (auxiliar instanceof _break || auxiliar instanceof _continue || auxiliar instanceof _return){
                                    j = this.sentenciasF.length;
                                    return auxiliar;
                                }
                            }
                        }
                    }
                }
            }else{
                /* Se agrega a errores semanticos */
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