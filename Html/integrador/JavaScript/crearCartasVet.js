const contenedor = document.getElementById("contenedor")
contenedor.style.gridTemplateColumns = "1fr"

const contenedor_info = document.getElementById("contenedor-info")
contenedor_info.style.gridTemplateColumns = "1fr"
contenedor_info.style.visibility = "hidden"

const img = document.getElementById("img")
const nombre = document.getElementById("nombre")
const lugar = document.getElementById("lugar")
const espec = document.getElementById("espec")
const calif = document.getElementById("calif")
const horario = document.getElementById("horario")
const num = document.getElementById("num")
const correo = document.getElementById("correo")
const desc = document.getElementById("desc")
desc.disabled = true
desc.style.backgroundColor="#f3f3f3"
desc.style.border = 0

const regreso = document.getElementById("b-r")

function añadirDatos(obj, info, entrada, llave){
    const p = document.createElement("p")
    info.append(p)

    const span = document.createElement("span")
    span.classList.add("etiqueta")
    span.innerText = entrada + ": "
    p.append(span)

    const dato = document.createTextNode(obj[llave])
    p.append(dato)
}

function crearCartas(obj){
    const carta = document.createElement("div")
    carta.classList.add("establecimiento-carta")
    contenedor.appendChild(carta)


    const cartaS1 = document.createElement("div")
    cartaS1.classList.add("establecimiento-seccion-1")
    carta.appendChild(cartaS1)

    const foto = document.createElement("img")
    foto.classList.add("establecimiento-foto")
    foto.src = obj.foto
    cartaS1.appendChild(foto)

    const info = document.createElement("div")
    info.classList.add("establecimiento-info")
    cartaS1.append(info)

    añadirDatos(obj, info, "Nombre", "name")
    
    const pEst = document.createElement("p")
    info.append(pEst)

    const spanEst = document.createElement("span")
    spanEst.classList.add("etiqueta")
    spanEst.innerText = "Establecimiento: "
    pEst.append(spanEst)

    if (Array.isArray(obj.establecimiento)) {
        const nombres = clinica.map(e => e.name || "Sin nombre").join(", ")
        pEst.append(document.createTextNode(nombres))
    } else {
        pEst.append(document.createTextNode(obj.establecimiento))
    }

    añadirDatos(obj, info, "Especialidad", "especialidad")
    añadirDatos(obj, info, "Calificación", "calificacion")

    const boton = document.createElement("button")
    boton.classList.add("establecimiento-boton")
    boton.innerText = "Más información"
    info.appendChild(boton)
    boton.addEventListener('click', function(){
        mostrarVet(obj)
    })

    const separador = document.createElement("div")
    separador.classList.add("separador", "establecimiento-separador")
    carta.appendChild(separador)

    const cartaS2 = document.createElement("div")
    cartaS2.classList.add("establecimiento-seccion-2")
    carta.appendChild(cartaS2)

    const p = document.createElement("p")
    cartaS2.appendChild(p)

    const span = document.createElement("span")
    span.classList.add("etiqueta")
    span.innerText = "Horario de atención: "
    p.append(span)

    const horario = document.createTextNode(obj.disponibilidad)
    p.append(horario)
}

function mostrarVet(obj){
    contenedor.style.visibility = "hidden"

    img.src = obj.foto
    nombre.innerText = obj.name
    lugar.innerText = obj.establecimiento
    espec.innerText = obj.especialidad
    calif.innerText = obj.calificacion
    horario.innerText = obj.disponibilidad
    num.innerText = obj.phoneNumber
    correo.innerText = obj.email
    desc.value = obj.descripcion


    contenedor_info.style.visibility = "visible"
}

regreso.addEventListener('click', function(){
    contenedor_info.style.visibility = "hidden"
    contenedor.style.visibility = "visible"
})

let usuario = []
let vet = []
let clinica = []
let veterinario = []
async function traerDatos() {
    try {
        const res = await fetch("http://localhost:7000/users")
        .then(res => res.json())
        .then(data => {
            usuario = data
        })

        const vets = await fetch("http://localhost:7000/veterinary")
        .then(res => res.json())
        .then(data => {
            vet = data
        })

        const clinicas = await fetch("http://localhost:7000/establishment/all")
        .then(res => res.json())
        .then(data => {
            clinica = data
        })

        for (let i=0 ; i<vet.length ; i++){
            for (let j=0 ; j<usuario.length ; j++){
                if (vet[i].idUser == usuario[j].idUser){
                    let clinicas = []

                    for (let k = 0 ; k<clinica.length ; k++){
                        if (vet[i].idVet == clinica[k].idVet){
                            clinicas.push(clinica[k])
                        }
                    }

                    if (clinicas.length>0){
                        let nombresClinica = []
                        for (let k = 0 ; k<clinicas.length ; k++){
                            nombresClinica.push(clinicas[k].name)
                        }
                        let vetCompleto = {
                            "idUser":usuario[j].idUser,
                            "idVet":vet[i].idVet,
                            "foto": usuario[j].foto,
                            "name":usuario[j].name,
                            "especialidad":vet[i].especialidad,
                            "calificacion":0,
                            "establecimiento":nombresClinica,
                            "email":usuario[j].email,
                            "phoneNumber":usuario[j].phoneNumber,
                            "password":usuario[j].password,
                            "titulos":vet[i].titulos,
                            "universidad":vet[i].universidad,
                            "disponibilidad":vet[i].disponibilidad,
                            "descripcion":vet[i].descripcion
                        }
                        veterinario.push(vetCompleto)
                    }else{
                        let vetCompleto = {
                            "idUser":usuario[j].idUser,
                            "idVet":vet[i].idVet,
                            "foto": usuario[j].foto,
                            "name":usuario[j].name,
                            "especialidad":vet[i].especialidad,
                            "calificacion":0,
                            "establecimiento": "Ninguno",
                            "email":usuario[j].email,
                            "phoneNumber":usuario[j].phoneNumber,
                            "password":usuario[j].password,
                            "titulos":vet[i].titulos,
                            "universidad":vet[i].universidad,
                            "disponibilidad":vet[i].disponibilidad,
                            "descripcion":vet[i].descripcion
                        }
                        veterinario.push(vetCompleto)
                    }
                }
            }
        }
        for (let i=0 ; i<veterinario.length ; i++){
            crearCartas(veterinario[i])
        }

        if (!Response.ok){
            throw new Error(Response.status)
        }
    } catch (e) {
        console.log("Error:" + e)
    }
}
traerDatos()