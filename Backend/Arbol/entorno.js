const errores = require('./Error/listaError');

class Entorno{
    constructor(padre, global){
        this.tsimbolos = [];
        this.padre = padre;
        this.global = global;
    }

    agregarSimbolo(nombre, simbolo){
        this.tsimbolos.push({'nombre':nombre,'valor': simbolo});
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
                if (a.tsimbolos[i].nombre.toString().toLowerCase() === nombre.toString().toLowerCase()){
                    a.tsimbolos[i].valor = simbolo;
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
        return false;
    }
}

module.exports = Entorno;