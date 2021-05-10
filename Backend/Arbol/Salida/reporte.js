class Reporte{
    constructor(){
        this.rError = '<table class=\"table\"><thead class="thead-dark"><tr><th scope="col">No.</th>'
                    + '<th scope="col">Tipo de Error</th><th scope="col">Descripcion</th>'
                    + '<th scope="col">Linea</th><th scope="col">Columna</th></tr>';
        this.rSimbolo = '<table class=\"table\"><thead class="thead-dark"><tr><th scope="col">Identificador</th>'
                    + '<th scope="col">Tipo</th><th scope="col">Tipo</th>'
                    + '<th scope="col">Entorno</th><th scope="col">Linea</th><th scope="col">Columna</th></tr></thead><tbody>';

        if (typeof Reporte._instance === "object"){
            return Reporte._instance;
        }
        Reporte._instance = this;
        return this;
    }

    static getInstance() {
        return this._instance;
    }

    agregarError(texto){
        this.rError += texto;
    }

    agregarSimbolo(texto){
        this.rSimbolo += texto;
    }

    finError(){
        this.rError += '</tbody></table>';
    }

    finSimbolo(){
        this.rSimbolo += '</tbody></table>';
    }

    getError(){
        return this.rError;
    }

    getSimbolo(){
        return this.rSimbolo;
    }

    limpiar(){
        this.rError = '<table class=\"table\"><thead class="thead-dark"><tr><th scope="col">No.</th>'
                    + '<th scope="col">Tipo de Error</th><th scope="col">Descripcion</th>'
                    + '<th scope="col">Linea</th><th scope="col">Columna</th></tr>';
        this.rSimbolo = '<table class=\"table\"><thead class="thead-dark"><tr><th scope="col">Identificador</th>'
                    + '<th scope="col">Tipo</th><th scope="col">Tipo</th>'
                    + '<th scope="col">Entorno</th><th scope="col">Linea</th><th scope="col">Columna</th></tr></thead><tbody>';
    }
}

const reportes = new Reporte();
module.exports = reportes;