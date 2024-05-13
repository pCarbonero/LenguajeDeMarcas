function ejercicio(){
    if(compruebaCasillas() == true){
        creaObjeto();
    } 
    else{
       alert('Rellena todas las casillas');
    }  
}

function compruebaCasillas(){
    let sePuede = Boolean(true)

    if(document.getElementById("pk").value == null || document.getElementById("pk").value == '' || document.getElementById("desc").value == null || document.getElementById("desc").value == '' || document.getElementById("prov").value == null || document.getElementById("prov").value == '' || document.getElementById("prec").value == null || document.getElementById("prec").value == ''){
        sePuede = false
    }
    
    return sePuede
}

function creaObjeto(){
    let objetoSerializado
    let objetoDeserializado

    objeto = {
        id : $("#pk").val(),
        descripcion : $("#desc").val(),
        idproveedor : $("#prov").val(),
        precio : $("#prec").val()       
    };
    /*objetoSerializado = serializa(objeto);                                                 
    objetoDeserializado = deserializa(objetoSerializado);*/
    //ArrObjetos.push(objetoDeserializado);
    console.log(objeto);
    enviaInfo(JSON.stringify(objeto));
    solicitud();
   // solicitud();
}

function enviaInfo(objeto){

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://lm.iesnervion.es/reto4.php");
    xhr.responseType="json";

// Preparamos a continuación la respuesta
    xhr.onload = function() {
        if (xhr.readyState == 4 && xhr.status == 201) { // 200 || 201
            console.log(xhr.response);
        } else {
            console.log("Error: ${xhr.status}");
        }
    };
    xhr.send(objeto);
}

function solicitud(){
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://lm.iesnervion.es/reto4.php");
    xhr.responseType = "json"; 


    xhr.onload = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = xhr.response;
            console.log(data);
        } else {
            console.log("Error: ${xhr.status}");
        }
    };
    xhr.send();
}