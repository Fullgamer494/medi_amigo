const sesion = localStorage.getItem("login")
const u = JSON.parse(sesion)

const nombre = document.getElementById("nombre")
const ubi = document.getElementById("ubi")
const num = document.getElementById("num")

const foto = document.getElementById("foto")
const fotoPreview = document.getElementById("foto-preview")

const rfc = document.getElementById("rfc")
const rfcPreview = document.getElementById("rfc-preview")

const info = document.getElementById("info")
const contra = document.getElementById("contra")
const contraErr = document.getElementById("err")

const form = document.getElementById("formulario")

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

rfc.addEventListener('change', function(){
    mostrarImagen(rfcPreview, rfc, "preview-cons", 2)
})

foto.addEventListener('change', function(){
    mostrarImagen(fotoPreview, foto, "preview-cons", 1)
})

form.addEventListener('submit', async function(evento){
    evento.preventDefault()
    if (validar()){
        let data = {
            "idVet":u.idVet,
            "name":nombre.value,
            "description":info.value,
            "directory":ubi.value
        }

        enviarClinica(data)
        window.location.href = "/Html/integrador/Sesion/Iniciada/VistasVet/Hogar/Clinicas.html"
    }
})

async function enviarClinica(data) {

    try {
        const response = await fetch('http://localhost:7000/establishment', {
            method: 'POST',
            headers:{"content-type":"application/json"},
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error("Error al crear el establecimiento");
        }
        
    } catch (error) {
        console.error('Error al crear la clínica:', error);
    }
}