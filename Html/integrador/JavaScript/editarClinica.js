//el otro está muy saturado ya para mi gusto
async function editarClinica(data){
    try {
    const res = await fetch("http://localhost:7000/establishment", {
      method: "PUT",
      headers: { "content-type": "application/json" }
    });

    if (!res.ok) {
      throw new Error(`Error ${res.status}: No se pudo editar la clínica`);
    }

    console.log(`Clinica con ID ${id} editada exitosamente.`);
  } catch (e) {
    console.error("Ocurrió un error al editar la mascota:", e);
  }
}
const img = document.getElementById("img")
const nombre = document.getElementById("nombre")
const lugar = document.getElementById("lugar")
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