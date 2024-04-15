// array edades
let edades = [];
let contador = 0;

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
        atributo1 : document.getElementById("box1").value,
        atributo2 : document.getElementById("box2").value,
        atributo3 : document.getElementById("box3").value
    };

    objetoSerializado = serializa(objeto);
    objetoDeserializado = deserializa(objetoSerializado);

    addEdad(objeto);

    borraCasillas();
    creaTabla(objetoDeserializado);
}

function addEdad(objeto){
    edades.push(objeto.atributo2);
    calculaCosas();
}

function calculaCosas(){
    let suma = 0;
    let maxima = 0;
    let media = 0;
    let minimo = 999;

    // bucle que recorre el array
    for(let i = 0; i < edades.length; i++){
        suma += parseInt(edades[i]);

        // asignamos el maximo
        if(i == 0 || parseInt(edades[i]) > maxima){
            maxima = parseInt(edades[i]);
        }
        if(i == 0 || parseInt(edades[i]) < minimo){
            minimo = parseInt(edades[i]);
        }
    }
    media = suma/edades.length;

    $("#suma").text(`Suma: ${suma}`);
    $("#media").text(`Media: ${media}`);
    $("#max").text(`Max: ${maxima}`);
    $("#min").text(`Min: ${minimo}`);
}

function borraUno(id){
    $('#'+id).remove();
}

function borraCasillas(objeto){
    $('input').val('')
}

function creaTabla(objetoDeserializado){
     // append
     $('#tabla').append('<tr id= "t'+contador+ '" onclick="borraUno(id)"><td>' + objeto.atributo1 +'</td><td>' + objeto.atributo2 +'</td><td>' + objeto.atributo3 + '</td></tr>')  
     contador++;
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