const Entorno = require("../entorno");
const errores = require("../Error/listaError");
const tipo = require("../Expresiones/tipos");
const simbolo = require("../simbolo");
const expresion = require("../Expresiones/expresion");
const instruccion = require("./instruccion");
const primitivo = require("../Expresiones/primitivo");
const _return = require("./return");
const display = require("../Salida/display");

class llamada extends instruccion{
    constructor(nombre, parametros, linea, columna){
        super();
        this.tipo;
        this.nombre = nombre;
        this.parametros = parametros;
        this.linea = linea;
        this.columna = columna;
    }

    getTipo(entorno){
        return this.tipo;
    }

    ejecutar(entorno){
        if (entorno.existeMetodo(this.nombre)){
            let metFunc = entorno.obtenerMetodo(this.nombre);
            let local;
            this.tipo = metFunc.getTipo();
            if (metFunc.getTipo() === tipo.VOID){
                local = new Entorno('Metodo ' + this.nombre, entorno, entorno.global);
                display.agregar('metodo');
            }else{
                local = new Entorno('Funcion ' + this.nombre, entorno, entorno.global);
                display.agregar('funcion');
            }
            /* SE VALIDAN LOS PARAMETROS: PRIMERO LA CANTIDAD Y LUEGO LOS TIPOS */
            let sizeParam = metFunc.getParametros().length;
            if (this.parametros.length == sizeParam){
                let i;
                let paramFormal, paramLlamada;
                let valoresLlamada = [];
                let bandera = true;
                for(i = 0; i < sizeParam; i++){
                    let paramActual = this.parametros[i];
                    if (paramActual instanceof expresion){
                        valoresLlamada.push(paramActual.getValor(local));
                        paramLlamada = paramActual.getTipo(local);
                    }else if (paramActual instanceof llamada){
                        let res = paramActual.ejecutar(local);
                        valoresLlamada.push(res.getValor(local));
                        paramLlamada = res.getTipo(local);
                    }
                    paramFormal = metFunc.getParametros()[i].tipo;

                    if (paramFormal != paramLlamada){
                        errores.agregarError('semantico', 'El tipo de los parametros deben ser igual', this.linea, this.columna);
                        bandera = false;
                        break;
                    }
                }
                /* SE AGREGAN LOS PARAMETROS A LA TABLA DE SIMBOLOS */
                if (bandera){
                    for(i = 0; i < sizeParam; i++){
                        let param = metFunc.getParametros()[i];
                        local.agregarSimbolo(param.nombre, new simbolo(param.tipo, param.nombre, valoresLlamada[i], this.linea, this.columna));
                    }

                    //console.log('se ejecuta llamada');
                    /* SE EJECUTAN LAS INSTRUCCIONES */
                    sizeParam = metFunc.getInstrucciones();
                    for(i = 0; i < sizeParam.length; i++){
                        let inst = sizeParam[i];
                        console.log(inst);
                        if (inst instanceof expresion){
                            let valor = auxiliar.getValor(local);
                        }else if (inst instanceof instruccion){
                            //console.log('entra aca');
                            let auxiliar = inst.ejecutar(local);
                            console.log(auxiliar);
                            if (auxiliar instanceof _return){ // return;
                                if (auxiliar.expresion === null){ // Es un metodo
                                    display.deleteUltimo();
                                    break;
                                }else{//Es funcion
                                    let t;
                                    let val;
                                    if (auxiliar.expresion instanceof expresion){
                                        val = auxiliar.expresion.getValor(local);
                                        t = auxiliar.expresion.getTipo(local);
                                    }else if (auxiliar.expresion instanceof llamada){
                                        let res = auxiliar.expresion.ejecutar(local);
                                        val = res.getValor(local);
                                        t = res.getTipo(local);
                                    }
                                    //let val = auxiliar.expresion.getValor(local);
                                    //let t = auxiliar.expresion.getTipo(local);
                                    if (t === metFunc.getTipo()){
                                        if (display.getUltimo() === 'metodo' || display.getUltimo() === 'funcion')
                                            display.deleteUltimo();
                                        return new primitivo(this.tipo, val);
                                    }else
                                        errores.agregarError('semantico', 'El tipo de retorno es distinto al tipo de funcion', 
                                                                this.linea, this.columna);
                                }
                            }
                        }
                    }
                }
            }else
                errores.agregarError('semantico', 'La cantidad de parametros no es igual', this.linea, this.columna);
            if (display.getUltimo() === 'metodo' || display.getUltimo() === 'funcion')
                display.deleteUltimo();
        }else
            errores.agregarError('semantico', 'No existe el metodo/funcion ' + this.nombre, this.linea, this.columna);
    }
}

module.exports = llamada;