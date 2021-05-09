const instruccion = require('./instruccion');
const expresion = require('../Expresiones/expresion');
const tipo = require('../Expresiones/tipos');
const errores = require('../Error/listaError');
const display = require('../Salida/display');
const _break = require('./break');
const _continue = require('./continue');

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
        let resultado = this.valor.getValor(entorno);
        let resCase;
        let bandera = true;
        if (this.valor.getTipo(entorno) != tipo.ERROR){
            for (let i = 0; i < this.listaCondiciones.length; i++){
                resCase = this.listaCondiciones[i].getValor(entorno);
                //console.log(this.listaCondiciones[i]);
                if (resultado === resCase && this.valor.getTipo(entorno) === this.listaCondiciones[i].getTipo(entorno) && bandera){ 
                    // Entra al case
                    //console.log(this.listaCases[i]);
                    for (let j = 0; j < this.listaCases[i].length; j++){
                        if (this.listaCases[i][j] instanceof expresion){
                            let valor = this.listaCases[i][j].getValor(entorno); // Para incremento y decremento
                            /*if this.sentencias[i] typeof _return{
                                return valor;
                            }*/    
                        }else if (this.listaCases[i][j] instanceof instruccion){
                            let auxiliar = this.listaCases[i][j].ejecutar(entorno);
                            if (auxiliar instanceof _break){
                                bandera = false;
                                display.deleteUltimo();
                                j = this.listaCases[i].length;
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
                            if (this.insDefault[j] instanceof expresion){
                                let valor = this.insDefault[j].getValor(entorno); // Para incremento y decremento
                                /*if this.sentencias[i] typeof _return{
                                    return valor;
                                }*/    
                            }else if (this.insDefault[j] instanceof instruccion){
                                this.insDefault[j].ejecutar(entorno);
                                if (this.insDefault[j] instanceof _break){
                                    bandera = false;
                                    display.deleteUltimo();
                                    j = this.insDefault.length;
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