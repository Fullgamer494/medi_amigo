const sesion = localStorage.getItem("login")
const u = JSON.parse(sesion)
const id = u.idUser
const idV = u.idVet

const nombre = document.getElementById("nombre")
const especie = document.getElementById("especie")
const raza = document.getElementById("raza")
const edad = document.getElementById("edad")
const sexo = document.getElementById("sexo")
const peso = document.getElementById("peso")
const estado = document.getElementById("estado")
const numV = document.getElementById("num-visitas")
const ultVis = document.getElementById("ultima-visita")
const ultV = document.getElementById("ultima-vacuna")
const vacunas = document.getElementById("vacunas")
const prxVacF = document.getElementById("siguiente-vacuna_fecha")
const prxVacN = document.getElementById("siguiente-vacuna_tipo")
const trat = document.getElementById("tratamientos")
const cirugias = document.getElementById("cirugias")
const cond = document.getElementById("condiciones")
const pwd = document.getElementById("contra")

const form = document.getElementById("form")

form.addEventListener('submit', async function(evento){
    evento.preventDefault()
    if (nombre.value && especie.value && raza.value && edad.value && sexo.value &&
        peso.value && estado.value && numV.value && ultV.value && vacunas.value &&
        prxVacF.value && prxVacN.value && trat.value && cirugias.value && pwd.value == u.password){
            
            let data = {
                "idUser": id,
                "idVet": idV || 40,
                "name": nombre.value,
                "age": edad.value,
                "species": especie.value,
                "sex": sexo.value,
                "weight": peso.value,
                "photo": "/Html/integrador/imagenes/img.png",
                "numVisit": numV.valueAsNumber,
                "vaccines": vacunas.value,
                "nextVaccine": prxVacN.value,
                "nextVaccineDate": prxVacF.value,
                "surgeries": cirugias.value,
                "condicion": cond.value,
                "lastVisit": ultVis.value,
                "state": estado.value,
                "treatment": trat.value,
                "lastVaccines": ultV.value,
                "race": raza.value
            }
            await enviarMascota(data)
            
            if(u.titulos){
                window.location.href = "/Html/integrador/Sesion/Iniciada/VistasVet/Hogar/Mascotas.html"
                }else{
                window.location.href = "/Html/integrador/Sesion/Iniciada/VistasUsuario/Hogar/Mascotas.html"
            }
                
    }else{
        alert("ocurrió un error")
    }
})


// Función para enviar los datos de la mascota al servidor
async function enviarMascota(mascotaData) {

    try {
        const response = await fetch('http://localhost:7000/pets', {
            method: 'POST',
            headers:{"content-type":"application/json"},
            body: JSON.stringify(mascotaData)
        });
        if (!response.ok) {
            throw new Error("Error al crear la mascota");
        }
        
    } catch (error) {
        console.error('Error al enviar la mascota:', error);
    }
}