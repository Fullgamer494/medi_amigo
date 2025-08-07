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

const nombre = document.getElementById("nombre")
const correo = document.getElementById("correo")
const pfp = document.getElementById("pfp")
const tel = document.getElementById("tel")
const universidad = document.getElementById("uni")
const titulos = document.getElementById("titulos")
const constancia = document.getElementById("constancia")
const desc = document.getElementById("desc")
const esp = document.getElementById("especialidad")
var pwd = document.getElementById("contra")
var pwd_c = document.getElementById("conf-contra")
var btn_sbmt = document.getElementById("btn_submit")

async function postDatos(datos) {
  try {
    const URL = "http://localhost:7000/users"
    const res = await fetch(URL, {
      method:"POST",
      headers:{"content-type":"application/json"},
      body: JSON.stringify(datos)
    })
    
    if (!res.ok){
      throw new Error(res.status)
    }
  } catch (e) {
    console.error(e)
  }
  
}
async function postDatosVet(datos) {
  try {
    const URL = "http://localhost:7000/veterinary"
    const res = await fetch(URL, {
      method:"POST",
      headers:{"content-type":"application/json"},
      body: JSON.stringify(datos)
    })
    
    if (!res.ok){
      throw new Error(res.status)
    }
  } catch (e) {
    console.error(e)
  }
  
}

if (pfp){
    pfp.addEventListener('change', function(){
        mostrarImagen("pfp-preview", pfp, "preview-pfp")
    })
}

function mostrarImagen(id, ref, clase){
    var mostrado = document.getElementById(id)
    var archivo = ref.files[0]
    if (archivo){
        var lectorArchivo = new FileReader()
        lectorArchivo.readAsDataURL(archivo)
        lectorArchivo.addEventListener('load', function(){
            mostrado.style.display = 'block'
            mostrado.innerHTML ='<br><p>Vista previa de la imagen:</p> <img src="' + this.result + '" class="'+clase+'" />'
        })
    }
}

if (constancia){
    constancia.addEventListener('change', function(){
        mostrarImagen("constancia-preview", constancia, "preview-cons")
    })
}

function validatePassword(){
  if(pwd.value != pwd_c.value) {
    pwd_c.setCustomValidity("Las contraseñas no son iguales.");
  } else {
    pwd_c.setCustomValidity('');
  }
}

pwd.onchange = validatePassword();
pwd_c.onclick = validatePassword();
btn_sbmt.addEventListener('click', function(){
    if(pwd.value != pwd_c.value) {
    pwd_c.setCustomValidity("Las contraseñas no son iguales.");
  } else {
    pwd_c.setCustomValidity('');
  }
})

document.onsubmit = async function(event){
  event.preventDefault()
  if (desc){
    var data = {
      "foto":"/Html/integrador/imagenes/empty-pfp.webp",
      "name":nombre.value,
      "password":pwd.value,
      "email":correo.value,
      "phoneNumber":tel.value
    }

    await postDatos(data)
    await traerDatos()
    let nuevo
    for (let i=0 ; i<usuario.length ; i++){
      if (data.name==usuario[i].name){
        nuevo = usuario[i]
      }
    }
    var dataVet = {
      "idUser":nuevo.idUser,
      "comprobante":"",
      "especialidad":esp.value,
      "disponibilidad":horario.value,
      "titulos":titulos.value,
      "universidad":universidad.value,
      "descripcion":desc.value
    }
    await postDatosVet(dataVet)
    await traerDatos()
    for (let i=0 ; i<veterinario.length ; i++){
      if (data.name==veterinario[i].name){
        localStorage.setItem("login", JSON.stringify(veterinario[i]))
        window.location.href ="/Html/integrador/Sesion/Iniciada/VistasVet/Hogar/Mascotas.html"
        return
      }
    }
  }else{
    var data = {
      "foto":"/Html/integrador/imagenes/empty-pfp.webp",
      "name":nombre.value,
      "password":pwd.value,
      "email":correo.value,
      "phoneNumber":tel.value
    }
    await postDatos(data)
    await traerDatos()

    for (let i=0 ; i<usuario.length ; i++){
      if (data.name==usuario[i].name){
        localStorage.setItem("login", JSON.stringify(usuario[i]))
        window.location.href ="/Html/integrador/Sesion/Iniciada/VistasUsuario/Hogar/Mascotas.html"
        return
      }
    }
  }
}