/**
 * Segundo Proyecto OLC1 - Edgar Cil - 201503600
 */

/* Definición Léxica */
%lex

%options case-insensitive

%%
/* Comentarios */
"//"(.*)                { console.log('Comentario de una linea reconocido'); }
(\/\*(\s*|.*?)*\*\/)    { console.log('Comentario multilinea reconocido'); }

/* Palabras reservadas */

"void"              return 'RVOID';
"int"               return 'RINT';
"double"            return 'RDOUBLE';
"boolean"           return 'RBOOLEAN';
"char"              return 'RCHAR';
"string"            return 'RSTRING';
"new"               return 'RNEW';
"if"                return 'RIF';
"else"              return 'RELSE';
"print"             return 'RPRINT';
"switch"            return 'RSWITCH';
"case"              return 'RCASE';
"default"           return 'RDEFAULT';
"break"             return 'RBREAK';
"continue"          return 'RCONTINUE';
"return"            return 'RRETURN';
"while"             return 'RWHILE';
"for"               return 'RFOR';
"do"                return 'RDO';
"tolower"           return 'RTO_LOWER';
"toupper"           return 'RTO_UPPER';
"length"            return 'RLENGTH';
"truncate"          return 'RTRUNCATE';
"round"             return 'RROUND';
"typeof"            return 'RTYPE_OF';
"tostring"          return 'RTO_STRING';
"tochararray"       return 'RTO_CHAR_ARRAY';
"exec"              return 'REXEC';

/* Cadenas */
["](.*)["]          { console.log(yytext); return 'SS'; }

/* Operadores aritmeticos */

"++"                return 'INCREMENTO';
"--"                return 'DECREMENTO';
"+"                 return 'SUMA';
"-"                 return 'RESTA';
"*"                 return 'MULTIPLICACION';
"/"                 return 'DIVISION';
"^"                 return 'POTENCIA';
"%"                 return 'MODULO';

/* Operadores relacionales */

"=="                return 'IGUALACION';
"!="                return 'DIFERENTE';
"<"                 return 'MENOR';
"<="                return 'MEN_EQ';
">"                 return 'MAYOR';
">="                return 'MAY_EQ';

/* Operadores Logicos */

"||"                return 'OR';
"&&"                return 'AND';
"!"                 return 'NOT';

/* Simbolos */

"?"                 return 'TERNARIO';
":"                 return 'COLON';
","                 return 'COMMA';
"."                 return 'DOT';
";"                 return 'SEMICOLON';
"="                 return 'IGUAL';
"("                 return 'PAR_IZQ';
")"                 return 'PAR_DER';
"{"                 return 'LLAVE_IZQ';
"}"                 return 'LLAVE_DER';
"["                 return 'COR_IZQ';
"]"                 return 'COR_DER';

/* Espacios en blanco */
[ \r\t]+                {}
\n                      {}

[A-Za-z]([A-Za-z]|[0-9]|"_")* return 'IDENTIFICADOR';
[0-9]+("."[0-9]+)   return 'DECIMAL';
[0-9]+              return 'ENTERO';

<<EOF>>                 {};

.                       { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }
/lex

/* Asociación de operadores y precedencia */

%left 'MAS' 'MENOS'
%left 'POR' 'DIVIDIDO'
%left UMENOS

%start ini

%% /* Definición de la gramática */

ini
	: instrucciones EOF
    | SS
;

instrucciones
	: instruccion instrucciones
	| instruccion
	| error { console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); }
;

instruccion
	: REVALUAR CORIZQ expresion CORDER PTCOMA {
		console.log('El valor de la expresión es: ' + $3);
	}
;

expresion
	: MENOS expresion %prec UMENOS  { $$ = $2 *-1; }
	| expresion MAS expresion       { $$ = $1 + $3; }
	| expresion MENOS expresion     { $$ = $1 - $3; }
	| expresion POR expresion       { $$ = $1 * $3; }
	| expresion DIVIDIDO expresion  { $$ = $1 / $3; }
	| ENTERO                        { $$ = Number($1); }
	| DECIMAL                       { $$ = Number($1); }
	| PARIZQ expresion PARDER       { $$ = $2; }
;