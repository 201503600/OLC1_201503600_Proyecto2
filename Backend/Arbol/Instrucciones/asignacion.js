const instruccion = require("./instruccion");
const errores = require('../Error/listaError');
const tipo = require('../Expresiones/tipos');
const simbolo = require('../simbolo');

class asignacion extends instruccion{
    constructor(nombre, valor){
        super();
        this.nombre = nombre;
        this.valor = valor;
    }

    ejecutar(entorno){
        if (entorno.existeSimbolo(this.nombre)){
            //console.log(this.tipo);
            let tipo = entorno.obtenerSimbolo(this.nombre).getTipo(entorno);
            //console.log(this.valor);
            //if (this.valor instanceof expresion){
                let v = this.valor.getValor(entorno);
                //console.log(v);
                if (tipo === this.valor.getTipo(entorno)){
                    entorno.setSimbolo(this.nombre, new simbolo(tipo, this.nombre, v));
                    return v;
                }else
                    errores.agregarError('semantico', 'El tipo de la variable ' + this.nombre + ' debe ser ' + this.getStringTipo(tipo), -1, -1);
            //}            
        }else{
            errores.agregarError('semantico', 'No existe la variable ' + this.nombre, -1, -1);
        }
        return null;
    }

    getStringTipo(t){
        switch(t){
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

module.exports = asignacion;