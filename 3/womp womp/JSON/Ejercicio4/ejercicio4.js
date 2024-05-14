let sum = 0;
let cont = 0;
let max = 0;
let min = 200;
let id;
let usuarios = [];
let count = 0
let datos;

function convertirACadena(usuarios){
    return JSON.stringify(usuarios);
};

function compruebaCheck(){

    
    $('input:checkbox').on('change', function () { 
        count = $('input:checkbox').filter(':checked').length;
        if(count >= 3){
            $('input:checkbox').not(':checked').prop('disabled', true);
        }else{
            $('input:checkbox').not(':checked').prop('disabled', false);
        }
    })
};

//Funcion que deserializa los datos y los muestra en la tabla
function creaUsuario(){
// Rerscatar datos    
    let nombre = $("#nombre").val();
    let apellido = $("#apellido").val();
    let edad = $("#edad").val();
    let ciudad = $("#ciudad").val();
    let hobbies = $('input[name="Hobbies"]')
    .filter(":checked")
    .map(function()
        {
            return $(this).val()
        })
    .get();
    

    if(!todoRelleno(nombre, apellido, edad, ciudad)){
        alert("Todos los campos deben estar rellenos");
    }else{
        // Creo el objeto con los datos
        let usuario = {
            nombre: nombre,
            apellido: apellido,
            edad: edad,
            ciudad: ciudad,
            hobbies: hobbies
        };

        usuarios.push(usuario);
        //Convertir en JSON el objeto
        let json = convertirACadena(usuarios);

        envio(json);
        
    };
};

function creaObjeto(usuarioCadena){
    return JSON.parse(usuarioCadena);
};

//Funcion que crea la fila de la tabla
function creaFila(dat){
    $("tbody").empty();
    id = 0
    dat.body.forEach(element => {
        id++;
        return $("tbody").append("<tr id='" + id +"' onclick='remove("+ id +")'>" + 
                "<td>" + element["nombre"] + "</td>" +
                "<td>" + element["apellido"] + "</td>" +
                "<td>" + element["edad"] + "</td>" +
                "<td>" + element["ciudad"] + "</td>" + 
                "<td>" + hobbiesString(element) + "</td>" + 
            "</tr>");
            
    });
    $("#suma").html(dat.calculos["suma"]);
    $("#media").html(dat.calculos["media"]);
    $("#maximo").html(dat.calculos["max"]);
    $("#minimo").html(dat.calculos["min"]);
    
};

function todoRelleno(nombre, apellido, edad, ciudad){

    let correcto = false;
    if(nombre != "" && apellido != "" && edad != "" && ciudad != ""){
        correcto = true;
    };
    return correcto;
};

function remove(id){
    $("#"+ id).remove();
    usuarios.splice(id-1, 1);
    console.log(usuarios)
    creaFila();
};

function hobbiesString(element){
    let cadena = element.hobbies.join("<br>");
    return cadena;
};

function envio(dat){
    const xhr = new XMLHttpRequest();
   	xhr.open("POST", "https://lm.iesnervion.es/eco.php");
    xhr.responseType = "json";
// Preparamos a continuación la respuesta
   	xhr.onload = function() {
       	if (xhr.status == 201) { // 200 || 201
            datos = xhr.response
            creaFila(datos);
       	} else {
           	console.log("Error: ${xhr.status}");
       	}
   	};
   	xhr.send(dat);
};

function solicitud(){
    const xhr = new XMLHttpRequest();
   	xhr.open("GET", "https://lm.iesnervion.es/eco.php");
   	xhr.responseType = "json";
       xhr.onload = function() {
        if (xhr.readyState == 4 && xhr.status == 201) {
            const data = xhr.response;
            console.log(data);
        } else {
            console.log("Error: ${xhr.status}");
        }
    };
    xhr.send();
};