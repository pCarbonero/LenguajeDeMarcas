let sum = 0;
let cont = 0;
let max = 0;
let min = 200;
let id;
let usuarios = [];
let count = 0;

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
    console.log(count);
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
            nombreU: nombre,
            apellidoU: apellido,
            edadU: edad,
            ciudadU: ciudad,
            hobbiesU: hobbies
        };

        usuarios.push(usuario);
        console.log(usuarios);
        //Convertir en JSON el objeto
        let usuarioCadena = convertirACadena(usuarios);

        let usuarioObjeto = creaObjeto(usuarioCadena);

        creaFila();
        $("#suma").html(suma(edad));
        $("#media").html(media(edad));
        $("#maximo").html(maximo(edad));
        $("#minimo").html(minimo(edad));

        
    };
};

function creaObjeto(usuarioCadena){
    return JSON.parse(usuarioCadena);
};

//Funcion que crea la fila de la tabla
function creaFila(){
    $("tbody").empty();
    id = 0
    usuarios.forEach(element => {
        id++;
        return $("tbody").append("<tr id='" + id +"' onclick='remove("+ id +")'>" + 
                "<td>" + element.nombreU + "</td>" +
                "<td>" + element.apellidoU + "</td>" +
                "<td>" + element.edadU + "</td>" +
                "<td>" + element.ciudadU + "</td>" + 
                "<td>" + hobbiesString(element) + "</td>" + 
            "</tr>");
            
    });
    
    
    
};

function todoRelleno(nombre, apellido, edad, ciudad){

    let correcto = false;
    if(nombre != "" && apellido != "" && edad != "" && ciudad != ""){
        correcto = true;
    };
    return correcto;
};

function suma(edad){

    sum += parseInt(edad);
    return sum;

    
};

function media(){

    cont++;
    let media = sum/cont;

    return media;

};

function maximo(edad){

    let num = parseInt(edad);
    if(max < num){
        max = num;
    };

    return max;
};

function minimo(edad){
    
    let num = parseInt(edad);
    if(min > num){
        min = num;
    };

    return min;
};

function remove(id){
    $("#"+ id).remove();
    usuarios.splice(id-1, 1);
    console.log(usuarios);
    id--;
    cont--;
    sum--;
    creaFila();
};

function hobbiesString(element){
    let cadena = element.hobbiesU.join("<br>");
    return cadena;
}