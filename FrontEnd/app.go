package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"html/template"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"os/exec"
	"time"
)

func generarGrafoPython(dot string) {
	/*cmd := exec.Command("dot", "-Tpdf", "-o"+outFile)

	stdin, err := cmd.StdinPipe()
	if err != nil {
		log.Fatal(err)
	}

	if err := cmd.Start(); err != nil {
		log.Fatal(err)
	}

	stdin.Write([]byte(dot))
	stdin.Close()

	fmt.Println("Generando grafo...")
	cmd.Wait()*/
	path := "python.dot"
	sDec := []byte(dot) // Aca se envia variable dot
	if err := ioutil.WriteFile(path, sDec, 0644); err != nil {
		log.Panic(err)
	}

	cmd, err := exec.Command("/bin/sh", "executeDotPython.sh").Output()
	if err != nil {
		fmt.Printf("error %s", err)
	}
	output := string(cmd)
	fmt.Printf(output)

	e := os.Rename("./astPython.png", "./images/astPython.png")
	if e != nil {
		log.Fatal(e)
	}
}

func generarGrafoJavaScript(dot string) {
	path := "javascript.dot"
	sDec := []byte(dot)
	if err := ioutil.WriteFile(path, sDec, 0644); err != nil {
		log.Panic(err)
	}

	cmd, err := exec.Command("/bin/sh", "executeDotJavascript.sh").Output()
	if err != nil {
		fmt.Printf("error %s", err)
	}
	output := string(cmd)
	fmt.Printf(output)

	e := os.Rename("./astJavascript.png", "./images/astJavascript.png")
	if e != nil {
		log.Fatal(e)
	}
}

func analizarPython(w http.ResponseWriter, r *http.Request) {

	pythonip, defip := os.LookupEnv("PYTHONIP")
	pythonport, defport := os.LookupEnv("PYTHONPORT")

	if !defip {
		pythonip = "182.18.7.7"
	}

	if !defport {
		pythonport = "7000"
	}

	url := "http://" + pythonip + ":" + pythonport + "/analizar"

	log.Printf(url)

	//Enviamos una peticion GET a nodejs
	r.ParseMultipartForm(0)
	message := r.FormValue("message")
	fmt.Println("----------------------------------")
	fmt.Println("Message from Client: ", message)

	requestBody, err := json.Marshal(map[string]string{
		"texto": message,
	})

	if !(err == nil) {
		log.Fatalln(err)
	}

	resp, err := http.Post("http://182.18.7.7:7000/analizar", "application/json", bytes.NewBuffer(requestBody))

	if !(err == nil) {
		log.Fatalln(err)
	}

	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if !(err == nil) {
		log.Fatalln(err)
	}

	fmt.Println("Message from Python Server: ", string(body))

	// Conversion a json
	var raw map[string]interface{}
	if err := json.Unmarshal([]byte(string(body)), &raw); err != nil {
		panic(err)
	}
	out, _ := json.Marshal(raw)
	println(string(out))

	// Generar grafo
	generarGrafoPython("")
	// Generar reportes
	// Almacenar en archivos los resultados
	// respond to client's request
	fmt.Fprintf(w, "ServerPython: %s \n", string(body)+" | "+time.Now().Format(time.RFC3339))
}

func index(w http.ResponseWriter, r *http.Request) {
	t := template.Must(template.ParseFiles("index.html"))
	t.Execute(w, "")
}

func main() {
	ip, defip := os.LookupEnv("GOIP")
	port, defport := os.LookupEnv("GOPORT")

	if !defip {
		ip = "182.18.7.9"
	}

	if !defport {
		port = "8000"
	}

	http.Handle("/codemirror/", http.StripPrefix("/codemirror/", http.FileServer(http.Dir("codemirror/"))))
	http.Handle("/css/", http.StripPrefix("/css/", http.FileServer(http.Dir("css/"))))
	http.Handle("/js/", http.StripPrefix("/js/", http.FileServer(http.Dir("js/"))))
	http.Handle("/images/", http.StripPrefix("/images/", http.FileServer(http.Dir("images/"))))
	http.HandleFunc("/", index)
	http.HandleFunc("/python", analizarPython)
	http.ListenAndServe(":"+port, nil)
	fmt.Println("Escuchando por IP:" + ip + " PORT:" + port)
}
