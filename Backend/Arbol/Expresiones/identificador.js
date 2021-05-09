const expresion = require('./expresion');
const simbolo = require('../simbolo');
const tipo = require('./tipos');

class id extends expresion{
    constructor(nombre){
        super();
        this.nombre = nombre;
    }

    getTipo(entorno){
        let sim = entorno.obtenerSimbolo(this.nombre);
        return (sim === null)?tipo.ERROR:sim.getTipo();
    }

    getValor(entorno){
        let sim = entorno.obtenerSimbolo(this.nombre);
        //console.log(sim);
        //console.log(sim.getValor());
        return (sim === null)?new simbolo(tipo.ERROR, '', ''):sim.valor;
    }
}

module.exports = id;