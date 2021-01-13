document.addEventListener('DOMContentLoaded', function(){

    "use strict";

    const url = 'https://web-unicen.herokuapp.com/api/groups/101/cervezas';
    let formularioVacio = document.getElementById("js-formularioVacio");
    let tabla = document.getElementById("cuerpo-tabla");
    let formularioEdicion = document.getElementById("formularioEdicion");
    let botonEnviarEdicion = document.getElementById("botonEnviarEdicion");
    let botonFiltrar = document.getElementById("js-boton-filtrar").addEventListener("click", filtrar);
    let botonAgregar = document.getElementById("js-botonAgregar").addEventListener("click", agregarCerveza);
    let botonAgregar3 = document.getElementById("js-botonAgregar3").addEventListener("click", () => {
        for (let i = 0; i < 3; i++) {
            agregarCerveza();
        }
    });


    async function agregarCerveza() {

        let nombre = document.getElementById("nombre");
        let ibu = document.getElementById("ibu");
        let srm = document.getElementById("srm");
        let alc = document.getElementById("alc");
        let form = document.getElementById("formularioProd");

        let cervezas = {
            "thing": {
                "nombre": nombre.value,
                "ibu": ibu.value,
                "srm": srm.value,
                "gradAlc": alc.value,
            }
        };

        if ((nombre.value=="") || (ibu.value=="") || (srm.value=="") || (alc.value=="")) {
            formularioVacio.innerHTML = "Campo de formulario vacio";
            tabla.innerHTML = "loading...";
            imprimirPrecargado();  
        } else {
            formularioVacio.innerHTML = "";
            try{
            let respuesta = await fetch(url,
            {
                "method": "POST",
                "headers": { "Content-Type": "application/json" },
                "body": JSON.stringify(cervezas)
            });
            if (respuesta.ok) {
                let json = await respuesta.json();
                cargarFila(json.information.thing.nombre, json.information.thing.ibu,
                            json.information.thing.srm, json.information.thing.gradAlc,json.information._id );            
            }
            form.reset();
            }
            catch(e){
                console.log(e);
            }
        }
        
    };

    function cargarFila(nombre, ibu, srm, alc, id) {

        let fila = document.createElement ("tr");
        let celdaB = document.createElement("td");
            
        let name = document.createTextNode(nombre);
        let celdaname = document.createElement("td");
        celdaname.appendChild(name);
        fila.appendChild(celdaname);

        let ibbu = document.createTextNode(ibu);
        let celdaibbu = document.createElement("td");
        celdaibbu.appendChild(ibbu);
        fila.appendChild(celdaibbu);

        let srrm = document.createTextNode(srm);
        let celdasrrm = document.createElement("td");
        celdasrrm.appendChild(srrm);
        fila.appendChild(celdasrrm);

        let alch = document.createTextNode(alc + " %") ;
        let celdaalch = document.createElement("td");
        celdaalch.appendChild(alch);
        fila.appendChild(celdaalch);

        let ButtonD = document.createElement("button");
        ButtonD.classList.add("Borrar");
        ButtonD.dataset.ident=id;
        ButtonD.innerHTML = "X";
        ButtonD.addEventListener("click", ()=>{borrar(id)} );
        celdaB.appendChild(ButtonD);
    
        let ButtonE = document.createElement("button");
        ButtonE.classList.add("editar");
        ButtonE.dataset.ident=id;
        ButtonE.innerHTML = "E";
        ButtonE.addEventListener("click", ()=>{habilitarFomularioEdicion(id)} );
        celdaB.appendChild(ButtonE);

        fila.appendChild(celdaB);

        tabla.appendChild(fila);
    }

    async function borrar (id){
        try{
            let respuesta = await fetch(url +"/"+ id ,
            {
                "method": "DELETE"
            });
            tabla.innerHTML= "";
            imprimirPrecargado();  
        }
        catch(e){
            console.log(e);
        }
    };

    async function filtrar () {
        let filtroSelect = document.getElementById("filtro");
        tabla.innerHTML = "";
        try{    
            let respuesta = await fetch(url);
            let json = await respuesta.json();
            for ( const elem of json.cervezas){
                if ((filtroSelect.value == "bajo") && (elem.thing.ibu >= 1) && (elem.thing.ibu <= 30) ) {
                    cargarFila(elem.thing.nombre, elem.thing.ibu, elem.thing.srm, elem.thing.gradAlc, elem._id);
                }
                if ((filtroSelect.value == "medio") && (elem.thing.ibu >= 31) && (elem.thing.ibu <= 59) ) {
                    cargarFila(elem.thing.nombre, elem.thing.ibu, elem.thing.srm, elem.thing.gradAlc, elem._id);
                }
                if ((filtroSelect.value == "alto") && (elem.thing.ibu >= 60) && (elem.thing.ibu <= 100) ) {
                    cargarFila(elem.thing.nombre, elem.thing.ibu, elem.thing.srm, elem.thing.gradAlc, elem._id);
                }
                if (filtroSelect.value == "todo") {
                    cargarFila(elem.thing.nombre, elem.thing.ibu, elem.thing.srm, elem.thing.gradAlc, elem._id);
                }
            } 
        }
        catch(e){
            console.log(e);
        }
    };
    
    function habilitarFomularioEdicion (id) {
        
        formularioEdicion.classList.remove("oculto");
        formularioEdicion.classList.add("visible");
        botonEnviarEdicion.addEventListener("click",()=>editarFila(id));
        botonEnviarEdicion.removeEventListener("click",()=>editarFila(id));
    }

    async function editarFila (id) {

        let nombre = document.getElementById("nombreEditado");
        let ibu = document.getElementById("ibuEditado");
        let srm = document.getElementById("srmEditado");
        let alc = document.getElementById("alcEditado");
        
        let cervezas={
            
            "thing": {
                "nombre": nombre.value,
                "ibu": ibu.value,
                "srm": srm.value,
                "gradAlc": alc.value
            }
        }

        try{
            let respuesta = await fetch(url + "/" + id,
            {
                "method":"PUT",
                "headers": { "Content-Type": "application/json" },
                "body": JSON.stringify(cervezas)
            });
            if (respuesta.ok) {
                let json = await respuesta.json();
                tabla.innerHTML= "";
                imprimirPrecargado();           
            } 
            formularioEdicion.classList.add("oculto");
            formularioEdicion.classList.remove("visible");
        } catch(e){
            console.log(e);
        }
    };

    async function imprimirPrecargado() {

        tabla.innerHTML = "loading...";
        try{    
            let respuesta = await fetch(url);
            let json = await respuesta.json();
            tabla.innerHTML = "";
            for ( const elem of json.cervezas){
                cargarFila(elem.thing.nombre, elem.thing.ibu, elem.thing.srm, elem.thing.gradAlc, elem._id);
            } 
        }
        catch(e){
            console.log(e);
        }
    };

    
    imprimirPrecargado();

});