let persona = {
    nombre: "Juan",
    edad: 30,
    ciudad: "Madrid"
};



//////

function serializa(){
let personaJSON = JSON.stringify(persona);
console.log(personaJSON);
}

function deserializa(){
    let persona2 = JSON.parse(personaJSON);
    console.log(persona2); 
}