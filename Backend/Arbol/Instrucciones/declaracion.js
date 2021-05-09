const instruccion = require("./instruccion");
const errores = require('../Error/listaError');
const tipo = require('../Expresiones/tipos');
const expresion = require("../Expresiones/expresion");
const simbolo = require('../simbolo');

class declaracion extends instruccion{
    constructor(tipo, nombre){
        super();
        this.tipo = tipo;
        this.nombre = nombre;
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
                if (this.tipo === this.valor.getTipo(entorno))
                    entorno.agregarSimbolo(this.nombre, new simbolo(this.tipo, this.nombre, v));
                else
                    errores.agregarError('semantico', 'El tipo de la variable ' + this.nombre + ' debe ser ' + this.getStringTipo(), -1, -1);
            }            
        }else{
            errores.agregarError('semantico', 'Ya existe la variable ' + this.nombre, -1, -1);
        }
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
}

module.exports = declaracion;