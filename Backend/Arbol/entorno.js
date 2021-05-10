const errores = require('./Error/listaError');
const reportes = require('./Salida/reporte');
const tipo = require('./Expresiones/tipos');

class Entorno{
    constructor(nombre, padre, global){
        this.tsimbolos = [];
        this.nombre = nombre;
        this.padre = padre;
        if (global === null)
            this.global = this;
        else
            this.global = global;
    }

    agregarSimbolo(nombre, simbolo){
        this.tsimbolos.push({'nombre':nombre,'valor': simbolo});
        let t;
        if(simbolo.getParametros() !== undefined){
            if(simbolo.getTipo() === tipo.VOID)
                t = 'Metodo';
            else
                t = 'Funcion';
        }else
            t = 'Variable';
        reportes.agregarSimbolo('<tr><th scope="row">' + simbolo.getNombre() + '</th>' +
                                '<td>' + t + '</td><td>' + this.getStringTipo(simbolo.getTipo()) + '</td>' +
                                '<td>' + this.nombre + '</td><td>' + simbolo.getLinea() + '</td>' +
                                '<td>' + simbolo.getColumna() + '</td></tr>');
    }

    getStringTipo(t){
        switch(t){
            case tipo.VOID:
                return 'Void';
            case tipo.INT:
                return 'Entero';
            case tipo.DOUBLE:
                return 'Decimal';
            case tipo.BOOLEAN:
                return 'Booleano';
            case tipo.CHAR:
                return 'Caracter';
            case tipo.STRING:
                return 'Cadena';
        }
    }

    obtenerSimbolo(nombre){
        for(let a = this; a != null; a = a.padre){
            for(let i = 0; i < a.tsimbolos.length; i++){
                if (a.tsimbolos[i].nombre.toString().toLowerCase() === nombre.toString().toLowerCase())
                    return a.tsimbolos[i].valor;
            }
        }
        errores.agregarError('semantico', 'No existe la variable ' + nombre, -1, -1);
        return null;
    }

    setSimbolo(nombre, simbolo){
        //console.log("Entra a set simbolo");
        for(let a = this; a != null; a = a.padre){
            for(let i = 0; i < a.tsimbolos.length; i++){
                //console.log(a.tsimbolos[i].nombre.toString().toLowerCase());
                //console.log(nombre.toString().toLowerCase());
                let aux = a.tsimbolos[i];
                if (aux.nombre.toString().toLowerCase() === nombre.toString().toLowerCase()){
                    aux.valor = simbolo;
                    //console.log(a.tsimbolos[i].valor);
                    //console.log(this.tsimbolos[i].valor);
                    return;
                }
            }
        }
    }

    existeSimbolo(nombre){
        for(let i = 0; i < this.tsimbolos.length; i++){
            if (this.tsimbolos[i].nombre.toString().toLowerCase() === nombre.toString().toLowerCase())
                return true;
        }
        if (this.padre === null)
            return false;
        else{
            return this.padre.existeSimbolo(nombre);
        }
    }

    existeMetodo(nombre){
        let tablaGlobal = this.global.tsimbolos;
        for(let i = 0; i < tablaGlobal.length; i++){
            let sim = tablaGlobal[i];
            if (sim.nombre.toString().toLowerCase() === nombre.toString().toLowerCase()
                && sim.valor.getParametros() !== undefined)
                return true;
        }
        return false;
    }

    obtenerMetodo(nombre){
        let tablaGlobal = this.global.tsimbolos;
        for(let i = 0; i < tablaGlobal.length; i++){
            let sim = tablaGlobal[i];
            if (sim.nombre.toString().toLowerCase() === nombre.toString().toLowerCase()
                && sim.valor.getParametros() !== undefined)
                return sim.valor;
        }
        return null;
    }
}

module.exports = Entorno;