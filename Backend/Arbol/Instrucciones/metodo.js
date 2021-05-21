const errores = require("../Error/listaError");
const simbolo = require("../simbolo");
const instruccion = require("./instruccion");

class metodo extends instruccion{
    constructor(tipo, nombre, parametros, instrucciones, linea, columna){
        super();
        this.tipo = tipo;
        this.nombre = nombre;
        this.parametros = parametros;
        this.instrucciones = instrucciones;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(entorno){
        console.log(this.nombre);
        console.log(this.parametros.length);
        if (!entorno.existeMetodo(this.nombre)){
            let sim = new simbolo(this.tipo, this.nombre, null, this.linea, this.columna);
            sim.setParametros(this.parametros);
            sim.setInstrucciones(this.instrucciones);
            entorno.global.agregarSimbolo(this.nombre, sim);
        }else
            errores.agregarError('semantico', 'Ya existe el metodo/funcion ' + this.nombre, this.linea, this.columna);
    }
}

module.exports = metodo;