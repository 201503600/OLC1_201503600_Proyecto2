const instruccion = require("./instruccion");
const expresion = require("../Expresiones/expresion");
const errores = require('../Error/listaError');
const tipo = require('../Expresiones/tipos');
const simbolo = require('../simbolo');
const llamada = require("./llamada");

class asignacion extends instruccion{
    constructor(nombre, valor, linea, columna){
        super();
        this.nombre = nombre;
        this.valor = valor;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(entorno){
        if (entorno.existeSimbolo(this.nombre)){
            //console.log(this.tipo);
            let tipo = entorno.obtenerSimbolo(this.nombre).getTipo(entorno);
            //console.log(this.valor);
            if (this.valor instanceof expresion){
                //console.log('Entra aca');
                let v = this.valor.getValor(entorno);
                console.log(v);
                if (tipo === this.valor.getTipo(entorno)){
                    entorno.setSimbolo(this.nombre, new simbolo(tipo, this.nombre, v, this.linea, this.columna));
                    return v;
                }else
                    errores.agregarError('semantico', 'El tipo de la variable ' + this.nombre + ' debe ser ' + this.getStringTipo(tipo), this.linea, this.columna);
            }else if (this.valor instanceof llamada){
                let v = this.valor.ejecutar(entorno);
                if (v !== undefined){
                    if (tipo === this.valor.getTipo(entorno)){
                        entorno.setSimbolo(this.nombre, new simbolo(tipo, this.nombre, v, this.linea, this.columna));
                        return v;
                    }else
                        errores.agregarError('semantico', 'El tipo de la variable ' + this.nombre + ' debe ser ' + this.getStringTipo(tipo), this.linea, this.columna);
                }else
                    errores.agregarError('semantico', 'Un metodo no devuelve un valor', this.linea, this.columna);
            }
        }else{
            errores.agregarError('semantico', 'No existe la variable ' + this.nombre, this.linea, this.columna);
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