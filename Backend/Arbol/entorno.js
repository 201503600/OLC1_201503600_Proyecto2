const errores = require('./Error/listaError');

class Entorno{
    constructor(nombre, padre, global){
        this.tsimbolos = [];
        this.nombre = nombre;
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
}

module.exports = Entorno;