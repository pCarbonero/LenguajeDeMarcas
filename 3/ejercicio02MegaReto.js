// array edades
let edades = [];
let ArrObjetos = [];
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
    ArrObjetos.push(objetoDeserializado);
    console.log(ArrObjetos);
    addEdad(objeto);

    borraCasillas();
    creaTabla();
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
    console.log(id);
    $('#t'+id).remove();
    ArrObjetos.splice(id, 1);
    console.log(ArrObjetos);
    creaTabla();
}

function borraCasillas(objeto){
    $('input').val('')
}

function creaTabla(){
     // append
     $('#tabla').empty(); 
     for(let i = 0; i<ArrObjetos.length; i++){
        $('#tabla').append('<tr id= "t'+i+ '" onclick="borraUno('+i+')"><td>' + ArrObjetos[i].atributo1 +'</td><td>' 
        + ArrObjetos[i].atributo2 +'</td><td>' + ArrObjetos[i].atributo3 + '</td></tr>')
     }
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
    return deserializado;
}