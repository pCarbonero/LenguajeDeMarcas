let valorLLave;
function ejercicio(){
    let nombre = $("#nombre").val();
    let apellidos = $("#apellidos").val();
    let password = $("#password").val();
    if(compruebaCasillas(nombre, apellidos, password)){
        
        if(compruebaPassword(password)){
            $("#llave").show();
            creaObjeto();
        }
        else{
            alert('La contraseña es incorrecta');
        }
    }
    else{
        alert('Rellena todas las casillas');
    }
}

function compruebaCasillas(nombre, apellidos, password){
    let correcto = Boolean(true);

    if (nombre == null || nombre == '' || apellidos == null || apellidos == '' || password == null || password == ''){
        correcto = false;
    }
    return correcto;
}

function compruebaPassword(password){
    let correcto = Boolean(true);
    if(password != '1Q2W3E'){
        correcto = false;
    }
    return correcto;
}

function creaObjeto(){
    let usuario
    let usuarioSerializado;
    usuario = {
        nombre : $("#nombre").val(),
        apellidos : $("#apellidos").val(),
        password : $("#password").val(),
        llave : valorLLave
    }
  //  solicitud();
    usuarioSerializado = serializaObjeto(usuario);
    console.log(usuarioSerializado);
    enviaInfo(usuarioSerializado);
}

function serializaObjeto(usuario){
    let serializado = JSON.stringify(usuario);
    return serializado
}

function muestraInstrucciones(texto){
    $('#instrucciones').append('<li>' + texto + '</li>');
}

function creaDiv(texto){
    $('#llave2').append(texto);
}

function pulsa(btn){
    valorLLave += btn.value
    console.log($('llave').val);
}


function enviaInfo(usuario){

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://lm.iesnervion.es/secret.php");
    xhr.responseType="json";

    xhr.onload = function() {
        if (xhr.readyState == 4 && xhr.status == 201) { // 200 || 201
            console.log(xhr.response);
        } else {
            console.log(xhr.response);
            muestraInstrucciones(xhr.response.instrucciones[0]);    
            valorLLave = xhr.response.llave;

            if (valorLlave = 72){  
                creaDiv(xhr.response.instrucciones[1]);
            }

        }
    };
    xhr.send(usuario);
}


