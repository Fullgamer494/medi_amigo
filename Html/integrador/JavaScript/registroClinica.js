const sesion = localStorage.getItem("login")

// Verificar que existe la sesión
if (!sesion || sesion === "null") {
    alert("No hay sesión activa")
    window.location.href = "/Html/integrador/index.html"
}

const u = JSON.parse(sesion)

// Verificar que el usuario tiene los datos necesarios
if (!u || !u.idVet) {
    alert("Error: Usuario no es veterinario o datos incompletos")
    console.error("Datos de usuario:", u)
    window.location.href = "/Html/integrador/Sesion/Iniciada/VistasVet/Hogar/Mascotas.html"
}

const nombre = document.getElementById("nombre")
const num = document.getElementById("num")

const foto = document.getElementById("foto")
const fotoPreview = document.getElementById("foto-preview")

const rfc = document.getElementById("rfc")
const rfcPreview = document.getElementById("rfc-preview")

const info = document.getElementById("info")
const contra = document.getElementById("contra")
const contraErr = document.getElementById("err")

const form = document.getElementById("formulario")

// =================== NUEVO: Manejo dinámico de ubicaciones ===================

const ubicacionesContainer = document.getElementById('ubicaciones-container')
const btnAgregarUbicacion = document.getElementById('agregar-ubicacion')

if (btnAgregarUbicacion) {
    btnAgregarUbicacion.addEventListener('click', () => {
        const nuevaUbicacion = document.createElement('div')
        nuevaUbicacion.classList.add('ubicacion-item')

        nuevaUbicacion.innerHTML = `
            <input type="text" name="ubicacion[]" placeholder="Ubicación adicional" required>
            <button type="button" class="eliminar-ubicacion">X</button>
        `
        ubicacionesContainer.appendChild(nuevaUbicacion)

        nuevaUbicacion.querySelector('.eliminar-ubicacion').addEventListener('click', () => {
            ubicacionesContainer.removeChild(nuevaUbicacion)
        })
    })
}

// ============================================================================

function mostrarImagen(id, ref, clase, ida){
    var archivo = ref.files[0]
    if (archivo){
        var lectorArchivo = new FileReader()
        lectorArchivo.readAsDataURL(archivo)
        lectorArchivo.addEventListener('load', function(){
            id.style.display = 'block'
            id.innerHTML ='<br><p>Vista previa de la imagen:</p> <img src="' + this.result + '" class="'+clase+'" id="' + ida +'" />'
        })
    }
}

function validar(){
    if (contra.value == u.password){
        contra.classList.remove("c-err-brdr")
        contraErr.style.visibility = "hidden"
        return true
    } else {
        contra.classList.add("c-err-brdr")
        contraErr.style.visibility = "visible"
        return false
    }
}

if (rfc) {
    rfc.addEventListener('change', function(){
        mostrarImagen(rfcPreview, rfc, "preview-cons", 2)
    })
}

if (foto) {
    foto.addEventListener('change', function(){
        mostrarImagen(fotoPreview, foto, "preview-cons", 1)
    })
}

if (form) {
    form.addEventListener('submit', async function(evento){
        evento.preventDefault()
        
        console.log("Iniciando proceso de creación de clínica...")
        console.log("Datos del usuario:", u)
        
        if (validar()){
            // Obtener todas las ubicaciones
            const ubicacionesInputs = document.querySelectorAll('input[name="ubicacion[]"]')
            const ubicaciones = Array.from(ubicacionesInputs).map(input => input.value.trim()).filter(val => val !== "")

            if (!nombre.value || ubicaciones.length === 0 || !info.value) {
                alert("Por favor, complete todos los campos obligatorios")
                return
            }

            let data = {
                "idVet": u.idVet,
                "name": nombre.value,
                "description": info.value,
                "directory": ubicaciones // Enviamos como arreglo
            }

            console.log("Datos a enviar:", data)
            
            try {
                await enviarClinica(data)
                alert("Clínica creada exitosamente")
                window.location.href = "/Html/integrador/Sesion/Iniciada/VistasVet/Hogar/Clinicas.html"
            } catch (error) {
                console.error("Error al crear clínica:", error)
                alert("Error al crear la clínica: " + error.message)
            }
        }
    })
}

async function enviarClinica(data) {
    try {
        console.log("Enviando datos de clínica:", data)
        
        // Verificar conectividad primero
        console.log("Verificando conectividad al servidor...")
        
        const response = await fetch('http://localhost:7000/establishment', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(data)
        });
        
        console.log("Respuesta del servidor:", response.status, response.statusText)
        
        // Obtener el texto de respuesta
        const responseText = await response.text()
        console.log("Texto de respuesta:", responseText)
        
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${responseText}`)
        }
        
        // Intentar parsear como JSON si hay contenido
        let resultado = null
        if (responseText.trim()) {
            try {
                resultado = JSON.parse(responseText)
                console.log("Clínica creada exitosamente:", resultado)
            } catch (parseError) {
                console.warn("Respuesta no es JSON válido:", responseText)
                resultado = { message: "Clínica creada", data: responseText }
            }
        }
        
        return resultado
        
    } catch (error) {
        console.error('Error detallado al crear la clínica:', error)
        
        // Proporcionar más información sobre el tipo de error
        if (error instanceof TypeError && error.message.includes('NetworkError')) {
            throw new Error("Error de red: No se puede conectar al servidor. Verifique que el servidor esté ejecutándose en localhost:7000")
        } else if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
            throw new Error("Error de conexión: Posible problema de CORS o servidor no disponible")
        } else {
            throw error
        }
    }
}

// Función para verificar la conectividad del servidor
async function verificarServidor() {
    try {
        const response = await fetch('http://localhost:7000/establishment/all', {
            method: 'GET',
            headers: {
                "Accept": "application/json"
            }
        });
        
        if (response.ok) {
            console.log("✅ Servidor conectado correctamente")
            return true
        } else {
            console.warn("⚠️ Servidor responde pero con error:", response.status)
            return false
        }
    } catch (error) {
        console.error("❌ Error de conectividad al servidor:", error)
        return false
    }
}

// Verificar conectividad al cargar la página
document.addEventListener('DOMContentLoaded', async function() {
    console.log("Verificando conectividad al servidor...")
    const conectado = await verificarServidor()
    
    if (!conectado) {
        console.warn("No se pudo conectar al servidor")
    }
})
