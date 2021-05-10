const expresion = require( './expresion');
const operacion = require('./operaciones');
const tipo = require('./tipos');
const errores = require('../Error/listaError');
const id = require('./identificador');
const simbolo = require('../simbolo');
const llamada = require('../Instrucciones/llamada');

class operador extends expresion{
    constructor(tipoOperacion, izq, der, linea, columna){
        super();
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
        let aux;
        let valIzq;
        let typeIzq;
        let valDer;
        let typeDer;
        if(this.izq instanceof expresion){
            valIzq = this.izq.getValor(entorno);
            typeIzq = this.izq.getTipo(entorno);
        }else if (this.izq instanceof llamada){
            aux = this.izq.ejecutar(entorno);
            valIzq = aux.getValor(entorno);
            typeIzq = aux.getTipo(entorno);
        }
        if(this.der instanceof expresion){
            valDer = this.der.getValor(entorno);
            typeDer = this.der.getTipo(entorno);
        }else if (this.der instanceof llamada){
            aux = this.der.ejecutar(entorno);
            valDer = aux.getValor(entorno);
            typeDer = aux.getTipo(entorno);
        }
        switch (this.operacion){
            case operacion.INCREMENTO:
                // 1: VERIFICAR QUE SEA UN ID
                //console.log("Reconoce incremento");
                if (this.izq instanceof id){
                    // 2: SE VERIFICA QUE EL TIPO DEL ID SEA INT O DOUBLE
                    if (typeIzq === tipo.INT || typeIzq === tipo.DOUBLE){
                        // 3: SE OBTIENE EL VALOR Y SE AUMENTA EN 1
                        opIzq = parseFloat(valIzq) + parseFloat(1);
                        // 4: SE SETEA EL NUEVO VALOR
                        entorno.setSimbolo(this.izq.nombre, new simbolo(typeIzq, this.izq.nombre, opIzq, this.linea, this.columna));
                        this.tipo = typeIzq;
                        return opIzq;
                    }else{
                        errores.agregarError('semantico', 'La variable no es de tipo numerico', this.linea, this.columna);
                        this.tipo = tipo.ERROR;
                        return resultado;
                    }
                }else{
                    errores.agregarError('semantico', 'La operacion incremento solo se puede aplicar a variables', this.linea, this.columna);
                    this.tipo = tipo.ERROR;
                    return resultado;
                }
            case operacion.DECREMENTO:
                // 1: VERIFICAR QUE SEA UN ID
                if (this.izq instanceof id){
                    // 2: SE VERIFICA QUE EL TIPO DEL ID SEA INT O DOUBLE
                    if (typeIzq === tipo.INT || typeIzq === tipo.DOUBLE){
                        // 3: SE OBTIENE EL VALOR Y DISMINUYE EN 1
                        opIzq = parseFloat(valIzq) - parseFloat(1);
                        // 4: SE SETEA EL NUEVO VALOR
                        entorno.setSimbolo(this.izq.nombre, new simbolo(typeIzq, this.izq.nombre, opIzq, this.linea, this.columna));
                        this.tipo = typeIzq;
                        return opIzq;
                    }else{
                        errores.agregarError('semantico', 'La variable no es de tipo numerico', this.linea, this.columna);
                        this.tipo = tipo.ERROR;
                        return resultado;
                    }
                }else{
                    errores.agregarError('semantico', 'La operacion decremento solo se puede aplicar a variables', this.linea, this.columna);
                    this.tipo = tipo.ERROR;
                    return resultado;
                }
            case operacion.SUMA:
                this.tipo = this.tipoDominanteSuma(typeIzq, typeDer);
                if (this.tipo === tipo.ERROR){
                    return resultado;
                }
                switch(typeIzq){
                    case tipo.INT:
                        switch(typeDer){
                            case tipo.INT:
                                opIzq = parseInt(valIzq);
                                opDer = parseInt(valDer); 
                                resultado = opIzq + opDer;
                                return resultado; 
                            case tipo.DOUBLE:                                
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer);  
                                resultado = opIzq + opDer;
                                return resultado; 
                            case tipo.BOOLEAN:     
                                opIzq = parseInt(valIzq);
                                opDer = (valDer == 'true')?1:0; 
                                resultado = opIzq + opDer;
                                return resultado; 
                            case tipo.CHAR:     
                                opIzq = parseInt(valIzq);
                                opDer = valDer.toString().replace("'","").charCodeAt(0); 
                                resultado = opIzq + opDer;
                                return resultado; 
                            case tipo.STRING:
                                opIzq = valIzq.toString();
                                opDer = valDer.toString().replace(/\"/g,""); 
                                resultado = opIzq + opDer;
                                return resultado; 
                        }
                        break;
                    case tipo.DOUBLE:
                        switch(typeDer){
                            case tipo.INT:
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer); 
                                resultado = opIzq + opDer;
                                return resultado; 
                            case tipo.DOUBLE:                                
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer);  
                                resultado = opIzq + opDer;
                                return resultado; 
                            case tipo.BOOLEAN:     
                                opIzq = parseFloat(valIzq);
                                opDer = (valDer == 'true')?parseFloat(1):parseFloat(0); 
                                resultado = opIzq + opDer;
                                return resultado; 
                            case tipo.CHAR:     
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer.toString().replace("'","").charCodeAt(0)); 
                                resultado = opIzq + opDer;
                                return resultado; 
                            case tipo.STRING:
                                opIzq = valIzq.toString();
                                opDer = valDer.toString().replace(/\"/g,""); 
                                resultado = opIzq + opDer;
                                return resultado; 
                        }
                        break;
                    case tipo.BOOLEAN:
                        switch(typeDer){
                            case tipo.INT:
                                opIzq = (valIzq == 'true')?1:0;
                                opDer = parseInt(valDer); 
                                resultado = opIzq + opDer;
                                return resultado; 
                            case tipo.DOUBLE:                                
                                opIzq = (valIzq == 'true')?parseFloat(1):parseFloat(0);
                                opDer = parseFloat(valDer);  
                                resultado = opIzq + opDer;
                                return resultado;  
                            case tipo.STRING:
                                opIzq = (valIzq == 'true')?'1':'0';
                                opDer = valDer.toString().replace(/\"/g,""); 
                                resultado = opIzq + opDer;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede sumar booleano con ' + this.getStringTipo(typeDer), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede sumar booleano con ' 
                                        + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.CHAR:
                        switch(typeDer){
                            case tipo.INT:
                                opIzq = valIzq.toString().replace("'","").charCodeAt(0); 
                                opDer = parseInt(valDer); 
                                resultado = opIzq + opDer;
                                return resultado; 
                            case tipo.DOUBLE:                                
                                opIzq = parseFloat(valIzq.toString().replace("'","").charCodeAt(0));
                                opDer = parseFloat(valDer);  
                                resultado = opIzq + opDer;
                                return resultado; 
                            case tipo.BOOLEAN:     
                                errores.agregarError('semantico', 
                                                        'No se puede sumar caracter con ' + this.getStringTipo(typeDer), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede sumar caracter con ' 
                                        + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                            case tipo.CHAR:     
                                opIzq = valIzq.toString().replace(/'/g,"");
                                opDer = valDer.toString().replace(/'/g,""); 
                                resultado = opIzq + opDer;
                                return resultado; 
                            case tipo.STRING:
                                opIzq = valIzq.toString().replace(/'/g,"");
                                opDer = valDer.toString().replace(/\"/g,""); 
                                resultado = opIzq + opDer;
                                return resultado; 
                        }
                        break;
                    case tipo.STRING:
                        switch(typeDer){
                            case tipo.INT:
                                opIzq = valIzq.toString().replace(/\"/g,"");
                                opDer = valDer.toString(); 
                                resultado = opIzq + opDer;
                                return resultado; 
                            case tipo.DOUBLE:                           
                                opIzq = valIzq.toString().replace(/\"/g,"");
                                opDer = valDer.toString();  
                                resultado = opIzq + opDer;
                                return resultado; 
                            case tipo.BOOLEAN:     
                                opIzq = valIzq.toString().replace(/\"/g,"");
                                opDer = (valDer == 'true')?'1':'0'; 
                                resultado = opIzq + opDer;
                                return resultado; 
                            case tipo.CHAR:     
                                opIzq = valIzq.toString().replace(/\"/g,"");
                                opDer = valDer.toString().replace(/'/g,""); 
                                resultado = opIzq + opDer;
                                return resultado; 
                            case tipo.STRING:
                                opIzq = valIzq.toString().replace(/\"/g,"");
                                opDer = valDer.toString().replace(/\"/g,""); 
                                //console.log('Izquierdo: ' + opIzq + ' Derecho: ' + opDer);
                                resultado = opIzq + opDer;
                                return resultado; 
                        }
                        break;
                }
                break;
            case operacion.RESTA:
                this.tipo = this.tipoDominanteResta(typeIzq, typeDer);
                if (this.tipo === tipo.ERROR){
                    return resultado;
                }
                switch(typeIzq){
                    case tipo.INT:
                        switch(typeDer){
                            case tipo.INT:
                                opIzq = parseInt(valIzq);
                                opDer = parseInt(valDer); 
                                resultado = opIzq - opDer;
                                return resultado; 
                            case tipo.DOUBLE:
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer); 
                                resultado = opIzq - opDer;
                                return resultado; 
                            case tipo.BOOLEAN:
                                opIzq = parseInt(valIzq);
                                opDer = (valDer == 'true')?1:0; 
                                resultado = opIzq - opDer;
                                return resultado; 
                            case tipo.CHAR:
                                opIzq = parseInt(valIzq);
                                opDer = valDer.toString().replace(/'/g,"").charCodeAt(0); 
                                resultado = opIzq - opDer;
                                return resultado; 
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede restar entero con ' + this.getStringTipo(typeDer), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede restar entero con ' 
                                        + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.DOUBLE:
                        switch(typeDer){
                            case tipo.INT:
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer); 
                                resultado = opIzq - opDer;
                                return resultado; 
                            case tipo.DOUBLE:
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer); 
                                resultado = opIzq - opDer;
                                return resultado; 
                            case tipo.BOOLEAN:
                                opIzq = parseFloat(valIzq);
                                opDer = (valDer == 'true')?parseFloat(1):parseFloat(0); 
                                resultado = opIzq - opDer;
                                return resultado; 
                            case tipo.CHAR:
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer.toString().replace(/'/g,"").charCodeAt(0)); 
                                resultado = opIzq - opDer;
                                return resultado; 
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede restar doble con ' + this.getStringTipo(typeDer), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede restar doble con ' 
                                        + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.BOOLEAN:
                        switch(typeDer){
                            case tipo.INT:
                                opIzq = (valIzq == 'true')?parseInt(1):parseInt(0);
                                opDer = parseInt(valDer); 
                                resultado = opIzq - opDer;
                                return resultado; 
                            case tipo.DOUBLE:
                                opIzq = (valIzq == 'true')?parseFloat(1):parseFloat(0);
                                opDer = parseFloat(valDer); 
                                resultado = opIzq - opDer;
                                return resultado; 
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede restar booleano con ' + this.getStringTipo(typeDer), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede restar booleano con ' 
                                        + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.CHAR:
                        switch(typeDer){
                            case tipo.INT:
                                opIzq = valIzq.toString().replace(/'/g,"").charCodeAt(0);
                                opDer = parseInt(valDer); 
                                resultado = opIzq - opDer;
                                return resultado; 
                            case tipo.DOUBLE:
                                opIzq = valIzq.toString().replace(/'/g,"").charCodeAt(0);
                                opDer = parseFloat(valDer); 
                                resultado = opIzq - opDer;
                                return resultado; 
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede restar caracter con ' + this.getStringTipo(typeDer), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede restar caracter con ' 
                                        + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    default:
                        errores.agregarError('semantico', 
                                                'No se puede restar caracter con ' + this.getStringTipo(typeDer), 
                                                this.linea, this.columna);
                        return ('Error semantico: No se puede restar caracter con ' 
                                + this.getStringTipo(typeDer)
                                + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                }
            case operacion.MULTIPLICACION:
                this.tipo = this.tipoDominanteResta(typeIzq, typeDer);
                if (this.tipo === tipo.ERROR){
                    return resultado;
                }
                switch(typeIzq){
                    case tipo.INT:
                        switch(typeDer){
                            case tipo.INT:
                                opIzq = parseInt(valIzq);
                                opDer = parseInt(valDer); 
                                resultado = opIzq * opDer;
                                return resultado;
                            case tipo.DOUBLE:
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer); 
                                resultado = opIzq * opDer;
                                return resultado;
                            case tipo.CHAR:
                                opIzq = parseInt(valIzq);
                                opDer = valDer.toString().replace(/'/g,"").charCodeAt(0);
                                resultado = opIzq * opDer;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede multiplicar ' + this.getStringTipo(typeIzq) 
                                                        + ' con ' + this.getStringTipo(typeDer), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede multiplicar ' + this.getStringTipo(typeIzq) 
                                        + ' con ' + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.DOUBLE:
                        switch(typeDer){
                            case tipo.INT:
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer); 
                                resultado = opIzq * opDer;
                                return resultado;
                            case tipo.DOUBLE:
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer); 
                                resultado = opIzq * opDer;
                                return resultado;
                            case tipo.CHAR:
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer.toString().replace(/'/g,"").charCodeAt(0)); 
                                resultado = opIzq * opDer;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede multiplicar ' + this.getStringTipo(typeIzq) 
                                                        + ' con ' + this.getStringTipo(typeDer), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede multiplicar ' + this.getStringTipo(typeIzq) 
                                        + ' con ' + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.CHAR:
                        switch(typeDer){
                            case tipo.INT:
                                opIzq = valIzq.toString().replace(/'/g,"").charCodeAt(0);
                                opDer = parseInt(valDer);
                                resultado = opIzq * opDer;
                                return resultado;
                            case tipo.DOUBLE:
                                opIzq = parseFloat(valIzq.toString().replace(/'/g,"").charCodeAt(0));
                                opDer = parseFloat(valDer);
                                resultado = opIzq * opDer;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede multiplicar ' + this.getStringTipo(typeIzq) 
                                                        + ' con ' + this.getStringTipo(typeDer), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede multiplicar ' + this.getStringTipo(typeIzq) 
                                        + ' con ' + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    default:
                        errores.agregarError('semantico', 
                                                'No se puede multiplicar ' + this.getStringTipo(typeIzq) 
                                                + ' con ' + this.getStringTipo(typeDer), 
                                                this.linea, this.columna);
                        return ('Error semantico: No se puede multiplicar ' + this.getStringTipo(typeIzq) 
                                + ' con ' + this.getStringTipo(typeDer)
                                + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                }
            case operacion.DIVISION:
                this.tipo = this.tipoDominanteDiv(typeIzq, typeDer);
                if (this.tipo === tipo.ERROR){
                    return resultado;
                }
                switch(typeIzq){
                    case tipo.INT:
                        switch(typeDer){
                            case tipo.INT:
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer);
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
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer); 
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
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer.toString().replace(/'/g,"").charCodeAt(0));
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
                                                        + this.getStringTipo(typeDer), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede dividir entero con ' 
                                        + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.DOUBLE:
                        switch(typeDer){
                            case tipo.INT:
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer); 
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
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer); 
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
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer.toString().replace(/'/g,"").charCodeAt(0)); 
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
                                                        + this.getStringTipo(typeDer), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede dividir doble con ' 
                                        + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.CHAR:
                        switch(typeDer){
                            case tipo.INT:
                                opIzq = parseFloat(valIzq.toString().replace(/'/g,"").charCodeAt(0));
                                opDer = parseFloat(valDer);
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
                                opIzq = parseFloat(valIzq.toString().replace(/'/g,"").charCodeAt(0));
                                opDer = parseFloat(valDer);
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
                                                        + this.getStringTipo(typeDer), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede dividir caracter con ' 
                                        + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    default:
                        errores.agregarError('semantico', 
                                                'No se puede dividir ' + this.getStringTipo(typeIzq) 
                                                + ' con ' + this.getStringTipo(typeDer), 
                                                this.linea, this.columna);
                        return ('Error semantico: No se puede dividir ' + this.getStringTipo(typeIzq) 
                                + ' con ' + this.getStringTipo(typeDer)
                                + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                }
            case operacion.POTENCIA:
                this.tipo = this.tipoDominantePow(typeIzq, typeDer);
                if (this.tipo === tipo.ERROR){
                    return resultado;
                }
                switch(typeIzq){
                    case tipo.INT:
                        switch(typeDer){
                            case tipo.INT:
                                opIzq = parseInt(valIzq);
                                opDer = parseInt(valDer); 
                                resultado = Math.pow(opIzq,opDer);
                                return resultado;
                            case tipo.DOUBLE:
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer);  
                                resultado = Math.pow(opIzq,opDer);
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede potenciar entero con ' 
                                                        + this.getStringTipo(typeDer), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede potenciar entero con ' 
                                        + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.DOUBLE:
                        switch(typeDer){
                            case tipo.INT:
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer); 
                                resultado = Math.pow(opIzq,opDer);
                                return resultado;
                            case tipo.DOUBLE:
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer);  
                                resultado = Math.pow(opIzq,opDer);
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede potenciar doble con ' 
                                                        + this.getStringTipo(typeDer), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede potenciar doble con ' 
                                        + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    default:
                        errores.agregarError('semantico', 
                                                'No se puede potenciar ' + this.getStringTipo(typeIzq) 
                                                + ' con ' + this.getStringTipo(typeDer), 
                                                this.linea, this.columna);
                        return ('Error semantico: No se puede potenciar ' + this.getStringTipo(typeIzq) 
                                + ' con ' + this.getStringTipo(typeDer)
                                + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                }
            case operacion.MODULO:
                this.tipo = this.tipoDominanteDiv(typeIzq, typeDer);
                if (this.tipo === tipo.ERROR){
                    return resultado;
                }
                switch(typeIzq){
                    case tipo.INT:
                        switch(typeDer){
                            case tipo.INT:
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer); 
                                resultado = opIzq % opDer;
                                return resultado;
                            case tipo.DOUBLE:
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer); 
                                resultado = opIzq % opDer;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede modular entero con ' 
                                                        + this.getStringTipo(typeDer), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede modular entero con ' 
                                        + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.DOUBLE:
                        switch(typeDer){
                            case tipo.INT:
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer); 
                                resultado = opIzq % opDer;
                                return resultado;
                            case tipo.DOUBLE:
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer);
                                resultado = opIzq % opDer;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede modular doble con ' 
                                                        + this.getStringTipo(typeDer), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede modular doble con ' 
                                        + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    default:
                        errores.agregarError('semantico', 
                                                'No se puede modular ' + this.getStringTipo(typeIzq) 
                                                + ' con ' + this.getStringTipo(typeDer), 
                                                this.linea, this.columna);
                        return ('Error semantico: No se puede modular ' + this.getStringTipo(typeIzq) 
                                + ' con ' + this.getStringTipo(typeDer)
                                + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                }
            case operacion.NEGACION:
                if (typeIzq === tipo.ERROR){
                    this.tipo = tipo.ERROR;
                    return resultado;
                }
                switch(typeIzq){
                    case tipo.INT:
                        this.tipo = tipo.INT;
                        opIzq = parseInt(valIzq);
                        resultado = -1 * opIzq;
                        return resultado;
                    case tipo.DOUBLE:
                        this.tipo = tipo.DOUBLE;
                        opIzq = parseFloat(valIzq);
                        resultado = -1 * opIzq;
                        return resultado;
                    default:
                        errores.agregarError('semantico', 
                                                'No se puede negar ' + this.getStringTipo(typeIzq), 
                                                this.linea, this.columna);
                        return ('Error semantico: No se puede negar ' + this.getStringTipo(typeIzq) 
                                + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                }
            case operacion.COMPARACION:
                if (typeIzq == tipo.ERROR || typeDer == tipo.ERROR){
                    this.tipo = tipo.ERROR;
                    return resultado;
                }
                this.tipo = tipo.BOOLEAN;
                switch(typeIzq){
                    case tipo.INT:
                        switch(typeDer){
                            case tipo.INT:
                                opIzq = parseInt(valIzq);
                                opDer = parseInt(valDer);
                                resultado = (opIzq == opDer)?true:false;
                                return resultado;
                            case tipo.DOUBLE:
                                opIzq = parseInt(valIzq);
                                opDer = parseFloat(valDer);
                                resultado = (opIzq == opDer)?true:false;
                                return resultado;
                            case tipo.CHAR:
                                opIzq = parseInt(valIzq);
                                opDer = valDer.toString().replace(/'/g,"").charCodeAt(0);
                                resultado = (opIzq == opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(typeIzq)
                                                        + ' con ' + this.getStringTipo(typeDer), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(typeIzq) 
                                        + ' con ' + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.DOUBLE:
                        switch(typeDer){
                            case tipo.INT:
                                opIzq = parseFloat(valIzq);
                                opDer = parseInt(valDer);
                                resultado = (opIzq == opDer)?true:false;
                                return resultado;
                            case tipo.DOUBLE:
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer);
                                resultado = (opIzq == opDer)?true:false;
                                return resultado;
                            case tipo.CHAR:
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer.toString().replace(/'/g,"").charCodeAt(0));
                                resultado = (opIzq == opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(typeIzq)
                                                        + ' con ' + this.getStringTipo(typeDer), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(typeIzq) 
                                        + ' con ' + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.BOOLEAN:
                        switch(typeDer){
                            case tipo.BOOLEAN:
                                opIzq = (valIzq.toString() == 'true')?true:false;
                                opDer = (valDer.toString() == 'true')?true:false;
                                resultado = (opIzq == opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(typeIzq)
                                                        + ' con ' + this.getStringTipo(typeDer), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(typeIzq) 
                                        + ' con ' + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.CHAR:
                        switch(typeDer){
                            case tipo.INT:
                                opIzq = parseInt(valIzq.toString().replace(/'/g,"").charCodeAt(0));
                                opDer = parseInt(valDer);
                                resultado = (opIzq == opDer)?true:false;
                                return resultado;
                            case tipo.DOUBLE:
                                opIzq = parseFloat(valDer.toString().replace(/'/g,"").charCodeAt(0));
                                opDer = parseFloat(valDer);
                                resultado = (opIzq == opDer)?true:false;
                                return resultado;
                            case tipo.CHAR:
                                opIzq = valDer.toString().replace(/'/g,"").charCodeAt(0);
                                opDer = valDer.toString().replace(/'/g,"").charCodeAt(0);
                                resultado = (opIzq == opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(typeIzq)
                                                        + ' con ' + this.getStringTipo(typeDer), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(typeIzq) 
                                        + ' con ' + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.STRING:
                        switch(typeDer){
                            case tipo.STRING:
                                opIzq = valIzq.toString();
                                opDer = valDer.toString();
                                resultado = (opIzq == opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(typeIzq)
                                                        + ' con ' + this.getStringTipo(typeDer), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(typeIzq) 
                                        + ' con ' + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                }
            case operacion.DIFERENTE:
                if (typeIzq == tipo.ERROR || typeDer == tipo.ERROR){
                    this.tipo = tipo.ERROR;
                    return resultado;
                }
                this.tipo = tipo.BOOLEAN;
                switch(typeIzq){
                    case tipo.INT:
                        switch(typeDer){
                            case tipo.INT:
                                opIzq = parseInt(valIzq);
                                opDer = parseInt(valDer);
                                resultado = (opIzq != opDer)?true:false;
                                return resultado;
                            case tipo.DOUBLE:
                                opIzq = parseInt(valIzq);
                                opDer = parseFloat(valDer);
                                resultado = (opIzq != opDer)?true:false;
                                return resultado;
                            case tipo.CHAR:
                                opIzq = parseInt(valIzq);
                                opDer = valDer.toString().replace(/'/g,"").charCodeAt(0);
                                resultado = (opIzq != opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(typeIzq)
                                                        + ' con ' + this.getStringTipo(typeDer), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(typeIzq) 
                                        + ' con ' + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.DOUBLE:
                        switch(typeDer){
                            case tipo.INT:
                                opIzq = parseFloat(valIzq);
                                opDer = parseInt(valDer);
                                resultado = (opIzq != opDer)?true:false;
                                return resultado;
                            case tipo.DOUBLE:
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer);
                                resultado = (opIzq != opDer)?true:false;
                                return resultado;
                            case tipo.CHAR:
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer.toString().replace(/'/g,"").charCodeAt(0));
                                resultado = (opIzq != opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(typeIzq)
                                                        + ' con ' + this.getStringTipo(typeDer), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(typeIzq) 
                                        + ' con ' + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.BOOLEAN:
                        switch(typeDer){
                            case tipo.BOOLEAN:
                                opIzq = (valIzq.toString() == 'true')?true:false;
                                opDer = (valDer.toString() == 'true')?true:false;
                                resultado = (opIzq != opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(typeIzq)
                                                        + ' con ' + this.getStringTipo(typeDer), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(typeIzq) 
                                        + ' con ' + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.CHAR:
                        switch(typeDer){
                            case tipo.INT:
                                opIzq = parseInt(valIzq.toString().replace(/'/g,"").charCodeAt(0));
                                opDer = parseInt(valDer);
                                resultado = (opIzq != opDer)?true:false;
                                return resultado;
                            case tipo.DOUBLE:
                                opIzq = parseFloat(valDer.toString().replace(/'/g,"").charCodeAt(0));
                                opDer = parseFloat(valDer);
                                resultado = (opIzq != opDer)?true:false;
                                return resultado;
                            case tipo.CHAR:
                                opIzq = valDer.toString().replace(/'/g,"").charCodeAt(0);
                                opDer = valDer.toString().replace(/'/g,"").charCodeAt(0);
                                resultado = (opIzq != opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(typeIzq)
                                                        + ' con ' + this.getStringTipo(typeDer), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(typeIzq) 
                                        + ' con ' + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.STRING:
                        switch(typeDer){
                            case tipo.STRING:
                                opIzq = valIzq.toString();
                                opDer = valDer.toString();
                                resultado = (opIzq != opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(typeIzq)
                                                        + ' con ' + this.getStringTipo(typeDer), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(typeIzq) 
                                        + ' con ' + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                }
            case operacion.MAYORIGUAL:
                if (typeIzq == tipo.ERROR || typeDer == tipo.ERROR){
                    this.tipo = tipo.ERROR;
                    return resultado;
                }
                this.tipo = tipo.BOOLEAN;
                switch(typeIzq){
                    case tipo.INT:
                        switch(typeDer){
                            case tipo.INT:
                                opIzq = parseInt(valIzq);
                                opDer = parseInt(valDer);
                                resultado = (opIzq >= opDer)?true:false;
                                return resultado;
                            case tipo.DOUBLE:
                                opIzq = parseInt(valIzq);
                                opDer = parseFloat(valDer);
                                resultado = (opIzq >= opDer)?true:false;
                                return resultado;
                            case tipo.CHAR:
                                opIzq = parseInt(valIzq);
                                opDer = valDer.toString().replace(/'/g,"").charCodeAt(0);
                                resultado = (opIzq >= opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(typeIzq)
                                                        + ' con ' + this.getStringTipo(typeDer), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(typeIzq) 
                                        + ' con ' + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.DOUBLE:
                        switch(typeDer){
                            case tipo.INT:
                                opIzq = parseFloat(valIzq);
                                opDer = parseInt(valDer);
                                resultado = (opIzq >= opDer)?true:false;
                                return resultado;
                            case tipo.DOUBLE:
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer);
                                resultado = (opIzq >= opDer)?true:false;
                                return resultado;
                            case tipo.CHAR:
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer.toString().replace(/'/g,"").charCodeAt(0));
                                resultado = (opIzq >= opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(typeIzq)
                                                        + ' con ' + this.getStringTipo(typeDer), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(typeIzq) 
                                        + ' con ' + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.BOOLEAN:
                        switch(typeDer){
                            case tipo.BOOLEAN:
                                opIzq = (valIzq.toString() == 'true')?true:false;
                                opDer = (valDer.toString() == 'true')?true:false;
                                resultado = (opIzq >= opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(typeIzq)
                                                        + ' con ' + this.getStringTipo(typeDer), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(typeIzq) 
                                        + ' con ' + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.CHAR:
                        switch(typeDer){
                            case tipo.INT:
                                opIzq = parseInt(valIzq.toString().replace(/'/g,"").charCodeAt(0));
                                opDer = parseInt(valDer);
                                resultado = (opIzq >= opDer)?true:false;
                                return resultado;
                            case tipo.DOUBLE:
                                opIzq = parseFloat(valDer.toString().replace(/'/g,"").charCodeAt(0));
                                opDer = parseFloat(valDer);
                                resultado = (opIzq >= opDer)?true:false;
                                return resultado;
                            case tipo.CHAR:
                                opIzq = valDer.toString().replace(/'/g,"").charCodeAt(0);
                                opDer = valDer.toString().replace(/'/g,"").charCodeAt(0);
                                resultado = (opIzq >= opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(typeIzq)
                                                        + ' con ' + this.getStringTipo(typeDer), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(typeIzq) 
                                        + ' con ' + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.STRING:
                        switch(typeDer){
                            case tipo.STRING:
                                opIzq = valIzq.toString();
                                opDer = valDer.toString();
                                resultado = (opIzq >= opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(typeIzq)
                                                        + ' con ' + this.getStringTipo(typeDer), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(typeIzq) 
                                        + ' con ' + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                }
            case operacion.MENORIGUAL:
                if (typeIzq == tipo.ERROR || typeDer == tipo.ERROR){
                    this.tipo = tipo.ERROR;
                    return resultado;
                }
                this.tipo = tipo.BOOLEAN;
                switch(typeIzq){
                    case tipo.INT:
                        switch(typeDer){
                            case tipo.INT:
                                opIzq = parseInt(valIzq);
                                opDer = parseInt(valDer);
                                resultado = (opIzq <= opDer)?true:false;
                                return resultado;
                            case tipo.DOUBLE:
                                opIzq = parseInt(valIzq);
                                opDer = parseFloat(valDer);
                                resultado = (opIzq <= opDer)?true:false;
                                return resultado;
                            case tipo.CHAR:
                                opIzq = parseInt(valIzq);
                                opDer = valDer.toString().replace(/'/g,"").charCodeAt(0);
                                resultado = (opIzq <= opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(typeIzq)
                                                        + ' con ' + this.getStringTipo(typeDer), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(typeIzq) 
                                        + ' con ' + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.DOUBLE:
                        switch(typeDer){
                            case tipo.INT:
                                opIzq = parseFloat(valIzq);
                                opDer = parseInt(valDer);
                                resultado = (opIzq <= opDer)?true:false;
                                return resultado;
                            case tipo.DOUBLE:
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer);
                                resultado = (opIzq <= opDer)?true:false;
                                return resultado;
                            case tipo.CHAR:
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer.toString().replace(/'/g,"").charCodeAt(0));
                                resultado = (opIzq <= opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(typeIzq)
                                                        + ' con ' + this.getStringTipo(typeDer), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(typeIzq) 
                                        + ' con ' + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.BOOLEAN:
                        switch(typeDer){
                            case tipo.BOOLEAN:
                                opIzq = (valIzq.toString() == 'true')?true:false;
                                opDer = (valDer.toString() == 'true')?true:false;
                                resultado = (opIzq <= opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(typeIzq)
                                                        + ' con ' + this.getStringTipo(typeDer), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(typeIzq) 
                                        + ' con ' + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.CHAR:
                        switch(typeDer){
                            case tipo.INT:
                                opIzq = parseInt(valIzq.toString().replace(/'/g,"").charCodeAt(0));
                                opDer = parseInt(valDer);
                                resultado = (opIzq <= opDer)?true:false;
                                return resultado;
                            case tipo.DOUBLE:
                                opIzq = parseFloat(valDer.toString().replace(/'/g,"").charCodeAt(0));
                                opDer = parseFloat(valDer);
                                resultado = (opIzq <= opDer)?true:false;
                                return resultado;
                            case tipo.CHAR:
                                opIzq = valDer.toString().replace(/'/g,"").charCodeAt(0);
                                opDer = valDer.toString().replace(/'/g,"").charCodeAt(0);
                                resultado = (opIzq <= opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(typeIzq)
                                                        + ' con ' + this.getStringTipo(typeDer), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(typeIzq) 
                                        + ' con ' + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.STRING:
                        switch(typeDer){
                            case tipo.STRING:
                                opIzq = valIzq.toString();
                                opDer = valDer.toString();
                                resultado = (opIzq <= opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(typeIzq)
                                                        + ' con ' + this.getStringTipo(typeDer), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(typeIzq) 
                                        + ' con ' + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                }
            case operacion.MAYOR:
                if (typeIzq == tipo.ERROR || typeDer == tipo.ERROR){
                    this.tipo = tipo.ERROR;
                    return resultado;
                }
                this.tipo = tipo.BOOLEAN;
                switch(typeIzq){
                    case tipo.INT:
                        switch(typeDer){
                            case tipo.INT:
                                opIzq = parseInt(valIzq);
                                opDer = parseInt(valDer);
                                resultado = (opIzq > opDer)?true:false;
                                return resultado;
                            case tipo.DOUBLE:
                                opIzq = parseInt(valIzq);
                                opDer = parseFloat(valDer);
                                resultado = (opIzq > opDer)?true:false;
                                return resultado;
                            case tipo.CHAR:
                                opIzq = parseInt(valIzq);
                                opDer = valDer.toString().replace(/'/g,"").charCodeAt(0);
                                resultado = (opIzq > opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(typeIzq)
                                                        + ' con ' + this.getStringTipo(typeDer), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(typeIzq) 
                                        + ' con ' + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.DOUBLE:
                        switch(typeDer){
                            case tipo.INT:
                                opIzq = parseFloat(valIzq);
                                opDer = parseInt(valDer);
                                resultado = (opIzq > opDer)?true:false;
                                return resultado;
                            case tipo.DOUBLE:
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer);
                                resultado = (opIzq > opDer)?true:false;
                                return resultado;
                            case tipo.CHAR:
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer.toString().replace(/'/g,"").charCodeAt(0));
                                resultado = (opIzq > opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(typeIzq)
                                                        + ' con ' + this.getStringTipo(typeDer), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(typeIzq) 
                                        + ' con ' + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.BOOLEAN:
                        switch(typeDer){
                            case tipo.BOOLEAN:
                                opIzq = (valIzq.toString() == 'true')?true:false;
                                opDer = (valDer.toString() == 'true')?true:false;
                                resultado = (opIzq > opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(typeIzq)
                                                        + ' con ' + this.getStringTipo(typeDer), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(typeIzq) 
                                        + ' con ' + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.CHAR:
                        switch(typeDer){
                            case tipo.INT:
                                opIzq = parseInt(valIzq.toString().replace(/'/g,"").charCodeAt(0));
                                opDer = parseInt(valDer);
                                resultado = (opIzq > opDer)?true:false;
                                return resultado;
                            case tipo.DOUBLE:
                                opIzq = parseFloat(valDer.toString().replace(/'/g,"").charCodeAt(0));
                                opDer = parseFloat(valDer);
                                resultado = (opIzq > opDer)?true:false;
                                return resultado;
                            case tipo.CHAR:
                                opIzq = valDer.toString().replace(/'/g,"").charCodeAt(0);
                                opDer = valDer.toString().replace(/'/g,"").charCodeAt(0);
                                resultado = (opIzq > opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(typeIzq)
                                                        + ' con ' + this.getStringTipo(typeDer), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(typeIzq) 
                                        + ' con ' + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.STRING:
                        switch(typeDer){
                            case tipo.STRING:
                                opIzq = valIzq.toString();
                                opDer = valDer.toString();
                                resultado = (opIzq > opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(typeIzq)
                                                        + ' con ' + this.getStringTipo(typeDer), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(typeIzq) 
                                        + ' con ' + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                }
            case operacion.MENOR:
                if (typeIzq == tipo.ERROR || typeDer == tipo.ERROR){
                    this.tipo = tipo.ERROR;
                    return resultado;
                }
                this.tipo = tipo.BOOLEAN;
                switch(typeIzq){
                    case tipo.INT:
                        switch(typeDer){
                            case tipo.INT:
                                opIzq = parseInt(valIzq);
                                opDer = parseInt(valDer);
                                resultado = (opIzq < opDer)?true:false;
                                return resultado;
                            case tipo.DOUBLE:
                                opIzq = parseInt(valIzq);
                                opDer = parseFloat(valDer);
                                resultado = (opIzq < opDer)?true:false;
                                return resultado;
                            case tipo.CHAR:
                                opIzq = parseInt(valIzq);
                                opDer = valDer.toString().replace(/'/g,"").charCodeAt(0);
                                resultado = (opIzq < opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(typeIzq)
                                                        + ' con ' + this.getStringTipo(typeDer), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(typeIzq) 
                                        + ' con ' + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.DOUBLE:
                        switch(typeDer){
                            case tipo.INT:
                                opIzq = parseFloat(valIzq);
                                opDer = parseInt(valDer);
                                resultado = (opIzq < opDer)?true:false;
                                return resultado;
                            case tipo.DOUBLE:
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer);
                                resultado = (opIzq < opDer)?true:false;
                                return resultado;
                            case tipo.CHAR:
                                opIzq = parseFloat(valIzq);
                                opDer = parseFloat(valDer.toString().replace(/'/g,"").charCodeAt(0));
                                resultado = (opIzq < opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(typeIzq)
                                                        + ' con ' + this.getStringTipo(typeDer), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(typeIzq) 
                                        + ' con ' + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.BOOLEAN:
                        switch(typeDer){
                            case tipo.BOOLEAN:
                                opIzq = (valIzq.toString() == 'true')?true:false;
                                opDer = (valDer.toString() == 'true')?true:false;
                                resultado = (opIzq < opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(typeIzq)
                                                        + ' con ' + this.getStringTipo(typeDer), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(typeIzq) 
                                        + ' con ' + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.CHAR:
                        switch(typeDer){
                            case tipo.INT:
                                opIzq = parseInt(valIzq.toString().replace(/'/g,"").charCodeAt(0));
                                opDer = parseInt(valDer);
                                resultado = (opIzq < opDer)?true:false;
                                return resultado;
                            case tipo.DOUBLE:
                                opIzq = parseFloat(valDer.toString().replace(/'/g,"").charCodeAt(0));
                                opDer = parseFloat(valDer);
                                resultado = (opIzq < opDer)?true:false;
                                return resultado;
                            case tipo.CHAR:
                                opIzq = valDer.toString().replace(/'/g,"").charCodeAt(0);
                                opDer = valDer.toString().replace(/'/g,"").charCodeAt(0);
                                resultado = (opIzq < opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(typeIzq)
                                                        + ' con ' + this.getStringTipo(typeDer), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(typeIzq) 
                                        + ' con ' + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.STRING:
                        switch(typeDer){
                            case tipo.STRING:
                                opIzq = valIzq.toString();
                                opDer = valDer.toString();
                                resultado = (opIzq < opDer)?true:false;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede comparar ' + this.getStringTipo(typeIzq)
                                                        + ' con ' + this.getStringTipo(typeDer), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede comparar ' + this.getStringTipo(typeIzq) 
                                        + ' con ' + this.getStringTipo(typeDer)
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                }
            case operacion.OR:
                if (typeIzq == tipo.ERROR || typeDer == tipo.ERROR){
                    this.tipo = tipo.ERROR;
                    return resultado;
                }
                this.tipo = tipo.BOOLEAN;
                switch(typeIzq){
                    case tipo.INT:
                        opIzq = parseInt(valIzq);
                        break;
                    case tipo.DOUBLE:
                        opIzq = parseFloat(valIzq);
                        break;
                    case tipo.BOOLEAN:
                        opIzq = (valIzq.toString() == 'true')?true:false;
                        break;
                    case tipo.CHAR:
                        opIzq = parseInt(valIzq.toString().replace(/'/g,"").charCodeAt(0));
                        break;
                    case tipo.STRING:
                        opIzq = valIzq.toString();
                        break;
                }
                switch(typeDer){
                    case tipo.INT:
                        opDer = parseInt(valDer);
                        break;
                    case tipo.DOUBLE:
                        opDer = parseFloat(valDer);
                        break;
                    case tipo.BOOLEAN:
                        opDer = (valDer.toString() == 'true')?true:false;
                        break;
                    case tipo.CHAR:
                        opDer = parseInt(valDer.toString().replace(/'/g,"").charCodeAt(0));
                        break;
                    case tipo.STRING:
                        opDer = valDer.toString();
                        break;
                }
                resultado = (opIzq || opDer);
                return resultado;
            case operacion.AND:
                if (typeIzq == tipo.ERROR || typeDer == tipo.ERROR){
                    this.tipo = tipo.ERROR;
                    return resultado;
                }
                this.tipo = tipo.BOOLEAN;
                switch(typeIzq){
                    case tipo.INT:
                        opIzq = parseInt(valIzq);
                        break;
                    case tipo.DOUBLE:
                        opIzq = parseFloat(valIzq);
                        break;
                    case tipo.BOOLEAN:
                        opIzq = (valIzq.toString() == 'true')?true:false;
                        break;
                    case tipo.CHAR:
                        opIzq = parseInt(valIzq.toString().replace(/'/g,"").charCodeAt(0));
                        break;
                    case tipo.STRING:
                        opIzq = valIzq.toString();
                        break;
                }
                switch(typeDer){
                    case tipo.INT:
                        opDer = parseInt(valDer);
                        break;
                    case tipo.DOUBLE:
                        opDer = parseFloat(valDer);
                        break;
                    case tipo.BOOLEAN:
                        opDer = (valDer.toString() == 'true')?true:false;
                        break;
                    case tipo.CHAR:
                        opDer = parseInt(valDer.toString().replace(/'/g,"").charCodeAt(0));
                        break;
                    case tipo.STRING:
                        opDer = valDer.toString();
                        break;
                }
                resultado = (opIzq && opDer);
                return resultado;
            case operacion.NOT:
                if (typeIzq == tipo.ERROR){
                    this.tipo = tipo.ERROR;
                    return resultado;
                }
                this.tipo = tipo.BOOLEAN;
                switch(typeIzq){
                    case tipo.INT:
                        opIzq = parseInt(valIzq);
                        break;
                    case tipo.DOUBLE:
                        opIzq = parseFloat(valIzq);
                        break;
                    case tipo.BOOLEAN:
                        opIzq = (valIzq.toString() == 'true')?true:false;
                        break;
                    case tipo.CHAR:
                        opIzq = parseInt(valIzq.toString().replace(/'/g,"").charCodeAt(0));
                        break;
                    case tipo.STRING:
                        opIzq = valIzq.toString();
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