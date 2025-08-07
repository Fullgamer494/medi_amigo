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

// =================== MANEJO DINÁMICO DE UBICACIONES ===================

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

            try {
                // PASO 1: Crear el establecimiento PRIMERO
                console.log("Creando establecimiento...")
                const establishmentData = {
                    "idVet": u.idVet,
                    "name": nombre.value,
                    "description": info.value
                }
                
                const idLocal = await crearEstablecimiento(establishmentData)
                console.log("Establecimiento creado con ID:", idLocal)
                
                // VALIDAR que tenemos el ID antes de continuar
                if (!idLocal || idLocal <= 0) {
                    throw new Error("No se pudo obtener el ID del establecimiento creado")
                }
                
                // PASO 2: Crear las ubicaciones DESPUÉS, una por una (no en paralelo)
                console.log("Creando ubicaciones secuencialmente...")
                await crearUbicacionesSecuencial(idLocal, ubicaciones)
                console.log("Ubicaciones creadas exitosamente")
                
                alert("Clínica creada exitosamente")
                window.location.href = "/Html/integrador/Sesion/Iniciada/VistasVet/Hogar/Clinicas.html"
                
            } catch (error) {
                console.error("Error al crear clínica:", error)
                alert("Error al crear la clínica: " + error.message)
            }
        }
    })
}

// =================== FUNCIÓN CORREGIDA ===================
async function crearEstablecimiento(data) {
    try {
        console.log("Enviando datos de establecimiento:", data)
        
        const response = await fetch('http://localhost:7000/establishment', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(data)
        });
        
        console.log("Respuesta del servidor (establishment):", response.status, response.statusText)
        
        // Obtener el texto de la respuesta primero
        const responseText = await response.text()
        console.log("Texto de respuesta completo:", responseText)
        
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${responseText}`)
        }
        
        // Verificar si la respuesta está vacía
        if (!responseText || responseText.trim() === '') {
            throw new Error("El servidor devolvió una respuesta vacía")
        }
        
        // Intentar parsear como JSON
        let resultado;
        try {
            resultado = JSON.parse(responseText)
            console.log("Respuesta JSON (establishment):", resultado)
            
            // Buscar el idLocal en diferentes propiedades posibles del objeto
            const idLocal = resultado.idLocal || resultado.id || resultado.localId || 
                           resultado.establishmentId || resultado.establishment_id;
            
            if (idLocal && idLocal > 0) {
                console.log("✅ ID del establecimiento obtenido:", idLocal)
                return idLocal
            }
            
            // Si no encontramos el ID en las propiedades esperadas, mostrar el objeto completo
            console.error("Objeto establecimiento completo:", resultado)
            console.error("Propiedades disponibles:", Object.keys(resultado))
            
            // Preguntar al usuario qué propiedad contiene el ID
            const propiedades = Object.keys(resultado).filter(key => 
                typeof resultado[key] === 'number' && resultado[key] > 0
            );
            
            if (propiedades.length === 1) {
                const idEncontrado = resultado[propiedades[0]];
                console.log(`✅ ID encontrado en la propiedad '${propiedades[0]}':`, idEncontrado)
                return idEncontrado;
            } else if (propiedades.length > 1) {
                console.log("Propiedades numéricas encontradas:", propiedades)
                const propiedadElegida = prompt(`Se encontraron varias propiedades numéricas: ${propiedades.join(', ')}.\n¿Cuál contiene el ID del establecimiento?`)
                
                if (propiedadElegida && resultado.hasOwnProperty(propiedadElegida)) {
                    const idEncontrado = resultado[propiedadElegida]
                    console.log(`ID obtenido de la propiedad '${propiedadElegida}':`, idEncontrado)
                    return idEncontrado
                }
            }
            
            throw new Error("No se pudo identificar el ID del establecimiento en la respuesta del servidor")
            
        } catch (parseError) {
            console.error("Error al parsear JSON:", parseError)
            console.error("Texto que causó el error:", responseText)
            
            // Si no es JSON, tal vez sea texto plano con mensaje de éxito
            if (responseText.includes("creado") || responseText.includes("success")) {
                console.log("El servidor devolvió un mensaje de texto en lugar de JSON")
                throw new Error("El servidor creó el establecimiento pero devolvió texto en lugar de JSON. Por favor, verifica tu backend para que devuelva el objeto establecimiento completo.")
            }
            
            throw new Error(`La respuesta del servidor no es JSON válido: ${parseError.message}`)
        }
        
    } catch (error) {
        console.error('Error detallado al crear el establecimiento:', error)
        throw error
    }
}

// NUEVA función: Obtener el último establecimiento creado por un veterinario
async function obtenerUltimoEstablecimiento(idVet) {
    try {
        console.log("Intentando obtener el último establecimiento del veterinario:", idVet)
        
        // Intentar diferentes endpoints para obtener establecimientos
        const posiblesEndpoints = [
            `http://localhost:7000/establishment/vet/${idVet}`,
            `http://localhost:7000/establishment/veterinario/${idVet}`,
            `http://localhost:7000/establishment/by-vet/${idVet}`,
            `http://localhost:7000/establishment/all`
        ];
        
        for (const endpoint of posiblesEndpoints) {
            try {
                console.log(`Probando endpoint: ${endpoint}`)
                
                const response = await fetch(endpoint, {
                    method: 'GET',
                    headers: {
                        "Accept": "application/json"
                    }
                });
                
                if (!response.ok) {
                    console.log(`${endpoint} - Status: ${response.status}`)
                    continue;
                }
                
                const responseText = await response.text()
                console.log(`Respuesta de ${endpoint}:`, responseText)
                
                // Intentar parsear como JSON
                let establecimientos;
                try {
                    establecimientos = JSON.parse(responseText)
                } catch (parseError) {
                    console.log(`No es JSON válido en ${endpoint}`)
                    continue;
                }
                
                // Buscar el establecimiento más reciente
                if (Array.isArray(establecimientos)) {
                    // Filtrar por veterinario si es necesario
                    const establecimientosVet = establecimientos.filter(est => 
                        est.idVet === idVet || est.veterinarioId === idVet || est.vet_id === idVet
                    );
                    
                    const establecimientos_a_usar = establecimientosVet.length > 0 ? establecimientosVet : establecimientos;
                    
                    if (establecimientos_a_usar.length > 0) {
                        // Obtener el último (asumiendo que está al final o tiene el ID más alto)
                        const ultimo = establecimientos_a_usar.reduce((prev, current) => {
                            const prevId = prev.idLocal || prev.id || 0;
                            const currentId = current.idLocal || current.id || 0;
                            return currentId > prevId ? current : prev;
                        });
                        
                        const idLocal = ultimo.idLocal || ultimo.id;
                        if (idLocal) {
                            console.log("✅ Último establecimiento encontrado:", ultimo)
                            return idLocal;
                        }
                    }
                }
                
            } catch (err) {
                console.log(`Error en ${endpoint}:`, err.message)
            }
        }
        
        throw new Error("No se pudo obtener el ID del establecimiento desde ningún endpoint")
        
    } catch (error) {
        console.error("Error al obtener último establecimiento:", error)
        throw error
    }
}
async function crearUbicacionesSecuencial(idLocal, ubicaciones) {
    try {
        console.log(`Creando ${ubicaciones.length} ubicaciones SECUENCIALMENTE para establecimiento ${idLocal}`)
        
        const resultados = []
        
        // Crear ubicaciones UNA POR UNA, esperando que cada una termine antes de la siguiente
        for (let i = 0; i < ubicaciones.length; i++) {
            const ubicacion = ubicaciones[i]
            console.log(`\n--- Creando ubicación ${i + 1}/${ubicaciones.length}: "${ubicacion}" ---`)
            
            const locationData = {
                "IdLocal": idLocal,  // Mayúscula para coincidir con el modelo Java
                "nombre_ubicacion": ubicacion
            }
            
            console.log(`Datos ubicación ${i + 1}:`, locationData)
            
            // VALIDAR datos antes de enviar
            if (!locationData.IdLocal || locationData.IdLocal <= 0) {
                throw new Error(`IdLocal inválido para ubicación "${ubicacion}": ${locationData.IdLocal}`)
            }
            
            if (!locationData.nombre_ubicacion || locationData.nombre_ubicacion.trim() === '') {
                throw new Error(`Nombre de ubicación inválido: "${locationData.nombre_ubicacion}"`)
            }
            
            // ESPERAR a que esta ubicación se cree completamente antes de continuar
            const response = await fetch('http://localhost:7000/location', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(locationData)
            })
            
            console.log(`Respuesta ubicación ${i + 1}:`, response.status, response.statusText)
            
            if (!response.ok) {
                const errorText = await response.text()
                console.error(`Error ubicación ${i + 1}:`, errorText)
                throw new Error(`Error al crear ubicación "${ubicacion}": ${response.status} - ${errorText}`)
            }
            
            const responseData = await response.text()
            console.log(`✅ Ubicación ${i + 1} creada exitosamente:`, responseData)
            resultados.push(responseData)
            
            // Pequeña pausa entre creaciones para evitar problemas de concurrencia
            if (i < ubicaciones.length - 1) {
                await new Promise(resolve => setTimeout(resolve, 100)) // 100ms de pausa
            }
        }
        
        console.log("\n✅ TODAS las ubicaciones creadas exitosamente:", resultados)
        return resultados
        
    } catch (error) {
        console.error('❌ Error al crear ubicaciones secuencialmente:', error)
        throw error
    }
}

// NUEVA función: Verificar qué está devolviendo exactamente el servidor
async function debugearServidor() {
    try {
        console.log("=== DEBUGEANDO SERVIDOR ===")
        
        // Probar diferentes endpoints para ver qué responde el servidor
        const endpoints = [
            'http://localhost:7000/establishment',
            'http://localhost:7000/establishment/all',
            'http://localhost:7000/health', // endpoint común de salud
            'http://localhost:7000/' // endpoint raíz
        ];
        
        for (const endpoint of endpoints) {
            try {
                console.log(`\nProbando endpoint: ${endpoint}`)
                const response = await fetch(endpoint, {
                    method: 'GET',
                    headers: {
                        "Accept": "application/json"
                    }
                });
                
                const text = await response.text()
                console.log(`Status: ${response.status}`)
                console.log(`Content-Type: ${response.headers.get('content-type')}`)
                console.log(`Respuesta: ${text.substring(0, 200)}...`) // Primeros 200 caracteres
                
            } catch (err) {
                console.error(`Error en ${endpoint}:`, err.message)
            }
        }
        
    } catch (error) {
        console.error("Error durante debugging:", error)
    }
}

// NUEVA función: Probar la creación con datos de prueba
async function probarCreacionEstablecimiento() {
    const datosTest = {
        "idVet": u ? u.idVet : 1, // Usar el ID del usuario actual o 1 de prueba
        "name": "Clínica Test",
        "description": "Descripción de prueba"
    }
    
    try {
        console.log("=== PROBANDO CREACIÓN DE ESTABLECIMIENTO ===")
        console.log("Datos de prueba:", datosTest)
        
        const response = await fetch('http://localhost:7000/establishment', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(datosTest)
        });
        
        console.log("Status:", response.status)
        console.log("Headers:", [...response.headers.entries()])
        
        const text = await response.text()
        console.log("Respuesta completa:", text)
        
        if (text.trim() === '') {
            console.error("❌ El servidor devolvió una respuesta vacía")
            return
        }
        
        try {
            const json = JSON.parse(text)
            console.log("✅ JSON parseado correctamente:", json)
        } catch (parseError) {
            console.error("❌ No se pudo parsear como JSON:", parseError.message)
            console.error("Posibles causas:")
            console.error("- El servidor no está funcionando correctamente")
            console.error("- El endpoint no existe o está mal configurado")
            console.error("- El servidor está devolviendo HTML de error")
        }
        
    } catch (error) {
        console.error("Error en la prueba:", error)
    }
}

// Función mejorada para verificar la conectividad del servidor
async function verificarServidor() {
    try {
        console.log("Verificando servidor en http://localhost:7000...")
        
        // Intentar varios endpoints comunes
        const testEndpoints = [
            { url: 'http://localhost:7000/', method: 'GET' },
            { url: 'http://localhost:7000/establishment/all', method: 'GET' },
            { url: 'http://localhost:7000/health', method: 'GET' }
        ];
        
        for (const test of testEndpoints) {
            try {
                const response = await fetch(test.url, {
                    method: test.method,
                    headers: { "Accept": "application/json" }
                });
                
                console.log(`${test.url} - Status: ${response.status}`)
                
                if (response.ok) {
                    console.log("✅ Servidor conectado en:", test.url)
                    return true
                }
            } catch (err) {
                console.log(`${test.url} - Error: ${err.message}`)
            }
        }
        
        console.error("❌ No se pudo conectar al servidor en ningún endpoint")
        return false
        
    } catch (error) {
        console.error("❌ Error general de conectividad:", error)
        return false
    }
}

// Verificar conectividad al cargar la página y ejecutar debug
document.addEventListener('DOMContentLoaded', async function() {
    console.log("=== INICIANDO DIAGNÓSTICO DEL SERVIDOR ===")
    
    const conectado = await verificarServidor()
    
    if (!conectado) {
        console.warn("⚠️ PROBLEMA: No se pudo conectar al servidor")
        console.log("Posibles soluciones:")
        console.log("1. Verificar que el servidor esté ejecutándose en el puerto 7000")
        console.log("2. Verificar que no haya problemas de CORS")
        console.log("3. Verificar la URL del servidor")
        
        // Ejecutar funciones de debug solo si hay problemas
        await debugearServidor()
        
        // Preguntar al usuario si quiere probar la creación
        if (confirm("¿Quieres probar la creación de establecimiento para diagnosticar el problema?")) {
            await probarCreacionEstablecimiento()
        }
    } else {
        console.log("✅ Servidor conectado correctamente")
    }
})