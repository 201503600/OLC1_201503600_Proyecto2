const expresion = require( './expresion');
const operacion = require('./operaciones');
const tipo = require('./tipos');
const errores = require('./Error/listaError');

class operador{
    constructor(tipoOperacion, izq, der, linea, columna){
        this.izq = izq;
        this.der = der;
        this.operacion = tipoOperacion;
        this.linea = linea;
        this.columna = columna;
        this.tipo;
    }

    getTipo(){
        return this.tipo;
    }

    getValor(){
        let opIzq;
        let opDer;
        let resultado;
        switch (this.operacion){
            case operacion.INCREMENTO:

                break;
            case operacion.DECREMENTO:

                break;
            case operacion.SUMA:
                this.tipo = this.tipoDominanteSuma(this.izq.getTipo(), this.der.getTipo());
                switch(this.izq.getTipo()){
                    case tipo.INT:
                        switch(this.der.getTipo()){
                            case tipo.INT:
                                opIzq = parseInt(this.izq.getValor());
                                opDer = parseInt(this.der.getValor()); 
                                resultado = opIzq + opDer;
                                return resultado; 
                            case tipo.DOUBLE:                                
                                opIzq = parseFloat(this.izq.getValor());
                                opDer = parseFloat(this.der.getValor());  
                                resultado = opIzq + opDer;
                                return resultado; 
                            case tipo.BOOLEAN:     
                                opIzq = parseInt(this.izq.getValor());
                                opDer = (this.der.getValor() == 'true')?1:0; 
                                resultado = opIzq + opDer;
                                return resultado; 
                            case tipo.CHAR:     
                                opIzq = parseInt(this.izq.getValor());
                                opDer = this.der.getValor().toString().replace("'","").charCodeAt(0); 
                                resultado = opIzq + opDer;
                                return resultado; 
                            case tipo.STRING:
                                opIzq = this.izq.getValor().toString();
                                opDer = this.der.getValor().toString().replace(/\"/g,""); 
                                resultado = opIzq + opDer;
                                return resultado; 
                        }
                        break;
                    case tipo.DOUBLE:
                        switch(this.der.getTipo()){
                            case tipo.INT:
                                opIzq = parseFloat(this.izq.getValor());
                                opDer = parseFloat(this.der.getValor()); 
                                resultado = opIzq + opDer;
                                return resultado; 
                            case tipo.DOUBLE:                                
                                opIzq = parseFloat(this.izq.getValor());
                                opDer = parseFloat(this.der.getValor());  
                                resultado = opIzq + opDer;
                                return resultado; 
                            case tipo.BOOLEAN:     
                                opIzq = parseFloat(this.izq.getValor());
                                opDer = (this.der.getValor() == 'true')?parseFloat(1):parseFloat(0); 
                                resultado = opIzq + opDer;
                                return resultado; 
                            case tipo.CHAR:     
                                opIzq = parseFloat(this.izq.getValor());
                                opDer = parseFloat(this.der.getValor().toString().replace("'","").charCodeAt(0)); 
                                resultado = opIzq + opDer;
                                return resultado; 
                            case tipo.STRING:
                                opIzq = this.izq.getValor().toString();
                                opDer = this.der.getValor().toString().replace(/\"/g,""); 
                                resultado = opIzq + opDer;
                                return resultado; 
                        }
                        break;
                    case tipo.BOOLEAN:
                        switch(this.der.getTipo()){
                            case tipo.INT:
                                opIzq = (this.izq.getValor() == 'true')?1:0;
                                opDer = parseInt(this.der.getValor()); 
                                resultado = opIzq + opDer;
                                return resultado; 
                            case tipo.DOUBLE:                                
                                opIzq = (this.izq.getValor() == 'true')?parseFloat(1):parseFloat(0);
                                opDer = parseFloat(this.der.getValor());  
                                resultado = opIzq + opDer;
                                return resultado;  
                            case tipo.STRING:
                                opIzq = (this.izq.getValor() == 'true')?'1':'0';
                                opDer = this.der.getValor().toString().replace(/\"/g,""); 
                                resultado = opIzq + opDer;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede sumar booleano con ' + this.getStringTipo(this.der.getTipo()), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede sumar booleano con ' 
                                        + this.getStringTipo(this.der.getTipo())
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.CHAR:
                        switch(this.der.getTipo()){
                            case tipo.INT:
                                opIzq = this.izq.getValor().toString().replace("'","").charCodeAt(0); 
                                opDer = parseInt(this.der.getValor()); 
                                resultado = opIzq + opDer;
                                return resultado; 
                            case tipo.DOUBLE:                                
                                opIzq = parseFloat(this.izq.getValor().toString().replace("'","").charCodeAt(0));
                                opDer = parseFloat(this.der.getValor());  
                                resultado = opIzq + opDer;
                                return resultado; 
                            case tipo.BOOLEAN:     
                                errores.agregarError('semantico', 
                                                        'No se puede sumar caracter con ' + this.getStringTipo(this.der.getTipo()), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede sumar caracter con ' 
                                        + this.getStringTipo(this.der.getTipo())
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                            case tipo.CHAR:     
                                opIzq = this.izq.getValor().toString().replace(/'/g,"");
                                opDer = this.der.getValor().toString().replace(/'/g,""); 
                                resultado = opIzq + opDer;
                                return resultado; 
                            case tipo.STRING:
                                opIzq = this.izq.getValor().toString().replace(/'/g,"");
                                opDer = this.der.getValor().toString().replace(/\"/g,""); 
                                resultado = opIzq + opDer;
                                return resultado; 
                        }
                        break;
                    case tipo.STRING:
                        switch(this.der.getTipo()){
                            case tipo.INT:
                                opIzq = this.izq.getValor().toString().replace(/\"/g,"");
                                opDer = this.der.getValor().toString(); 
                                resultado = opIzq + opDer;
                                return resultado; 
                            case tipo.DOUBLE:                           
                                opIzq = this.izq.getValor().toString().replace(/\"/g,"");
                                opDer = this.der.getValor().toString();  
                                resultado = opIzq + opDer;
                                return resultado; 
                            case tipo.BOOLEAN:     
                                opIzq = this.izq.getValor().toString().replace(/\"/g,"");
                                opDer = (this.der.getValor() == 'true')?'1':'0'; 
                                resultado = opIzq + opDer;
                                return resultado; 
                            case tipo.CHAR:     
                                opIzq = this.izq.getValor().toString().replace(/\"/g,"");
                                opDer = this.der.getValor().toString().replace(/'/g,""); 
                                resultado = opIzq + opDer;
                                return resultado; 
                            case tipo.STRING:
                                opIzq = this.izq.getValor().toString().replace(/\"/g,"");
                                opDer = this.der.getValor().toString().replace(/\"/g,""); 
                                console.log('Izquierdo: ' + opIzq + ' Derecho: ' + opDer);
                                resultado = opIzq + opDer;
                                return resultado; 
                        }
                        break;
                }
                break;
            case operacion.RESTA:
                this.tipo = this.tipoDominanteResta(this.izq.getTipo(), this.der.getTipo());
                switch(this.izq.getTipo()){
                    case tipo.INT:
                        switch(this.der.getTipo()){
                            case tipo.INT:
                                opIzq = parseInt(this.izq.getValor());
                                opDer = parseInt(this.der.getValor()); 
                                resultado = opIzq - opDer;
                                return resultado; 
                            case tipo.DOUBLE:
                                opIzq = parseFloat(this.izq.getValor());
                                opDer = parseFloat(this.der.getValor()); 
                                resultado = opIzq - opDer;
                                return resultado; 
                            case tipo.BOOLEAN:
                                opIzq = parseInt(this.izq.getValor());
                                opDer = (this.der.getValor() == 'true')?1:0; 
                                resultado = opIzq - opDer;
                                return resultado; 
                            case tipo.CHAR:
                                opIzq = parseInt(this.izq.getValor());
                                opDer = this.der.getValor().toString().replace(/'/g,"").charCodeAt(0); 
                                resultado = opIzq - opDer;
                                return resultado; 
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede restar entero con ' + this.getStringTipo(this.der.getTipo()), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede restar entero con ' 
                                        + this.getStringTipo(this.der.getTipo())
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.DOUBLE:
                        switch(this.der.getTipo()){
                            case tipo.INT:
                                opIzq = parseFloat(this.izq.getValor());
                                opDer = parseFloat(this.der.getValor()); 
                                resultado = opIzq - opDer;
                                return resultado; 
                            case tipo.DOUBLE:
                                opIzq = parseFloat(this.izq.getValor());
                                opDer = parseFloat(this.der.getValor()); 
                                resultado = opIzq - opDer;
                                return resultado; 
                            case tipo.BOOLEAN:
                                opIzq = parseFloat(this.izq.getValor());
                                opDer = (this.der.getValor() == 'true')?parseFloat(1):parseFloat(0); 
                                resultado = opIzq - opDer;
                                return resultado; 
                            case tipo.CHAR:
                                opIzq = parseFloat(this.izq.getValor());
                                opDer = parseFloat(this.der.getValor().toString().replace(/'/g,"").charCodeAt(0)); 
                                resultado = opIzq - opDer;
                                return resultado; 
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede restar doble con ' + this.getStringTipo(this.der.getTipo()), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede restar doble con ' 
                                        + this.getStringTipo(this.der.getTipo())
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.BOOLEAN:
                        switch(this.der.getTipo()){
                            case tipo.INT:
                                opIzq = (this.izq.getValor() == 'true')?parseInt(1):parseInt(0);
                                opDer = parseInt(this.der.getValor()); 
                                resultado = opIzq - opDer;
                                return resultado; 
                            case tipo.DOUBLE:
                                opIzq = (this.izq.getValor() == 'true')?parseFloat(1):parseFloat(0);
                                opDer = parseFloat(this.der.getValor()); 
                                resultado = opIzq - opDer;
                                return resultado; 
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede restar booleano con ' + this.getStringTipo(this.der.getTipo()), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede restar booleano con ' 
                                        + this.getStringTipo(this.der.getTipo())
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.CHAR:
                        switch(this.der.getTipo()){
                            case tipo.INT:
                                opIzq = this.izq.getValor().toString().replace(/'/g,"").charCodeAt(0);
                                opDer = parseInt(this.der.getValor()); 
                                resultado = opIzq - opDer;
                                return resultado; 
                            case tipo.DOUBLE:
                                opIzq = this.izq.getValor().toString().replace(/'/g,"").charCodeAt(0);
                                opDer = parseFloat(this.der.getValor()); 
                                resultado = opIzq - opDer;
                                return resultado; 
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede restar caracter con ' + this.getStringTipo(this.der.getTipo()), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede restar caracter con ' 
                                        + this.getStringTipo(this.der.getTipo())
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    default:
                        errores.agregarError('semantico', 
                                                'No se puede restar caracter con ' + this.getStringTipo(this.der.getTipo()), 
                                                this.linea, this.columna);
                        return ('Error semantico: No se puede restar caracter con ' 
                                + this.getStringTipo(this.der.getTipo())
                                + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                }
            case operacion.MULTIPLICACION:
                this.tipo = this.tipoDominanteResta(this.izq.getTipo(), this.der.getTipo());
                switch(this.izq.getTipo()){
                    case tipo.INT:
                        switch(this.der.getTipo()){
                            case tipo.INT:
                                opIzq = parseInt(this.izq.getValor());
                                opDer = parseInt(this.der.getValor()); 
                                resultado = opIzq * opDer;
                                return resultado;
                            case tipo.DOUBLE:
                                opIzq = parseFloat(this.izq.getValor());
                                opDer = parseFloat(this.der.getValor()); 
                                resultado = opIzq * opDer;
                                return resultado;
                            case tipo.CHAR:
                                opIzq = parseInt(this.izq.getValor());
                                opDer = this.der.getValor().toString().replace(/'/g,"").charCodeAt(0);
                                resultado = opIzq * opDer;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede multiplicar ' + this.getStringTipo(this.izq.getTipo()) 
                                                        + ' con ' + this.getStringTipo(this.der.getTipo()), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede multiplicar ' + this.getStringTipo(this.izq.getTipo()) 
                                        + ' con ' + this.getStringTipo(this.der.getTipo())
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.DOUBLE:
                        switch(this.der.getTipo()){
                            case tipo.INT:
                                opIzq = parseFloat(this.izq.getValor());
                                opDer = parseFloat(this.der.getValor()); 
                                resultado = opIzq * opDer;
                                return resultado;
                            case tipo.DOUBLE:
                                opIzq = parseFloat(this.izq.getValor());
                                opDer = parseFloat(this.der.getValor()); 
                                resultado = opIzq * opDer;
                                return resultado;
                            case tipo.CHAR:
                                opIzq = parseFloat(this.izq.getValor());
                                opDer = parseFloat(this.der.getValor().toString().replace(/'/g,"").charCodeAt(0)); 
                                resultado = opIzq * opDer;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede multiplicar ' + this.getStringTipo(this.izq.getTipo()) 
                                                        + ' con ' + this.getStringTipo(this.der.getTipo()), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede multiplicar ' + this.getStringTipo(this.izq.getTipo()) 
                                        + ' con ' + this.getStringTipo(this.der.getTipo())
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.CHAR:
                        switch(this.der.getTipo()){
                            case tipo.INT:
                                opIzq = this.izq.getValor().toString().replace(/'/g,"").charCodeAt(0);
                                opDer = parseInt(this.der.getValor());
                                resultado = opIzq * opDer;
                                return resultado;
                            case tipo.DOUBLE:
                                opIzq = parseFloat(this.izq.getValor().toString().replace(/'/g,"").charCodeAt(0));
                                opDer = parseFloat(this.der.getValor());
                                resultado = opIzq * opDer;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede multiplicar ' + this.getStringTipo(this.izq.getTipo()) 
                                                        + ' con ' + this.getStringTipo(this.der.getTipo()), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede multiplicar ' + this.getStringTipo(this.izq.getTipo()) 
                                        + ' con ' + this.getStringTipo(this.der.getTipo())
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    default:
                        errores.agregarError('semantico', 
                                                'No se puede multiplicar ' + this.getStringTipo(this.izq.getTipo()) 
                                                + ' con ' + this.getStringTipo(this.der.getTipo()), 
                                                this.linea, this.columna);
                        return ('Error semantico: No se puede multiplicar ' + this.getStringTipo(this.izq.getTipo()) 
                                + ' con ' + this.getStringTipo(this.der.getTipo())
                                + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                }
            case operacion.DIVISION:
                this.tipo = this.tipoDominanteDiv(this.izq.getTipo(), this.der.getTipo());
                switch(this.izq.getTipo()){
                    case tipo.INT:
                        switch(this.der.getTipo()){
                            case tipo.INT:
                                opIzq = parseFloat(this.izq.getValor());
                                opDer = parseFloat(this.der.getValor());
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
                                opIzq = parseFloat(this.izq.getValor());
                                opDer = parseFloat(this.der.getValor()); 
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
                                opIzq = parseFloat(this.izq.getValor());
                                opDer = parseFloat(this.der.getValor().toString().replace(/'/g,"").charCodeAt(0));
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
                                                        + this.getStringTipo(this.der.getTipo()), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede dividir entero con ' 
                                        + this.getStringTipo(this.der.getTipo())
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.DOUBLE:
                        switch(this.der.getTipo()){
                            case tipo.INT:
                                opIzq = parseFloat(this.izq.getValor());
                                opDer = parseFloat(this.der.getValor()); 
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
                                opIzq = parseFloat(this.izq.getValor());
                                opDer = parseFloat(this.der.getValor()); 
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
                                opIzq = parseFloat(this.izq.getValor());
                                opDer = parseFloat(this.der.getValor().toString().replace(/'/g,"").charCodeAt(0)); 
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
                                                        + this.getStringTipo(this.der.getTipo()), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede dividir doble con ' 
                                        + this.getStringTipo(this.der.getTipo())
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.CHAR:
                        switch(this.der.getTipo()){
                            case tipo.INT:
                                opIzq = parseFloat(this.izq.getValor().toString().replace(/'/g,"").charCodeAt(0));
                                opDer = parseFloat(this.der.getValor());
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
                                opIzq = parseFloat(this.izq.getValor().toString().replace(/'/g,"").charCodeAt(0));
                                opDer = parseFloat(this.der.getValor());
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
                                                        + this.getStringTipo(this.der.getTipo()), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede dividir caracter con ' 
                                        + this.getStringTipo(this.der.getTipo())
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    default:
                        errores.agregarError('semantico', 
                                                'No se puede dividir ' + this.getStringTipo(this.izq.getTipo()) 
                                                + ' con ' + this.getStringTipo(this.der.getTipo()), 
                                                this.linea, this.columna);
                        return ('Error semantico: No se puede dividir ' + this.getStringTipo(this.izq.getTipo()) 
                                + ' con ' + this.getStringTipo(this.der.getTipo())
                                + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                }
            case operacion.POTENCIA:
                this.tipo = this.tipoDominantePow(this.izq.getTipo(), this.der.getTipo());
                switch(this.izq.getTipo()){
                    case tipo.INT:
                        switch(this.der.getTipo()){
                            case tipo.INT:
                                opIzq = parseInt(this.izq.getValor());
                                opDer = parseInt(this.der.getValor()); 
                                resultado = Math.pow(opIzq,opDer);
                                return resultado;
                            case tipo.DOUBLE:
                                opIzq = parseFloat(this.izq.getValor());
                                opDer = parseFloat(this.der.getValor());  
                                resultado = Math.pow(opIzq,opDer);
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede potenciar entero con ' 
                                                        + this.getStringTipo(this.der.getTipo()), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede potenciar entero con ' 
                                        + this.getStringTipo(this.der.getTipo())
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.DOUBLE:
                        switch(this.der.getTipo()){
                            case tipo.INT:
                                opIzq = parseFloat(this.izq.getValor());
                                opDer = parseFloat(this.der.getValor()); 
                                resultado = Math.pow(opIzq,opDer);
                                return resultado;
                            case tipo.DOUBLE:
                                opIzq = parseFloat(this.izq.getValor());
                                opDer = parseFloat(this.der.getValor());  
                                resultado = Math.pow(opIzq,opDer);
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede potenciar doble con ' 
                                                        + this.getStringTipo(this.der.getTipo()), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede potenciar doble con ' 
                                        + this.getStringTipo(this.der.getTipo())
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    default:
                        errores.agregarError('semantico', 
                                                'No se puede potenciar ' + this.getStringTipo(this.izq.getTipo()) 
                                                + ' con ' + this.getStringTipo(this.der.getTipo()), 
                                                this.linea, this.columna);
                        return ('Error semantico: No se puede potenciar ' + this.getStringTipo(this.izq.getTipo()) 
                                + ' con ' + this.getStringTipo(this.der.getTipo())
                                + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                }
            case operacion.MODULO:
                this.tipo = this.tipoDominanteDiv(this.izq.getTipo(), this.der.getTipo());
                switch(this.izq.getTipo()){
                    case tipo.INT:
                        switch(this.der.getTipo()){
                            case tipo.INT:
                                opIzq = parseFloat(this.izq.getValor());
                                opDer = parseFloat(this.der.getValor()); 
                                resultado = opIzq % opDer;
                                return resultado;
                            case tipo.DOUBLE:
                                opIzq = parseFloat(this.izq.getValor());
                                opDer = parseFloat(this.der.getValor()); 
                                resultado = opIzq % opDer;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede modular entero con ' 
                                                        + this.getStringTipo(this.der.getTipo()), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede modular entero con ' 
                                        + this.getStringTipo(this.der.getTipo())
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    case tipo.DOUBLE:
                        switch(this.der.getTipo()){
                            case tipo.INT:
                                opIzq = parseFloat(this.izq.getValor());
                                opDer = parseFloat(this.der.getValor()); 
                                resultado = opIzq % opDer;
                                return resultado;
                            case tipo.DOUBLE:
                                opIzq = parseFloat(this.izq.getValor());
                                opDer = parseFloat(this.der.getValor());
                                resultado = opIzq % opDer;
                                return resultado;
                            default:
                                errores.agregarError('semantico', 
                                                        'No se puede modular doble con ' 
                                                        + this.getStringTipo(this.der.getTipo()), 
                                                        this.linea, this.columna);
                                return ('Error semantico: No se puede modular doble con ' 
                                        + this.getStringTipo(this.der.getTipo())
                                        + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                        }
                    default:
                        errores.agregarError('semantico', 
                                                'No se puede modular ' + this.getStringTipo(this.izq.getTipo()) 
                                                + ' con ' + this.getStringTipo(this.der.getTipo()), 
                                                this.linea, this.columna);
                        return ('Error semantico: No se puede modular ' + this.getStringTipo(this.izq.getTipo()) 
                                + ' con ' + this.getStringTipo(this.der.getTipo())
                                + ' en la linea ' + this.linea + ' y columna ' + this.columna);
                }
            case operacion.COMPARACION:

                break;
            case operacion.DIFERENTE:

                break;
            case operacion.MAYORIGUAL:

                break;
            case operacion.MENORIGUAL:

                break;
            case operacion.MAYOR:

                break;
            case operacion.MENOR:

                break;
            case operacion.OR:

                break;
            case operacion.AND:

                break;
            case operacion.NOT:

                break;
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
        if (ex1 == tipo.DOUBLE || ex2 == tipo.DOUBLE) {
            return tipo.DOUBLE;
        } else if (ex1 == tipo.INT || ex2 == tipo.INT) {
            return tipo.INT;
        } 
        return null;
    }

    tipoDominanteDiv(ex1, ex2) {
        if (ex1 == tipo.DOUBLE || ex2 == tipo.DOUBLE){
            return tipo.DOUBLE;
        } else if (ex1 == tipo.INT || ex2 == tipo.INT){
            return tipo.DOUBLE;
        }
        return null;
    }

    tipoDominantePow(ex1, ex2) {
        if (ex1 == tipo.DOUBLE || ex2 == tipo.DOUBLE){
            return tipo.DOUBLE;
        } else if (ex1 == tipo.INT && ex2 == tipo.INT){
            return tipo.INT;
        }
        return null;
    }
}

module.exports = operador;