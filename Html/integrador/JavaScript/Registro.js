let usuario = []
let vet = []
let veterinario = []

async function traerDatos() {
    try {
        // Obtener usuarios
        const resUsers = await fetch("http://localhost:7000/users")
        if (!resUsers.ok) {
            throw new Error(`Error al obtener usuarios: ${resUsers.status}`)
        }
        usuario = await resUsers.json()

        // Obtener veterinarios
        const resVets = await fetch("http://localhost:7000/veterinary")
        if (!resVets.ok) {
            throw new Error(`Error al obtener veterinarios: ${resVets.status}`)
        }
        vet = await resVets.json()

        // Limpiar array de veterinarios antes de rellenarlo
        veterinario = []
        
        // Combinar datos de usuarios y veterinarios
        for (let i = 0; i < vet.length; i++) {
            for (let j = 0; j < usuario.length; j++) {
                if (vet[i].idUser == usuario[j].idUser) {
                    let vetCompleto = {
                        "idUser": usuario[j].idUser,
                        "idVet": vet[i].idVet,
                        "foto": usuario[j].foto,
                        "name": usuario[j].name,
                        "especialidad": vet[i].especialidad,
                        "email": usuario[j].email,
                        "phoneNumber": usuario[j].phoneNumber,
                        "password": usuario[j].password,
                        "titulos": vet[i].titulos,
                        "universidad": vet[i].universidad,
                        "disponibilidad": vet[i].disponibilidad,
                        "descripcion": vet[i].descripcion
                    }
                    veterinario.push(vetCompleto)
                }
            }
        }
    } catch (e) {
        console.error("Error en traerDatos:", e)
        throw e // Re-lanzar el error para manejarlo en el código que llama
    }
}

// Elementos del DOM
const nombre = document.getElementById("nombre")
const correo = document.getElementById("correo")
const pfp = document.getElementById("pfp")
const tel = document.getElementById("tel")
const universidad = document.getElementById("uni")
const titulos = document.getElementById("titulos")
const constancia = document.getElementById("constancia")
const desc = document.getElementById("desc")
const esp = document.getElementById("especialidad")
const horario = document.getElementById("horario") // ¡Faltaba esta línea!
var pwd = document.getElementById("contra")
var pwd_c = document.getElementById("conf-contra")
var btn_sbmt = document.getElementById("btn_submit")

async function postDatos(datos) {
    try {
        console.log("Enviando datos de usuario:", datos) // Debug
        
        const URL = "http://localhost:7000/users"
        const res = await fetch(URL, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(datos)
        })
        
        console.log("Respuesta del servidor:", res.status, res.statusText)
        
        // Obtener el texto de respuesta primero
        const responseText = await res.text()
        console.log("Texto de respuesta:", responseText)
        
        if (!res.ok) {
            console.error("Error del servidor:", responseText)
            throw new Error(`Error ${res.status}: ${responseText}`)
        }
        
        // Intentar parsear como JSON solo si hay contenido
        let resultado = null
        if (responseText.trim()) {
            try {
                resultado = JSON.parse(responseText)
                console.log("Usuario creado exitosamente:", resultado)
            } catch (parseError) {
                console.warn("Respuesta no es JSON válido:", responseText)
                resultado = { message: "Usuario creado", data: responseText }
            }
        }
        
        return resultado
        
    } catch (e) {
        console.error("Error en postDatos:", e)
        throw e
    }
}

async function postDatosVet(datos) {
    try {
        console.log("Enviando datos de veterinario:", datos) // Debug
        
        const URL = "http://localhost:7000/veterinarys"
        const res = await fetch(URL, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(datos)
        })
        
        console.log("Respuesta del servidor (vet):", res.status, res.statusText)
        
        // Obtener el texto de respuesta primero
        const responseText = await res.text()
        console.log("Texto de respuesta (vet):", responseText)
        
        if (!res.ok) {
            console.error("Error del servidor:", responseText)
            throw new Error(`Error ${res.status}: ${responseText}`)
        }
        
        // Intentar parsear como JSON solo si hay contenido
        let resultado = null
        if (responseText.trim()) {
            try {
                resultado = JSON.parse(responseText)
                console.log("Veterinario creado exitosamente:", resultado)
            } catch (parseError) {
                console.warn("Respuesta no es JSON válido:", responseText)
                resultado = { message: "Veterinario creado", data: responseText }
            }
        }
        
        return resultado
        
    } catch (e) {
        console.error("Error en postDatosVet:", e)
        throw e
    }
}

// Event listeners para previsualización de imágenes
if (pfp) {
    pfp.addEventListener('change', function() {
        mostrarImagen("pfp-preview", pfp, "preview-pfp")
    })
}

function mostrarImagen(id, ref, clase) {
    var mostrado = document.getElementById(id)
    var archivo = ref.files[0]
    if (archivo) {
        var lectorArchivo = new FileReader()
        lectorArchivo.readAsDataURL(archivo)
        lectorArchivo.addEventListener('load', function() {
            mostrado.style.display = 'block'
            mostrado.innerHTML = '<br><p>Vista previa de la imagen:</p> <img src="' + this.result + '" class="' + clase + '" />'
        })
    }
}

if (constancia) {
    constancia.addEventListener('change', function() {
        mostrarImagen("constancia-preview", constancia, "preview-cons")
    })
}

// Función de validación de contraseñas corregida
function validatePassword() {
    if (pwd && pwd_c) {
        if (pwd.value !== pwd_c.value) {
            pwd_c.setCustomValidity("Las contraseñas no son iguales.")
        } else {
            pwd_c.setCustomValidity('')
        }
    }
}

// Event listeners corregidos
if (pwd) {
    pwd.onchange = validatePassword // ✅ Sin paréntesis
}
if (pwd_c) {
    pwd_c.oninput = validatePassword // ✅ Mejor usar oninput
}

if (btn_sbmt) {
    btn_sbmt.addEventListener('click', function() {
        validatePassword()
    })
}

// Función principal de envío corregida
document.onsubmit = async function(event) {
    event.preventDefault()
    
    try {
        // Validar contraseñas antes de enviar
        if (pwd.value !== pwd_c.value) {
            alert("Las contraseñas no coinciden")
            return
        }

        // Validar campos obligatorios
        if (!nombre.value || !correo.value || !tel.value || !pwd.value) {
            alert("Por favor, complete todos los campos obligatorios")
            return
        }

        const data = {
            "foto": "/Html/integrador/imagenes/empty-pfp.webp",
            "name": nombre.value,
            "password": pwd.value,
            "email": correo.value,
            "phoneNumber": tel.value
        }

        console.log("Intentando crear usuario...")
        
        // Crear usuario
        const usuarioCreado = await postDatos(data)
        
        // Actualizar datos locales
        await traerDatos()
        
        // Buscar el usuario recién creado
        let nuevo = null
        for (let i = 0; i < usuario.length; i++) {
            if (usuario[i].name === data.name && usuario[i].email === data.email) {
                nuevo = usuario[i]
                break
            }
        }

        if (!nuevo) {
            throw new Error("No se pudo encontrar el usuario recién creado")
        }

        console.log("Usuario encontrado:", nuevo)

        // Si es registro de veterinario
        if (desc && esp && universidad && titulos && horario) {
            console.log("Registrando como veterinario...")
            
            const dataVet = {
                "idUser": nuevo.idUser,
                "comprobante": "",
                "especialidad": esp.value,
                "disponibilidad": horario.value,
                "titulos": titulos.value,
                "universidad": universidad.value,
                "descripcion": desc.value
            }

            await postDatosVet(dataVet)
            await traerDatos()

            // Buscar el veterinario completo
            let vetCompleto = null
            for (let i = 0; i < veterinario.length; i++) {
                if (veterinario[i].idUser === nuevo.idUser) {
                    vetCompleto = veterinario[i]
                    break
                }
            }

            if (vetCompleto) {
                localStorage.setItem("login", JSON.stringify(vetCompleto))
                window.location.href = "/Html/integrador/Sesion/Iniciada/VistasVet/Hogar/Mascotas.html"
            } else {
                throw new Error("No se pudo crear el perfil de veterinario")
            }
        } else {
            // Registro de usuario normal
            console.log("Registrando como usuario normal...")
            localStorage.setItem("login", JSON.stringify(nuevo))
            window.location.href = "/Html/integrador/Sesion/Iniciada/VistasUsuario/Hogar/Mascotas.html"
        }

    } catch (error) {
        console.error("Error durante el registro:", error)
        alert("Error durante el registro: " + error.message)
    }
}