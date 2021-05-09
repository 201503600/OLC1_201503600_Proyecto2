var fs = require('fs'); 
var parser = require('./gramatica');
var arbol = require('./AST/recorrido_arbol');
const errores = require('./Arbol/Error/listaError');
const display = require('./Arbol/Salida/display');
const output = require('./Arbol/Salida/output');
const Entorno = require('./Arbol/entorno');
const instruccion = require('./Arbol/Instrucciones/instruccion');
const expresion = require('./Arbol/Expresiones/expresion');

const express = require('express');
const cors = require('cors');
//funcion que procesa datos antes de que el servidor lo reciba
const morgan = require('morgan');
const operador = require('./Arbol/Expresiones/operador');
const app = express();

//configuraciones
app.set('port',process.env.PORT || 3000);
app.set('json spaces',2);

// middleware intermedio
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

//rutas
app.post('/', function(req, res){
    let texto = req.body.entrada;
    //console.log(req.body);
    //var raiz = new arbol();
    //console.log(raiz.recorrer_arbolito3(parser.parse(data.toString())));
    output.limpiar();
    errores.limpiar();
    display.limpiar();

    let global = new Entorno(null, null);
    let raiz = null;
    raiz = parser.parse(texto);
    //console.log(errores);
    
    //console.log(JSON.stringify(raiz));
    for(let i = 0; i<raiz.length; i++){
        //console.log(raiz[i]);
        if (raiz[i] instanceof instruccion){
            raiz[i].ejecutar(global);
        }else if (raiz[i] instanceof operador){
            console.log("Entra aca");
            raiz[i].getValor(global);
        }
    }  
    for(let i = 0; i<errores.getSize(); i++){
        //console.log(errores.getError(i));
        output.agregarTexto('--->' + errores.getError(i).getMensaje() + '\n');
    }
    output.agregarTexto('Ejecutado correctamente!\n');
    res.send(output.getSalida());
});

//iniciando servidor
app.listen(app.get('port'),()=>{
    console.log(`http://localhost:${app.get('port')}`);
});
