class Display{
    constructor(){
        this.display = [];

        if (typeof Display._instance === "object"){
            return Display._instance;
        }
        Display._instance = this;
        return this;
    }

    static getInstance() {
        return this._instance;
    }

    agregar(texto){
        this.display.push(texto);
    }

    getUltimo(){
        if (this.display.length > 0)
            return this.display[this.display.length - 1];
        return '';
    }

    getFuncion(){
        for(let i = this.display.length - 1; i > -1; i--){
            if (this.display[i] === 'funcion' || this.display[i] === 'metodo')
                return true;
        }
        return false;
    }

    deleteUltimo(){
        this.display.pop();
    }

    limpiar(){
        this.display = [];
    }
}

const display = new Display();
module.exports = display;