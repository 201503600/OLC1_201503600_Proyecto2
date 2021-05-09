/**
 * Segundo Proyecto OLC1 - Edgar Cil - 201503600
 */

/*------------------------------------------------IMPORTACIONES----------------------------------------------*/
%{
    //const Nodo = require("./AST/nodo_arbol");
    //var raiz;

    const errores = require('./Arbol/Error/listaError');
    const declaracion = require('./Arbol/Instrucciones/declaracion');
    const asignacion = require('./Arbol/Instrucciones/asignacion');
    const print = require('./Arbol/Instrucciones/print');
    const _if = require('./Arbol/Instrucciones/if');
    const _switch = require('./Arbol/Instrucciones/switch');
    const _while = require('./Arbol/Instrucciones/while');
    const _doWhile = require('./Arbol/Instrucciones/do_while');
    const _for = require('./Arbol/Instrucciones/for');
    const _break = require('./Arbol/Instrucciones/break');
    const _continue = require('./Arbol/Instrucciones/continue');

    const operacion = require('./Arbol/Expresiones/operaciones');
    const operador = require('./Arbol/Expresiones/operador');
    const tipo = require('./Arbol/Expresiones/tipos');
    const primitivo = require('./Arbol/Expresiones/primitivo');
    const id = require('./Arbol/Expresiones/identificador');
%}
/* Definición Léxica */
%lex

%options case-insensitive

%%
\s+ { /*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column);*/ }

/* Comentarios */
"//"[^\n]*              { console.log('Comentario de una linea reconocido'); --yylloc.first_line;
                        /*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column);*/}
"/*"('*'|[^"*/"])*"*/"  { console.log('Comentario multilinea reconocido'); 
                        /*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column);*/}

/**************** Operadores Aritmeticos *************/

"++"                {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'INCREMENTO';}
"--"                {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'DECREMENTO';}
"+"                 {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'SUMA';}
"-"                 {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'RESTA';}
"*"                 {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'MULTIPLICACION';}
"/"                 {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'DIVISION';}
"^"                 {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'POTENCIA';}
"%"                 {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'MODULO';}

/**************** Operadores Relacionales *************/

"=="                {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'COMPARACION';}
"!="                {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'DIFERENTE';}
"<="                {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'MEN_EQ';}
">="                {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'MAY_EQ';}
">"                 {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'MAYOR';}
"<"                 {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'MENOR';}

/**************** Operadores Logicos *************/

"||"                {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'OR';}
"&&"                {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'AND';}
"!"                 {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'NOT';}

/**************** Simbolos *************/

"="                 {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'IGUAL';}
"?"                 {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'TERNARIO';}
":"                 {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'COLON';}
"("                 {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'PAR_IZQ';}
")"                 {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'PAR_DER';}
"["                 {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'COR_IZQ';}
"]"                 {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'COR_DER';}
"{"                 {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'LLAVE_IZQ';}
"}"                 {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'LLAVE_DER';}
","                 {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'COMMA';}
";"                 {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'SEMICOLON';}
"."                 {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'DOT';}

/**************** Palabras Reservadas *************/

"void"              {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'RVOID';}
"int"               {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'RINT';}
"double"            {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'RDOUBLE';}
"boolean"           {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'RBOOLEAN';}
"char"              {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'RCHAR';}
"string"            {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'RSTRING';}
"new"               {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'RNEW';}
"if"                {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'RIF';}
"else"              {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'RELSE';}
"print"             {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'RPRINT';}
"switch"            {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'RSWITCH';}
"case"              {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'RCASE';}
"default"           {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'RDEFAULT';}
"break"             {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'RBREAK';}
"continue"          {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'RCONTINUE';}
"return"            {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'RRETURN';}
"while"             {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'RWHILE';}
"for"               {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'RFOR';}
"do"                {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'RDO';}
"tolower"           {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'RTO_LOWER';}
"toupper"           {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'RTO_UPPER';}
"length"            {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'RLENGTH';}
"truncate"          {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'RTRUNCATE';}
"round"             {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'RROUND';}
"typeof"            {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'RTYPE_OF';}
"tostring"          {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'RTO_STRING';}
"tochararray"       {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'RTO_CHAR_ARRAY';}
"exec"              {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'REXEC';}
"list"              {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'RLIST';}

/**************** Expresiones Regulares *************/
[0-9]+"."[0-9]+   {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'DECIMAL';}
[0-9]+              {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'ENTERO';}
[\'\‘\’].[\'\’\‘]                           {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'CARACTER';}
"true"              {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'RTRUE';}
"false"             {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'RFALSE';}
[\"\“\”](([^\"\“\”\\])*([\\].)*)*[\"\“\”]          {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'CADENA'; }
[A-Za-z]([A-Za-z]|[0-9]|"_")* {/*console.log('Token: ' + yytext + ', linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column); */ return 'IDENTIFICADOR';}

<<EOF>>                 return 'EOF';

.                       { /*console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); */
                            errores.agregarError('lexico', 'Simbolo \'' + yytext + '\' no reconocido', yylloc.first_line, yylloc.first_column); }
/lex

/* Asociación de operadores y precedencia */

%left 'OR' 'AND'
%right 'NOT' 
%left 'COMPARACION' 'DIFERENTE' 'MENOR' 'MEN_EQ' 'MAYOR' 'MAY_EQ'
%left 'SUMA' 'RESTA'
%left 'MULTIPLICACION' 'DIVISION' 'MODULO'
%left 'POTENCIA'
%right 'INCREMENTO' 'DECREMENTO' casteo
%right UMENOS


%start ini

%% /* Definición de la gramática */

ini
    : sentencias EOF { return $1; }
    | EOF            { return []; }
;

sentencias
	: sentencias sentencia  { $1.push($2); $$ = $1; }
	| sentencia             { $$ = [$1]; }
;

sentencia
    : metodo              { $$ = $1; }
    | sent_exec SEMICOLON { $$ = $1; }
    | sentencia_local     { $$ = $1; }
    | error SEMICOLON
    { 
        console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); 
        errores.agregarError('sintáctico', 'Token inesperado \'' + yytext + '\'', this._$.first_line, this._$.first_column);
    }
;

sentencia_local
    : inicializacion SEMICOLON      { $$ = $1; }
    | unitarios SEMICOLON           { $$ = $1; }
    | llamada SEMICOLON
    | sent_if                       { $$ = $1; }
    | sent_switch                   { $$ = $1; }
    | sent_while                    { $$ = $1; }
    | sent_for                      { $$ = $1; }
    | sent_dowhile                  { $$ = $1; }
    | sent_print SEMICOLON          { $$ = $1; }
;

inicializacion
    : declaracion       { $$ = $1; }
    | asignacion        { $$ = $1; }
;

declaracion 
    : tipo IDENTIFICADOR { $$ = new declaracion($1, $2); }
    | tipo IDENTIFICADOR IGUAL expresion { $$ = new declaracion($1, $2); $$.setValor($4); }
;

tipo
    : RINT      { $$ = tipo.INT; }
    | RDOUBLE   { $$ = tipo.DOUBLE; }
    | RCHAR     { $$ = tipo.CHAR; }
    | RBOOLEAN  { $$ = tipo.BOOLEAN; }
    | RSTRING   { $$ = tipo.STRING; }
;

asignacion 
    : IDENTIFICADOR IGUAL expresion     { $$ = new asignacion($1, $3); }
;

expresion
    : expresion OR expresion                { $$ = new operador(operacion.OR,$1,$3,this._$.first_line, this._$.first_column); }
    | expresion AND expresion               { $$ = new operador(operacion.AND,$1,$3,this._$.first_line, this._$.first_column); }
    | NOT expresion                         { $$ = new operador(operacion.NOT,$2,null,this._$.first_line, this._$.first_column); }
    | expresion COMPARACION expresion       { $$ = new operador(operacion.COMPARACION,$1,$3,this._$.first_line, this._$.first_column); }
    | expresion DIFERENTE expresion         { $$ = new operador(operacion.DIFERENTE,$1,$3,this._$.first_line, this._$.first_column); }
    | expresion MENOR expresion             { $$ = new operador(operacion.MENOR,$1,$3,this._$.first_line, this._$.first_column); }
    | expresion MEN_EQ expresion            { $$ = new operador(operacion.MENORIGUAL,$1,$3,this._$.first_line, this._$.first_column); }
    | expresion MAYOR expresion             { $$ = new operador(operacion.MAYOR,$1,$3,this._$.first_line, this._$.first_column); }
    | expresion MAY_EQ expresion            { $$ = new operador(operacion.MAYORIGUAL,$1,$3,this._$.first_line, this._$.first_column); }
    | expresion SUMA expresion              { $$ = new operador(operacion.SUMA,$1,$3,this._$.first_line, this._$.first_column); }
    | expresion RESTA expresion             { $$ = new operador(operacion.RESTA,$1,$3,this._$.first_line, this._$.first_column); }
    | expresion MULTIPLICACION expresion    { $$ = new operador(operacion.MULTIPLICACION,$1,$3,this._$.first_line, this._$.first_column); }
    | expresion DIVISION expresion          { $$ = new operador(operacion.DIVISION,$1,$3,this._$.first_line, this._$.first_column); }
    | expresion MODULO expresion            { $$ = new operador(operacion.MODULO,$1,$3,this._$.first_line, this._$.first_column); }
    | expresion POTENCIA expresion          { $$ = new operador(operacion.POTENCIA,$1,$3,this._$.first_line, this._$.first_column); }
    | RESTA expresion %prec UMENOS          { $$ = new operador(operacion.NEGACION,$2,null,this._$.first_line, this._$.first_column); }            
    | PAR_IZQ expresion PAR_DER             { $$ = $2; }
    | casteo expresion
    | unitarios                             { $$ = $1; }
    | llamada
    | sent_nativas
    | ENTERO                                { $$ = new primitivo(tipo.INT, $1);}
    | DECIMAL                               { $$ = new primitivo(tipo.DOUBLE, $1); }
    | CADENA                                { $$ = new primitivo(tipo.STRING, $1); }
    | CARACTER                              { $$ = new primitivo(tipo.CHAR, $1); }
    | IDENTIFICADOR                         { $$ = new id($1); }
    | RTRUE                                 { $$ = new primitivo(tipo.BOOLEAN, $1); }
    | RFALSE                                { $$ = new primitivo(tipo.BOOLEAN, $1); }
;

unitarios
    : expresion INCREMENTO  { $$ = new operador(operacion.INCREMENTO,$1,null,this._$.first_line, this._$.first_column); }
    | expresion DECREMENTO  { $$ = new operador(operacion.DECREMENTO,$1,null,this._$.first_line, this._$.first_column); }
;

casteo
    : PAR_IZQ tipo PAR_DER 
;

/*sent_if
    : RIF PAR_IZQ expresion PAR_DER bloque_instrucciones
    | RIF PAR_IZQ expresion PAR_DER bloque_instrucciones RELSE bloque_instrucciones
    | RIF PAR_IZQ expresion PAR_DER bloque_instrucciones RELSE sent_if
;*/

sent_if
    : list_if RELSE bloque_instrucciones    { $1.agregarElse($3); }
    | list_if                               { $$ = $1; }
;

list_if 
    : list_if RELSE RIF PAR_IZQ expresion PAR_DER bloque_instrucciones  { $1.agregarElseIf($5,$7,@5.first_line, @5.first_column); $$ = $1; }
    | RIF PAR_IZQ expresion PAR_DER bloque_instrucciones                { $$ = new _if([$3],[$5],this._$.first_line, this._$.first_column); }             
;

bloque_instrucciones
    : LLAVE_IZQ instrucciones LLAVE_DER     { $$ = $2; }
    | LLAVE_IZQ LLAVE_DER                   { $$ = []; }
;

sent_switch
    : RSWITCH PAR_IZQ expresion PAR_DER LLAVE_IZQ cases_list default LLAVE_DER  { $$ = new _switch($3); $$.setCases($6[0].cond,$6[1].inst); $$.setDefault($7); }
    | RSWITCH PAR_IZQ expresion PAR_DER LLAVE_IZQ cases_list LLAVE_DER          { $$ = new _switch($3); $$.setCases($6[0].cond,$6[1].inst); }
    | RSWITCH PAR_IZQ expresion PAR_DER LLAVE_IZQ default LLAVE_DER             { $$ = new _switch($3); $$.setDefault($6); }
;

cases_list
    : cases_list RCASE expresion COLON instrucciones    { $1[0].cond.push($3); $1[1].inst.push($5); $$ = $1; }
    | RCASE expresion COLON instrucciones               { $$ = [{cond:[$2]},{inst:[$4]}]; }
;

default
    : RDEFAULT COLON instrucciones  { $$ = $3; }
;

instrucciones
    : instrucciones instruccion     { $1.push($2); $$ = $1; }
    | instruccion                   { $$ = [$1]; }
;

instruccion 
    : RBREAK SEMICOLON              { $$ = new _break(@1.first_line, @1.first_column); }
    | RCONTINUE SEMICOLON           { $$ = new _continue(@1.first_line, @1.first_column); }
    | RRETURN SEMICOLON             {  }
    | RRETURN expresion SEMICOLON   {  }
    | sentencia_local               { $$ = $1; }
;

sent_while
    : RWHILE PAR_IZQ expresion PAR_DER bloque_instrucciones     
    { 
        $$ = new _while($3,$5,@1.first_line,@1.first_column); 
    }
;

sent_for
    : RFOR PAR_IZQ inicializacion SEMICOLON expresion SEMICOLON expresion PAR_DER bloque_instrucciones
    {
        $$ = new _for($3, $5, $7, $9, @1.first_line, @1.first_column);
    }
;

sent_dowhile
    : RDO bloque_instrucciones RWHILE PAR_IZQ expresion PAR_DER SEMICOLON
    {
        $$ = new _doWhile($5,$2,@1.first_line,@1.first_column);
    }
;

metodo
    : RVOID IDENTIFICADOR PAR_IZQ parametros PAR_DER bloque_instrucciones
    | RVOID IDENTIFICADOR PAR_IZQ PAR_DER bloque_instrucciones
;

parametros
    : parametros COMMA tipo IDENTIFICADOR
    | tipo IDENTIFICADOR
;

llamada
    : IDENTIFICADOR PAR_IZQ params_llamada PAR_DER
    | IDENTIFICADOR PAR_IZQ PAR_DER
;

params_llamada
    : params_llamada COMMA expresion
    | expresion
;

sent_print
    : RPRINT PAR_IZQ expresion PAR_DER { $$ = new print($3); }
;

sent_nativas
    : funcion PAR_IZQ expresion PAR_DER
;

funcion 
    : RTO_LOWER 
    {

    }
    | RTO_UPPER 
    {

    }
    | RLENGTH
    {

    }
    | RTRUNCATE 
    {

    }
    | RROUND 
    {

    }
    | RTYPE_OF 
    {

    }
    | RTO_STRING
    {

    }
    | RTO_CHAR_ARRAY
    {

    }
;

sent_exec
    : REXEC IDENTIFICADOR PAR_IZQ PAR_DER
    {

    }
    | REXEC IDENTIFICADOR PAR_IZQ list_val PAR_DER
    {

    }
;

list_val
    : list_val COMMA expresion 
    {
        /*** GRAFICA **
        raiz = new Nodo("List_val","");
        raiz.agregarHijo($1);
        raiz.agregarHijo(new Nodo(",", "coma"));
        raiz.agregarHijo($3);
            */
        
    }
    | expresion 
    {
        /*var aux = new Nodo("List_val","");
        raiz.agregarHijo($1);*/


    }
;