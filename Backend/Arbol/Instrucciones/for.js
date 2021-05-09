const instruccion = require('./instruccion');
const expresion = require('../Expresiones/expresion');
const tipo = require('../Expresiones/tipos');
const errores = require('../Error/listaError');
const display = require('../Salida/display');
const _break = require('./break');
const _continue = require('./continue');
const declaracion = require('./declaracion');
const simbolo = require('../simbolo');
const asignacion = require('./asignacion');
const Entorno = require('../entorno');

class _for extends instruccion{
    constructor(inicializacion, condicion, accion, instrucciones, linea, columna){
        super();
        this.inicializacion = inicializacion;
        this.condicion = condicion;
        this.accion = accion;
        this.instrucciones = instrucciones;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(entorno){
        let inicio;
        /* Primero se verifica si es declaracion o asignacion */
        if (this.inicializacion instanceof declaracion){
            /* Si es declaracion se debe verificar que venga consigo una expresion a asignar */
            if (this.inicializacion.valor instanceof expresion){
                /* Se obtiene el valor con el que se comenzara y se agrega la variable a la tabla de simbolos */
                let auxiliar = this.inicializacion.ejecutar(entorno);
                if (auxiliar === null)
                    return;
                else
                    inicio = auxiliar;
            }else{
                errores.agregarError('semantico', 'La declaracion del for debe estar inicializada', this.linea, this.columna);
                return;
            }
        }else if (this.inicializacion instanceof asignacion){
            let aux = this.inicializacion.ejecutar(entorno);
            if (aux === null)
                return;
            else
                inicio = aux;            
        }else{
            errores.agregarError('semantico', 'Parametro del for debe ser declaracion o asignacion', this.linea, this.columna);
            return;
        }

        //console.log('Se comenzara con el valor de ' + inicio);
        /** SE COMIENZA A EJECUTAR LAS INSTRUCCIONES **/
        display.agregar('ciclo');
        let local = new Entorno('Ciclo For', entorno, entorno.global);
        for(let i = 0; i < this.instrucciones.length; i++){
            let inst = this.instrucciones[i];
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
            if (i === this.instrucciones.length -1){
                /*** SE REALIZA LA ACCION ***/
                if (this.accion instanceof asignacion){
                    this.accion.ejecutar(local);
                }else if (this.accion instanceof expresion){ // ES UN INCREMENTO O DECREMENTO
                    let newValor = this.accion.getValor(local);
                    let name = this.accion.izq.nombre;
                    let sim = entorno.obtenerSimbolo(name);
                    if (sim === null){
                        errores.agregarError('semantico', 'No existe la variable ' + name, this.linea, this.columna);
                        return;
                    }else{
                        if (sim.getTipo() === this.accion.getTipo(local))
                            entorno.setSimbolo(name, new simbolo(sim.getTipo(), name, newValor));
                        else{
                            errores.agregarError('semantico', 
                                                    'El tipo de ' + name + ' debe ser ' + getStringTipo(sim.getTipo()), 
                                                    this.linea, this.columna);
                            return;
                        }
                    }
                }else if (this.accion instanceof instruccion){
                    this.accion.ejecutar(local);
                }
                /*** SE EVALUA LA CONDICION ***/
                if (this.condicion instanceof expresion){
                    if (this.condicion.getValor(local) && this.condicion.getTipo(local) === tipo.BOOLEAN)
                        i = -1;
                }
            }

        }
        if (display.getUltimo() === 'ciclo')
            display.deleteUltimo();
    }
}

module.exports = _for;