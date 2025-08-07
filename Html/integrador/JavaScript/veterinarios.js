let usuario = JSON.parse(localStorage.getItem("usuarios")) || []
console.log(usuario)

let veterinarios = []

for (let i = 0 ; i<usuario.length ; i++){
    let element = usuario[i]
    if (element.titulos){
        console.log(element)
        veterinarios.push(element)
    }
}

localStorage.setItem("vets", JSON.stringify(veterinarios))