const tapar = document.getElementById("cubrir-pantalla")
tapar.style.background = "rgba(255, 255, 255, 0.3)"
tapar.style.backdropFilter = "blur(10px)";
tapar.style.visibility = "hidden"

const pantalla = document.getElementById("confirmarcontra")

const entrada = document.getElementById("contra")
const error = document.getElementById("c-err")

const nombre_usuario = document.getElementById("nombre-usuario")
var nombre = document.getElementById("nombre")
var especialidad = document.getElementById("")
var titulos = document.getElementById("titulos")
var universidad = document.getElementById("universidad")
var correo = document.getElementById("correo")
var num = document.getElementById("num")
var descripcion = document.getElementById("descripcion")

function añadirDatos(){
   
    nombre_usuario.innerText = "Yael Betanzos Jiménez"
    nombre.value = "Veterinario 1"
    correo.value = "naslkfnsakjlbf@gmail.com"
    num.value = "111 1111 111"
    titulos.value = "Licenciado en tal tal tal"
    universidad.value = "Universidad politécnica de Chiapas"
    descripcion.value = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

}

document.onload = añadirDatos()