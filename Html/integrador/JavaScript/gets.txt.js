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
traerDatos()

export { usuario, veterinario }