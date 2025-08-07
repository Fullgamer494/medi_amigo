function crearPantallaCarga(){
    const pantallaCarga = document.createElement("div")
    pantallaCarga.classList.add("pantalla-carga")

    const circuloCarga = document.createElement("div")
    circuloCarga.classList.add("cargado")

    const parrafo = document.createElement("p")
    parrafo.classList.add("carga-texto")

    const parrafo2 = document.createElement("p")
    parrafo2.classList.add("carga-texto")

    const texto = document.createTextNode("Medi-Amigo está cargando.")
    const texto2 = document.createTextNode("Esto podría tardar unos segundos...")

    parrafo.appendChild(texto)
    parrafo2.appendChild(texto2)
    pantallaCarga.appendChild(circuloCarga)
    pantallaCarga.appendChild(parrafo)
    pantallaCarga.appendChild(parrafo2)
    
    const elemento = document.getElementById("carga")
    
    elemento.appendChild(pantallaCarga)
}

crearPantallaCarga()

window.addEventListener('load', function() {
    
    const elemento = document.getElementById("carga");
    elemento.remove()
})

const sesion = localStorage.getItem("login")

if (sesion) {
    const user = JSON.parse(sesion);
    document.getElementById("name").innerText = user.name
    document.getElementById("fotoPerfil").src = user.foto
} else {
    window.location.href = "/Html/integrador/index.html"
    localStorage.setItem("login", "null")
}