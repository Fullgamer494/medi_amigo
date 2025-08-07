const sesion = localStorage.getItem("login")
const u = JSON.parse(sesion)

let usuario = []
let vet = []
let clinica = []
let clinicaHecho = []
let veterinario = []

let selec

// Elementos para el dropdown de ubicaciones
const ubicacionesHeader = document.getElementById("ubicacionesHeader");
const ubicacionesContent = document.getElementById("ubicacionesContent");
const ubicacionesArrow = document.getElementById("ubicacionesArrow");
const ubicacionesTexto = document.getElementById("ubicacionesTexto");

let isUbicacionesExpanded = false;

// Función para inicializar el desplegable de ubicaciones
function initializeUbicacionesDropdown() {
    if (!ubicacionesHeader) return; // Verificar que el elemento existe
    
    ubicacionesHeader.addEventListener('click', function() {
        if (ubicacionesHeader.classList.contains('disabled')) return;
        
        isUbicacionesExpanded = !isUbicacionesExpanded;
        
        if (isUbicacionesExpanded) {
            ubicacionesContent.classList.add('expanded');
            ubicacionesArrow.classList.add('rotated');
        } else {
            ubicacionesContent.classList.remove('expanded');
            ubicacionesArrow.classList.remove('rotated');
        }
    });
}

// Función para poblar las ubicaciones en el desplegable
function poblarUbicacionesDropdown(ubicaciones) {
    if (!ubicacionesContent || !ubicacionesTexto) return;
    
    ubicacionesContent.innerHTML = '';
    
    if (!ubicaciones || ubicaciones.length === 0) {
        const item = document.createElement('div');
        item.classList.add('ubicacion-item');
        item.textContent = 'No hay ubicaciones disponibles';
        item.style.color = '#999';
        item.style.fontStyle = 'italic';
        ubicacionesContent.appendChild(item);
        ubicacionesTexto.textContent = 'Sin ubicaciones';
        return;
    }
    
    ubicaciones.forEach(ubicacion => {
        const item = document.createElement('div');
        item.classList.add('ubicacion-item');
        item.textContent = ubicacion;
        ubicacionesContent.appendChild(item);
    });
    
    ubicacionesTexto.textContent = `Ver ubicaciones (${ubicaciones.length})`;
}

async function traerDatos() {
    try {
        const res = await fetch("http://localhost:7000/users")
            .then(res => res.json())
            .then(data => {
                usuario = data
            });

        const vets = await fetch("http://localhost:7000/veterinary")
            .then(res => res.json())
            .then(data => {
                vet = data
            });

        const clinicas = await fetch("http://localhost:7000/establishment/all")
            .then(res => res.json())
            .then(data => {
                clinica = data
            });

        for (let i = 0; i < clinica.length; i++) {
            for (let j = 0; j < vet.length; j++) {
                if ((clinica[i].idVet == vet[j].idVet) && (vet[j].idUser == u.idUser)) {

                    // Obtener ubicaciones específicas para esta clínica
                    let ubicaciones = [];
                    let direccionTexto = "No disponible";
                    
                    try {
                        const resUbi = await fetch(`http://localhost:7000/location/establishment/${clinica[i].idLocal}`);
                        if (resUbi.ok) {
                            const ubicacionesData = await resUbi.json();
                            ubicaciones = ubicacionesData.map(u => u.nombre_ubicacion);
                            direccionTexto = ubicaciones.join(", ");
                        }
                    } catch (e) {
                        console.error(`Error trayendo ubicación de local ${clinica[i].idLocal}:`, e);
                    }

                    let clinicaCompleta = {
                        "idUser": u.idUser,
                        "idVet": vet[j].idVet,
                        "idLocal": clinica[i].idLocal,
                        "foto": u.foto,
                        "name": clinica[i].name,
                        "especialidad": vet[j].especialidad,
                        "calificacion": clinica[i].calificacion,
                        "email": u.email,
                        "phoneNumber": u.phoneNumber,
                        "disponibilidad": vet[j].disponibilidad,
                        "descripcion": clinica[i].description,
                        "direccion": direccionTexto,
                        "ubicaciones": ubicaciones // Agregar array de ubicaciones
                    }

                    clinicaHecho.push(clinicaCompleta);
                }
            }
        }

        for (let i = 0; i < clinicaHecho.length; i++) {
            crearCartas(clinicaHecho[i]);
        }

        // Inicializar el dropdown después de cargar los datos
        initializeUbicacionesDropdown();

    } catch (e) {
        console.log("Error:" + e);
    }
}

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

traerDatos()

const contenedor = document.getElementById("contenedor")

const contenedor_info = document.getElementById("contenedor-info")
contenedor_info.style.gridTemplateColumns = "1fr"
contenedor_info.style.visibility = "hidden"

const tapar = document.getElementById("cubrir-pantalla")
tapar.style.background = "rgba(255, 255, 255, 0.3)"
tapar.style.backdropFilter = "blur(10px)";
tapar.style.visibility = "hidden"
tapar.addEventListener('click', function(){
    tapar.style.visibility = "hidden"
    eliminacion.style.visibility = "hidden"
    pantalla.style.visibility = "hidden"
    pantalla_elim.style.visibility = "hidden"
    cerrar_campos()
})

const eliminacion = document.getElementById("eliminarcuenta")
const botonConfirmacion = document.getElementById("eliminar")
const botonRegresar = document.getElementById("noeliminar")

const pantalla = document.getElementById("confirmarcontra")
const pantalla_elim = document.getElementById("confirmarcontraelim")
const entrada = document.getElementById("contra")
const error = document.getElementById("c-err")

const img = document.getElementById("img")
const nombre = document.getElementById("nombre")
// const lugar = document.getElementById("lugar") // Ya no se usa
const espec = document.getElementById("espec")
const calif = document.getElementById("calif")
const horario = document.getElementById("horario")
const num = document.getElementById("num")
const correo = document.getElementById("correo")
const desc = document.getElementById("desc")
desc.disabled = true

const guardar = document.getElementById("b-g")
const cancelar = document.getElementById("b-c")
const regreso = document.getElementById("b-r")
const editar = document.getElementById("b-e")
const eliminar = document.getElementById("b-eli")

const botonCrear = document.getElementById("añadir")

function crearCartas(obj){
    const carta = document.createElement("div")
    carta.classList.add("establecimiento-carta")
    contenedor.insertBefore(carta,botonCrear)

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

    añadirDatos(obj, info, "Nombre del establecimiento", "name")
    añadirDatos(obj, info, "Ubicación", "direccion")
    añadirDatos(obj, info, "Especialidad", "especialidad")
    añadirDatos(obj, info, "Calificación", "calificacion")

    const boton = document.createElement("button")
    boton.classList.add("establecimiento-boton")
    boton.innerText = "Más información"
    info.appendChild(boton)
    boton.addEventListener('click', function(){
        mostrarClinica(obj)
        selec = obj.idLocal
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

function abrir_campos(){
    nombre.disabled = false
    // lugar.disabled = false // Ya no se usa
    espec.disabled = false
    horario.disabled = false
    num.disabled = false
    correo.disabled = false
    
    // Habilitar el dropdown
    if (ubicacionesHeader) {
        ubicacionesHeader.classList.remove('disabled');
    }
}

function mostrar_botones(){
    guardar.style.visibility = "visible"
    cancelar.style.visibility = "visible"
    eliminar.style.visibility ="visible"
}

function esconder_botones(){
    guardar.style.visibility = "hidden"
    cancelar.style.visibility = "hidden"
    eliminar.style.visibility = "hidden"
}

function cerrar_campos(){
    nombre.disabled = true
    // lugar.disabled = true // Ya no se usa
    espec.disabled = true
    calif.disabled = true
    horario.disabled = true
    num.disabled = true
    correo.disabled = true
    
    // Deshabilitar el dropdown y cerrarlo
    if (ubicacionesHeader && ubicacionesContent && ubicacionesArrow) {
        ubicacionesHeader.classList.add('disabled');
        ubicacionesContent.classList.remove('expanded');
        ubicacionesArrow.classList.remove('rotated');
        isUbicacionesExpanded = false;
    }
}

function verificar(){
    if (nombre.value && espec.value && calif.value && horario.value
        && num.value && correo.value){
        return true
    }else{
        alert("Uno de los campos no está completo, por favor rellene los campos correctamente")
        return false
    }
}

function mostrarClinica(obj){
    contenedor.style.visibility = "hidden"

    nombre.value = obj.name
    // lugar.value = obj.direccion // Ya no se usa
    espec.value = obj.especialidad
    calif.value = obj.calificacion
    horario.value = obj.disponibilidad
    num.value = obj.phoneNumber
    correo.value = obj.email
    desc.value = obj.descripcion

    // Poblar el dropdown de ubicaciones
    poblarUbicacionesDropdown(obj.ubicaciones || []);

    contenedor_info.style.visibility = "visible"
}

function solicitar_contra(){
    tapar.style.visibility = "visible"
    pantalla.style.visibility = "visible"
}

regreso.addEventListener('click', function(){
    contenedor_info.style.visibility = "hidden"
    contenedor.style.visibility = "visible"
    esconder_botones()
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
                let data = {
                    "name":nombre.value,
                    "description":desc.value,
                    "directory":"", // Puedes ajustar esto según tus necesidades
                    "idLocal":selec
                }

                await actualizarClinica(data)
                window.location.href = "/Html/integrador/Sesion/Iniciada/VistasVet/Hogar/Clinicas.html"
            }else{
                error.style.visibility = "visible"
                entrada.classList.add("c-err-brdr")
            }
    }
})

eliminar.addEventListener('click', function(){
    guardar.style.visibility = 'hidden'
    cancelar.style.visibility = "hidden"
    eliminar.style.visibility = "hidden"
    tapar.style.visibility = "visible"
    eliminacion.style.visibility = "visible"
})

botonRegresar.addEventListener('click', function(){
    tapar.style.visibility = "hidden"
    eliminacion.style.visibility = "hidden"
    cerrar_campos()
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
            contra_elim.value = ""
            contenedor.style.visibility = "visible"
            contenedor_info.style.visibility = "hidden"
            await eliminarClinica(selec)
            window.location.href = "/Html/integrador/Sesion/Iniciada/VistasVet/Hogar/Clinicas.html"
        }else{
            error_elim.style.visibility = "visible"
            contra_elim.classList.add("c-err-brdr")
        }
    }
})

function ocultar_contra(){
    tapar.style.visibility = "hidden"
    pantalla.style.visibility = "hidden"
    error.style.visibility = "hidden"
    entrada.classList.remove("c-err-brdr")
    entrada.value = ""
}

function reiniciar_campos(obj){
    for (let i=0 ; i<obj.length ; i++){
        if (id.value == obj[i].Id){
            nombre.value = obj[i].Establecimiento
            // lugar.value = obj[i].Ubicación // Ya no se usa
            espec.value = obj[i].Especialidad
            calif.value = obj[i].Calificación
            horario.value = obj[i].Horario
            num.value = obj[i].Número_telefónico
            correo.value = obj[i].Correo
        }
    }
}

cancelar.addEventListener('click', function(){
    esconder_botones()
    cerrar_campos()
})

async function eliminarClinica(id) {
  try {
    const res = await fetch(`http://localhost:7000/establishment/${id}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" }
    });

    if (!res.ok) {
      throw new Error(`Error ${res.status}: No se pudo eliminar la clínica`);
    }

    console.log(`Clinica con ID ${id} eliminada exitosamente.`);
  } catch (e) {
    console.error("Ocurrió un error al eliminar la clínica:", e);
  }
}

async function actualizarClinica(data) {
    try {
    const res = await fetch(`http://localhost:7000/establishment`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      throw new Error(`Error ${res.status}: No se pudo editar la clínica`);
    }

    console.log(`Clinica con ID ${data.idLocal} editada exitosamente.`);
  } catch (e) {
    console.error("Ocurrió un error al editar la clínica:", e);
  }
}