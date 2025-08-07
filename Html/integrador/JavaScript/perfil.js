const sesion = localStorage.getItem("login")
const u = JSON.parse(sesion)


let usuario = []
let vet = []
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

        for (let i=0 ; i<vet.length ; i++){
            for (let j=0 ; j<usuario.length ; j++){
                if (vet[i].idUser == usuario[j].idUser){
                    let vetCompleto = {
                        "idUser":usuario[j].idUser,
                        "idVet":vet[i].idVet,
                        "foto": usuario[j].foto,
                        "name":usuario[j].name,
                        "especialidad":vet[i].especialidad,
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

        if (!Response.ok){
            throw new Error(res.status)
        }
    } catch (e) {
        console.log("Error:" + e)
    }
}

const botonEdicion = document.getElementById("b-e")
const botonGuardar = document.getElementById("b-g")
const botonEliminar = document.getElementById("b-eli")
const botonCancelar = document.getElementById("b-c")

const tapar = document.getElementById("cubrir-pantalla")
tapar.style.background = "rgba(255, 255, 255, 0.3)"
tapar.style.backdropFilter = "blur(10px)";
tapar.style.visibility = "hidden"

const eliminacion = document.getElementById("eliminarcuenta")
const botonConfirmacion = document.getElementById("eliminar")
const botonRegresar = document.getElementById("noeliminar")

const pantalla = document.getElementById("confirmarcontra")
const pantalla_elim = document.getElementById("confirmarcontraelim")

const entrada = document.getElementById("contra")
const error = document.getElementById("c-err")

const foto = document.getElementById("fotoPerfil1")
const nombre_usuario = document.getElementById("name")
var nombre = document.getElementById("nombre")
var especialidad = document.getElementById("espec")
var titulos = document.getElementById("titulos")
var universidad = document.getElementById("universidad")
var correo = document.getElementById("correo")
var num = document.getElementById("num")
var descripcion = document.getElementById("descripcion")
const horario = document.getElementById("horario")

function añadirDatos(){
    foto.src = u.foto
    nombre.value = u.name
    correo.value = u.email
    num.value = u.phoneNumber
   if (titulos && universidad && descripcion && horario){
        especialidad.value = u.especialidad
        titulos.value = u.titulos
        universidad.value = u.universidad
        descripcion.value = u.descripcion
        horario.value = u.disponibilidad
   }

}

function confirmacion(){
    
    pantalla.style.visibility = "visible"

    const cuadro = document.createElement("div")
    cuadro.classList.add("contra-cuadro")

}

function abrircampos(){
    nombre.disabled = false
    correo.disabled = false
    num.disabled = false
    if (titulos){
        titulos.disabled = false
        universidad.disabled = false
        descripcion.disabled = false
    }
}

function cerrarcampos(){
    nombre.disabled = true
    correo.disabled = true
    num.disabled = true
    if (titulos){
        titulos.disabled = true
        universidad.disabled = true
        descripcion.disabled = true
    }
}

function reiniciar_info(){
    nombre_usuario.innerText = u.name
    nombre.value = u.name
    correo.value = u.email
    num.value = u.phoneNumber
   if (titulos && universidad && descripcion && horario){
        titulos.value = u.titulos
        universidad.value = u.universidad
        descripcion.value = u.descripcion
        horario.value = u.disponibilidad
   }
}

botonGuardar.addEventListener('click', function(){
    if(titulos){
        if (nombre.value && correo.value && num.value && titulos.value && universidad.value && descripcion.value){
            botonGuardar.style.visibility = 'hidden'
            botonCancelar.style.visibility = "hidden"
            botonEliminar.style.visibility = "hidden"
            tapar.style.visibility = "visible"
            
            cerrarcampos()
            

            confirmacion()
        }else{
            alert("Uno o varios campos no están completos. Por favor, rellénelos.")
        }
    }else{
        if (nombre.value && correo.value && num.value){
            botonGuardar.style.visibility = 'hidden'
            botonCancelar.style.visibility = "hidden"
            tapar.style.visibility = "visible"
            
            cerrarcampos()
            

            confirmacion()
        }else{
            alert("Uno o varios campos no están completos. Por favor, rellénelos.")
        }
    }
    
})

entrada.addEventListener('keypress', async function(evento){
    if (evento.key =='Enter'){
        if (entrada.value == u.password){
            if (descripcion){
                var data = {
                    "name":nombre.value,
                    "email":correo.value,
                    "password":u.password,
                    "phoneNumber":num.value,
                    "foto":"/Html/integrador/imagenes/empty-pfp.webp",
                    "idUser":u.idUser
                }

                await actualizarUsuario(data)
                await traerDatos()
                var dataVet = {
                    "idUser":u.idUser,
                    "comprobante":"",
                    "especialidad":especialidad.value,
                    "disponibilidad":horario.value,
                    "titulos":titulos.value,
                    "universidad":universidad.value,
                    "descripcion":descripcion.value,
                    "idVet":u.idVet
                }
                await actualizarVet(dataVet)
                await traerDatos()
                for (let i=0 ; i<veterinario.length ; i++){
                if (data.name==veterinario[i].name){
                    localStorage.setItem("login", JSON.stringify(veterinario[i]))
                    window.location.href ="/Html/integrador/Sesion/Iniciada/VistasVet/Hogar/Perfil.html"
                    return
                }
                }
            }else{
                var data = {
                    "name":nombre.value,
                    "email":correo.value,
                    "password":u.password,
                    "phoneNumber":num.value,
                    "foto":"/Html/integrador/imagenes/empty-pfp.webp",
                    "idUser":u.idUser
                }
                await actualizarUsuario(data)
                await traerDatos()

                for (let i=0 ; i<usuario.length ; i++){
                if (data.name==usuario[i].name){
                    localStorage.setItem("login", JSON.stringify(usuario[i]))
                    window.location.href ="/Html/integrador/Sesion/Iniciada/VistasUsuario/Hogar/Perfil.html"
                    return
                }
                }
            }
            localStorage.setItem("login", JSON.stringify(u))

            tapar.style.visibility = 'hidden'
            pantalla.style.visibility = 'hidden'
            entrada.classList.remove("c-err-brdr")
            error.style.visibility = "hidden"
            entrada.value = ""
        }else{
            error.style.visibility = "visible"
            entrada.classList.add("c-err-brdr")
        }
    }
})

botonEdicion.addEventListener('click', function(){
    abrircampos()
    botonGuardar.style.visibility = "visible"
    botonEliminar.style.visibility = "visible"
    botonCancelar.style.visibility = "visible"
})

botonEliminar.addEventListener('click', function(){
    botonGuardar.style.visibility = 'hidden'
    botonCancelar.style.visibility = "hidden"
    botonEliminar.style.visibility = "hidden"
    tapar.style.visibility = "visible"
    eliminacion.style.visibility = "visible"
})

botonRegresar.addEventListener('click', function(){
    tapar.style.visibility = "hidden"
    eliminacion.style.visibility = "hidden"
})

botonConfirmacion.addEventListener('click', function(){
    eliminacion.style.visibility = "hidden"
    pantalla_elim.style.visibility = "visible"
})

const contra_elim = document.getElementById("contraelim")
const error_elim = document.getElementById("c-err-elim")
contra_elim.addEventListener('keypress', async function(evento){
    if (evento.key =='Enter'){
        if (contra_elim.value == u.password){

            tapar.style.visibility = 'hidden'
            pantalla_elim.style.visibility = 'hidden'
            contra_elim.classList.remove("c-err-brdr")
            error_elim.style.visibility = "hidden"
            contra_elim.value = "hidden"

            if (u.idVet){
                await eliminarUsuario(u.idUser)
                await eliminarVet(u.idVet)
            }else{
                await eliminarUsuario(u.idUser)
            }

            localStorage.clear()
            window.location.href = "/Html/integrador/index.html"
        }else{
            error_elim.style.visibility = "visible"
            contra_elim.classList.add("c-err-brdr")
        }
    }
})

botonCancelar.addEventListener('click', function(){
    cerrarcampos()
    reiniciar_info()
    botonGuardar.style.visibility = "hidden"
    botonEliminar.style.visibility = "hidden"
    botonCancelar.style.visibility = "hidden"
})

tapar.addEventListener('click', function(){
    tapar.style.visibility = "hidden"
    eliminacion.style.visibility = "hidden"
    pantalla.style.visibility = "hidden"
    pantalla_elim.style.visibility = "hidden"
    error.style.visibility = "hidden"
    entrada.classList.remove("c-err-brdr")
    cerrarcampos()
    reiniciar_info()
    botonGuardar.style.visibility = "hidden"
    botonEliminar.style.visibility = "hidden"
    botonCancelar.style.visibility = "hidden"
})
document.onload = añadirDatos()

async function eliminarUsuario(id) {
    try {
    const res = await fetch(`http://localhost:7000/users/${id}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" }
    });

    if (!res.ok) {
      throw new Error(`Error ${res.status}: No se pudo eliminar la cuenta`);
    }else{
        return true
    }

  } catch (e) {
    console.error("Ocurrió un error al eliminar la cuenta: ", e);
  }
}

async function eliminarVet(id) {
    try {
    const res = await fetch(`http://localhost:7000/veterinary/${id}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" }
    });

    if (!res.ok) {
      throw new Error(`Error ${res.status}: No se pudo eliminar la cuenta`);
    }else{
        return true
    }

  } catch (e) {
    console.error("Ocurrió un error al eliminar la cuenta: ", e);
  }
}

async function actualizarUsuario(data) {
    try {
        const response = await fetch(`http://localhost:7000/users/${data.idUser}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error("Error al actualizar la mascota");
        }

    } catch (error) {
        console.error("Error:", error);
        alert("Ocurrió un error al actualizar la cuenta");
    }
}

async function actualizarVet(data) {
    try {
        const response = await fetch(`http://localhost:7000/veterinary`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error("Error al actualizar la mascota");
        }

    } catch (error) {
        console.error("Error:", error);
        alert("Ocurrió un error al actualizar la cuenta");
    }
}