// array edades
let ArrObjetos = [];

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
    let casillas=$('input[name=hobbies]').filter(':checked').map(function () {
        return $(this).val();
    }).get();
    console.log(casillas);
    objeto = {
        atributo1 : $("#box1").val(),
        atributo2 : document.getElementById("box2").value,
        atributo3 : document.getElementById("box3").value,
        atributo4 : casillas
        
    };
    objetoSerializado = serializa(objeto);                                                 
    objetoDeserializado = deserializa(objetoSerializado);
    ArrObjetos.push(objetoDeserializado);

    borraCasillas();
    creaTabla();
    uncheck();

    enviaInfo(objetoDeserializado);
    solicitud();
}


function calculaCosas(){
    let suma = 0;
    let maxima = 0;
    let media = 0;
    let minimo = 0;

    // bucle que recorre el array
    for(let i = 0; i < ArrObjetos.length; i++){
        suma += parseInt(ArrObjetos[i].atributo2);

        // asignamos el maximo
        if(i == 0 || parseInt(ArrObjetos[i].atributo2) > maxima){
            maxima = parseInt(ArrObjetos[i].atributo2);
        }
        if(i == 0 || parseInt(ArrObjetos[i].atributo2) < minimo){
            minimo = parseInt(ArrObjetos[i].atributo2);
        }
    }
    media = suma/ArrObjetos.length;
    if (ArrObjetos.length == 0){
        media = 0;
    }

    $("#suma").text(`Suma: ${suma}`);
    $("#media").text(`Media: ${media}`);
    $("#max").text(`Max: ${maxima}`);
    $("#min").text(`Min: ${minimo}`);
}

function borraUno(id){
    console.log(id);
    $('#t'+id).remove();
    ArrObjetos.splice(id, 1);
    console.log(ArrObjetos);
    creaTabla();
    calculaCosas();
}

function uncheck(){
    $('input[name="hobbies"]').prop('checked', false);
}
function borraCasillas(objeto){
    $('input[type=text]').val('')
}

function creaTabla(){
     // append
     $('#tabla').empty(); 
     $('#tabla').append('<tr><td>nombre</td><td>edad</td><td>ciudad</td><td>hobbies</td></tr>');
     for(let i = 0; i<ArrObjetos.length; i++){
        $('#tabla').append('<tr id= "t'+i+ '" onclick="borraUno('+i+')"><td>' + ArrObjetos[i].atributo1 +'</td><td>' 
        + ArrObjetos[i].atributo2 +'</td><td>' + ArrObjetos[i].atributo3 + '</td><td>' + ArrObjetos[i].atributo4 + '</td></tr>')
     }
}

function serializa(objeto){
    let serializado = JSON.stringify(objeto);
    return serializado
}

function deserializa(objetoSerializado){
    deserializado = JSON.parse(objetoSerializado);
    return deserializado;
}

function compruebaChecks(){
let numChecks = 0;
let casillas=$('input[name=hobbies]').filter(':checked').map(function () {
   if ($(this).is(":checked")){
    numChecks++;
   }

   if (numChecks > 3){
    $(this).prop('checked', false);
    alert('Solo tres opciones');
   }
}).get();
}

function enviaInfo(objetoDeserializado){
    const xhr = new XMLHttpRequest();
   	xhr.open("POST", "https://lm.iesnervion.es/eco.php");
    xhr.responseType = 'json';

   	xhr.onload = function() {
       	if (xhr.readyState == 4 && xhr.status == 201) { 
           	console.log(xhr.responseText);
       	} else {
           	console.log("Error: ${xhr.status}");
       	}
   	};
   	xhr.send(JSON.stringify(objetoDeserializado));
}

function solicitud(){
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://lm.iesnervion.es/eco.php");
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
