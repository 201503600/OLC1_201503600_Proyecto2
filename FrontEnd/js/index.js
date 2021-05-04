var contador = 0;
function get_cont() {
    return contador++;
}

var vent_focus = "pestana1";
function get_vent() {
    return vent_focus;
}

function set_vent(vent) {
    vent_focus = vent;
}

var lista = new Array();
function linkedlist(pestana, nombre) {
    var obj = new Object();
    obj.pestana = pestana;
    obj.nombre = nombre;
    lista.push(obj);
}

function deletepes(pestana) {
    for (var i = 0; i < lista.length; i++) {
        if (lista[i].pestana == pestana) {
            delete lista[i];
        }
    }
}

function changeFuncMenu() {
    document.getElementById("fileInput").style.display = "none";
    var selectBox = document.getElementById("selectMenu");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    if (selectedValue == "open") {
        document.getElementById("fileInput").style.display = "inline";
    } else if (selectedValue == "new") {
        agregar();
    } else if (selectedValue == "save") {
        saveFile();
    } else if (selectedValue == "saveAs") {
        saveFile();
    }
    selectBox.selectedIndex = 0;
}

function changeFuncDownload() {
    var selectBox = document.getElementById("selectDownload");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    if (selectedValue == "both") {
        alert(selectedValue);
    } else if (selectedValue == "js") {
        alert(selectedValue);
    } else if (selectedValue == "py") {
        alert(selectedValue);
    }
    selectBox.selectedIndex = 0;
}

function viewReport() {
    var selectBox = document.getElementById("selectReport");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    if (selectedValue == "tokens") {
        window.open('tokens.html')
    } else if (selectedValue == "errores") {
        window.open('errores.html')
    } else if (selectedValue == "grafopy") {
        var contenedor = document.getElementById("grafo");
        contenedor.innerHTML = `<h4>Grafo de python</h4><br><img src="images/astPython.png" style="vertical-align:middle;margin:0px 50px">`;
    } else if (selectedValue == "grafojs") {
        window.open('javascript.pdf')
    }
    selectBox.selectedIndex = 0;
}

function sendText() {
    //console.log(document.getElementById(get_vent()).value);
    //window.locationf="localhost:8000/?key=" + get_vent();
    const formdata = new FormData()
    formdata.append("message", document.getElementById(get_vent()).value);
    fetch("../python", {
        method: "POST",
        body: formdata,
    }).then(
        response => response.text()
    ).then(
        (data) => { console.log(data); document.getElementById("txtPython").value = data }
    ).catch(
        error => console.error(error)
    )
}


/*--------------------------------------Funcion Al Cambiar Ventana---------------------------------------*/
function index(pestanias, pestania) {
    var id = pestania.replace('pestana', '');
    set_vent('textarea' + id);

    var pestanna1 = document.getElementById(pestania);
    var listaPestannas = document.getElementById(pestanias);
    var cpestanna = document.getElementById('c' + pestania);
    var listacPestannas = document.getElementById('contenido' + pestanias);

    var i = 0;
    while (typeof listacPestannas.getElementsByTagName('div')[i] != 'undefined') {
        $(document).ready(function () {
            $(listacPestannas.getElementsByTagName('div')[i]).css('display', 'none');
            $(listaPestannas.getElementsByTagName('li')[i]).css('background', '');
            $(listaPestannas.getElementsByTagName('li')[i]).css('padding-bottom', '');
        });
        i += 1;
    }

    $(document).ready(function () {
        $(cpestanna).css('display', '');
        $(pestanna1).css('background', 'dimgray');
        $(pestanna1).css('padding-bottom', '2px');
    });

    try {
        var act = document.getElementById('cpestana' + id);
        var tact = document.getElementById('textarea' + id);

        while (act.firstChild) {
            act.removeChild(act.firstChild);
        }

        act.appendChild(tact);
        var editor = CodeMirror(act, {
            lineNumbers: true,
            value: tact.value,
            matchBrackets: true,
            styleActiveLine: true,
            theme: "midnight",
            mode: "text/x-java"
        }).on('change', editor => {
            tact.value = editor.getValue();
        });
    } catch (error) { }
}

/*---------------------------------------Funcion Agregar Pestania----------------------------------------*/
function agregar() {
    var x = get_cont();
    var lu = document.getElementById("lista");
    var li = document.createElement("li");
    li.setAttribute('id', 'pestana' + x);
    var a = document.createElement("a");
    a.setAttribute('id', 'a' + x);
    a.setAttribute('href', 'javascript:index("pestanas","pestana' + x + '")');
    a.text = 'Nueva Pestaña';
    li.appendChild(a);
    lu.appendChild(li);
    index("pestanas", "pestana" + x);

    var contenido = document.getElementById("contenidopestanas");
    var divp = document.createElement("div");
    divp.setAttribute('id', 'cpestana' + x);
    var ta = document.createElement("textarea");
    ta.setAttribute('id', 'textarea' + x);
    ta.setAttribute('name', 'textarea' + x);
    ta.setAttribute('class', 'ta');
    ta.setAttribute('style', 'display:none');
    ta.cols = 60;
    ta.rows = 30;
    divp.appendChild(ta);
    contenido.appendChild(divp);

    var act = document.getElementById('cpestana' + x);
    var tact = document.getElementById('textarea' + x);
    var editor = CodeMirror(act, {
        lineNumbers: true,
        value: tact.value,
        matchBrackets: true,
        styleActiveLine: true,
        theme: "midnight",
        mode: "text/x-java"
    }).on('change', editor => {
        tact.value = editor.getValue();
    });
    return 'pestana' + x;
}

function quitar() {
    try {
        var lu = document.getElementById("lista");
        lu.removeChild(document.getElementById(get_vent().replace("textarea", "pestana")));
        var contenido = document.getElementById("contenidopestanas");
        contenido.removeChild(document.getElementById(get_vent().replace("textarea", "cpestana")));
        deletepes(get_vent());
    } catch (error) { }
}


/*-----------------------------------------------File---------------------------------------------------*/
function AbrirArchivo(files) {
    var file = files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        var id = agregar();
        index("pestanas", id);
        var act = document.getElementById(get_vent().replace("textarea", "cpestana"));
        var tact = document.getElementById(get_vent());
        tact.value = e.target.result;

        while (act.firstChild) {
            act.removeChild(act.firstChild);
        }

        act.appendChild(tact);
        var editor = CodeMirror(act, {
            lineNumbers: true,
            value: tact.value,
            matchBrackets: true,
            styleActiveLine: true,
            theme: "midnight",
            mode: "text/x-java"
        }).on('change', editor => {
            tact.value = editor.getValue();
        });

        var a = document.getElementById(get_vent().replace("textarea", "a"));
        a.text = file.name;
        console.log(a.text);
        linkedlist(get_vent(), file.name);
    };
    reader.readAsText(file);
    file.clear;

    var file_input = document.getElementById("fileInput");
    document.getElementById('fileInput').value = "";
    document.getElementById("fileInput").style.display = "none";
}

function saveFile() {
    var ta = document.getElementById(get_vent());
    var contenido = ta.value;//texto de vent actual

    //formato para guardar el archivo
    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth() + 1;
    var yyyy = hoy.getFullYear();
    var HH = hoy.getHours();
    var MM = hoy.getMinutes();
    var formato = get_vent().replace("textarea", "") + "_" + dd + "_" + mm + "_" + yyyy + "_" + HH + "_" + MM;

    var nombre = "Archivo" + formato + ".java";//nombre del archivo
    var file = new Blob([contenido], { type: 'text/plain' });

    if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(file, nombre);
    } else {
        var a = document.createElement("a"), url = URL.createObjectURL(file);
        a.href = url;
        a.download = nombre;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}