const sesion = localStorage.getItem("login")
const u = JSON.parse(sesion)

const contenedor_m = document.getElementById("contenedor-m")
const contenedor_info = document.getElementById("contenedor-info")

const guardar = document.getElementById("b-g")
const cancelar = document.getElementById("b-c")
const regreso = document.getElementById("b-r")
const editar = document.getElementById("b-e")

const nueva = document.getElementById("nueva")

const tapar = document.getElementById("cubrir-pantalla")
tapar.style.background = "rgba(255, 255, 255, 0.3)"
tapar.style.backdropFilter = "blur(10px)";
tapar.style.visibility = "hidden"

const pantalla = document.getElementById("confirmarcontra")
const pantalla_elim = document.getElementById("confirmarcontraelim")

const entrada = document.getElementById("contra")
const error = document.getElementById("c-err")

const img = document.getElementById("foto")
const nombre = document.getElementById("nombre")
const id = document.getElementById("id")
const edad = document.getElementById("edad")
const especie = document.getElementById("especie")
const raza = document.getElementById("raza")
const sexo = document.getElementById("sexo")
const peso = document.getElementById("peso")
const estado = document.getElementById("estado")
const visitas_t = document.getElementById("visitas-tot")
const vacunas = document.getElementById("vacunas")
const prox_vac = document.getElementById("prox-vac")
const prox_vac_f = document.getElementById("prox-vac-f")
const ult_vac = document.getElementById("ult-vac")
const ult_vis = document.getElementById("ult-visita")
const tratamiento = document.getElementById("tratamientos")
const cirugias = document.getElementById("cirugias")
const cond = document.getElementById("condiciones")

const eli = document.getElementById("b-eli")

const eliminacion = document.getElementById("eliminarcuenta")
const botonConfirmacion = document.getElementById("eliminar")
const botonRegresar = document.getElementById("noeliminar")
if (botonRegresar){
    botonRegresar.addEventListener('click', function(){
        tapar.style.visibility = "hidden"
        eliminacion.style.visibility = "hidden"
    })
}

if (botonConfirmacion){
    botonConfirmacion.addEventListener('click', function(){
    eliminacion.style.visibility = "hidden"
    pantalla_elim.style.visibility = "visible"
    })
}
const contra_elim = document.getElementById("contraelim")
const error_elim = document.getElementById("c-err-elim")
contra_elim.addEventListener('keypress', async function(evento){
    if (evento.key =='Enter'){
        if (contra_elim.value == u.password){

            tapar.style.visibility = 'hidden'
            pantalla_elim.style.visibility = 'hidden'
            contra_elim.classList.remove("c-err-brdr")
            error_elim.style.visibility = "hidden"
            contra_elim.value = ""
            contenedor_m.style.visibility = "visible"
            contenedor_info.style.visibility = "hidden"
            await eliminarMascota(selec)
            if(u.titulos){
                window.location.href = "/Html/integrador/Sesion/Iniciada/VistasVet/Hogar/Mascotas.html"
            }else{
                window.location.href = "/Html/integrador/Sesion/Iniciada/VistasUsuario/Hogar/Mascotas.html"
            }
        }else{
            error_elim.style.visibility = "visible"
            contra_elim.classList.add("c-err-brdr")
        }
    }
})


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
    carta.classList.add("carta")

    const img = document.createElement("img")
    var foto = obj.photo
    img.classList.add("mascotas-foto")
    img.src = foto
    carta.appendChild(img)

    const lista = document.createElement("div")
    carta.appendChild(lista)

    añadirDatos(obj, lista, "Nombre", "name")
    añadirDatos(obj, lista, "Edad", "age")
    añadirDatos(obj, lista, "Sexo", "sex")
    añadirDatos(obj, lista, "Estado", "state")
    añadirDatos(obj, lista, "Condiciones", "condition")

    const boton = document.createElement("button")
    boton.innerText = "Más información"
    carta.appendChild(boton)

    boton.addEventListener('click', function(){
        mostrar_mascota(obj)
        selec = obj.idPet
        console.log(selec)
    })

    contenedor_m.insertBefore(carta, nueva)
}

function mostrar_mascota(obj){
    contenedor_m.style.visibility = "hidden"
    
    img.src = obj.photo
    nombre.value = obj.name
    id.value = obj.idPet
    edad.value = obj.age
    especie.value = obj.species
    raza.value = obj.race
    sexo.value = obj.sex
    peso.value = obj.weight
    estado.value = obj.state
    visitas_t.value = obj.numVisit
    vacunas.value = obj.vaccines
    prox_vac.value = obj.nextVaccine
    prox_vac_f.value = obj.nextVaccineDate
    ult_vac.value = obj.lastVaccines
    tratamiento.value = obj.treatment
    cirugias.value = obj.surgeries
    cond.value = obj.condition
    ult_vis.value = obj.lastVisit

    eli.addEventListener('click', function(obj){
        esconder_botones()
        cerrar_campos()
        reiniciar_campos(obj)
        tapar.style.visibility = "visible"
        eliminacion.style.visibility = "visible"
    })

    contenedor_info.style.visibility = "visible"
}
tapar.addEventListener('click', function(){
    tapar.style.visibility = "hidden"
    eliminacion.style.visibility = "hidden"
    error.style.visibility = "hidden"
    pantalla.style.visibility = "hidden"
    pantalla_elim.style.visibility = "hidden"
    contra_elim.classList.remove("c-err-brdr")
    cerrar_campos()
    guardar.style.visibility = "hidden"
    cancelar.style.visibility = "hidden"
})

function mostrar_botones(){
    guardar.style.visibility = "visible"
    cancelar.style.visibility = "visible"
}

function esconder_botones(){
    guardar.style.visibility = "hidden"
    cancelar.style.visibility = "hidden"
}

function abrir_campos(){
    nombre.disabled = false
    edad.disabled = false
    peso.disabled = false
    estado.disabled = false
    visitas_t.disabled = false
    vacunas.disabled = false
    prox_vac.disabled = false
    prox_vac_f.disabled = false
    ult_vac.disabled = false
    tratamiento.disabled = false
    cirugias.disabled = false
    cond.disabled = false
}

function cerrar_campos(){
    nombre.disabled = true
    edad.disabled = true
    peso.disabled = true
    estado.disabled = true
    visitas_t.disabled = true
    vacunas.disabled = true
    prox_vac.disabled = true
    prox_vac_f.disabled = true
    ult_vac.disabled = true
    tratamiento.disabled = true
    cirugias.disabled = true
    cond.disabled = true
}

function reiniciar_campos(obj){
    for (let i=0 ; i<obj.length ; i++){
        if (id.value == obj[i].id){
            nombre.value = obj[i].nombre
            edad.value = obj[i].edad
            peso.value = obj[i].peso
            estado.value = obj[i].estado
            visitas_t.value = obj[i].visitas_realizadas
            vacunas.value = obj[i].vacunas
            prox_vac.value = obj[i].proxima_vacuna
            prox_vac_f.value = obj[i].fecha_proxima_vacuna
            ult_vac.value = obj[i].ultima_vacuna
            tratamiento.value = obj[i].tratamientos
            cirugias.value = obj[i].cirugias
        }
    }
}

function verificar(){
    if (nombre.value && edad.value && peso.value && estado.value && visitas_t.value
        && vacunas.value && prox_vac.value && prox_vac_f.value && ult_vac.value
        && tratamiento.value && cirugias.value){
        return true
    }else{
        alert("Uno de los campos no está completo, por favor rellene los campos correctamente")
        return false
    }
}

function solicitar_contra(){
    tapar.style.visibility = "visible"
    pantalla.style.visibility = "visible"
}

function ocultar_contra(){
    tapar.style.visibility = "hidden"
    pantalla.style.visibility = "hidden"
    error.style.visibility = "hidden"
    entrada.classList.remove("c-err-brdr")
    entrada.value = ""
}

regreso.addEventListener('click', function(){
    contenedor_info.style.visibility = "hidden"
    contenedor_m.style.visibility = "visible"
    guardar.style.visibility = "hidden"
    cancelar.style.visibility = "hidden"
})

editar.addEventListener('click', function(){
    mostrar_botones()
    abrir_campos()
})

guardar.addEventListener('click', function(){
    if (verificar()){
        cerrar_campos()
        solicitar_contra()
    }
})

entrada.addEventListener('keypress', async function(evento){
    if (evento.key =='Enter'){
            if(entrada.value == u.password){
                const fecha = new Date()
                const año = fecha.getFullYear()
                const mes = fecha.getMonth()
                const dia = fecha.getDay()
                const datosJSON = {
                    "idUser": u.idUser,
                    "idVet": u.idVet || 0, // o el valor adecuado
                    "name": nombre.value,
                    "age": edad.value,
                    "species": especie.value,
                    "sex": sexo.value,
                    "weight": peso.value,
                    "photo": img.src,
                    "numVisit": parseInt(visitas_t.value),
                    "vaccines": vacunas.value,
                    "nextVaccine": prox_vac.value,
                    "nextVaccineDate": prox_vac_f.value,
                    "surgeries": cirugias.value,
                    "condicion": cond.value,
                    "lastVisit": `${año}-${mes}-${dia}`, // Aquí pon la última visita si la tienes
                    "state": estado.value,
                    "treatment": tratamiento.value,
                    "lastVaccines": ult_vac.value,
                    "race": raza.value,
                    "idPet": selec
                }
                await actualizarMascota(datosJSON)
                if(u.titulos){
                    window.location.href = "/Html/integrador/Sesion/Iniciada/VistasVet/Hogar/Mascotas.html"
                    }else{
                    window.location.href = "/Html/integrador/Sesion/Iniciada/VistasUsuario/Hogar/Mascotas.html"
                }
            }else{
                error.style.visibility = "visible"
                entrada.classList.add("c-err-brdr")
            }
    }
})

cancelar.addEventListener('click', function(){
    esconder_botones()
    cerrar_campos()
})
let selec
async function obtenerMascotasPorUsuario(idUser) {
    try {
        // 1. Obtener las mascotas
        const mascotasResponse = await fetch(`http://localhost:7000/pets/${idUser}`);
        if (!mascotasResponse.ok) {
            throw new Error(`Error al obtener mascotas: ${mascotasResponse.status}`);
        }
        const mascotas = await mascotasResponse.json();

        const vacunasResponse = await fetch("http://localhost:7000/vaccines");
        if (!vacunasResponse.ok) {
            throw new Error(`Error al obtener vacunas: ${vacunasResponse.status}`);
        }
        const vacunas = await vacunasResponse.json();

        const relResponse = await fetch("http://localhost:7000/vaccineRelRoutes");
        if (!relResponse.ok) {
            throw new Error(`Error al obtener relaciones: ${relResponse.status}`);
        }
        const relaciones = await relResponse.json();

        const mascotasConVacunas = mascotas.map(mascota => {
            const vacunasRelacionadas = relaciones
                .filter(rel => rel.idPet === mascota.idPet)
                .map(rel => {
                    const vacuna = vacunas.find(v => v.idVaxx === rel.idVaccine);
                    return vacuna ? vacuna.vacuna : null;
                })
                .filter(Boolean);

            return {
                ...mascota,
                vacunas: vacunasRelacionadas
            };
        });

        mascotasConVacunas.forEach(mascota => {
            crearCartas(mascota);
        });

    } catch (error) {
        console.error('Error en la solicitud: ', error);
    }
}

async function actualizarMascota(data) {
    try {
        const response = await fetch("http://localhost:7000/pet", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error("Error al actualizar la mascota");
        }

        console.log("Mascota actualizada correctamente");
        // Redirigir o recargar la lista
        ocultar_contra();
        esconder_botones();

    } catch (error) {
        console.error("Error:", error);
        alert("Ocurrió un error al actualizar la mascota");
    }
}

async function eliminarMascota(id) {
  try {
    const res = await fetch(`http://localhost:7000/pet/${id}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" }
    });

    if (!res.ok) {
      throw new Error(`Error ${res.status}: No se pudo eliminar la mascota`);
    }

    console.log(`Mascota con ID ${id} eliminada exitosamente.`);
  } catch (e) {
    console.error("Ocurrió un error al eliminar la mascota:", e);
  }
}

obtenerMascotasPorUsuario(u.idUser)
