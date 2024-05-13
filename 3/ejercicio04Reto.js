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

    if(document.getElementById("box1").value == null || document.getElementById("box1").value == '' || document.getElementById("box2").value == null || document.getElementById("box2").value == '' || document.getElementById("box3").value == null || document.getElementById("box3").value == ''){
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
        proveedor : $("#prov").val(),
        precio : $("#prec").val()       
    };
    objetoSerializado = serializa(objeto);                                                 
    objetoDeserializado = deserializa(objetoSerializado);
    //ArrObjetos.push(objetoDeserializado);

    enviaInfo(JSON.stringify(objeto));
    
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