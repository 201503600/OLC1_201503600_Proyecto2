const instruccion = require('./instruccion');
const expresion = require('../Expresiones/expresion');
const tipo = require('../Expresiones/tipos');
const errores = require('../Error/listaError');
const display = require('../Salida/display');
const _break = require('./break');
const Entorno = require('../entorno');
const _return = require('./return');

class _switch extends instruccion{
    constructor(valor){
        super();
        this.valor = valor;
        this.listaCondiciones = [];
        this.listaCases = [];
        this.insDefault = [];
    }

    setCases(condicion, cases){
        this.listaCondiciones = condicion;
        this.listaCases = cases;
    }

    setDefault(insDefault){
        this.insDefault = insDefault;
    } 

    ejecutar(entorno){
        display.agregar("switch");
        let local = new Entorno('Sentencia de control Switch', entorno, entorno.global); 
        let resultado = this.valor.getValor(local);
        let resCase;
        let bandera = true;
        if (this.valor.getTipo(local) != tipo.ERROR){
            for (let i = 0; i < this.listaCondiciones.length; i++){
                let cond = this.listaCondiciones[i];
                resCase = cond.getValor(local);
                //console.log('SI SE PUDO \O/ ');
                if (resultado == resCase && this.valor.getTipo(local) === cond.getTipo(local) && bandera){ 
                    // Entra al case
                    //console.log(this.listaCases[i]);
                    for (let j = 0; j < this.listaCases[i].length; j++){
                        let inst = this.listaCases[i][j];
                        if (inst instanceof expresion){
                            console.log('entra a switch');
                            let valor = inst.getValor(local); // Para incremento y decremento
                            /*if this.sentencias[i] typeof _return{
                                return valor;
                            }*/    
                        }else if (inst instanceof instruccion){
                            let auxiliar = inst.ejecutar(local);
                            console.log(auxiliar);
                            if (auxiliar instanceof _break){
                                bandera = false;
                                display.deleteUltimo();
                                j = this.listaCases[i].length;
                            }else if (auxiliar instanceof _return){
                                display.deleteUltimo();
                                return auxiliar;
                            }
                        }
                    }
                } 
                if (i == this.listaCondiciones.length - 1){
                    // Ya es el ultimo case y se verifica default
                    //console.log(this.insDefault);
                    if (this.insDefault === undefined){
                        // No existe un else
                    }else if (bandera){
                        // Existe un else y se ejecutan sus instrucciones
                        for(let j = 0; j < this.insDefault.length; j++){
                            let def = this.insDefault[j];
                            if (def instanceof expresion){
                                let valor = def.getValor(local); // Para incremento y decremento
                                /*if this.sentencias[i] typeof _return{
                                    return valor;
                                }*/    
                            }else if (def instanceof instruccion){
                                let auxiliar = def.ejecutar(local);
                                if (auxiliar instanceof _break){
                                    bandera = false;
                                    display.deleteUltimo();
                                    j = this.insDefault.length;
                                }else if (auxiliar instanceof _return){
                                    display.deleteUltimo();
                                    return auxiliar;
                                }
                            }
                        }
                    }
                }
            }
        }
        if (display.getUltimo() === 'switch')
            display.deleteUltimo();
    }
}

module.exports = _switch;