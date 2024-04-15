function ejercicio(){
    creaObjeto();
}

function creaObjeto(){
    let objetoSerializado
    let objetoDeserializado
    objeto = {
        atributo1 : document.getElementById("box1").value,
        atributo2 : document.getElementById("box2").value,
        atributo3 : document.getElementById("box3").value
    };

    objetoSerializado = serializa(objeto);
    objetoDeserializado = deserializa(objetoSerializado);

    borraCasillas()
    creaTabla(objetoDeserializado)
}

function borraCasillas(objeto){
    $('input').val('')
}

function creaTabla(objetoDeserializado){
     // append
     $('#tabla').append('<tr><td>' + objeto.atributo1 +'</td><td>' + objeto.atributo2 +'</td><td>' + objeto.atributo3 + '</td></tr>')  
}

function serializa(objeto){
    let serializado = JSON.stringify(objeto);
    console.log(serializado);
    return serializado
}

function deserializa(objetoSerializado){
    deserializado = JSON.parse(objetoSerializado);
    console.log(deserializado); 
}