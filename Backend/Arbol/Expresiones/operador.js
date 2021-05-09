const expresion = require( './expresion');
const operacion = require('./operaciones');
const tipo = require('./tipos');
const errores = require('../Error/listaError');

class operador{
    constructor(tipoOperacion, izq, der, linea, columna){
        this.izq = izq;
        this.der = der;
        this.operacion = tipoOperacion;
        this.linea = linea;
        this.columna = columna;
        this.tipo;
    }

    getTipo(entorno){
        return this.tipo;
    }

    getValor(entorno){
        let opIzq;
        let opDer;
        let resultado;
        //console.log('IZQ: ' + (this.izq === operador)?'operador':'primitivo');
        //console.log('DER: ' + (this.der === operador)?'operador':'primitivo');
        if(this.izq instanceof operador)
            this.izq.getValor(entorno);
        if(this.der instanceof operador)
            this.der.getValor(entorno);

        switch (this.operacion){
            case operacion.INCREMENTO:
                
                break;
            case operacion.DECREMENTO:

                break;
            case operacion.SUMA:
                this.tipo = this.tipoDominanteSuma(this.izq.getTipo(entorno), this.der.getTipo(entorno));
                if (this.tipo === tipo.ERROR){
                    return resultado;
                }
                switch(this.izq.getTipo(entorno)){
                    case tipo.INT:
                        switch(this.der.getTipo(entorno)){
                            case tipo.INT:
                                opIzq = parseInt(this.izq.getValor(entorno));
                                opDer = parseInt(this.der.getValor(entorno)); 
                                resultado = opIzq + opDer;
                                return resultado; 
                            case tipo.DOUBLE:                                
                                opIzq = parseFloat(this.izq.getValor(entorno));
                                opDer = parseFloat(this.der.getValor(entorno));  
                                resultado = opIzq + opDer;
                                return resultado; 
                            case tipo.BOOLEAN:     
                                opIzq = parseInt(this.izq.getValor(entorno));
                                opDer = (this.der.getValor(entorno) == 'true')?1:0; 
                                resultado = opIzq + opDer;
                                return resultado; 
                            case tipo.CHAR:     
                                opIzq = parseInt(this.izq.getValor(entorno));
                                opDer = this.der.getValor(entorno).toString().replace("'","").charCodeAt(0); 
                                resultado = opIzq + opDer;
                                return resultado; 
                            case tipo.STRING:
                                opIzq = this.izq.getValor(entorno).toString();
                                opDer = this.der.getValor(entorno).toString().replace(/\"/g,""); 
                                resultado = opIzq + opDer;
                                return resultado; 
                        }
                        break;
                    case tipo.DOUBLE:
                        switch(this.der.getTipo(entorno)){
                            case tipo.INT:
                                opIzq = parseFloat(this.izq.getValor(entorno));
                                opDer = parseFloat(this.der.getValor(entorno)); 
                                resultado = opIzq + opDer;
                                return resultado; 
                            case tipo.DOUBLE:                                
                                opIzq = parseFloat(this.izq.getValor(entorno));
                                opDer = parseFloat(this.der.getValor(entorno));  
                                resultado = opIzq + opDer;
                                return resultado; 
                            case tipo.BOOLEAN:     
                                opIzq = parseFloat(this.izq.getValor(entorno));
                                opDer = (this.der.getValor(entorno) == 'true')?parseFloat(1):parseFloat(0); 
                                resultado = opIzq + opDer;
                                return resultado; 
                            case tipo.CHAR:     
                                opIzq = parseFloat(this.izq.getValor(entorno));
                                opDer = parseFloat(this.der.getValor(entorno).toString().replace("'","").charCodeAt(0)); 
                                resultado = opIzq + opDer;
                                return resultado; 
                            case tipo.STRING:
                                opIzq = this.izq.getValor(entorno).toString();
                                opDer = this.der.getValor(entorno).toString().replace(/\"/g,""); 
                                resultado = opIzq + opDer;
                                return resultado; 
                        }
                        break;
                    case tipo.BOOLEAN:
                        switch(this.der.getTipo(entorno)){
                            case tipo.INT:
                                opIzq = (this.izq.getValor(entorno) == 'true')?1:0;
                                opDer = parseInt(this.der.getValor(entorno)); 
                                resultado = opIzq + opDer;
                                return resultado; 
                            case tipo.DOUBLE:                                
                                opIzq = (this.izq.getValor(entorno) == 'true')?parseFloat(1):parseFloat(0);
                                opDer = parseFloat(this.der.getValor(entorno));  
                                resultado = opIzq + opDer;
                                return resultado;  
                            case tipo.STRING:
                                opIzq = (this.izq.getValor(entorno) == 'true')?'1':'0';
                                opDer = this.der.getValor(entorno).toString().replace(/\"/g,""); 
                                resultado = opIzq + opDer;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede sumar booleano con ' + this.getStringTipo(this.der.getTipo(entorno)), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede sumar booleano con ' 
                                        + this.getStringTipo(this.der.getTipo(entorno))
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.CHAR:
                        switch(this.der.getTipo(entorno)){
                            case tipo.INT:
                                opIzq = this.izq.getValor(entorno).toString().replace("'","").charCodeAt(0); 
                                opDer = parseInt(this.der.getValor(entorno)); 
                                resultado = opIzq + opDer;
                                return resultado; 
                            case tipo.DOUBLE:                                
                                opIzq = parseFloat(this.izq.getValor(entorno).toString().replace("'","").charCodeAt(0));
                                opDer = parseFloat(this.der.getValor(entorno));  
                                resultado = opIzq + opDer;
                                return resultado; 
                            case tipo.BOOLEAN:     
                                errores.agregarError('semantico', 
                                                        'No se puede sumar caracter con ' + this.getStringTipo(this.der.getTipo(entorno)), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede sumar caracter con ' 
                                        + this.getStringTipo(this.der.getTipo(entorno))
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                            case tipo.CHAR:     
                                opIzq = this.izq.getValor(entorno).toString().replace(/'/g,"");
                                opDer = this.der.getValor(entorno).toString().replace(/'/g,""); 
                                resultado = opIzq + opDer;
                                return resultado; 
                            case tipo.STRING:
                                opIzq = this.izq.getValor(entorno).toString().replace(/'/g,"");
                                opDer = this.der.getValor(entorno).toString().replace(/\"/g,""); 
                                resultado = opIzq + opDer;
                                return resultado; 
                        }
                        break;
                    case tipo.STRING:
                        switch(this.der.getTipo(entorno)){
                            case tipo.INT:
                                opIzq = this.izq.getValor(entorno).toString().replace(/\"/g,"");
                                opDer = this.der.getValor(entorno).toString(); 
                                resultado = opIzq + opDer;
                                return resultado; 
                            case tipo.DOUBLE:                           
                                opIzq = this.izq.getValor(entorno).toString().replace(/\"/g,"");
                                opDer = this.der.getValor(entorno).toString();  
                                resultado = opIzq + opDer;
                                return resultado; 
                            case tipo.BOOLEAN:     
                                opIzq = this.izq.getValor(entorno).toString().replace(/\"/g,"");
                                opDer = (this.der.getValor(entorno) == 'true')?'1':'0'; 
                                resultado = opIzq + opDer;
                                return resultado; 
                            case tipo.CHAR:     
                                opIzq = this.izq.getValor(entorno).toString().replace(/\"/g,"");
                                opDer = this.der.getValor(entorno).toString().replace(/'/g,""); 
                                resultado = opIzq + opDer;
                                return resultado; 
                            case tipo.STRING:
                                opIzq = this.izq.getValor(entorno).toString().replace(/\"/g,"");
                                opDer = this.der.getValor(entorno).toString().replace(/\"/g,""); 
                                console.log('Izquierdo: ' + opIzq + ' Derecho: ' + opDer);
                                resultado = opIzq + opDer;
                                return resultado; 
                        }
                        break;
                }
                break;
            case operacion.RESTA:
                this.tipo = this.tipoDominanteResta(this.izq.getTipo(entorno), this.der.getTipo(entorno));
                if (this.tipo === tipo.ERROR){
                    return resultado;
                }
                switch(this.izq.getTipo(entorno)){
                    case tipo.INT:
                        switch(this.der.getTipo(entorno)){
                            case tipo.INT:
                                opIzq = parseInt(this.izq.getValor(entorno));
                                opDer = parseInt(this.der.getValor(entorno)); 
                                resultado = opIzq - opDer;
                                return resultado; 
                            case tipo.DOUBLE:
                                opIzq = parseFloat(this.izq.getValor(entorno));
                                opDer = parseFloat(this.der.getValor(entorno)); 
                                resultado = opIzq - opDer;
                                return resultado; 
                            case tipo.BOOLEAN:
                                opIzq = parseInt(this.izq.getValor(entorno));
                                opDer = (this.der.getValor(entorno) == 'true')?1:0; 
                                resultado = opIzq - opDer;
                                return resultado; 
                            case tipo.CHAR:
                                opIzq = parseInt(this.izq.getValor(entorno));
                                opDer = this.der.getValor(entorno).toString().replace(/'/g,"").charCodeAt(0); 
                                resultado = opIzq - opDer;
                                return resultado; 
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede restar entero con ' + this.getStringTipo(this.der.getTipo(entorno)), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede restar entero con ' 
                                        + this.getStringTipo(this.der.getTipo(entorno))
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.DOUBLE:
                        switch(this.der.getTipo(entorno)){
                            case tipo.INT:
                                opIzq = parseFloat(this.izq.getValor(entorno));
                                opDer = parseFloat(this.der.getValor(entorno)); 
                                resultado = opIzq - opDer;
                                return resultado; 
                            case tipo.DOUBLE:
                                opIzq = parseFloat(this.izq.getValor(entorno));
                                opDer = parseFloat(this.der.getValor(entorno)); 
                                resultado = opIzq - opDer;
                                return resultado; 
                            case tipo.BOOLEAN:
                                opIzq = parseFloat(this.izq.getValor(entorno));
                                opDer = (this.der.getValor(entorno) == 'true')?parseFloat(1):parseFloat(0); 
                                resultado = opIzq - opDer;
                                return resultado; 
                            case tipo.CHAR:
                                opIzq = parseFloat(this.izq.getValor(entorno));
                                opDer = parseFloat(this.der.getValor(entorno).toString().replace(/'/g,"").charCodeAt(0)); 
                                resultado = opIzq - opDer;
                                return resultado; 
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede restar doble con ' + this.getStringTipo(this.der.getTipo(entorno)), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede restar doble con ' 
                                        + this.getStringTipo(this.der.getTipo(entorno))
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.BOOLEAN:
                        switch(this.der.getTipo(entorno)){
                            case tipo.INT:
                                opIzq = (this.izq.getValor(entorno) == 'true')?parseInt(1):parseInt(0);
                                opDer = parseInt(this.der.getValor(entorno)); 
                                resultado = opIzq - opDer;
                                return resultado; 
                            case tipo.DOUBLE:
                                opIzq = (this.izq.getValor(entorno) == 'true')?parseFloat(1):parseFloat(0);
                                opDer = parseFloat(this.der.getValor(entorno)); 
                                resultado = opIzq - opDer;
                                return resultado; 
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede restar booleano con ' + this.getStringTipo(this.der.getTipo(entorno)), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede restar booleano con ' 
                                        + this.getStringTipo(this.der.getTipo(entorno))
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.CHAR:
                        switch(this.der.getTipo(entorno)){
                            case tipo.INT:
                                opIzq = this.izq.getValor(entorno).toString().replace(/'/g,"").charCodeAt(0);
                                opDer = parseInt(this.der.getValor(entorno)); 
                                resultado = opIzq - opDer;
                                return resultado; 
                            case tipo.DOUBLE:
                                opIzq = this.izq.getValor(entorno).toString().replace(/'/g,"").charCodeAt(0);
                                opDer = parseFloat(this.der.getValor(entorno)); 
                                resultado = opIzq - opDer;
                                return resultado; 
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede restar caracter con ' + this.getStringTipo(this.der.getTipo(entorno)), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede restar caracter con ' 
                                        + this.getStringTipo(this.der.getTipo(entorno))
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    default:
                        errores.agregarError('semantico', 
                                                'No se puede restar caracter con ' + this.getStringTipo(this.der.getTipo(entorno)), 
                                                this.linea, this.columna);
                        return ('Error semantico: No se puede restar caracter con ' 
                                + this.getStringTipo(this.der.getTipo(entorno))
                                + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                }
            case operacion.MULTIPLICACION:
                this.tipo = this.tipoDominanteResta(this.izq.getTipo(entorno), this.der.getTipo(entorno));
                if (this.tipo === tipo.ERROR){
                    return resultado;
                }
                switch(this.izq.getTipo(entorno)){
                    case tipo.INT:
                        switch(this.der.getTipo(entorno)){
                            case tipo.INT:
                                opIzq = parseInt(this.izq.getValor(entorno));
                                opDer = parseInt(this.der.getValor(entorno)); 
                                resultado = opIzq * opDer;
                                return resultado;
                            case tipo.DOUBLE:
                                opIzq = parseFloat(this.izq.getValor(entorno));
                                opDer = parseFloat(this.der.getValor(entorno)); 
                                resultado = opIzq * opDer;
                                return resultado;
                            case tipo.CHAR:
                                opIzq = parseInt(this.izq.getValor(entorno));
                                opDer = this.der.getValor(entorno).toString().replace(/'/g,"").charCodeAt(0);
                                resultado = opIzq * opDer;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede multiplicar ' + this.getStringTipo(this.izq.getTipo(entorno)) 
                                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno)), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede multiplicar ' + this.getStringTipo(this.izq.getTipo(entorno)) 
                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno))
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.DOUBLE:
                        switch(this.der.getTipo(entorno)){
                            case tipo.INT:
                                opIzq = parseFloat(this.izq.getValor(entorno));
                                opDer = parseFloat(this.der.getValor(entorno)); 
                                resultado = opIzq * opDer;
                                return resultado;
                            case tipo.DOUBLE:
                                opIzq = parseFloat(this.izq.getValor(entorno));
                                opDer = parseFloat(this.der.getValor(entorno)); 
                                resultado = opIzq * opDer;
                                return resultado;
                            case tipo.CHAR:
                                opIzq = parseFloat(this.izq.getValor(entorno));
                                opDer = parseFloat(this.der.getValor(entorno).toString().replace(/'/g,"").charCodeAt(0)); 
                                resultado = opIzq * opDer;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede multiplicar ' + this.getStringTipo(this.izq.getTipo(entorno)) 
                                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno)), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede multiplicar ' + this.getStringTipo(this.izq.getTipo(entorno)) 
                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno))
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.CHAR:
                        switch(this.der.getTipo(entorno)){
                            case tipo.INT:
                                opIzq = this.izq.getValor(entorno).toString().replace(/'/g,"").charCodeAt(0);
                                opDer = parseInt(this.der.getValor(entorno));
                                resultado = opIzq * opDer;
                                return resultado;
                            case tipo.DOUBLE:
                                opIzq = parseFloat(this.izq.getValor(entorno).toString().replace(/'/g,"").charCodeAt(0));
                                opDer = parseFloat(this.der.getValor(entorno));
                                resultado = opIzq * opDer;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede multiplicar ' + this.getStringTipo(this.izq.getTipo(entorno)) 
                                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno)), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede multiplicar ' + this.getStringTipo(this.izq.getTipo(entorno)) 
                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno))
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    default:
                        errores.agregarError('semantico', 
                                                'No se puede multiplicar ' + this.getStringTipo(this.izq.getTipo(entorno)) 
                                                + ' con ' + this.getStringTipo(this.der.getTipo(entorno)), 
                                                this.linea, this.columna);
                        return ('Error semantico: No se puede multiplicar ' + this.getStringTipo(this.izq.getTipo(entorno)) 
                                + ' con ' + this.getStringTipo(this.der.getTipo(entorno))
                                + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                }
            case operacion.DIVISION:
                this.tipo = this.tipoDominanteDiv(this.izq.getTipo(entorno), this.der.getTipo(entorno));
                if (this.tipo === tipo.ERROR){
                    return resultado;
                }
                switch(this.izq.getTipo(entorno)){
                    case tipo.INT:
                        switch(this.der.getTipo(entorno)){
                            case tipo.INT:
                                opIzq = parseFloat(this.izq.getValor(entorno));
                                opDer = parseFloat(this.der.getValor(entorno));
                                if (opDer != 0){ 
                                    resultado = opIzq / opDer;
                                    return resultado;
                                }
                                errores.agregarError('semantico', 
                                                        'El denominador debe ser diferente de 0', 
                                                        this.linea, this.columna);
                                return ('Error semantico: El denominador debe ser diferente de 0 en la linea ' 
                                        + this.linea + ' y columna ' + this.columna);
                            case tipo.DOUBLE:
                                opIzq = parseFloat(this.izq.getValor(entorno));
                                opDer = parseFloat(this.der.getValor(entorno)); 
                                if (opDer != 0){ 
                                    resultado = opIzq / opDer;
                                    return resultado;
                                }
                                errores.agregarError('semantico', 
                                                        'El denominador debe ser diferente de 0', 
                                                        this.linea, this.columna);
                                return ('Error semantico: El denominador debe ser diferente de 0 en la linea ' 
                                        + this.linea + ' y columna ' + this.columna);
                            case tipo.CHAR:
                                opIzq = parseFloat(this.izq.getValor(entorno));
                                opDer = parseFloat(this.der.getValor(entorno).toString().replace(/'/g,"").charCodeAt(0));
                                if (opDer != 0){ 
                                    resultado = opIzq / opDer;
                                    return resultado;
                                }
                                errores.agregarError('semantico', 
                                                        'El denominador debe ser diferente de 0', 
                                                        this.linea, this.columna);
                                return ('Error semantico: El denominador debe ser diferente de 0 en la linea ' 
                                        + this.linea + ' y columna ' + this.columna);
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede dividir entero con ' 
                                                        + this.getStringTipo(this.der.getTipo(entorno)), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede dividir entero con ' 
                                        + this.getStringTipo(this.der.getTipo(entorno))
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.DOUBLE:
                        switch(this.der.getTipo(entorno)){
                            case tipo.INT:
                                opIzq = parseFloat(this.izq.getValor(entorno));
                                opDer = parseFloat(this.der.getValor(entorno)); 
                                if (opDer != 0){ 
                                    resultado = opIzq / opDer;
                                    return resultado;
                                }
                                errores.agregarError('semantico', 
                                                        'El denominador debe ser diferente de 0', 
                                                        this.linea, this.columna);
                                return ('Error semantico: El denominador debe ser diferente de 0 en la linea ' 
                                        + this.linea + ' y columna ' + this.columna);
                            case tipo.DOUBLE:
                                opIzq = parseFloat(this.izq.getValor(entorno));
                                opDer = parseFloat(this.der.getValor(entorno)); 
                                if (opDer != 0){ 
                                    resultado = opIzq / opDer;
                                    return resultado;
                                }
                                errores.agregarError('semantico', 
                                                        'El denominador debe ser diferente de 0', 
                                                        this.linea, this.columna);
                                return ('Error semantico: El denominador debe ser diferente de 0 en la linea ' 
                                        + this.linea + ' y columna ' + this.columna);
                            case tipo.CHAR:
                                opIzq = parseFloat(this.izq.getValor(entorno));
                                opDer = parseFloat(this.der.getValor(entorno).toString().replace(/'/g,"").charCodeAt(0)); 
                                if (opDer != 0){ 
                                    resultado = opIzq / opDer;
                                    return resultado;
                                }
                                errores.agregarError('semantico', 
                                                        'El denominador debe ser diferente de 0', 
                                                        this.linea, this.columna);
                                return ('Error semantico: El denominador debe ser diferente de 0 en la linea ' 
                                        + this.linea + ' y columna ' + this.columna);
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede dividir doble con ' 
                                                        + this.getStringTipo(this.der.getTipo(entorno)), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede dividir doble con ' 
                                        + this.getStringTipo(this.der.getTipo(entorno))
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.CHAR:
                        switch(this.der.getTipo(entorno)){
                            case tipo.INT:
                                opIzq = parseFloat(this.izq.getValor(entorno).toString().replace(/'/g,"").charCodeAt(0));
                                opDer = parseFloat(this.der.getValor(entorno));
                                if (opDer != 0){ 
                                    resultado = opIzq / opDer;
                                    return resultado;
                                }
                                errores.agregarError('semantico', 
                                                        'El denominador debe ser diferente de 0', 
                                                        this.linea, this.columna);
                                return ('Error semantico: El denominador debe ser diferente de 0 en la linea ' 
                                        + this.linea + ' y columna ' + this.columna);
                            case tipo.DOUBLE:
                                opIzq = parseFloat(this.izq.getValor(entorno).toString().replace(/'/g,"").charCodeAt(0));
                                opDer = parseFloat(this.der.getValor(entorno));
                                if (opDer != 0){ 
                                    resultado = opIzq / opDer;
                                    return resultado;
                                }
                                errores.agregarError('semantico', 
                                                        'El denominador debe ser diferente de 0', 
                                                        this.linea, this.columna);
                                return ('Error semantico: El denominador debe ser diferente de 0 en la linea ' 
                                        + this.linea + ' y columna ' + this.columna);
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede dividir caracter con ' 
                                                        + this.getStringTipo(this.der.getTipo(entorno)), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede dividir caracter con ' 
                                        + this.getStringTipo(this.der.getTipo(entorno))
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    default:
                        errores.agregarError('semantico', 
                                                'No se puede dividir ' + this.getStringTipo(this.izq.getTipo(entorno)) 
                                                + ' con ' + this.getStringTipo(this.der.getTipo(entorno)), 
                                                this.linea, this.columna);
                        return ('Error semantico: No se puede dividir ' + this.getStringTipo(this.izq.getTipo(entorno)) 
                                + ' con ' + this.getStringTipo(this.der.getTipo(entorno))
                                + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                }
            case operacion.POTENCIA:
                this.tipo = this.tipoDominantePow(this.izq.getTipo(entorno), this.der.getTipo(entorno));
                if (this.tipo === tipo.ERROR){
                    return resultado;
                }
                switch(this.izq.getTipo(entorno)){
                    case tipo.INT:
                        switch(this.der.getTipo(entorno)){
                            case tipo.INT:
                                opIzq = parseInt(this.izq.getValor(entorno));
                                opDer = parseInt(this.der.getValor(entorno)); 
                                resultado = Math.pow(opIzq,opDer);
                                return resultado;
                            case tipo.DOUBLE:
                                opIzq = parseFloat(this.izq.getValor(entorno));
                                opDer = parseFloat(this.der.getValor(entorno));  
                                resultado = Math.pow(opIzq,opDer);
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede potenciar entero con ' 
                                                        + this.getStringTipo(this.der.getTipo(entorno)), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede potenciar entero con ' 
                                        + this.getStringTipo(this.der.getTipo(entorno))
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.DOUBLE:
                        switch(this.der.getTipo(entorno)){
                            case tipo.INT:
                                opIzq = parseFloat(this.izq.getValor(entorno));
                                opDer = parseFloat(this.der.getValor(entorno)); 
                                resultado = Math.pow(opIzq,opDer);
                                return resultado;
                            case tipo.DOUBLE:
                                opIzq = parseFloat(this.izq.getValor(entorno));
                                opDer = parseFloat(this.der.getValor(entorno));  
                                resultado = Math.pow(opIzq,opDer);
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede potenciar doble con ' 
                                                        + this.getStringTipo(this.der.getTipo(entorno)), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede potenciar doble con ' 
                                        + this.getStringTipo(this.der.getTipo(entorno))
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    default:
                        errores.agregarError('semantico', 
                                                'No se puede potenciar ' + this.getStringTipo(this.izq.getTipo(entorno)) 
                                                + ' con ' + this.getStringTipo(this.der.getTipo(entorno)), 
                                                this.linea, this.columna);
                        return ('Error semantico: No se puede potenciar ' + this.getStringTipo(this.izq.getTipo(entorno)) 
                                + ' con ' + this.getStringTipo(this.der.getTipo(entorno))
                                + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                }
            case operacion.MODULO:
                this.tipo = this.tipoDominanteDiv(this.izq.getTipo(entorno), this.der.getTipo(entorno));
                if (this.tipo === tipo.ERROR){
                    return resultado;
                }
                switch(this.izq.getTipo(entorno)){
                    case tipo.INT:
                        switch(this.der.getTipo(entorno)){
                            case tipo.INT:
                                opIzq = parseFloat(this.izq.getValor(entorno));
                                opDer = parseFloat(this.der.getValor(entorno)); 
                                resultado = opIzq % opDer;
                                return resultado;
                            case tipo.DOUBLE:
                                opIzq = parseFloat(this.izq.getValor(entorno));
                                opDer = parseFloat(this.der.getValor(entorno)); 
                                resultado = opIzq % opDer;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede modular entero con ' 
                                                        + this.getStringTipo(this.der.getTipo(entorno)), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede modular entero con ' 
                                        + this.getStringTipo(this.der.getTipo(entorno))
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.DOUBLE:
                        switch(this.der.getTipo(entorno)){
                            case tipo.INT:
                                opIzq = parseFloat(this.izq.getValor(entorno));
                                opDer = parseFloat(this.der.getValor(entorno)); 
                                resultado = opIzq % opDer;
                                return resultado;
                            case tipo.DOUBLE:
                                opIzq = parseFloat(this.izq.getValor(entorno));
                                opDer = parseFloat(this.der.getValor(entorno));
                                resultado = opIzq % opDer;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede modular doble con ' 
                                                        + this.getStringTipo(this.der.getTipo(entorno)), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede modular doble con ' 
                                        + this.getStringTipo(this.der.getTipo(entorno))
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    default:
                        errores.agregarError('semantico', 
                                                'No se puede modular ' + this.getStringTipo(this.izq.getTipo(entorno)) 
                                                + ' con ' + this.getStringTipo(this.der.getTipo(entorno)), 
                                                this.linea, this.columna);
                        return ('Error semantico: No se puede modular ' + this.getStringTipo(this.izq.getTipo(entorno)) 
                                + ' con ' + this.getStringTipo(this.der.getTipo(entorno))
                                + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                }
            case operacion.NEGACION:
                if (this.izq.getTipo(entorno) === tipo.ERROR){
                    this.tipo = tipo.ERROR;
                    return resultado;
                }
                switch(this.izq.getTipo(entorno)){
                    case tipo.INT:
                        this.tipo = tipo.INT;
                        opIzq = parseInt(this.izq.getValor(entorno));
                        resultado = -1 * opIzq;
                        return resultado;
                    case tipo.DOUBLE:
                        this.tipo = tipo.DOUBLE;
                        opIzq = parseFloat(this.izq.getValor(entorno));
                        resultado = -1 * opIzq;
                        return resultado;
                    default:
                        errores.agregarError('semantico', 
                                                'No se puede negar ' + this.getStringTipo(this.izq.getTipo(entorno)), 
                                                this.linea, this.columna);
                        return ('Error semantico: No se puede negar ' + this.getStringTipo(this.izq.getTipo(entorno)) 
                                + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                }
            case operacion.COMPARACION:
                if (this.izq.getTipo(entorno) == tipo.ERROR || this.der.getTipo(entorno) == tipo.ERROR){
                    this.tipo = tipo.ERROR;
                    return resultado;
                }
                this.tipo = tipo.BOOLEAN;
                switch(this.izq.getTipo(entorno)){
                    case tipo.INT:
                        switch(this.der.getTipo(entorno)){
                            case tipo.INT:
                                opIzq = parseInt(this.izq.getValor(entorno));
                                opDer = parseInt(this.der.getValor(entorno));
                                resultado = (opIzq == opDer)?true:false;
                                return resultado;
                            case tipo.DOUBLE:
                                opIzq = parseInt(this.izq.getValor(entorno));
                                opDer = parseFloat(this.der.getValor(entorno));
                                resultado = (opIzq == opDer)?true:false;
                                return resultado;
                            case tipo.CHAR:
                                opIzq = parseInt(this.izq.getValor(entorno));
                                opDer = this.der.getValor(entorno).toString().replace(/'/g,"").charCodeAt(0);
                                resultado = (opIzq == opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno))
                                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno)), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno)) 
                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno))
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.DOUBLE:
                        switch(this.der.getTipo(entorno)){
                            case tipo.INT:
                                opIzq = parseFloat(this.izq.getValor(entorno));
                                opDer = parseInt(this.der.getValor(entorno));
                                resultado = (opIzq == opDer)?true:false;
                                return resultado;
                            case tipo.DOUBLE:
                                opIzq = parseFloat(this.izq.getValor(entorno));
                                opDer = parseFloat(this.der.getValor(entorno));
                                resultado = (opIzq == opDer)?true:false;
                                return resultado;
                            case tipo.CHAR:
                                opIzq = parseFloat(this.izq.getValor(entorno));
                                opDer = parseFloat(this.der.getValor(entorno).toString().replace(/'/g,"").charCodeAt(0));
                                resultado = (opIzq == opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno))
                                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno)), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno)) 
                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno))
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.BOOLEAN:
                        switch(this.der.getTipo(entorno)){
                            case tipo.BOOLEAN:
                                opIzq = (this.izq.getValor(entorno).toString() == 'true')?true:false;
                                opDer = (this.der.getValor(entorno).toString() == 'true')?true:false;
                                resultado = (opIzq == opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno))
                                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno)), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno)) 
                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno))
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.CHAR:
                        switch(this.der.getTipo(entorno)){
                            case tipo.INT:
                                opIzq = parseInt(this.izq.getValor(entorno).toString().replace(/'/g,"").charCodeAt(0));
                                opDer = parseInt(this.der.getValor(entorno));
                                resultado = (opIzq == opDer)?true:false;
                                return resultado;
                            case tipo.DOUBLE:
                                opIzq = parseFloat(this.der.getValor(entorno).toString().replace(/'/g,"").charCodeAt(0));
                                opDer = parseFloat(this.der.getValor(entorno));
                                resultado = (opIzq == opDer)?true:false;
                                return resultado;
                            case tipo.CHAR:
                                opIzq = this.der.getValor(entorno).toString().replace(/'/g,"").charCodeAt(0);
                                opDer = this.der.getValor(entorno).toString().replace(/'/g,"").charCodeAt(0);
                                resultado = (opIzq == opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno))
                                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno)), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno)) 
                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno))
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.STRING:
                        switch(this.der.getTipo(entorno)){
                            case tipo.STRING:
                                opIzq = this.izq.getValor(entorno).toString();
                                opDer = this.der.getValor(entorno).toString();
                                resultado = (opIzq == opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno))
                                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno)), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno)) 
                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno))
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                }
            case operacion.DIFERENTE:
                if (this.izq.getTipo(entorno) == tipo.ERROR || this.der.getTipo(entorno) == tipo.ERROR){
                    this.tipo = tipo.ERROR;
                    return resultado;
                }
                this.tipo = tipo.BOOLEAN;
                switch(this.izq.getTipo(entorno)){
                    case tipo.INT:
                        switch(this.der.getTipo(entorno)){
                            case tipo.INT:
                                opIzq = parseInt(this.izq.getValor(entorno));
                                opDer = parseInt(this.der.getValor(entorno));
                                resultado = (opIzq != opDer)?true:false;
                                return resultado;
                            case tipo.DOUBLE:
                                opIzq = parseInt(this.izq.getValor(entorno));
                                opDer = parseFloat(this.der.getValor(entorno));
                                resultado = (opIzq != opDer)?true:false;
                                return resultado;
                            case tipo.CHAR:
                                opIzq = parseInt(this.izq.getValor(entorno));
                                opDer = this.der.getValor(entorno).toString().replace(/'/g,"").charCodeAt(0);
                                resultado = (opIzq != opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno))
                                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno)), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno)) 
                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno))
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.DOUBLE:
                        switch(this.der.getTipo(entorno)){
                            case tipo.INT:
                                opIzq = parseFloat(this.izq.getValor(entorno));
                                opDer = parseInt(this.der.getValor(entorno));
                                resultado = (opIzq != opDer)?true:false;
                                return resultado;
                            case tipo.DOUBLE:
                                opIzq = parseFloat(this.izq.getValor(entorno));
                                opDer = parseFloat(this.der.getValor(entorno));
                                resultado = (opIzq != opDer)?true:false;
                                return resultado;
                            case tipo.CHAR:
                                opIzq = parseFloat(this.izq.getValor(entorno));
                                opDer = parseFloat(this.der.getValor(entorno).toString().replace(/'/g,"").charCodeAt(0));
                                resultado = (opIzq != opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno))
                                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno)), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno)) 
                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno))
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.BOOLEAN:
                        switch(this.der.getTipo(entorno)){
                            case tipo.BOOLEAN:
                                opIzq = (this.izq.getValor(entorno).toString() == 'true')?true:false;
                                opDer = (this.der.getValor(entorno).toString() == 'true')?true:false;
                                resultado = (opIzq != opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno))
                                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno)), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno)) 
                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno))
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.CHAR:
                        switch(this.der.getTipo(entorno)){
                            case tipo.INT:
                                opIzq = parseInt(this.izq.getValor(entorno).toString().replace(/'/g,"").charCodeAt(0));
                                opDer = parseInt(this.der.getValor(entorno));
                                resultado = (opIzq != opDer)?true:false;
                                return resultado;
                            case tipo.DOUBLE:
                                opIzq = parseFloat(this.der.getValor(entorno).toString().replace(/'/g,"").charCodeAt(0));
                                opDer = parseFloat(this.der.getValor(entorno));
                                resultado = (opIzq != opDer)?true:false;
                                return resultado;
                            case tipo.CHAR:
                                opIzq = this.der.getValor(entorno).toString().replace(/'/g,"").charCodeAt(0);
                                opDer = this.der.getValor(entorno).toString().replace(/'/g,"").charCodeAt(0);
                                resultado = (opIzq != opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno))
                                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno)), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno)) 
                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno))
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.STRING:
                        switch(this.der.getTipo(entorno)){
                            case tipo.STRING:
                                opIzq = this.izq.getValor(entorno).toString();
                                opDer = this.der.getValor(entorno).toString();
                                resultado = (opIzq != opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno))
                                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno)), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno)) 
                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno))
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                }
            case operacion.MAYORIGUAL:
                if (this.izq.getTipo(entorno) == tipo.ERROR || this.der.getTipo(entorno) == tipo.ERROR){
                    this.tipo = tipo.ERROR;
                    return resultado;
                }
                this.tipo = tipo.BOOLEAN;
                switch(this.izq.getTipo(entorno)){
                    case tipo.INT:
                        switch(this.der.getTipo(entorno)){
                            case tipo.INT:
                                opIzq = parseInt(this.izq.getValor(entorno));
                                opDer = parseInt(this.der.getValor(entorno));
                                resultado = (opIzq >= opDer)?true:false;
                                return resultado;
                            case tipo.DOUBLE:
                                opIzq = parseInt(this.izq.getValor(entorno));
                                opDer = parseFloat(this.der.getValor(entorno));
                                resultado = (opIzq >= opDer)?true:false;
                                return resultado;
                            case tipo.CHAR:
                                opIzq = parseInt(this.izq.getValor(entorno));
                                opDer = this.der.getValor(entorno).toString().replace(/'/g,"").charCodeAt(0);
                                resultado = (opIzq >= opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno))
                                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno)), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno)) 
                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno))
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.DOUBLE:
                        switch(this.der.getTipo(entorno)){
                            case tipo.INT:
                                opIzq = parseFloat(this.izq.getValor(entorno));
                                opDer = parseInt(this.der.getValor(entorno));
                                resultado = (opIzq >= opDer)?true:false;
                                return resultado;
                            case tipo.DOUBLE:
                                opIzq = parseFloat(this.izq.getValor(entorno));
                                opDer = parseFloat(this.der.getValor(entorno));
                                resultado = (opIzq >= opDer)?true:false;
                                return resultado;
                            case tipo.CHAR:
                                opIzq = parseFloat(this.izq.getValor(entorno));
                                opDer = parseFloat(this.der.getValor(entorno).toString().replace(/'/g,"").charCodeAt(0));
                                resultado = (opIzq >= opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno))
                                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno)), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno)) 
                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno))
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.BOOLEAN:
                        switch(this.der.getTipo(entorno)){
                            case tipo.BOOLEAN:
                                opIzq = (this.izq.getValor(entorno).toString() == 'true')?true:false;
                                opDer = (this.der.getValor(entorno).toString() == 'true')?true:false;
                                resultado = (opIzq >= opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno))
                                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno)), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno)) 
                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno))
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.CHAR:
                        switch(this.der.getTipo(entorno)){
                            case tipo.INT:
                                opIzq = parseInt(this.izq.getValor(entorno).toString().replace(/'/g,"").charCodeAt(0));
                                opDer = parseInt(this.der.getValor(entorno));
                                resultado = (opIzq >= opDer)?true:false;
                                return resultado;
                            case tipo.DOUBLE:
                                opIzq = parseFloat(this.der.getValor(entorno).toString().replace(/'/g,"").charCodeAt(0));
                                opDer = parseFloat(this.der.getValor(entorno));
                                resultado = (opIzq >= opDer)?true:false;
                                return resultado;
                            case tipo.CHAR:
                                opIzq = this.der.getValor(entorno).toString().replace(/'/g,"").charCodeAt(0);
                                opDer = this.der.getValor(entorno).toString().replace(/'/g,"").charCodeAt(0);
                                resultado = (opIzq >= opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno))
                                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno)), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno)) 
                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno))
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.STRING:
                        switch(this.der.getTipo(entorno)){
                            case tipo.STRING:
                                opIzq = this.izq.getValor(entorno).toString();
                                opDer = this.der.getValor(entorno).toString();
                                resultado = (opIzq >= opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno))
                                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno)), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno)) 
                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno))
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                }
            case operacion.MENORIGUAL:
                if (this.izq.getTipo(entorno) == tipo.ERROR || this.der.getTipo(entorno) == tipo.ERROR){
                    this.tipo = tipo.ERROR;
                    return resultado;
                }
                this.tipo = tipo.BOOLEAN;
                switch(this.izq.getTipo(entorno)){
                    case tipo.INT:
                        switch(this.der.getTipo(entorno)){
                            case tipo.INT:
                                opIzq = parseInt(this.izq.getValor(entorno));
                                opDer = parseInt(this.der.getValor(entorno));
                                resultado = (opIzq <= opDer)?true:false;
                                return resultado;
                            case tipo.DOUBLE:
                                opIzq = parseInt(this.izq.getValor(entorno));
                                opDer = parseFloat(this.der.getValor(entorno));
                                resultado = (opIzq <= opDer)?true:false;
                                return resultado;
                            case tipo.CHAR:
                                opIzq = parseInt(this.izq.getValor(entorno));
                                opDer = this.der.getValor(entorno).toString().replace(/'/g,"").charCodeAt(0);
                                resultado = (opIzq <= opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno))
                                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno)), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno)) 
                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno))
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.DOUBLE:
                        switch(this.der.getTipo(entorno)){
                            case tipo.INT:
                                opIzq = parseFloat(this.izq.getValor(entorno));
                                opDer = parseInt(this.der.getValor(entorno));
                                resultado = (opIzq <= opDer)?true:false;
                                return resultado;
                            case tipo.DOUBLE:
                                opIzq = parseFloat(this.izq.getValor(entorno));
                                opDer = parseFloat(this.der.getValor(entorno));
                                resultado = (opIzq <= opDer)?true:false;
                                return resultado;
                            case tipo.CHAR:
                                opIzq = parseFloat(this.izq.getValor(entorno));
                                opDer = parseFloat(this.der.getValor(entorno).toString().replace(/'/g,"").charCodeAt(0));
                                resultado = (opIzq <= opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno))
                                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno)), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno)) 
                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno))
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.BOOLEAN:
                        switch(this.der.getTipo(entorno)){
                            case tipo.BOOLEAN:
                                opIzq = (this.izq.getValor(entorno).toString() == 'true')?true:false;
                                opDer = (this.der.getValor(entorno).toString() == 'true')?true:false;
                                resultado = (opIzq <= opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno))
                                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno)), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno)) 
                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno))
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.CHAR:
                        switch(this.der.getTipo(entorno)){
                            case tipo.INT:
                                opIzq = parseInt(this.izq.getValor(entorno).toString().replace(/'/g,"").charCodeAt(0));
                                opDer = parseInt(this.der.getValor(entorno));
                                resultado = (opIzq <= opDer)?true:false;
                                return resultado;
                            case tipo.DOUBLE:
                                opIzq = parseFloat(this.der.getValor(entorno).toString().replace(/'/g,"").charCodeAt(0));
                                opDer = parseFloat(this.der.getValor(entorno));
                                resultado = (opIzq <= opDer)?true:false;
                                return resultado;
                            case tipo.CHAR:
                                opIzq = this.der.getValor(entorno).toString().replace(/'/g,"").charCodeAt(0);
                                opDer = this.der.getValor(entorno).toString().replace(/'/g,"").charCodeAt(0);
                                resultado = (opIzq <= opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno))
                                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno)), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno)) 
                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno))
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.STRING:
                        switch(this.der.getTipo(entorno)){
                            case tipo.STRING:
                                opIzq = this.izq.getValor(entorno).toString();
                                opDer = this.der.getValor(entorno).toString();
                                resultado = (opIzq <= opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno))
                                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno)), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno)) 
                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno))
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                }
            case operacion.MAYOR:
                if (this.izq.getTipo(entorno) == tipo.ERROR || this.der.getTipo(entorno) == tipo.ERROR){
                    this.tipo = tipo.ERROR;
                    return resultado;
                }
                this.tipo = tipo.BOOLEAN;
                switch(this.izq.getTipo(entorno)){
                    case tipo.INT:
                        switch(this.der.getTipo(entorno)){
                            case tipo.INT:
                                opIzq = parseInt(this.izq.getValor(entorno));
                                opDer = parseInt(this.der.getValor(entorno));
                                resultado = (opIzq > opDer)?true:false;
                                return resultado;
                            case tipo.DOUBLE:
                                opIzq = parseInt(this.izq.getValor(entorno));
                                opDer = parseFloat(this.der.getValor(entorno));
                                resultado = (opIzq > opDer)?true:false;
                                return resultado;
                            case tipo.CHAR:
                                opIzq = parseInt(this.izq.getValor(entorno));
                                opDer = this.der.getValor(entorno).toString().replace(/'/g,"").charCodeAt(0);
                                resultado = (opIzq > opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno))
                                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno)), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno)) 
                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno))
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.DOUBLE:
                        switch(this.der.getTipo(entorno)){
                            case tipo.INT:
                                opIzq = parseFloat(this.izq.getValor(entorno));
                                opDer = parseInt(this.der.getValor(entorno));
                                resultado = (opIzq > opDer)?true:false;
                                return resultado;
                            case tipo.DOUBLE:
                                opIzq = parseFloat(this.izq.getValor(entorno));
                                opDer = parseFloat(this.der.getValor(entorno));
                                resultado = (opIzq > opDer)?true:false;
                                return resultado;
                            case tipo.CHAR:
                                opIzq = parseFloat(this.izq.getValor(entorno));
                                opDer = parseFloat(this.der.getValor(entorno).toString().replace(/'/g,"").charCodeAt(0));
                                resultado = (opIzq > opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno))
                                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno)), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno)) 
                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno))
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.BOOLEAN:
                        switch(this.der.getTipo(entorno)){
                            case tipo.BOOLEAN:
                                opIzq = (this.izq.getValor(entorno).toString() == 'true')?true:false;
                                opDer = (this.der.getValor(entorno).toString() == 'true')?true:false;
                                resultado = (opIzq > opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno))
                                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno)), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno)) 
                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno))
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.CHAR:
                        switch(this.der.getTipo(entorno)){
                            case tipo.INT:
                                opIzq = parseInt(this.izq.getValor(entorno).toString().replace(/'/g,"").charCodeAt(0));
                                opDer = parseInt(this.der.getValor(entorno));
                                resultado = (opIzq > opDer)?true:false;
                                return resultado;
                            case tipo.DOUBLE:
                                opIzq = parseFloat(this.der.getValor(entorno).toString().replace(/'/g,"").charCodeAt(0));
                                opDer = parseFloat(this.der.getValor(entorno));
                                resultado = (opIzq > opDer)?true:false;
                                return resultado;
                            case tipo.CHAR:
                                opIzq = this.der.getValor(entorno).toString().replace(/'/g,"").charCodeAt(0);
                                opDer = this.der.getValor(entorno).toString().replace(/'/g,"").charCodeAt(0);
                                resultado = (opIzq > opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno))
                                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno)), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno)) 
                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno))
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.STRING:
                        switch(this.der.getTipo(entorno)){
                            case tipo.STRING:
                                opIzq = this.izq.getValor(entorno).toString();
                                opDer = this.der.getValor(entorno).toString();
                                resultado = (opIzq > opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno))
                                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno)), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno)) 
                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno))
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                }
            case operacion.MENOR:
                if (this.izq.getTipo(entorno) == tipo.ERROR || this.der.getTipo(entorno) == tipo.ERROR){
                    this.tipo = tipo.ERROR;
                    return resultado;
                }
                this.tipo = tipo.BOOLEAN;
                switch(this.izq.getTipo(entorno)){
                    case tipo.INT:
                        switch(this.der.getTipo(entorno)){
                            case tipo.INT:
                                opIzq = parseInt(this.izq.getValor(entorno));
                                opDer = parseInt(this.der.getValor(entorno));
                                resultado = (opIzq < opDer)?true:false;
                                return resultado;
                            case tipo.DOUBLE:
                                opIzq = parseInt(this.izq.getValor(entorno));
                                opDer = parseFloat(this.der.getValor(entorno));
                                resultado = (opIzq < opDer)?true:false;
                                return resultado;
                            case tipo.CHAR:
                                opIzq = parseInt(this.izq.getValor(entorno));
                                opDer = this.der.getValor(entorno).toString().replace(/'/g,"").charCodeAt(0);
                                resultado = (opIzq < opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno))
                                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno)), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno)) 
                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno))
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.DOUBLE:
                        switch(this.der.getTipo(entorno)){
                            case tipo.INT:
                                opIzq = parseFloat(this.izq.getValor(entorno));
                                opDer = parseInt(this.der.getValor(entorno));
                                resultado = (opIzq < opDer)?true:false;
                                return resultado;
                            case tipo.DOUBLE:
                                opIzq = parseFloat(this.izq.getValor(entorno));
                                opDer = parseFloat(this.der.getValor(entorno));
                                resultado = (opIzq < opDer)?true:false;
                                return resultado;
                            case tipo.CHAR:
                                opIzq = parseFloat(this.izq.getValor(entorno));
                                opDer = parseFloat(this.der.getValor(entorno).toString().replace(/'/g,"").charCodeAt(0));
                                resultado = (opIzq < opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno))
                                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno)), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno)) 
                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno))
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.BOOLEAN:
                        switch(this.der.getTipo(entorno)){
                            case tipo.BOOLEAN:
                                opIzq = (this.izq.getValor(entorno).toString() == 'true')?true:false;
                                opDer = (this.der.getValor(entorno).toString() == 'true')?true:false;
                                resultado = (opIzq < opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno))
                                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno)), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno)) 
                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno))
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.CHAR:
                        switch(this.der.getTipo(entorno)){
                            case tipo.INT:
                                opIzq = parseInt(this.izq.getValor(entorno).toString().replace(/'/g,"").charCodeAt(0));
                                opDer = parseInt(this.der.getValor(entorno));
                                resultado = (opIzq < opDer)?true:false;
                                return resultado;
                            case tipo.DOUBLE:
                                opIzq = parseFloat(this.der.getValor(entorno).toString().replace(/'/g,"").charCodeAt(0));
                                opDer = parseFloat(this.der.getValor(entorno));
                                resultado = (opIzq < opDer)?true:false;
                                return resultado;
                            case tipo.CHAR:
                                opIzq = this.der.getValor(entorno).toString().replace(/'/g,"").charCodeAt(0);
                                opDer = this.der.getValor(entorno).toString().replace(/'/g,"").charCodeAt(0);
                                resultado = (opIzq < opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno))
                                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno)), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno)) 
                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno))
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.STRING:
                        switch(this.der.getTipo(entorno)){
                            case tipo.STRING:
                                opIzq = this.izq.getValor(entorno).toString();
                                opDer = this.der.getValor(entorno).toString();
                                resultado = (opIzq < opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno))
                                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno)), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(this.izq.getTipo(entorno)) 
                                        + ' con ' + this.getStringTipo(this.der.getTipo(entorno))
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                }
            case operacion.OR:
                if (this.izq.getTipo(entorno) == tipo.ERROR || this.der.getTipo(entorno) == tipo.ERROR){
                    this.tipo = tipo.ERROR;
                    return resultado;
                }
                this.tipo = tipo.BOOLEAN;
                switch(this.izq.getTipo(entorno)){
                    case tipo.INT:
                        opIzq = parseInt(this.izq.getValor(entorno));
                        break;
                    case tipo.DOUBLE:
                        opIzq = parseFloat(this.izq.getValor(entorno));
                        break;
                    case tipo.BOOLEAN:
                        opIzq = (this.izq.getValor(entorno).toString() == 'true')?true:false;
                        break;
                    case tipo.CHAR:
                        opIzq = parseInt(this.izq.getValor(entorno).toString().replace(/'/g,"").charCodeAt(0));
                        break;
                    case tipo.STRING:
                        opIzq = this.izq.getValor(entorno).toString();
                        break;
                }
                switch(this.der.getTipo(entorno)){
                    case tipo.INT:
                        opDer = parseInt(this.der.getValor(entorno));
                        break;
                    case tipo.DOUBLE:
                        opDer = parseFloat(this.der.getValor(entorno));
                        break;
                    case tipo.BOOLEAN:
                        opDer = (this.der.getValor(entorno).toString() == 'true')?true:false;
                        break;
                    case tipo.CHAR:
                        opDer = parseInt(this.der.getValor(entorno).toString().replace(/'/g,"").charCodeAt(0));
                        break;
                    case tipo.STRING:
                        opDer = this.der.getValor(entorno).toString();
                        break;
                }
                resultado = (opIzq || opDer);
                return resultado;
            case operacion.AND:
                if (this.izq.getTipo(entorno) == tipo.ERROR || this.der.getTipo(entorno) == tipo.ERROR){
                    this.tipo = tipo.ERROR;
                    return resultado;
                }
                this.tipo = tipo.BOOLEAN;
                switch(this.izq.getTipo(entorno)){
                    case tipo.INT:
                        opIzq = parseInt(this.izq.getValor(entorno));
                        break;
                    case tipo.DOUBLE:
                        opIzq = parseFloat(this.izq.getValor(entorno));
                        break;
                    case tipo.BOOLEAN:
                        opIzq = (this.izq.getValor(entorno).toString() == 'true')?true:false;
                        break;
                    case tipo.CHAR:
                        opIzq = parseInt(this.izq.getValor(entorno).toString().replace(/'/g,"").charCodeAt(0));
                        break;
                    case tipo.STRING:
                        opIzq = this.izq.getValor(entorno).toString();
                        break;
                }
                switch(this.der.getTipo(entorno)){
                    case tipo.INT:
                        opDer = parseInt(this.der.getValor(entorno));
                        break;
                    case tipo.DOUBLE:
                        opDer = parseFloat(this.der.getValor(entorno));
                        break;
                    case tipo.BOOLEAN:
                        opDer = (this.der.getValor(entorno).toString() == 'true')?true:false;
                        break;
                    case tipo.CHAR:
                        opDer = parseInt(this.der.getValor(entorno).toString().replace(/'/g,"").charCodeAt(0));
                        break;
                    case tipo.STRING:
                        opDer = this.der.getValor(entorno).toString();
                        break;
                }
                resultado = (opIzq && opDer);
                return resultado;
            case operacion.NOT:
                if (this.izq.getTipo(entorno) == tipo.ERROR){
                    this.tipo = tipo.ERROR;
                    return resultado;
                }
                this.tipo = tipo.BOOLEAN;
                switch(this.izq.getTipo(entorno)){
                    case tipo.INT:
                        opIzq = parseInt(this.izq.getValor(entorno));
                        break;
                    case tipo.DOUBLE:
                        opIzq = parseFloat(this.izq.getValor(entorno));
                        break;
                    case tipo.BOOLEAN:
                        opIzq = (this.izq.getValor(entorno).toString() == 'true')?true:false;
                        break;
                    case tipo.CHAR:
                        opIzq = parseInt(this.izq.getValor(entorno).toString().replace(/'/g,"").charCodeAt(0));
                        break;
                    case tipo.STRING:
                        opIzq = this.izq.getValor(entorno).toString();
                        break;
                }
                resultado = !(opIzq);
                return resultado;
            default:

                break;
        }
    }

    getStringTipo(operadorTipo){
        switch(operadorTipo){
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
    }

    tipoDominanteSuma(ex1, ex2) {
        if (ex1 == tipo.ERROR || ex2 == tipo.ERROR){
            return tipo.ERROR;
        }
        if (ex1 == tipo.STRING || ex2 == tipo.STRING) {
            return tipo.STRING;
        } else if (ex1 == tipo.DOUBLE || ex2 == tipo.DOUBLE) {
            return tipo.DOUBLE;
        } else if (ex1 == tipo.INT || ex2 == tipo.INT) {
            return tipo.INT;
        } else if (ex1 == tipo.CHAR && ex2 == tipo.CHAR){
            return tipo.STRING;
        } 
        return null;
    }

    tipoDominanteResta(ex1, ex2){
        if (ex1 == tipo.ERROR || ex2 == tipo.ERROR){
            return tipo.ERROR;
        }
        if (ex1 == tipo.DOUBLE || ex2 == tipo.DOUBLE) {
            return tipo.DOUBLE;
        } else if (ex1 == tipo.INT || ex2 == tipo.INT) {
            return tipo.INT;
        } 
        return null;
    }

    tipoDominanteDiv(ex1, ex2) {
        if (ex1 == tipo.ERROR || ex2 == tipo.ERROR){
            return tipo.ERROR;
        }
        if (ex1 == tipo.DOUBLE || ex2 == tipo.DOUBLE){
            return tipo.DOUBLE;
        } else if (ex1 == tipo.INT || ex2 == tipo.INT){
            return tipo.DOUBLE;
        }
        return null;
    }

    tipoDominantePow(ex1, ex2) {
        if (ex1 == tipo.ERROR || ex2 == tipo.ERROR){
            return tipo.ERROR;
        }
        if (ex1 == tipo.DOUBLE || ex2 == tipo.DOUBLE){
            return tipo.DOUBLE;
        } else if (ex1 == tipo.INT && ex2 == tipo.INT){
            return tipo.INT;
        }
        return null;
    }
}

module.exports = operador;