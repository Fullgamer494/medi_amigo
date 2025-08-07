import { usuario, veterinario } from "./gets.js";

const nombre = document.getElementById("nombre")
const tel = document.getElementById("tel")
const correo = document.getElementById("correo")
const contra = document.getElementById("contra")
const error_contra = document.getElementById("c-err")

if (form) {
    form.addEventListener('submit', function(evento) {
        evento.preventDefault();

        for (let i = 0; i < veterinario.length; i++) {
            const u = veterinario[i];
            if ((nombre.value == u.name || correo.value == u.email || tel.value == u.phoneNumber) &&
                contra.value == u.password) {
                localStorage.setItem("login", JSON.stringify(u));
                const v = localStorage.getItem("login")
                let w = JSON.parse(v)
                
                if (w.titulos){
                window.location.href = "/Html/integrador/Sesion/Iniciada/VistasVet/Hogar/Mascotas.html";
                }
                return; // Salimos del loop y evitamos submit extra
            }
        }
        for (let i = 0; i < usuario.length; i++) {
            const u = usuario[i];
            if (
                (nombre.value == u.name || correo.value == u.email || tel.value == u.phoneNumber) &&
                contra.value == u.password) {
                localStorage.setItem("login", JSON.stringify(u));
                const v = localStorage.getItem("login")
                
                window.location.href = "/Html/integrador/Sesion/Iniciada/VistasUsuario/Hogar/Mascotas.html";
                return; // Salimos del loop y evitamos submit extra
            }else{
                if (contra.value){
                    contra.classList.add("c-err-brdr")
                    error_contra.innerText = "Contraseña equivocada. Intente de nuevo."
                    error_contra.style.visibility = "visible"
                }else{
                    contra.classList.add("c-err-brdr")
                    error_contra.innerText = "Ingrese su contraseña."
                    error_contra.style.visibility = "visible"
                }
            }
        }
    });
}