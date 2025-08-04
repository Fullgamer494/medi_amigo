package org.amigo.model;

public class Veterinary {
    private int idVet;
    private int idUser;
    private int idLocal;
    private String comprobante;
    private String especialidad;
    private String disponibilidad;
    private String titulos;
    private String universidad;
    private String descripcion;


    // Getters y setters
    public int getIdVet() { return idVet; }
    public void setIdVet(int idVet) { this.idVet = idVet; }

    public int getIdUser() { return idUser; }
    public void setIdUser(int idUser) { this.idUser = idUser; }

    public int getIdLocal() { return idLocal; }
    public void setIdLocal(int idLocal) { this.idLocal = idLocal; }

    public String getComprobante() { return comprobante; }
    public void setComprobante(String comprobante) { this.comprobante = comprobante; }

    public String getEspecialidad() { return especialidad; }
    public void setEspecialidad(String especialidad) { this.especialidad = especialidad; }

    public String getDisponibilidad() { return disponibilidad; }
    public void setDisponibilidad(String disponibilidad) { this.disponibilidad = disponibilidad; }

    public String getTitulos() {return titulos;}
    public void setTitulos(String titulos) {this.titulos = titulos;}

    public String getUniversidad() {return universidad;}
    public void setUniversidad(String universidad) {this.universidad = universidad;}

    public String getDescripcion() {return descripcion;}
    public void setDescripcion(String descripcion) {this.descripcion = descripcion;}
}

