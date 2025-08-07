const nombre = document.getElementById("nombre")
const tel = document.getElementById("tel")
const correo = document.getElementById("correo")
const contra = document.getElementById("contra")
const error_contra = document.getElementById("c-err")


function validar(obj){

    if(nombre.value == obj.nombre || correo.value == obj.correo || tel.value == obj.telefono){
        
        if(contra.value == obj.contra){
            contra.classList.remove("c-err-brdr")
            error_contra.style.visibility = "hidden"
            return true
        }else{
            if (contra.value){
                contra.classList.add("c-err-brdr")
                error_contra.innerText = "Contraseña equivocada. Intente de nuevo."
                error_contra.style.visibility = "visible"
                return false
            }else{
                contra.classList.add("c-err-brdr")
                error_contra.innerText = "Ingrese su contraseña."
                error_contra.style.visibility = "visible"
                return false
            }
        }

    }
    
    return false
}

function campos_vacios(){
    alert("Rellene al menos uno de los campos.")
}

function no_encontrado(){
    alert("No se encontró el usuario que buscaste.")
}

function validartodo(obj){
    let v = false
    if (nombre.value || tel.value || correo.value){
            for (let i=0 ; i<obj.length ; i++){
                if (validar(obj[i])){
                    return true
                }
            }
            console.log(v)
    }else{
        campos_vacios()
    }
}

const val = document.getElementById("form")
val.addEventListener('submit', function(evento){
    evento.preventDefault()
    contra.classList.remove("c-err-brdr")
    error_contra.style.visibility = "hidden"
    
    if (validartodo(usuarios)){
    }
    
})