let datos;

function serializa(producto){
    return JSON.stringify(producto);
}

function data(){
    let prod = {
        descripcion: $("#desc").val(),
        idProveedor: $("#idP").val(),
        precio: $("#precio").val()
    };
    let seri = serializa(prod);
    console.log(seri);
    envia(seri);
    
};

function creaFila(prods){
    $("#tb").empty();
    prods.lista.forEach(element =>{
        $("#tb").append(
            "<tr>"+
            "<td>"+ element["id"]+ "</td>" +
            "<td>"+ element["descripcion"]+ "</td>" +
            "<td>"+ element["idProveedor"]+ "</td>" +
            "<td>"+ element["precio"]+ "</td>"+ "</tr>"
        );
    });
};

function envia(dato){
  let xhr = new XMLHttpRequest();
  xhr.open("POST","https://lm.iesnervion.es/reto4.php");
  xhr.responseType = "json";

  xhr.onload = function(){
    if (xhr.status == 200){
        datos = xhr.response;
        if(datos.deco == null){
            creaFila(datos);
            console.log(datos)
        }else{
            $("#tb").empty();
            $("#error").html("<h2><b style='color:red'>" + datos["error"] + "</b></h2>");
        }
    }else{
        console.log("Error al enviar")
    }
    };
    xhr.send(dato);
};