#### Universidad San Carlos de Guatemala
#### Facultad de Ingenieria
#### Escuela de Ciencias y Sistemas
#### Organizacion de Lenguajes y Compiladores 1
#### Ing. Mario Bautista
#### Aux. Jose Puac
#### Aux. Emely Garcia

# Manual de Gramatica - Proyecto 2

### GRAMATICA

La gramatica realizada permite la ejecucion de codigo en el cual puede incluirse una lista de instrucciones, esta lista puede contener metodos, llamadas, declaraciones, asignaciones, etc. globalmente. Para la implementacion se utilizo la siguiente gramatica:

```
inicio -> sentencias EOF
inicio -> EOF
```
En esta parte de la gramatica se indica que se puede analizar una lista de sentencias o bien un texto vacio.

**Lista de sentencias general**
```
sentencias -> sentencias sentencia
sentencias -> sentencia

sentencia -> metodo
sentencia -> sent_exec PUNTOCOMA
sentencia -> sent_local
sentencia -> error PUNTOCOMA
```
En estas producciones se define la lista de sentencias aceptadas en un ambito global, ya que en ellas se encuentra una produccion que lleva a `sentencia` y en esta se definen las instrucciones globales y las sentencias locales. Las sentencias locales son todas aquellas sentencias que pueden estar tanto en un ambito global como local, mientras que un metodo o la sentencia exec solamente pueden reconocerse en un ambito global. Tambien se puede observar que en la produccion `sentencia` se desplaza hacia un error, esto para poder realizar la recuperacion de errores sintacticos.

**Sentencia local**
```
sentencia_local -> inicializacion PUNTOCOMA
sentencia_local -> unitarios PUNTOCOMA
sentencia_local -> llamada PUNTOCOMA
sentencia_local -> sent_if
sentencia_local -> sent_switch
sentencia_local -> sent_while
sentencia_local -> sent_for
sentencia_local -> sent_dowhile
sentencia_local -> sent_print PUNTOCOMA
```
En la produccion de sentencias locales, se reconocen todas aquellas sentencias que pueden estar tanto global como localmente. (Ej: Declaracion, Asignacion, Llamada a metodos, Sentencias de control, Ciclos y Print)

**Expresion**
```
expresion -> expresion OR expresion             
expresion -> expresion AND expresion            
expresion -> NOT expresion                      
expresion -> expresion COMPARACION expresion    
expresion -> expresion DIFERENTE expresion      
expresion -> expresion MENOR expresion          
expresion -> expresion MEN_EQ expresion         
expresion -> expresion MAYOR expresion          
expresion -> expresion MAY_EQ expresion         
expresion -> expresion SUMA expresion           
expresion -> expresion RESTA expresion          
expresion -> expresion MULTIPLICACION expresion 
expresion -> expresion DIVISION expresion 
expresion -> expresion MODULO expresion   
expresion -> expresion POTENCIA expresion 
expresion -> RESTA expresion %prec UMENOS    
expresion -> PAR_IZQ expresion PAR_DER 
expresion -> casteo expresion
expresion -> unitarios    
expresion -> llamada      
expresion -> sent_nativas
expresion -> ENTERO       
expresion -> DECIMAL      
expresion -> CADENA       
expresion -> CARACTER     
expresion -> IDENTIFICADOR
expresion -> RTRUE 
expresion -> RFALSE
```
Esta produccion se encarga de reconocer todas las operaciones aritmeticas, relaciones y logicas. Para la resolucion de la ambiguedad en esta parte de la gramatica se definieron las precedencias de los operadores al inicio de la gramatica, las cuales cumplen con lo siguiente:

| Precedencia | Operador | Tipo | 
| :----: | :----: | :----: | 
| 0 | ( ) | Agrupacion |
| 1 | ++, -- | Aritmetico | 
| 2 | ^ | Aritmetico | 
| 3 | *, /, % | Aritmetico | 
| 4 | +, - | Aritmetico |
| 5 | ==, !=, <=, >=, <, > | Relacional | 
| 6 | ! | Logico | 
| 7 | && | Logico | 
| 8 | \|\| | Logico | 

**If**
```
sent_if -> list_if RELSE bloque_instrucciones
sent_if -> list_if

list_if -> list_if RELSE RIF PAR_IZQ expresion PAR_DER bloque_instrucciones
list_if -> RIF PAR_IZQ expresion PAR_DER bloque_instrucciones 

bloque_instrucciones -> LLAVE_IZQ instrucciones LLAVE_DER
bloque_instrucciones -> LLAVE_IZQ LLAVE_DER
```
La sentencia if es una sentencia de control, la cual posee 3 variantes, la primera es que pueda reconocerse solamente un `if` (esta variante siempre se cumple); la segunda es que permita el reconocimiento de sentencias `else if`; mientras que la tercer y ultima variante permite reconocer sentencias `else`.

**Switch**
```
sent_switch -> RSWITCH PAR_IZQ expresion PAR_DER LLAVE_IZQ cases_list default LLAVE_DER
sent_switch -> RSWITCH PAR_IZQ expresion PAR_DER LLAVE_IZQ cases_list LLAVE_DER
sent_switch -> RSWITCH PAR_IZQ expresion PAR_DER LLAVE_IZQ default LLAVE_DER 

cases_list -> cases_list RCASE expresion COLON instrucciones
cases_list -> RCASE expresion COLON instrucciones 

default -> RDEFAULT COLON instrucciones
```
La sentencia switch, al igual que la sentencia if, posee variantes ya que en ella puede reconocerse una lista de `cases` y un solo `default`.

**Instrucciones**
```
instrucciones -> instrucciones instruccion
instrucciones -> instruccion

instruccion -> RBREAK SEMICOLON
instruccion -> RCONTINUE SEMICOLON
instruccion -> RRETURN SEMICOLON
instruccion -> RRETURN expresion SEMICOLON
instruccion -> sentencia_local
```
Tanto en las sentencias de control como en los ciclos se hace referencia a un `bloque de instrucciones` el cual permite que dentro de las llaves, se pueda reconocer las sentencias `break`, `continue` o `return` ademas de las sentencias locales antes descritas.

**Metodo**
```
metodo -> RVOID IDENTIFICADOR PAR_IZQ parametros PAR_DER bloque_instrucciones
metodo -> RVOID IDENTIFICADOR PAR_IZQ PAR_DER bloque_instrucciones
metodo -> tipo IDENTIFICADOR PAR_IZQ parametros PAR_DER bloque_instrucciones
metodo -> tipo IDENTIFICADOR PAR_IZQ PAR_DER bloque_instrucciones
```
En esta produccion se generalizo el reconocimiento de metodos y funciones, los cuales pueden tener o no una lista de parametros en su definicion.

Proyecto realizado por _Edgar Daniel Cil_ con carnet **201503600**
