const instruccion = require("./instruccion");
const errores = require('../Error/listaError');
const tipo = require('../Expresiones/tipos');
const expresion = require("../Expresiones/expresion");
const simbolo = require('../simbolo');

class declaracion extends instruccion{
    constructor(tipo, nombre, linea, columna){
        super();
        this.tipo = tipo;
        this.nombre = nombre;
        this.linea = linea;
        this.columna = columna;
        this.valor;
    }

    setValor(valor){
        this.valor = valor;
    }

    ejecutar(entorno){
        if (!entorno.existeSimbolo(this.nombre)){
            //console.log(this.tipo);
            if (this.valor instanceof expresion){
                let v = this.valor.getValor(entorno);
                if (this.tipo === this.valor.getTipo(entorno)){
                    entorno.agregarSimbolo(this.nombre, new simbolo(this.tipo, this.nombre, v, this.linea, this.columna));
                    return v;
                }else
                    errores.agregarError('semantico', 'El tipo de la variable ' + this.nombre + ' debe ser ' + this.getStringTipo(), this.linea, this.columna);
            }  else {
                /* SE CREA LA VARIABLE CON UN VALOR DEFAULT */
                let v = this.getValorDefault();
                entorno.agregarSimbolo(this.nombre, new simbolo(this.tipo, this.nombre, v, this.linea, this.columna));
                return v;
            }          
        }else{
            errores.agregarError('semantico', 'Ya existe la variable ' + this.nombre, this.linea, this.columna);
        }
        return null;
    }

    getStringTipo(){
        switch(this.tipo){
            case tipo.INT:
                return 'entero';
            case tipo.DOUBLE:
                return 'doble';
            case tipo.BOOLEAN:
                return 'booleano';
            case tipo.CHAR:
                return 'caracter';
            case tipo.STRING:
                return 'cadena';
        }
        return null;
    }

    getValorDefault(){
        switch(this.tipo){
            case tipo.INT:
                return 0;
            case tipo.DOUBLE:
                return 0;
            case tipo.BOOLEAN:
                return true;
            case tipo.CHAR:
                return '';
            case tipo.STRING:
                return "";
        }
    }
}

module.exports = declaracion;