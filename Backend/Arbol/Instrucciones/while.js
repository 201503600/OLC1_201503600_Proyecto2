const instruccion = require('./instruccion');
const expresion = require('../Expresiones/expresion');
const tipo = require('../Expresiones/tipos');
const errores = require('../Error/listaError');
const display = require('../Salida/display');
const _break = require('./break');
const _continue = require('./continue');
const Entorno = require('../entorno');

class _while extends instruccion{
    constructor(condicion, instrucciones, linea, columna){
        super();
        this.condicion = condicion;
        this.instrucciones = instrucciones;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(entorno){
        let resVal = this.condicion.getValor(entorno);
        let resTipo = this.condicion.getTipo(entorno);
        //console.log('Se evalua condicion');
        if (resTipo === tipo.BOOLEAN){
            if (resVal){
                //console.log('Se crea entorno local de while');
                display.agregar("ciclo");
                let local = new Entorno('Ciclo While', entorno,entorno.global); 
                for(let i = 0; i < this.instrucciones.length; i++){
                    let inst = this.instrucciones[i];
                    //console.log('Se ejecuta instruccion ' + inst);
                    if (inst instanceof expresion){
                        let valor = inst.getValor(local); // Para incremento y decremento
                        /*if this.sentencias[i] typeof _return{
                            return valor;
                        }*/    
                    }else if (inst instanceof instruccion){
                        let auxiliar = inst.ejecutar(local);
                        if (auxiliar instanceof _break){
                            break;
                        }else if ( auxiliar instanceof _continue) {
                            i = this.instrucciones.length - 1;
                        }
                    }
                    //console.log('Se evalua nuevamente la condicion de while');
                    if (i === (this.instrucciones.length - 1) && this.condicion.getValor(local) 
                        && this.condicion.getTipo(local) === tipo.BOOLEAN){
                            i = -1;
                        }
                }
                if (display.getUltimo() === 'ciclo')
                    display.deleteUltimo();
            }
        }
    }
}

module.exports = _while;